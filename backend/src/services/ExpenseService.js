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

  async getPaginatedExpenses(startDate = null, endDate = null, limit = 25, offset = 0) {
    let normalizedStart = null;
    let normalizedEnd = null;

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      normalizedStart = start.toISOString();
      normalizedEnd = end.toISOString();
    }

    return ExpenseRepository.findPaginated(normalizedStart, normalizedEnd, limit, offset);
  }

  async getExpensesByDateRange(startDate, endDate) {
    return ExpenseRepository.findByDateRange(startDate, endDate);
  }

  async deleteExpense(id) {
    return ExpenseRepository.delete(id);
  }

  async updateExpense(id, data) {
    console.log(`[ExpenseService] Updating expense ${id}:`, data);
    const { expense_date, category, note, amount, payment_method, reference } = data;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw { status: 400, message: 'Invalid expense ID' };
    }

    // Basic existence check
    const existing = await ExpenseRepository.findById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Expense not found' };
    }

    const updateData = {};
    if (expense_date) updateData.expenseDate = expense_date;
    if (category) updateData.category = category.trim();
    if (note) updateData.note = note.trim();
    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        throw { status: 400, message: 'Amount must be greater than zero' };
      }
      updateData.amount = parsedAmount;
    }
    if (payment_method) updateData.paymentMethod = payment_method.trim();
    if (reference !== undefined) updateData.reference = reference?.trim() || null;

    try {
      const updated = await ExpenseRepository.update(numericId, updateData);
      console.log(`[ExpenseService] Successfully updated expense ${id}`);
      return updated;
    } catch (error) {
       console.error(`[ExpenseService] Error updating expense ${id}:`, error);
       throw error;
    }
  }

  async getUniqueNotes() {
    return ExpenseRepository.findUniqueNotes();
  }
}

module.exports = new ExpenseService();
