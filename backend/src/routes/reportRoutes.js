const express = require('express');
const ReportController = require('../controllers/ReportController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Daily report - accessible to authenticated users
router.get('/daily', authenticate, (req, res, next) =>
  ReportController.getDailySummary(req, res, next)
);

// Range report - accessible to authenticated users
router.get('/range', authenticate, (req, res, next) =>
  ReportController.getDateRangeSummary(req, res, next)
);

// Weekly report - accessible to authenticated users
router.get('/weekly', authenticate, (req, res, next) =>
  ReportController.getWeeklySummary(req, res, next)
);

// Monthly report - accessible to authenticated users
router.get('/monthly', authenticate, (req, res, next) =>
  ReportController.getMonthlySummary(req, res, next)
);

// Revenue analytics - accessible to authenticated users
router.get('/revenue-analytics', authenticate, (req, res, next) =>
  ReportController.getRevenueAnalytics(req, res, next)
);

module.exports = router;
