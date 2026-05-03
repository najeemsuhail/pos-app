import React from 'react';

const formatInputDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseInputDate = (value) => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const DatePicker = ({
  selected,
  onChange,
  className,
  placeholderText,
  dateFormat: _dateFormat,
  ...props
}) => (
  <input
    {...props}
    type="date"
    className={className}
    value={formatInputDate(selected)}
    placeholder={placeholderText}
    onChange={(event) => onChange(parseInputDate(event.target.value), event)}
  />
);

export default DatePicker;
