const fs = require('fs');
const path = require('path');
const { desktopDbPath, desktopBackupsDir } = require('../db/paths');

class BackupController {
  async listBackups(req, res, next) {
    try {
      const files = fs.readdirSync(desktopBackupsDir);
      const backups = files
        .filter(file => file.endsWith('.db'))
        .map(file => {
          const stats = fs.statSync(path.join(desktopBackupsDir, file));
          return {
            filename: file,
            size: stats.size,
            createdAt: stats.birthtime,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      res.json(backups);
    } catch (error) {
      next(error);
    }
  }

  async createBackup(req, res, next) {
    try {
      if (!fs.existsSync(desktopDbPath)) {
        throw { status: 404, message: 'Source database not found' };
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `backup-${timestamp}.db`;
      const targetPath = path.join(desktopBackupsDir, filename);

      fs.copyFileSync(desktopDbPath, targetPath);

      res.status(201).json({
        message: 'Backup created successfully',
        filename,
      });
    } catch (error) {
      next(error);
    }
  }

  async downloadBackup(req, res, next) {
    try {
      const { filename } = req.params;
      const filePath = path.join(desktopBackupsDir, filename);

      if (!fs.existsSync(filePath)) {
        throw { status: 404, message: 'Backup file not found' };
      }

      res.download(filePath);
    } catch (error) {
      next(error);
    }
  }

  async deleteBackup(req, res, next) {
    try {
      const { filename } = req.params;
      const filePath = path.join(desktopBackupsDir, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({ message: 'Backup deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async restoreBackup(req, res, next) {
    try {
      const { filename } = req.params;
      const sourcePath = path.join(desktopBackupsDir, filename);

      if (!fs.existsSync(sourcePath)) {
        throw { status: 404, message: 'Backup file not found' };
      }

      // 1. Create emergency backup of current state
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const emergencyFilename = `emergency-pre-restore-${timestamp}.db`;
      const emergencyPath = path.join(desktopBackupsDir, emergencyFilename);
      
      if (fs.existsSync(desktopDbPath)) {
        fs.copyFileSync(desktopDbPath, emergencyPath);
      }

      // 2. Perform restoration
      // Note: In a production environment with high concurrency, you'd close the DB connection here.
      // For this app, fs.copyFileSync is generally sufficient for SQLite if done carefully.
      fs.copyFileSync(sourcePath, desktopDbPath);

      res.json({ 
        message: 'Database restored successfully. Please restart the application for changes to take effect.',
        emergencyBackup: emergencyFilename
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadBackup(req, res, next) {
    try {
      if (!req.file) {
        throw { status: 400, message: 'No file uploaded' };
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `uploaded-${timestamp}-${req.file.originalname}`;
      const targetPath = path.join(desktopBackupsDir, filename);

      fs.renameSync(req.file.path, targetPath);

      res.status(201).json({
        message: 'Backup uploaded successfully',
        filename,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BackupController();
