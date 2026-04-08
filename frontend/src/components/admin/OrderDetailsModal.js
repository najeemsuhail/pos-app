import React from 'react';

const OrderDetailsModal = ({ order, onClose }) => {
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Order Summary */}
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
                  display: 'inline-block'
                }}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Order Items */}
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
                      <td style={{ textAlign: 'right' }}>
                        {formatCurrency(item.price)}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Amount Breakdown */}
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

          {/* Payments */}
          {order.payments && order.payments.length > 0 && (
            <div className="order-section">
              <h3>Payments</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {order.payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.payment_method}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {formatCurrency(payment.amount)}
                      </td>
                      <td>{payment.reference_id || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
