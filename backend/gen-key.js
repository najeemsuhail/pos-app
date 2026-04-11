const { machineIdSync } = require('node-machine-id');
const crypto = require('crypto');

const SECRET_SALT = 'HOPE_PRIVATE_POS_SALT_123';

try {
  const mid = machineIdSync();
  const hash = crypto.createHash('sha256').update(mid + SECRET_SALT).digest('hex').toUpperCase();
  const key = hash.substring(0, 16);
  const formattedKey = `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}-${key.slice(12, 16)}`;
  
  console.log('--- LICENSE GENERATION ---');
  console.log('Machine ID:  ' + mid);
  console.log('Product Key: ' + formattedKey);
  console.log('--------------------------');
} catch (e) {
  console.error('Error generating key:', e.message);
}
