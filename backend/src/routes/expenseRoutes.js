const express = require('express');
const ExpenseController = require('../controllers/ExpenseController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize('Admin'), (req, res, next) => ExpenseController.getAll(req, res, next));
router.get('/notes', authenticate, authorize('Admin'), (req, res, next) => ExpenseController.getNotes(req, res, next));
router.post('/', authenticate, authorize('Admin'), (req, res, next) => ExpenseController.create(req, res, next));
router.patch('/:id', authenticate, authorize('Admin'), (req, res, next) => ExpenseController.update(req, res, next));
router.delete('/:id', authenticate, authorize('Admin'), (req, res, next) => ExpenseController.delete(req, res, next));

module.exports = router;
