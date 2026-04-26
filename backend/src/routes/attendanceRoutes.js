const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, authorizeFeature('attendanceManagement'));

router.get('/', (req, res, next) => AttendanceController.getAll(req, res, next));
router.get('/summary', (req, res, next) => AttendanceController.getSummary(req, res, next));
router.get('/staff', (req, res, next) => AttendanceController.getStaffUsers(req, res, next));
router.post('/', (req, res, next) => AttendanceController.create(req, res, next));
router.patch('/:id', (req, res, next) => AttendanceController.update(req, res, next));
router.delete('/:id', (req, res, next) => AttendanceController.delete(req, res, next));

module.exports = router;
