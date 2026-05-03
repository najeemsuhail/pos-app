const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
process.env.DESKTOP_USE_SQLITE = 'true';
const { startServer } = require('../backend/src/server');
const { desktopDataRoot, desktopDbPath, ensureDir } = require('../backend/src/db/paths');

const DEFAULT_PORT = 5000;

let mainWindow;
let backendServer;
let isQuitting = false;
let shutdownPromise = null;

function closeServer(server) {
  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    const timeout = setTimeout(() => {
      if (typeof server.closeAllConnections === 'function') {
        server.closeAllConnections();
      }
      finish();
    }, 2000);

    server.close(() => {
      clearTimeout(timeout);
      finish();
    });

    if (typeof server.closeIdleConnections === 'function') {
      server.closeIdleConnections();
    }
  });
}

async function shutdownBackend() {
  if (!backendServer) {
    return;
  }

  if (shutdownPromise) {
    return shutdownPromise;
  }

  const serverToClose = backendServer;
  backendServer = null;
  shutdownPromise = closeServer(serverToClose).finally(() => {
    shutdownPromise = null;
  });

  return shutdownPromise;
}

function isDev() {
  return process.env.ELECTRON_DEV === 'true';
}

function getStartUrl() {
  if (process.env.ELECTRON_START_URL) {
    return process.env.ELECTRON_START_URL;
  }

  return `http://127.0.0.1:${DEFAULT_PORT}`;
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#111827',
    icon: path.join(__dirname, '../assets/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  await mainWindow.loadURL(getStartUrl());

  if (isDev()) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open Data Folder',
          click: async () => {
            await shell.openPath(desktopDataRoot);
          },
        },
        {
          label: 'Export Database Backup',
          click: async () => {
            await exportBackup();
          },
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function exportBackup() {
  ensureDir(desktopDataRoot);

  if (!fs.existsSync(desktopDbPath)) {
    await dialog.showMessageBox({
      type: 'warning',
      title: 'Backup unavailable',
      message: 'No local database file exists yet.',
    });
    return { ok: false, reason: 'missing-db' };
  }

  const defaultName = `pos-app-backup-${new Date().toISOString().slice(0, 10)}.db`;
  const result = await dialog.showSaveDialog({
    title: 'Export SQLite Backup',
    defaultPath: path.join(app.getPath('documents'), defaultName),
    filters: [
      { name: 'SQLite Database', extensions: ['db'] },
    ],
  });

  if (result.canceled || !result.filePath) {
    return { ok: false, reason: 'cancelled' };
  }

  fs.copyFileSync(desktopDbPath, result.filePath);
  return { ok: true, filePath: result.filePath };
}

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', async () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      return;
    }

    await createWindow();
  });
}

app.whenReady().then(async () => {
  if (!isDev()) {
    try {
      const { server } = await startServer(process.env.PORT || DEFAULT_PORT);
      backendServer = server;
    } catch (error) {
      const alreadyInUse = error && error.code === 'EADDRINUSE';
      const message = alreadyInUse
        ? `Port ${process.env.PORT || DEFAULT_PORT} is already in use. A previous POS process may still be running.`
        : 'The local POS backend failed to start.';

      dialog.showErrorBox('Unable to Start POS', `${message}\n\n${error.message || error}`);
      app.exit(1);
      return;
    }
  }

  buildMenu();

  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

ipcMain.handle('desktop:open-data-folder', async () => {
  await shell.openPath(desktopDataRoot);
  return { ok: true, path: desktopDataRoot };
});

ipcMain.handle('desktop:export-backup', exportBackup);

ipcMain.handle('desktop:get-printers', async () => {
  if (mainWindow) {
    try {
      return await mainWindow.webContents.getPrintersAsync();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  return [];
});

ipcMain.handle('desktop:print-current-window', async (event, printerName) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);

  if (!targetWindow || targetWindow.isDestroyed()) {
    return { success: false, errorType: 'Print window is not available' };
  }

  return new Promise((resolve) => {
    const printOptions = {
      silent: false,
      printBackground: true,
    };

    // If a specific printer is requested, use it
    if (printerName && printerName !== 'browser-default') {
      printOptions.deviceName = printerName;
      console.log(`[Print Preview] Using printer: "${printerName}"`);
    }

    targetWindow.webContents.print(printOptions, (success, errorType) => {
      if (!success) {
        console.error(`[Print Preview Error] Printer: "${printerName || 'browser-default'}", Error: "${errorType}"`);
      } else {
        console.log(`[Print Preview Success] Printer: "${printerName || 'browser-default'}"`);
      }
      resolve({ success, errorType });
    });
  });
});

async function getPrintableHtmlFromWindow(targetWindow) {
  return targetWindow.webContents.executeJavaScript(`
    (() => {
      const clone = document.documentElement.cloneNode(true);
      clone.querySelectorAll('.print-actions, script').forEach((element) => element.remove());

      const style = document.createElement('style');
      style.textContent = [
        '@page { size: A4; margin: 10mm; }',
        'html, body { background: #ffffff !important; margin: 0 !important; padding: 0 !important; }',
        '.print-shell { box-shadow: none !important; border: 0 !important; margin: 0 auto !important; }'
      ].join(' ');
      clone.querySelector('head').appendChild(style);

      return '<!doctype html>' + clone.outerHTML;
    })();
  `);
}

function loadHtmlInWindow(targetWindow, html) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      targetWindow.webContents.removeListener('did-finish-load', handleFinish);
      targetWindow.webContents.removeListener('did-fail-load', handleFail);
    };

    const handleFinish = () => {
      cleanup();
      setTimeout(resolve, 250);
    };

    const handleFail = () => {
      cleanup();
      reject(new Error('Print content failed to load'));
    };

    targetWindow.webContents.once('did-finish-load', handleFinish);
    targetWindow.webContents.once('did-fail-load', handleFail);
    targetWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html)).catch((error) => {
      cleanup();
      reject(error);
    });
  });
}

