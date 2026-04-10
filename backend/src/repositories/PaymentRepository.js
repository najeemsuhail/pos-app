const prisma = require('../db/prisma');
const { mapPayment } = require('../db/mappers');

class PaymentRepository {
  async create(orderId, method, amount, referenceId = null) {
    const payment = await prisma.payment.create({
      data: {
        orderId: Number(orderId),
        method,
        amount,
        referenceId,
      },
    });
    return mapPayment(payment);
  }

  async findByOrderId(orderId) {
    const payments = await prisma.payment.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: 'asc' },
    });
    return payments.map(mapPayment);
  }

  async findAll(limit = 100, offset = 0) {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return payments.map(mapPayment);
  }

  async findByDateRange(startDate, endDate) {
    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return payments.map(mapPayment);
  }
}

module.exports = new PaymentRepository();
