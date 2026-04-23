const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.get('/suppliers', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.getSuppliers(req, res, next));
router.post('/suppliers', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.createSupplier(req, res, next));
router.patch('/suppliers/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.updateSupplier(req, res, next));
router.delete('/suppliers/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.deleteSupplier(req, res, next));

router.get('/summary', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.getSummary(req, res, next));
router.get('/', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.getPurchases(req, res, next));
router.post('/', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.createPurchase(req, res, next));
router.patch('/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.updatePurchase(req, res, next));
router.delete('/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.deletePurchase(req, res, next));
router.post('/:id/payments', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => PurchaseController.recordPayment(req, res, next));

module.exports = router;
