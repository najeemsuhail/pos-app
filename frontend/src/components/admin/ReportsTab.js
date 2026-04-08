import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { generatePDF } from '../../utils/reportPDF';
import OrderDetailsModal from './OrderDetailsModal';

const ReportsTab = () => {
  const [reportType, setReportType] = useState('daily');
  const [report, setReport] = useState(null);
  const [revenueAnalytics, setRevenueAnalytics] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  const tooltipStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)'
  };

  const fetchDailyReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/reports/daily?date=${selectedDate}`);
      setReport(response.data);
      // Also fetch revenue analytics
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${selectedDate}&endDate=${selectedDate}`);
      setRevenueAnalytics(analyticsResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch daily report');
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  const fetchWeeklyReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/reports/weekly?date=${selectedDate}`);
      setReport(response.data);
      // Also fetch revenue analytics for the week
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${response.data.weekStart}&endDate=${response.data.weekEnd}`);
      setRevenueAnalytics(analyticsResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weekly report');
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  const fetchMonthlyReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const dateObj = new Date(selectedMonth + '-01');
      const response = await api.get(`/reports/monthly?date=${dateObj.toISOString().split('T')[0]}`);
      setReport(response.data);
      // Also fetch revenue analytics for the month
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${response.data.monthStart}&endDate=${response.data.monthEnd}`);
      setRevenueAnalytics(analyticsResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch monthly report');
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  const fetchRangeReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/reports/range?startDate=${startDate}&endDate=${endDate}`);
      setReport(response.data);
      // Also fetch revenue analytics
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${startDate}&endDate=${endDate}`);
      setRevenueAnalytics(analyticsResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch range report');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  const handleExportPDF = () => {
    if (report) {
      generatePDF(report, reportType);
    }
  };

  const handleViewDetails = async () => {
    try {
      setDetailsLoading(true);
      let params;
      if (reportType === 'daily') {
        params = { startDate: selectedDate, endDate: selectedDate };
      } else if (reportType === 'weekly') {
        params = { startDate: report.weekStart, endDate: report.weekEnd };
      } else if (reportType === 'monthly') {
        params = { startDate: report.monthStart, endDate: report.monthEnd };
      } else {
        params = { startDate, endDate };
      }
      
      const response = await api.get('/orders', { params });
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch order details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/full`);
      setSelectedOrder(response.data);
      setShowOrderModal(true);
    } catch (err) {
      setError('Failed to load order details');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  useEffect(() => {
    if (reportType === 'daily') {
      fetchDailyReport();
    } else if (reportType === 'weekly') {
      fetchWeeklyReport();
    } else if (reportType === 'monthly') {
      fetchMonthlyReport();
    } else {
      fetchRangeReport();
    }
  }, [reportType, fetchDailyReport, fetchWeeklyReport, fetchMonthlyReport, fetchRangeReport]);

  const getHourLabel = (hour) => {
    return `${String(hour).padStart(2, '0')}:00`;
  };

  return (
    <div className="admin-tab-content">
      <h2>📈 Sales Reports</h2>

      <div className="report-selector">
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              value="daily" 
              checked={reportType === 'daily'}
              onChange={(e) => setReportType(e.target.value)}
            />
            Daily Report
          </label>
          <label>
            <input 
              type="radio" 
              value="weekly" 
              checked={reportType === 'weekly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            Weekly Report
          </label>
          <label>
            <input 
              type="radio" 
              value="monthly" 
              checked={reportType === 'monthly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            Monthly Report
          </label>
          <label>
            <input 
              type="radio" 
              value="range" 
              checked={reportType === 'range'}
              onChange={(e) => setReportType(e.target.value)}
            />
            Date Range Report
          </label>
        </div>
      </div>

      <div className="report-filters">
        {reportType === 'daily' ? (
          <>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
            <button onClick={fetchDailyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : reportType === 'weekly' ? (
          <>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
            <button onClick={fetchWeeklyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : reportType === 'monthly' ? (
          <>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="date-input"
            />
            <button onClick={fetchMonthlyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : (
          <>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
            </div>
            <button onClick={fetchRangeReport} className="btn-primary">Fetch Report</button>
          </>
        )}
        {report && (
          <>
            <button onClick={handleExportPDF} className="btn-success" title="Download report as PDF">
              📄 PDF
            </button>
            <button onClick={handleViewDetails} className="btn-primary" style={{marginLeft: '10px'}} title="View individual orders from this report">
              📋 Bills
            </button>
          </>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading report...</div>}

      {report && (
        <div className="report-display">
          <div className="report-header">
            <h3>
              {reportType === 'daily' 
                ? `Daily Report - ${report.date}`
                : reportType === 'weekly'
                ? `Weekly Report - ${report.weekStart} to ${report.weekEnd}`
                : reportType === 'monthly'
                ? `Monthly Report - ${report.month}`
                : `Report: ${report.startDate} to ${report.endDate}`
              }
            </h3>
          </div>

          {/* Summary Cards */}
          <div className="report-grid">
            <div className="report-card">
              <h4>Total Orders</h4>
              <p className="report-value">{report.totalOrders}</p>
            </div>

            <div className="report-card">
              <h4>Paid Orders</h4>
              <p className="report-value">{report.paidOrders}</p>
            </div>

            <div className="report-card">
              <h4>Total Sales</h4>
              <p className="report-value">₹ {parseFloat(report.totalSales).toFixed(2)}</p>
            </div>

            <div className="report-card">
              <h4>Total Discount</h4>
              <p className="report-value">₹ {parseFloat(report.totalDiscount).toFixed(2)}</p>
            </div>

            <div className="report-card">
              <h4>Total Tax</h4>
              <p className="report-value">₹ {parseFloat(report.totalTax).toFixed(2)}</p>
            </div>

            <div className="report-card">
              <h4>Average Order Value</h4>
              <p className="report-value">₹ {parseFloat(report.averageOrderValue).toFixed(2)}</p>
            </div>
          </div>

          {/* Revenue Analytics - Pie Charts */}
          {revenueAnalytics && (
            <div className="section-container">
              <h3>💰 Revenue Analytics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                {/* Revenue Breakdown Pie Chart */}
                <div style={{ textAlign: 'center' }}>
                  <h4>Revenue Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueAnalytics.breakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                        outerRadius={100}
                         fill="var(--success-color)"
                        dataKey="value"
                      >
                        {revenueAnalytics.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `₹${parseFloat(value).toFixed(2)}`}
                         contentStyle={tooltipStyle}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: '15px' }}>
                    <p><strong>Gross Revenue:</strong> ₹{parseFloat(revenueAnalytics.revenue.gross).toFixed(2)}</p>
                    <p><strong>Net Sales:</strong> ₹{parseFloat(revenueAnalytics.revenue.net).toFixed(2)}</p>
                  </div>
                </div>

                {/* Order Status Breakdown */}
                <div style={{ textAlign: 'center' }}>
                  <h4>Order Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Paid Orders', value: revenueAnalytics.revenue.paidOrders },
                          { name: 'Pending Orders', value: revenueAnalytics.revenue.pendingOrders },
                          { name: 'Cancelled Orders', value: revenueAnalytics.revenue.cancelledOrders },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                         fill="var(--success-color)"
                        dataKey="value"
                      >
                        <Cell fill="var(--success-color)" />
                        <Cell fill="var(--warning-color)" />
                        <Cell fill="var(--danger-color)" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Details Table */}
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Gross Revenue</strong></td>
                    <td>{parseFloat(revenueAnalytics.revenue.gross).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total Discounts</td>
                    <td>{parseFloat(revenueAnalytics.revenue.discounts).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total Tax</td>
                    <td>{parseFloat(revenueAnalytics.revenue.tax).toFixed(2)}</td>
                  </tr>
                  <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <td><strong>Net Sales</strong></td>
                    <td><strong>{parseFloat(revenueAnalytics.revenue.net).toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Hourly Breakdown */}
          {report.hourlyBreakdown && report.hourlyBreakdown.length > 0 && (
            <div className="section-container">
              <h3>⏰ Hourly Breakdown</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Hour</th>
                    <th>Orders</th>
                    <th>Paid</th>
                    <th>Sales (₹)</th>
                    <th>Tax (₹)</th>
                    <th>Discount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {report.hourlyBreakdown.map((hour) => (
                    <tr key={hour.hour}>
                      <td className="hour-cell">{getHourLabel(hour.hour)}</td>
                      <td>{hour.orderCount}</td>
                      <td>{hour.paidCount}</td>
                      <td className="sales-cell">₹ {hour.sales.toFixed(2)}</td>
                      <td>₹ {hour.tax.toFixed(2)}</td>
                      <td>₹ {hour.discount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payment Breakdown with Pie Chart */}
          <div className="section-container">
            <h3>💳 Payment Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              <div>
                {Object.entries(report.paymentByMethod || {}).length > 0 && (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(report.paymentByMethod || {}).map(([method, amount]) => ({
                          name: method,
                          value: parseFloat(amount),
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
                        outerRadius={100}
                         fill="var(--success-color)"
                        dataKey="value"
                      >
                        {Object.entries(report.paymentByMethod || {}).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `₹${parseFloat(value).toFixed(2)}`}
                         contentStyle={tooltipStyle}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div>
                <table className="data-table" style={{ margin: '0' }}>
                  <thead>
                    <tr>
                      <th>Payment Method</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.paymentByMethod || {}).map(([method, amount]) => (
                      <tr key={method}>
                        <td>{method}</td>
                        <td>₹ {parseFloat(amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Items */}
          {report.topItems && report.topItems.length > 0 && (
            <div className="section-container">
              <h3>🏆 Top Selling Items</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity Sold</th>
                    <th>Revenue (₹)</th>
                    <th>Avg Price</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topItems.map((item, idx) => (
                    <tr key={idx} className="top-item">
                      <td>
                        <span className="rank-badge">{idx + 1}</span>
                        {item.name}
                      </td>
                      <td>{item.quantity}</td>
                      <td className="sales-cell">₹ {item.revenue.toFixed(2)}</td>
                      <td>₹ {item.avgPrice.toFixed(2)}</td>
                      <td>{item.orderCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottom Items */}
          {report.bottomItems && report.bottomItems.length > 0 && (
            <div className="section-container">
              <h3>📉 Bottom Selling Items</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity Sold</th>
                    <th>Revenue (₹)</th>
                    <th>Avg Price</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {report.bottomItems.map((item, idx) => (
                    <tr key={idx} className="bottom-item">
                      <td>
                        <span className="rank-badge">↓{idx + 1}</span>
                        {item.name}
                      </td>
                      <td>{item.quantity}</td>
                      <td>₹ {item.revenue.toFixed(2)}</td>
                      <td>₹ {item.avgPrice.toFixed(2)}</td>
                      <td>{item.orderCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Individual Orders */}
          {detailsLoading && (
            <div className="section-container">
              <div className="loading">Loading orders...</div>
            </div>
          )}

          {orders.length > 0 && !detailsLoading && (
            <div className="section-container">
              <h3>📦 Individual Orders</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bill #</th>
                    <th>Date & Time</th>
                    <th>Items</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>#{order.bill_number}</strong></td>
                      <td>{formatDate(order.created_at)}</td>
                      <td style={{ textAlign: 'center' }}>{order.item_count || '-'}</td>
                      <td>{formatCurrency(order.subtotal)}</td>
                      <td>{formatCurrency(order.tax_amount)}</td>
                      <td>{formatCurrency(order.discount_amount)}</td>
                      <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>
                        {formatCurrency(order.final_amount)}
                      </td>
                      <td>
                        <span style={{
                          background: order.status === 'paid' ? 'var(--success-color)' : order.status === 'pending' ? 'var(--warning-color)' : 'var(--danger-color)',
                          color: 'var(--text-on-brand)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewOrderDetails(order.id)}
                          className="btn-edit"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default ReportsTab;
