const fs = require('fs');
const path = require('path');
const { desktopDataDir } = require('../db/paths');

const settingsPath = path.join(desktopDataDir, 'settings.json');

const defaultSettings = {
  storeName: 'CHEWBIE CAFE',
  storeAddressLocality: 'Panaji, Goa',
  storePhone: '9876543210'
};

class SettingService {
  getSettings() {
    try {
      if (fs.existsSync(settingsPath)) {
        const data = fs.readFileSync(settingsPath, 'utf8');
        return { ...defaultSettings, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Failed to read settings from db:', e);
    }
    return defaultSettings;
  }

  updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  }
}

module.exports = new SettingService();
