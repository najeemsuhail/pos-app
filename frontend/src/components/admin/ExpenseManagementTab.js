import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { expenseService } from '../../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const EXPENSE_CATEGORIES = ['Rent', 'Utilities', 'Supplies', 'Salary', 'Maintenance', 'Transport', 'Marketing', 'Other'];
const PAYMENT_METHODS = ['Cash', 'UPI', 'Card', 'Bank Transfer'];
const today = new Date().toISOString().split('T')[0];

const ExpenseManagementTab = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ startDate: today, endDate: today });
  const [formData, setFormData] = useState({
    expense_date: today,
    category: 'Supplies',
    note: '',
    amount: '',
    payment_method: 'Cash',
    reference: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [prevNotes, setPrevNotes] = useState([]);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF'];

  const fetchExpenses = useCallback(async (startDate = filters.startDate, endDate = filters.endDate) => {
    try {
      setLoading(true);
      const response = await expenseService.getAll(startDate, endDate);
      setExpenses(response.data);
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
        setError('Date, category, note, and amount are required');
        return;
      }

      await expenseService.create(formData);
      setFormData({
        expense_date: today,
        category: 'Supplies',
        note: '',
        amount: '',
        payment_method: 'Cash',
        reference: '',
      });
      setError('');
      setShowAddForm(false);
      fetchExpenses();
      fetchUniqueNotes();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save expense');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!editingExpense.expense_date || !editingExpense.category || !editingExpense.note.trim() || !editingExpense.amount) {
        setError('All fields are required');
        return;
      }
      await expenseService.update(editingExpense.id, editingExpense);
      setEditingExpense(null);
      setError('');
      fetchExpenses();
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
      fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete expense');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  const filteredExpenses = expenses.filter(expense => {
    const query = searchQuery.toLowerCase();
    return (
      expense.note.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      (expense.reference && expense.reference.toLowerCase().includes(query))
    );
  });

  const categoryData = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const dailyTrendData = Object.entries(
    expenses.reduce((acc, exp) => {
      const date = exp.expense_date.split('T')[0];
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

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Daily Expenses</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="section-container" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{showAddForm ? 'Add New Expense' : 'Quick Actions'}</h3>
          <button 
            className={`btn-${showAddForm ? 'secondary' : 'primary'}`} 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Expense'}
          </button>
        </div>

        {showAddForm && (
          <form className="admin-form" onSubmit={handleSubmit} style={{ marginTop: '20px', border: 'none', padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label>Date *</label>
                <DatePicker selected={parseDateStr(formData.expense_date)} onChange={(date) => setFormData({ ...formData, expense_date: formatDateStr(date) })} required className="date-input" dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
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
              <label>Note *</label>
              <input 
                type="text" 
                value={formData.note} 
                onChange={(e) => setFormData({ ...formData, note: e.target.value })} 
                placeholder="e.g., Groceries, gas refill, technician visit" 
                required 
                list="prev-notes-list"
              />
            </div>

            <div className="form-group">
              <label>Reference</label>
              <input type="text" value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })} placeholder="Invoice number, UPI ref, voucher, etc." />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">Save Expense</button>
            </div>
          </form>
        )}
      </div>

      <div className="report-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label>Search Expenses:</label>
          <input 
            type="text" 
            placeholder="Search by note, category or ref..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={parseDateStr(filters.startDate)} onChange={(date) => setFilters({ ...filters, startDate: formatDateStr(date) })} className="date-input" dateFormat="yyyy-MM-dd" />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker selected={parseDateStr(filters.endDate)} onChange={(date) => setFilters({ ...filters, endDate: formatDateStr(date) })} className="date-input" dateFormat="yyyy-MM-dd" />
        </div>
        <button className="btn-primary" onClick={() => fetchExpenses(filters.startDate, filters.endDate)}>Refresh</button>
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

      {loading && <div className="loading">Loading expenses...</div>}

      {!loading && (
        <div className="section-container">
          <h3>Expense Ledger</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Method</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                  <td><span className="badge" style={{ background: COLORS[EXPENSE_CATEGORIES.indexOf(expense.category) % COLORS.length], opacity: 0.8 }}>{expense.category}</span></td>
                  <td>{expense.note}</td>
                  <td>{expense.payment_method}</td>
                  <td>{expense.reference || '-'}</td>
                  <td style={{ fontWeight: 'bold' }}>Rs. {parseFloat(expense.amount).toFixed(2)}</td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-edit" onClick={() => setEditingExpense(expense)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(expense.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No expenses found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingExpense && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ minWidth: '400px' }}>
            <div className="modal-header">
              <h3>Edit Expense</h3>
              <button className="close-btn" onClick={() => setEditingExpense(null)}>&times;</button>
            </div>
            <form onSubmit={handleUpdate} className="admin-form" style={{ border: 'none', padding: 0 }}>
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
                <label>Note</label>
                <input 
                  type="text" 
                  value={editingExpense.note} 
                  onChange={(e) => setEditingExpense({ ...editingExpense, note: e.target.value })} 
                  required 
                  list="prev-notes-list"
                />
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
              <div className="form-group">
                <label>Reference</label>
                <input type="text" value={editingExpense.reference || ''} onChange={(e) => setEditingExpense({ ...editingExpense, reference: e.target.value })} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingExpense(null)}>Cancel</button>
                <button type="submit" className="btn-success">Update Expense</button>
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
