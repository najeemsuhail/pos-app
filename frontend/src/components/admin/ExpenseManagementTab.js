import React, { useCallback, useEffect, useState } from 'react';
import ExpenseReportSection from './ExpenseReportSection';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { expenseService } from '../../services/api';
import PaginationControls from './PaginationControls';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const DEFAULT_EXPENSE_CATEGORIES = ['Rent', 'Utilities', 'Office Supplies', 'Salary', 'Maintenance', 'Transport', 'Marketing', 'Other'];
const PAYMENT_METHODS = ['Cash', 'UPI', 'Card', 'Bank Transfer'];
const today = new Date().toISOString().split('T')[0];

const loadCustomCategories = () => {
  try {
    return JSON.parse(localStorage.getItem('expenseCustomCategories') || '[]');
  } catch { return []; }
};

const saveCustomCategories = (cats) => {
  localStorage.setItem('expenseCustomCategories', JSON.stringify(cats));
};

const ExpenseManagementTab = () => {
  const pageSize = 25;
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: pageSize, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ startDate: today, endDate: today });
  const [customCategories, setCustomCategories] = useState(loadCustomCategories);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const EXPENSE_CATEGORIES = [...DEFAULT_EXPENSE_CATEGORIES, ...customCategories];
  const [formData, setFormData] = useState({
    expense_date: today,
    category: 'Utilities',
    note: '',
    amount: '',
    payment_method: 'Cash',
    reference: '',
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [prevNotes, setPrevNotes] = useState([]);
  const [viewMode, setViewMode] = useState('ledger');
  const [sortBy, setSortBy] = useState('date_desc');

  const toggleSort = (field) => {
    setSortBy((current) => {
      if (current === `${field}_desc`) {
        return `${field}_asc`;
      }
      return `${field}_desc`;
    });
  };

  const getSortArrow = (field) => {
    if (!sortBy.startsWith(`${field}_`)) {
      return '⇅';
    }
    return sortBy.endsWith('_asc') ? '▲' : '▼';
  };

  const renderViewModeSwitcher = () => (
    <div className="tab-toggle" role="tablist" aria-label="Expense view switcher">
      <button
        type="button"
        className={`tab-toggle-button ${viewMode === 'ledger' ? 'active' : ''}`}
        aria-pressed={viewMode === 'ledger'}
        onClick={() => setViewMode('ledger')}
        disabled={viewMode === 'ledger'}
        style={{ width: '120px' }}
      >
        Ledger
      </button>
      <button
        type="button"
        className={`tab-toggle-button ${viewMode === 'report' ? 'active' : ''}`}
        aria-pressed={viewMode === 'report'}
        onClick={() => setViewMode('report')}
        disabled={viewMode === 'report'}
        style={{ width: '120px' }}
      >
        Report
      </button>
    </div>
  );

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed || EXPENSE_CATEGORIES.includes(trimmed)) {
      setNewCategoryInput('');
      setShowAddCategory(false);
      return;
    }
    const updated = [...customCategories, trimmed];
    setCustomCategories(updated);
    saveCustomCategories(updated);
    setFormData((f) => ({ ...f, category: trimmed }));
    setNewCategoryInput('');
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (cat) => {
    const updated = customCategories.filter((c) => c !== cat);
    setCustomCategories(updated);
    saveCustomCategories(updated);
  };

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF'];

  const fetchExpenses = useCallback(async (startDate = filters.startDate, endDate = filters.endDate, page = 1) => {
    try {
      setLoading(true);
      const response = await expenseService.getAll(startDate, endDate, { page, limit: pageSize });
      setExpenses(response.data.data || []);
      setPagination(response.data.pagination || { page: 1, limit: pageSize, total: 0, totalPages: 1 });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, [filters.endDate, filters.startDate]);

  const fetchUniqueNotes = useCallback(async () => {
    try {
      const response = await expenseService.getUniqueNotes();
      setPrevNotes(response.data);
    } catch (err) {
      console.error('Failed to fetch unique notes:', err);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
    fetchUniqueNotes();
  }, [fetchExpenses, fetchUniqueNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.expense_date || !formData.category || !formData.note.trim() || !formData.amount) {
        setError('Date, category, sub category, and amount are required');
        return;
      }

      await expenseService.create(formData);
      setFormData({
        expense_date: today,
        category: 'Utilities',
        note: '',
        amount: '',
        payment_method: 'Cash',
        reference: '',
      });
      setError('');
      setShowAddForm(false);
      fetchExpenses(filters.startDate, filters.endDate, 1);
      fetchUniqueNotes();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save expense');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!editingExpense.expense_date || !editingExpense.category || !editingExpense.amount) {
        setError('Date, category, and amount are required');
        return;
      }
      const note = (editingExpense.note || '').trim();
      if (!note) {
        setError('Description is required');
        return;
      }
      
      const payload = { ...editingExpense, note };
      await expenseService.update(editingExpense.id, payload);
      setEditingExpense(null);
      setError('');
      fetchExpenses(filters.startDate, filters.endDate, pagination.page);
      fetchUniqueNotes();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense entry?')) {
      return;
    }

    try {
      await expenseService.delete(id);
      setError('');
      fetchExpenses(filters.startDate, filters.endDate, pagination.page);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete expense');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  const filteredExpenses = [...expenses].sort((a, b) => {
    switch (sortBy) {
      case 'date_asc':
        return new Date(a.expense_date || 0) - new Date(b.expense_date || 0);
      case 'amount_desc':
        return (parseFloat(b.amount) || 0) - (parseFloat(a.amount) || 0);
      case 'amount_asc':
        return (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0);
      case 'category_asc':
        return (a.category || '').localeCompare(b.category || '');
      case 'category_desc':
        return (b.category || '').localeCompare(a.category || '');
      case 'date_desc':
      default:
        return new Date(b.expense_date || 0) - new Date(a.expense_date || 0);
    }
  });

  const categoryData = Object.entries(
    expenses.reduce((acc, exp) => {
      if (!exp || !exp.category || exp.amount === undefined || exp.amount === null) return acc;
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const dailyTrendData = Object.entries(
    expenses.reduce((acc, exp) => {
      if (!exp || !exp.expense_date || exp.amount === undefined || exp.amount === null) return acc;
      const date = typeof exp.expense_date === 'string' ? exp.expense_date.split('T')[0] : formatDateStr(exp.expense_date);
      acc[date] = (acc[date] || 0) + parseFloat(exp.amount);
      return acc;
    }, {})
  ).sort().map(([name, amount]) => ({ name, amount }));

  const highestCategory = categoryData.length > 0 
    ? categoryData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name 
    : '-';

  const avgDailySpend = dailyTrendData.length > 0
    ? totalExpenses / dailyTrendData.length
    : 0;

  const tooltipStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  };

  if (viewMode === 'report') {
    return (
      <div className="admin-tab-content">
        <ExpenseReportSection headerAction={renderViewModeSwitcher()} />
      </div>
    );
  }

  return (
    <div className="admin-tab-content">
     <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h2>Operating Expenses</h2>
          <p className="compact-muted">
            Track rent, utilities, salary, maintenance, transport, and other non-supplier costs here.
          </p>
        </div>
        {renderViewModeSwitcher()}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="section-container" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h3>{showAddForm ? 'Add Operating Expense' : 'Quick Actions'}</h3>
          <button 
            className={`btn-${showAddForm ? 'secondary' : 'primary'}`} 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Operating Expense'}
          </button>
        </div>

        {showAddForm && (
          <form className="admin-form" onSubmit={handleSubmit} style={{ marginTop: '14px', marginBottom: 0 }}>
            <h3>Add Operating Expense</h3>
            <div className="compact-grid-2">
              <div className="form-group">
                <label>Date *</label>
                <DatePicker selected={parseDateStr(formData.expense_date)} onChange={(date) => setFormData({ ...formData, expense_date: formatDateStr(date) })} required className="date-input" dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <div className="compact-inline-actions">
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required style={{ flex: 1 }}>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowAddCategory((v) => !v)} className="btn-secondary" style={{ whiteSpace: 'nowrap', padding: '6px 10px', fontSize: '13px' }}>
                    {showAddCategory ? '✕' : '+ New'}
                  </button>
                </div>
                {showAddCategory && (
                  <div className="compact-inline-actions" style={{ marginTop: '8px' }}>
                    <input
                      type="text"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                      placeholder="New category name..."
                      style={{ flex: 1 }}
                      autoFocus
                    />
                    <button type="button" onClick={handleAddCategory} className="btn-success" style={{ padding: '6px 12px' }}>Add</button>
                  </div>
                )}
                {customCategories.length > 0 && (
                  <div className="compact-inline-actions" style={{ marginTop: '8px', gap: '6px' }}>
                    {customCategories.map((cat) => (
                      <span key={cat} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {cat}
                        <button type="button" onClick={() => handleDeleteCategory(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-color)', fontWeight: 'bold', padding: 0, lineHeight: 1 }}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Amount *</label>
                <input type="number" min="0.01" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="e.g., 250" required />
              </div>
              <div className="form-group">
                <label>Payment Method *</label>
                <select value={formData.payment_method} onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })} required>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <input 
                type="text" 
                value={formData.note} 
                onChange={(e) => setFormData({ ...formData, note: e.target.value })} 
                  placeholder="e.g., Electricity bill, gas refill, technician visit" 
                required 
                list="prev-notes-list"
              />
            </div>

            <div className="form-group">
              <label>Reference</label>
              <input type="text" value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })} placeholder="Invoice number, UPI ref, voucher, etc." />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">Save Operating Expense</button>
            </div>
          </form>
        )}
      </div>

      <div className="report-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={parseDateStr(filters.startDate)} onChange={(date) => setFilters({ ...filters, startDate: formatDateStr(date) })} className="date-input" dateFormat="yyyy-MM-dd" />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker selected={parseDateStr(filters.endDate)} onChange={(date) => setFilters({ ...filters, endDate: formatDateStr(date) })} className="date-input" dateFormat="yyyy-MM-dd" />
        </div>
        <button className="btn-primary" onClick={() => fetchExpenses(filters.startDate, filters.endDate, 1)}>Refresh</button>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <h4>Total Entries</h4>
          <p className="report-value">{expenses.length}</p>
        </div>
        <div className="report-card">
          <h4>Total Spending</h4>
          <p className="report-value">Rs. {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="report-card">
          <h4>Highest Category</h4>
          <p className="report-value" style={{ fontSize: '18px' }}>{highestCategory}</p>
        </div>
        <div className="report-card">
          <h4>Avg Daily Spend</h4>
          <p className="report-value">Rs. {avgDailySpend.toFixed(2)}</p>
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="charts-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div className="section-container">
            <h3>Spending by Category</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(val) => `Rs. ${val.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="section-container">
            <h3>Daily Spending Trend</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.1)' }} formatter={(val) => `Rs. ${val.toFixed(2)}`} />
                  <Bar dataKey="amount" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="loading">Loading operating expenses...</div>}

      {!loading && (
        <div className="section-container compact-table">
          <h3>Operating Expense Ledger</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th
                  onClick={() => toggleSort('date')}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Sort by date"
                >
                  Date <span style={{ marginLeft: '4px', opacity: sortBy.startsWith('date_') ? 1 : 0.45 }}>{getSortArrow('date')}</span>
                </th>
                <th
                  onClick={() => toggleSort('category')}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Sort by category"
                >
                  Category <span style={{ marginLeft: '4px', opacity: sortBy.startsWith('category_') ? 1 : 0.45 }}>{getSortArrow('category')}</span>
                </th>
                <th>Description</th>
                <th>Method</th>
                <th>Reference</th>
                <th
                  onClick={() => toggleSort('amount')}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Sort by amount"
                >
                  Amount <span style={{ marginLeft: '4px', opacity: sortBy.startsWith('amount_') ? 1 : 0.45 }}>{getSortArrow('amount')}</span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'N/A'}</td>
                  <td><span className="badge" style={{ background: COLORS[EXPENSE_CATEGORIES.indexOf(expense.category) % COLORS.length] || '#ccc', opacity: 0.8 }}>{expense.category}</span></td>
                  <td>{expense.note || '-'}</td>
                  <td>{expense.payment_method}</td>
                  <td>{expense.reference || '-'}</td>
                  <td style={{ fontWeight: 'bold' }}>Rs. {parseFloat(expense.amount || 0).toFixed(2)}</td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-edit" onClick={() => setEditingExpense(expense)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(expense.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No operating expenses found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
          <PaginationControls
            pagination={pagination}
            onPageChange={(page) => fetchExpenses(filters.startDate, filters.endDate, page)}
          />
        </div>
      )}

      {editingExpense && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '760px', width: '100%' }}>
            <div className="modal-header">
              <h3>Edit Operating Expense</h3>
              <button type="button" className="modal-close" onClick={() => setEditingExpense(null)}>&times;</button>
            </div>
            <form onSubmit={handleUpdate} className="admin-form compact-admin-form" style={{ border: 'none', padding: 12, marginBottom: 0, background: 'transparent' }}>
              <div className="compact-grid-2">
                <div className="form-group">
                  <label>Date</label>
                  <DatePicker 
                    selected={parseDateStr(editingExpense.expense_date)} 
                    onChange={(date) => setEditingExpense({ ...editingExpense, expense_date: formatDateStr(date) })} 
                    required className="date-input" dateFormat="yyyy-MM-dd" 
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={editingExpense.category} onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })} required>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" step="0.01" value={editingExpense.amount} onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={editingExpense.payment_method} onChange={(e) => setEditingExpense({ ...editingExpense, payment_method: e.target.value })} required>
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  value={editingExpense.note} 
                  onChange={(e) => setEditingExpense({ ...editingExpense, note: e.target.value })} 
                  required 
                  list="prev-notes-list"
                />
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input type="text" value={editingExpense.reference || ''} onChange={(e) => setEditingExpense({ ...editingExpense, reference: e.target.value })} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingExpense(null)}>Cancel</button>
                <button type="submit" className="btn-success">Update Operating Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <datalist id="prev-notes-list">
        {prevNotes.map((note, index) => (
          <option key={index} value={note} />
        ))}
      </datalist>
    </div>
  );
};

export default ExpenseManagementTab;
