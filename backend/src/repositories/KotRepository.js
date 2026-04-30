const prisma = require('../db/prisma');
const { mapKotTicket } = require('../db/mappers');

class KotRepository {
  async createForOrder(order, orderItems) {
    const ticket = await prisma.$transaction(async (tx) => {
      const existingCount = await tx.kotTicket.count({
        where: { orderId: Number(order.id) },
      });
      const kotNumber = `${order.bill_number}-KOT${existingCount + 1}`;

      return tx.kotTicket.create({
        data: {
          orderId: Number(order.id),
          kotNumber,
          status: 'printed',
          printedAt: new Date(),
          items: {
            create: orderItems.map((item) => ({
              orderItemId: Number(item.id),
              menuItemId: Number(item.menu_item_id),
              name: item.name,
              quantity: Number(item.quantity),
              status: 'pending',
            })),
          },
        },
        include: { items: true },
      });
    });

    return mapKotTicket(ticket);
  }

  async findByOrderId(orderId) {
    const tickets = await prisma.kotTicket.findMany({
      where: { orderId: Number(orderId) },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    return tickets.map(mapKotTicket);
  }
}

module.exports = new KotRepository();
