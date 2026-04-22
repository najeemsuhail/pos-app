const prisma = require('../db/prisma');
const { mapPayment } = require('../db/mappers');

class PaymentRepository {
  async create(orderId, method, amount, referenceId = null, source = 'Direct', status = 'settled', settledAmount = null, settledAt = null) {
    const payment = await prisma.payment.create({
      data: {
        orderId: Number(orderId),
        method,
        source,
        status,
        amount,
        settledAmount: settledAmount ?? (status === 'settled' ? amount : 0),
        referenceId,
        settledAt,
      },
    });
    return mapPayment(payment);
  }

  async findById(id) {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) },
    });
    return mapPayment(payment);
  }

  async updateSettlement(id, settledAmount, referenceId = null, settledAt = new Date()) {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) },
    });

    if (!payment) {
      return null;
    }

    const numericSettledAmount = Number(settledAmount);
    const status = numericSettledAmount >= Number(payment.amount) ? 'settled' : 'partial';
    const updatedPayment = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        settledAmount: numericSettledAmount,
        status,
        referenceId: referenceId ?? payment.referenceId,
        settledAt,
      },
    });

    return mapPayment(updatedPayment);
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
