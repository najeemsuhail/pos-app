const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// Get all users
router.get('/', authorizeFeature('userManagement'), UserController.getAll);

// Get user by ID
router.get('/:id', authorizeFeature('userManagement'), UserController.getById);

// Change password
router.post('/change-password', UserController.changePassword);

// Update per-user feature access
router.patch('/:id/feature-access', authorizeFeature('userManagement'), UserController.updateFeatureAccess);

// Delete user
router.delete('/:id', authorizeFeature('userManagement'), UserController.delete);

module.exports = router;
