const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, authorize('Admin', 'Staff'), (req, res, next) => OrderController.create(req, res, next));
router.get('/', authenticate, authorize('Admin'), (req, res, next) => OrderController.getAll(req, res, next));
router.get('/:id', authenticate, (req, res, next) => OrderController.getById(req, res, next));
router.get('/:id/full', authenticate, authorize('Admin'), (req, res, next) => OrderController.getFullOrder(req, res, next));
router.get('/:id/items', authenticate, (req, res, next) => OrderController.getItems(req, res, next));
router.post('/:id/items', authenticate, authorize('Admin', 'Staff'), (req, res, next) => OrderController.addItem(req, res, next));
router.patch('/:id/items/:itemId', authenticate, authorize('Admin', 'Staff'), (req, res, next) =>
  OrderController.updateItem(req, res, next)
);
router.delete('/:id/items/:itemId', authenticate, authorize('Admin', 'Staff'), (req, res, next) =>
  OrderController.removeItem(req, res, next)
);
router.post('/:id/finalize', authenticate, authorize('Admin', 'Staff'), (req, res, next) =>
  OrderController.finalize(req, res, next)
);
router.post('/:id/payments', authenticate, authorize('Admin', 'Staff'), (req, res, next) => OrderController.pay(req, res, next));
router.post('/:id/cancel', authenticate, authorize('Admin', 'Staff'), (req, res, next) => OrderController.cancel(req, res, next));
router.get('/:id/receipt', authenticate, (req, res, next) => OrderController.getReceipt(req, res, next));

module.exports = router;
