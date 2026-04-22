const RECEIPT_LOGO_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="28" fill="#1F2937"/>
  <path d="M34 43C34 35.8203 39.8203 30 47 30H83C90.1797 30 96 35.8203 96 43V51C96 58.1797 90.1797 64 83 64H47C39.8203 64 34 58.1797 34 51V43Z" fill="#F59E0B"/>
  <path d="M40 71C40 59.9543 48.9543 51 60 51H78C86.8366 51 94 58.1634 94 67V68C94 76.8366 86.8366 84 78 84H60C48.9543 84 40 75.0457 40 64V71Z" fill="#F9FAFB"/>
  <path d="M86 46C91.5228 46 96 50.4772 96 56C96 61.5228 91.5228 66 86 66V46Z" fill="#FDE68A"/>
  <circle cx="53" cy="41" r="4" fill="#1F2937"/>
  <circle cx="65" cy="41" r="4" fill="#1F2937"/>
  <circle cx="77" cy="41" r="4" fill="#1F2937"/>
  <path d="M56 92H80" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
  <path d="M50 102H86" stroke="#F9FAFB" stroke-width="8" stroke-linecap="round"/>
</svg>
`)}`;

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

  if (trimmed.startsWith('TOTAL:')) {
    return 'receipt-line total';
  }

  if (/^(Subtotal:|Discount:|Tax \([^)]+\):)/.test(trimmed)) {
    return 'receipt-line summary';
  }

  if (/^(Bill No|Date|Time|Table|Customer|Phone|Order|Payment)\s*:/.test(trimmed)) {
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

export function buildReceiptPrintHtml(receipt) {
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
        <title>Print Receipt</title>
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
          .print-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 12px;
            text-align: center;
          }
          .print-logo-frame {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            border: 1px solid rgba(17, 24, 39, 0.08);
            box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
            overflow: hidden;
            flex: 0 0 auto;
          }
          .print-brand img {
            width: 66px;
            height: 66px;
            object-fit: contain;
            transform: scale(1.16);
          }
          .print-brand strong {
            display: block;
            font-size: 16px;
            font-weight: 800;
          }
          .print-brand span {
            font-size: 10px;
            color: #6b7280;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
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
          <div class="print-brand">
            <div class="print-logo-frame">
              <img src="${RECEIPT_LOGO_DATA_URI}" alt="Chewbie Cafe logo" />
            </div>
            <div>
              <strong>Chewbie Cafe</strong>
              <span>Receipt</span>
            </div>
          </div>
          <div class="receipt-paper">${receiptMarkup}</div>
        </div>
      </body>
    </html>
  `;
}

export async function printReceiptContent(receipt) {
  const htmlContent = buildReceiptPrintHtml(receipt);

  if (window.posDesktop && window.posDesktop.printReceipt) {
    const printerName = localStorage.getItem('receiptPrinter') || 'browser-default';
    const result = await window.posDesktop.printReceipt(htmlContent, printerName);

    if (!result.success) {
      throw new Error(result.errorType || 'Printing failed');
    }

    return;
  }

  let iframe = document.getElementById('print-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'print-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  await new Promise((resolve) => setTimeout(resolve, 250));
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
}
