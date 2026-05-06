const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load root .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const NEW_NAME = process.env.DESKTOP_APP_NAME || 'ServeStack';
const SYSTEM_NAME = NEW_NAME.toLowerCase().replace(/\s+/g, '-');
const APP_ID = `com.${SYSTEM_NAME.replace(/-/g, '.')}.app`;

const packagePath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

console.log(`🚀 Rebranding application to: "${NEW_NAME}"`);

// Update package.json fields
pkg.name = SYSTEM_NAME;
pkg.build.productName = NEW_NAME;
pkg.build.appId = APP_ID;

// Write back to package.json
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
console.log('✅ package.json updated successfully!');

// Synchronize BRAND in paths.js
const pathsJsPath = path.join(__dirname, '..', 'backend', 'src', 'db', 'paths.js');
if (fs.existsSync(pathsJsPath)) {
  let pathsContent = fs.readFileSync(pathsJsPath, 'utf8');
  // Match const APP_FOLDER_NAME = ...;
  const regex = /const APP_FOLDER_NAME = [^;]+;/;
  const replacement = `const APP_FOLDER_NAME = process.env.DESKTOP_APP_NAME || '${NEW_NAME}';`;
  pathsContent = pathsContent.replace(regex, replacement);
  fs.writeFileSync(pathsJsPath, pathsContent, 'utf8');
  console.log('✅ backend/src/db/paths.js synchronized.');
}

console.log('💡 Note: You may need to restart your development server or rebuild the app for changes to take effect.');
