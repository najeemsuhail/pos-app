const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res, next) => CategoryController.getAll(req, res, next));
router.get('/:id', (req, res, next) => CategoryController.getById(req, res, next));
router.post('/', authenticate, authorizeFeature('categoryManagement'), (req, res, next) => CategoryController.create(req, res, next));
router.patch('/:id', authenticate, authorizeFeature('categoryManagement'), (req, res, next) => CategoryController.update(req, res, next));
router.delete('/:id', authenticate, authorizeFeature('categoryManagement'), (req, res, next) => CategoryController.delete(req, res, next));

module.exports = router;
