const express = require('express');
const BackupController = require('../controllers/BackupController');
const { authenticate, authorize } = require('../middleware/auth');
const multer = require('multer');
const os = require('os');

const upload = multer({ dest: os.tmpdir() });

const router = express.Router();

// All backup routes require Admin privileges
router.get('/', authenticate, authorize('Admin'), (req, res, next) => BackupController.listBackups(req, res, next));
router.post('/', authenticate, authorize('Admin'), (req, res, next) => BackupController.createBackup(req, res, next));
router.post('/upload', authenticate, authorize('Admin'), upload.single('backup'), (req, res, next) => BackupController.uploadBackup(req, res, next));
router.get('/download/:filename', authenticate, authorize('Admin'), (req, res, next) => BackupController.downloadBackup(req, res, next));
router.post('/restore/:filename', authenticate, authorize('Admin'), (req, res, next) => BackupController.restoreBackup(req, res, next));
router.delete('/:filename', authenticate, authorize('Admin'), (req, res, next) => BackupController.deleteBackup(req, res, next));

module.exports = router;
