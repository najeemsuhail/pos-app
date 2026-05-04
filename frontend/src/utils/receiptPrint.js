function escapeReceiptLine(line) {
  return line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;');
}

function getReceiptLineClassName(line) {
  const trimmed = line.trim();

  if (!trimmed) return 'receipt-line spacer';
  if (/^=+$/.test(trimmed)) return 'receipt-line separator';
  if (trimmed === 'PAYMENT BREAKDOWN') return 'receipt-line section-title';
  if (trimmed === 'KITCHEN ORDER TICKET') return 'receipt-line section-title';
  if (trimmed.startsWith('TOTAL:')) return 'receipt-line total';
  if (/^(Subtotal:|Discount:|Tax \([^)]+\):)/.test(trimmed)) return 'receipt-line summary';
  if (/^(KOT No|Bill No|Date|Time|Table|Customer|Phone|Order|Payment|Type|Hours)\s*:/.test(trimmed)) {
    return 'receipt-line meta';
  }
  if (trimmed === 'Thank you! Please visit again.') return 'receipt-line footer';
  if (/^Item\s+Qty\s+Amount$/.test(trimmed)) return 'receipt-line header-row';

  return 'receipt-line';
}

function getReceiptLineDisplayText(line) {
  const trimmed = line.trim();
  if (trimmed === 'Thank you! Please visit again.') return trimmed;
  return line;
}

function withTimeout(promise, timeoutMs, message) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function isCancelledPrint(result) {
  return result?.errorType === 'cancelled' || result?.errorType === 'canceled';
}

function requiresVisiblePrintDialog(printerName) {
  return /pdf|xps|onenote|document writer/i.test(printerName || '');
}

function getReceiptPrinterSetting() {
  return localStorage.getItem('receiptPrinter') || 'browser-default';
}

function clearReceiptPrinterSetting() {
  localStorage.removeItem('receiptPrinter');
}

function isDesktopPrintAvailable() {
  return window.posDesktop && typeof window.posDesktop.printReceipt === 'function';
}

function openBrowserPrintDialog(htmlContent) {
  const popup = window.open('', '_blank', 'width=430,height=760');

  if (!popup) {
    throw new Error('Print window was blocked');
  }

  const printScript = `
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () {
          window.focus();
          window.print();
        }, 500);
      });
    </script>
  `;
  const printableHtml = htmlContent.replace('</body>', `${printScript}</body>`);

  popup.document.open();
  popup.document.write(`<!doctype html>${printableHtml}`);
  popup.document.close();
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
          }
          body {
            margin: 0;
            padding: 16px;
            background: #f3f4f6;
            font-family: Arial, sans-serif;
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
      </head>
      <body>
        <div class="print-shell">
          <div class="receipt-paper">${receiptMarkup}</div>
        </div>
      </body>
    </html>
  `;
}

export async function printReceiptContent(receipt, documentLabel = 'Receipt') {
  let printerName = getReceiptPrinterSetting();
  const htmlContent = buildReceiptPrintHtml(receipt, documentLabel);
  const isDesktopApp = isDesktopPrintAvailable();

  if (window.posDesktop?.getPrinters && printerName !== 'browser-default') {
    try {
      const availablePrinters = await window.posDesktop.getPrinters();
      const printerExists = availablePrinters.some((printer) => printer.name === printerName);

      if (!printerExists) {
        console.warn(`Printer "${printerName}" not found. Using print dialog.`);
        clearReceiptPrinterSetting();
        printerName = 'browser-default';
      }
    } catch (err) {
      console.error('Error detecting printers:', err);
      printerName = 'browser-default';
    }
  }

  const usesSilentPrinter = printerName !== 'browser-default' && !requiresVisiblePrintDialog(printerName);

  if (isDesktopApp) {
    try {
      const result = await withTimeout(
        window.posDesktop.printReceipt(htmlContent, printerName),
        usesSilentPrinter ? 25000 : 125000,
        usesSilentPrinter
          ? 'Printer did not respond within 25 seconds'
          : 'Print dialog did not respond within 125 seconds'
      );

      if (result.success || isCancelledPrint(result)) return;

      console.warn('Desktop printing failed:', result.errorType);

      if (usesSilentPrinter) {
        printerName = 'browser-default';
      } else {
        throw new Error(result.errorType || 'Print dialog failed');
      }
    } catch (err) {
      console.error('Desktop print error:', err.message);

      if (!usesSilentPrinter) {
        throw err;
      }
    }
  }

  if (!usesSilentPrinter) {
    openBrowserPrintDialog(htmlContent);
    return;
  }

  const existingIframe = document.getElementById('print-iframe');
  if (existingIframe) existingIframe.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.top = '-9999px';
  iframe.style.width = '800px';
  iframe.style.height = '600px';
  iframe.style.border = '0';

  const cleanup = () => {
    window.setTimeout(() => {
      if (iframe.parentNode) iframe.remove();
    }, 3000);
  };

  await new Promise((resolve, reject) => {
    iframe.onload = async () => {
      try {
        await iframe.contentDocument.fonts.ready;
      } catch (_) {
        await new Promise((r) => setTimeout(r, 800));
      }
      resolve();
    };
    iframe.onerror = () => reject(new Error('Print preview failed to load'));
    iframe.srcdoc = htmlContent;
    document.body.appendChild(iframe);
  });

  try {
    const printWindow = iframe.contentWindow;
    if (!printWindow) throw new Error('Print preview is not available');

    printWindow.onafterprint = cleanup;

    try {
      printWindow.focus();
    } catch (_) {}

    printWindow.print();
    window.setTimeout(cleanup, 3000);
  } catch (error) {
    cleanup();
    throw error;
  }
}
