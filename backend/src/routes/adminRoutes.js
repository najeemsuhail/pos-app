const express = require('express');
const AdminController = require('../controllers/AdminController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Only Admins can access these system-level endpoints
router.post('/reset-database', authenticate, authorize('Admin'), AdminController.resetDatabase);

module.exports = router;
