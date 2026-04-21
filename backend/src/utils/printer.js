const SettingService = require('../services/SettingService');

const wrapText = (value, maxWidth) => {
  const text = String(value || '').trim();
  if (!text) {
    return [''];
  }

  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  words.forEach((word) => {
    if (word.length > maxWidth) {
      if (current) {
        lines.push(current);
        current = '';
      }

      for (let index = 0; index < word.length; index += maxWidth) {
        lines.push(word.slice(index, index + maxWidth));
      }
      return;
    }

    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxWidth) {
      current = next;
      return;
    }

    lines.push(current);
    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines;
};

const formatKeyValueLine = (label, value, width) => {
  const safeLabel = String(label || '');
  const safeValue = String(value || '');
  const spacing = width - safeLabel.length - safeValue.length;

  if (spacing >= 1) {
    return `${safeLabel}${' '.repeat(spacing)}${safeValue}`;
  }

  return `${safeLabel}\n${safeValue.padStart(width)}`;
};

const formatItemLines = (name, quantity, amount, itemWidth, qtyWidth, amountWidth) => {
  const wrappedName = wrapText(name, itemWidth);
  const qtyText = String(quantity).padStart(qtyWidth);
  const amountText = String(amount).padStart(amountWidth);

  return wrappedName.map((line, index) => {
    const qtyColumn = index === 0 ? qtyText : ' '.repeat(qtyWidth);
    const amountColumn = index === 0 ? amountText : ' '.repeat(amountWidth);
    return `${line.padEnd(itemWidth)}${qtyColumn}${amountColumn}`;
  });
};

const generateThermalReceipt = (order, items, payments) => {
  const settings = SettingService.getSettings();
  const width = 40; // 80mm thermal width in characters
  const itemWidth = 24;
  const qtyWidth = 4;
  const amountWidth = width - itemWidth - qtyWidth;
  const line = '='.repeat(width);
  const taxRate = Number(settings.taxRate) || 0;
  const tableLabel = order.table_id
    ? settings.tableNames?.[Number(order.table_id) - 1] || `Table ${order.table_id}`
    : null;

  // Convert decimal strings from PostgreSQL to numbers
  const subtotal = parseFloat(order.subtotal) || 0;
  const discountAmount = parseFloat(order.discount_amount) || 0;
  const taxAmount = parseFloat(order.tax_amount) || 0;
  const finalAmount = parseFloat(order.final_amount) || 0;

  let receipt = '';
  
  // Center aligned store info
  if (settings.storeName) {
    receipt += settings.storeName.padStart(Math.floor((width + settings.storeName.length) / 2)).slice(0, width) + '\n';
  }
  if (settings.storeAddressLocality) {
    receipt += settings.storeAddressLocality.padStart(Math.floor((width + settings.storeAddressLocality.length) / 2)).slice(0, width) + '\n';
  }
  if (settings.storePhone) {
    const phoneStr = `Ph: ${settings.storePhone}`;
    receipt += phoneStr.padStart(Math.floor((width + phoneStr.length) / 2)).slice(0, width) + '\n';
  }

  receipt += '\n' + line + '\n';
  receipt += `Bill No : ${order.bill_number}\n`;
  receipt += `Date    : ${new Date(order.created_at).toLocaleDateString()}\n`;
  receipt += `Time    : ${new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}\n`;
  if (tableLabel) {
    receipt += `Table   : ${tableLabel}\n`;
  }
  receipt += line + '\n\n';

  receipt += 'Item'.padEnd(itemWidth) + 'Qty'.padStart(qtyWidth) + 'Amount'.padStart(amountWidth) + '\n';
  receipt += line + '\n';

  items.forEach((item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    const itemTotal = price * quantity;

    const itemLines = formatItemLines(
      item.name,
      quantity,
      itemTotal.toFixed(2),
      itemWidth,
      qtyWidth,
      amountWidth
    );

    receipt += `${itemLines.join('\n')}\n`;
  });

  receipt += '\n' + line + '\n';
  receipt += `${formatKeyValueLine('Subtotal', `Rs. ${subtotal.toFixed(2)}`, width)}\n`;
  if (discountAmount > 0) {
    receipt += `${formatKeyValueLine('Discount', `-Rs. ${discountAmount.toFixed(2)}`, width)}\n`;
  }
  if (taxAmount > 0) {
    receipt += `${formatKeyValueLine(`Tax (${taxRate}%)`, `Rs. ${taxAmount.toFixed(2)}`, width)}\n`;
  }
  receipt += line + '\n';
  receipt += `${formatKeyValueLine('TOTAL', `Rs. ${finalAmount.toFixed(2)}`, width)}\n`;
  receipt += line + '\n\n';

  receipt += 'PAYMENT BREAKDOWN\n';
  receipt += line + '\n';
  payments.forEach((payment) => {
    const paymentAmount = parseFloat(payment.amount) || 0;
    receipt += `${formatKeyValueLine(payment.method, `Rs. ${paymentAmount.toFixed(2)}`, width)}\n`;
  });

  receipt += '\n' + line + '\n';
  receipt += 'Thank you! Please visit again.'.padStart((width + 30) / 2).slice(0, width) + '\n';
  receipt += line + '\n\n';

  return receipt;
};

module.exports = { generateThermalReceipt };
