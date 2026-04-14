const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('posDesktop', {
  openDataFolder: () => ipcRenderer.invoke('desktop:open-data-folder'),
  exportBackup: () => ipcRenderer.invoke('desktop:export-backup'),
  getPrinters: () => ipcRenderer.invoke('desktop:get-printers'),
  printReceipt: (html, printerName) => ipcRenderer.invoke('desktop:print-receipt', html, printerName),
});
