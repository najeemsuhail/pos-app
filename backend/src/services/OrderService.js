const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const MenuItemRepository = require('../repositories/MenuItemRepository');
const KotRepository = require('../repositories/KotRepository');
const prisma = require('../db/prisma');
const { mapOrder, mapPayment } = require('../db/mappers');
const { formatBillDate, formatDailyBillNumber, calculateTax } = require('../utils/billing');
const SettingService = require('./SettingService');
const { ORDER_TYPES, normalizeOrderType } = require('../utils/orderTypes');
const {
  ORDER_STATUSES,
  ORDER_PAYMENT_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_SOURCES,
  normalizePaymentInput,
  normalizePaymentSource,
  deriveOrderPaymentStatus,
  toNumber,
} = require('../utils/paymentState');

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
  async createOrder(tableId = null, orderType = ORDER_TYPES.DINE_IN) {
    const billDate = formatBillDate(new Date());
    const settings = SettingService.getSettings();
    const normalizedOrderType = normalizeOrderType(orderType);
    const normalizedTableId = normalizedOrderType === ORDER_TYPES.DINE_IN ? tableId : null;
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
          status: ORDER_STATUSES.PENDING,
          paymentStatus: ORDER_PAYMENT_STATUSES.UNPAID,
          subtotal: 0,
          discountAmount: 0,
          taxAmount: 0,
          finalAmount: 0,
          tableId: normalizedTableId,
          orderType: normalizedOrderType,
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

  async payOrder(orderId, payments, customerDetails = {}) {
    const order = await this.getOrderById(orderId);
    const customerName = typeof customerDetails.customer_name === 'string'
      ? customerDetails.customer_name.trim()
      : '';
    const customerPhone = typeof customerDetails.customer_phone === 'string'
      ? customerDetails.customer_phone.trim()
      : '';

    if ((payments || []).length === 0) {
      throw { status: 400, message: 'At least one payment entry is required' };
    }

    if (toNumber(order.final_amount) <= 0) {
      throw { status: 400, message: 'Finalize the order before recording payment' };
    }

    if (order.status === ORDER_STATUSES.CANCELLED) {
      throw { status: 400, message: 'Cannot accept payments for a cancelled order' };
    }

    if (order.payment_status === ORDER_PAYMENT_STATUSES.PAID) {
      throw { status: 400, message: 'Order is already fully settled' };
    }

    const normalizedPayments = payments.map((payment) => {
      if (!payment.method || payment.amount === undefined || payment.amount === null) {
        throw { status: 400, message: 'Payment method and amount are required' };
      }

      const normalized = normalizePaymentInput(payment);
      const aggregatorExpenseAmount = toNumber(payment.aggregator_expense_amount ?? payment.aggregatorExpenseAmount);

      if (normalized.amount <= 0) {
        throw { status: 400, message: 'Payment amount must be greater than zero' };
      }

      if (normalized.settledAmount < 0 || normalized.settledAmount > normalized.amount) {
        throw { status: 400, message: 'Settled amount must be between 0 and payment amount' };
      }

      if (aggregatorExpenseAmount < 0) {
        throw { status: 400, message: 'Aggregator expense amount cannot be negative' };
      }

      if (aggregatorExpenseAmount > normalized.amount) {
        throw { status: 400, message: 'Aggregator expense amount cannot exceed payment amount' };
      }

      return normalized;
    });

    const result = await prisma.$transaction(async (tx) => {
      const paymentRecords = [];

      for (const [index, payment] of normalizedPayments.entries()) {
        const record = await tx.payment.create({
          data: {
            orderId: Number(orderId),
            method: payment.method,
            source: payment.source,
            status: payment.status,
            amount: payment.amount,
            settledAmount: payment.settledAmount,
            referenceId: payment.referenceId,
            settledAt: payment.settledAt
              ? new Date(payment.settledAt)
              : payment.status === PAYMENT_STATUSES.SETTLED
                ? new Date()
                : null,
          },
        });

        paymentRecords.push(record);

        const source = normalizePaymentSource(payment.source);
        const rawPayment = payments[index] || {};
        const aggregatorExpenseAmount = toNumber(
          rawPayment.aggregator_expense_amount ?? rawPayment.aggregatorExpenseAmount
        );

        if (
          aggregatorExpenseAmount > 0
          && (source === PAYMENT_SOURCES.SWIGGY || source === PAYMENT_SOURCES.ZOMATO)
        ) {
          await tx.expense.create({
            data: {
              expenseDate: new Date(order.created_at || new Date()),
              category: 'Marketing',
              note: `${source} expense for bill ${order.bill_number}`,
              amount: aggregatorExpenseAmount,
              paymentMethod: source,
              reference: payment.referenceId || order.bill_number,
            },
          });
        }
      }

      const allPayments = await tx.payment.findMany({
        where: { orderId: Number(orderId) },
      });
      const paymentStatus = deriveOrderPaymentStatus(order.final_amount, allPayments);
      const status = order.status === ORDER_STATUSES.CANCELLED ? ORDER_STATUSES.CANCELLED : ORDER_STATUSES.COMPLETED;

      await tx.order.update({
        where: { id: Number(orderId) },
        data: {
          status,
          paymentStatus,
          customerName: customerName || null,
          customerPhone: customerPhone || null,
          updatedAt: new Date(),
        },
      });

      const totalSettled = allPayments.reduce((sum, payment) => sum + toNumber(payment.settledAmount), 0);

      return {
        payments: paymentRecords.map(mapPayment),
        payment_status: paymentStatus,
        change: Math.max(0, totalSettled - toNumber(order.final_amount)),
      };
    });

    return result;
  }

  async settlePayment(orderId, paymentId, settlementData = {}) {
    const order = await this.getOrderById(orderId);

    if (order.status === ORDER_STATUSES.CANCELLED) {
      throw { status: 400, message: 'Cannot settle payment for a cancelled order' };
    }

    const payment = await PaymentRepository.findById(paymentId);
    if (!payment || Number(payment.order_id) !== Number(orderId)) {
      throw { status: 404, message: 'Payment not found for this order' };
    }

    const settledAmount = settlementData.settled_amount ?? payment.amount;
    const numericSettledAmount = toNumber(settledAmount);

    if (numericSettledAmount <= 0) {
      throw { status: 400, message: 'Settled amount must be greater than zero' };
    }

    if (numericSettledAmount > toNumber(payment.amount)) {
      throw { status: 400, message: 'Settled amount cannot exceed payment amount' };
    }

    return prisma.$transaction(async (tx) => {
      const status = numericSettledAmount >= toNumber(payment.amount)
        ? PAYMENT_STATUSES.SETTLED
        : PAYMENT_STATUSES.PARTIAL;

      const updatedPayment = await tx.payment.update({
        where: { id: Number(paymentId) },
        data: {
          settledAmount: numericSettledAmount,
          status,
          referenceId: settlementData.reference_id ?? payment.reference_id ?? null,
          settledAt: settlementData.settled_at ? new Date(settlementData.settled_at) : new Date(),
        },
      });

      const allPayments = await tx.payment.findMany({
        where: { orderId: Number(orderId) },
      });
      const paymentStatus = deriveOrderPaymentStatus(order.final_amount, allPayments);

      await tx.order.update({
        where: { id: Number(orderId) },
        data: {
          status: ORDER_STATUSES.COMPLETED,
          paymentStatus,
          updatedAt: new Date(),
        },
      });

      return {
        payment: mapPayment(updatedPayment),
        payment_status: paymentStatus,
      };
    });
  }

  async cancelOrder(orderId) {
    const order = await this.getOrderById(orderId);

    if (order.status !== ORDER_STATUSES.PENDING) {
      throw { status: 400, message: 'Only pending orders can be cancelled' };
    }

    return await OrderRepository.updateStatuses(orderId, ORDER_STATUSES.CANCELLED, order.payment_status);
  }

  async getOrderPayments(orderId) {
    await this.getOrderById(orderId);
    return await PaymentRepository.findByOrderId(orderId);
  }

  async createKotTicket(orderId) {
    const order = await this.getOrderById(orderId);
    const items = await this.getOrderItems(orderId);

    if (items.length === 0) {
      throw { status: 400, message: 'Order must have at least one item before sending KOT' };
    }

    return await KotRepository.createForOrder(order, items);
  }

  async getKotTickets(orderId) {
    await this.getOrderById(orderId);
    return await KotRepository.findByOrderId(orderId);
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

  async getActiveOrders() {
    return await OrderRepository.findActiveOrders();
  }
}

module.exports = new OrderService();
