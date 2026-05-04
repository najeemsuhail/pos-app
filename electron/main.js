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
const printLogDir = path.join(desktopDataRoot, 'logs');
const printLogPath = path.join(printLogDir, 'print.log');

function writePrintLog(level, event, details = {}) {
  try {
    ensureDir(printLogDir);
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      event,
      ...details,
    });
    fs.appendFileSync(printLogPath, `${line}\n`, 'utf8');
  } catch (error) {
    console.error('[Print Log Error]', error);
  }
}

function attachWindowErrorLogging(targetWindow, label) {
  targetWindow.webContents.on('console-message', (_event, level, message, line, sourceId) => {
    if (level >= 2) {
      writePrintLog(level === 2 ? 'warn' : 'error', 'renderer-console-message', {
        window: label,
        level,
        message,
        line,
        sourceId,
      });
    }
  });

  targetWindow.webContents.on('render-process-gone', (_event, details) => {
    writePrintLog('error', 'renderer-process-gone', {
      window: label,
      reason: details.reason,
      exitCode: details.exitCode,
    });
  });

  targetWindow.webContents.on('unresponsive', () => {
    writePrintLog('error', 'renderer-unresponsive', {
      window: label,
    });
  });
}

process.on('uncaughtException', (error) => {
  writePrintLog('error', 'main-uncaught-exception', {
    error: error.message || String(error),
    stack: error.stack || null,
  });
  console.error(error);
});

process.on('unhandledRejection', (reason) => {
  writePrintLog('error', 'main-unhandled-rejection', {
    error: reason?.message || String(reason),
    stack: reason?.stack || null,
  });
  console.error(reason);
});

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
  attachWindowErrorLogging(mainWindow, 'main');

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
          label: 'Open Print Log',
          click: async () => {
            ensureDir(printLogDir);
            if (!fs.existsSync(printLogPath)) {
              fs.writeFileSync(printLogPath, '', 'utf8');
            }
            await shell.openPath(printLogPath);
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
      const printers = await mainWindow.webContents.getPrintersAsync();
      writePrintLog('info', 'get-printers-succeeded', {
        count: printers.length,
        printers: printers.map((printer) => ({
          name: printer.name,
          displayName: printer.displayName,
          isDefault: !!printer.isDefault,
          status: printer.status,
        })),
      });
      return printers;
    } catch (e) {
      console.error(e);
      writePrintLog('error', 'get-printers-failed', {
        error: e.message || String(e),
      });
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
    const requestedPrinter = printerName || 'browser-default';

    // If a specific printer is requested, use it
    if (printerName && printerName !== 'browser-default') {
      printOptions.deviceName = printerName;
      console.log(`[Print Preview] Using printer: "${printerName}"`);
    }

    writePrintLog('info', 'preview-print-started', {
      printerName: requestedPrinter,
      deviceName: printOptions.deviceName || null,
    });

    targetWindow.webContents.print(printOptions, (success, errorType) => {
      if (!success) {
        console.error(`[Print Preview Error] Printer: "${printerName || 'browser-default'}", Error: "${errorType}"`);
        writePrintLog('error', 'preview-print-failed', {
          printerName: requestedPrinter,
          errorType: errorType || 'unknown',
        });
      } else {
        console.log(`[Print Preview Success] Printer: "${printerName || 'browser-default'}"`);
        writePrintLog('info', 'preview-print-succeeded', {
          printerName: requestedPrinter,
        });
      }
      resolve({ success, errorType });
    });
  });
});

async function getPrintableReceiptSnapshot(targetWindow) {
  return targetWindow.webContents.executeJavaScript(`
    (() => {
      const paper = document.querySelector('.receipt-paper');
      return {
        html: paper?.innerHTML || '',
        text: (paper?.innerText || '').trim(),
        paperHeight: Math.ceil(paper?.getBoundingClientRect().height || 0),
        paperWidth: Math.ceil(paper?.getBoundingClientRect().width || 0),
        bodyHeight: Math.ceil(document.body?.scrollHeight || 0),
        bodyWidth: Math.ceil(document.body?.scrollWidth || 0)
      };
    })();
  `);
}

