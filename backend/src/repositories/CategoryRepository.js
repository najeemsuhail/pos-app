const prisma = require('../db/prisma');
const { mapCategory } = require('../db/mappers');

class CategoryRepository {
  async create(name) {
    const category = await prisma.category.create({
      data: { name, isDeleted: false },
    });
    return mapCategory(category);
  }

  async findAll() {
    const categories = await prisma.category.findMany({
      where: { isDeleted: false },
      orderBy: { name: 'asc' },
    });
    return categories.map(mapCategory);
  }

  async findById(id) {
    const category = await prisma.category.findFirst({
      where: { id: Number(id), isDeleted: false },
    });
    return mapCategory(category);
  }

  async update(id, name) {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return mapCategory(category);
  }

  async softDelete(id) {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });
    return mapCategory(category);
  }
}

module.exports = new CategoryRepository();
