const prisma = require('../db/prisma');
const { mapMenuItem } = require('../db/mappers');

class MenuItemRepository {
  async create(name, price, categoryId, isAvailable = true, imageUrl = null) {
    const item = await prisma.menuItem.create({
      data: {
        name,
        price,
        categoryId: Number(categoryId),
        isAvailable,
        imageUrl,
        isDeleted: false,
      },
    });
    return mapMenuItem(item);
  }

  async findAll() {
    const items = await prisma.menuItem.findMany({
      where: { isDeleted: false },
      orderBy: [{ categoryId: 'asc' }, { name: 'asc' }],
    });
    return items.map(mapMenuItem);
  }

  async findByCategory(categoryId) {
    const items = await prisma.menuItem.findMany({
      where: {
        categoryId: Number(categoryId),
        isDeleted: false,
        isAvailable: true,
      },
      orderBy: { name: 'asc' },
    });
    return items.map(mapMenuItem);
  }

  async findById(id) {
    const item = await prisma.menuItem.findFirst({
      where: { id: Number(id), isDeleted: false },
    });
    return mapMenuItem(item);
  }

  async update(id, name, price, categoryId, isAvailable, imageUrl = null) {
    const item = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        categoryId: Number(categoryId),
        isAvailable,
        imageUrl,
      },
    });
    return mapMenuItem(item);
  }

  async updateImage(id, imageUrl) {
    const item = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: { imageUrl },
    });
    return mapMenuItem(item);
  }

  async toggleAvailability(id, isAvailable) {
    const item = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: { isAvailable },
    });
    return mapMenuItem(item);
  }

  async softDelete(id) {
    const item = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
    return mapMenuItem(item);
  }
}

module.exports = new MenuItemRepository();
