import React, { useState, useEffect, useRef } from 'react';
import '../styles/POSLayout.css';

const POSLayout = ({ categories, items, onAddItem, onFinalizeOrder, totals, cartItems, onRemoveItem, onUpdateQuantity }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newItemIndex, setNewItemIndex] = useState(-1);
  const billItemsRef = useRef(null);
  const prevCartLengthRef = useRef(0);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category_id === selectedCategory)
    : items;

  const category_totals = totals || { subtotal: 0, tax: 0, discount: 0, total: 0 };

  // Track new items and auto-scroll
  useEffect(() => {
    if (cartItems.length > prevCartLengthRef.current) {
      // New item added
      const newIndex = cartItems.length - 1;
      setNewItemIndex(newIndex);

      // Auto-scroll to new item
      if (billItemsRef.current) {
        setTimeout(() => {
          billItemsRef.current.scrollTop = billItemsRef.current.scrollHeight;
        }, 0);
      }

      // Remove highlight after animation completes
      const timer = setTimeout(() => setNewItemIndex(-1), 2000);
      return () => clearTimeout(timer);
    }
    prevCartLengthRef.current = cartItems.length;
  }, [cartItems.length]);

  // Add cache-busting to image URLs to prevent browser caching
  const getCacheBustedImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}t=${Date.now()}`;
  };

  return (
    <div className="pos-container">
      {/* Left: Categories */}
      <div className="pos-categories">
        <h3>Categories</h3>
        <div className="category-list">
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Menu Items */}
      <div className="pos-menu">
        <h3>Menu Items</h3>
        <div className="items-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className="item-card"
              onClick={() => onAddItem(item, 1)}
              disabled={!item.is_available}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
            >
              {item.image_url ? (
                <img 
                  src={getCacheBustedImageUrl(item.image_url)} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'contain',
                    backgroundColor: 'var(--surface-muted)',
                    borderRadius: '4px 4px 0 0',
                    marginBottom: '8px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div style={{
                width: '100%',
                height: item.image_url ? '0px' : '120px',
                backgroundColor: 'var(--surface-muted)',
                display: item.image_url ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                borderRadius: '4px 4px 0 0',
                marginBottom: '8px'
              }}>
                🍔
              </div>
              <div className="item-name">{item.name}</div>
              <div className="item-price">₹{item.price}</div>
              {!item.is_available && <div className="item-unavailable">Out of Stock</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Bill Summary */}
      <div className="pos-bill">
        <h3>Bill Summary</h3>
        <div className="bill-items" ref={billItemsRef}>
          {cartItems.map((item, index) => (
            <div key={item.id || Math.random()} className={`bill-item ${index === newItemIndex ? 'new-item' : ''}`}>
              <div className="bill-item-info">
                <div className="bill-item-name">{item.name}</div>
                <div className="bill-item-price">₹{item.price}</div>
              </div>
              <div className="bill-item-qty">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="qty-btn">
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="qty-btn">
                  +
                </button>
              </div>
              <div className="bill-item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => onRemoveItem(item.id)} className="remove-btn">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bill-summary">
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>₹{category_totals.subtotal?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="summary-line discount-input">
            <span>Discount %:</span>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          <div className="summary-line">
            <span>Tax (5%):</span>
            <span>₹{category_totals.tax?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>₹{category_totals.total?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <button className="pay-btn" onClick={() => onFinalizeOrder(discount)}>
          PAY
        </button>
      </div>
    </div>
  );
};

export default POSLayout;
