import React, { useEffect, useRef } from 'react';
import '../styles/ReceiptModal.css';

const ReceiptModal = ({ receipt, billNumber, onClose, onPrint }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!modalRef.current || !modalRef.current.contains(event.target)) {
        return;
      }

      event.stopPropagation();

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose]);
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
      <div className="receipt-modal" ref={modalRef}>
        <div className="receipt-header">
          <h2>Bill #{billNumber || '-'}</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="receipt-content compact">
          <div className="receipt-paper compact">
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
