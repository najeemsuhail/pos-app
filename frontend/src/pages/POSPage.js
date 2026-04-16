import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import POSLayout from '../components/POSLayout';
import PaymentModal from '../components/PaymentModal';
import ReceiptModal from '../components/ReceiptModal';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { categoryService, menuItemService, orderService, settingService } from '../services/api';
import { useOrder } from '../hooks/useOrder';
import '../styles/POS.css';
import receiptLogo from '../assets/icon.png';

const TABLE_COUNT = 12;

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

      await orderService.pay(currentOrder.id, payments);

      const receiptRes = await orderService.getReceipt(currentOrder.id);
      setReceipt(receiptRes.data);
      await refreshActiveTables();

      setShowPaymentModal(false);
      setShowReceiptModal(true);
    } catch (error) {
      alert('Error processing payment: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = async () => {
    const receiptLines = receipt.split('\n').filter((line, index, list) => !(line === '' && list[index - 1] === ''));
    const receiptMarkup = receiptLines.map((line) => {
      const trimmed = line.trim();
      let className = 'receipt-line';

      if (!trimmed) {
        className = 'receipt-line spacer';
      } else if (/^=+$/.test(trimmed)) {
        className = 'receipt-line separator';
      } else if (trimmed === 'PAYMENT BREAKDOWN') {
        className = 'receipt-line section-title';
      } else if (trimmed.startsWith('TOTAL:')) {
        className = 'receipt-line total';
      } else if (/^(Subtotal:|Discount:|Tax \([^)]+\):)/.test(trimmed)) {
        className = 'receipt-line summary';
      } else if (/^(Bill No|Date|Time|Table)\s*:/.test(trimmed)) {
        className = 'receipt-line meta';
      } else if (trimmed === 'Thank you! Please visit again.') {
        className = 'receipt-line footer';
      } else if (trimmed === 'Item                 Qty  Amount') {
        className = 'receipt-line header-row';
      }

      const safeLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;');

      return `<div class="${className}">${safeLine || '&nbsp;'}</div>`;
    }).join('');

    const htmlContent = `
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @media print {
              body { margin: 0; }
              .print-shell { box-shadow: none; border: none; }
            }
            body {
              margin: 0;
              padding: 16px;
              background: #f3f4f6;
              font-family: Arial, sans-serif;
              color: #111827;
            }
            .print-shell {
              max-width: 340px;
              margin: 0 auto;
              padding: 14px;
              border: 1px solid #e5e7eb;
              border-radius: 16px;
              background: #ffffff;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            }
            .print-brand {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
            }
            .print-logo-frame {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 52px;
              height: 52px;
              border-radius: 16px;
              background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
              border: 1px solid rgba(17, 24, 39, 0.08);
              box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
              overflow: hidden;
              flex: 0 0 auto;
            }
            .print-brand img {
              width: 66px;
              height: 66px;
              object-fit: contain;
              transform: scale(1.16);
            }
            .print-brand strong {
              display: block;
              font-size: 16px;
              font-weight: 800;
            }
            .print-brand span {
              font-size: 10px;
              color: #6b7280;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }
            .receipt-paper {
              padding: 14px 12px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              background: #fffef9;
            }
            .receipt-line {
              font-family: 'Courier New', Courier, monospace;
              font-size: 11px;
              line-height: 1.28;
              font-weight: 600;
              white-space: nowrap;
            }
            .receipt-line.separator { color: #6b7280; }
            .receipt-line.header-row,
            .receipt-line.section-title,
            .receipt-line.footer,
            .receipt-line.total { font-weight: 800; }
            .receipt-line.footer { text-align: center; }
            .receipt-line.total { font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="print-shell">
            <div class="print-brand">
              <div class="print-logo-frame">
                <img src="${receiptLogo}" alt="Chewbie Cafe logo" />
              </div>
              <div>
                <strong>Chewbie Cafe</strong>
                <span>Receipt</span>
              </div>
            </div>
            <div class="receipt-paper">${receiptMarkup}</div>
          </div>
        </body>
      </html>
    `;

    if (window.posDesktop && window.posDesktop.printReceipt) {
      const printerName = localStorage.getItem('receiptPrinter') || 'browser-default';
      try {
        const result = await window.posDesktop.printReceipt(htmlContent, printerName);
        if (!result.success) {
          alert('Printing failed: ' + result.errorType);
        }
      } catch (error) {
        console.error('Desktop print error:', error);
        alert('Failed to print receipt via desktop module.');
      }
      return;
    }

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

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 250);
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

  const tableNumbers = useMemo(() => Array.from({ length: TABLE_COUNT }, (_, index) => index + 1), []);

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
