const formatBillDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const formatDailyBillNumber = (prefix, billDate, sequenceNumber) => {
  const normalizedSequence = String(sequenceNumber).padStart(4, '0');
  return `${prefix}-${billDate}-${normalizedSequence}`;
};

const calculateTax = (amount, taxRate = 5) => {
  return Math.round((amount * taxRate) / 100 * 100) / 100;
};

const calculateDiscount = (subtotal, discount) => {
  if (discount.type === 'percentage') {
    return Math.round((subtotal * discount.value) / 100 * 100) / 100;
  }
  return discount.value;
};

module.exports = {
  formatBillDate,
  formatDailyBillNumber,
  calculateTax,
  calculateDiscount,
};
