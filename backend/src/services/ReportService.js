const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const ExpenseRepository = require('../repositories/ExpenseRepository');

class ReportService {
  buildProfitLoss(totalSales, totalTax, totalDiscount, totalExpenses) {
    const netRevenue = totalSales;
    const operatingProfit = netRevenue - totalExpenses;

    return {
      grossRevenue: totalSales + totalDiscount,
      netRevenue,
      taxCollected: totalTax,
      discountsGiven: totalDiscount,
      operatingExpenses: totalExpenses,
      operatingProfit,
      profitStatus: operatingProfit >= 0 ? 'profit' : 'loss',
    };
  }

  getHourlyBreakdown(orders) {
    const byHour = new Map();

    orders.forEach((order) => {
      const hour = new Date(order.created_at).getHours();
      const existing = byHour.get(hour) || {
        hour,
        orderCount: 0,
        paidCount: 0,
        sales: 0,
        tax: 0,
        discount: 0,
      };

      existing.orderCount += 1;
      existing.tax += Number(order.tax_amount) || 0;
      existing.discount += Number(order.discount_amount) || 0;

      if (order.status === 'paid') {
        existing.paidCount += 1;
        existing.sales += Number(order.final_amount) || 0;
      }

      byHour.set(hour, existing);
    });

    return Array.from(byHour.values()).sort((a, b) => a.hour - b.hour);
  }

