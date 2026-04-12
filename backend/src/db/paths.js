const fs = require('fs');
const os = require('os');
const path = require('path');

const APP_FOLDER_NAME = process.env.DESKTOP_APP_NAME || 'POS App';

function getDesktopDataRoot() {
  if (process.env.DESKTOP_DATA_DIR) {
    return process.env.DESKTOP_DATA_DIR;
  }

  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), APP_FOLDER_NAME);
  }

  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', APP_FOLDER_NAME);
  }

  return path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share'), APP_FOLDER_NAME);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

const desktopDataRoot = getDesktopDataRoot();
const desktopDataDir = ensureDir(path.join(desktopDataRoot, 'data'));
const desktopUploadsDir = ensureDir(path.join(desktopDataDir, 'uploads'));
const desktopBackupsDir = ensureDir(path.join(desktopDataDir, 'backups'));
const desktopDbPath = path.join(desktopDataDir, 'pos-app.db');
const repoDbPath = path.resolve(__dirname, '../../prisma/pos-app.db');

module.exports = {
  desktopDataRoot,
  desktopDataDir,
  desktopUploadsDir,
  desktopBackupsDir,
  desktopDbPath,
  repoDbPath,
  ensureDir,
};
