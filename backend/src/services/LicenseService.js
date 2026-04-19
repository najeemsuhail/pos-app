let machineIdSync;
try {
  machineIdSync = require('node-machine-id').machineIdSync;
} catch (e) {
  console.error('Warning: node-machine-id module could not be loaded. Hardware-locked licensing may be unavailable.');
  machineIdSync = () => 'UNAVAILABLE_HARDWARE_ID';
}
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { desktopDataRoot } = require('../db/paths');

const SECRET_SALT = 'HOPE_PRIVATE_POS_SALT_123';
const LICENSE_FILE_PATH = path.join(desktopDataRoot, 'license.key');
const TRIAL_FILE_PATH = path.join(desktopDataRoot, 'trial.json');
const TRIAL_DURATION_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

class LicenseService {
  getMachineId() {
    try {
      // Returns a unique hardware footprint string
      return machineIdSync();
    } catch (e) {
      return 'UNKNOWN_MACHINE_ID';
    }
  }

  generateKey(machineId) {
    const hash = crypto.createHash('sha256').update(machineId + SECRET_SALT).digest('hex').toUpperCase();
    const key = hash.substring(0, 16);
    return `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}-${key.slice(12, 16)}`;
  }

  getTrialRecord() {
    try {
      if (!fs.existsSync(TRIAL_FILE_PATH)) {
        return null;
      }

      const rawData = fs.readFileSync(TRIAL_FILE_PATH, 'utf8').trim();
      if (!rawData) {
        return null;
      }

      const parsed = JSON.parse(rawData);
      if (!parsed.startedAt) {
        return null;
      }

      const startedAt = new Date(parsed.startedAt);
      if (Number.isNaN(startedAt.getTime())) {
        return null;
      }

      return { startedAt: startedAt.toISOString() };
    } catch (err) {
      return null;
    }
  }

  createTrialRecord() {
    const trialRecord = { startedAt: new Date().toISOString() };
    fs.writeFileSync(TRIAL_FILE_PATH, JSON.stringify(trialRecord, null, 2));
    return trialRecord;
  }

  getOrCreateTrialRecord() {
    const existingRecord = this.getTrialRecord();
    if (existingRecord) {
      return existingRecord;
    }

    return this.createTrialRecord();
  }

  getTrialStatus() {
    const trialRecord = this.getOrCreateTrialRecord();
    const startedAtMs = new Date(trialRecord.startedAt).getTime();
    const expiresAtMs = startedAtMs + (TRIAL_DURATION_DAYS * MS_PER_DAY);
    const nowMs = Date.now();
    const remainingMs = expiresAtMs - nowMs;
    const expired = remainingMs <= 0;
    const daysLeft = expired ? 0 : Math.max(1, Math.ceil(remainingMs / MS_PER_DAY));

    return {
      startedAt: new Date(startedAtMs).toISOString(),
      expiresAt: new Date(expiresAtMs).toISOString(),
      durationDays: TRIAL_DURATION_DAYS,
      expired,
      daysLeft,
    };
  }

  checkLicense() {
    try {
      if (!fs.existsSync(LICENSE_FILE_PATH)) {
        return false;
      }
      const savedKey = fs.readFileSync(LICENSE_FILE_PATH, 'utf8').trim();
      const expectedKey = this.generateKey(this.getMachineId());
      return savedKey === expectedKey;
    } catch (err) {
      return false;
    }
  }

  activateLicense(keyInput) {
    const expectedKey = this.generateKey(this.getMachineId());
    // Normalize input (remove hyphens, make uppercase)
    const normalizedInput = keyInput ? keyInput.replace(/-/g, '').toUpperCase() : '';
    const normalizedExpected = expectedKey.replace(/-/g, '');
    
    if (normalizedInput === normalizedExpected) {
      fs.writeFileSync(LICENSE_FILE_PATH, expectedKey);
      return true;
    }
    return false;
  }

  getStatus() {
    const activated = this.checkLicense();
    const trial = activated ? null : this.getTrialStatus();

    return {
      activated,
      machineId: this.getMachineId(),
      trial,
    };
  }
}

module.exports = new LicenseService();
