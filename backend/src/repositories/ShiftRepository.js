const prisma = require('../db/prisma');
const { mapShift } = require('../db/mappers');

const includeUsers = {
  openedBy: true,
  closedBy: true,
};

class ShiftRepository {
  async findOpen() {
    const shift = await prisma.shift.findFirst({
      where: { status: 'open' },
      orderBy: { openedAt: 'desc' },
      include: includeUsers,
    });

    return mapShift(shift);
  }

  async findById(id) {
    const shift = await prisma.shift.findUnique({
      where: { id: Number(id) },
      include: includeUsers,
    });

    return mapShift(shift);
  }

  async findByDateRange(startDate, endDate) {
    const shifts = await prisma.shift.findMany({
      where: {
        openedAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
      orderBy: { openedAt: 'desc' },
      include: includeUsers,
    });

    return shifts.map(mapShift);
  }

  async create({ openedByUserId, openingCash, openingNotes }) {
    const shift = await prisma.shift.create({
      data: {
        openedByUserId: Number(openedByUserId),
        openingCash,
        openingNotes,
        status: 'open',
      },
      include: includeUsers,
    });

    return mapShift(shift);
  }

  async close(id, data) {
    const shift = await prisma.shift.update({
      where: { id: Number(id) },
      data: {
        status: 'closed',
        closedByUserId: Number(data.closedByUserId),
        closingCash: data.closingCash,
        cashTotal: data.cashTotal,
        cardTotal: data.cardTotal,
        upiTotal: data.upiTotal,
        otherTotal: data.otherTotal,
        totalPayments: data.totalPayments,
        expectedCash: data.expectedCash,
        difference: data.difference,
        closingNotes: data.closingNotes,
        closedAt: data.closedAt,
        updatedAt: new Date(),
      },
      include: includeUsers,
    });

    return mapShift(shift);
  }
}

module.exports = new ShiftRepository();
