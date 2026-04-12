const prisma = require('../db/prisma');
const { mapExpense } = require('../db/mappers');

class ExpenseRepository {
  async create(expenseDate, category, note, amount, paymentMethod, reference = null) {
    const expense = await prisma.expense.create({
      data: {
        expenseDate: new Date(expenseDate),
        category,
        note,
        amount,
        paymentMethod,
        reference,
      },
    });

    return mapExpense(expense);
  }

  async findAll(startDate = null, endDate = null) {
    const where = startDate && endDate
      ? {
          expenseDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : undefined;

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: [{ expenseDate: 'desc' }, { createdAt: 'desc' }],
    });

    return expenses.map(mapExpense);
  }

  async findByDateRange(startDate, endDate) {
    const expenses = await prisma.expense.findMany({
      where: {
        expenseDate: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
      orderBy: [{ expenseDate: 'desc' }, { createdAt: 'desc' }],
    });

    return expenses.map(mapExpense);
  }

  async findById(id) {
    const expense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });
    return expense ? mapExpense(expense) : null;
  }

  async update(id, data) {
    const { expenseDate, category, note, amount, paymentMethod, reference } = data;
    const expense = await prisma.expense.update({
      where: { id: Number(id) },
      data: {
        expenseDate: expenseDate ? new Date(expenseDate) : undefined,
        category,
        note,
        amount: amount !== undefined ? Number(amount) : undefined,
        paymentMethod,
        reference,
      },
    });

    return mapExpense(expense);
  }

  async delete(id) {
    const expense = await prisma.expense.delete({
      where: { id: Number(id) },
    });

    return mapExpense(expense);
  }
}

module.exports = new ExpenseRepository();
