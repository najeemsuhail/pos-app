const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// Get all users
router.get('/', UserController.getAll);

// Get user by ID
router.get('/:id', UserController.getById);

// Change password
router.post('/change-password', UserController.changePassword);

// Delete user
router.delete('/:id', UserController.delete);

module.exports = router;
