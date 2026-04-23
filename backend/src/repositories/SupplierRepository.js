const prisma = require('../db/prisma');
const { mapSupplier } = require('../db/mappers');

class SupplierRepository {
  async create(data) {
    const supplier = await prisma.supplier.create({
      data,
    });

    return mapSupplier(supplier);
  }

  async findAll() {
    const suppliers = await prisma.supplier.findMany({
      include: {
        purchases: {
          select: {
            totalAmount: true,
            paidAmount: true,
          },
        },
      },
      orderBy: [{ name: 'asc' }],
    });

    return suppliers.map(mapSupplier);
  }

  async findById(id) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
      include: {
        purchases: {
          select: {
            totalAmount: true,
            paidAmount: true,
          },
        },
      },
    });

    return supplier ? mapSupplier(supplier) : null;
  }

  async findRawById(id) {
    return prisma.supplier.findUnique({
      where: { id: Number(id) },
    });
  }

  async findByName(name) {
    return prisma.supplier.findUnique({
      where: { name },
    });
  }

  async update(id, data) {
    const supplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data,
      include: {
        purchases: {
          select: {
            totalAmount: true,
            paidAmount: true,
          },
        },
      },
    });

    return mapSupplier(supplier);
  }

  async delete(id) {
    return prisma.supplier.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new SupplierRepository();
