import React from 'react';

const OrderDetailsModal = ({
  order,
  onClose,
  onReprint,
  onCancel,
  onSettlePayment,
  isCancelling = false,
  settlingPaymentId = null,
}) => {
  const formatCurrency = (amount) => `Rs. ${parseFloat(amount || 0).toFixed(2)}`;

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const formatOrderType = (value) => {
    const labels = {
      dine_in: 'Dine In',
      takeaway: 'Takeaway',
      delivery: 'Delivery',
      pickup: 'Pickup',
      online: 'Online',
    };

    return labels[value || 'dine_in'] || 'Dine In';
  };

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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'var(--success-color)';
      case 'pending_settlement':
      case 'partial':
        return 'var(--warning-color)';
      case 'unpaid':
        return 'var(--text-secondary)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const canCancel = order.status === 'pending';
  const canReprint = ['completed', 'paid', 'cancelled'].includes(order.status);
  const canSettlePayment = (payment) => ['pending', 'partial'].includes(payment.status);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button onClick={onClose} className="modal-close">
            x
          </button>
        </div>

        <div className="modal-body">
          <div className="order-summary">
            <div className="summary-row">
              <label>Bill Number:</label>
              <span>#{order.bill_number}</span>
            </div>
            <div className="summary-row">
              <label>Date & Time:</label>
              <span>{formatDate(order.created_at)}</span>
            </div>
            <div className="summary-row">
              <label>Order Type:</label>
              <span>{formatOrderType(order.order_type)}</span>
            </div>
            <div className="summary-row">
              <label>Status:</label>
              <span
                style={{
                  background: getStatusColor(order.status),
                  color: 'var(--text-on-brand)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  display: 'inline-block',
                }}
              >
                {order.status}
              </span>
            </div>
            <div className="summary-row">
              <label>Payment Status:</label>
              <span
                style={{
                  background: getPaymentStatusColor(order.payment_status),
                  color: 'var(--text-on-brand)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  display: 'inline-block',
                }}
              >
                {order.payment_status || 'unpaid'}
              </span>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="order-section">
              <h3>Items</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th style={{ textAlign: 'center' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Price</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(item.price)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="order-section amount-breakdown">
            <div className="breakdown-row">
              <label>Subtotal:</label>
              <value>{formatCurrency(order.subtotal)}</value>
            </div>
            {parseFloat(order.discount_amount) > 0 && (
              <div className="breakdown-row">
                <label style={{ color: 'var(--danger-color)' }}>Discount:</label>
                <value style={{ color: 'var(--danger-color)' }}>
                  -{formatCurrency(order.discount_amount)}
                </value>
              </div>
            )}
            {parseFloat(order.tax_amount) > 0 && (
              <div className="breakdown-row">
                <label>Tax:</label>
                <value>{formatCurrency(order.tax_amount)}</value>
              </div>
            )}
            <div className="breakdown-row total">
              <label>Final Total:</label>
              <value>{formatCurrency(order.final_amount)}</value>
            </div>
          </div>

          {order.payments && order.payments.length > 0 && (
            <div className="order-section">
              <h3>Payments</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th style={{ textAlign: 'right' }}>Settled</th>
                    <th>Reference</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order.payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.method}</td>
                      <td>{payment.source || 'Direct'}</td>
                      <td>{payment.status || 'pending'}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(payment.amount)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {formatCurrency(payment.settled_amount || 0)}
                      </td>
                      <td>{payment.reference_id || '-'}</td>
                      <td>
                        {canSettlePayment(payment) ? (
                          <button
                            onClick={() => onSettlePayment(payment)}
                            className="btn-edit"
                            disabled={settlingPaymentId === payment.id}
                          >
                            {settlingPaymentId === payment.id ? 'Settling...' : 'Settle'}
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                            Settled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {canReprint && (
            <button onClick={() => onReprint(order.id, order.bill_number)} className="btn-edit">
              Reprint Bill
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => onCancel(order.id)}
              className="btn-delete"
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
