const textEncoder = new TextEncoder();

const escapeXml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const sanitizeSheetName = (name, index) => {
  const cleaned = String(name || `Sheet${index + 1}`)
    .replace(/[\\/*?:[\]]/g, ' ')
    .trim();

  return (cleaned || `Sheet${index + 1}`).slice(0, 31);
};

const excelSerialDate = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return (date.getTime() - Date.UTC(1899, 11, 30)) / 86400000;
};

const getCellType = (value, explicitType) => {
  if (explicitType === 'DateTime') {
    return 'number';
  }

  if (value === null || value === undefined || value === '') {
    return 'string';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return 'number';
  }

  return 'string';
};

const normalizeCell = (cell) => {
  if (cell && typeof cell === 'object' && !Array.isArray(cell) && Object.prototype.hasOwnProperty.call(cell, 'value')) {
    return cell;
  }

  return { value: cell };
};

const normalizeRow = (row = []) => {
  if (Array.isArray(row)) {
    return { cells: row };
  }

  return row;
};

const columnNumberToName = (columnNumber) => {
  let dividend = columnNumber;
  let columnName = '';

  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
};

const toExcelWidth = (pixels) => {
  if (!pixels || Number.isNaN(Number(pixels))) {
    return 12;
  }

  return Math.max(8, Math.round((Number(pixels) / 7) * 100) / 100);
};

const xmlToBytes = (xml) => textEncoder.encode(xml);

const toUint32LE = (value) => {
  const bytes = new Uint8Array(4);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, value >>> 0, true);
  return bytes;
};

const toUint16LE = (value) => {
  const bytes = new Uint8Array(2);
  const view = new DataView(bytes.buffer);
  view.setUint16(0, value, true);
  return bytes;
};

const concatUint8Arrays = (parts) => {
  const totalLength = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  parts.forEach((part) => {
    result.set(part, offset);
    offset += part.length;
  });

  return result;
};

const createCrc32Table = () => {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i += 1) {
    let crc = i;
    for (let j = 0; j < 8; j += 1) {
      crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
    table[i] = crc >>> 0;
  }

  return table;
};

const CRC32_TABLE = createCrc32Table();

const crc32 = (data) => {
  let crc = 0xffffffff;

  for (let i = 0; i < data.length; i += 1) {
    crc = CRC32_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
};

const getDosDateTime = (date = new Date()) => {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = ((date.getHours() & 0x1f) << 11)
    | ((date.getMinutes() & 0x3f) << 5)
    | Math.floor(date.getSeconds() / 2);
  const dosDate = (((year - 1980) & 0x7f) << 9)
    | (((date.getMonth() + 1) & 0x0f) << 5)
    | (date.getDate() & 0x1f);

  return { dosDate, dosTime };
};

const createZip = (entries) => {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  entries.forEach((entry) => {
    const nameBytes = textEncoder.encode(entry.name);
    const data = entry.data;
    const crc = crc32(data);
    const { dosDate, dosTime } = getDosDateTime(new Date());

    const localHeader = concatUint8Arrays([
      toUint32LE(0x04034b50),
      toUint16LE(20),
      toUint16LE(0),
      toUint16LE(0),
      toUint16LE(dosTime),
      toUint16LE(dosDate),
      toUint32LE(crc),
      toUint32LE(data.length),
      toUint32LE(data.length),
      toUint16LE(nameBytes.length),
      toUint16LE(0),
      nameBytes,
    ]);

    localParts.push(localHeader, data);

    const centralHeader = concatUint8Arrays([
      toUint32LE(0x02014b50),
      toUint16LE(20),
      toUint16LE(20),
      toUint16LE(0),
      toUint16LE(0),
      toUint16LE(dosTime),
      toUint16LE(dosDate),
      toUint32LE(crc),
      toUint32LE(data.length),
      toUint32LE(data.length),
      toUint16LE(nameBytes.length),
      toUint16LE(0),
      toUint16LE(0),
      toUint16LE(0),
      toUint16LE(0),
      toUint32LE(0),
      toUint32LE(offset),
      nameBytes,
    ]);

    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  });

  const centralDirectory = concatUint8Arrays(centralParts);
  const endOfCentralDirectory = concatUint8Arrays([
    toUint32LE(0x06054b50),
    toUint16LE(0),
    toUint16LE(0),
    toUint16LE(entries.length),
    toUint16LE(entries.length),
    toUint32LE(centralDirectory.length),
    toUint32LE(offset),
    toUint16LE(0),
  ]);

  return concatUint8Arrays([
    ...localParts,
    centralDirectory,
    endOfCentralDirectory,
  ]);
};

const STYLE_INDEX = {
  default: 0,
  title: 1,
  section: 2,
  header: 3,
  textBold: 4,
  currency: 5,
  integer: 6,
  date: 7,
  totalLabel: 8,
  totalCurrency: 9,
};

const buildStylesXml = () => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="2">
    <numFmt numFmtId="164" formatCode="&quot;Rs. &quot;#,##0.00"/>
    <numFmt numFmtId="165" formatCode="dd-mmm-yyyy hh:mm"/>
  </numFmts>
  <fonts count="4">
    <font>
      <sz val="11"/>
      <name val="Calibri"/>
    </font>
    <font>
      <b/>
      <sz val="14"/>
      <name val="Calibri"/>
    </font>
    <font>
      <b/>
      <color rgb="FFFFFFFF"/>
      <sz val="11"/>
      <name val="Calibri"/>
    </font>
    <font>
      <b/>
      <sz val="11"/>
      <name val="Calibri"/>
    </font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill>
      <patternFill patternType="solid">
        <fgColor rgb="FFEAF2FF"/>
        <bgColor indexed="64"/>
      </patternFill>
    </fill>
    <fill>
      <patternFill patternType="solid">
        <fgColor rgb="FF1F4E78"/>
        <bgColor indexed="64"/>
      </patternFill>
    </fill>
    <fill>
      <patternFill patternType="solid">
        <fgColor rgb="FFF3F4F6"/>
        <bgColor indexed="64"/>
      </patternFill>
    </fill>
  </fills>
  <borders count="1">
    <border>
      <left/>
      <right/>
      <top/>
      <bottom/>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="10">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1">
      <alignment vertical="center"/>
    </xf>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="1" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
    <xf numFmtId="164" fontId="3" fillId="4" borderId="0" xfId="0" applyFont="1" applyFill="1" applyNumberFormat="1"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>`;

const buildCellXml = (cell, rowIndex, columnIndex) => {
  const normalized = normalizeCell(cell);
  const cellRef = `${columnNumberToName(columnIndex)}${rowIndex}`;
  const styleIndex = STYLE_INDEX[normalized.style] ?? STYLE_INDEX.default;
  const type = getCellType(normalized.value, normalized.type);

  if (type === 'number') {
    const numericValue = normalized.type === 'DateTime'
      ? excelSerialDate(normalized.value)
      : Number(normalized.value);

    if (!Number.isFinite(numericValue)) {
      return `<c r="${cellRef}" s="${styleIndex}" t="inlineStr"><is><t></t></is></c>`;
    }

    return `<c r="${cellRef}" s="${styleIndex}"><v>${numericValue}</v></c>`;
  }

  const stringValue = escapeXml(normalized.value);
  const preserve = /^\s|\s$/.test(String(normalized.value ?? '')) ? ' xml:space="preserve"' : '';
  return `<c r="${cellRef}" s="${styleIndex}" t="inlineStr"><is><t${preserve}>${stringValue}</t></is></c>`;
};

const buildRowXml = (row = [], rowIndex) => {
  const normalized = normalizeRow(row);
  const cells = normalized.cells || [];

  if (cells.length === 0) {
    return `<row r="${rowIndex}"/>`;
  }

  const cellXml = cells.map((cell, index) => buildCellXml(cell, rowIndex, index + 1)).join('');
  return `<row r="${rowIndex}">${cellXml}</row>`;
};

const buildWorksheetXml = (sheet, index) => {
  const rows = sheet.rows || [];
  const columns = sheet.columns || [];
  const maxColumns = Math.max(
    columns.length,
    ...rows.map((row) => (normalizeRow(row).cells || []).length),
    1
  );
  const lastCell = `${columnNumberToName(maxColumns)}${Math.max(rows.length, 1)}`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:${lastCell}"/>
  <sheetViews>
    <sheetView workbookViewId="0"/>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  ${columns.length > 0 ? `<cols>${columns.map((width, columnIndex) => `<col min="${columnIndex + 1}" max="${columnIndex + 1}" width="${toExcelWidth(width)}" customWidth="1"/>`).join('')}</cols>` : ''}
  <sheetData>${rows.map((row, rowIndex) => buildRowXml(row, rowIndex + 1)).join('')}</sheetData>
</worksheet>`;
};

const buildWorkbookXml = (sheets) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheets.map((sheet, index) => `<sheet name="${escapeXml(sanitizeSheetName(sheet.name, index))}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('')}
  </sheets>
</workbook>`;

const buildWorkbookRelsXml = (sheets) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheets.map((sheet, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('')}
  <Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const buildRootRelsXml = () => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

const buildContentTypesXml = (sheets) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheets.map((sheet, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}
</Types>`;

const buildXlsxEntries = (sheets) => {
  const entries = [
    { name: '[Content_Types].xml', data: xmlToBytes(buildContentTypesXml(sheets)) },
    { name: '_rels/.rels', data: xmlToBytes(buildRootRelsXml()) },
    { name: 'xl/workbook.xml', data: xmlToBytes(buildWorkbookXml(sheets)) },
    { name: 'xl/_rels/workbook.xml.rels', data: xmlToBytes(buildWorkbookRelsXml(sheets)) },
    { name: 'xl/styles.xml', data: xmlToBytes(buildStylesXml()) },
  ];

  sheets.forEach((sheet, index) => {
    entries.push({
      name: `xl/worksheets/sheet${index + 1}.xml`,
      data: xmlToBytes(buildWorksheetXml(sheet, index)),
    });
  });

  return entries;
};

export const downloadExcelWorkbook = (filename, sheets) => {
  if (!Array.isArray(sheets) || sheets.length === 0) {
    return;
  }

  const zipBytes = createZip(buildXlsxEntries(sheets));
  const blob = new Blob([zipBytes], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeFilename = filename.endsWith('.xlsx')
    ? filename
    : filename.replace(/\.xls$/i, '.xlsx') || 'report.xlsx';

  link.href = url;
  link.download = safeFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