ipcMain.handle('desktop:save-current-window-pdf', async (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);

  if (!targetWindow || targetWindow.isDestroyed()) {
    return { success: false, errorType: 'Print window is not available' };
  }

  const result = await dialog.showSaveDialog(targetWindow, {
    title: 'Save Receipt PDF',
    defaultPath: path.join(app.getPath('documents'), `receipt-${Date.now()}.pdf`),
    filters: [
      { name: 'PDF Document', extensions: ['pdf'] },
    ],
  });

  if (result.canceled || !result.filePath) {
    return { success: false, errorType: 'cancelled' };
  }

  try {
    const printableHtml = await getPrintableHtmlFromWindow(targetWindow);
    const textLength = await targetWindow.webContents.executeJavaScript(`
      (document.querySelector('.receipt-paper')?.innerText || '').trim().length
    `);

    if (!textLength) {
      return { success: false, errorType: 'Receipt preview has no printable content' };
    }

    let pdfWindow = new BrowserWindow({
      show: false,
      width: 900,
      height: 1200,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    let pdfBuffer;
    try {
      await loadHtmlInWindow(pdfWindow, printableHtml);

      pdfBuffer = await pdfWindow.webContents.printToPDF({
        printBackground: true,
        pageSize: 'A4',
      });
    } finally {
      if (pdfWindow && !pdfWindow.isDestroyed()) {
        pdfWindow.close();
      }
    }

    if (!pdfBuffer || pdfBuffer.length < 1000) {
      return { success: false, errorType: 'Generated PDF is empty' };
    }

    fs.writeFileSync(result.filePath, pdfBuffer);
    return { success: true, filePath: result.filePath };
  } catch (error) {
    return { success: false, errorType: error.message || 'Unable to save PDF' };
  }
});

ipcMain.handle('desktop:close-current-window', async (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);

  if (targetWindow && !targetWindow.isDestroyed()) {
    targetWindow.close();
  }

  return { success: true };
});

function requiresVisiblePrintDialog(printerName) {
  return /pdf|xps|onenote|document writer/i.test(printerName || '');
}

ipcMain.handle('desktop:print-receipt', async (event, html, printerName) => {
  return new Promise((resolve) => {
    const useSilentPrint = !!printerName
      && printerName !== 'browser-default'
      && !requiresVisiblePrintDialog(printerName);
    let resolved = false;
    let printWindow = null;
    let printTimeout = null;

    const finish = (result) => {
      if (resolved) {
        return;
      }

      resolved = true;
      if (printTimeout) {
        clearTimeout(printTimeout);
        printTimeout = null;
      }
      resolve(result);
    };

    const closePrintWindow = () => {
      if (printWindow && !printWindow.isDestroyed()) {
        printWindow.close();
      }
      printWindow = null;
    };

    printTimeout = setTimeout(() => {
      finish({
        success: false,
        errorType: useSilentPrint ? 'Printer did not respond' : 'Print dialog timed out',
      });
      closePrintWindow();
    }, useSilentPrint ? 20000 : 120000);

    printWindow = new BrowserWindow({
      show: !useSilentPrint,
      width: 420,
      height: 760,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    printWindow.on('closed', () => {
      finish({ success: false, errorType: 'cancelled' });
      printWindow = null;
    });

    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    printWindow.loadURL(dataUrl).catch(() => {
      finish({ success: false, errorType: 'Print preview failed to load' });
      closePrintWindow();
    });

    printWindow.webContents.on('did-finish-load', () => {
      if (!printWindow || printWindow.isDestroyed()) {
        finish({ success: false, errorType: 'cancelled' });
        return;
      }

      const printOptions = {
        silent: useSilentPrint,
        printBackground: true,
      };

      if (useSilentPrint) {
        printOptions.deviceName = printerName;
        console.log(`[Print] Using printer: "${printerName}"`, printOptions);
      }

      const runPrint = () => {
        if (!printWindow || printWindow.isDestroyed()) {
          finish({ success: false, errorType: 'cancelled' });
          return;
        }

        printWindow.webContents.print(printOptions, (success, errorType) => {
          if (!success) {
            console.error(`[Print Error] Printer: "${printerName}", Error: "${errorType}"`);
          } else {
            console.log(`[Print Success] Printer: "${printerName || 'browser-default'}"`);
          }
          finish({ success, errorType });
          if (useSilentPrint) {
            closePrintWindow();
          }
        });
      };

      if (useSilentPrint) {
        runPrint();
        return;
      }

      printWindow.show();
      printWindow.focus();
      setTimeout(runPrint, 350);
    });

    printWindow.webContents.on('did-fail-load', () => {
      finish({ success: false, errorType: 'Print preview failed to load' });
      closePrintWindow();
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async (event) => {
  if (isQuitting) {
    return;
  }

  isQuitting = true;
  event.preventDefault();

  try {
    await shutdownBackend();
  } finally {
    app.quit();
  }
});
