const { v4: uuidv4 } = require('uuid');

const generateBillNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BILL-${timestamp}-${random}`;
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
  generateBillNumber,
  calculateTax,
  calculateDiscount,
};
