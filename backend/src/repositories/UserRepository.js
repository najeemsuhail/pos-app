const prisma = require('../db/prisma');
const { mapUser } = require('../db/mappers');

class UserRepository {
  async findByUsername(username) {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });
    return mapUser(user);
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return mapUser(user);
  }

  async create(name, role, password) {
    const user = await prisma.user.create({
      data: { name, role, password },
    });
    return mapUser(user);
  }

  async all() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

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
}

module.exports = new UserRepository();
