const express = require('express');
const IngredientController = require('../controllers/IngredientController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.getAll(req, res, next));
router.get('/alerts', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.alerts(req, res, next));
router.get('/movements', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.movements(req, res, next));
router.post('/', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.create(req, res, next));
router.patch('/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.update(req, res, next));
router.delete('/:id', authenticate, authorizeFeature('purchaseManagement'), (req, res, next) => IngredientController.delete(req, res, next));

module.exports = router;
