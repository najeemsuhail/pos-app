const fs = require('fs');
const path = require('path');
const { desktopDataDir } = require('../db/paths');

const settingsPath = path.join(desktopDataDir, 'settings.json');
const DEFAULT_TABLE_COUNT = 12;

function buildDefaultTableNames() {
  return Array.from({ length: DEFAULT_TABLE_COUNT }, (_, index) => `Table ${index + 1}`);
}

function normalizeTableNames(tableNames) {
  const defaults = buildDefaultTableNames();

  if (!Array.isArray(tableNames)) {
    return defaults;
  }

  return defaults.map((fallback, index) => {
    const rawValue = tableNames[index];
    if (typeof rawValue !== 'string') {
      return fallback;
    }

    const trimmed = rawValue.trim();
    return trimmed || fallback;
  });
}

const defaultSettings = {
  storeName: 'CHEWBIE CAFE',
  storeAddressLocality: 'Panaji, Goa',
  storePhone: '9876543210',
  taxRate: 5,
  tableNames: buildDefaultTableNames(),
};

class SettingService {
  getSettings() {
    try {
      if (fs.existsSync(settingsPath)) {
        const data = fs.readFileSync(settingsPath, 'utf8');
        const parsed = JSON.parse(data);
        return {
          ...defaultSettings,
          ...parsed,
          taxRate: Number.isFinite(Number(parsed.taxRate)) ? Number(parsed.taxRate) : defaultSettings.taxRate,
          tableNames: normalizeTableNames(parsed.tableNames),
        };
      }
    } catch (e) {
      console.error('Failed to read settings from db:', e);
    }
    return {
      ...defaultSettings,
      tableNames: buildDefaultTableNames(),
    };
  }

  updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = {
      ...current,
      ...newSettings,
      taxRate: Number.isFinite(Number(newSettings.taxRate ?? current.taxRate)) ? Number(newSettings.taxRate ?? current.taxRate) : defaultSettings.taxRate,
      tableNames: normalizeTableNames(newSettings.tableNames ?? current.tableNames),
    };
    fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  }
}

module.exports = new SettingService();
