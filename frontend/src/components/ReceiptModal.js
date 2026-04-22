import React from 'react';
import '../styles/ReceiptModal.css';
import receiptLogo from '../assets/receipt-logo.svg';

const ReceiptModal = ({ receipt, billNumber, onClose, onPrint }) => {
  const lines = receipt.split('\n').filter((line, index, list) => !(line === '' && list[index - 1] === ''));

  const getLineClassName = (line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return 'receipt-line spacer';
    }
    if (/^=+$/.test(trimmed)) {
      return 'receipt-line separator';
    }
    if (trimmed === 'PAYMENT BREAKDOWN') {
      return 'receipt-line section-title';
    }
    if (trimmed.startsWith('TOTAL:')) {
      return 'receipt-line total';
    }
    if (/^(Subtotal:|Discount:|Tax \([^)]+\):)/.test(trimmed)) {
      return 'receipt-line summary';
    }
    if (/^(Bill No|Date|Time|Table|Customer|Phone|Order|Payment)\s*:/.test(trimmed)) {
      return 'receipt-line meta';
    }
    if (trimmed === 'Thank you! Please visit again.') {
      return 'receipt-line footer';
    }
    if (/^Item\s+Qty\s+Amount$/.test(trimmed)) {
      return 'receipt-line header-row';
    }
    return 'receipt-line';
  };

  const getLineDisplayText = (line) => {
    const trimmed = line.trim();
    if (trimmed === 'Thank you! Please visit again.') {
      return trimmed;
    }

    return line || '\u00A0';
  };

  return (
    <div className="modal-overlay">
      <div className="receipt-modal">
        <div className="receipt-header">
          <h2>Bill #{billNumber || '-'}</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="receipt-content">
          <div className="receipt-brand">
            <div className="receipt-logo-frame">
              <img src={receiptLogo} alt="Chewbie Cafe logo" className="receipt-logo" />
            </div>
            <div className="receipt-brand-copy">
              <strong>Chewbie Cafe</strong>
              <span>Receipt Preview</span>
            </div>
          </div>
          <div className="receipt-paper">
            {lines.map((line, index) => (
              <div key={`${index}-${line}`} className={getLineClassName(line)}>
                {getLineDisplayText(line)}
              </div>
            ))}
          </div>
        </div>

        <div className="receipt-actions">
          <button onClick={onPrint} className="print-btn">
            Print Receipt
          </button>
          <button onClick={onClose} className="close-receipt-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
