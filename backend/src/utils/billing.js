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

const roundCurrency = (amount) => {
  return Math.round((Number(amount) || 0) * 100) / 100;
};

const calculateTax = (amount, taxRate = 5) => {
  return roundCurrency((amount * taxRate) / 100);
};

const calculateDiscount = (subtotal, discount) => {
  if (discount.type === 'percentage') {
    return roundCurrency((subtotal * discount.value) / 100);
  }
  return discount.value;
};

const splitTaxAmount = (taxAmount) => {
  const normalizedTaxAmount = roundCurrency(taxAmount);
  const cgstAmount = roundCurrency(normalizedTaxAmount / 2);
  const sgstAmount = roundCurrency(normalizedTaxAmount - cgstAmount);

  return {
    cgstAmount,
    sgstAmount,
  };
};

const formatTaxRate = (taxRate) => {
  return Number.parseFloat((Number(taxRate) || 0).toFixed(2)).toString();
};

module.exports = {
  formatBillDate,
  formatDailyBillNumber,
  roundCurrency,
  calculateTax,
  calculateDiscount,
  splitTaxAmount,
  formatTaxRate,
};
