import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import POSLayout from '../components/POSLayout';
import PaymentModal from '../components/PaymentModal';
import ReceiptModal from '../components/ReceiptModal';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { categoryService, menuItemService, orderService } from '../services/api';
import { useOrder } from '../hooks/useOrder';
import '../styles/POS.css';

const POSPage = () => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, removeItem, calculateTotals, clearCart } = useOrder();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [receipt, setReceipt] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }

    fetchInitialData();
  }, [navigate]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, itemsRes] = await Promise.all([
        categoryService.getAll(),
        menuItemService.getAll(),
      ]);

      setCategories(categoriesRes.data);
      setMenuItems(itemsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item, quantity) => {
    addItem(item, quantity);
  };

  const handleFinalizeOrder = async (discount = 0) => {
    if (items.length === 0) {
      alert('Add items to the order first');
      return;
    }

    try {
      setLoading(true);

      // Create order
      const orderRes = await orderService.create();
      const order = orderRes.data;
      setCurrentOrder(order);

      // Add items to order
      for (const item of items) {
        await orderService.addItem(order.id, {
          menu_item_id: item.id,
          quantity: item.quantity,
        });
      }

      // Finalize order
      await orderService.finalize(order.id, discount, 5);

      setShowPaymentModal(true);
    } catch (error) {
      alert('Error creating order: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async (payments) => {
    try {
      setLoading(true);

      // Process payment
      await orderService.pay(currentOrder.id, payments);

      // Get receipt
      const receiptRes = await orderService.getReceipt(currentOrder.id);
      setReceipt(receiptRes.data);

      setShowPaymentModal(false);
      setShowReceiptModal(true);
    } catch (error) {
      alert('Error processing payment: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = async () => {
    const htmlContent = `
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @media print {
              body { margin: 0; padding: 10px; }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word; 
                font-family: 'Courier New', Courier, monospace;
                font-size: 14px;
                line-height: 1.2;
              }
            }
          </style>
        </head>
        <body>
          <pre>${receipt}</pre>
        </body>
      </html>
    `;

    // 1. Desktop Mode (Native/Silent Print)
    if (window.posDesktop && window.posDesktop.printReceipt) {
      const printerName = localStorage.getItem('receiptPrinter') || 'browser-default';
      try {
        const result = await window.posDesktop.printReceipt(htmlContent, printerName);
        if (!result.success) {
          alert('Printing failed: ' + result.errorType);
        }
      } catch (e) {
        console.error('Desktop print error:', e);
        alert('Failed to print receipt via desktop module.');
      }
      return;
    }

    // 2. Fallback to standard browser print via hidden Iframe
    let iframe = document.getElementById('print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'print-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Small delay to ensure the content is loaded before printing
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 250);
  };

  const handleCloseReceipt = () => {
    setShowReceiptModal(false);
    clearCart();
    setCurrentOrder(null);
  };

  if (loading && categories.length === 0) {
    return <Loader />;
  }

  const totals = calculateTotals();

  return (
    <div className="pos-page">
      <Header user={user} onLogout={() => setUser(null)} />
      <POSLayout
        categories={categories}
        items={menuItems}
        onAddItem={handleAddItem}
        onFinalizeOrder={handleFinalizeOrder}
        totals={totals}
        cartItems={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
      />

      {showPaymentModal && (
        <PaymentModal
          total={totals.total}
          onPaymentComplete={handlePaymentComplete}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}

      {showReceiptModal && (
        <ReceiptModal
          receipt={receipt}
          billNumber={currentOrder?.bill_number}
          onClose={handleCloseReceipt}
          onPrint={handlePrintReceipt}
        />
      )}

      {loading && <Loader />}
    </div>
  );
};

export default POSPage;
