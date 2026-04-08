import React, { useState } from 'react';
import '../styles/PaymentModal.css';

const PaymentModal = ({ total, onPaymentComplete, onCancel }) => {
  const [payments, setPayments] = useState([
    { method: 'Cash', amount: total, reference_id: '' },
  ]);

  const handleAddPayment = () => {
    if (payments[payments.length - 1].amount > 0) {
      setPayments([...payments, { method: 'Cash', amount: 0, reference_id: '' }]);
    }
  };

  const handleUpdatePayment = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const handleRemovePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const change = totalPaid - total;

  const handlePaymentComplete = () => {
    if (totalPaid >= total) {
      onPaymentComplete(payments);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <h2>Payment Details</h2>

        <div className="payment-summary">
          <div className="summary-item">
            <span>Bill Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Total Paid:</span>
            <span className={totalPaid >= total ? 'paid-ok' : 'paid-pending'}>
              ₹{totalPaid.toFixed(2)}
            </span>
          </div>
          {change > 0 && (
            <div className="summary-item">
              <span>Change:</span>
              <span>₹{change.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="payments-list">
          {payments.map((payment, index) => (
            <div key={index} className="payment-entry">
              <select
                value={payment.method}
                onChange={(e) => handleUpdatePayment(index, 'method', e.target.value)}
                className="payment-method"
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
              </select>

              <input
                type="number"
                value={payment.amount}
                onChange={(e) => handleUpdatePayment(index, 'amount', Number(e.target.value))}
                placeholder="Amount"
                className="payment-amount"
              />

              {payment.method !== 'Cash' && (
                <input
                  type="text"
                  value={payment.reference_id}
                  onChange={(e) => handleUpdatePayment(index, 'reference_id', e.target.value)}
                  placeholder="Ref ID"
                  className="payment-reference"
                />
              )}

              {payments.length > 1 && (
                <button onClick={() => handleRemovePayment(index)} className="remove-payment-btn">
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {totalPaid >= total && payments.length < 3 && (
          <button onClick={handleAddPayment} className="add-payment-btn">
            Add Another Payment
          </button>
        )}

        <div className="payment-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={handlePaymentComplete}
            disabled={totalPaid < total}
            className="complete-payment-btn"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
