const ShiftService = require('../services/ShiftService');

class ShiftController {
  async getOpenShift(req, res, next) {
    try {
      const shift = await ShiftService.getOpenShift();
      res.json({ shift });
    } catch (error) {
      next(error);
    }
  }

  async getShiftHistory(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const shifts = await ShiftService.getShiftHistory(startDate, endDate);
      res.json(shifts);
    } catch (error) {
      next(error);
    }
  }

  async openShift(req, res, next) {
    try {
      const shift = await ShiftService.openShift(req.user, req.body);
      res.status(201).json(shift);
    } catch (error) {
      next(error);
    }
  }

  async getClosePreview(req, res, next) {
    try {
      const preview = await ShiftService.getClosePreview(req.params.id);
      res.json(preview);
    } catch (error) {
      next(error);
    }
  }

  async closeShift(req, res, next) {
    try {
      const shift = await ShiftService.closeShift(req.params.id, req.user, req.body);
      res.json(shift);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ShiftController();
