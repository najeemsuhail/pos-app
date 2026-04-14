const express = require('express');
const router = express.Router();
const settingController = require('../controllers/SettingController');
const { authorize } = require('../middleware/auth');

// Allow anyone to read settings (needed for frontend UI)
router.get('/', settingController.getSettings);
router.post('/', authorize('Admin'), settingController.updateSettings);

module.exports = router;
