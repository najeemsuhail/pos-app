const path = require('path');
const { desktopDbPath, repoDbPath } = require('./paths');

const generatedClientPath = path.resolve(__dirname, '../generated/prisma');
const { PrismaClient } = require(generatedClientPath);

function toSqliteUrl(filePath) {
  return `file:${path.resolve(filePath).replace(/\\/g, '/')}`;
}

if (process.env.DESKTOP_USE_SQLITE === 'true') {
  process.env.DATABASE_URL = toSqliteUrl(desktopDbPath);
} else if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = toSqliteUrl(repoDbPath);
}

if (process.resourcesPath) {
  const unpackedEnginePath = path.join(
    process.resourcesPath,
    'app.asar.unpacked',
    'backend',
    'src',
    'generated',
    'prisma',
    'query_engine-windows.dll.node'
  );

  process.env.PRISMA_QUERY_ENGINE_LIBRARY = unpackedEnginePath;
}

const prisma = new PrismaClient();

module.exports = prisma;
