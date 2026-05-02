const prisma = require('../db/prisma');
const { mapOrderItem } = require('../db/mappers');

class OrderItemRepository {
  async create(orderId, menuItemId, name, price, quantity) {
    const item = await prisma.orderItem.create({
      data: {
        orderId: Number(orderId),
        menuItemId: Number(menuItemId),
        name,
        price,
        quantity: Number(quantity),
      },
    });
    return mapOrderItem(item);
  }

  async findByOrderId(orderId) {
    const items = await prisma.orderItem.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { createdAt: 'asc' },
    });
    return items.map(mapOrderItem);
  }

  async findByOrderIds(orderIds) {
    const items = await prisma.orderItem.findMany({
      where: {
        orderId: { in: orderIds.map(Number) },
      },
      include: {
        menuItem: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    return items.map(mapOrderItem);
  }

  async updateQuantity(id, quantity) {
    const item = await prisma.orderItem.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) },
    });
    return mapOrderItem(item);
  }

  async delete(id) {
    const item = await prisma.orderItem.delete({
      where: { id: Number(id) },
    });
    return mapOrderItem(item);
  }

  async deleteByOrderId(orderId) {
    const { count } = await prisma.orderItem.deleteMany({
      where: { orderId: Number(orderId) },
    });
    return count;
  }
}

module.exports = new OrderItemRepository();
