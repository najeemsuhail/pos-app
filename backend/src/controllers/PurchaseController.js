const SupplierService = require('../services/SupplierService');
const PurchaseService = require('../services/PurchaseService');

class PurchaseController {
  async getSuppliers(req, res, next) {
    try {
      const suppliers = await SupplierService.getSuppliers();
      res.json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      const supplier = await SupplierService.createSupplier(req.body);
      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
      res.json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      await SupplierService.deleteSupplier(req.params.id);
      res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getPurchases(req, res, next) {
    try {
      const { startDate, endDate, supplierId } = req.query;
      const purchases = await PurchaseService.getPurchases(startDate, endDate, supplierId);
      res.json(purchases);
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const { startDate, endDate, supplierId } = req.query;
      const summary = await PurchaseService.getSummary(startDate, endDate, supplierId);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async createPurchase(req, res, next) {
    try {
      const purchase = await PurchaseService.createPurchase(req.body);
      res.status(201).json(purchase);
    } catch (error) {
      next(error);
    }
  }

  async recordPayment(req, res, next) {
    try {
      const purchase = await PurchaseService.recordPayment(req.params.id, req.body);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }

  async updatePurchase(req, res, next) {
    try {
      const purchase = await PurchaseService.updatePurchase(req.params.id, req.body);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }

  async deletePurchase(req, res, next) {
    try {
      await PurchaseService.deletePurchase(req.params.id);
      res.json({ message: 'Purchase deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseController();
