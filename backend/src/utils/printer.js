const SettingService = require('../services/SettingService');
const { getOrderTypeLabel } = require('./orderTypes');

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

const getCustomerPaymentLabel = (payment) => {
  const source = String(payment?.source || '').trim().toLowerCase();
  const method = String(payment?.method || '').trim();

  if (source === 'swiggy' || source === 'zomato') {
    return 'Online';
  }

  return method || 'Payment';
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
  const orderTypeLabel = getOrderTypeLabel(order.order_type);

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
  receipt += `Order   : ${order.status}\n`;
  receipt += `Type    : ${orderTypeLabel}\n`;
  receipt += `Payment : ${order.payment_status || 'unpaid'}\n`;
  if (order.customer_name) {
    receipt += `Customer: ${order.customer_name}\n`;
  }
  if (order.customer_phone) {
    receipt += `Phone   : ${order.customer_phone}\n`;
  }
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
    const paymentLabel = getCustomerPaymentLabel(payment);
    receipt += `${formatKeyValueLine(paymentLabel, `Rs. ${paymentAmount.toFixed(2)}`, width)}\n`;
  });

  receipt += '\n' + line + '\n';
  receipt += 'Thank you! Please visit again.'.padStart((width + 30) / 2).slice(0, width) + '\n';
  receipt += line + '\n\n';

  return receipt;
};

const generateKotTicket = (order, ticket) => {
  const settings = SettingService.getSettings();
  const width = 40;
  const itemWidth = 30;
  const qtyWidth = width - itemWidth;
  const line = '='.repeat(width);
  const tableLabel = order.table_id
    ? settings.tableNames?.[Number(order.table_id) - 1] || `Table ${order.table_id}`
    : null;
  const orderTypeLabel = getOrderTypeLabel(order.order_type);
  const printedAt = ticket.printed_at || ticket.created_at || new Date();

  let kot = '';

  if (settings.storeName) {
    kot += settings.storeName.padStart(Math.floor((width + settings.storeName.length) / 2)).slice(0, width) + '\n';
  }

  kot += 'KITCHEN ORDER TICKET'.padStart(Math.floor((width + 20) / 2)).slice(0, width) + '\n';
  kot += line + '\n';
  kot += `KOT No  : ${ticket.kot_number}\n`;
  kot += `Bill No : ${order.bill_number}\n`;
  kot += `Date    : ${new Date(printedAt).toLocaleDateString()}\n`;
  kot += `Time    : ${new Date(printedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
  kot += `Type    : ${orderTypeLabel}\n`;
  if (tableLabel) {
    kot += `Table   : ${tableLabel}\n`;
  }
  kot += line + '\n\n';
  kot += 'Item'.padEnd(itemWidth) + 'Qty'.padStart(qtyWidth) + '\n';
  kot += line + '\n';

  (ticket.items || []).forEach((item) => {
    const wrappedName = wrapText(item.name, itemWidth);
    const qtyText = String(item.quantity).padStart(qtyWidth);

    wrappedName.forEach((lineText, index) => {
      kot += `${lineText.padEnd(itemWidth)}${index === 0 ? qtyText : ' '.repeat(qtyWidth)}\n`;
    });
  });

  kot += '\n' + line + '\n';
  kot += 'No prices on KOT'.padStart(Math.floor((width + 16) / 2)).slice(0, width) + '\n';
  kot += line + '\n\n';

  return kot;
};

module.exports = { generateThermalReceipt, generateKotTicket };
