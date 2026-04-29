import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { downloadExcelWorkbook } from '../../utils/excelExport';
import { purchaseService } from '../../services/api';

const today = new Date().toISOString().split('T')[0];

const createEmptyItem = () => ({
  item_name: '',
  quantity: 1,
  unit: '',
  unit_price: '',
});

const money = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

const PurchaseManagementTab = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [summary, setSummary] = useState({ purchase_count: 0, total_amount: 0, paid_amount: 0, due_amount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filters, setFilters] = useState({ startDate: today, endDate: today, supplierId: '' });
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [supplierForm, setSupplierForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [purchaseForm, setPurchaseForm] = useState({
    supplier_id: '',
    purchase_date: today,
    invoice_number: '',
    tax_amount: '',
    discount_amount: '',
    paid_amount: '',
    note: '',
    items: [createEmptyItem()],
  });
  const [paymentDrafts, setPaymentDrafts] = useState({});
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingPurchase, setEditingPurchase] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [suppliersResponse, purchasesResponse, summaryResponse] = await Promise.all([
        purchaseService.getSuppliers(),
        purchaseService.getAll(filters.startDate, filters.endDate, filters.supplierId || undefined),
        purchaseService.getSummary(filters.startDate, filters.endDate, filters.supplierId || undefined),
      ]);

      setSuppliers(suppliersResponse.data);
      setPurchases(purchasesResponse.data);
      setSummary(summaryResponse.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load purchase data');
    } finally {
      setLoading(false);
    }
  }, [filters.endDate, filters.startDate, filters.supplierId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetPurchaseForm = () => {
    setPurchaseForm({
      supplier_id: suppliers[0]?.id || '',
      purchase_date: today,
      invoice_number: '',
      tax_amount: '',
      discount_amount: '',
      paid_amount: '',
      note: '',
      items: [createEmptyItem()],
    });
  };

  useEffect(() => {
    if (!purchaseForm.supplier_id && suppliers.length > 0) {
      setPurchaseForm((current) => ({ ...current, supplier_id: suppliers[0].id }));
    }
  }, [purchaseForm.supplier_id, suppliers]);

  const handleSupplierSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingSupplier) {
        await purchaseService.updateSupplier(editingSupplier.id, supplierForm);
        setEditingSupplier(null);
        setSuccess('Supplier updated successfully');
      } else {
        await purchaseService.createSupplier(supplierForm);
        setSuccess('Supplier created successfully');
      }
      setSupplierForm({ name: '', phone: '', email: '', address: '', notes: '' });
      setShowSupplierForm(false);
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save supplier');
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await purchaseService.deleteSupplier(supplierId);
        setSuccess('Supplier deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
        await fetchData();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete supplier');
      }
    }
  };

  const handleEditSupplier = (supplier) => {
    setSupplierForm({
      name: supplier.name,
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || '',
      notes: supplier.notes || '',
    });
    setEditingSupplier(supplier);
    setShowSupplierForm(true);
  };

  const handleCancelEditSupplier = () => {
    setSupplierForm({ name: '', phone: '', email: '', address: '', notes: '' });
    setEditingSupplier(null);
    setShowSupplierForm(false);
  };

  const handlePurchaseInput = (field, value) => {
    setPurchaseForm((current) => ({ ...current, [field]: value }));
  };

  const handlePurchaseItemChange = (index, field, value) => {
    setPurchaseForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItemRow = () => {
    setPurchaseForm((current) => ({ ...current, items: [...current.items, createEmptyItem()] }));
  };

  const removeItemRow = (index) => {
    setPurchaseForm((current) => ({
      ...current,
      items: current.items.length === 1 ? current.items : current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handlePurchaseSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingPurchase) {
        await purchaseService.update(editingPurchase.id, purchaseForm);
        setEditingPurchase(null);
        setSuccess('Purchase updated successfully');
      } else {
        await purchaseService.create(purchaseForm);
        setSuccess('Purchase saved successfully');
      }
      resetPurchaseForm();
      setShowPurchaseForm(false);
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save purchase');
    }
  };

  const handleDeletePurchase = async (purchaseId) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await purchaseService.delete(purchaseId);
        setSuccess('Purchase deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
        await fetchData();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete purchase');
      }
    }
  };

  const handleEditPurchase = (purchase) => {
    setPurchaseForm({
      supplier_id: purchase.supplier_id,
      purchase_date: purchase.purchase_date.split('T')[0],
      invoice_number: purchase.invoice_number || '',
      tax_amount: purchase.tax_amount || '',
      discount_amount: purchase.discount_amount || '',
      paid_amount: purchase.paid_amount || '',
      note: purchase.note || '',
      items: purchase.items || [createEmptyItem()],
    });
    setEditingPurchase(purchase);
    setShowPurchaseForm(true);
  };

  const handleCancelEditPurchase = () => {
    resetPurchaseForm();
    setEditingPurchase(null);
    setShowPurchaseForm(false);
  };

  const handleRecordPayment = async (purchaseId) => {
    const paymentAmount = paymentDrafts[purchaseId];

    try {
      await purchaseService.recordPayment(purchaseId, { payment_amount: paymentAmount });
      setPaymentDrafts((current) => ({ ...current, [purchaseId]: '' }));
      setSuccess('Payment recorded successfully');
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to record payment');
    }
  };

  const purchasePreviewSubtotal = purchaseForm.items.reduce((sum, item) => {
    const quantity = Number(item.quantity || 0);
    const unitPrice = Number(item.unit_price || 0);
    return sum + (quantity * unitPrice);
  }, 0);

  const purchasePreviewTotal = purchasePreviewSubtotal + Number(purchaseForm.tax_amount || 0) - Number(purchaseForm.discount_amount || 0);

  const formatDateCell = (value) => ({ value, type: 'DateTime', style: 'date' });
  const formatCurrencyCell = (value) => ({ value: Number(value || 0), style: 'currency' });
  const formatIntegerCell = (value) => ({ value: Number(value || 0), style: 'integer' });

  const handleExportExcel = () => {
    if (!purchases.length) return;

    const safeLabel = `${filters.startDate || today}_${filters.endDate || today}`.replace(/[^0-9a-zA-Z-_]/g, '-');
    const generatedAt = new Date().toLocaleString();

    const summaryRows = [
      { cells: ['Supplier Purchase Report'], style: 'title' },
      { cells: ['Metric', 'Value'], style: 'header' },
      ['Total Purchases', formatIntegerCell(summary.purchase_count)],
      ['Total Amount', formatCurrencyCell(summary.total_amount)],
      ['Total Paid', formatCurrencyCell(summary.paid_amount)],
      ['Total Outstanding', formatCurrencyCell(summary.due_amount)],
      [],
      ['Period', `${filters.startDate || today} to ${filters.endDate || today}`],
      ['Generated At', generatedAt],
    ];

    const supplierRows = [
      { cells: ['Supplier Ledger'], style: 'title' },
      { cells: ['Supplier', 'Phone', 'Purchases', 'Total Purchased', 'Paid', 'Outstanding'], style: 'header' },
      ...suppliers.map((supplier) => [
        supplier.name,
        supplier.phone || '',
        formatIntegerCell(supplier.purchase_count),
        formatCurrencyCell(supplier.total_purchased),
        formatCurrencyCell(supplier.total_paid),
        formatCurrencyCell(supplier.outstanding_amount),
      ]),
      [],
      ['Generated At', generatedAt],
    ];

    const purchaseRows = [
      { cells: ['Purchase History'], style: 'title' },
      { cells: ['Date', 'Supplier', 'Invoice', 'Items', 'Total', 'Paid', 'Due', 'Status'], style: 'header' },
      ...purchases.map((purchase) => [
        formatDateCell(purchase.purchase_date),
        purchase.supplier?.name || '',
        purchase.invoice_number || '',
        purchase.items?.map((item) => `${item.item_name} (${item.quantity}${item.unit ? ` ${item.unit}` : ''})`).join(', ') || '',
        formatCurrencyCell(purchase.total_amount),
        formatCurrencyCell(purchase.paid_amount),
        formatCurrencyCell(purchase.due_amount),
        purchase.payment_status || '',
      ]),
      [],
      ['Generated At', generatedAt],
    ];

    downloadExcelWorkbook(`supplier-purchases-${safeLabel}.xlsx`, [
      { name: 'Summary', columns: [180, 160], rows: summaryRows },
      { name: 'Suppliers', columns: [180, 120, 90, 120, 120, 120], rows: supplierRows },
      { name: 'History', columns: [100, 140, 140, 260, 110, 110, 110, 100], rows: purchaseRows },
    ]);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2>Supplier Purchases</h2>
          <p className="compact-muted">Track vendor purchases, invoices, and outstanding balances here.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-secondary" onClick={() => { setShowPurchaseForm(false); setShowSupplierForm((current) => !current); }}>
            {showSupplierForm ? 'Cancel Supplier' : '+ Add Supplier'}
          </button>
          <button className="btn-primary" onClick={() => { setShowSupplierForm(false); setShowPurchaseForm((current) => !current); }}>
            {showPurchaseForm ? 'Cancel Purchase' : '+ Add Purchase'}
          </button>
          {purchases.length > 0 && (
            <button className="btn-secondary" type="button" onClick={handleExportExcel} style={{ minWidth: '98px' }}>
              Export Excel
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="report-grid" style={{ marginBottom: '20px' }}>
        <div className="report-card">
          <h4>Total Purchases</h4>
          <div className="report-value">{summary.purchase_count || 0}</div>
        </div>
        <div className="report-card">
          <h4>Total Amount</h4>
          <div className="report-value">{money(summary.total_amount)}</div>
        </div>
        <div className="report-card">
          <h4>Total Paid</h4>
          <div className="report-value">{money(summary.paid_amount)}</div>
        </div>
        <div className="report-card">
          <h4>Outstanding</h4>
          <div className="report-value">{money(summary.due_amount)}</div>
        </div>
      </div>

      <div className="report-filters" style={{ marginBottom: '14px', gap: '12px', alignItems: 'flex-end' }}>
        <div>
          <label>Start Date</label>
          <DatePicker
            selected={parseDateStr(filters.startDate)}
            onChange={(date) => setFilters((current) => ({ ...current, startDate: formatDateStr(date) }))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>End Date</label>
          <DatePicker
            selected={parseDateStr(filters.endDate)}
            onChange={(date) => setFilters((current) => ({ ...current, endDate: formatDateStr(date) }))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Supplier</label>
          <select
            className="date-input"
            value={filters.supplierId}
            onChange={(event) => setFilters((current) => ({ ...current, supplierId: event.target.value }))}
          >
            <option value="">All Suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>
        {purchases.length > 0 && (
          <button className="btn-secondary" type="button" onClick={handleExportExcel} style={{ height: '38px' }}>
            Excel
          </button>
        )}
      </div>

      {showSupplierForm && (
        <form className="admin-form" onSubmit={handleSupplierSubmit}>
          <h3>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
          <div className="compact-grid-2">
            <div className="form-group">
              <label>Name *</label>
              <input value={supplierForm.name} onChange={(event) => setSupplierForm((current) => ({ ...current, name: event.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={supplierForm.phone} onChange={(event) => setSupplierForm((current) => ({ ...current, phone: event.target.value }))} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={supplierForm.email} onChange={(event) => setSupplierForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea value={supplierForm.address} onChange={(event) => setSupplierForm((current) => ({ ...current, address: event.target.value }))} rows={2} />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={supplierForm.notes} onChange={(event) => setSupplierForm((current) => ({ ...current, notes: event.target.value }))} rows={2} />
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit">{editingSupplier ? 'Update Supplier' : 'Save Supplier'}</button>
            <button className="btn-secondary" type="button" onClick={handleCancelEditSupplier}>Cancel</button>
          </div>
        </form>
      )}

      {showPurchaseForm && (
        <form className="admin-form" onSubmit={handlePurchaseSubmit}>
          <h3>{editingPurchase ? 'Edit Purchase' : 'Add Purchase'}</h3>
          <div className="compact-grid-3">
            <div className="form-group">
              <label>Supplier *</label>
              <select
                value={purchaseForm.supplier_id}
                onChange={(event) => handlePurchaseInput('supplier_id', event.target.value)}
                required
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Purchase Date *</label>
              <DatePicker
                selected={parseDateStr(purchaseForm.purchase_date)}
                onChange={(date) => handlePurchaseInput('purchase_date', formatDateStr(date))}
                className="date-input"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="form-group">
              <label>Invoice Number</label>
              <input value={purchaseForm.invoice_number} onChange={(event) => handlePurchaseInput('invoice_number', event.target.value)} />
            </div>
            <div className="form-group">
              <label>Tax Amount</label>
              <input type="number" min="0" step="0.01" value={purchaseForm.tax_amount} onChange={(event) => handlePurchaseInput('tax_amount', event.target.value)} />
            </div>
            <div className="form-group">
              <label>Discount Amount</label>
              <input type="number" min="0" step="0.01" value={purchaseForm.discount_amount} onChange={(event) => handlePurchaseInput('discount_amount', event.target.value)} />
            </div>
            <div className="form-group">
              <label>Initial Paid Amount</label>
              <input type="number" min="0" step="0.01" value={purchaseForm.paid_amount} onChange={(event) => handlePurchaseInput('paid_amount', event.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={purchaseForm.note} onChange={(event) => handlePurchaseInput('note', event.target.value)} rows={2} />
          </div>

          <h4 style={{ marginTop: '16px' }}>Items</h4>
          <div className="items-table" style={{ marginBottom: '12px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchaseForm.items.map((item, index) => (
                  <tr key={index}>
                    <td><input value={item.item_name} onChange={(event) => handlePurchaseItemChange(index, 'item_name', event.target.value)} placeholder="Item name" required /></td>
                    <td><input type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => handlePurchaseItemChange(index, 'quantity', event.target.value)} required /></td>
                    <td><input value={item.unit} onChange={(event) => handlePurchaseItemChange(index, 'unit', event.target.value)} placeholder="kg / pcs" /></td>
                    <td><input type="number" min="0" step="0.01" value={item.unit_price} onChange={(event) => handlePurchaseItemChange(index, 'unit_price', event.target.value)} required /></td>
                    <td>{money((Number(item.quantity || 0) * Number(item.unit_price || 0)))}</td>
                    <td>
                      <button type="button" className="btn-secondary" onClick={() => removeItemRow(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="btn-secondary" onClick={addItemRow} style={{ marginBottom: '12px' }}>+ Add Item</button>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>
            Preview Total: {money(purchasePreviewTotal)}
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit">{editingPurchase ? 'Update Purchase' : 'Save Purchase'}</button>
            <button className="btn-secondary" type="button" onClick={handleCancelEditPurchase}>Cancel</button>
          </div>
        </form>
      )}

      <div className="items-table compact-table" style={{ marginBottom: '16px' }}>
        <h3>Supplier Ledger</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Phone</th>
              <th>Purchases</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.phone || '-'}</td>
                <td>{supplier.purchase_count || 0}</td>
                <td>{money(supplier.total_purchased)}</td>
                <td>{money(supplier.total_paid)}</td>
                <td>{money(supplier.outstanding_amount)}</td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" onClick={() => handleEditSupplier(supplier)} style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteSupplier(supplier.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No suppliers yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="items-table compact-table">
        <h3>Purchase History</h3>
        {loading ? (
          <div className="loading">Loading purchases...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Invoice</th>
                <th>Items</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Add Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                  <td>{purchase.supplier?.name || '-'}</td>
                  <td>{purchase.invoice_number || '-'}</td>
                  <td>{purchase.items?.map((item) => `${item.item_name} (${item.quantity}${item.unit ? ` ${item.unit}` : ''})`).join(', ') || '-'}</td>
                  <td>{money(purchase.total_amount)}</td>
                  <td>{money(purchase.paid_amount)}</td>
                  <td>{money(purchase.due_amount)}</td>
                  <td style={{ textTransform: 'capitalize' }}>{purchase.payment_status}</td>
                  <td>
                    {purchase.due_amount > 0 ? (
                      <div style={{ display: 'flex', gap: '8px', minWidth: '180px' }}>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={paymentDrafts[purchase.id] || ''}
                          onChange={(event) => setPaymentDrafts((current) => ({ ...current, [purchase.id]: event.target.value }))}
                          placeholder="Amount"
                        />
                        <button className="btn-secondary" onClick={() => handleRecordPayment(purchase.id)}>Save</button>
                      </div>
                    ) : 'Settled'}
                  </td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" onClick={() => handleEditPurchase(purchase)} style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeletePurchase(purchase.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No purchases found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PurchaseManagementTab;
