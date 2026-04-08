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

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<pre style="font-family: monospace;">' + receipt + '</pre>');
    printWindow.document.close();
    printWindow.print();
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
