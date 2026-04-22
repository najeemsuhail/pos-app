let machineIdSync;
try {
  machineIdSync = require('node-machine-id').machineIdSync;
} catch (e) {
  console.error('Warning: node-machine-id module could not be loaded. Hardware-locked licensing may be unavailable.');
  machineIdSync = () => 'UNAVAILABLE_HARDWARE_ID';
}
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { desktopDataRoot, desktopDataDir, desktopBackupsDir, ensureDir } = require('../db/paths');

const SECRET_SALT = 'HOPE_PRIVATE_POS_SALT_123';
const LICENSE_FILE_PATH = path.join(desktopDataRoot, 'license.key');
const TRIAL_FILE_PATH = path.join(desktopDataRoot, 'trial.json');
const TRIAL_MIRROR_FILE_PATH = path.join(desktopDataDir, 'trial.json');
const TRIAL_BACKUP_FILE_PATH = path.join(desktopBackupsDir, '.trial.json');
const TAMPER_FILE_PATH = path.join(desktopDataRoot, 'trial-tampered.json');
const TAMPER_MIRROR_FILE_PATH = path.join(desktopDataDir, '.trial-tampered.json');
const TAMPER_BACKUP_FILE_PATH = path.join(desktopBackupsDir, '.trial-tampered.json');
const TRIAL_DURATION_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const TRIAL_REGISTRY_KEY = 'HKCU\\Software\\Hope\\ChewbiecafePOS';
const TRIAL_STARTED_AT_VALUE = 'TrialStartedAt';
const TRIAL_SIGNATURE_VALUE = 'TrialSignature';
const TRIAL_TAMPERED_VALUE = 'TrialTampered';
const TRIAL_TAMPERED_AT_VALUE = 'TrialTamperedAt';
const TRIAL_TAMPER_REASON_VALUE = 'TrialTamperReason';
const TRIAL_FILE_PATHS = [TRIAL_FILE_PATH, TRIAL_MIRROR_FILE_PATH, TRIAL_BACKUP_FILE_PATH];
const TAMPER_FILE_PATHS = [TAMPER_FILE_PATH, TAMPER_MIRROR_FILE_PATH, TAMPER_BACKUP_FILE_PATH];

function normalizeStartedAt(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime()) || parsed.getTime() > Date.now()) {
    return null;
  }

  return parsed.toISOString();
}

class LicenseService {
  isRemoteLedgerConfigured() {
    return Boolean(
      process.env.LICENSE_LEDGER_URL &&
      process.env.LICENSE_LEDGER_SHARED_SECRET
    );
  }

  getMachineId() {
    try {
      // Returns a unique hardware footprint string
      return machineIdSync();
    } catch (e) {
      return 'UNKNOWN_MACHINE_ID';
    }
  }

  generateTrialSignature(machineId, startedAt) {
    return crypto
      .createHash('sha256')
      .update(`${machineId}|${startedAt}|${SECRET_SALT}`)
      .digest('hex')
      .toUpperCase();
  }

  generateTamperSignature(machineId, detectedAt, reason) {
    return crypto
      .createHash('sha256')
      .update(`${machineId}|${detectedAt}|${reason}|TAMPER|${SECRET_SALT}`)
      .digest('hex')
      .toUpperCase();
  }

  generateKey(machineId) {
    const hash = crypto.createHash('sha256').update(machineId + SECRET_SALT).digest('hex').toUpperCase();
    const key = hash.substring(0, 16);
    return `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}-${key.slice(12, 16)}`;
  }

  buildTrialRecord(startedAt) {
    const machineId = this.getMachineId();
    const normalizedStartedAt = normalizeStartedAt(startedAt);

    if (!normalizedStartedAt) {
      return null;
    }

    return {
      startedAt: normalizedStartedAt,
      machineId,
      signature: this.generateTrialSignature(machineId, normalizedStartedAt),
    };
  }

  isValidTrialRecord(record) {
    const normalizedStartedAt = normalizeStartedAt(record?.startedAt);
    const currentMachineId = this.getMachineId();

    if (!normalizedStartedAt || record?.machineId !== currentMachineId || typeof record?.signature !== 'string') {
      return false;
    }

    return record.signature === this.generateTrialSignature(currentMachineId, normalizedStartedAt);
  }

