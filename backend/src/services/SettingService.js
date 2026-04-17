const fs = require('fs');
const path = require('path');
const { desktopDataDir } = require('../db/paths');

const settingsPath = path.join(desktopDataDir, 'settings.json');
const DEFAULT_TABLE_COUNT = 12;
const MIN_TABLE_COUNT = 1;
const MAX_TABLE_COUNT = 50;

function normalizeTableCount(tableCount) {
  const parsed = Number.parseInt(tableCount, 10);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_TABLE_COUNT;
  }

  return Math.min(Math.max(parsed, MIN_TABLE_COUNT), MAX_TABLE_COUNT);
}

function buildDefaultTableNames(tableCount = DEFAULT_TABLE_COUNT) {
  return Array.from({ length: normalizeTableCount(tableCount) }, (_, index) => `Table ${index + 1}`);
}

function normalizeTableNames(tableNames, tableCount = DEFAULT_TABLE_COUNT) {
  const normalizedTableCount = normalizeTableCount(tableCount);
  const defaults = buildDefaultTableNames(normalizedTableCount);

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
  tableCount: DEFAULT_TABLE_COUNT,
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
          tableCount: normalizeTableCount(parsed.tableCount),
          tableNames: normalizeTableNames(parsed.tableNames, parsed.tableCount),
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
    const tableCount = normalizeTableCount(newSettings.tableCount ?? current.tableCount);
    const updated = {
      ...current,
      ...newSettings,
      taxRate: Number.isFinite(Number(newSettings.taxRate ?? current.taxRate)) ? Number(newSettings.taxRate ?? current.taxRate) : defaultSettings.taxRate,
      tableCount,
      tableNames: normalizeTableNames(newSettings.tableNames ?? current.tableNames, tableCount),
    };
    fs.writeFileSync(settingsPath, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  }
}

module.exports = new SettingService();
