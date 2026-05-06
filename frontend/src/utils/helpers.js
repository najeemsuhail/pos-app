export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const roundCurrency = (amount) => {
  return Math.round((Number(amount) || 0) * 100) / 100;
};

export const calculatePercentage = (value, percentage) => {
  return (value * percentage) / 100;
};

export const calculateTax = (amount, taxRate = 5) => {
  return roundCurrency((amount * taxRate) / 100);
};

export const splitTaxAmount = (taxAmount) => {
  const normalizedTaxAmount = roundCurrency(taxAmount);
  const cgst = roundCurrency(normalizedTaxAmount / 2);
  const sgst = roundCurrency(normalizedTaxAmount - cgst);

  return { cgst, sgst };
};

export const formatTaxRate = (taxRate) => {
  return Number.parseFloat((Number(taxRate) || 0).toFixed(2)).toString();
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
