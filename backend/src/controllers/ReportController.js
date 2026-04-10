const ReportService = require('../services/ReportService');

class ReportController {
  async getDailySummary(req, res, next) {
    try {
      const { date } = req.query;
      const summary = await ReportService.getDailySummary(date ? new Date(date) : new Date());
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async getDateRangeSummary(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const summary = await ReportService.getDateRangeSummary(startDate, endDate);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async getWeeklySummary(req, res, next) {
    try {
      const { date } = req.query;
      const summary = await ReportService.getWeeklySummary(date ? new Date(date) : new Date());
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async getMonthlySummary(req, res, next) {
    try {
      const { date } = req.query;
      const summary = await ReportService.getMonthlySummary(date ? new Date(date) : new Date());
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async getRevenueAnalytics(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const analytics = await ReportService.getRevenueAnalytics(startDate, endDate);
      res.json(analytics);
    } catch (error) {
      next(error);
    }
  }

  async getExpenseSummary(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const summary = await ReportService.getExpenseSummary(startDate, endDate);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
