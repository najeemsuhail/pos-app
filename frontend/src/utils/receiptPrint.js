function escapeReceiptLine(line) {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;');
}

function getReceiptLineClassName(line) {
  const trimmed = line.trim();

  if (!trimmed) {
    return 'receipt-line spacer';
  }

  if (/^=+$/.test(trimmed)) {
    return 'receipt-line separator';
  }

  if (trimmed === 'PAYMENT BREAKDOWN') {
    return 'receipt-line section-title';
  }

  if (trimmed === 'KITCHEN ORDER TICKET') {
    return 'receipt-line section-title';
  }

  if (trimmed.startsWith('TOTAL:')) {
    return 'receipt-line total';
  }

  if (/^(Subtotal:|Discount:|Tax \([^)]+\):)/.test(trimmed)) {
    return 'receipt-line summary';
  }

  if (/^(KOT No|Bill No|Date|Time|Table|Customer|Phone|Order|Payment|Type)\s*:/.test(trimmed)) {
    return 'receipt-line meta';
  }

  if (trimmed === 'Thank you! Please visit again.') {
    return 'receipt-line footer';
  }

  if (/^Item\s+Qty\s+Amount$/.test(trimmed)) {
    return 'receipt-line header-row';
  }

  return 'receipt-line';
}

function getReceiptLineDisplayText(line) {
  const trimmed = line.trim();

  if (trimmed === 'Thank you! Please visit again.') {
    return trimmed;
  }

  return line;
}

function withTimeout(promise, timeoutMs, message) {
  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function requiresVisiblePrintDialog(printerName) {
  return /pdf|xps|onenote|document writer/i.test(printerName || '');
}

export function buildReceiptPrintHtml(receipt, documentLabel = 'Receipt') {
  const receiptLines = receipt
    .split('\n')
    .filter((line, index, list) => !(line === '' && list[index - 1] === ''));

  const receiptMarkup = receiptLines
    .map((line) => {
      const className = getReceiptLineClassName(line);
      const safeLine = escapeReceiptLine(getReceiptLineDisplayText(line));
      return `<div class="${className}">${safeLine || '&nbsp;'}</div>`;
    })
    .join('');

  return `
    <html>
      <head>
        <title>Print ${documentLabel}</title>
        <style>
          @media print {
            body { margin: 0; }
            .print-shell { box-shadow: none; border: none; }
            .print-actions { display: none; }
          }
          body {
            margin: 0;
            padding: 16px;
            background: #f3f4f6;
            font-family: Arial, sans-serif;
            color: #111827;
          }
          .print-actions {
            max-width: 340px;
            margin: 0 auto 12px;
            display: flex;
            gap: 8px;
            justify-content: flex-end;
          }
          .print-actions button {
            border: 0;
            border-radius: 8px;
            padding: 9px 14px;
            font: 700 13px Arial, sans-serif;
            cursor: pointer;
          }
          .print-actions .primary {
            background: #111827;
            color: #ffffff;
          }
          .print-actions .secondary {
            background: #e5e7eb;
            color: #111827;
          }
          .print-shell {
            max-width: 340px;
            margin: 0 auto;
            padding: 14px;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          .receipt-paper {
            padding: 14px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: #fffef9;
          }
          .receipt-line {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            line-height: 1.28;
            font-weight: 600;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }
          .receipt-line.separator { color: #6b7280; }
          .receipt-line.header-row,
          .receipt-line.section-title,
          .receipt-line.footer,
          .receipt-line.total { font-weight: 800; }
          .receipt-line.footer {
            text-align: center;
            display: block;
            width: 100%;
            white-space: normal;
          }
          .receipt-line.total { font-size: 12px; }
        </style>
        <script>
          async function printReceiptPreview() {
            if (window.posDesktop && window.posDesktop.printCurrentWindow) {
              const result = await window.posDesktop.printCurrentWindow();
              if (!result || !result.success) {
                window.alert(result && result.errorType ? result.errorType : 'Printing failed');
              }
              return;
            }

            window.print();
          }

          async function saveReceiptPdf() {
            if (!window.posDesktop || !window.posDesktop.saveCurrentWindowPdf) {
              window.alert('Save PDF is available only in the desktop app');
              return;
            }

            const result = await window.posDesktop.saveCurrentWindowPdf();
            if (result && result.success) {
              return;
            }

            if (result && (result.errorType === 'cancelled' || result.errorType === 'canceled')) {
              return;
            }

            window.alert(result && result.errorType ? result.errorType : 'Unable to save PDF');
          }

          function closeReceiptPreview() {
            if (window.posDesktop && window.posDesktop.closeCurrentWindow) {
              window.posDesktop.closeCurrentWindow();
              return;
            }

            window.close();
          }
        </script>
      </head>
      <body>
        <div class="print-actions">
          <button class="secondary" type="button" onclick="closeReceiptPreview()">Close</button>
          <button class="secondary" type="button" onclick="saveReceiptPdf()">Save PDF</button>
          <button class="primary" type="button" onclick="printReceiptPreview()">Print</button>
        </div>
        <div class="print-shell">
          <div class="receipt-paper">${receiptMarkup}</div>
        </div>
      </body>
    </html>
  `;
}

export async function printReceiptContent(receipt, documentLabel = 'Receipt') {
  const htmlContent = buildReceiptPrintHtml(receipt, documentLabel);

  if (window.posDesktop && window.posDesktop.printReceipt) {
    const printerName = localStorage.getItem('receiptPrinter') || 'browser-default';
    const usesVisibleDialog = printerName === 'browser-default' || requiresVisiblePrintDialog(printerName);
    const result = await withTimeout(
      window.posDesktop.printReceipt(htmlContent, printerName),
      usesVisibleDialog ? 120000 : 25000,
      usesVisibleDialog
        ? 'Print dialog timed out'
        : 'Printer did not respond within 25 seconds'
    );

    if (!result.success) {
      if (result.errorType === 'cancelled' || result.errorType === 'canceled') {
        return;
      }

      throw new Error(result.errorType || 'Printing failed');
    }

    return;
  }

  const existingIframe = document.getElementById('print-iframe');
  if (existingIframe) {
    existingIframe.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  const cleanup = () => {
    window.setTimeout(() => {
      if (iframe.parentNode) {
        iframe.remove();
      }
    }, 100);
  };

  await new Promise((resolve, reject) => {
    iframe.onload = resolve;
    iframe.onerror = () => reject(new Error('Print preview failed to load'));
    iframe.srcdoc = htmlContent;
    document.body.appendChild(iframe);
  });

  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    const printWindow = iframe.contentWindow;
    if (!printWindow) {
      throw new Error('Print preview is not available');
    }

    printWindow.onafterprint = cleanup;
    printWindow.focus();
    printWindow.print();
    window.setTimeout(cleanup, 1000);
  } catch (error) {
    cleanup();
    throw error;
  }
}
