const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('posDesktop', {
  openDataFolder: () => ipcRenderer.invoke('desktop:open-data-folder'),
  exportBackup: () => ipcRenderer.invoke('desktop:export-backup'),
  getPrinters: () => ipcRenderer.invoke('desktop:get-printers'),
  printReceipt: (html, printerName) => ipcRenderer.invoke('desktop:print-receipt', html, printerName),
  printCurrentWindow: () => ipcRenderer.invoke('desktop:print-current-window'),
  saveCurrentWindowPdf: () => ipcRenderer.invoke('desktop:save-current-window-pdf'),
  closeCurrentWindow: () => ipcRenderer.invoke('desktop:close-current-window'),
});
