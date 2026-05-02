const PurchaseRepository = require('../repositories/PurchaseRepository');
const SupplierRepository = require('../repositories/SupplierRepository');
const StockService = require('./StockService');
const prisma = require('../db/prisma');

const clampMoney = (value) => Math.round(Number(value || 0) * 100) / 100;

class PurchaseService {
  normalizeItems(items = []) {
    if (!Array.isArray(items) || items.length === 0) {
      throw { status: 400, message: 'At least one purchase item is required' };
    }

    return items.map((item, index) => {
      const itemName = item.item_name?.trim();
      const ingredientId = item.ingredient_id === undefined || item.ingredient_id === null || item.ingredient_id === ''
        ? null
        : Number(item.ingredient_id);
      const quantity = Number(item.quantity);
      const unitPrice = Number(item.unit_price);

      if (!itemName) {
        throw { status: 400, message: `Item ${index + 1} name is required` };
      }

      if (!Number.isFinite(quantity) || quantity <= 0) {
        throw { status: 400, message: `Item ${index + 1} quantity must be greater than zero` };
      }

      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        throw { status: 400, message: `Item ${index + 1} unit price must be zero or greater` };
      }

      if (ingredientId !== null && (!Number.isInteger(ingredientId) || ingredientId <= 0)) {
        throw { status: 400, message: `Item ${index + 1} ingredient is invalid` };
      }

      const totalPrice = clampMoney(quantity * unitPrice);

      return {
        ingredientId,
        itemName,
        quantity,
        unit: item.unit?.trim() || null,
        unitPrice,
        totalPrice,
      };
    });
  }

  async validatePurchaseIngredients(items) {
    const ingredientIds = [...new Set(items.map((item) => item.ingredientId).filter(Boolean))];

    if (ingredientIds.length === 0) {
      return;
    }

    const count = await prisma.ingredient.count({
      where: {
        id: { in: ingredientIds },
        isDeleted: false,
      },
    });

    if (count !== ingredientIds.length) {
      throw { status: 400, message: 'One or more purchase ingredients were not found' };
    }
  }

  resolvePaymentStatus(totalAmount, paidAmount) {
    if (paidAmount <= 0) {
      return 'unpaid';
    }

    if (paidAmount >= totalAmount) {
      return 'paid';
    }

    return 'partial';
  }

  async createPurchase(data) {
    const supplierId = Number(data.supplier_id);
    if (!Number.isFinite(supplierId)) {
      throw { status: 400, message: 'Supplier is required' };
    }

    const supplier = await SupplierRepository.findRawById(supplierId);
    if (!supplier) {
      throw { status: 404, message: 'Supplier not found' };
    }

    if (!data.purchase_date) {
      throw { status: 400, message: 'Purchase date is required' };
    }

    const items = this.normalizeItems(data.items);
    await this.validatePurchaseIngredients(items);
    const subtotal = clampMoney(items.reduce((sum, item) => sum + item.totalPrice, 0));
    const taxAmount = clampMoney(data.tax_amount);
    const discountAmount = clampMoney(data.discount_amount);
    const totalAmount = clampMoney(subtotal + taxAmount - discountAmount);
    const paidAmount = clampMoney(data.paid_amount);

    if (totalAmount <= 0) {
      throw { status: 400, message: 'Purchase total must be greater than zero' };
    }

    if (paidAmount < 0 || paidAmount > totalAmount) {
      throw { status: 400, message: 'Paid amount must be between zero and the purchase total' };
    }

    return prisma.$transaction(async (tx) => {
      const purchase = await PurchaseRepository.create({
        purchase: {
          supplierId,
          purchaseDate: new Date(data.purchase_date),
          invoiceNumber: data.invoice_number?.trim() || null,
          paymentStatus: this.resolvePaymentStatus(totalAmount, paidAmount),
          subtotal,
          taxAmount,
          discountAmount,
          totalAmount,
          paidAmount,
          note: data.note?.trim() || null,
        },
        items,
      }, tx);

      await StockService.applyPurchaseItems(tx, purchase.id, items, 1);
      return purchase;
    });
  }

  async getPurchases(startDate = null, endDate = null, supplierId = null) {
    let normalizedStart = null;
    let normalizedEnd = null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      normalizedStart = start.toISOString();
      normalizedEnd = end.toISOString();
    }

    return PurchaseRepository.findAll(normalizedStart, normalizedEnd, supplierId);
  }

  async getPaginatedPurchases(startDate = null, endDate = null, supplierId = null, limit = 25, offset = 0) {
    let normalizedStart = null;
    let normalizedEnd = null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      normalizedStart = start.toISOString();
      normalizedEnd = end.toISOString();
    }

    return PurchaseRepository.findPaginated(normalizedStart, normalizedEnd, supplierId, limit, offset);
  }

  async getSummary(startDate = null, endDate = null, supplierId = null) {
    const purchases = await this.getPurchases(startDate, endDate, supplierId);

    return {
      purchase_count: purchases.length,
      total_amount: clampMoney(purchases.reduce((sum, purchase) => sum + Number(purchase.total_amount || 0), 0)),
      paid_amount: clampMoney(purchases.reduce((sum, purchase) => sum + Number(purchase.paid_amount || 0), 0)),
      due_amount: clampMoney(purchases.reduce((sum, purchase) => sum + Number(purchase.due_amount || 0), 0)),
    };
  }

  async recordPayment(id, data) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      throw { status: 400, message: 'Invalid purchase ID' };
    }

    const purchase = await PurchaseRepository.findById(numericId);
    if (!purchase) {
      throw { status: 404, message: 'Purchase not found' };
    }

    const paymentAmount = clampMoney(data.payment_amount);
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      throw { status: 400, message: 'Payment amount must be greater than zero' };
    }

    const nextPaidAmount = clampMoney(Number(purchase.paid_amount || 0) + paymentAmount);
    if (nextPaidAmount > Number(purchase.total_amount || 0)) {
      throw { status: 400, message: 'Payment exceeds outstanding balance' };
    }

    const paymentStatus = this.resolvePaymentStatus(Number(purchase.total_amount || 0), nextPaidAmount);
    return PurchaseRepository.updatePayment(numericId, nextPaidAmount, paymentStatus);
  }

  async updatePurchase(id, data) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      throw { status: 400, message: 'Invalid purchase ID' };
    }

    const existing = await PurchaseRepository.findById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Purchase not found' };
    }

    const supplierId = Number(data.supplier_id);
    if (!Number.isFinite(supplierId)) {
      throw { status: 400, message: 'Supplier is required' };
    }

    const supplier = await SupplierRepository.findRawById(supplierId);
    if (!supplier) {
      throw { status: 404, message: 'Supplier not found' };
    }

    if (!data.purchase_date) {
      throw { status: 400, message: 'Purchase date is required' };
    }

    const items = this.normalizeItems(data.items);
    await this.validatePurchaseIngredients(items);
    const subtotal = clampMoney(items.reduce((sum, item) => sum + item.totalPrice, 0));
    const taxAmount = clampMoney(data.tax_amount);
    const discountAmount = clampMoney(data.discount_amount);
    const totalAmount = clampMoney(subtotal + taxAmount - discountAmount);
    const paidAmount = clampMoney(data.paid_amount);

    if (totalAmount <= 0) {
      throw { status: 400, message: 'Purchase total must be greater than zero' };
    }

    if (paidAmount < 0 || paidAmount > totalAmount) {
      throw { status: 400, message: 'Paid amount must be between zero and the purchase total' };
    }

    return prisma.$transaction(async (tx) => {
      await StockService.applyPurchaseItems(tx, numericId, existing.items || [], -1);

      const purchase = await PurchaseRepository.update(numericId, {
        purchase: {
          supplierId,
          purchaseDate: new Date(data.purchase_date),
          invoiceNumber: data.invoice_number?.trim() || null,
          paymentStatus: this.resolvePaymentStatus(totalAmount, paidAmount),
          subtotal,
          taxAmount,
          discountAmount,
          totalAmount,
          paidAmount,
          note: data.note?.trim() || null,
        },
        items,
      }, tx);

      await StockService.applyPurchaseItems(tx, numericId, items, 1);
      return purchase;
    });
  }

  async deletePurchase(id) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      throw { status: 400, message: 'Invalid purchase ID' };
    }

    const existing = await PurchaseRepository.findById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Purchase not found' };
    }

    return prisma.$transaction(async (tx) => {
      await StockService.applyPurchaseItems(tx, numericId, existing.items || [], -1);
      return PurchaseRepository.delete(numericId, tx);
    });
  }
}

module.exports = new PurchaseService();
