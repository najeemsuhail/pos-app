import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { purchaseService } from '../../services/api';
import { generatePDF } from '../../utils/reportPDF';
import { downloadExcelWorkbook } from '../../utils/excelExport';
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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [purchaseReport, setPurchaseReport] = useState([]);
  const [purchaseSummary, setPurchaseSummary] = useState({ totalAmount: 0, totalPaid: 0, totalDue: 0 });
  const [itemSortKey, setItemSortKey] = useState('quantity');
  const [itemSortDir, setItemSortDir] = useState('desc');

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  const tooltipStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  };

  const fetchDailyReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/reports/daily?date=${selectedDate}`);
      setReport(response.data);
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${selectedDate}&endDate=${selectedDate}`);
      setRevenueAnalytics(analyticsResponse.data);
      await fetchPurchaseData(selectedDate, selectedDate);
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
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${response.data.weekStart}&endDate=${response.data.weekEnd}`);
      setRevenueAnalytics(analyticsResponse.data);
      await fetchPurchaseData(response.data.weekStart, response.data.weekEnd);
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
      const dateObj = new Date(`${selectedMonth}-01`);
      const response = await api.get(`/reports/monthly?date=${dateObj.toISOString().split('T')[0]}`);
      setReport(response.data);
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${response.data.monthStart}&endDate=${response.data.monthEnd}`);
      setRevenueAnalytics(analyticsResponse.data);
      await fetchPurchaseData(response.data.monthStart, response.data.monthEnd);
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
      const analyticsResponse = await api.get(`/reports/revenue-analytics?startDate=${startDate}&endDate=${endDate}`);
      setRevenueAnalytics(analyticsResponse.data);
      await fetchPurchaseData(startDate, endDate);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch range report');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  const fetchPurchaseData = async (start, end) => {
    try {
      const response = await purchaseService.getAll(start, end, undefined);
      const purchases = response.data || [];
      const totalAmount = purchases.reduce((sum, purchase) => sum + Number(purchase.total_amount || 0), 0);
      const totalPaid = purchases.reduce((sum, purchase) => sum + Number(purchase.paid_amount || 0), 0);
      const totalDue = purchases.reduce((sum, purchase) => sum + Number(purchase.due_amount || 0), 0);

      setPurchaseReport(purchases);
      setPurchaseSummary({ totalAmount, totalPaid, totalDue });
    } catch (err) {
      console.error('Failed to fetch purchase report:', err);
      setPurchaseReport([]);
      setPurchaseSummary({ totalAmount: 0, totalPaid: 0, totalDue: 0 });
    }
  };

  const handleExportPDF = () => {
    if (report) {
      generatePDF(report, reportType);
    }
  };

  const handleExportExcel = () => {
    if (!report) {
      return;
    }

    const periodLabel = reportType === 'daily'
      ? report.date
      : reportType === 'weekly'
        ? `${report.weekStart} to ${report.weekEnd}`
        : reportType === 'monthly'
          ? report.month
          : `${report.startDate} to ${report.endDate}`;

    const currencyCell = (value, style = 'currency') => ({ value: Number(value || 0), style });
    const integerCell = (value) => ({ value: Number(value || 0), style: 'integer' });
    const generatedAt = new Date().toLocaleString();
    const summaryRows = [
      { cells: ['Sales Report Export'], style: 'title' },
      { cells: ['Metric', 'Value'], style: 'header' },
      ['Total Orders', integerCell(report.totalOrders)],
      ['Paid Orders', integerCell(report.paidOrders)],
      ['Total Sales', currencyCell(report.totalSales)],
      ['Total Discount', currencyCell(report.totalDiscount)],
      ['Total Tax', currencyCell(report.totalTax)],
      ['Total Expenses', currencyCell(report.totalExpenses)],
      ['Net After Expenses', currencyCell(report.netSalesAfterExpenses)],
      ['Average Order Value', currencyCell(report.averageOrderValue)],
      [],
      ['Report Type', reportType.charAt(0).toUpperCase() + reportType.slice(1)],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const profitLossRows = report.profitLoss
      ? [
          { cells: ['Profit And Loss'], style: 'title' },
          { cells: ['Profit/Loss Metric', 'Amount'], style: 'header' },
          ['Gross Revenue', currencyCell(report.profitLoss.grossRevenue)],
          ['Discounts Given', currencyCell(report.profitLoss.discountsGiven)],
          ['Net Revenue', currencyCell(report.profitLoss.netRevenue)],
          ['Tax Collected', currencyCell(report.profitLoss.taxCollected)],
          ['Operating Expenses', currencyCell(report.profitLoss.operatingExpenses)],
          [
            report.profitLoss.profitStatus === 'profit' ? 'Operating Profit' : 'Operating Loss',
            currencyCell(report.profitLoss.operatingProfit, 'totalCurrency'),
          ],
          [],
          ['Period', periodLabel],
          ['Generated At', generatedAt],
        ]
      : [
          { cells: ['Profit And Loss'], style: 'title' },
          { cells: ['Profit/Loss Metric', 'Amount'], style: 'header' },
          [],
          ['Period', periodLabel],
          ['Generated At', generatedAt],
        ];

    const revenueRows = revenueAnalytics
      ? [
          { cells: ['Revenue Analytics'], style: 'title' },
          { cells: ['Breakdown Label', 'Amount', 'Percentage'], style: 'header' },
          ...(revenueAnalytics.breakdown || []).map((entry) => [
            entry.name,
            currencyCell(entry.value),
            Number(entry.percentage || 0),
          ]),
          [],
          { cells: ['Revenue Metric', 'Amount'], style: 'header' },
          ['Gross Revenue', currencyCell(revenueAnalytics.revenue?.gross)],
          ['Discounts', currencyCell(revenueAnalytics.revenue?.discounts)],
          ['Tax', currencyCell(revenueAnalytics.revenue?.tax)],
          ['Expenses', currencyCell(revenueAnalytics.revenue?.expenses)],
          ['Net Sales', currencyCell(revenueAnalytics.revenue?.net)],
          ['Net After Expenses', currencyCell(revenueAnalytics.revenue?.netAfterExpenses, 'totalCurrency')],
          [],
          ['Period', periodLabel],
          ['Generated At', generatedAt],
        ]
      : [
          { cells: ['Revenue Analytics'], style: 'title' },
          { cells: ['Revenue Metric', 'Amount'], style: 'header' },
          [],
          ['Period', periodLabel],
          ['Generated At', generatedAt],
        ];

    const paymentRows = [
      { cells: ['Payment Breakdown'], style: 'title' },
      { cells: ['Payment Method', 'Amount'], style: 'header' },
      ...Object.entries(report.paymentByMethod || {}).map(([method, amount]) => [
        method,
        currencyCell(amount),
      ]),
      [
        { value: 'Total', style: 'totalLabel' },
        currencyCell(
          Object.values(report.paymentByMethod || {}).reduce((sum, amount) => sum + Number(amount || 0), 0),
          'totalCurrency'
        ),
      ],
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const dateCell = (value) => ({ value, type: 'DateTime', style: 'date' });

    const hourlyRows = [
      { cells: ['Hourly Breakdown'], style: 'title' },
      { cells: ['Hour', 'Orders', 'Paid', 'Sales', 'Tax', 'Discount'], style: 'header' },
      ...(report.hourlyBreakdown || []).map((hour) => [
        `${String(hour.hour).padStart(2, '0')}:00`,
        integerCell(hour.orderCount),
        integerCell(hour.paidCount),
        currencyCell(hour.sales),
        currencyCell(hour.tax),
        currencyCell(hour.discount),
      ]),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const itemRows = [
      { cells: ['Items Sold'], style: 'title' },
      { cells: ['Item Name', 'Qty Sold', 'Revenue', 'Avg Price', 'Orders'], style: 'header' },
      ...(report.allItems || []).map((item) => [
        item.name,
        integerCell(item.quantity),
        currencyCell(item.revenue),
        currencyCell(item.avgPrice),
        integerCell(item.orderCount),
      ]),
      ...(report.allItems && report.allItems.length > 0
        ? [[
            { value: 'Total', style: 'totalLabel' },
            integerCell(report.allItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0)),
            currencyCell(report.allItems.reduce((sum, item) => sum + Number(item.revenue || 0), 0), 'totalCurrency'),
            '',
            '',
          ]]
        : []),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const expenseRows = [
      { cells: ['Expense Breakdown'], style: 'title' },
      { cells: ['Category', 'Sub Category', 'Entries', 'Amount'], style: 'header' },
      ...(report.expensesByCategory || []).flatMap((category) => [
        [
          { value: category.category, style: 'textBold' },
          'TOTAL',
          integerCell(category.count),
          currencyCell(category.totalAmount),
        ],
        ...((category.subcategories || []).map((sub) => [
          category.category,
          sub.name,
          integerCell(sub.count),
          currencyCell(sub.amount),
        ])),
      ]),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const purchaseRows = [
      { cells: ['Purchase Report'], style: 'title' },
      { cells: ['Metric', 'Value'], style: 'header' },
      ['Total Purchases', integerCell(purchaseReport.length)],
      ['Total Amount', currencyCell(purchaseSummary.totalAmount)],
      ['Total Paid', currencyCell(purchaseSummary.totalPaid)],
      ['Total Due', currencyCell(purchaseSummary.totalDue)],
      [],
      { cells: ['Purchase Date', 'Supplier', 'Invoice', 'Items', 'Total', 'Paid', 'Due', 'Status'], style: 'header' },
      ...purchaseReport.map((purchase) => [
        dateCell(purchase.purchase_date),
        purchase.supplier?.name || '',
        purchase.invoice_number || '',
        purchase.items?.map((item) => `${item.item_name} (${item.quantity}${item.unit ? ` ${item.unit}` : ''})`).join(', ') || '',
        currencyCell(purchase.total_amount),
        currencyCell(purchase.paid_amount),
        currencyCell(purchase.due_amount),
        purchase.payment_status || '',
      ]),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const orderRows = [
      { cells: ['Orders'], style: 'title' },
      { cells: ['Bill #', 'Date & Time', 'Items', 'Subtotal', 'Tax', 'Discount', 'Total', 'Status', 'Payment Status'], style: 'header' },
      ...((report.orders || []).map((order) => [
        order.bill_number,
        { value: order.created_at, type: 'DateTime', style: 'date' },
        integerCell(order.item_count),
        currencyCell(order.subtotal),
        currencyCell(order.tax_amount),
        currencyCell(order.discount_amount),
        currencyCell(order.final_amount),
        order.status,
        order.payment_status || 'unpaid',
      ])),
      ...((report.orders || []).length > 0
        ? [[
            { value: 'Total', style: 'totalLabel' },
            '',
            integerCell((report.orders || []).reduce((sum, order) => sum + Number(order.item_count || 0), 0)),
            currencyCell((report.orders || []).reduce((sum, order) => sum + Number(order.subtotal || 0), 0), 'totalCurrency'),
            currencyCell((report.orders || []).reduce((sum, order) => sum + Number(order.tax_amount || 0), 0), 'totalCurrency'),
            currencyCell((report.orders || []).reduce((sum, order) => sum + Number(order.discount_amount || 0), 0), 'totalCurrency'),
            currencyCell((report.orders || []).reduce((sum, order) => sum + Number(order.final_amount || 0), 0), 'totalCurrency'),
            '',
            '',
          ]]
        : []),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const safePeriod = (reportType === 'daily'
      ? report.date
      : reportType === 'weekly'
        ? `${report.weekStart}_to_${report.weekEnd}`
        : reportType === 'monthly'
          ? report.month
          : `${report.startDate}_to_${report.endDate}`)
      .replace(/[^a-z0-9_-]/gi, '-');

    downloadExcelWorkbook(`sales-report-${safePeriod}.xlsx`, [
      { name: 'Summary', columns: [180, 140], rows: summaryRows },
      { name: 'ProfitLoss', columns: [200, 140], rows: profitLossRows },
      { name: 'Revenue', columns: [180, 140, 100], rows: revenueRows },
      { name: 'Payments', columns: [180, 140], rows: paymentRows },
      { name: 'Hourly', columns: [90, 80, 80, 110, 110, 110], rows: hourlyRows },
      { name: 'Items', columns: [220, 90, 120, 120, 90], rows: itemRows },
      { name: 'Expenses', columns: [180, 220, 90, 120], rows: expenseRows },
      { name: 'Purchases', columns: [110, 180, 120, 260, 100, 100, 100, 110], rows: purchaseRows },
      { name: 'Orders', columns: [100, 140, 70, 100, 90, 100, 110, 90, 110], rows: orderRows },
    ]);
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

  const formatDate = (dateString) => new Date(dateString).toLocaleString();
  const formatCurrency = (amount) => `Rs. ${parseFloat(amount).toFixed(2)}`;
  const getHourLabel = (hour) => `${String(hour).padStart(2, '0')}:00`;

  const handleItemSort = (key) => {
    if (itemSortKey === key) {
      setItemSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setItemSortKey(key);
      setItemSortDir('desc');
    }
  };

  const getSortedAllItems = (items) => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const aVal = a[itemSortKey];
      const bVal = b[itemSortKey];
      if (typeof aVal === 'string') {
        return itemSortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return itemSortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  };

  const reportSections = useMemo(() => {
    if (!report) {
      return [];
    }

    return [
      { id: 'report-summary', label: 'Summary', show: true },
      { id: 'report-profit-loss', label: 'Profit & Loss', show: Boolean(report.profitLoss) },
      { id: 'report-revenue', label: 'Revenue', show: Boolean(revenueAnalytics) },
      { id: 'report-hourly', label: 'Hourly', show: Boolean(report.hourlyBreakdown?.length) },
      { id: 'report-payments', label: 'Payments', show: true },
      { id: 'report-expenses', label: 'Expenses', show: Boolean(report.expensesByCategory?.length) },
      { id: 'report-items', label: 'Items Sold', show: Boolean(report.allItems?.length) },
      { id: 'report-orders', label: 'Orders', show: Boolean(report.orders?.length) },
    ].filter((section) => section.show);
  }, [report, revenueAnalytics]);

  const scrollToReportSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const SortArrow = ({ col }) => {
    if (itemSortKey !== col) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>;
    return <span style={{ marginLeft: 4 }}>{itemSortDir === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className="admin-tab-content">
      <h2>Sales And Expense Reports</h2>

      <div className="report-selector">
        <div className="radio-group">
          <label><input type="radio" value="daily" checked={reportType === 'daily'} onChange={(e) => setReportType(e.target.value)} />Daily Report</label>
          <label><input type="radio" value="weekly" checked={reportType === 'weekly'} onChange={(e) => setReportType(e.target.value)} />Weekly Report</label>
          <label><input type="radio" value="monthly" checked={reportType === 'monthly'} onChange={(e) => setReportType(e.target.value)} />Monthly Report</label>
          <label><input type="radio" value="range" checked={reportType === 'range'} onChange={(e) => setReportType(e.target.value)} />Date Range Report</label>
        </div>
      </div>

      <div className="report-filters">
        {reportType === 'daily' ? (
          <>
            <DatePicker selected={parseDateStr(selectedDate)} onChange={(date) => setSelectedDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
            <button onClick={fetchDailyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : reportType === 'weekly' ? (
          <>
            <DatePicker selected={parseDateStr(selectedDate)} onChange={(date) => setSelectedDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
            <button onClick={fetchWeeklyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : reportType === 'monthly' ? (
          <>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="date-input" />
            <button onClick={fetchMonthlyReport} className="btn-primary">Fetch Report</button>
          </>
        ) : (
          <>
            <div>
              <label>Start Date:</label>
              <DatePicker selected={parseDateStr(startDate)} onChange={(date) => setStartDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
            </div>
            <div>
              <label>End Date:</label>
              <DatePicker selected={parseDateStr(endDate)} onChange={(date) => setEndDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
            </div>
            <button onClick={fetchRangeReport} className="btn-primary">Fetch Report</button>
          </>
        )}
        {report && (
          <>
            <button
              onClick={handleExportPDF}
              className="btn-success"
              title="Download report as PDF"
              style={{ width: '80px', flex: 'none', height: '38px' }}
            >
              PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="btn-secondary"
              title="Download report as Excel"
              style={{ width: '80px', flex: 'none', height: '38px' }}
            >
              Excel
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
                : `Report: ${report.startDate} to ${report.endDate}`}
            </h3>
          </div>

          <nav className="report-section-nav" aria-label="Report sections">
            <span>Jump to</span>
            {reportSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToReportSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="report-grid report-section-anchor" id="report-summary">
            <div className="report-card"><h4>Total Orders</h4><p className="report-value">{report.totalOrders}</p></div>
            <div className="report-card"><h4>Paid Orders</h4><p className="report-value">{report.paidOrders}</p></div>
            <div className="report-card"><h4>Total Sales</h4><p className="report-value">Rs. {parseFloat(report.totalSales).toFixed(2)}</p></div>
            <div className="report-card"><h4>Total Discount</h4><p className="report-value">Rs. {parseFloat(report.totalDiscount).toFixed(2)}</p></div>
            <div className="report-card"><h4>Total Tax</h4><p className="report-value">Rs. {parseFloat(report.totalTax).toFixed(2)}</p></div>
            <div className="report-card"><h4>Total Expenses</h4><p className="report-value">Rs. {parseFloat(report.totalExpenses || 0).toFixed(2)}</p></div>
            <div className="report-card"><h4>Net After Expenses</h4><p className="report-value">Rs. {parseFloat(report.netSalesAfterExpenses || 0).toFixed(2)}</p></div>
            <div className="report-card"><h4>Average Order Value</h4><p className="report-value">Rs. {parseFloat(report.averageOrderValue).toFixed(2)}</p></div>
          </div>

          {report.profitLoss && (
            <div className="section-container report-section-anchor" id="report-profit-loss">
              <h3>Profit And Loss Summary</h3>
              <div className="report-grid">
                <div className="report-card"><h4>Gross Revenue</h4><p className="report-value">Rs. {parseFloat(report.profitLoss.grossRevenue).toFixed(2)}</p></div>
                <div className="report-card"><h4>Net Revenue</h4><p className="report-value">Rs. {parseFloat(report.profitLoss.netRevenue).toFixed(2)}</p></div>
                <div className="report-card"><h4>Operating Expenses</h4><p className="report-value">Rs. {parseFloat(report.profitLoss.operatingExpenses).toFixed(2)}</p></div>
                <div
                  className="report-card profit-card"
                  style={{
                    background: report.profitLoss.profitStatus === 'profit'
                      ? 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)'
                      : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
                  }}
                >
                  <h4>{report.profitLoss.profitStatus === 'profit' ? 'Operating Profit' : 'Operating Loss'}</h4>
                  <p className="report-value" style={{ color: '#ffffff' }}>
                    Rs. {parseFloat(Math.abs(report.profitLoss.operatingProfit)).toFixed(2)}
                  </p>
                </div>
              </div>
              <table className="data-table">
                <thead><tr><th>P&amp;L Metric</th><th>Amount (Rs.)</th></tr></thead>
                <tbody>
                  <tr><td>Gross Revenue</td><td>{parseFloat(report.profitLoss.grossRevenue).toFixed(2)}</td></tr>
                  <tr><td>Discounts Given</td><td>{parseFloat(report.profitLoss.discountsGiven).toFixed(2)}</td></tr>
                  <tr><td>Net Revenue</td><td>{parseFloat(report.profitLoss.netRevenue).toFixed(2)}</td></tr>
                  <tr><td>Tax Collected</td><td>{parseFloat(report.profitLoss.taxCollected).toFixed(2)}</td></tr>
                  <tr><td>Operating Expenses</td><td>{parseFloat(report.profitLoss.operatingExpenses).toFixed(2)}</td></tr>
                  <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                    <td><strong>{report.profitLoss.profitStatus === 'profit' ? 'Operating Profit' : 'Operating Loss'}</strong></td>
                    <td><strong>{parseFloat(report.profitLoss.operatingProfit).toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {revenueAnalytics && (
            <div className="section-container report-section-anchor" id="report-revenue">
              <h3>Revenue Analytics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h4>Revenue Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueAnalytics.breakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="var(--success-color)"
                        dataKey="value"
                      >
                        {revenueAnalytics.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `Rs.${parseFloat(value).toFixed(2)}`} contentStyle={tooltipStyle} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: '15px' }}>
                    <p><strong>Gross Revenue:</strong> Rs.{parseFloat(revenueAnalytics.revenue.gross).toFixed(2)}</p>
                    <p><strong>Net Sales:</strong> Rs.{parseFloat(revenueAnalytics.revenue.net).toFixed(2)}</p>
                    <p><strong>Net After Expenses:</strong> Rs.{parseFloat(revenueAnalytics.revenue.netAfterExpenses || 0).toFixed(2)}</p>
                  </div>
                </div>

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

              <table className="data-table">
                <thead>
                  <tr><th>Metric</th><th>Amount (Rs.)</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>Gross Revenue</strong></td><td>{parseFloat(revenueAnalytics.revenue.gross).toFixed(2)}</td></tr>
                  <tr><td>Total Discounts</td><td>{parseFloat(revenueAnalytics.revenue.discounts).toFixed(2)}</td></tr>
                  <tr><td>Total Tax</td><td>{parseFloat(revenueAnalytics.revenue.tax).toFixed(2)}</td></tr>
                  <tr><td>Total Expenses</td><td>{parseFloat(revenueAnalytics.revenue.expenses || 0).toFixed(2)}</td></tr>
                  <tr style={{ backgroundColor: 'var(--surface-muted)' }}><td><strong>Net Sales</strong></td><td><strong>{parseFloat(revenueAnalytics.revenue.net).toFixed(2)}</strong></td></tr>
                  <tr style={{ backgroundColor: 'var(--surface-muted)' }}><td><strong>Net After Expenses</strong></td><td><strong>{parseFloat(revenueAnalytics.revenue.netAfterExpenses || 0).toFixed(2)}</strong></td></tr>
                </tbody>
              </table>
            </div>
          )}

          {report.hourlyBreakdown && report.hourlyBreakdown.length > 0 && (
            <div className="section-container report-section-anchor" id="report-hourly">
              <h3>Hourly Breakdown</h3>
              <table className="data-table">
                <thead>
                  <tr><th>Hour</th><th>Orders</th><th>Paid</th><th>Sales (Rs.)</th><th>Tax (Rs.)</th><th>Discount (Rs.)</th></tr>
                </thead>
                <tbody>
                  {report.hourlyBreakdown.map((hour) => (
                    <tr key={hour.hour}>
                      <td className="hour-cell">{getHourLabel(hour.hour)}</td>
                      <td>{hour.orderCount}</td>
                      <td>{hour.paidCount}</td>
                      <td className="sales-cell">Rs. {hour.sales.toFixed(2)}</td>
                      <td>Rs. {hour.tax.toFixed(2)}</td>
                      <td>Rs. {hour.discount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="section-container report-section-anchor" id="report-payments">
            <h3>Payment Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              <div>
                {Object.entries(report.paymentByMethod || {}).length > 0 && (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(report.paymentByMethod || {}).map(([method, amount]) => ({ name: method, value: parseFloat(amount) }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="var(--success-color)"
                        dataKey="value"
                      >
                        {Object.entries(report.paymentByMethod || {}).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `Rs.${parseFloat(value).toFixed(2)}`} contentStyle={tooltipStyle} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div>
                <table className="data-table" style={{ margin: '0' }}>
                  <thead><tr><th>Payment Method</th><th>Amount</th></tr></thead>
                  <tbody>
                    {Object.entries(report.paymentByMethod || {}).map(([method, amount]) => (
                      <tr key={method}><td>{method}</td><td>Rs. {parseFloat(amount).toFixed(2)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {Array.isArray(report.expensesByCategory) && report.expensesByCategory.length > 0 && (
            <div className="section-container report-section-anchor" id="report-expenses">
              <h3>Detailed Expense Breakdown (Top Spend)</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category / Sub Category</th>
                    <th style={{ textAlign: 'right' }}>Entries</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {report.expensesByCategory.map((catData) => (
                    <React.Fragment key={catData.category}>
                      <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                        <td><strong>{catData.category}</strong></td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{catData.count}</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--danger-color)' }}>Rs. {catData.totalAmount.toFixed(2)}</td>
                      </tr>
                      {catData.subcategories && catData.subcategories.map((sub) => (
                        <tr key={`${catData.category}-${sub.name}`} style={{ backgroundColor: 'var(--card-bg)' }}>
                          <td style={{ paddingLeft: '32px', color: 'var(--text-secondary)', fontSize: '13px' }}>↳ {sub.name}</td>
                          <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '13px' }}>{sub.count}</td>
                          <td style={{ textAlign: 'right', fontSize: '13px' }}>Rs. {sub.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {report.allItems && report.allItems.length > 0 && (
            <div className="section-container report-section-anchor" id="report-items">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0 }}>All Items Sold ({report.allItems.length} items)</h3>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Click column headers to sort</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ cursor: 'default' }}>#</th>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleItemSort('name')}>
                      Item Name <SortArrow col="name" />
                    </th>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleItemSort('quantity')}>
                      Qty Sold <SortArrow col="quantity" />
                    </th>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleItemSort('revenue')}>
                      Revenue (Rs.) <SortArrow col="revenue" />
                    </th>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleItemSort('avgPrice')}>
                      Avg Price <SortArrow col="avgPrice" />
                    </th>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleItemSort('orderCount')}>
                      Orders <SortArrow col="orderCount" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedAllItems(report.allItems).map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{idx + 1}</td>
                      <td><strong>{item.name}</strong></td>
                      <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.quantity}</td>
                      <td className="sales-cell">Rs. {item.revenue.toFixed(2)}</td>
                      <td>Rs. {item.avgPrice.toFixed(2)}</td>
                      <td>{item.orderCount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: 'var(--surface-muted)', fontWeight: 'bold' }}>
                    <td></td>
                    <td>Total</td>
                    <td style={{ color: 'var(--primary-color)' }}>
                      {report.allItems.reduce((s, i) => s + i.quantity, 0)}
                    </td>
                    <td className="sales-cell">
                      Rs. {report.allItems.reduce((s, i) => s + i.revenue, 0).toFixed(2)}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}



          {report.orders && report.orders.length > 0 && (
            <div className="section-container report-section-anchor" id="report-orders">
              <h3>Individual Orders</h3>
              <table className="data-table">
                <thead><tr><th>Bill #</th><th>Date & Time</th><th>Items</th><th>Subtotal</th><th>Tax</th><th>Discount</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {report.orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>#{order.bill_number}</strong></td>
                      <td>{formatDate(order.created_at)}</td>
                      <td style={{ textAlign: 'center' }}>{order.item_count || '-'}</td>
                      <td>{formatCurrency(order.subtotal)}</td>
                      <td>{formatCurrency(order.tax_amount)}</td>
                      <td>{formatCurrency(order.discount_amount)}</td>
                      <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>{formatCurrency(order.final_amount)}</td>
                      <td>
                        <span style={{
                          background: ['paid', 'completed'].includes(order.status)
                            ? 'var(--success-color)'
                            : order.status === 'pending'
                              ? 'var(--warning-color)'
                              : 'var(--danger-color)',
                          color: 'var(--text-on-brand)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td><button onClick={() => handleViewOrderDetails(order.id)} className="btn-edit">View</button></td>
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
