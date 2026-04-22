import React, { useEffect, useMemo, useState } from 'react';

const formatCurrency = (amount) => `Rs. ${parseFloat(amount || 0).toFixed(2)}`;

const SettlementModal = ({ payment, isSubmitting = false, onClose, onSubmit }) => {
  const paymentAmount = useMemo(() => Number(payment?.amount || 0), [payment]);
  const settledAmount = useMemo(() => Number(payment?.settled_amount || 0), [payment]);
  const remainingAmount = useMemo(
    () => Math.max(paymentAmount - settledAmount, 0),
    [paymentAmount, settledAmount]
  );

  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!payment) {
      setAmount('');
      setReference('');
      setError('');
      return;
    }

    setAmount(remainingAmount > 0 ? remainingAmount.toFixed(2) : '');
    setReference(payment.reference_id || '');
    setError('');
  }, [payment, remainingAmount]);

  if (!payment) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const settlementAmount = Number(amount);
    if (!Number.isFinite(settlementAmount) || settlementAmount <= 0) {
      setError('Enter a valid settlement amount');
      return;
    }

    if (settlementAmount > remainingAmount) {
      setError('Settlement amount cannot exceed the remaining amount');
      return;
    }

    setError('');
    await onSubmit({
      settlementAmount,
      referenceId: reference.trim() || null,
    });
  };

  return (
    <div className="modal-overlay" onClick={isSubmitting ? undefined : onClose}>
      <div
        className="modal-content settlement-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Settle Payment</h2>
          <button onClick={onClose} className="modal-close" disabled={isSubmitting}>
            x
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="settlement-payment-summary">
              <div className="summary-row">
                <label>Method:</label>
                <span>{payment.method}</span>
              </div>
              <div className="summary-row">
                <label>Source:</label>
                <span>{payment.source || 'Direct'}</span>
              </div>
              <div className="summary-row">
                <label>Total Amount:</label>
                <span>{formatCurrency(paymentAmount)}</span>
              </div>
              <div className="summary-row">
                <label>Already Settled:</label>
                <span>{formatCurrency(settledAmount)}</span>
              </div>
              <div className="summary-row">
                <label>Remaining:</label>
                <span>{formatCurrency(remainingAmount)}</span>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="settlement-form-grid">
              <div className="form-group">
                <label htmlFor="settlement-amount">Amount Received Now</label>
                <input
                  id="settlement-amount"
                  type="number"
                  min="0.01"
                  max={remainingAmount}
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Enter settlement amount"
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="settlement-reference">Reference</label>
                <input
                  id="settlement-reference"
                  type="text"
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="UTR, bank ref, cheque no."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-edit" disabled={isSubmitting}>
              {isSubmitting ? 'Settling...' : 'Save Settlement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettlementModal;
