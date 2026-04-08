// PDF Report Generation using html2pdf
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

const createReportHTML = (report, reportType) => {
  const div = document.createElement('div');
  div.style.padding = '20px';
  div.style.fontFamily = 'Arial, sans-serif';
  div.style.lineHeight = '1.6';
  div.style.color = '#333';

  // Header
  const header = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
      <h1 style="margin: 0; color: #2c3e50;">Restaurant POS Report</h1>
      <p style="margin: 5px 0; color: #666;">
        ${reportType === 'daily' 
          ? `Daily Report - ${report.date}` 
          : `Report: ${report.startDate} to ${report.endDate}`
        }
      </p>
      <p style="margin: 5px 0; color: #999; font-size: 12px;">Generated: ${new Date().toLocaleString()}</p>
    </div>
  `;

  // Summary Cards
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
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹ ${parseFloat(report.totalSales).toFixed(2)}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Tax</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹ ${parseFloat(report.totalTax).toFixed(2)}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Discount</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹ ${parseFloat(report.totalDiscount).toFixed(2)}</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Avg Order Value</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹ ${parseFloat(report.averageOrderValue).toFixed(2)}</td>
        </tr>
      </table>
    </div>
  `;

  // Hourly Breakdown
  let hourlyHTML = '';
  if (report.hourlyBreakdown && report.hourlyBreakdown.length > 0) {
    const hourlyTable = report.hourlyBreakdown.map(hour => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${String(hour.hour).padStart(2, '0')}:00</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${hour.orderCount}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${hour.paidCount}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${hour.sales.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${hour.tax.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${hour.discount.toFixed(2)}</td>
      </tr>
    `).join('');

    hourlyHTML = `
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px;">⏰ Hourly Breakdown</h2>
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

  // Top Items
  let topItemsHTML = '';
  if (report.topItems && report.topItems.length > 0) {
    const topTable = report.topItems.map((item, idx) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${idx + 1}. ${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${item.revenue.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${item.avgPrice.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.orderCount}</td>
      </tr>
    `).join('');

    topItemsHTML = `
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">🏆 Top Selling Items</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
          <thead>
            <tr style="background-color: #27ae60; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item Name</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Qty</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Revenue</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Avg Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Orders</th>
            </tr>
          </thead>
          <tbody>${topTable}</tbody>
        </table>
      </div>
    `;
  }

  // Bottom Items
  let bottomItemsHTML = '';
  if (report.bottomItems && report.bottomItems.length > 0) {
    const bottomTable = report.bottomItems.map((item, idx) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">↓${idx + 1}. ${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${item.revenue.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${item.avgPrice.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.orderCount}</td>
      </tr>
    `).join('');

    bottomItemsHTML = `
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">📉 Bottom Selling Items</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
          <thead>
            <tr style="background-color: #e74c3c; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item Name</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Qty</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Revenue</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Avg Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Orders</th>
            </tr>
          </thead>
          <tbody>${bottomTable}</tbody>
        </table>
      </div>
    `;
  }

  // Payment Breakdown
  const paymentTable = Object.entries(report.paymentByMethod || {}).map(([method, amount]) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${method}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹ ${parseFloat(amount).toFixed(2)}</td>
    </tr>
  `).join('');

  const payment = `
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">💳 Payment Breakdown</h2>
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

  // Footer
  const footer = `
    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 5px 0;">This is a computer-generated report from Restaurant POS System</p>
      <p style="margin: 5px 0;">For verification purposes only</p>
    </div>
  `;

  div.innerHTML = header + summary + hourlyHTML + topItemsHTML + bottomItemsHTML + payment + footer;
  return div;
};
