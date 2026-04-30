const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
  ONLINE: 'online',
};

const ORDER_TYPE_LABELS = {
  [ORDER_TYPES.DINE_IN]: 'Dine In',
  [ORDER_TYPES.TAKEAWAY]: 'Takeaway',
  [ORDER_TYPES.DELIVERY]: 'Delivery',
  [ORDER_TYPES.PICKUP]: 'Pickup',
  [ORDER_TYPES.ONLINE]: 'Online',
};

function normalizeOrderType(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return Object.values(ORDER_TYPES).includes(normalized) ? normalized : ORDER_TYPES.DINE_IN;
}

function getOrderTypeLabel(value) {
  return ORDER_TYPE_LABELS[normalizeOrderType(value)];
}

module.exports = {
  ORDER_TYPES,
  ORDER_TYPE_LABELS,
  normalizeOrderType,
  getOrderTypeLabel,
};
