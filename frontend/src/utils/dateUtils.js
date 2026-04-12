export const parseDateStr = (str) => {
  if (!str) return null;
  // Handle ISO strings by taking only the date part
  const datePart = typeof str === 'string' ? str.split('T')[0] : str;
  if (typeof datePart !== 'string') return null;
  
  const parts = datePart.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d);
};

export const formatDateStr = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
