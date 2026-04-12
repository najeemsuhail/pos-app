const generateThermalReceipt = (order, items, payments) => {
  const width = 40; // 80mm thermal width in characters
  const line = '='.repeat(width);

  // Convert decimal strings from PostgreSQL to numbers
  const subtotal = parseFloat(order.subtotal) || 0;
  const discountAmount = parseFloat(order.discount_amount) || 0;
  const taxAmount = parseFloat(order.tax_amount) || 0;
  const finalAmount = parseFloat(order.final_amount) || 0;

  let receipt = '';
  receipt += '\n' + line + '\n';
  receipt += 'Chewbiecafe RECEIPT'.padStart((width + 20) / 2).slice(0, width) + '\n';
  receipt += line + '\n\n';

  receipt += `Bill #: ${order.bill_number}\n`;
  receipt += `Date: ${new Date(order.created_at).toLocaleString()}\n`;
  receipt += line + '\n\n';

  receipt += 'Item'.padEnd(20) + 'Qty'.padEnd(5) + 'Amount\n';
  receipt += line + '\n';

  let itemsAmount = 0;
  items.forEach((item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = price * quantity;
    itemsAmount += itemTotal;
    
    const name = item.name.substring(0, 20).padEnd(20);
    const qty = quantity.toString().padEnd(5);
    const amount = itemTotal.toFixed(2).padStart(10);
    receipt += name + qty + amount + '\n';
  });

  receipt += '\n' + line + '\n';
  receipt += `Subtotal: Rs. ${subtotal.toFixed(2)}`.padStart(width) + '\n';
  if (discountAmount > 0) {
    receipt += `Discount: -Rs. ${discountAmount.toFixed(2)}`.padStart(width) + '\n';
  }
  receipt += `Tax (GST): Rs. ${taxAmount.toFixed(2)}`.padStart(width) + '\n';
  receipt += line + '\n';
  receipt += `TOTAL: Rs. ${finalAmount.toFixed(2)}`.padStart(width) + '\n';
  receipt += line + '\n\n';

  receipt += 'PAYMENT BREAKDOWN\n';
  receipt += line + '\n';
  payments.forEach((payment) => {
    const paymentAmount = parseFloat(payment.amount) || 0;
    const methodStr = `${payment.method}: Rs. ${paymentAmount.toFixed(2)}`;
    receipt += methodStr.padEnd(width) + '\n';
  });

  receipt += '\n' + line + '\n';
  receipt += 'Thank you! Please visit again.'.padStart((width + 30) / 2).slice(0, width) + '\n';
  receipt += line + '\n\n';

  return receipt;
};

module.exports = { generateThermalReceipt };
