const OrderService = require('../services/OrderService');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const { generateThermalReceipt } = require('../utils/printer');
const SettingService = require('../services/SettingService');
const SyncService = require('../services/SyncService');

class OrderController {
  async create(req, res, next) {
    try {
      const { table_id } = req.body || {};
      const order = await OrderService.createOrder(table_id);
      // Removed: Auto-sync on create. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(order.id);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req, res, next) {
    try {
      const { id } = req.params;
      const { menu_item_id, quantity } = req.body;

      if (!menu_item_id || !quantity) {
        return res.status(400).json({ error: 'Menu item ID and quantity are required' });
      }

      const item = await OrderService.addItemToOrder(id, menu_item_id, quantity);
      // Removed: Auto-sync on add item. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { id, itemId } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined) {
        return res.status(400).json({ error: 'Quantity is required' });
      }

      if (quantity === 0) {
        const result = await OrderService.removeOrderItem(id, itemId);
        // Removed: Auto-sync on remove. User must click "Sync Now" to sync.
        // await SyncService.queueOrderSnapshot(id);
        return res.json({ message: 'Item removed', item: result });
      }

      const item = await OrderService.updateOrderItem(id, itemId, quantity);
      // Removed: Auto-sync on update. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req, res, next) {
    try {
      const { id, itemId } = req.params;
      const result = await OrderService.removeOrderItem(id, itemId);
      // Removed: Auto-sync on remove. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json({ message: 'Item removed', item: result });
    } catch (error) {
      next(error);
    }
  }

  async getItems(req, res, next) {
    try {
      const { id } = req.params;
      const items = await OrderService.getOrderItems(id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async syncItems(req, res, next) {
    try {
      const { id } = req.params;
      const { items } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Items array is required' });
      }
      await OrderService.syncItemsToOrder(id, items);
      // Removed: Auto-sync on sync. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json({ message: 'Items synced successfully' });
    } catch (error) {
      next(error);
    }
  }

  async finalize(req, res, next) {
    try {
      const { id } = req.params;
      const settings = SettingService.getSettings();
      const { discount_percent = 0, tax_rate = settings.taxRate } = req.body;

      const order = await OrderService.finalizeOrder(id, discount_percent, tax_rate);
      // Removed: Auto-sync on finalize. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async pay(req, res, next) {
    try {
      const { id } = req.params;
      const {
        payments,
        customer_name,
        customer_phone,
      } = req.body;

      if (!payments || !Array.isArray(payments)) {
        return res.status(400).json({ error: 'Payments array is required' });
      }

      const result = await OrderService.payOrder(id, payments, {
        customer_name,
        customer_phone,
      });
      // Removed: Auto-sync on payment. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async settlePayment(req, res, next) {
    try {
      const { id, paymentId } = req.params;
      const result = await OrderService.settlePayment(id, paymentId, req.body || {});
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getReceipt(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      const items = await OrderService.getOrderItems(id);
      const payments = await OrderService.getOrderPayments(id);

      const receipt = generateThermalReceipt(order, items, payments);
      res.setHeader('Content-Type', 'text/plain');
      res.send(receipt);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.cancelOrder(id);
      // Removed: Auto-sync on cancel. User must click "Sync Now" to sync.
      // await SyncService.queueOrderSnapshot(id);
      res.json({ message: 'Order cancelled', order });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { limit = 100, offset = 0, startDate, endDate } = req.query;

      let orders;
      if (startDate && endDate) {
        orders = await OrderService.getOrdersByDateRange(startDate, endDate);
      } else {
        orders = await OrderService.getAllOrders(parseInt(limit), parseInt(offset));
      }

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getFullOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      const items = await OrderService.getOrderItems(id);
      const payments = await OrderService.getOrderPayments(id);

      res.json({
        ...order,
        items,
        payments
      });
    } catch (error) {
      next(error);
    }
  }

  async getActiveTables(req, res, next) {
    try {
      const tables = await OrderService.getActiveTableOrders();
      res.json(tables);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
