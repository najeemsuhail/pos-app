const fs = require('fs');
const os = require('os');
const path = require('path');

const APP_FOLDER_NAME = process.env.DESKTOP_APP_NAME || 'ServeStack Restaurant POS';
const LEGACY_APP_FOLDER_NAMES = ['ServeStack Restaurant POS', 'POS App'];

function getDesktopDataRoot() {
  if (process.env.DESKTOP_DATA_DIR) {
    return process.env.DESKTOP_DATA_DIR;
  }

  if (process.platform === 'win32') {
    const appDataRoot = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    const preferredPath = path.join(appDataRoot, APP_FOLDER_NAME);
    const legacyPath = LEGACY_APP_FOLDER_NAMES
      .map((folderName) => path.join(appDataRoot, folderName))
      .find((candidatePath) => fs.existsSync(candidatePath));

    return fs.existsSync(preferredPath) ? preferredPath : (legacyPath || preferredPath);
  }

  if (process.platform === 'darwin') {
    const appSupportRoot = path.join(os.homedir(), 'Library', 'Application Support');
    const preferredPath = path.join(appSupportRoot, APP_FOLDER_NAME);
    const legacyPath = LEGACY_APP_FOLDER_NAMES
      .map((folderName) => path.join(appSupportRoot, folderName))
      .find((candidatePath) => fs.existsSync(candidatePath));

    return fs.existsSync(preferredPath) ? preferredPath : (legacyPath || preferredPath);
  }

  const dataRoot = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share');
  const preferredPath = path.join(dataRoot, APP_FOLDER_NAME);
  const legacyPath = LEGACY_APP_FOLDER_NAMES
    .map((folderName) => path.join(dataRoot, folderName))
    .find((candidatePath) => fs.existsSync(candidatePath));

  return fs.existsSync(preferredPath) ? preferredPath : (legacyPath || preferredPath);
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
