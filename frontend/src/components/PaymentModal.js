import React, { useMemo, useState } from 'react';
import '../styles/PaymentModal.css';

const PAYMENT_OPTIONS = [
  { label: 'Cash', method: 'Cash', source: 'Direct', status: 'settled', needsReference: false },
  { label: 'UPI', method: 'UPI', source: 'Direct', status: 'settled', needsReference: true },
  { label: 'Bank', method: 'Bank', source: 'Direct', status: 'settled', needsReference: true },
  { label: 'Credit', method: 'Credit', source: 'Direct', status: 'pending', needsReference: true },
  { label: 'Swiggy', method: 'Credit', source: 'Swiggy', status: 'pending', needsReference: true, needsExpense: true },
  { label: 'Zomato', method: 'Credit', source: 'Zomato', status: 'pending', needsReference: true, needsExpense: true },
];

function createPaymentEntry(total = 0) {
  const option = PAYMENT_OPTIONS[0];
  return {
    payment_type: option.label,
    method: option.method,
    source: option.source,
    status: option.status,
    amount: total,
    reference_id: '',
    aggregator_expense_amount: '',
  };
}

const PaymentModal = ({ total, onPaymentComplete, onCancel }) => {
  const [payments, setPayments] = useState([createPaymentEntry(total)]);

  const totalRecorded = payments.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
  const change = totalRecorded - total;
  const hasDeferredSettlement = payments.some((payment) => payment.status !== 'settled');

  const settlementSummary = useMemo(() => {
    if (hasDeferredSettlement) {
      return 'Some payments will settle later';
    }

    return 'All payments settle immediately';
  }, [hasDeferredSettlement]);

  const handleAddPayment = () => {
    if (payments.length >= 3) {
      return;
    }

    setPayments([...payments, createPaymentEntry(0)]);
  };

  const handleUpdatePayment = (index, field, value) => {
    const nextPayments = payments.map((payment, paymentIndex) => {
      if (paymentIndex !== index) {
        return payment;
      }

      if (field === 'payment_type') {
        const option = PAYMENT_OPTIONS.find((item) => item.label === value) || PAYMENT_OPTIONS[0];
        return {
          ...payment,
          payment_type: option.label,
          method: option.method,
          source: option.source,
          status: option.status,
          reference_id: payment.reference_id,
          aggregator_expense_amount: option.needsExpense ? payment.aggregator_expense_amount : '',
        };
      }

      return {
        ...payment,
        [field]: value,
      };
    });

    setPayments(nextPayments);
  };

  const handleRemovePayment = (index) => {
    setPayments(payments.filter((_, paymentIndex) => paymentIndex !== index));
  };

  const handlePaymentComplete = () => {
    if (totalRecorded < total) {
      return;
    }

    onPaymentComplete(
      payments.map((payment) => ({
        method: payment.method,
        source: payment.source,
        status: payment.status,
        amount: Number(payment.amount) || 0,
        reference_id: payment.reference_id?.trim() || '',
        aggregator_expense_amount: Number(payment.aggregator_expense_amount) || 0,
      }))
    );
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <h2>Payment Details</h2>

        <div className="payment-summary">
          <div className="summary-item">
            <span>Bill Amount:</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Recorded Amount:</span>
            <span className={totalRecorded >= total ? 'paid-ok' : 'paid-pending'}>
              Rs. {totalRecorded.toFixed(2)}
            </span>
          </div>
          {change > 0 && (
            <div className="summary-item">
              <span>Change:</span>
              <span>Rs. {change.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-item settlement-summary">
            <span>Settlement:</span>
            <span>{settlementSummary}</span>
          </div>
        </div>

        <div className="payments-list">
          {payments.map((payment, index) => {
            const option = PAYMENT_OPTIONS.find((item) => item.label === payment.payment_type) || PAYMENT_OPTIONS[0];

            return (
              <div key={index} className="payment-entry">
                <select
                  value={payment.payment_type}
                  onChange={(event) => handleUpdatePayment(index, 'payment_type', event.target.value)}
                  className="payment-method"
                >
                  {PAYMENT_OPTIONS.map((paymentOption) => (
                    <option key={paymentOption.label} value={paymentOption.label}>
                      {paymentOption.label}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={payment.amount}
                  onChange={(event) => handleUpdatePayment(index, 'amount', Number(event.target.value))}
                  placeholder="Amount"
                  className="payment-amount"
                />

                {option.needsReference ? (
                  <>
                    <input
                      type="text"
                      value={payment.reference_id}
                      onChange={(event) => handleUpdatePayment(index, 'reference_id', event.target.value)}
                      placeholder={payment.status === 'settled' ? 'Ref ID' : 'Order / settlement ref'}
                      className="payment-reference"
                    />
                    {option.needsExpense && (
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={payment.aggregator_expense_amount}
                        onChange={(event) => handleUpdatePayment(index, 'aggregator_expense_amount', event.target.value)}
                        placeholder={`${payment.source} expense`}
                        className="payment-reference"
                      />
                    )}
                  </>
                ) : (
                  <div className="payment-meta-badge">Settles now</div>
                )}

                {payments.length > 1 && (
                  <button onClick={() => handleRemovePayment(index)} className="remove-payment-btn">
                    x
                  </button>
                )}

                <div className={`payment-status-chip ${payment.status === 'settled' ? 'settled' : 'pending'}`}>
                  {payment.source === 'Direct' ? payment.status : `${payment.source} ${payment.status}`}
                </div>
              </div>
            );
          })}
        </div>

        {payments.length < 3 && (
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
            disabled={totalRecorded < total}
            className="complete-payment-btn"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
