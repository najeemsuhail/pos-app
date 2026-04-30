import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/POSLayout.css';

const POSLayout = ({
  categories,
  items,
  onAddItem,
  onFinalizeOrder,
  totals,
  discount,
  taxRate,
  onDiscountChange,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  selectedTableId,
  selectedOrderType,
  tableNumbers,
  tableNames,
  activeOrders = [],
  onSelectTable,
  onSelectOrderType,
  currentOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItemIndex, setNewItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [showTableNav, setShowTableNav] = useState(false);
  const [canScrollTableLeft, setCanScrollTableLeft] = useState(false);
  const [canScrollTableRight, setCanScrollTableRight] = useState(false);

  const billItemsRef = useRef(null);
  const prevCartLengthRef = useRef(0);
  const searchInputRef = useRef(null);
  const tableRailRef = useRef(null);

  const orderModes = useMemo(() => ([
    { type: 'takeaway', label: 'Takeaway', hint: 'Parcel' },
    { type: 'delivery', label: 'Delivery', hint: 'Home' },
    { type: 'online', label: 'Online', hint: 'Swiggy/Zomato' },
  ]), []);

  const categoryOptions = useMemo(() => ([
    { id: null, name: 'All' },
    ...categories.map((category) => ({ id: category.id, name: category.name })),
  ]), [categories]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const categoryName = categories.find((category) => category.id === item.category_id)?.name || '';
      const searchableText = [
        item.name || '',
        categoryName,
        String(item.price ?? ''),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = normalizedQuery ? searchableText.includes(normalizedQuery) : true;
      const matchesCategory = normalizedQuery
        ? true
        : (selectedCategory ? item.category_id === selectedCategory : true);

      return matchesCategory && matchesSearch;
    });
  }, [categories, items, searchQuery, selectedCategory]);

  const getTableLabel = (tableId) => tableNames?.[tableId - 1] || `Table ${tableId}`;

  const getOrderModeLabel = (orderType, tableId = selectedTableId) => {
    if (orderType === 'dine_in') {
      return tableId ? getTableLabel(tableId) : 'No table selected';
    }

    return orderModes.find((mode) => mode.type === orderType)?.label || 'Order';
  };

  const categoryTotals = totals || { subtotal: 0, tax: 0, discount: 0, total: 0 };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > prevCartLengthRef.current) {
      const newIndex = cartItems.length - 1;
      setNewItemIndex(newIndex);

      if (billItemsRef.current) {
        setTimeout(() => {
          billItemsRef.current.scrollTop = billItemsRef.current.scrollHeight;
        }, 0);
      }

      const timer = setTimeout(() => setNewItemIndex(-1), 2000);
      return () => clearTimeout(timer);
    }

    prevCartLengthRef.current = cartItems.length;
  }, [cartItems.length]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const activeTag = document.activeElement?.tagName;
      const isTypingInForm = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';

      if (event.key === 'F9') {
        event.preventDefault();
        if (selectedOrderType !== 'dine_in' || selectedTableId) {
          onFinalizeOrder(discount);
        }
        return;
      }

      if (event.key === 'F1' && event.shiftKey) {
        event.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (event.key === '/') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setSearchQuery('');
        setSelectedCategory(null);
        setHighlightedIndex(0);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        return;
      }

      if (/^F([1-9]|1[0-2])$/.test(event.key)) {
        event.preventDefault();
        const tableIndex = Number(event.key.slice(1));
        if (tableNumbers.includes(tableIndex)) {
          onSelectTable(tableIndex);
        }
        return;
      }

      if (event.ctrlKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault();
        const currentCategoryIndex = categoryOptions.findIndex((category) => category.id === selectedCategory);
        const currentIndex = currentCategoryIndex >= 0 ? currentCategoryIndex : 0;
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (currentIndex + direction + categoryOptions.length) % categoryOptions.length;
        setSelectedCategory(categoryOptions[nextIndex].id);
        return;
      }

      if (event.altKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        const currentIndex = Math.max(tableNumbers.indexOf(selectedTableId), 0);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + direction + tableNumbers.length) % tableNumbers.length;
        onSelectTable(tableNumbers[nextIndex]);
        return;
      }

      if (isTypingInForm && document.activeElement !== searchInputRef.current) {
        return;
      }

      if (event.key === '+' || event.key === '=') {
        if (cartItems.length > 0) {
          event.preventDefault();
          const lastItem = cartItems[cartItems.length - 1];
          onUpdateQuantity(lastItem.id, lastItem.quantity + 1);
        }
        return;
      }

      if (event.key === '-' || event.key === '_') {
        if (cartItems.length > 0) {
          event.preventDefault();
          const lastItem = cartItems[cartItems.length - 1];
          if (lastItem.quantity > 1) {
            onUpdateQuantity(lastItem.id, lastItem.quantity - 1);
          } else {
            onRemoveItem(lastItem.id);
          }
        }
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();

        if (document.activeElement?.type === 'number') {
          document.activeElement.blur();
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
          return;
        }

        if (filteredItems.length > 0 && highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
          const item = filteredItems[highlightedIndex];
          if (item.is_available) {
            onAddItem(item, 1);
            setSearchQuery('');
            setHighlightedIndex(0);
            if (searchInputRef.current) {
              searchInputRef.current.focus();
            }
          }
        }
        return;
      }

      if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
        if (!isTypingInForm && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    cartItems,
    categoryOptions,
    discount,
    filteredItems,
    highlightedIndex,
    onAddItem,
    onFinalizeOrder,
    onRemoveItem,
    onSelectTable,
    onUpdateQuantity,
    selectedCategory,
    selectedTableId,
    selectedOrderType,
    tableNumbers,
  ]);

  const getCacheBustedImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return null;
    }

    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}t=${Date.now()}`;
  };

  const scrollTables = (direction) => {
    if (!tableRailRef.current) {
      return;
    }

    const scrollAmount = Math.max(tableRailRef.current.clientWidth * 0.7, 220);
    tableRailRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const updateTableNavState = () => {
      if (!tableRailRef.current) {
        setShowTableNav(false);
        setCanScrollTableLeft(false);
        setCanScrollTableRight(false);
        return;
      }

      const rail = tableRailRef.current;
      const hasOverflow = rail.scrollWidth > rail.clientWidth + 4;
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);

      setShowTableNav(hasOverflow);
      setCanScrollTableLeft(hasOverflow && rail.scrollLeft > 4);
      setCanScrollTableRight(hasOverflow && rail.scrollLeft < maxScrollLeft - 4);
    };

    const handleResize = () => {
      window.requestAnimationFrame(updateTableNavState);
    };

    updateTableNavState();
    const rail = tableRailRef.current;

    if (rail) {
      rail.addEventListener('scroll', updateTableNavState, { passive: true });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (rail) {
        rail.removeEventListener('scroll', updateTableNavState);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [orderModes, tableNumbers, tableNames, showTableNav]);

  return (
    <>
    <div className={`pos-container ${categoriesCollapsed ? 'categories-collapsed' : ''}`}>
      <section className="pos-table-dock">
        <div className="table-dock-heading">
          <div>
            <h3>Tables</h3>
          </div>
          <div className="table-dock-status">
            <span>{getOrderModeLabel(selectedOrderType)}</span>
            <strong>{currentOrder?.bill_number ? `Bill ${currentOrder.bill_number}` : 'Ready for new order'}</strong>
          </div>
          <button className="help-btn" onClick={() => setShowHelp(true)} type="button">
            Help
          </button>
        </div>
        <div className={`table-carousel ${showTableNav ? 'has-nav' : 'no-nav'}`}>
          {showTableNav && (
            <button
              className="table-nav-btn"
              type="button"
              onClick={() => scrollTables(-1)}
              aria-label="Scroll tables left"
              disabled={!canScrollTableLeft}
            >
              &lt;
            </button>
          )}
          <div className="table-rail" ref={tableRailRef}>
            {orderModes.map((mode) => {
              const activeOrder = activeOrders.find((order) => order.order_type === mode.type);
              const isSelected = selectedOrderType === mode.type;

              return (
                <button
                  key={mode.type}
                  className={`table-btn order-type-btn order-type-${mode.type} ${isSelected ? 'selected' : ''} ${activeOrder ? 'occupied' : 'empty'}`}
                  type="button"
                  onClick={() => onSelectOrderType(mode.type)}
                  title={`Select ${mode.label}`}
                >
                  <span className="table-btn-label">{mode.label}</span>
                  <strong>{activeOrder ? 'Open' : mode.hint}</strong>
                  <small>{activeOrder?.bill_number || ''}</small>
                </button>
              );
            })}
            {tableNumbers.map((tableId) => {
              const activeOrder = activeOrders.find((order) => order.order_type === 'dine_in' && order.table_id === tableId);
              const isSelected = selectedOrderType === 'dine_in' && selectedTableId === tableId;

              return (
                <button
                  key={tableId}
                  className={`table-btn ${isSelected ? 'selected' : ''} ${activeOrder ? 'occupied' : 'empty'}`}
                  type="button"
                  onClick={() => onSelectTable(tableId)}
                  title={`Select ${getTableLabel(tableId)}`}
                >
                  <span className="table-btn-label">{getTableLabel(tableId)}</span>
                  <strong>{activeOrder ? 'Open' : 'Free'}</strong>
                  <small>{activeOrder?.bill_number || (tableId <= 12 ? `F${tableId}` : '')}</small>
                </button>
              );
            })}
          </div>
          {showTableNav && (
            <button
              className="table-nav-btn"
              type="button"
              onClick={() => scrollTables(1)}
              aria-label="Scroll tables right"
              disabled={!canScrollTableRight}
            >
              &gt;
            </button>
          )}
        </div>
      </section>

      <aside className="pos-categories">
        {categoriesCollapsed ? (
          <button
            className="category-rail-toggle"
            type="button"
            onClick={() => setCategoriesCollapsed(false)}
            aria-label="Expand categories panel"
          >
            <span>&gt;</span>
            <strong>Categories</strong>
          </button>
        ) : (
          <>
            <div className="section-header">
              <div>
                <h3>Categories</h3>
                <br />
              </div>
              <button
                className="panel-toggle-btn"
                type="button"
                onClick={() => setCategoriesCollapsed(true)}
                aria-label="Collapse categories panel"
              >
                Hide
              </button>
            </div>
            <div className="category-list">
              {categoryOptions.map((category) => (
                <button
                  key={category.id ?? 'all'}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </>
        )}
      </aside>

      <main className="pos-menu">
        <div className="menu-header-container">
          <div className="section-header">
            <div>
              <h3>Menu Items</h3>
            </div>
            <div className="menu-header-actions">
              <span className="active-category-chip">
                {selectedCategory == null ? 'All categories' : categoryOptions.find((category) => category.id === selectedCategory)?.name || 'Category'}
              </span>
            </div>
          </div>
          <input
            type="search"
            className="search-bar"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            ref={searchInputRef}
          />
        </div>
        <div className="pos-items-grid">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              className={`pos-item-card ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => {
                onAddItem(item, 1);
                setHighlightedIndex(index);
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }}
              disabled={!item.is_available}
              onMouseEnter={() => setHighlightedIndex(index)}
              title={`Add ${item.name}`}
            >
              {item.image_url ? (
                <img
                  className="pos-item-image"
                  src={getCacheBustedImageUrl(item.image_url)}
                  alt={item.name}
                  onError={(event) => {
                    event.target.style.display = 'none';
                    event.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="pos-item-image-fallback" style={{ display: item.image_url ? 'none' : 'flex' }}>
                <span className="pos-item-image-fallback-icon" aria-hidden="true">🍽</span>
                <span>Sample Image</span>
              </div>
              <div className="pos-item-card-body">
                <div className="pos-item-name">{item.name}</div>
                <div className="pos-item-price">Rs {item.price}</div>
              </div>
              {!item.is_available && <div className="pos-item-unavailable">Out of Stock</div>}
              {index === highlightedIndex && item.is_available && <div className="pos-keyboard-hint">Enter</div>}
            </button>
          ))}

          {filteredItems.length === 0 && (
            <div className="pos-empty-menu-state">
              No items found. Press `Esc` to clear search or change the category.
            </div>
          )}
        </div>
      </main>

      <aside className="pos-bill">
        <h3 className="bill-heading">
          <span>Bill Summary</span>
          <span className="bill-heading-chip">{selectedOrderType === 'dine_in' && !selectedTableId ? 'Select a table' : getOrderModeLabel(selectedOrderType)}</span>
        </h3>

        <div className="bill-meta">
          <span>{currentOrder?.bill_number ? `Bill ${currentOrder.bill_number}` : 'No active bill yet'}</span>
          <span>{cartItems.length} items</span>
        </div>

        <div className="bill-items" ref={billItemsRef}>
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className={`bill-item ${index === newItemIndex ? 'new-item' : ''}`}>
              <div className="bill-item-info">
                <div className="bill-item-name">{item.name}</div>
                <div className="bill-item-price">Rs {item.price}</div>
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
              <div className="bill-item-total">Rs {(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => onRemoveItem(item.id)} className="remove-btn" tabIndex="-1">
                x
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="empty-bill-state">
              {selectedOrderType === 'dine_in' && !selectedTableId
                ? 'Select a table or order type to begin taking an order.'
                : `Add items to start this ${getOrderModeLabel(selectedOrderType).toLowerCase()} order.`}
            </div>
          )}
        </div>

        <div className="bill-summary">
          <div className="summary-header-row">
            <div className="summary-line total summary-total-row">
              <span>Total</span>
              <span>Rs {categoryTotals.total?.toFixed(2) || '0.00'}</span>
            </div>
            <button
              className="summary-toggle-btn"
              type="button"
              onClick={() => setSummaryExpanded((prev) => !prev)}
              aria-expanded={summaryExpanded}
            >
              {summaryExpanded ? 'Hide' : 'Split'}
            </button>
          </div>
          {summaryExpanded && (
            <div className="summary-breakdown">
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>Rs {categoryTotals.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="summary-line discount-input">
                <span>Discount %:</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(event) => onDiscountChange(Number(event.target.value))}
                  min="0"
                  max="100"
                  tabIndex="-1"
                />
              </div>
              <div className="summary-line">
                <span>Discount Amount:</span>
                <span>Rs {categoryTotals.discount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="summary-line">
                <span>Tax ({taxRate}%):</span>
                <span>Rs {categoryTotals.tax?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          )}
        </div>

        <button
          className="pay-btn"
          onClick={() => onFinalizeOrder(discount)}
          disabled={(selectedOrderType === 'dine_in' && !selectedTableId) || cartItems.length === 0}
        >
          PAY (F9)
        </button>
      </aside>
    </div>

    {showHelp && (
      <div className="modal-overlay" onClick={() => setShowHelp(false)}>
        <div className="shortcut-modal" onClick={(event) => event.stopPropagation()}>
          <div className="shortcut-modal-header">
            <div>
              <h3>Keyboard Help</h3>
              <p>Use this as the operator quick reference.</p>
            </div>
            <button className="shortcut-close" type="button" onClick={() => setShowHelp(false)}>
              x
            </button>
          </div>
          <div className="shortcut-grid" aria-label="Keyboard shortcuts">
            <div className="shortcut-item">
              <kbd>F1-F12</kbd>
              <span>Select table directly</span>
            </div>
            <div className="shortcut-item">
              <kbd>Alt</kbd>
              <kbd>Left/Right</kbd>
              <span>Move between tables</span>
            </div>
            <div className="shortcut-item">
              <kbd>/</kbd>
              <span>Focus search instantly</span>
            </div>
            <div className="shortcut-item">
              <kbd>Ctrl</kbd>
              <kbd>Up/Down</kbd>
              <span>Change category</span>
            </div>
            <div className="shortcut-item">
              <kbd>Arrows</kbd>
              <span>Move item highlight</span>
            </div>
            <div className="shortcut-item">
              <kbd>Enter</kbd>
              <span>Add highlighted item</span>
            </div>
            <div className="shortcut-item">
              <kbd>+</kbd>
              <kbd>-</kbd>
              <span>Change last item quantity</span>
            </div>
            <div className="shortcut-item">
              <kbd>Esc</kbd>
              <span>Reset search and category</span>
            </div>
            <div className="shortcut-item">
              <kbd>F9</kbd>
              <span>Checkout current bill</span>
            </div>
            <div className="shortcut-item">
              <kbd>Shift</kbd>
              <kbd>F1</kbd>
              <span>Open or close this help window</span>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default POSLayout;
