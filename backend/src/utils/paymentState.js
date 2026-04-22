const ORDER_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  LEGACY_PAID: 'paid',
};

const ORDER_PAYMENT_STATUSES = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PENDING_SETTLEMENT: 'pending_settlement',
  PAID: 'paid',
};

const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  SETTLED: 'settled',
};

const PAYMENT_METHODS = {
  CASH: 'Cash',
  UPI: 'UPI',
  BANK: 'Bank',
  CREDIT: 'Credit',
};

const PAYMENT_SOURCES = {
  DIRECT: 'Direct',
  SWIGGY: 'Swiggy',
  ZOMATO: 'Zomato',
};

function toNumber(value) {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  return Number(value);
}

function normalizePaymentMethod(value) {
  const normalized = String(value || '').trim().toLowerCase();

  if (normalized === 'cash') return PAYMENT_METHODS.CASH;
  if (normalized === 'upi') return PAYMENT_METHODS.UPI;
  if (normalized === 'bank' || normalized === 'bank transfer') return PAYMENT_METHODS.BANK;
  if (normalized === 'credit') return PAYMENT_METHODS.CREDIT;

  return String(value || '').trim() || PAYMENT_METHODS.CASH;
}

function normalizePaymentSource(value) {
  const normalized = String(value || '').trim().toLowerCase();

  if (!normalized || normalized === 'direct') return PAYMENT_SOURCES.DIRECT;
  if (normalized === 'swiggy') return PAYMENT_SOURCES.SWIGGY;
  if (normalized === 'zomato') return PAYMENT_SOURCES.ZOMATO;

  return String(value || '').trim() || PAYMENT_SOURCES.DIRECT;
}

function normalizePaymentStatus(value) {
  const normalized = String(value || '').trim().toLowerCase();

  if (normalized === PAYMENT_STATUSES.PENDING) return PAYMENT_STATUSES.PENDING;
  if (normalized === PAYMENT_STATUSES.PARTIAL) return PAYMENT_STATUSES.PARTIAL;
  if (normalized === PAYMENT_STATUSES.SETTLED) return PAYMENT_STATUSES.SETTLED;

  return null;
}

function isSettlementDeferred(method, source) {
  return normalizePaymentMethod(method) === PAYMENT_METHODS.CREDIT
    || normalizePaymentSource(source) === PAYMENT_SOURCES.SWIGGY
    || normalizePaymentSource(source) === PAYMENT_SOURCES.ZOMATO;
}

function normalizePaymentInput(payment) {
  const method = normalizePaymentMethod(payment.method);
  const source = normalizePaymentSource(payment.source);
  const amount = toNumber(payment.amount);
  const requestedStatus = normalizePaymentStatus(payment.status);
  const defaultStatus = isSettlementDeferred(method, source)
    ? PAYMENT_STATUSES.PENDING
    : PAYMENT_STATUSES.SETTLED;
  const status = requestedStatus || defaultStatus;

  let settledAmount = payment.settled_amount ?? payment.settledAmount;
  settledAmount = settledAmount === undefined || settledAmount === null
    ? (status === PAYMENT_STATUSES.SETTLED ? amount : 0)
    : toNumber(settledAmount);

  if (status === PAYMENT_STATUSES.SETTLED && settledAmount === 0) {
    settledAmount = amount;
  }

  if (status === PAYMENT_STATUSES.PENDING) {
    settledAmount = 0;
  }

  return {
    method,
    source,
    status,
    amount,
    settledAmount,
    referenceId: payment.reference_id || payment.referenceId || null,
    settledAt: payment.settled_at || payment.settledAt || null,
  };
}

function deriveOrderPaymentStatus(finalAmount, payments) {
  const dueAmount = toNumber(finalAmount);
  const normalizedPayments = (payments || []).map((payment) => ({
    status: normalizePaymentStatus(payment.status) || PAYMENT_STATUSES.PENDING,
    amount: toNumber(payment.amount),
    settledAmount: toNumber(payment.settledAmount ?? payment.settled_amount),
  }));

  const totalSettled = normalizedPayments.reduce((sum, payment) => sum + payment.settledAmount, 0);
  const hasPendingSettlement = normalizedPayments.some((payment) =>
    payment.status === PAYMENT_STATUSES.PENDING || payment.status === PAYMENT_STATUSES.PARTIAL
  );

  if (dueAmount <= 0) {
    return ORDER_PAYMENT_STATUSES.PAID;
  }

  if (totalSettled >= dueAmount) {
    return ORDER_PAYMENT_STATUSES.PAID;
  }

  if (hasPendingSettlement) {
    return ORDER_PAYMENT_STATUSES.PENDING_SETTLEMENT;
  }

  if (totalSettled > 0) {
    return ORDER_PAYMENT_STATUSES.PARTIAL;
  }

  return ORDER_PAYMENT_STATUSES.UNPAID;
}

function isRecognizedSale(order) {
  return order.status === ORDER_STATUSES.COMPLETED || order.status === ORDER_STATUSES.LEGACY_PAID;
}

function isFullyPaid(order) {
  return order.payment_status === ORDER_PAYMENT_STATUSES.PAID || order.status === ORDER_STATUSES.LEGACY_PAID;
}

module.exports = {
  ORDER_STATUSES,
  ORDER_PAYMENT_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_SOURCES,
  normalizePaymentInput,
  normalizePaymentMethod,
  normalizePaymentSource,
  normalizePaymentStatus,
  deriveOrderPaymentStatus,
  isSettlementDeferred,
  isRecognizedSale,
  isFullyPaid,
  toNumber,
};
