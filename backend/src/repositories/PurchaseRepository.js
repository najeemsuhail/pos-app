const prisma = require('../db/prisma');
const { mapPurchase } = require('../db/mappers');

class PurchaseRepository {
  async create({ purchase, items }, client = prisma) {
    const created = await client.purchase.create({
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
        items: {
          include: { ingredient: true },
        },
      },
    });

    return mapPurchase(created);
  }

  async findAll(startDate = null, endDate = null, supplierId = null) {
    const where = this.buildWhere(startDate, endDate, supplierId);

    const purchases = await prisma.purchase.findMany({
      where,
      include: this.includeGraph(),
      orderBy: [{ purchaseDate: 'desc' }, { createdAt: 'desc' }],
    });

    return purchases.map(mapPurchase);
  }

  includeGraph() {
    return {
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
      items: {
        include: { ingredient: true },
      },
    };
  }

  buildWhere(startDate = null, endDate = null, supplierId = null) {
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

    return where;
  }

  async findPaginated(startDate = null, endDate = null, supplierId = null, limit = 25, offset = 0) {
    const where = this.buildWhere(startDate, endDate, supplierId);
    const [purchases, total] = await prisma.$transaction([
      prisma.purchase.findMany({
        where,
        include: this.includeGraph(),
        orderBy: [{ purchaseDate: 'desc' }, { createdAt: 'desc' }],
        take: limit,
        skip: offset,
      }),
      prisma.purchase.count({ where }),
    ]);

    return { data: purchases.map(mapPurchase), total };
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
        items: {
          include: { ingredient: true },
        },
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
        items: {
          include: { ingredient: true },
        },
      },
    });

    return mapPurchase(purchase);
  }

  async update(id, { purchase, items }, client = prisma) {
    // Delete old items
    await client.purchaseItem.deleteMany({
      where: { purchaseId: Number(id) },
    });

    // Update purchase and create new items
    const updated = await client.purchase.update({
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
        items: {
          include: { ingredient: true },
        },
      },
    });

    return mapPurchase(updated);
  }

  async delete(id, client = prisma) {
    // Delete purchase items first
    await client.purchaseItem.deleteMany({
      where: { purchaseId: Number(id) },
    });

    // Then delete the purchase
    return client.purchase.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PurchaseRepository();
