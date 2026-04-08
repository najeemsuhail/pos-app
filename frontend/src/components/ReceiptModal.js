import React from 'react';
import '../styles/ReceiptModal.css';

const ReceiptModal = ({ receipt, billNumber, onClose, onPrint }) => {
  return (
    <div className="modal-overlay">
      <div className="receipt-modal">
        <div className="receipt-header">
          <h2>Bill #{billNumber}</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <pre className="receipt-content">{receipt}</pre>

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
