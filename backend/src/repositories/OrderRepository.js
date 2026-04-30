const prisma = require('../db/prisma');
const { mapOrder } = require('../db/mappers');

class OrderRepository {
  async create(billNumber, subtotal, discountAmount, taxAmount, finalAmount, tableId = null, status = 'pending', paymentStatus = 'unpaid', orderType = 'dine_in') {
    const order = await prisma.order.create({
      data: {
        billNumber,
        status,
        paymentStatus,
        orderType,
        subtotal,
        discountAmount,
        taxAmount,
        finalAmount,
        tableId,
      },
    });
    return mapOrder(order);
  }

  async findById(id) {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });
    return mapOrder(order);
  }

  async findByBillNumber(billNumber) {
    const order = await prisma.order.findUnique({
      where: { billNumber },
    });
    return mapOrder(order);
  }

  async update(id, subtotal, discountAmount, taxAmount, finalAmount, paymentStatus = undefined) {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        subtotal,
        discountAmount,
        taxAmount,
        finalAmount,
        ...(paymentStatus ? { paymentStatus } : {}),
        updatedAt: new Date(),
      },
    });
    return mapOrder(order);
  }

  async updateStatus(id, status) {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
    return mapOrder(order);
  }

  async updatePaymentStatus(id, paymentStatus) {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        paymentStatus,
        updatedAt: new Date(),
      },
    });
    return mapOrder(order);
  }

  async updateStatuses(id, status, paymentStatus) {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status,
        paymentStatus,
        updatedAt: new Date(),
      },
    });
    return mapOrder(order);
  }

  async findAll(limit = 100, offset = 0) {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return orders.map(mapOrder);
  }

  async findByDateRange(startDate, endDate) {
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(mapOrder);
  }

  async findActiveTables() {
    return this.findActiveOrders();
  }

  async findActiveOrders() {
    const orders = await prisma.order.findMany({
      where: {
        status: 'pending',
        items: {
          some: {},
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return orders.map(mapOrder);
  }
}

module.exports = new OrderRepository();