  extractLegacyTrialRecord(record, sourcePath) {
    if (sourcePath !== TRIAL_FILE_PATH || !record || typeof record !== 'object' || Array.isArray(record)) {
      return null;
    }

    const normalizedStartedAt = normalizeStartedAt(record.startedAt);
    if (!normalizedStartedAt) {
      return null;
    }

    const keys = Object.keys(record);
    if (keys.length !== 1 || keys[0] !== 'startedAt') {
      return null;
    }

    return { startedAt: normalizedStartedAt };
  }

  readTrialRecordFromFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const rawData = fs.readFileSync(filePath, 'utf8').trim();
      if (!rawData) {
        return null;
      }

      const parsed = JSON.parse(rawData);
      const legacyRecord = this.extractLegacyTrialRecord(parsed, filePath);
      if (legacyRecord) {
        return legacyRecord;
      }

      return this.isValidTrialRecord(parsed)
        ? { startedAt: normalizeStartedAt(parsed.startedAt) }
        : null;
    } catch (err) {
      return null;
    }
  }

  inspectTrialRecordFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        return { present: false, valid: false, record: null, format: null };
      }

      const rawData = fs.readFileSync(filePath, 'utf8').trim();
      if (!rawData) {
        return { present: true, valid: false, record: null, format: null };
      }

      const parsed = JSON.parse(rawData);
      const legacyRecord = this.extractLegacyTrialRecord(parsed, filePath);
      if (legacyRecord) {
        return {
          present: true,
          valid: true,
          record: legacyRecord,
          format: 'legacy',
        };
      }

      if (!this.isValidTrialRecord(parsed)) {
        return { present: true, valid: false, record: null, format: null };
      }

      return {
        present: true,
        valid: true,
        record: { startedAt: normalizeStartedAt(parsed.startedAt) },
        format: 'signed',
      };
    } catch (error) {
      return { present: true, valid: false, record: null, format: null };
    }
  }

  writeTrialRecordToFile(filePath, trialRecord) {
    try {
      ensureDir(path.dirname(filePath));
      fs.writeFileSync(filePath, JSON.stringify(trialRecord, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }

  readTrialRecordFromRegistry() {
    if (process.platform !== 'win32') {
      return null;
    }

    try {
      const output = execFileSync(
        'reg',
        ['query', TRIAL_REGISTRY_KEY],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      );

      const startedAtMatch = output.match(new RegExp(`${TRIAL_STARTED_AT_VALUE}\\s+REG_SZ\\s+(.+)`));
      const signatureMatch = output.match(new RegExp(`${TRIAL_SIGNATURE_VALUE}\\s+REG_SZ\\s+(.+)`));
      const trialRecord = {
        startedAt: startedAtMatch?.[1]?.trim(),
        machineId: this.getMachineId(),
        signature: signatureMatch?.[1]?.trim(),
      };

      return this.isValidTrialRecord(trialRecord)
        ? { startedAt: normalizeStartedAt(trialRecord.startedAt) }
        : null;
    } catch (error) {
      return null;
    }
  }

  inspectTrialRecordRegistry() {
    if (process.platform !== 'win32') {
      return { present: false, valid: false, record: null, format: null };
    }

    try {
      const output = execFileSync(
        'reg',
        ['query', TRIAL_REGISTRY_KEY],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      );

      const startedAtMatch = output.match(new RegExp(`${TRIAL_STARTED_AT_VALUE}\\s+REG_SZ\\s+(.+)`));
      const signatureMatch = output.match(new RegExp(`${TRIAL_SIGNATURE_VALUE}\\s+REG_SZ\\s+(.+)`));

      if (!startedAtMatch && !signatureMatch) {
        return { present: false, valid: false, record: null, format: null };
      }

      const trialRecord = {
        startedAt: startedAtMatch?.[1]?.trim(),
        machineId: this.getMachineId(),
        signature: signatureMatch?.[1]?.trim(),
      };

      if (!this.isValidTrialRecord(trialRecord)) {
        return { present: true, valid: false, record: null, format: null };
      }

      return {
        present: true,
        valid: true,
        record: { startedAt: normalizeStartedAt(trialRecord.startedAt) },
        format: 'signed',
      };
    } catch (error) {
      return { present: false, valid: false, record: null, format: null };
    }
  }

  writeTrialRecordToRegistry(trialRecord) {
    if (process.platform !== 'win32') {
      return;
    }

    try {
      execFileSync(
        'reg',
        ['add', TRIAL_REGISTRY_KEY, '/f'],
        { stdio: 'ignore' }
      );
      execFileSync(
        'reg',
        ['add', TRIAL_REGISTRY_KEY, '/v', TRIAL_STARTED_AT_VALUE, '/t', 'REG_SZ', '/d', trialRecord.startedAt, '/f'],
        { stdio: 'ignore' }
      );
      execFileSync(
        'reg',
        ['add', TRIAL_REGISTRY_KEY, '/v', TRIAL_SIGNATURE_VALUE, '/t', 'REG_SZ', '/d', trialRecord.signature, '/f'],
        { stdio: 'ignore' }
      );
    } catch (error) {
      // Keep trial functional even if registry write fails.
    }
  }

  buildTamperRecord(reason) {
    const machineId = this.getMachineId();
    const detectedAt = new Date().toISOString();

    return {
      tampered: true,
      detectedAt,
      reason,
      machineId,
      signature: this.generateTamperSignature(machineId, detectedAt, reason),
    };
  }

  isValidTamperRecord(record) {
    const detectedAt = normalizeStartedAt(record?.detectedAt);
    const reason = typeof record?.reason === 'string' ? record.reason : '';
    const currentMachineId = this.getMachineId();

    if (!record?.tampered || !detectedAt || !reason || record?.machineId !== currentMachineId || typeof record?.signature !== 'string') {
      return false;
    }

    return record.signature === this.generateTamperSignature(currentMachineId, detectedAt, reason);
  }

  readTamperRecordFromFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const rawData = fs.readFileSync(filePath, 'utf8').trim();
      if (!rawData) {
        return null;
      }

      const parsed = JSON.parse(rawData);
      return this.isValidTamperRecord(parsed)
        ? {
            tampered: true,
            detectedAt: normalizeStartedAt(parsed.detectedAt),
            reason: parsed.reason,
          }
        : null;
    } catch (error) {
      return null;
    }
  }

  writeTamperRecordToFile(filePath, tamperRecord) {
    try {
      ensureDir(path.dirname(filePath));
      fs.writeFileSync(filePath, JSON.stringify(tamperRecord, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }

  readTamperRecordFromRegistry() {
    if (process.platform !== 'win32') {
      return null;
    }

    try {
      const output = execFileSync(
        'reg',
        ['query', TRIAL_REGISTRY_KEY],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      );

      const tamperedMatch = output.match(new RegExp(`${TRIAL_TAMPERED_VALUE}\\s+REG_SZ\\s+(.+)`));
      const detectedAtMatch = output.match(new RegExp(`${TRIAL_TAMPERED_AT_VALUE}\\s+REG_SZ\\s+(.+)`));
      const reasonMatch = output.match(new RegExp(`${TRIAL_TAMPER_REASON_VALUE}\\s+REG_SZ\\s+(.+)`));

      const tamperRecord = {
        tampered: tamperedMatch?.[1]?.trim() === '1',
        detectedAt: detectedAtMatch?.[1]?.trim(),
        reason: reasonMatch?.[1]?.trim(),
        machineId: this.getMachineId(),
        signature: this.generateTamperSignature(
          this.getMachineId(),
          detectedAtMatch?.[1]?.trim(),
          reasonMatch?.[1]?.trim()
        ),
      };

      return this.isValidTamperRecord(tamperRecord)
        ? {
            tampered: true,
            detectedAt: normalizeStartedAt(tamperRecord.detectedAt),
            reason: tamperRecord.reason,
          }
        : null;
    } catch (error) {
      return null;
    }
  }

  writeTamperRecordToRegistry(tamperRecord) {
    if (process.platform !== 'win32') {
      return;
    }

    try {
      execFileSync('reg', ['add', TRIAL_REGISTRY_KEY, '/f'], { stdio: 'ignore' });
      execFileSync('reg', ['add', TRIAL_REGISTRY_KEY, '/v', TRIAL_TAMPERED_VALUE, '/t', 'REG_SZ', '/d', '1', '/f'], { stdio: 'ignore' });
      execFileSync('reg', ['add', TRIAL_REGISTRY_KEY, '/v', TRIAL_TAMPERED_AT_VALUE, '/t', 'REG_SZ', '/d', tamperRecord.detectedAt, '/f'], { stdio: 'ignore' });
      execFileSync('reg', ['add', TRIAL_REGISTRY_KEY, '/v', TRIAL_TAMPER_REASON_VALUE, '/t', 'REG_SZ', '/d', tamperRecord.reason, '/f'], { stdio: 'ignore' });
    } catch (error) {
      // Best-effort only.
    }
  }

  getTamperStatus() {
    const fileRecord = TAMPER_FILE_PATHS
      .map((filePath) => this.readTamperRecordFromFile(filePath))
      .find(Boolean);

    if (fileRecord) {
      return fileRecord;
    }

    return this.readTamperRecordFromRegistry();
  }

  markTrialTampered(reason) {
    const existingTamperStatus = this.getTamperStatus();
    if (existingTamperStatus) {
      return existingTamperStatus;
    }

    const tamperRecord = this.buildTamperRecord(reason);
    TAMPER_FILE_PATHS.forEach((filePath) => this.writeTamperRecordToFile(filePath, tamperRecord));
    this.writeTamperRecordToRegistry(tamperRecord);

    return {
      tampered: true,
      detectedAt: tamperRecord.detectedAt,
      reason: tamperRecord.reason,
    };
  }

  getStoredTrialRecords() {
    const fileInspections = TRIAL_FILE_PATHS.map((filePath) => this.inspectTrialRecordFile(filePath));
    const registryInspection = this.inspectTrialRecordRegistry();
    const inspections = [...fileInspections, registryInspection];

    if (inspections.some((inspection) => inspection.present && !inspection.valid)) {
      return { tampered: true, reason: 'invalid_trial_record', records: [] };
    }

    const signedRecords = inspections
      .filter((inspection) => inspection.valid && inspection.record && inspection.format === 'signed')
      .map((inspection) => inspection.record);

    const legacyRecords = inspections
      .filter((inspection) => inspection.valid && inspection.record && inspection.format === 'legacy')
      .map((inspection) => inspection.record);

    if (signedRecords.length > 0 && legacyRecords.length > 0) {
      return { tampered: true, reason: 'inconsistent_trial_record', records: [...signedRecords, ...legacyRecords] };
    }

    if (signedRecords.length === 0 && legacyRecords.length > 0) {
      const presentInspections = inspections.filter((inspection) => inspection.present);
      if (legacyRecords.length === 1 && presentInspections.length === 1) {
        return { tampered: false, reason: null, records: legacyRecords };
      }

      return { tampered: true, reason: 'inconsistent_trial_record', records: legacyRecords };
    }

    const records = signedRecords;

    const uniqueStartedAt = [...new Set(records.map((record) => record.startedAt))];
    if (uniqueStartedAt.length > 1) {
      return { tampered: true, reason: 'inconsistent_trial_record', records };
    }

    return { tampered: false, reason: null, records };
  }

  persistTrialRecord(trialRecord) {
    const signedTrialRecord = this.buildTrialRecord(trialRecord.startedAt);
    if (!signedTrialRecord) {
      return null;
    }

    TRIAL_FILE_PATHS.forEach((filePath) => this.writeTrialRecordToFile(filePath, signedTrialRecord));

    this.writeTrialRecordToRegistry(signedTrialRecord);
    return { startedAt: signedTrialRecord.startedAt };
  }

  createTrialRecord() {
    return this.persistTrialRecord({ startedAt: new Date().toISOString() });
  }

  getOrCreateTrialRecord() {
    const existingRecords = this.getStoredTrialRecords();
    if (existingRecords.tampered) {
      return null;
    }

    if (existingRecords.records.length > 0) {
      const earliestRecord = existingRecords.records.reduce((earliest, current) =>
        new Date(current.startedAt).getTime() < new Date(earliest.startedAt).getTime() ? current : earliest
      );

      return this.persistTrialRecord(earliestRecord) || earliestRecord;
    }

    return this.createTrialRecord();
  }

  getTrialStatus() {
    const tamperStatus = this.getTamperStatus();
    if (tamperStatus) {
      return {
        startedAt: null,
        expiresAt: null,
        durationDays: TRIAL_DURATION_DAYS,
        expired: true,
        daysLeft: 0,
        tampered: true,
        tamperReason: tamperStatus.reason,
      };
    }

    const storedTrialRecords = this.getStoredTrialRecords();
    if (storedTrialRecords.tampered) {
      this.markTrialTampered(storedTrialRecords.reason);
      return {
        startedAt: null,
        expiresAt: null,
        durationDays: TRIAL_DURATION_DAYS,
        expired: true,
        daysLeft: 0,
        tampered: true,
        tamperReason: storedTrialRecords.reason,
      };
    }

    const trialRecord = this.getOrCreateTrialRecord();
    if (!trialRecord) {
      return {
        startedAt: null,
        expiresAt: null,
        durationDays: TRIAL_DURATION_DAYS,
        expired: true,
        daysLeft: 0,
        tampered: true,
        tamperReason: 'invalid_trial_record',
      };
    }

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
      tampered: false,
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

  persistLocalLicenseKey() {
    try {
      fs.writeFileSync(LICENSE_FILE_PATH, this.generateKey(this.getMachineId()));
      return true;
    } catch (error) {
      return false;
    }
  }

  async fetchRemoteLedgerStatus(localTrial) {
    const response = await fetch(`${process.env.LICENSE_LEDGER_URL.replace(/\/+$/, '')}/api/license/ledger/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-license-ledger-secret': process.env.LICENSE_LEDGER_SHARED_SECRET,
      },
      body: JSON.stringify({
        machineId: this.getMachineId(),
        trialStartedAt: localTrial?.startedAt || null,
        tampered: Boolean(localTrial?.tampered),
        tamperReason: localTrial?.tamperReason || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`Remote ledger status failed with ${response.status}`);
    }

    return response.json();
  }

  async fetchRemoteLedgerActivation(productKey) {
    const response = await fetch(`${process.env.LICENSE_LEDGER_URL.replace(/\/+$/, '')}/api/license/ledger/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-license-ledger-secret': process.env.LICENSE_LEDGER_SHARED_SECRET,
      },
      body: JSON.stringify({
        machineId: this.getMachineId(),
        productKey,
      }),
    });

    const payload = await response.json().catch(() => ({ success: false, message: 'Remote activation failed.' }));
    if (!response.ok) {
      return payload;
    }

    return payload;
  }

  syncRemoteTrialLocally(remoteTrial) {
    if (!remoteTrial) {
      return;
    }

    if (remoteTrial.tampered) {
      this.markTrialTampered(remoteTrial.tamperReason || 'remote_tamper_flag');
      return;
    }

    if (remoteTrial.startedAt) {
      this.persistTrialRecord({ startedAt: remoteTrial.startedAt });
    }
  }

  async activateLicense(keyInput) {
    if (this.isRemoteLedgerConfigured()) {
      try {
        const remoteResult = await this.fetchRemoteLedgerActivation(keyInput);
        if (remoteResult?.success) {
          this.persistLocalLicenseKey();
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }

    const expectedKey = this.generateKey(this.getMachineId());
    // Normalize input (remove hyphens, make uppercase)
    const normalizedInput = keyInput ? keyInput.replace(/-/g, '').toUpperCase() : '';
    const normalizedExpected = expectedKey.replace(/-/g, '');
    
    if (normalizedInput === normalizedExpected) {
      return this.persistLocalLicenseKey();
    }
    return false;
  }

  async getStatus() {
    const activated = this.checkLicense();
    const localTrial = activated ? null : this.getTrialStatus();

    if (this.isRemoteLedgerConfigured()) {
      try {
        const remoteStatus = await this.fetchRemoteLedgerStatus(localTrial);

        if (remoteStatus.activated) {
          this.persistLocalLicenseKey();
        } else {
          this.syncRemoteTrialLocally(remoteStatus.trial);
        }

        return {
          activated: Boolean(remoteStatus.activated),
          machineId: this.getMachineId(),
          trial: remoteStatus.activated ? null : remoteStatus.trial,
        };
      } catch (error) {
        // Fall back to local state when remote ledger is unreachable.
      }
    }

    return {
      activated,
      machineId: this.getMachineId(),
      trial: activated ? null : localTrial,
    };
  }
}

module.exports = new LicenseService();
