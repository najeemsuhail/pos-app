import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReceiptModal from '../ReceiptModal';
import OrderDetailsModal from './OrderDetailsModal';
import SettlementModal from './SettlementModal';
import api, { orderService } from '../../services/api';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
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
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [receiptPreview, setReceiptPreview] = useState('');
  const [receiptBillNumber, setReceiptBillNumber] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [isLoadingReceipt, setIsLoadingReceipt] = useState(false);
  const [settlingPaymentId, setSettlingPaymentId] = useState(null);
  const [paymentToSettle, setPaymentToSettle] = useState(null);

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
      endDate: new Date(endDate).toISOString(),
    });
  };

  const showPendingSettlements = () => {
    setPaymentStatusFilter('pending_settlement');
  };

  const clearAllFilters = () => {
    setStartDate('');
    setEndDate('');
    setStatusFilter('all');
    setPaymentStatusFilter('all');
    fetchOrders();
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
    } catch (printError) {
      console.error('Receipt print error:', printError);
      setError(`Failed to print receipt: ${printError.message}`);
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
        setSelectedOrder((current) => (current ? { ...current, status: 'cancelled' } : current));
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };

  const refreshSelectedOrder = async (orderId) => {
    const response = await api.get(`/orders/${orderId}/full`);
    setSelectedOrder(response.data);
    return response.data;
  };

  const handleOpenSettlementModal = (payment) => {
    setError('');
    setPaymentToSettle(payment);
  };

  const handleSubmitSettlement = async ({ settlementAmount, referenceId }) => {
    if (!selectedOrder || !paymentToSettle) {
      return;
    }

    const existingSettledAmount = Number(paymentToSettle.settled_amount || 0);
    const nextSettledAmount = existingSettledAmount + Number(settlementAmount);

    try {
      setSettlingPaymentId(paymentToSettle.id);
      setError('');
      await orderService.settlePayment(selectedOrder.id, paymentToSettle.id, {
        settled_amount: nextSettledAmount,
        reference_id: referenceId,
      });
      await fetchOrders();
      await refreshSelectedOrder(selectedOrder.id);
      setPaymentToSettle(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to settle payment');
    } finally {
      setSettlingPaymentId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }

    if (paymentStatusFilter !== 'all' && (order.payment_status || 'unpaid') !== paymentStatusFilter) {
      return false;
    }

    return true;
  });

  const pendingSettlementOrders = filteredOrders.filter(
    (order) => (order.payment_status || 'unpaid') === 'pending_settlement'
  );
  const pendingSettlementCount = pendingSettlementOrders.length;
  const pendingSettlementAmount = pendingSettlementOrders.reduce(
    (sum, order) => sum + Number(order.final_amount || 0),
    0
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'var(--success-color)';
      case 'pending':
        return 'var(--warning-color)';
      case 'cancelled':
        return 'var(--danger-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const formatCurrency = (amount) => `Rs. ${parseFloat(amount).toFixed(2)}`;

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return 'var(--success-color)';
      case 'pending_settlement':
        return 'var(--warning-color)';
      case 'partial':
        return '#f97316';
      case 'unpaid':
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div className="order-history-tab">
      {error && <div className="error-message">{error}</div>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            cursor: 'pointer',
          }}
          onClick={showPendingSettlements}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              showPendingSettlements();
            }
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#b45309', marginBottom: '4px' }}>
            Pending Settlements
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e' }}>
            {pendingSettlementCount}
          </div>
        </div>

        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.22)',
            cursor: 'pointer',
          }}
          onClick={showPendingSettlements}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              showPendingSettlements();
            }
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#b45309', marginBottom: '4px' }}>
            Pending Amount
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e' }}>
            {formatCurrency(pendingSettlementAmount)}
          </div>
        </div>
      </div>

      <div className="order-filters">
        <div>
          <label>Date Range:</label>
          <DatePicker
            selected={parseDateStr(startDate)}
            onChange={(date) => setStartDate(formatDateStr(date))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={parseDateStr(endDate)}
            onChange={(date) => setEndDate(formatDateStr(date))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
            placeholderText="End Date"
          />
          <button onClick={handleFilterByDate} className="btn-primary">
            Filter by Date
          </button>
          <button onClick={clearAllFilters} className="btn-secondary" style={{ marginLeft: '10px' }}>
            Clear Filters
          </button>
        </div>

        <div>
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="date-input"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label>Payment:</label>
          <select
            value={paymentStatusFilter}
            onChange={(event) => setPaymentStatusFilter(event.target.value)}
            className="date-input"
          >
            <option value="all">All Payments</option>
            <option value="pending_settlement">Pending Settlement</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
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
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  style={
                    order.payment_status === 'pending_settlement'
                      ? { background: 'rgba(245, 158, 11, 0.08)' }
                      : undefined
                  }
                >
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
                        textTransform: 'capitalize',
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status"
                      style={{
                        background: getPaymentStatusColor(order.payment_status || 'unpaid'),
                        color: 'var(--text-on-brand)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {(order.payment_status || 'unpaid').replace('_', ' ')}
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
                      {['completed', 'paid', 'cancelled'].includes(order.status) && (
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
          onSettlePayment={handleOpenSettlementModal}
          isCancelling={isCancelling}
          settlingPaymentId={settlingPaymentId}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
            setPaymentToSettle(null);
          }}
        />
      )}

      {paymentToSettle && (
        <SettlementModal
          payment={paymentToSettle}
          isSubmitting={settlingPaymentId === paymentToSettle.id}
          onClose={() => {
            if (!settlingPaymentId) {
              setPaymentToSettle(null);
            }
          }}
          onSubmit={handleSubmitSettlement}
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
