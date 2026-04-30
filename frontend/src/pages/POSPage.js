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
const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
  ONLINE: 'online',
};

const POSPage = () => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, removeItem, calculateTotals, clearCart, replaceItems, setOrder } = useOrder();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedOrderType, setSelectedOrderType] = useState(ORDER_TYPES.DINE_IN);
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
        orderService.getActiveOrders(),
        settingService.getAll(),
      ]);

      setCategories(categoriesRes.data);
      setMenuItems(itemsRes.data);
      setActiveOrders(activeTablesRes.data);
      setTableCount(Number(settingsRes.data.tableCount) || DEFAULT_TABLE_COUNT);
      setTableNames(settingsRes.data.tableNames || []);
      setTaxRate(Number(settingsRes.data.taxRate) || 0);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshActiveOrders = useCallback(async () => {
    const response = await orderService.getActiveOrders();
    setActiveOrders(response.data);
    return response.data;
  }, []);

  const waitForActivePersist = useCallback(async () => {
    while (persistInFlightRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
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

  const findActiveOrder = useCallback((orders, orderType, tableId) => {
    if (orderType === ORDER_TYPES.DINE_IN) {
      return orders.find((order) => order.order_type === ORDER_TYPES.DINE_IN && order.table_id === tableId) || null;
    }

    return orders.find((order) => order.order_type === orderType) || null;
  }, []);

  const persistActiveOrder = useCallback(async (orderType, tableId, cartItems, orderOverride) => {
    const isDineIn = orderType === ORDER_TYPES.DINE_IN;
    if ((isDineIn && !tableId) || hydrateInProgressRef.current) {
      return orderOverride || currentOrder;
    }

    if (persistInFlightRef.current) {
      pendingPersistRef.current = { orderType, tableId, cartItems, orderOverride };
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
          await refreshActiveOrders();
        }
        return null;
      }

      if (!order?.id) {
        const orderRes = await orderService.create({
          order_type: orderType,
          table_id: isDineIn ? tableId : null,
        });
        order = orderRes.data;
        setCurrentOrder(order);
        setOrder(order);
      }

      await orderService.syncItems(order.id, payload);
      await refreshActiveOrders();
      return order;
    } finally {
      persistInFlightRef.current = false;

      if (pendingPersistRef.current) {
        const pendingPersist = pendingPersistRef.current;
        pendingPersistRef.current = null;
        await persistActiveOrder(
          pendingPersist.orderType,
          pendingPersist.tableId,
          pendingPersist.cartItems,
          pendingPersist.orderOverride
        );
      }
    }
  }, [currentOrder, refreshActiveOrders, setOrder]);

  useEffect(() => {
    if (selectedOrderType === ORDER_TYPES.DINE_IN && selectedTableId && selectedTableId > tableCount) {
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
  }, [replaceItems, selectedOrderType, selectedTableId, setOrder, tableCount]);

  useEffect(() => {
    if ((selectedOrderType === ORDER_TYPES.DINE_IN && !selectedTableId) || hydrateInProgressRef.current) {
      return;
    }

    const syncCurrentOrder = async () => {
      try {
        await persistActiveOrder(selectedOrderType, selectedTableId, items, currentOrder);
      } catch (error) {
        console.error('Failed to persist order:', error);
      }
    };

    syncCurrentOrder();
  }, [currentOrder, items, persistActiveOrder, selectedOrderType, selectedTableId]);

  const handleSelectOrderSlot = useCallback(async (orderType, tableId = null) => {
    try {
      setLoading(true);

      if (selectedOrderType !== ORDER_TYPES.DINE_IN || selectedTableId) {
        await persistActiveOrder(selectedOrderType, selectedTableId, items, currentOrder);
      }

      hydrateInProgressRef.current = true;
      setSelectedOrderType(orderType);
      setSelectedTableId(orderType === ORDER_TYPES.DINE_IN ? tableId : null);
      setDiscount(0);
      setPaymentTotal(0);
      setShowPaymentModal(false);
      setShowReceiptModal(false);

      const activeOrder = findActiveOrder(activeOrders, orderType, tableId);

      if (!activeOrder) {
        replaceItems([]);
        setCurrentOrder(null);
        setOrder(null);
        return;
      }

      const itemsRes = await orderService.getItems(activeOrder.id);
      replaceItems(mapOrderItemsToCart(itemsRes.data));
      setCurrentOrder(activeOrder);
      setOrder(activeOrder);
    } catch (error) {
      alert('Error loading order: ' + (error.response?.data?.error || error.message));
    } finally {
      hydrateInProgressRef.current = false;
      setLoading(false);
    }
  }, [
    activeOrders,
    currentOrder,
    findActiveOrder,
    items,
    mapOrderItemsToCart,
    persistActiveOrder,
    replaceItems,
    selectedOrderType,
    selectedTableId,
    setOrder,
  ]);

  const handleSelectTable = useCallback((tableId) => {
    handleSelectOrderSlot(ORDER_TYPES.DINE_IN, tableId);
  }, [handleSelectOrderSlot]);

  const handleSelectOrderType = useCallback((orderType) => {
    handleSelectOrderSlot(orderType, null);
  }, [handleSelectOrderSlot]);

  const hasActiveOrderSlot = selectedOrderType !== ORDER_TYPES.DINE_IN || Boolean(selectedTableId);

  const handleAddItem = async (item, quantity) => {
    if (!hasActiveOrderSlot) {
      alert('Select a table or order type first');
      return;
    }

    addItem(item, quantity);
  };

  const handleFinalizeOrder = async (discountPercent = 0) => {
    if (!hasActiveOrderSlot) {
      alert('Select a table or order type first');
      return;
    }

    if (items.length === 0) {
      alert('Add items to the order first');
      return;
    }

    try {
      setLoading(true);
      await waitForActivePersist();

      const order = await persistActiveOrder(selectedOrderType, selectedTableId, items, currentOrder);
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

  const handleSendKot = async () => {
    if (!hasActiveOrderSlot) {
      alert('Select a table or order type first');
      return;
    }

    if (items.length === 0) {
      alert('Add items before sending KOT');
      return;
    }

    try {
      setLoading(true);
      await waitForActivePersist();

      const order = await persistActiveOrder(selectedOrderType, selectedTableId, items, currentOrder);
      if (!order?.id) {
        throw new Error('Unable to prepare the order for KOT');
      }

      const response = await orderService.createKot(order.id);
      await refreshActiveOrders();
      setCurrentOrder(order);
      setOrder(order);

      try {
        await printReceiptContent(response.data.kot, 'KOT');
      } catch (printError) {
        console.error('KOT print error:', printError);
        alert('KOT sent, but printing failed: ' + printError.message);
      }
    } catch (error) {
      alert('Error sending KOT: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async (paymentData) => {
    try {
      setLoading(true);

      const paymentRes = await orderService.pay(currentOrder.id, paymentData);
      const updatedOrderRes = await orderService.getById(currentOrder.id);
      setCurrentOrder(updatedOrderRes.data);
      setOrder(updatedOrderRes.data);

      const receiptRes = await orderService.getReceipt(currentOrder.id);
      setReceipt(receiptRes.data);
      await refreshActiveOrders();

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
    hydrateInProgressRef.current = true;
    setShowReceiptModal(false);
    setSelectedTableId(null);
    setSelectedOrderType(ORDER_TYPES.DINE_IN);
    clearCart();
    setReceipt('');
    setCurrentOrder(null);
    setOrder(null);
    setDiscount(0);
    setPaymentTotal(0);
    window.setTimeout(() => {
      hydrateInProgressRef.current = false;
    }, 0);
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
        onSendKot={handleSendKot}
        totals={totals}
        discount={discount}
        taxRate={taxRate}
        onDiscountChange={setDiscount}
        cartItems={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        selectedTableId={selectedTableId}
        selectedOrderType={selectedOrderType}
        tableNumbers={tableNumbers}
        tableNames={tableNames}
        activeOrders={activeOrders}
        onSelectTable={handleSelectTable}
        onSelectOrderType={handleSelectOrderType}
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
