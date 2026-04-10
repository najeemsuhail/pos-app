import React, { useCallback, useEffect, useState } from 'react';
import { expenseService } from '../../services/api';

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

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

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
      fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save expense');
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

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Daily Expenses</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>Add Expense</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label>Date *</label>
            <input type="date" value={formData.expense_date} onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })} required />
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
          <input type="text" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} placeholder="e.g., Groceries, gas refill, technician visit" required />
        </div>

        <div className="form-group">
          <label>Reference</label>
          <input type="text" value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })} placeholder="Invoice number, UPI ref, voucher, etc." />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-success">Add Expense</button>
        </div>
      </form>

      <div className="report-filters">
        <div>
          <label>Start Date:</label>
          <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="date-input" />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="date-input" />
        </div>
        <button className="btn-primary" onClick={() => fetchExpenses(filters.startDate, filters.endDate)}>Fetch Expenses</button>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <h4>Total Entries</h4>
          <p className="report-value">{expenses.length}</p>
        </div>
        <div className="report-card">
          <h4>Total Expenses</h4>
          <p className="report-value">Rs. {totalExpenses.toFixed(2)}</p>
        </div>
      </div>

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
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                  <td>{expense.category}</td>
                  <td>{expense.note}</td>
                  <td>{expense.payment_method}</td>
                  <td>{expense.reference || '-'}</td>
                  <td>Rs. {parseFloat(expense.amount).toFixed(2)}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(expense.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No expenses found for this range.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagementTab;
