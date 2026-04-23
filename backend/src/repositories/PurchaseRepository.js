const prisma = require('../db/prisma');
const { mapPurchase } = require('../db/mappers');

class PurchaseRepository {
  async create({ purchase, items }) {
    const created = await prisma.purchase.create({
      data: {
        ...purchase,
        items: {
          create: items,
        },
      },
      include: {
        supplier: {
          include: {
            purchases: {
              select: {
                totalAmount: true,
                paidAmount: true,
              },
            },
          },
        },
        items: true,
      },
    });

    return mapPurchase(created);
  }

  async findAll(startDate = null, endDate = null, supplierId = null) {
    const where = {};

    if (startDate && endDate) {
      where.purchaseDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (supplierId) {
      where.supplierId = Number(supplierId);
    }

    const purchases = await prisma.purchase.findMany({
      where,
      include: {
        supplier: {
          include: {
            purchases: {
              select: {
                totalAmount: true,
                paidAmount: true,
              },
            },
          },
        },
        items: true,
      },
      orderBy: [{ purchaseDate: 'desc' }, { createdAt: 'desc' }],
    });

    return purchases.map(mapPurchase);
  }

  async findById(id) {
    const purchase = await prisma.purchase.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: {
          include: {
            purchases: {
              select: {
                totalAmount: true,
                paidAmount: true,
              },
            },
          },
        },
        items: true,
      },
    });

    return purchase ? mapPurchase(purchase) : null;
  }

  async updatePayment(id, paidAmount, paymentStatus) {
    const purchase = await prisma.purchase.update({
      where: { id: Number(id) },
      data: {
        paidAmount,
        paymentStatus,
      },
      include: {
        supplier: {
          include: {
            purchases: {
              select: {
                totalAmount: true,
                paidAmount: true,
              },
            },
          },
        },
        items: true,
      },
    });

    return mapPurchase(purchase);
  }

  async update(id, { purchase, items }) {
    // Delete old items
    await prisma.purchaseItem.deleteMany({
      where: { purchaseId: Number(id) },
    });

    // Update purchase and create new items
    const updated = await prisma.purchase.update({
      where: { id: Number(id) },
      data: {
        ...purchase,
        items: {
          create: items,
        },
      },
      include: {
        supplier: {
          include: {
            purchases: {
              select: {
                totalAmount: true,
                paidAmount: true,
              },
            },
          },
        },
        items: true,
      },
    });

    return mapPurchase(updated);
  }

  async delete(id) {
    // Delete purchase items first
    await prisma.purchaseItem.deleteMany({
      where: { purchaseId: Number(id) },
    });

    // Then delete the purchase
    return prisma.purchase.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PurchaseRepository();
