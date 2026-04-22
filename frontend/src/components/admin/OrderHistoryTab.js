import React, { useState, useEffect } from 'react';
import ReceiptModal from '../ReceiptModal';
import api, { orderService } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import OrderDetailsModal from './OrderDetailsModal';
import { printReceiptContent } from '../../utils/receiptPrint';

const OrderHistoryTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [receiptPreview, setReceiptPreview] = useState('');
  const [receiptBillNumber, setReceiptBillNumber] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [isLoadingReceipt, setIsLoadingReceipt] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (params = {}) => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/orders', { params });
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByDate = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    fetchOrders({
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString()
    });
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/full`);
      setSelectedOrder(response.data);
      setShowModal(true);
    } catch (err) {
      setError('Failed to load order details');
    }
  };

  const handleReprint = async (orderId, billNumber) => {
    try {
      setIsLoadingReceipt(true);
      setError('');
      const response = await orderService.getReceipt(orderId);
      setReceiptPreview(response.data);
      setReceiptBillNumber(billNumber);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load receipt');
    } finally {
      setIsLoadingReceipt(false);
    }
  };

  const handlePrintReceipt = async () => {
    try {
      await printReceiptContent(receiptPreview);
    } catch (error) {
      console.error('Receipt print error:', error);
      setError(`Failed to print receipt: ${error.message}`);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Cancel this unpaid order? This cannot be undone.')) {
      return;
    }

    try {
      setIsCancelling(true);
      setError('');
      await orderService.cancel(orderId);
      await fetchOrders();

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((current) => current ? { ...current, status: 'cancelled' } : current);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'var(--success-color)';
      case 'pending':
        return 'var(--warning-color)';
      case 'cancelled':
        return 'var(--danger-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="order-history-tab">
      {error && <div className="error-message">{error}</div>}

      <div className="order-filters">
        <div>
          <label>Date Range:</label>
          <DatePicker selected={parseDateStr(startDate)} onChange={(date) => setStartDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" placeholderText="Start Date" />
          <DatePicker selected={parseDateStr(endDate)} onChange={(date) => setEndDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" placeholderText="End Date" />
          <button onClick={handleFilterByDate} className="btn-primary">
            Filter by Date
          </button>
          <button onClick={() => fetchOrders()} className="btn-secondary" style={{marginLeft: '10px'}}>
            Clear Filters
          </button>
        </div>

        <div>
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="date-input"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state">No orders found</div>
      ) : (
        <div className="items-table">
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
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>#{order.bill_number}</strong>
                  </td>
                  <td>{formatDate(order.created_at)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge">{order.item_count || '-'}</span>
                  </td>
                  <td>{formatCurrency(order.subtotal)}</td>
                  <td>{formatCurrency(order.tax_amount)}</td>
                  <td>{formatCurrency(order.discount_amount)}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>
                    {formatCurrency(order.final_amount)}
                  </td>
                  <td>
                    <span
                      className="status"
                      style={{
                        background: getStatusColor(order.status),
                         color: 'var(--text-on-brand)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        className="btn-edit"
                        title="View order details"
                      >
                        Details
                      </button>
                      {(order.status === 'paid' || order.status === 'cancelled') && (
                        <button
                          onClick={() => handleReprint(order.id, order.bill_number)}
                          className="btn-secondary"
                          disabled={isLoadingReceipt}
                          title="Reprint bill"
                        >
                          {isLoadingReceipt ? 'Loading...' : 'Reprint'}
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="btn-delete"
                          disabled={isCancelling}
                          title="Cancel unpaid order"
                        >
                          {isCancelling ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onReprint={handleReprint}
          onCancel={handleCancelOrder}
          isCancelling={isCancelling}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {receiptPreview && (
        <ReceiptModal
          receipt={receiptPreview}
          billNumber={receiptBillNumber}
          onPrint={handlePrintReceipt}
          onClose={() => {
            setReceiptPreview('');
            setReceiptBillNumber('');
          }}
        />
      )}
    </div>
  );
};

export default OrderHistoryTab;