  async getTopBottomItems(orders, limit = 5) {
    const paidOrderIds = orders
      .filter((order) => order.status === 'paid')
      .map((order) => order.id);

    if (paidOrderIds.length === 0) {
      return { topItems: [], bottomItems: [] };
    }

    const orderItems = await OrderItemRepository.findByOrderIds(paidOrderIds);
    const grouped = new Map();

    orderItems.forEach((item) => {
      const existing = grouped.get(item.name) || {
        name: item.name,
        quantity: 0,
        revenue: 0,
        totalPrice: 0,
        lineCount: 0,
        orderIds: new Set(),
      };

      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      existing.quantity += quantity;
      existing.revenue += price * quantity;
      existing.totalPrice += price;
      existing.lineCount += 1;
      existing.orderIds.add(item.order_id);

      grouped.set(item.name, existing);
    });

    const rankedItems = Array.from(grouped.values())
      .map((item) => ({
        name: item.name,
        quantity: item.quantity,
        revenue: item.revenue,
        avgPrice: item.lineCount > 0 ? item.totalPrice / item.lineCount : 0,
        orderCount: item.orderIds.size,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    return {
      topItems: rankedItems.slice(0, limit),
      bottomItems: rankedItems.slice(-limit).reverse(),
    };
  }

  async getDailySummary(date = new Date()) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const orders = await OrderRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    const payments = await PaymentRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    const expenses = await ExpenseRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());

    const paidOrders = orders.filter((order) => order.status === 'paid');
    const totalSales = paidOrders.reduce((sum, order) => sum + (Number(order.final_amount) || 0), 0);
    const totalDiscount = paidOrders.reduce((sum, order) => sum + (Number(order.discount_amount) || 0), 0);
    const totalTax = paidOrders.reduce((sum, order) => sum + (Number(order.tax_amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    const paymentByMethod = {};
    payments.forEach((payment) => {
      if (!paymentByMethod[payment.method]) {
        paymentByMethod[payment.method] = 0;
      }
      paymentByMethod[payment.method] += Number(payment.amount) || 0;
    });

    const hourlyBreakdown = this.getHourlyBreakdown(orders);
    const { topItems, bottomItems } = await this.getTopBottomItems(orders);

    return {
      date: date.toISOString().split('T')[0],
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      totalSales,
      totalDiscount,
      totalTax,
      totalExpenses,
      netSalesAfterExpenses: totalSales - totalExpenses,
      paymentByMethod,
      expensesByCategory: this.groupExpensesByCategory(expenses),
      expenseCount: expenses.length,
      profitLoss: this.buildProfitLoss(totalSales, totalTax, totalDiscount, totalExpenses),
      averageOrderValue: paidOrders.length > 0 ? totalSales / paidOrders.length : 0,
      hourlyBreakdown,
      topItems,
      bottomItems,
    };
  }

  async getDateRangeSummary(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const orders = await OrderRepository.findByDateRange(start.toISOString(), end.toISOString());
    const payments = await PaymentRepository.findByDateRange(start.toISOString(), end.toISOString());
    const expenses = await ExpenseRepository.findByDateRange(start.toISOString(), end.toISOString());

    const paidOrders = orders.filter((order) => order.status === 'paid');
    const totalSales = paidOrders.reduce((sum, order) => sum + (Number(order.final_amount) || 0), 0);
    const totalDiscount = paidOrders.reduce((sum, order) => sum + (Number(order.discount_amount) || 0), 0);
    const totalTax = paidOrders.reduce((sum, order) => sum + (Number(order.tax_amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    const paymentByMethod = {};
    payments.forEach((payment) => {
      if (!paymentByMethod[payment.method]) {
        paymentByMethod[payment.method] = 0;
      }
      paymentByMethod[payment.method] += Number(payment.amount) || 0;
    });

    const hourlyBreakdown = this.getHourlyBreakdown(orders);
    const { topItems, bottomItems } = await this.getTopBottomItems(orders);

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      totalSales,
      totalDiscount,
      totalTax,
      totalExpenses,
      netSalesAfterExpenses: totalSales - totalExpenses,
      paymentByMethod,
      expensesByCategory: this.groupExpensesByCategory(expenses),
      expenseCount: expenses.length,
      profitLoss: this.buildProfitLoss(totalSales, totalTax, totalDiscount, totalExpenses),
      averageOrderValue: paidOrders.length > 0 ? totalSales / paidOrders.length : 0,
      hourlyBreakdown,
      topItems,
      bottomItems,
    };
  }

  async getWeeklySummary(date = new Date()) {
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const summary = await this.getDateRangeSummary(startDate.toISOString(), endDate.toISOString());
    return {
      ...summary,
      period: 'weekly',
      weekStart: startDate.toISOString().split('T')[0],
      weekEnd: endDate.toISOString().split('T')[0],
    };
  }

  async getMonthlySummary(date = new Date()) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    endDate.setHours(23, 59, 59, 999);

    const summary = await this.getDateRangeSummary(startDate.toISOString(), endDate.toISOString());
    const monthName = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return {
      ...summary,
      period: 'monthly',
      month: monthName,
      monthStart: startDate.toISOString().split('T')[0],
      monthEnd: endDate.toISOString().split('T')[0],
    };
  }

  async getRevenueAnalytics(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const orders = await OrderRepository.findByDateRange(start.toISOString(), end.toISOString());
    const expenses = await ExpenseRepository.findByDateRange(start.toISOString(), end.toISOString());

    const revenue = {
      gross: 0,
      discounts: 0,
      tax: 0,
      net: 0,
      expenses: expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0),
      netAfterExpenses: 0,
      paidOrders: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
    };

    orders.forEach((order) => {
      const finalAmount = Number(order.final_amount) || 0;
      const taxAmount = Number(order.tax_amount) || 0;
      const discountAmount = Number(order.discount_amount) || 0;

      if (order.status === 'paid') {
        revenue.gross += finalAmount + discountAmount;
        revenue.net += finalAmount;
        revenue.paidOrders += 1;
      } else if (order.status === 'pending') {
        revenue.pendingOrders += 1;
      } else if (order.status === 'cancelled') {
        revenue.cancelledOrders += 1;
      }

      revenue.discounts += discountAmount;
      revenue.tax += taxAmount;
    });

    revenue.netAfterExpenses = revenue.net - revenue.expenses;

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalOrders: orders.length,
      revenue,
      breakdown: [
        { name: 'Net Sales', value: revenue.net, percentage: revenue.gross > 0 ? (revenue.net / revenue.gross) * 100 : 0 },
        { name: 'Discounts', value: revenue.discounts, percentage: revenue.gross > 0 ? (revenue.discounts / revenue.gross) * 100 : 0 },
        { name: 'Tax', value: revenue.tax, percentage: revenue.gross > 0 ? (revenue.tax / revenue.gross) * 100 : 0 },
        { name: 'Expenses', value: revenue.expenses, percentage: revenue.gross > 0 ? (revenue.expenses / revenue.gross) * 100 : 0 },
      ],
    };
  }

  async getExpenseSummary(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const expenses = await ExpenseRepository.findByDateRange(start.toISOString(), end.toISOString());
    const totalAmount = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalExpenses: totalAmount,
      expenseCount: expenses.length,
      expensesByCategory: this.groupExpensesByCategory(expenses),
      expenses,
    };
  }

  groupExpensesByCategory(expenses) {
    return expenses.reduce((acc, expense) => {
      const key = expense.category || 'Other';
      acc[key] = (acc[key] || 0) + (Number(expense.amount) || 0);
      return acc;
    }, {});
  }
}

module.exports = new ReportService();
