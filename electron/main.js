const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
process.env.DESKTOP_USE_SQLITE = 'true';
const { startServer } = require('../backend/src/server');
const { desktopDataRoot, desktopDbPath, ensureDir } = require('../backend/src/db/paths');

const DEFAULT_PORT = 5000;

let mainWindow;
let backendServer;

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

app.whenReady().then(async () => {
  if (!isDev()) {
    const { server } = await startServer(process.env.PORT || DEFAULT_PORT);
    backendServer = server;
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

ipcMain.handle('desktop:print-receipt', async (event, html, printerName) => {
  return new Promise((resolve) => {
    let printWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    printWindow.loadURL(dataUrl);

    printWindow.webContents.on('did-finish-load', () => {
      const printOptions = {
        silent: !!printerName && printerName !== 'browser-default',
        printBackground: true,
      };

      if (printerName && printerName !== 'browser-default') {
        printOptions.deviceName = printerName;
      }

      printWindow.webContents.print(printOptions, (success, errorType) => {
        printWindow.close();
        resolve({ success, errorType });
      });
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (backendServer) {
    backendServer.close();
  }
});
