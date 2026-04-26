const AttendanceService = require('../services/AttendanceService');

class AttendanceController {
  async getStaffUsers(req, res, next) {
    try {
      const staff = await AttendanceService.getStaffUsers();
      res.json(staff);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const attendance = await AttendanceService.saveAttendance(req.body);
      res.status(201).json(attendance);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const attendance = await AttendanceService.getAttendance(req.query);
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const summary = await AttendanceService.getSummary(req.query);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const attendance = await AttendanceService.updateAttendance(req.params.id, req.body);
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const attendance = await AttendanceService.deleteAttendance(req.params.id);
      res.json({ message: 'Attendance deleted', attendance });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AttendanceController();
