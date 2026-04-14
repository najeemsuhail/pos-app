const SettingService = require('../services/SettingService');

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
      res.json(settings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SettingController();
