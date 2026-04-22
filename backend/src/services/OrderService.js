const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const MenuItemRepository = require('../repositories/MenuItemRepository');
const prisma = require('../db/prisma');
const { mapOrder } = require('../db/mappers');
const { formatBillDate, formatDailyBillNumber, calculateTax, calculateDiscount } = require('../utils/billing');
const SettingService = require('./SettingService');

let ensureBillSequenceTablePromise = null;

async function ensureBillSequenceTable() {
  if (!ensureBillSequenceTablePromise) {
    ensureBillSequenceTablePromise = prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS bill_sequences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_date TEXT NOT NULL UNIQUE,
        last_number INTEGER NOT NULL DEFAULT 0,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `).catch((error) => {
      ensureBillSequenceTablePromise = null;
      throw error;
    });
  }

  return ensureBillSequenceTablePromise;
}

class OrderService {
  async createOrder(tableId = null) {
    const billDate = formatBillDate(new Date());
    const settings = SettingService.getSettings();
    await ensureBillSequenceTable();

    return await prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(
        `
          INSERT INTO bill_sequences (business_date, last_number, updated_at)
          VALUES (?, 1, CURRENT_TIMESTAMP)
          ON CONFLICT(business_date) DO UPDATE SET
            last_number = last_number + 1,
            updated_at = CURRENT_TIMESTAMP
        `,
        billDate
      );

      const sequenceRows = await tx.$queryRawUnsafe(
        'SELECT last_number AS lastNumber FROM bill_sequences WHERE business_date = ?',
        billDate
      );
      const nextSequence = Number(sequenceRows?.[0]?.lastNumber);

      if (!Number.isInteger(nextSequence) || nextSequence <= 0) {
        throw { status: 500, message: 'Failed to generate bill sequence' };
      }

      const order = await tx.order.create({
        data: {
          billNumber: formatDailyBillNumber(settings.billNumberPrefix, billDate, nextSequence),
          status: 'pending',
          subtotal: 0,
          discountAmount: 0,
          taxAmount: 0,
          finalAmount: 0,
          tableId,
        },
      });

      return mapOrder(order);
    });
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

  async syncItemsToOrder(orderId, itemsArray) {
    await this.getOrderById(orderId);
    
    // Clear existing
    await OrderItemRepository.deleteByOrderId(orderId);
    
    // Insert new items
    for (const item of itemsArray) {
      if (item.menu_item_id && item.quantity > 0) {
        await this.addItemToOrder(orderId, item.menu_item_id, item.quantity);
      }
    }
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

  async getActiveTableOrders() {
    return await OrderRepository.findActiveTables();
  }
}

module.exports = new OrderService();
