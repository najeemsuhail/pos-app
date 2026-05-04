const { contextBridge, ipcRenderer } = require('electron');

const printerChangeListeners = new Map();

contextBridge.exposeInMainWorld('posDesktop', {
  openDataFolder: () => ipcRenderer.invoke('desktop:open-data-folder'),
  exportBackup: () => ipcRenderer.invoke('desktop:export-backup'),
  getPrinters: () => ipcRenderer.invoke('desktop:get-printers'),
  printReceipt: (html, printerName) => ipcRenderer.invoke('desktop:print-receipt', html, printerName),
  printCurrentWindow: (printerName) => ipcRenderer.invoke('desktop:print-current-window', printerName),
  openCurrentWindowPdf: () => ipcRenderer.invoke('desktop:open-current-window-pdf'),
  saveCurrentWindowPdf: () => ipcRenderer.invoke('desktop:save-current-window-pdf'),
  closeCurrentWindow: () => ipcRenderer.invoke('desktop:close-current-window'),

  onPrintersChanged: (callback) => {
    const listener = (_event, printers) => callback(printers);
    printerChangeListeners.set(callback, listener);
    ipcRenderer.on('desktop:printers-changed', listener);
  },
  offPrintersChanged: (callback) => {
    const listener = printerChangeListeners.get(callback);
    if (!listener) return;
    ipcRenderer.removeListener('desktop:printers-changed', listener);
    printerChangeListeners.delete(callback);
  },
});
