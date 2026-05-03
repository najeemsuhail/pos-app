const express = require('express');
const ShiftController = require('../controllers/ShiftController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.get('/open', authenticate, authorizeFeature('shiftManagement'), (req, res, next) =>
  ShiftController.getOpenShift(req, res, next)
);

router.get('/', authenticate, authorizeFeature('shiftManagement'), (req, res, next) =>
  ShiftController.getShiftHistory(req, res, next)
);

router.post('/open', authenticate, authorizeFeature('shiftManagement'), (req, res, next) =>
  ShiftController.openShift(req, res, next)
);

router.get('/:id/close-preview', authenticate, authorizeFeature('shiftManagement'), (req, res, next) =>
  ShiftController.getClosePreview(req, res, next)
);

router.post('/:id/close', authenticate, authorizeFeature('shiftManagement'), (req, res, next) =>
  ShiftController.closeShift(req, res, next)
);

module.exports = router;
