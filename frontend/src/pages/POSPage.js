import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import POSLayout from '../components/POSLayout';
import PaymentModal from '../components/PaymentModal';
import ReceiptModal from '../components/ReceiptModal';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { categoryService, menuItemService, orderService, settingService } from '../services/api';
import { useOrder } from '../hooks/useOrder';
import { printReceiptContent } from '../utils/receiptPrint';
import '../styles/POS.css';

const DEFAULT_TABLE_COUNT = 12;

const POSPage = () => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, removeItem, calculateTotals, clearCart, replaceItems, setOrder } = useOrder();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeTableOrders, setActiveTableOrders] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [receipt, setReceipt] = useState('');
  const [tableNames, setTableNames] = useState([]);
  const [tableCount, setTableCount] = useState(DEFAULT_TABLE_COUNT);
  const [taxRate, setTaxRate] = useState(5);
  const [user, setUser] = useState(null);
  const hydrateInProgressRef = useRef(false);
  const persistInFlightRef = useRef(false);
  const pendingPersistRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchInitialData();
  }, [navigate]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, itemsRes, activeTablesRes, settingsRes] = await Promise.all([
        categoryService.getAll(),
        menuItemService.getAll(),
        orderService.getActiveTables(),
        settingService.getAll(),
      ]);

      setCategories(categoriesRes.data);
      setMenuItems(itemsRes.data);
      setActiveTableOrders(activeTablesRes.data);
      setTableCount(Number(settingsRes.data.tableCount) || DEFAULT_TABLE_COUNT);
      setTableNames(settingsRes.data.tableNames || []);
      setTaxRate(Number(settingsRes.data.taxRate) || 0);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshActiveTables = useCallback(async () => {
    const response = await orderService.getActiveTables();
    setActiveTableOrders(response.data);
    return response.data;
  }, []);

  const mapOrderItemsToCart = useCallback((orderItems) => {
    return orderItems.map((item) => ({
      id: item.menu_item_id,
      menu_item_id: item.menu_item_id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));
  }, []);

  const persistTableOrder = useCallback(async (tableId, cartItems, orderOverride) => {
    if (!tableId || hydrateInProgressRef.current) {
      return orderOverride || currentOrder;
    }

    if (persistInFlightRef.current) {
      pendingPersistRef.current = { tableId, cartItems, orderOverride };
      return orderOverride || currentOrder;
    }

    persistInFlightRef.current = true;

    try {
      let order = orderOverride || currentOrder;
      const payload = cartItems.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
      }));

      if (payload.length === 0) {
        if (order?.id) {
          await orderService.cancel(order.id);
          setCurrentOrder(null);
          setOrder(null);
          await refreshActiveTables();
        }
        return null;
      }

      if (!order?.id) {
        const orderRes = await orderService.create({ table_id: tableId });
        order = orderRes.data;
        setCurrentOrder(order);
        setOrder(order);
      }

      await orderService.syncItems(order.id, payload);
      await refreshActiveTables();
      return order;
    } finally {
      persistInFlightRef.current = false;

      if (pendingPersistRef.current) {
        const pendingPersist = pendingPersistRef.current;
        pendingPersistRef.current = null;
        await persistTableOrder(pendingPersist.tableId, pendingPersist.cartItems, pendingPersist.orderOverride);
      }
    }
  }, [currentOrder, refreshActiveTables, setOrder]);

  useEffect(() => {
    if (selectedTableId && selectedTableId > tableCount) {
      hydrateInProgressRef.current = true;
      setSelectedTableId(null);
      replaceItems([]);
      setCurrentOrder(null);
      setOrder(null);
      setDiscount(0);
      setPaymentTotal(0);
      setShowPaymentModal(false);
      setShowReceiptModal(false);
      hydrateInProgressRef.current = false;
    }
  }, [replaceItems, selectedTableId, setOrder, tableCount]);

  useEffect(() => {
    if (!selectedTableId || hydrateInProgressRef.current) {
      return;
    }

    const syncCurrentTable = async () => {
      try {
        await persistTableOrder(selectedTableId, items, currentOrder);
      } catch (error) {
        console.error('Failed to persist table order:', error);
      }
    };

    syncCurrentTable();
  }, [currentOrder, items, persistTableOrder, selectedTableId]);

  const handleSelectTable = useCallback(async (tableId) => {
    try {
      setLoading(true);

      if (selectedTableId) {
        await persistTableOrder(selectedTableId, items, currentOrder);
      }

      hydrateInProgressRef.current = true;
      setSelectedTableId(tableId);
      setDiscount(0);
      setPaymentTotal(0);
      setShowPaymentModal(false);
      setShowReceiptModal(false);

      const tableOrder = activeTableOrders.find((order) => order.table_id === tableId) || null;

      if (!tableOrder) {
        replaceItems([]);
        setCurrentOrder(null);
        setOrder(null);
        return;
      }

      const itemsRes = await orderService.getItems(tableOrder.id);
      replaceItems(mapOrderItemsToCart(itemsRes.data));
      setCurrentOrder(tableOrder);
      setOrder(tableOrder);
    } catch (error) {
      alert('Error loading table: ' + (error.response?.data?.error || error.message));
    } finally {
      hydrateInProgressRef.current = false;
      setLoading(false);
    }
  }, [activeTableOrders, currentOrder, items, mapOrderItemsToCart, persistTableOrder, replaceItems, selectedTableId, setOrder]);

  const handleAddItem = async (item, quantity) => {
    if (!selectedTableId) {
      alert('Select a table first');
      return;
    }

    addItem(item, quantity);
  };

  const handleFinalizeOrder = async (discountPercent = 0) => {
    if (!selectedTableId) {
      alert('Select a table first');
      return;
    }

    if (items.length === 0) {
      alert('Add items to the order first');
      return;
    }

    try {
      setLoading(true);

      const order = await persistTableOrder(selectedTableId, items, currentOrder);
      if (!order?.id) {
        throw new Error('Unable to prepare the order for checkout');
      }

      const finalizedRes = await orderService.finalize(order.id, {
        discount_percent: discountPercent,
        tax_rate: taxRate,
      });

      setCurrentOrder(finalizedRes.data);
      setOrder(finalizedRes.data);
      setPaymentTotal(Number(finalizedRes.data.final_amount || 0));
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

      const paymentRes = await orderService.pay(currentOrder.id, payments);
      const updatedOrderRes = await orderService.getById(currentOrder.id);
      setCurrentOrder(updatedOrderRes.data);
      setOrder(updatedOrderRes.data);

      const receiptRes = await orderService.getReceipt(currentOrder.id);
      setReceipt(receiptRes.data);
      await refreshActiveTables();

      setShowPaymentModal(false);
      setShowReceiptModal(true);

      if (paymentRes.data?.payment_status === 'pending_settlement') {
        window.alert('Order completed. Payment is pending settlement and will be collected later.');
      }
    } catch (error) {
      alert('Error processing payment: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = async () => {
    try {
      await printReceiptContent(receipt);
    } catch (error) {
      console.error('Receipt print error:', error);
      alert(`Failed to print receipt: ${error.message}`);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceiptModal(false);
    clearCart();
    setCurrentOrder(null);
    setOrder(null);
    setDiscount(0);
    setPaymentTotal(0);
  };

  const baseTotals = calculateTotals();
  const totals = useMemo(() => {
    const subtotal = Number(baseTotals.subtotal || 0);
    const discountAmount = Math.round(subtotal * Number(discount || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const tax = Math.round(taxableAmount * Number(taxRate || 0)) / 100;
    const total = taxableAmount + tax;

    return {
      subtotal,
      discount: discountAmount,
      tax,
      total,
    };
  }, [baseTotals, discount, taxRate]);

  const tableNumbers = useMemo(() => Array.from({ length: tableCount }, (_, index) => index + 1), [tableCount]);

  if (loading && categories.length === 0) {
    return <Loader />;
  }

  return (
    <div className="pos-page">
      <Header user={user} onLogout={() => setUser(null)} />
      <POSLayout
        categories={categories}
        items={menuItems}
        onAddItem={handleAddItem}
        onFinalizeOrder={handleFinalizeOrder}
        totals={totals}
        discount={discount}
        taxRate={taxRate}
        onDiscountChange={setDiscount}
        cartItems={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        selectedTableId={selectedTableId}
        tableNumbers={tableNumbers}
        tableNames={tableNames}
        activeTableOrders={activeTableOrders}
        onSelectTable={handleSelectTable}
        currentOrder={currentOrder}
      />

      {showPaymentModal && (
        <PaymentModal
          total={paymentTotal}
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
