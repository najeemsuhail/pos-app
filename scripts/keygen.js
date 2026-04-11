const crypto = require('crypto');

const SECRET_SALT = 'HOPE_PRIVATE_POS_SALT_123';

function generateKey(machineId) {
  const hash = crypto.createHash('sha256').update(machineId + SECRET_SALT).digest('hex').toUpperCase();
  const key = hash.substring(0, 16);
  return `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}-${key.slice(12, 16)}`;
}

const arg = process.argv[2];

if (!arg) {
  console.error('\n❌ Please provide a Machine ID.');
  console.error('Usage: node scripts/keygen.js <MACHINE_ID>\n');
  process.exit(1);
}

const key = generateKey(arg);
console.log('\n✅ Product Key Generated Successfully!\n');
console.log(`Machine ID : ${arg}`);
console.log(`PRODUCT KEY: ${key}\n`);