function buildPrintableReceiptHtml(receiptHtml) {
  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page { margin: 0; }
          * { box-sizing: border-box; }
          html, body {
            width: 80mm;
            min-width: 80mm;
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #111827;
          }
          .print-shell {
            width: 80mm;
            max-width: 80mm;
            margin: 0;
            padding: 0;
            background: #ffffff;
          }
          .receipt-paper {
            width: 80mm;
            max-width: 80mm;
            margin: 0;
            padding: 4mm 3mm;
            background: #ffffff;
          }
          .receipt-line {
            font-family: "Courier New", Courier, monospace;
            font-size: 11px;
            line-height: 1.28;
            font-weight: 600;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }
          .receipt-line.separator { color: #6b7280; }
          .receipt-line.header-row,
          .receipt-line.section-title,
          .receipt-line.footer,
          .receipt-line.total { font-weight: 800; }
          .receipt-line.footer {
            text-align: center;
            display: block;
            width: 100%;
            white-space: normal;
          }
          .receipt-line.total { font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="print-shell">
          <div class="receipt-paper">${receiptHtml}</div>
        </div>
      </body>
    </html>`;
}

function escapePdfText(value) {
  return String(value)
    .replace(/\u00a0/g, ' ')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '?')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function buildReceiptPdfBufferFromLines(lines) {
  const pageWidth = 226.77; // 80mm in PDF points.
  const marginX = 10;
  const marginTop = 12;
  const marginBottom = 12;
  const fontSize = 8.5;
  const lineHeight = 11;
  const pageHeight = Math.max(120, marginTop + marginBottom + (lines.length * lineHeight));
  const contentLines = [
    'BT',
    `/F1 ${fontSize} Tf`,
    `${marginX} ${pageHeight - marginTop - fontSize} Td`,
  ];

  lines.forEach((line, index) => {
    if (index > 0) {
      contentLines.push(`0 -${lineHeight} Td`);
    }
    contentLines.push(`(${escapePdfText(line)}) Tj`);
  });

  contentLines.push('ET');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>',
  ];
  const contentStream = contentLines.join('\n');
  objects.push(`<< /Length ${Buffer.byteLength(contentStream, 'latin1')} >>\nstream\n${contentStream}\nendstream`);

  const chunks = ['%PDF-1.4\n'];
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(chunks.join(''), 'latin1'));
    chunks.push(`${index + 1} 0 obj\n${object}\nendobj\n`);
  });

  const xrefOffset = Buffer.byteLength(chunks.join(''), 'latin1');
  chunks.push(`xref\n0 ${objects.length + 1}\n`);
  chunks.push('0000000000 65535 f \n');
  offsets.slice(1).forEach((offset) => {
    chunks.push(`${String(offset).padStart(10, '0')} 00000 n \n`);
  });
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return Buffer.from(chunks.join(''), 'latin1');
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

async function createReceiptPdfBufferFromWindow(targetWindow) {
  const snapshot = await getPrintableReceiptSnapshot(targetWindow);
  const printableHtml = buildPrintableReceiptHtml(snapshot.html);
  const debugHtmlPath = path.join(printLogDir, 'last-receipt-pdf.html');
  const previewMetrics = {
    textLength: snapshot.text.length,
    htmlLength: snapshot.html.length,
    paperHeight: snapshot.paperHeight,
    paperWidth: snapshot.paperWidth,
    bodyHeight: snapshot.bodyHeight,
    bodyWidth: snapshot.bodyWidth,
  };

  writePrintLog('info', 'preview-pdf-source-measured', previewMetrics);
  try {
    ensureDir(printLogDir);
    fs.writeFileSync(debugHtmlPath, printableHtml, 'utf8');
    writePrintLog('info', 'preview-pdf-debug-html-written', {
      filePath: debugHtmlPath,
      bytes: Buffer.byteLength(printableHtml, 'utf8'),
    });
  } catch (error) {
    writePrintLog('error', 'preview-pdf-debug-html-write-failed', {
      error: error.message || String(error),
    });
  }

  if (!snapshot.text.length || !snapshot.html.length) {
    throw new Error('Receipt preview has no printable content');
  }

  const lines = await targetWindow.webContents.executeJavaScript(`
    Array.from(document.querySelectorAll('.receipt-paper .receipt-line'))
      .map((line) => line.innerText.replace(/\\u00a0/g, ' '))
  `);

  if (!Array.isArray(lines) || !lines.some((line) => line.trim())) {
    throw new Error('Receipt preview has no printable text lines');
  }

  const manualPdfBuffer = buildReceiptPdfBufferFromLines(lines);
  writePrintLog('info', 'preview-pdf-buffer-created', {
    bytes: manualPdfBuffer.length,
    generator: 'manual-text-pdf',
    lineCount: lines.length,
    pageWidthPoints: 226.77,
  });

  return manualPdfBuffer;

  let pdfWindow = new BrowserWindow({
    show: true,
    width: 360,
    height: 1200,
    x: -32000,
    y: -32000,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      paintWhenInitiallyHidden: true,
    },
  });
  attachWindowErrorLogging(pdfWindow, 'pdf-renderer');

  try {
    await loadHtmlInWindow(pdfWindow, printableHtml);
    pdfWindow.showInactive();
    pdfWindow.webContents.focus();
    await new Promise((resolve) => setTimeout(resolve, 600));

    const pdfMetrics = await pdfWindow.webContents.executeJavaScript(`
      (() => {
        const paper = document.querySelector('.receipt-paper');
        return {
          textLength: (paper?.innerText || '').trim().length,
          htmlLength: paper?.innerHTML?.length || 0,
          paperHeight: Math.ceil(paper?.getBoundingClientRect().height || 0),
          paperWidth: Math.ceil(paper?.getBoundingClientRect().width || 0),
          bodyHeight: Math.ceil(document.body?.scrollHeight || 0),
          bodyWidth: Math.ceil(document.body?.scrollWidth || 0),
          bodyText: (document.body?.innerText || '').trim().slice(0, 120)
        };
      })();
    `);
    writePrintLog('info', 'preview-pdf-render-measured', pdfMetrics);

    if (!pdfMetrics.textLength || !pdfMetrics.htmlLength || !pdfMetrics.paperHeight) {
      throw new Error('Receipt PDF renderer has no printable content');
    }

    const pxToMicrons = 25400 / 96;
    const receiptHeightMicrons = Math.ceil(Math.max(pdfMetrics.paperHeight + 16, 380) * pxToMicrons);

    const pdfBuffer = await pdfWindow.webContents.printToPDF({
      printBackground: true,
      preferCSSPageSize: false,
      margins: {
        marginType: 'none',
      },
      pageSize: {
        width: 80000,
        height: receiptHeightMicrons,
      },
    });

    writePrintLog('info', 'preview-pdf-buffer-created', {
      bytes: pdfBuffer?.length || 0,
      pageWidthMicrons: 80000,
      pageHeightMicrons: receiptHeightMicrons,
    });

    if (!pdfBuffer || pdfBuffer.length < 1000) {
      throw new Error('Generated PDF is empty');
    }

    return pdfBuffer;
  } finally {
    if (pdfWindow && !pdfWindow.isDestroyed()) {
      pdfWindow.close();
    }
  }
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
    const pdfBuffer = await createReceiptPdfBufferFromWindow(targetWindow);
    fs.writeFileSync(result.filePath, pdfBuffer);
    writePrintLog('info', 'preview-pdf-saved', {
      filePath: result.filePath,
    });
    return { success: true, filePath: result.filePath };
  } catch (error) {
    writePrintLog('error', 'preview-pdf-save-failed', {
      error: error.message || String(error),
    });
    return { success: false, errorType: error.message || 'Unable to save PDF' };
  }
});

ipcMain.handle('desktop:open-current-window-pdf', async (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);

  if (!targetWindow || targetWindow.isDestroyed()) {
    return { success: false, errorType: 'Print window is not available' };
  }

  try {
    const pdfBuffer = await createReceiptPdfBufferFromWindow(targetWindow);
    const tempDir = ensureDir(path.join(app.getPath('temp'), 'Chewbiecafe POS'));
    const pdfPath = path.join(tempDir, `receipt-${Date.now()}.pdf`);

    fs.writeFileSync(pdfPath, pdfBuffer);
    const openError = await shell.openPath(pdfPath);

    if (openError) {
      throw new Error(openError);
    }

    writePrintLog('info', 'preview-pdf-opened', {
      filePath: pdfPath,
    });
    return { success: true, filePath: pdfPath };
  } catch (error) {
    writePrintLog('error', 'preview-pdf-open-failed', {
      error: error.message || String(error),
    });
    return { success: false, errorType: error.message || 'Unable to open PDF' };
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

function buildReceiptPreviewHtml(html, printerName) {
  const selectedPrinter = printerName || 'browser-default';
  const actions = `
    <style>
      .print-actions {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        background: #111827;
        box-shadow: 0 2px 10px rgba(0,0,0,0.16);
      }
      .print-actions button {
        border: 0;
        border-radius: 6px;
        padding: 8px 12px;
        background: #ffffff;
        color: #111827;
        font: 600 13px Arial, sans-serif;
        cursor: pointer;
      }
      .print-actions button.primary {
        background: #16a34a;
        color: #ffffff;
      }
      .print-actions button:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }
      .print-actions .status {
        margin-left: auto;
        color: #e5e7eb;
        font: 12px Arial, sans-serif;
      }
      @media print {
        .print-actions { display: none !important; }
        body { background: #ffffff !important; padding-top: 0 !important; }
      }
    </style>
  `;
  const script = `
    <script>
      const selectedPrinter = ${JSON.stringify(selectedPrinter)};
      const setStatus = (message) => {
        const status = document.querySelector('.print-actions .status');
        if (status) status.textContent = message || '';
      };

      async function printReceiptPreview() {
        const button = document.querySelector('[data-print]');
        try {
          if (button) button.disabled = true;
          setStatus('Opening PDF...');
          await openReceiptPdf();
        } catch (error) {
          setStatus(error.message || 'Print failed');
        } finally {
          if (button) button.disabled = false;
        }
      }

      async function openReceiptPdf() {
        const button = document.querySelector('[data-open-pdf], [data-print]');
        try {
          if (button) button.disabled = true;
          setStatus('Opening PDF...');
          const result = await window.posDesktop.openCurrentWindowPdf();
          setStatus(result.success ? 'PDF opened' : (result.errorType || 'PDF open failed'));
        } catch (error) {
          setStatus(error.message || 'PDF open failed');
        } finally {
          if (button) button.disabled = false;
        }
      }

      async function saveReceiptPdf() {
        const button = document.querySelector('[data-save-pdf]');
        try {
          if (button) button.disabled = true;
          setStatus('Saving PDF...');
          const result = await window.posDesktop.saveCurrentWindowPdf();
          setStatus(result.success ? 'PDF saved' : (result.errorType || 'PDF save cancelled'));
        } catch (error) {
          setStatus(error.message || 'PDF save failed');
        } finally {
          if (button) button.disabled = false;
        }
      }
    </script>
  `;
  const toolbar = `
    <div class="print-actions">
      <button class="primary" data-print onclick="printReceiptPreview()">Open PDF</button>
      <button data-save-pdf onclick="saveReceiptPdf()">Save PDF</button>
      <button onclick="window.posDesktop.closeCurrentWindow()">Close</button>
      <span class="status"></span>
    </div>
  `;

  return html
    .replace('</head>', `${actions}</head>`)
    .replace('<body>', `<body>${toolbar}`)
    .replace('</body>', `${script}</body>`);
}

ipcMain.handle('desktop:print-receipt', async (event, html, printerName) => {
  return new Promise((resolve) => {
    const useSilentPrint = !!printerName
      && printerName !== 'browser-default'
      && !requiresVisiblePrintDialog(printerName);
    let resolved = false;
    let printWindow = null;
    let printTimeout = null;
    const requestedPrinter = printerName || 'browser-default';

    writePrintLog('info', 'receipt-print-requested', {
      printerName: requestedPrinter,
      silent: useSilentPrint,
      visibleDialog: !useSilentPrint,
    });

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

    if (useSilentPrint) {
      printTimeout = setTimeout(() => {
        writePrintLog('error', 'receipt-print-timeout', {
          printerName: requestedPrinter,
          silent: useSilentPrint,
          timeoutMs: 20000,
        });
        finish({
          success: false,
          errorType: 'Printer did not respond',
        });
        closePrintWindow();
      }, 20000);
    }

    printWindow = new BrowserWindow({
      show: !useSilentPrint,
      width: 420,
      height: 760,
      frame: true,
      skipTaskbar: useSilentPrint,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        paintWhenInitiallyHidden: true
      }
    });
    attachWindowErrorLogging(printWindow, useSilentPrint ? 'silent-print' : 'receipt-preview');

    printWindow.on('closed', () => {
      finish({ success: false, errorType: 'cancelled' });
      printWindow = null;
    });

    const receiptHtml = useSilentPrint ? html : buildReceiptPreviewHtml(html, requestedPrinter);
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(receiptHtml);
    printWindow.loadURL(dataUrl).catch(() => {
      writePrintLog('error', 'receipt-print-load-failed', {
        printerName: requestedPrinter,
        silent: useSilentPrint,
      });
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

      writePrintLog('info', 'receipt-print-window-loaded', {
        printerName: requestedPrinter,
        silent: useSilentPrint,
        deviceName: printOptions.deviceName || null,
      });

      const runPrint = () => {
        if (!printWindow || printWindow.isDestroyed()) {
          writePrintLog('warn', 'receipt-print-window-closed-before-print', {
            printerName: requestedPrinter,
            silent: useSilentPrint,
          });
          finish({ success: false, errorType: 'cancelled' });
          return;
        }

        writePrintLog('info', 'receipt-print-started', {
          printerName: requestedPrinter,
          silent: useSilentPrint,
          deviceName: printOptions.deviceName || null,
        });

        printWindow.webContents.print(printOptions, (success, errorType) => {
          if (!success) {
            console.error(`[Print Error] Printer: "${printerName}", Error: "${errorType}"`);
            writePrintLog('error', 'receipt-print-failed', {
              printerName: requestedPrinter,
              silent: useSilentPrint,
              errorType: errorType || 'unknown',
            });
          } else {
            console.log(`[Print Success] Printer: "${printerName || 'browser-default'}"`);
            writePrintLog('info', 'receipt-print-succeeded', {
              printerName: requestedPrinter,
              silent: useSilentPrint,
            });
          }
          finish({ success, errorType });
          closePrintWindow();
        });
      };

      if (useSilentPrint) {
        runPrint();
        return;
      }

      printWindow.show();
      printWindow.focus();
      writePrintLog('info', 'receipt-print-preview-opened', {
        printerName: requestedPrinter,
        silent: false,
      });
      finish({ success: true, preview: true });
    });

    printWindow.webContents.on('did-fail-load', () => {
      writePrintLog('error', 'receipt-print-did-fail-load', {
        printerName: requestedPrinter,
        silent: useSilentPrint,
      });
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
