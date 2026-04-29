const ExpenseService = require('../services/ExpenseService');
const SyncService = require('../services/SyncService');

class ExpenseController {
  async create(req, res, next) {
    try {
      const { expense_date, category, note, amount, payment_method, reference } = req.body;
      const expense = await ExpenseService.createExpense(
        expense_date,
        category,
        note,
        amount,
        payment_method,
        reference
      );
      await SyncService.queueExpenseSnapshot(expense);
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
      const expenses = await ExpenseService.getExpenses(startDate, endDate);
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const expense = await ExpenseService.deleteExpense(id);
      await SyncService.queueExpenseSnapshot(expense, 'delete');
      res.json({ message: 'Expense deleted', expense });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const expense = await ExpenseService.updateExpense(id, req.body);
      await SyncService.queueExpenseSnapshot(expense);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await ExpenseService.getUniqueNotes();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExpenseController();
