import React, { createContext, useState, useCallback } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = useCallback((item, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...prevItems, { ...item, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((itemId) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  }, []);

  const calculateTotals = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      subtotal,
      discount: 0,
      tax: Math.round((subtotal * 5) / 100 * 100) / 100,
      total: subtotal + Math.round((subtotal * 5) / 100 * 100) / 100,
    };
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
    setOrder(null);
  }, []);

  const value = {
    order,
    setOrder,
    items,
    addItem,
    updateQuantity,
    removeItem,
    calculateTotals,
    clearCart,
    loading,
    setLoading,
    error,
    setError,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
