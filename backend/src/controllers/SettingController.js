const SettingService = require('../services/SettingService');
const SyncService = require('../services/SyncService');

class SettingController {
  getSettings(req, res, next) {
    try {
      const settings = SettingService.getSettings();
      res.json(settings);
    } catch (error) {
      next(error);
    }
  }

  updateSettings(req, res, next) {
    try {
      const settings = SettingService.updateSettings(req.body);
      // Removed: Auto-sync on update. User must click "Sync Now" to sync.
      // SyncService.queueSettingsSnapshot(settings).catch((error) => {
      //   console.error('[Sync] Failed to queue settings change:', error.message || error);
      // });
      res.json(settings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SettingController();
