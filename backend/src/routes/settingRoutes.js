const express = require('express');
const router = express.Router();
const settingController = require('../controllers/SettingController');
const { authenticate, authorize } = require('../middleware/auth');

// Allow anyone to read settings (needed for frontend UI)
router.get('/', settingController.getSettings);
router.post('/', settingController.updateSettings);
router.put('/', authenticate, authorize('Admin'), settingController.updateSettings);

module.exports = router;
