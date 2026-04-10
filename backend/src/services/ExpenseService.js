const ExpenseRepository = require('../repositories/ExpenseRepository');

class ExpenseService {
  async createExpense(expenseDate, category, note, amount, paymentMethod, reference = null) {
    if (!expenseDate || !category || !note || !amount || !paymentMethod) {
      throw { status: 400, message: 'Date, category, note, amount, and payment method are required' };
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      throw { status: 400, message: 'Amount must be greater than zero' };
    }

    return ExpenseRepository.create(expenseDate, category.trim(), note.trim(), parsedAmount, paymentMethod.trim(), reference?.trim() || null);
  }

  async getExpenses(startDate = null, endDate = null) {
    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      return ExpenseRepository.findAll(start.toISOString(), end.toISOString());
    }

    return ExpenseRepository.findAll();
  }

  async getExpensesByDateRange(startDate, endDate) {
    return ExpenseRepository.findByDateRange(startDate, endDate);
  }

  async deleteExpense(id) {
    return ExpenseRepository.delete(id);
  }
}

module.exports = new ExpenseService();
