const OrderRepository = require('../repositories/OrderRepository');
const PaymentRepository = require('../repositories/PaymentRepository');
const pool = require('../db/pool');

class ReportService {
  // Helper to calculate hourly breakdown
  async getHourlyBreakdown(startDate, endDate) {
    const query = `
      SELECT 
        EXTRACT(HOUR FROM o.created_at) as hour,
        COUNT(o.id) as order_count,
        COUNT(DISTINCT o.id) FILTER (WHERE o.status = 'paid') as paid_count,
        SUM(CASE WHEN o.status = 'paid' THEN CAST(o.final_amount AS FLOAT) ELSE 0 END) as sales,
        SUM(CAST(o.tax_amount AS FLOAT)) as tax,
        SUM(CAST(o.discount_amount AS FLOAT)) as discount
      FROM orders o
      WHERE o.created_at >= $1 AND o.created_at <= $2
      GROUP BY EXTRACT(HOUR FROM o.created_at)
      ORDER BY hour ASC
    `;
    const result = await pool.query(query, [startDate, endDate]);
    return result.rows.map(row => ({
      hour: Math.floor(row.hour),
      orderCount: parseInt(row.order_count),
      paidCount: parseInt(row.paid_count),
      sales: parseFloat(row.sales) || 0,
      tax: parseFloat(row.tax) || 0,
      discount: parseFloat(row.discount) || 0,
    }));
  }

  // Helper to get top and bottom items
  async getTopBottomItems(startDate, endDate, limit = 5) {
    const query = `
      SELECT 
        oi.name as item_name,
        SUM(oi.quantity) as total_quantity,
        SUM(CAST(oi.price AS FLOAT) * oi.quantity) as total_revenue,
        AVG(CAST(oi.price AS FLOAT)) as avg_price,
        COUNT(DISTINCT oi.order_id) as order_count
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.created_at >= $1 AND o.created_at <= $2 AND o.status = 'paid'
      GROUP BY oi.name
      ORDER BY total_revenue DESC
    `;
    const result = await pool.query(query, [startDate, endDate]);
    const items = result.rows.map(row => ({
      name: row.item_name,
      quantity: parseInt(row.total_quantity),
      revenue: parseFloat(row.total_revenue) || 0,
      avgPrice: parseFloat(row.avg_price) || 0,
      orderCount: parseInt(row.order_count),
    }));

    return {
      topItems: items.slice(0, limit),
      bottomItems: items.slice(-limit).reverse(),
    };
  }

  async getDailySummary(date = new Date()) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const orders = await OrderRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());
    const payments = await PaymentRepository.findByDateRange(startDate.toISOString(), endDate.toISOString());

    const paidOrders = orders.filter((o) => o.status === 'paid');
    const totalSales = paidOrders.reduce((sum, order) => sum + (parseFloat(order.final_amount) || 0), 0);
    const totalDiscount = paidOrders.reduce((sum, order) => sum + (parseFloat(order.discount_amount) || 0), 0);
    const totalTax = paidOrders.reduce((sum, order) => sum + (parseFloat(order.tax_amount) || 0), 0);

    // Group payments by method
    const paymentByMethod = {};
    payments.forEach((payment) => {
      if (!paymentByMethod[payment.method]) {
        paymentByMethod[payment.method] = 0;
      }
      paymentByMethod[payment.method] += parseFloat(payment.amount) || 0;
    });

    // Get hourly breakdown and top/bottom items
    const hourlyBreakdown = await this.getHourlyBreakdown(startDate.toISOString(), endDate.toISOString());
    const { topItems, bottomItems } = await this.getTopBottomItems(startDate.toISOString(), endDate.toISOString());

    return {
      date: date.toISOString().split('T')[0],
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      totalSales,
      totalDiscount,
      totalTax,
      paymentByMethod,
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

    const paidOrders = orders.filter((o) => o.status === 'paid');
    const totalSales = paidOrders.reduce((sum, order) => sum + (parseFloat(order.final_amount) || 0), 0);
    const totalDiscount = paidOrders.reduce((sum, order) => sum + (parseFloat(order.discount_amount) || 0), 0);
    const totalTax = paidOrders.reduce((sum, order) => sum + (parseFloat(order.tax_amount) || 0), 0);

    // Group payments by method
    const paymentByMethod = {};
    payments.forEach((payment) => {
      if (!paymentByMethod[payment.method]) {
        paymentByMethod[payment.method] = 0;
      }
      paymentByMethod[payment.method] += parseFloat(payment.amount) || 0;
    });

    // Get hourly breakdown and top/bottom items
    const hourlyBreakdown = await this.getHourlyBreakdown(start.toISOString(), end.toISOString());
    const { topItems, bottomItems } = await this.getTopBottomItems(start.toISOString(), end.toISOString());

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      totalSales,
      totalDiscount,
      totalTax,
      paymentByMethod,
      averageOrderValue: paidOrders.length > 0 ? totalSales / paidOrders.length : 0,
      hourlyBreakdown,
      topItems,
      bottomItems,
    };
  }

  // Get weekly summary for a specific week
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

  // Get monthly summary for a specific month
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

  // Get detailed revenue analytics with breakdowns
  async getRevenueAnalytics(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Get all orders in range
    const query = `
      SELECT 
        o.id,
        o.status,
        CAST(o.final_amount AS FLOAT) as final_amount,
        CAST(o.tax_amount AS FLOAT) as tax_amount,
        CAST(o.discount_amount AS FLOAT) as discount_amount,
        o.created_at
      FROM orders o
      WHERE o.created_at >= $1 AND o.created_at <= $2
    `;
    const result = await pool.query(query, [start.toISOString(), end.toISOString()]);
    const orders = result.rows;

    // Calculate revenue breakdown
    const revenue = {
      gross: 0,
      discounts: 0,
      tax: 0,
      net: 0,
      paidOrders: 0,
      pendingOrders: 0,
      cancelledOrders: 0,
    };

    orders.forEach((order) => {
      const finalAmount = parseFloat(order.final_amount) || 0;
      const taxAmount = parseFloat(order.tax_amount) || 0;
      const discountAmount = parseFloat(order.discount_amount) || 0;

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

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      totalOrders: orders.length,
      revenue,
      breakdown: [
        { name: 'Net Sales', value: revenue.net, percentage: revenue.gross > 0 ? (revenue.net / revenue.gross * 100) : 0 },
        { name: 'Discounts', value: revenue.discounts, percentage: revenue.gross > 0 ? (revenue.discounts / revenue.gross * 100) : 0 },
        { name: 'Tax', value: revenue.tax, percentage: revenue.gross > 0 ? (revenue.tax / revenue.gross * 100) : 0 },
      ],
    };
  }
}

module.exports = new ReportService();
