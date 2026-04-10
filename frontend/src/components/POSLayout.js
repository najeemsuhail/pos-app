import React, { useState, useEffect, useRef } from 'react';
import '../styles/POSLayout.css';

const POSLayout = ({ categories, items, onAddItem, onFinalizeOrder, totals, cartItems, onRemoveItem, onUpdateQuantity }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newItemIndex, setNewItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const billItemsRef = useRef(null);
  const prevCartLengthRef = useRef(0);
  const searchInputRef = useRef(null);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory ? item.category_id === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const category_totals = totals || { subtotal: 0, tax: 0, discount: 0, total: 0 };

  // Auto focus search bar initially
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

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

  // Reset highlight index when filter changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery, selectedCategory]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // F9 to Pay
      if (e.key === 'F9') {
        e.preventDefault();
        onFinalizeOrder(discount);
        return;
      }

      // Escape clears search and focuses search bar
      if (e.key === 'Escape') {
        e.preventDefault();
        setSearchQuery('');
        setSelectedCategory(null);
        setHighlightedIndex(0);
        if (searchInputRef.current) searchInputRef.current.focus();
        return;
      }

      // + and - to adjust quantity of the LAST item in the cart
      if (e.key === '+' || e.key === '=') {
        // Prevent typing + in input fields from triggering this
        if (document.activeElement.tagName === 'INPUT' && document.activeElement !== searchInputRef.current) return;
        
        if (cartItems.length > 0) {
          e.preventDefault();
          const lastItem = cartItems[cartItems.length - 1];
          onUpdateQuantity(lastItem.id, lastItem.quantity + 1);
        }
        return;
      }
      
      if (e.key === '-' || e.key === '_') {
        if (document.activeElement.tagName === 'INPUT' && document.activeElement !== searchInputRef.current) return;

        if (cartItems.length > 0) {
          e.preventDefault();
          const lastItem = cartItems[cartItems.length - 1];
          if (lastItem.quantity > 1) {
            onUpdateQuantity(lastItem.id, lastItem.quantity - 1);
          } else {
            onRemoveItem(lastItem.id);
          }
        }
        return;
      }

      // Grid Navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      // Enter to add item
      if (e.key === 'Enter') {
        e.preventDefault();
        // If discount input is focused, don't add item, just blur to finalize edit
        if (document.activeElement.type === 'number') {
          document.activeElement.blur();
          if (searchInputRef.current) searchInputRef.current.focus();
          return;
        }

        if (filteredItems.length > 0 && highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
          const item = filteredItems[highlightedIndex];
          if (item.is_available) {
            onAddItem(item, 1);
            setSearchQuery('');
            setHighlightedIndex(0);
            if (searchInputRef.current) searchInputRef.current.focus();
          }
        }
        return;
      }

      // Any text key instantly jumps focus to search bar so they can type immediately
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [cartItems, filteredItems, highlightedIndex, onAddItem, onRemoveItem, onUpdateQuantity, discount, onFinalizeOrder, searchQuery]);

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
        <p style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '-10px', marginBottom: '10px'}}>Use Esc to reset</p>
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
        <div className="menu-header-container">
          <h3 style={{ marginBottom: '0' }}>Menu Items</h3>
          <input 
            type="search" 
            className="search-bar" 
            placeholder="Search... (Arrow keys to select, Enter to add)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchInputRef}
          />
        </div>
        <div className="items-grid">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              className={`item-card ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => {
                onAddItem(item, 1);
                setHighlightedIndex(index);
                if (searchInputRef.current) searchInputRef.current.focus();
              }}
              disabled={!item.is_available}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
              // To enable hovering to sync with keyboard
              onMouseEnter={() => setHighlightedIndex(index)}
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
              
              {index === highlightedIndex && (
                 <div className="keyboard-hint" style={{
                   position: 'absolute',
                   bottom: '-12px',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   background: 'var(--primary-gradient)',
                   color: 'white',
                   fontSize: '10px',
                   padding: '2px 8px',
                   borderRadius: '4px',
                   opacity: item.is_available ? 1 : 0.5
                 }}>
                   Press Enter
                 </div>
              )}
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
              No items found. Press Esc to clear search.
            </div>
          )}
        </div>
      </div>

      {/* Right: Bill Summary */}
      <div className="pos-bill">
        <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          Bill Summary
          <span style={{fontSize: '11px', background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '4px'}}>
             Press +/- for Qty
          </span>
        </h3>
        <div className="bill-items" ref={billItemsRef}>
          {cartItems.map((item, index) => (
            <div key={item.id || Math.random()} className={`bill-item ${index === newItemIndex ? 'new-item' : ''}`}>
              <div className="bill-item-info">
                <div className="bill-item-name">{item.name}</div>
                <div className="bill-item-price">₹{item.price}</div>
              </div>
              <div className="bill-item-qty">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="qty-btn" tabIndex="-1">
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="qty-btn" tabIndex="-1">
                  +
                </button>
              </div>
              <div className="bill-item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => onRemoveItem(item.id)} className="remove-btn" tabIndex="-1">
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
              tabIndex="-1"
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
          PAY (F9)
        </button>
      </div>
    </div>
  );
};

export default POSLayout;
