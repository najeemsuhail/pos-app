import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import POSLayout from '../components/POSLayout';
import PaymentModal from '../components/PaymentModal';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { categoryService, menuItemService, orderService, settingService } from '../services/api';
import { useOrder } from '../hooks/useOrder';
import { printReceiptContent } from '../utils/receiptPrint';
import { calculateTax, roundCurrency, splitTaxAmount } from '../utils/helpers';
import '../styles/POS.css';

const DEFAULT_TABLE_COUNT = 12;
const DEFAULT_SHOP_OPENING_TIME = '09:00';
const DEFAULT_SHOP_CLOSING_TIME = '22:00';
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
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [selectedOrderType, setSelectedOrderType] = useState(ORDER_TYPES.DINE_IN);
  const [discount, setDiscount] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [alertDialog, setAlertDialog] = useState(null);
  const [tableNames, setTableNames] = useState([]);
  const [tableCount, setTableCount] = useState(DEFAULT_TABLE_COUNT);
  const [taxRate, setTaxRate] = useState(5);
  const [shopHours, setShopHours] = useState({
    openingTime: DEFAULT_SHOP_OPENING_TIME,
    closingTime: DEFAULT_SHOP_CLOSING_TIME,
  });
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
      setShopHours({
        openingTime: settingsRes.data.shopOpeningTime || DEFAULT_SHOP_OPENING_TIME,
        closingTime: settingsRes.data.shopClosingTime || DEFAULT_SHOP_CLOSING_TIME,
      });
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

  const showAlert = useCallback((message, title = 'Notice') => {
    setAlertDialog({ message, title });
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
      showAlert('Error loading order: ' + (error.response?.data?.error || error.message), 'Order Error');
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
    showAlert,
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
      showAlert('Select a table or order type first');
      return;
    }

    addItem(item, quantity);
  };

  const handleFinalizeOrder = async (discountPercent = 0) => {
    if (!hasActiveOrderSlot) {
      showAlert('Select a table or order type first');
      return;
    }

    if (items.length === 0) {
      showAlert('Add items to the order first');
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
      showAlert('Error creating order: ' + (error.response?.data?.error || error.message), 'Checkout Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendKot = async () => {
    if (!hasActiveOrderSlot) {
      showAlert('Select a table or order type first');
      return;
    }

    if (items.length === 0) {
      showAlert('Add items before sending KOT');
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
      setLoading(false);

      printReceiptContent(response.data.kot, 'KOT').catch((printError) => {
        console.error('KOT print error:', printError);
        showAlert('KOT sent, but printing failed: ' + printError.message, 'Print Error');
      });
    } catch (error) {
      showAlert('Error sending KOT: ' + (error.response?.data?.error || error.message), 'KOT Error');
    } finally {
      setLoading(false);
    }
  };

  const resetCurrentOrderSlot = useCallback(() => {
    hydrateInProgressRef.current = true;
    setSelectedTableId(null);
    setSelectedOrderType(ORDER_TYPES.DINE_IN);
    clearCart();
    setCurrentOrder(null);
    setOrder(null);
    setDiscount(0);
    setPaymentTotal(0);
    setShowPaymentModal(false);
    window.setTimeout(() => {
      hydrateInProgressRef.current = false;
    }, 0);
  }, [clearCart, setOrder]);

  const handlePaymentComplete = async (paymentData) => {
    try {
      setLoading(true);

      const paymentRes = await orderService.pay(currentOrder.id, paymentData);
      const updatedOrderRes = await orderService.getById(currentOrder.id);
      setCurrentOrder(updatedOrderRes.data);
      setOrder(updatedOrderRes.data);

      const receiptRes = await orderService.getReceipt(currentOrder.id);
      await refreshActiveOrders();

      setShowPaymentModal(false);
      resetCurrentOrderSlot();
      setLoading(false);

      if (paymentRes.data?.payment_status === 'pending_settlement') {
        showAlert('Order completed. Payment is pending settlement and will be collected later.', 'Payment Pending');
      }

      printReceiptContent(receiptRes.data).catch((printError) => {
        console.error('Receipt print error:', printError);
        showAlert(`Payment completed, but receipt printing failed: ${printError.message}`, 'Print Error');
      });
    } catch (error) {
      showAlert('Error processing payment: ' + (error.response?.data?.error || error.message), 'Payment Error');
    } finally {
      setLoading(false);
    }
  };

  const baseTotals = calculateTotals();
  const totals = useMemo(() => {
    const subtotal = Number(baseTotals.subtotal || 0);
    const discountAmount = roundCurrency(subtotal * Number(discount || 0) / 100);
    const taxableAmount = roundCurrency(subtotal - discountAmount);
    const normalizedTaxRate = Number(taxRate || 0);
    const tax = calculateTax(taxableAmount, normalizedTaxRate);
    const { cgst, sgst } = splitTaxAmount(tax);
    const total = roundCurrency(taxableAmount + tax);

    return {
      subtotal,
      discount: discountAmount,
      taxableAmount,
      tax,
      cgst,
      sgst,
      splitTaxRate: Number.parseFloat((normalizedTaxRate / 2).toFixed(2)),
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
        onDiscountChange={setDiscount}
        cartItems={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        selectedTableId={selectedTableId}
        selectedOrderType={selectedOrderType}
        tableNumbers={tableNumbers}
        tableNames={tableNames}
        shopHours={shopHours}
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

      {alertDialog && (
        <div className="app-alert-overlay" onClick={() => setAlertDialog(null)}>
          <div
            className="app-alert-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="app-alert-title"
            aria-describedby="app-alert-message"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="app-alert-icon" aria-hidden="true">!</div>
            <div className="app-alert-content">
              <h3 id="app-alert-title">{alertDialog.title}</h3>
              <p id="app-alert-message">{alertDialog.message}</p>
            </div>
            <button
              className="app-alert-close"
              type="button"
              onClick={() => setAlertDialog(null)}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
};

export default POSPage;
