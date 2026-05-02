import html2pdf from 'html2pdf.js';

export const generatePDF = (report, reportType) => {
  const element = createReportHTML(report, reportType);

  const opt = {
    margin: 10,
    filename: `POS-Report-${reportType === 'daily' ? report.date : `${report.startDate}-to-${report.endDate}`}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(opt).from(element).save();
};

const money = (value) => `Rs. ${parseFloat(value || 0).toFixed(2)}`;
const orderTypeLabels = {
  dine_in: 'Dine-in/Table',
  takeaway: 'Takeaway',
  delivery: 'Delivery',
  online: 'Online',
  pickup: 'Pickup',
};

const getOrderTypeBreakdown = (orders = []) => {
  const totals = orders.reduce((acc, order) => {
    const orderType = order.order_type || order.orderType || 'dine_in';
    const existing = acc[orderType] || {
      type: orderType,
      label: orderTypeLabels[orderType] || 'Order',
      orders: 0,
      paidOrders: 0,
      totalAmount: 0,
    };

    existing.orders += 1;
    existing.totalAmount += Number(order.final_amount || 0);

    if (order.payment_status === 'paid' || order.status === 'paid' || order.status === 'completed') {
      existing.paidOrders += 1;
    }

    acc[orderType] = existing;
    return acc;
  }, {});

  return ['dine_in', 'takeaway', 'delivery', 'online', 'pickup']
    .map((type) => totals[type])
    .filter(Boolean);
};

const createReportHTML = (report, reportType) => {
  const div = document.createElement('div');
  div.style.padding = '20px';
  div.style.fontFamily = 'Arial, sans-serif';
  div.style.lineHeight = '1.6';
  div.style.color = '#333';

  const header = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
      <h1 style="margin: 0; color: #2c3e50;">Chewbiecafe Report</h1>
      <p style="margin: 5px 0; color: #666;">
        ${reportType === 'daily' ? `Daily Report - ${report.date}` : `Report: ${report.startDate} to ${report.endDate}`}
      </p>
      <p style="margin: 5px 0; color: #999; font-size: 12px;">Generated: ${new Date().toLocaleString()}</p>
    </div>
  `;

  const summary = `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Summary</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Orders</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${report.totalOrders}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Paid Orders</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${report.paidOrders}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Sales</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.totalSales)}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Tax</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.totalTax)}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Discount</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.totalDiscount)}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Avg Order Value</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.averageOrderValue)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Expenses</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.totalExpenses)}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Net After Expenses</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${money(report.netSalesAfterExpenses)}</td>
        </tr>
      </table>
    </div>
  `;

  const orderTypeBreakdown = getOrderTypeBreakdown(report.orders || []);
  const orderTypeRows = orderTypeBreakdown.map((entry) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>${entry.label}</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${entry.orders}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${entry.paidOrders}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(entry.totalAmount)}</td>
    </tr>
  `).join('');

  const orderTypes = orderTypeBreakdown.length > 0 ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Order Type Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background-color: #667eea; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Order Type</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Orders</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Paid Orders</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total Amount</th>
          </tr>
        </thead>
        <tbody>${orderTypeRows}</tbody>
      </table>
    </div>
  ` : '';

  const profitLoss = report.profitLoss ? `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Profit And Loss Summary</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background-color: #16a34a; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Metric</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Gross Revenue</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(report.profitLoss.grossRevenue)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Discounts Given</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(report.profitLoss.discountsGiven)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Net Revenue</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(report.profitLoss.netRevenue)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Tax Collected</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(report.profitLoss.taxCollected)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Operating Expenses</td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(report.profitLoss.operatingExpenses)}</td></tr>
          <tr style="background-color: #f5f5f5;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>${report.profitLoss.profitStatus === 'profit' ? 'Operating Profit' : 'Operating Loss'}</strong></td><td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>${money(report.profitLoss.operatingProfit)}</strong></td></tr>
        </tbody>
      </table>
    </div>
  ` : '';

  let hourlyHTML = '';
  if (report.hourlyBreakdown && report.hourlyBreakdown.length > 0) {
    const hourlyTable = report.hourlyBreakdown.map((hour) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${String(hour.hour).padStart(2, '0')}:00</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${hour.orderCount}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${hour.paidCount}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(hour.sales)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(hour.tax)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(hour.discount)}</td>
      </tr>
    `).join('');

    hourlyHTML = `
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Hourly Breakdown</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
          <thead>
            <tr style="background-color: #667eea; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Hour</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Orders</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Paid</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Sales</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Tax</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Discount</th>
            </tr>
          </thead>
          <tbody>${hourlyTable}</tbody>
        </table>
      </div>
    `;
  }

  let allItemsHTML = '';
  if (report.allItems && report.allItems.length > 0) {
    const totalQty = report.allItems.reduce((s, i) => s + i.quantity, 0);
    const totalRev = report.allItems.reduce((s, i) => s + i.revenue, 0);

    const allTable = report.allItems.map((item, idx) => `
      <tr style="${idx % 2 === 0 ? 'background-color: #f9f9f9;' : ''}">
        <td style="padding: 7px; border: 1px solid #ddd;">${idx + 1}</td>
        <td style="padding: 7px; border: 1px solid #ddd;"><strong>${item.name}</strong></td>
        <td style="padding: 7px; border: 1px solid #ddd;">${item.category || 'Uncategorized'}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${item.quantity}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${money(item.revenue)}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${money(item.avgPrice)}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${item.orderCount}</td>
      </tr>
    `).join('');

    allItemsHTML = `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #8e44ad; padding-bottom: 10px;">All Items Sold (${report.allItems.length} items)</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
          <thead>
            <tr style="background-color: #8e44ad; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">#</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item Name</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Category</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Qty Sold</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Revenue</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Avg Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Orders</th>
            </tr>
          </thead>
          <tbody>${allTable}</tbody>
          <tfoot>
            <tr style="background-color: #f0e8f8; font-weight: bold;">
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Total</td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${totalQty}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(totalRev)}</td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }

  let categorySalesHTML = '';
  if (report.categorySales && report.categorySales.length > 0) {
    const totalQty = report.categorySales.reduce((s, c) => s + Number(c.quantity || 0), 0);
    const totalRev = report.categorySales.reduce((s, c) => s + Number(c.revenue || 0), 0);

    const categoryTable = report.categorySales.map((category, idx) => `
      <tr style="${idx % 2 === 0 ? 'background-color: #f9f9f9;' : ''}">
        <td style="padding: 7px; border: 1px solid #ddd;"><strong>${category.category}</strong></td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${category.itemCount}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${category.quantity}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${money(category.revenue)}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${money(category.avgPrice)}</td>
        <td style="padding: 7px; border: 1px solid #ddd; text-align: right;">${category.orderCount}</td>
      </tr>
    `).join('');

    categorySalesHTML = `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #0f766e; padding-bottom: 10px;">Category Sales Report (${report.categorySales.length} categories)</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
          <thead>
            <tr style="background-color: #0f766e; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Category</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Items</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Qty Sold</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Revenue</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Avg Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Orders</th>
            </tr>
          </thead>
          <tbody>${categoryTable}</tbody>
          <tfoot>
            <tr style="background-color: #e6f4f1; font-weight: bold;">
              <td style="padding: 8px; border: 1px solid #ddd;">Total</td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${totalQty}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(totalRev)}</td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
              <td style="padding: 8px; border: 1px solid #ddd;"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }


  const paymentTable = Object.entries(report.paymentByMethod || {}).map(([method, amount]) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${method}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${money(amount)}</td>
    </tr>
  `).join('');

  const payment = `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Payment Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background-color: #3498db; color: white;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Payment Method</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>${paymentTable}</tbody>
      </table>
    </div>
  `;

  const footer = `
    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 5px 0;">This is a computer-generated report from Chewbiecafe System</p>
      <p style="margin: 5px 0;">For verification purposes only</p>
    </div>
  `;

  div.innerHTML = header + summary + orderTypes + profitLoss + hourlyHTML + allItemsHTML + categorySalesHTML + payment + footer;
  return div;
};
