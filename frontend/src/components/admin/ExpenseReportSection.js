import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { expenseService } from '../../services/api';
import html2pdf from 'html2pdf.js';
import { downloadExcelWorkbook } from '../../utils/excelExport';

const money = (v) => `Rs. ${parseFloat(v || 0).toFixed(2)}`;

const PdfIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 2h8l4 4v16H6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 2v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 14h8M8 18h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ExcelIcon = () => (
  <svg className="button-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 3h16v18H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 9h16M4 15h16M10 3v18M16 3v18" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const getWeekRange = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - day);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return {
    start: weekStart.toISOString().split('T')[0],
    end: weekEnd.toISOString().split('T')[0],
  };
};

const getMonthRange = (monthStr) => {
  const [year, month] = monthStr.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return {
    start: `${monthStr}-01`,
    end: `${monthStr}-${String(lastDay).padStart(2, '0')}`,
  };
};

const ExpenseReportSection = ({ headerAction = null }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [period, setPeriod] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);
  const [periodLabel, setPeriodLabel] = useState('');
  const [expandedCats, setExpandedCats] = useState({});

  const getRange = () => {
    if (period === 'daily') {
      return { start: selectedDate, end: selectedDate, label: `Daily Report — ${selectedDate}` };
    }
    if (period === 'weekly') {
      const { start, end } = getWeekRange(selectedDate);
      return { start, end, label: `Weekly Report — ${start} to ${end}` };
    }
    if (period === 'monthly') {
      const { start, end } = getMonthRange(selectedMonth);
      const monthName = new Date(start).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return { start, end, label: `Monthly Report — ${monthName}` };
    }
    return { start: startDate, end: endDate, label: `Report — ${startDate} to ${endDate}` };
  };

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError('');
      const { start, end, label } = getRange();
      const response = await expenseService.getAll(start, end);
      setExpenses(response.data || []);
      setPeriodLabel(label);
      setFetched(true);
      setExpandedCats({});
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch operating expense report');
    } finally {
      setLoading(false);
    }
  };

  // Group: category → sub-category → { amount, count, entries[] }
  const grouped = expenses.reduce((acc, exp) => {
    const cat = exp.category || 'Other';
    const sub = exp.note || '(No Sub Category)';
    if (!acc[cat]) acc[cat] = { total: 0, count: 0, subs: {} };
    acc[cat].total += parseFloat(exp.amount) || 0;
    acc[cat].count += 1;
    if (!acc[cat].subs[sub]) acc[cat].subs[sub] = { amount: 0, count: 0 };
    acc[cat].subs[sub].amount += parseFloat(exp.amount) || 0;
    acc[cat].subs[sub].count += 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(grouped).sort((a, b) => b[1].total - a[1].total);
  const grandTotal = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : '-';

  const toggleCat = (cat) => setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const handleExportPDF = () => {
    if (!fetched || expenses.length === 0) return;
    const div = document.createElement('div');
    div.style.padding = '20px';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.color = '#333';

    const catRows = sortedCategories.map(([cat, data]) => {
      const subRows = Object.entries(data.subs)
        .sort((a, b) => b[1].amount - a[1].amount)
        .map(([sub, sd]) => `
          <tr style="background:#fafafa;">
            <td style="padding:6px 8px 6px 28px; border:1px solid #ddd; color:#555;">↳ ${sub}</td>
            <td style="padding:6px 8px; border:1px solid #ddd; text-align:right; color:#555;">${sd.count}</td>
            <td style="padding:6px 8px; border:1px solid #ddd; text-align:right;">${money(sd.amount)}</td>
          </tr>`).join('');
      return `
        <tr style="background:#f0f4ff;">
          <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${cat}</td>
          <td style="padding:8px; border:1px solid #ddd; text-align:right; font-weight:bold;">${data.count}</td>
          <td style="padding:8px; border:1px solid #ddd; text-align:right; font-weight:bold; color:#2563eb;">${money(data.total)}</td>
        </tr>${subRows}`;
    }).join('');

    div.innerHTML = `
      <div style="text-align:center; margin-bottom:24px; border-bottom:2px solid #333; padding-bottom:16px;">
        <h1 style="margin:0; color:#2c3e50;">Chewbiecafe — Operating Expense Report</h1>
        <p style="margin:6px 0; color:#666;">${periodLabel}</p>
        <p style="margin:4px 0; color:#999; font-size:12px;">Generated: ${new Date().toLocaleString()}</p>
      </div>
      <div style="display:flex; gap:20px; margin-bottom:24px;">
        <div style="flex:1; border:1px solid #ddd; border-radius:6px; padding:12px; text-align:center;">
          <div style="font-size:12px; color:#666;">Total Expenses</div>
          <div style="font-size:20px; font-weight:bold; color:#dc2626;">${money(grandTotal)}</div>
        </div>
        <div style="flex:1; border:1px solid #ddd; border-radius:6px; padding:12px; text-align:center;">
          <div style="font-size:12px; color:#666;">Total Entries</div>
          <div style="font-size:20px; font-weight:bold;">${expenses.length}</div>
        </div>
        <div style="flex:1; border:1px solid #ddd; border-radius:6px; padding:12px; text-align:center;">
          <div style="font-size:12px; color:#666;">Categories</div>
          <div style="font-size:20px; font-weight:bold;">${sortedCategories.length}</div>
        </div>
        <div style="flex:1; border:1px solid #ddd; border-radius:6px; padding:12px; text-align:center;">
          <div style="font-size:12px; color:#666;">Top Category</div>
          <div style="font-size:16px; font-weight:bold;">${topCategory}</div>
        </div>
      </div>
      <h2 style="color:#2c3e50; border-bottom:2px solid #8e44ad; padding-bottom:8px;">Category & Sub Category Breakdown</h2>
      <table style="width:100%; border-collapse:collapse; font-size:12px; margin-top:12px;">
        <thead>
          <tr style="background:#8e44ad; color:white;">
            <th style="padding:8px; border:1px solid #ddd; text-align:left;">Category / Sub Category</th>
            <th style="padding:8px; border:1px solid #ddd; text-align:right;">Entries</th>
            <th style="padding:8px; border:1px solid #ddd; text-align:right;">Amount</th>
          </tr>
        </thead>
        <tbody>${catRows}</tbody>
        <tfoot>
          <tr style="background:#f0e8f8; font-weight:bold;">
            <td style="padding:8px; border:1px solid #ddd;">Grand Total</td>
            <td style="padding:8px; border:1px solid #ddd; text-align:right;">${expenses.length}</td>
            <td style="padding:8px; border:1px solid #ddd; text-align:right;">${money(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
      <div style="margin-top:40px; padding-top:16px; border-top:1px solid #ddd; text-align:center; color:#999; font-size:11px;">
        Computer-generated operating expense report — Chewbiecafe POS System
      </div>`;

    const filename = `Expense-Report-${periodLabel.replace(/[^a-z0-9]/gi, '-')}.pdf`;
    html2pdf().set({
      margin: 10,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    }).from(div).save();
  };

  const handleExportExcel = () => {
    if (!fetched || expenses.length === 0) {
      return;
    }

    const currencyCell = (value, style = 'currency') => ({ value: Number(value || 0), style });
    const integerCell = (value) => ({ value: Number(value || 0), style: 'integer' });
    const dateCell = (value) => ({ value, type: 'DateTime', style: 'date' });
    const generatedAt = new Date().toLocaleString();

    const summaryRows = [
      { cells: ['Operating Expense Report Export'], style: 'title' },
      { cells: ['Metric', 'Value'], style: 'header' },
      ['Total Expenses', currencyCell(grandTotal, 'totalCurrency')],
      ['Total Entries', integerCell(expenses.length)],
      ['Categories', integerCell(sortedCategories.length)],
      ['Top Category', topCategory],
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const categoryRows = [
      { cells: ['Category Breakdown'], style: 'title' },
      { cells: ['Category', 'Sub Category', 'Entries', 'Amount'], style: 'header' },
      ...sortedCategories.flatMap(([cat, data]) => [
        [
          { value: cat, style: 'textBold' },
          'TOTAL',
          integerCell(data.count),
          currencyCell(data.total),
        ],
        ...Object.entries(data.subs)
          .sort((a, b) => b[1].amount - a[1].amount)
          .map(([sub, sd]) => [
            cat,
            sub,
            integerCell(sd.count),
            currencyCell(sd.amount),
          ]),
      ]),
      [
        { value: 'Grand Total', style: 'totalLabel' },
        '',
        integerCell(expenses.length),
        currencyCell(grandTotal, 'totalCurrency'),
      ],
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const entryRows = [
      { cells: ['Operating Expense Entries'], style: 'title' },
      { cells: ['Expense Date', 'Category', 'Sub Category', 'Amount', 'Payment Method', 'Reference', 'Created At'], style: 'header' },
      ...expenses.map((expense) => [
        dateCell(expense.expense_date),
        expense.category,
        expense.note,
        currencyCell(expense.amount),
        expense.payment_method,
        expense.reference || '',
        dateCell(expense.created_at),
      ]),
      [],
      ['Period', periodLabel],
      ['Generated At', generatedAt],
    ];

    const safeLabel = periodLabel.replace(/[^a-z0-9_-]/gi, '-');
    downloadExcelWorkbook(`operating-expense-report-${safeLabel}.xlsx`, [
      { name: 'Summary', columns: [180, 160], rows: summaryRows },
      { name: 'Categories', columns: [180, 220, 90, 120], rows: categoryRows },
      { name: 'Entries', columns: [120, 140, 220, 110, 120, 140, 140], rows: entryRows },
    ]);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Operating Expense Report</h2>
          <p className="compact-muted">
            Supplier purchases are tracked in the Purchases tab. This section is only for operating expenses.
          </p>
        </div>
        {headerAction}
      </div>

      {/* Period Selector */}
      <div className="section-container" style={{ marginBottom: '16px' }}>
        <div className="radio-group" style={{ marginBottom: '16px' }}>
          {['daily', 'weekly', 'monthly', 'range'].map((p) => (
            <label key={p}>
              <input type="radio" value={p} checked={period === p} onChange={() => setPeriod(p)} />
              {p.charAt(0).toUpperCase() + p.slice(1)}{p === 'range' ? ' (Custom)' : ''}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {period === 'daily' && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Date</label>
              <DatePicker selected={parseDateStr(selectedDate)} onChange={(d) => setSelectedDate(formatDateStr(d))} className="date-input" dateFormat="yyyy-MM-dd" />
            </div>
          )}
          {period === 'weekly' && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Any date in the week</label>
              <DatePicker selected={parseDateStr(selectedDate)} onChange={(d) => setSelectedDate(formatDateStr(d))} className="date-input" dateFormat="yyyy-MM-dd" />
            </div>
          )}
          {period === 'monthly' && (
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Month</label>
              <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="date-input" />
            </div>
          )}
          {period === 'range' && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Start Date</label>
                <DatePicker selected={parseDateStr(startDate)} onChange={(d) => setStartDate(formatDateStr(d))} className="date-input" dateFormat="yyyy-MM-dd" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>End Date</label>
                <DatePicker selected={parseDateStr(endDate)} onChange={(d) => setEndDate(formatDateStr(d))} className="date-input" dateFormat="yyyy-MM-dd" />
              </div>
            </>
          )}
          <button className="btn-primary" onClick={fetchReport} style={{ height: '38px' }}>
            Generate Report
          </button>
          {fetched && expenses.length > 0 && (
            <>
              <button className="btn-success report-export-button" onClick={handleExportPDF} style={{ height: '38px', width: '80px' }}>
                <PdfIcon />
                PDF
              </button>
              <button className="btn-secondary report-export-button" onClick={handleExportExcel} style={{ height: '38px', width: '80px' }}>
                <ExcelIcon />
                Excel
              </button>
            </>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading operating expense report...</div>}

      {fetched && !loading && (
        <>
          {/* Summary Cards */}
          <div className="report-grid" style={{ marginBottom: '20px' }}>
            <div className="report-card">
              <h4>Total Expenses</h4>
              <p className="report-value" style={{ color: 'var(--danger-color)' }}>Rs. {grandTotal.toFixed(2)}</p>
            </div>
            <div className="report-card">
              <h4>Total Entries</h4>
              <p className="report-value">{expenses.length}</p>
            </div>
            <div className="report-card">
              <h4>Categories</h4>
              <p className="report-value">{sortedCategories.length}</p>
            </div>
            <div className="report-card">
              <h4>Top Category</h4>
              <p className="report-value" style={{ fontSize: '18px' }}>{topCategory}</p>
            </div>
          </div>

          {expenses.length === 0 ? (
            <div className="section-container compact-table" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              No operating expenses found for this period.
            </div>
          ) : (
            <div className="section-container compact-table">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0 }}>{periodLabel}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const allExpanded = sortedCategories.every(([cat]) => expandedCats[cat]);
                    const next = {};
                    sortedCategories.forEach(([cat]) => { next[cat] = !allExpanded; });
                    setExpandedCats(next);
                  }}
                  style={{ fontSize: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  {sortedCategories.every(([cat]) => expandedCats[cat]) ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category / Sub Category</th>
                    <th style={{ textAlign: 'right' }}>Entries</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th style={{ textAlign: 'right' }}>% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCategories.map(([cat, data]) => {
                    const isExpanded = expandedCats[cat];
                    const pct = grandTotal > 0 ? ((data.total / grandTotal) * 100).toFixed(1) : '0.0';
                    const sortedSubs = Object.entries(data.subs).sort((a, b) => b[1].amount - a[1].amount);
                    return (
                      <React.Fragment key={cat}>
                        {/* Category Row */}
                        <tr
                          style={{ cursor: 'pointer', backgroundColor: 'var(--surface-muted)' }}
                          onClick={() => toggleCat(cat)}
                        >
                          <td>
                            <span style={{ marginRight: '8px', fontSize: '12px', opacity: 0.6 }}>
                              {isExpanded ? '▼' : '▶'}
                            </span>
                            <strong>{cat}</strong>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{data.count}</td>
                          <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--danger-color)' }}>
                            Rs. {data.total.toFixed(2)}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span style={{ background: 'var(--primary-color)', color: 'var(--text-on-brand)', borderRadius: '10px', padding: '2px 8px', fontSize: '11px' }}>
                              {pct}%
                            </span>
                          </td>
                        </tr>

                        {/* Sub Category Rows */}
                        {isExpanded && sortedSubs.map(([sub, sd]) => {
                          const subPct = grandTotal > 0 ? ((sd.amount / grandTotal) * 100).toFixed(1) : '0.0';
                          return (
                            <tr key={sub} style={{ backgroundColor: 'var(--card-bg)' }}>
                              <td style={{ paddingLeft: '32px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                ↳ {sub}
                              </td>
                              <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '13px' }}>{sd.count}</td>
                              <td style={{ textAlign: 'right', fontSize: '13px' }}>Rs. {sd.amount.toFixed(2)}</td>
                              <td style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-secondary)' }}>{subPct}%</td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ fontWeight: 'bold', backgroundColor: 'var(--surface-muted)' }}>
                    <td>Grand Total</td>
                    <td style={{ textAlign: 'right' }}>{expenses.length}</td>
                    <td style={{ textAlign: 'right', color: 'var(--danger-color)' }}>Rs. {grandTotal.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseReportSection;
