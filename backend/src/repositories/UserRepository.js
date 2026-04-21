const prisma = require('../db/prisma');
const { mapUser } = require('../db/mappers');
const { normalizeUserFeatureAccessOverrides } = require('../constants/featureAccess');

function serializeFeatureAccessOverrides(featureAccessOverrides = {}) {
  const normalized = normalizeUserFeatureAccessOverrides(featureAccessOverrides);
  return Object.keys(normalized).length > 0 ? JSON.stringify(normalized) : null;
}

let ensureFeatureAccessColumnPromise = null;

async function ensureFeatureAccessColumn() {
  if (!ensureFeatureAccessColumnPromise) {
    ensureFeatureAccessColumnPromise = (async () => {
      const columns = await prisma.$queryRawUnsafe("PRAGMA table_info('users')");
      const hasColumn = columns.some((column) => column.name === 'feature_access_overrides');

      if (!hasColumn) {
        await prisma.$executeRawUnsafe(
          'ALTER TABLE users ADD COLUMN feature_access_overrides TEXT'
        );
      }
    })();
  }

  return ensureFeatureAccessColumnPromise;
}

class UserRepository {
  async findByUsername(username) {
    await ensureFeatureAccessColumn();
    const users = await prisma.$queryRawUnsafe(
      `SELECT id, name, role, password, feature_access_overrides AS featureAccessOverrides, created_at AS createdAt
       FROM users
       WHERE name = ?
       LIMIT 1`,
      username
    );
    return mapUser(users[0] || null);
  }

  async findById(id) {
    await ensureFeatureAccessColumn();
    const users = await prisma.$queryRawUnsafe(
      `SELECT id, name, role, password, feature_access_overrides AS featureAccessOverrides, created_at AS createdAt
       FROM users
       WHERE id = ?
       LIMIT 1`,
      Number(id)
    );
    return mapUser(users[0] || null);
  }

  async create(name, role, password, featureAccessOverrides = {}) {
    await ensureFeatureAccessColumn();
    await prisma.$executeRawUnsafe(
      `INSERT INTO users (name, role, password, feature_access_overrides)
       VALUES (?, ?, ?, ?)`,
      name,
      role,
      password,
      serializeFeatureAccessOverrides(featureAccessOverrides)
    );

    const createdUsers = await prisma.$queryRawUnsafe(
      `SELECT id, name, role, password, feature_access_overrides AS featureAccessOverrides, created_at AS createdAt
       FROM users
       WHERE id = last_insert_rowid()
       LIMIT 1`
    );

    return mapUser(createdUsers[0] || null);
  }

  async all() {
    await ensureFeatureAccessColumn();
    const users = await prisma.$queryRawUnsafe(
      `SELECT id, name, role, password, feature_access_overrides AS featureAccessOverrides, created_at AS createdAt
       FROM users
       ORDER BY created_at DESC`
    );

    return users.map((user) => {
      const mapped = mapUser(user);
      delete mapped.password;
      return mapped;
    });
  }

  async getAll() {
    return this.all();
  }

  async delete(id) {
    return prisma.user.delete({
      where: { id: Number(id) },
      select: { id: true },
    });
  }

  async updatePassword(id, password) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: { password },
    });
  }

  async updateFeatureAccessOverrides(id, featureAccessOverrides = {}) {
    await ensureFeatureAccessColumn();
    await prisma.$executeRawUnsafe(
      `UPDATE users
       SET feature_access_overrides = ?
       WHERE id = ?`,
      serializeFeatureAccessOverrides(featureAccessOverrides),
      Number(id)
    );

    return this.findById(id);
  }
}

module.exports = new UserRepository();
