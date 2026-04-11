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
}

module.exports = new LicenseService();
