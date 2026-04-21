const express = require('express');
const BackupController = require('../controllers/BackupController');
const { authenticate, authorizeFeature } = require('../middleware/auth');
const multer = require('multer');
const os = require('os');

const upload = multer({ dest: os.tmpdir() });

const router = express.Router();

// All backup routes require Admin privileges
router.get('/', authenticate, authorizeFeature('backupManagement'), (req, res, next) => BackupController.listBackups(req, res, next));
router.post('/', authenticate, authorizeFeature('backupManagement'), (req, res, next) => BackupController.createBackup(req, res, next));
router.post('/upload', authenticate, authorizeFeature('backupManagement'), upload.single('backup'), (req, res, next) => BackupController.uploadBackup(req, res, next));
router.get('/download/:filename', authenticate, authorizeFeature('backupManagement'), (req, res, next) => BackupController.downloadBackup(req, res, next));
router.post('/restore/:filename', authenticate, authorizeFeature('backupManagement'), (req, res, next) => BackupController.restoreBackup(req, res, next));
router.delete('/:filename', authenticate, authorizeFeature('backupManagement'), (req, res, next) => BackupController.deleteBackup(req, res, next));

module.exports = router;
