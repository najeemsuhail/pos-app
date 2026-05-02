const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const ExpenseRepository = require('../repositories/ExpenseRepository');
const {
  ORDER_STATUSES,
  ORDER_PAYMENT_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_SOURCES,
  isRecognizedSale,
  isFullyPaid,
  normalizePaymentMethod,
  normalizePaymentSource,
} = require('../utils/paymentState');

class ReportService {
  buildPaymentBreakdown(payments) {
    const paymentByMethod = {};

    payments.forEach((payment) => {
      const settledAmount = Number(payment.settled_amount) || 0;
      const method = normalizePaymentMethod(payment.method);
      const source = normalizePaymentSource(payment.source);

      if (settledAmount <= 0) {
        return;
      }

      // Include all payment methods and sources
      const key = source === PAYMENT_SOURCES.DIRECT ? method : `${method} (${source})`;

      if (!paymentByMethod[key]) {
        paymentByMethod[key] = 0;
      }

      paymentByMethod[key] += settledAmount;
    });

    return paymentByMethod;
  }

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
        completedCount: 0,
        paidCount: 0,
        sales: 0,
        tax: 0,
        discount: 0,
      };

      existing.orderCount += 1;
      existing.tax += Number(order.tax_amount) || 0;
      existing.discount += Number(order.discount_amount) || 0;

      if (isRecognizedSale(order)) {
        existing.completedCount += 1;
        existing.sales += Number(order.final_amount) || 0;
      }

      if (isFullyPaid(order)) {
        existing.paidCount += 1;
      }

      byHour.set(hour, existing);
    });

    return Array.from(byHour.values()).sort((a, b) => a.hour - b.hour);
  }

  async getTopBottomItems(orders) {
    const paidOrderIds = orders
      .filter((order) => isRecognizedSale(order))
      .map((order) => order.id);

    if (paidOrderIds.length === 0) {
      return { topItems: [], bottomItems: [], allItems: [], categorySales: [] };
    }

    const orderItems = await OrderItemRepository.findByOrderIds(paidOrderIds);
    const grouped = new Map();

    orderItems.forEach((item) => {
      const itemKey = item.menu_item_id || `${item.category?.id || 'uncategorized'}:${item.name}`;
      const existing = grouped.get(itemKey) || {
        name: item.name,
        category: item.category?.name || 'Uncategorized',
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

      grouped.set(itemKey, existing);
    });

    const groupedItems = Array.from(grouped.values())
      .map((item) => ({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        revenue: item.revenue,
        avgPrice: item.lineCount > 0 ? item.totalPrice / item.lineCount : 0,
        orderCount: item.orderIds.size,
        orderIds: item.orderIds,
      }))
      .sort((a, b) => b.quantity - a.quantity);

    const categorySales = Array.from(groupedItems.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      const existing = acc.get(category) || {
        category,
        quantity: 0,
        revenue: 0,
        itemCount: 0,
        orderIds: new Set(),
      };

      existing.quantity += Number(item.quantity) || 0;
      existing.revenue += Number(item.revenue) || 0;
      existing.itemCount += 1;
      item.orderIds?.forEach((orderId) => existing.orderIds.add(orderId));

      acc.set(category, existing);
      return acc;
    }, new Map()).values())
      .map((category) => ({
        category: category.category,
        quantity: category.quantity,
        revenue: category.revenue,
        avgPrice: category.quantity > 0 ? category.revenue / category.quantity : 0,
        itemCount: category.itemCount,
        orderCount: category.orderIds.size,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    const rankedItems = groupedItems.map(({ orderIds, ...item }) => item);

    return { allItems: rankedItems, categorySales };
  }

  async getOrderSummaries(orders) {
    if (!orders || orders.length === 0) {
      return [];
    }

    const orderItems = await OrderItemRepository.findByOrderIds(orders.map((order) => order.id));
    const itemCounts = orderItems.reduce((acc, item) => {
      const orderId = Number(item.order_id);
      acc[orderId] = (acc[orderId] || 0) + (Number(item.quantity) || 0);
      return acc;
    }, {});

    return orders.map((order) => ({
      ...order,
      item_count: itemCounts[Number(order.id)] || 0,
    }));
  }

  async getDailySummary(date = new Date()) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const orders = await OrderRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    const payments = await PaymentRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    const expenses = await ExpenseRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());

    const completedOrders = orders.filter((order) => isRecognizedSale(order));
    const paidOrders = orders.filter((order) => isFullyPaid(order));
    const totalSales = completedOrders.reduce((sum, order) => sum + (Number(order.final_amount) || 0), 0);
    const totalDiscount = completedOrders.reduce((sum, order) => sum + (Number(order.discount_amount) || 0), 0);
    const totalTax = completedOrders.reduce((sum, order) => sum + (Number(order.tax_amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    const paymentByMethod = this.buildPaymentBreakdown(payments);

    const hourlyBreakdown = this.getHourlyBreakdown(orders);
    const { allItems, categorySales } = await this.getTopBottomItems(orders);
    const orderSummaries = await this.getOrderSummaries(orders);

    return {
      date: date.toISOString().split('T')[0],
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
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
      averageOrderValue: completedOrders.length > 0 ? totalSales / completedOrders.length : 0,
      hourlyBreakdown,
      allItems,
      categorySales,
      orders: orderSummaries,
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

    const completedOrders = orders.filter((order) => isRecognizedSale(order));
    const paidOrders = orders.filter((order) => isFullyPaid(order));
    const totalSales = completedOrders.reduce((sum, order) => sum + (Number(order.final_amount) || 0), 0);
    const totalDiscount = completedOrders.reduce((sum, order) => sum + (Number(order.discount_amount) || 0), 0);
    const totalTax = completedOrders.reduce((sum, order) => sum + (Number(order.tax_amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    const paymentByMethod = this.buildPaymentBreakdown(payments);

    const hourlyBreakdown = this.getHourlyBreakdown(orders);
    const { allItems, categorySales } = await this.getTopBottomItems(orders);
    const orderSummaries = await this.getOrderSummaries(orders);

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
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
      averageOrderValue: completedOrders.length > 0 ? totalSales / completedOrders.length : 0,
      hourlyBreakdown,
      allItems,
      categorySales,
      orders: orderSummaries,
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
      completedOrders: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
      pendingSettlementOrders: 0,
    };

    orders.forEach((order) => {
      const finalAmount = Number(order.final_amount) || 0;
      const taxAmount = Number(order.tax_amount) || 0;
      const discountAmount = Number(order.discount_amount) || 0;

      if (isRecognizedSale(order)) {
        revenue.gross += finalAmount + discountAmount;
        revenue.net += finalAmount;
        revenue.completedOrders += 1;
      }

      if (isFullyPaid(order)) {
        revenue.paidOrders += 1;
      }

      if (order.status === ORDER_STATUSES.PENDING) {
        revenue.pendingOrders += 1;
      } else if (order.status === ORDER_STATUSES.CANCELLED) {
        revenue.cancelledOrders += 1;
      }

      if (order.payment_status === ORDER_PAYMENT_STATUSES.PENDING_SETTLEMENT) {
        revenue.pendingSettlementOrders += 1;
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
    const grouped = expenses.reduce((acc, expense) => {
      const cat = expense.category || 'Other';
      const sub = expense.note || 'No Sub Category';
      const amt = Number(expense.amount) || 0;

      if (!acc[cat]) {
        acc[cat] = { category: cat, totalAmount: 0, count: 0, subcategories: {} };
      }
      acc[cat].totalAmount += amt;
      acc[cat].count += 1;

      if (!acc[cat].subcategories[sub]) {
        acc[cat].subcategories[sub] = { name: sub, amount: 0, count: 0 };
      }
      acc[cat].subcategories[sub].amount += amt;
      acc[cat].subcategories[sub].count += 1;

      return acc;
    }, {});

    return Object.values(grouped).map(cat => ({
      ...cat,
      subcategories: Object.values(cat.subcategories).sort((a, b) => b.amount - a.amount)
    })).sort((a, b) => b.totalAmount - a.totalAmount);
  }
}

module.exports = new ReportService();
