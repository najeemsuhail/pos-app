const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const MenuItemRepository = require('../repositories/MenuItemRepository');
const { generateBillNumber, calculateTax, calculateDiscount } = require('../utils/billing');

class OrderService {
  async createOrder() {
    const billNumber = generateBillNumber();
    return await OrderRepository.create(billNumber, 0, 0, 0, 0);
  }

  async getOrderById(id) {
    const order = await OrderRepository.findById(id);
    if (!order) {
      throw { status: 404, message: 'Order not found' };
    }
    return order;
  }

  async addItemToOrder(orderId, menuItemId, quantity) {
    await this.getOrderById(orderId);

    const menuItem = await MenuItemRepository.findById(menuItemId);
    if (!menuItem) {
      throw { status: 404, message: 'Menu item not found' };
    }

    if (!menuItem.is_available) {
      throw { status: 400, message: 'Item is not available' };
    }

    // Store snapshot of name and price
    return await OrderItemRepository.create(
      orderId,
      menuItemId,
      menuItem.name,
      menuItem.price,
      quantity
    );
  }

  async updateOrderItem(orderId, itemId, quantity) {
    await this.getOrderById(orderId);

    if (quantity <= 0) {
      return await OrderItemRepository.delete(itemId);
    }

    return await OrderItemRepository.updateQuantity(itemId, quantity);
  }

  async removeOrderItem(orderId, itemId) {
    await this.getOrderById(orderId);
    return await OrderItemRepository.delete(itemId);
  }

  async getOrderItems(orderId) {
    await this.getOrderById(orderId);
    return await OrderItemRepository.findByOrderId(orderId);
  }

  async finalizeOrder(orderId, discountPercent = 0, taxRate = 5) {
    const order = await this.getOrderById(orderId);
    const items = await this.getOrderItems(orderId);

    if (items.length === 0) {
      throw { status: 400, message: 'Order must have at least one item' };
    }

    // Calculate subtotal - convert string prices from PostgreSQL to numbers
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);

    // Calculate discount and tax
    const discountAmount = (subtotal * (discountPercent || 0)) / 100;
    const taxAmount = calculateTax(subtotal - discountAmount, taxRate);
    const finalAmount = subtotal - discountAmount + taxAmount;

    return await OrderRepository.update(
      orderId,
      subtotal,
      discountAmount,
      taxAmount,
      finalAmount
    );
  }

  async payOrder(orderId, payments) {
    const order = await this.getOrderById(orderId);

    if (order.status === 'paid') {
      throw { status: 400, message: 'Order is already paid' };
    }

    let totalPaid = 0;
    const paymentRecords = [];

    for (const payment of payments) {
      if (!payment.method || !payment.amount) {
        throw { status: 400, message: 'Payment method and amount are required' };
      }

      const record = await PaymentRepository.create(
        orderId,
        payment.method,
        payment.amount,
        payment.reference_id || null
      );

      paymentRecords.push(record);
      totalPaid += payment.amount;
    }

    if (totalPaid < order.final_amount) {
      throw { status: 400, message: 'Insufficient payment amount' };
    }

    await OrderRepository.updateStatus(orderId, 'paid');
    return { payments: paymentRecords, change: totalPaid - order.final_amount };
  }

  async cancelOrder(orderId) {
    const order = await this.getOrderById(orderId);

    if (order.status === 'paid') {
      throw { status: 400, message: 'Cannot cancel a paid order' };
    }

    return await OrderRepository.updateStatus(orderId, 'cancelled');
  }

  async getOrderPayments(orderId) {
    await this.getOrderById(orderId);
    return await PaymentRepository.findByOrderId(orderId);
  }

  async getAllOrders(limit = 100, offset = 0) {
    return await OrderRepository.findAll(limit, offset);
  }

  async getOrdersByDateRange(startDate, endDate) {
    return await OrderRepository.findByDateRange(startDate, endDate);
  }
}

module.exports = new OrderService();
