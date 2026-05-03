import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from '../DatePicker';
import { parseDateStr, formatDateStr } from '../../utils/dateUtils';
import { shiftService } from '../../services/api';

const today = () => new Date().toISOString().split('T')[0];
const money = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;
const formatDateTime = (value) => (value ? new Date(value).toLocaleString() : '-');

const ShiftManagementTab = () => {
  const [openShift, setOpenShift] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(today());
  const [openingCash, setOpeningCash] = useState('');
  const [closingCash, setClosingCash] = useState('');
  const [openingNotes, setOpeningNotes] = useState('');
  const [closingNotes, setClosingNotes] = useState('');
  const [closePreview, setClosePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadShifts = useCallback(async () => {
    const [openResponse, historyResponse] = await Promise.all([
      shiftService.getOpen(),
      shiftService.getAll(startDate, endDate),
    ]);

    setOpenShift(openResponse.data.shift);
    setShifts(historyResponse.data || []);
  }, [startDate, endDate]);

  useEffect(() => {
    setLoading(true);
    setError('');
    loadShifts()
      .catch((err) => setError(err.response?.data?.error || 'Failed to load shifts'))
      .finally(() => setLoading(false));
  }, [loadShifts]);

  const handleOpenShift = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await shiftService.open({
        openingCash: Number(openingCash || 0),
        openingNotes,
      });
      setOpenShift(response.data);
      setOpeningCash('');
      setOpeningNotes('');
      setSuccess('Shift opened successfully.');
      await loadShifts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to open shift');
    } finally {
      setLoading(false);
    }
  };

  const loadClosePreview = async () => {
    if (!openShift) return;

    setLoading(true);
    setError('');

    try {
      const response = await shiftService.getClosePreview(openShift.id);
      setClosePreview(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate shift totals');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseShift = async (event) => {
    event.preventDefault();
    if (!openShift) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await shiftService.close(openShift.id, {
        closingCash: Number(closingCash || 0),
        closingNotes,
      });
      setOpenShift(null);
      setClosePreview(null);
      setClosingCash('');
      setClosingNotes('');
      setSuccess('Shift closed successfully.');
      await loadShifts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to close shift');
    } finally {
      setLoading(false);
    }
  };

  const previewTotals = closePreview?.totals || {};
  const expectedCash = closePreview?.expectedCash ?? (
    openShift ? Number(openShift.opening_cash || 0) + Number(previewTotals.cashTotal || 0) : 0
  );
  const cashDifference = closingCash === '' ? null : Number(closingCash || 0) - Number(expectedCash || 0);

  return (
    <div className="admin-tab-content">
      <h2>Shift Management</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      {loading && <div className="loading">Loading shifts...</div>}

      <div className="section-container">
        <h3>{openShift ? 'Open Shift' : 'Open New Shift'}</h3>

        {openShift ? (
          <>
            <div className="report-grid">
              <div className="report-card">
                <h4>Opened By</h4>
                <p className="report-value">{openShift.opened_by?.name || '-'}</p>
              </div>
              <div className="report-card">
                <h4>Opened At</h4>
                <p className="report-value" style={{ fontSize: '18px' }}>{formatDateTime(openShift.opened_at)}</p>
              </div>
              <div className="report-card">
                <h4>Opening Cash</h4>
                <p className="report-value">{money(openShift.opening_cash)}</p>
              </div>
            </div>

            <form onSubmit={handleCloseShift} className="shift-close-panel">
              <div className="shift-close-fields">
                <div>
                  <label>Closing Cash</label>
                  <input
                    className="date-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={closingCash}
                    onChange={(event) => setClosingCash(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Close Notes</label>
                  <input
                    className="date-input"
                    type="text"
                    value={closingNotes}
                    onChange={(event) => setClosingNotes(event.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="shift-close-summary">
                <div>
                  <span>Expected Cash</span>
                  <strong>{closePreview ? money(expectedCash) : '-'}</strong>
                </div>
                <div>
                  <span>Difference</span>
                  <strong className={cashDifference < 0 ? 'negative' : 'positive'}>
                    {cashDifference === null ? '-' : money(cashDifference)}
                  </strong>
                </div>
              </div>

              <div className="shift-close-actions">
                <button type="button" className="btn-secondary" onClick={loadClosePreview} disabled={loading}>
                  Calculate Totals
                </button>
                <button type="submit" className="btn-danger" disabled={loading || closingCash === ''}>
                  Close Shift
                </button>
              </div>
            </form>

            {closePreview && (
              <div className="shift-total-table">
                <table className="data-table">
                  <thead>
                    <tr><th>Cash</th><th>Card</th><th>UPI</th><th>Other</th><th>Total Payments</th><th>Expected Cash</th><th>Difference</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{money(previewTotals.cashTotal)}</td>
                      <td>{money(previewTotals.cardTotal)}</td>
                      <td>{money(previewTotals.upiTotal)}</td>
                      <td>{money(previewTotals.otherTotal)}</td>
                      <td>{money(previewTotals.totalPayments)}</td>
                      <td>{money(expectedCash)}</td>
                      <td style={{ color: cashDifference < 0 ? 'var(--danger-color)' : 'var(--success-color)', fontWeight: 'bold' }}>
                        {cashDifference === null ? '-' : money(cashDifference)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleOpenShift} className="report-filters" style={{ alignItems: 'end' }}>
            <div>
              <label>Opening Cash</label>
              <input
                className="date-input"
                type="number"
                min="0"
                step="0.01"
                value={openingCash}
                onChange={(event) => setOpeningCash(event.target.value)}
                required
              />
            </div>
            <div style={{ minWidth: '260px' }}>
              <label>Open Notes</label>
              <input
                className="date-input"
                type="text"
                value={openingNotes}
                onChange={(event) => setOpeningNotes(event.target.value)}
                placeholder="Optional"
              />
            </div>
            <button type="submit" className="btn-success">Open Shift</button>
          </form>
        )}
      </div>

      <div className="section-container">
        <h3>Shift History</h3>
        <div className="report-filters">
          <div>
            <label>Start Date:</label>
            <DatePicker selected={parseDateStr(startDate)} onChange={(date) => setStartDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker selected={parseDateStr(endDate)} onChange={(date) => setEndDate(formatDateStr(date))} className="date-input" dateFormat="yyyy-MM-dd" />
          </div>
          <button className="btn-primary" onClick={loadShifts}>Fetch Shifts</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Opened By</th>
              <th>Opened At</th>
              <th>Closed By</th>
              <th>Closed At</th>
              <th>Opening Cash</th>
              <th>Closing Cash</th>
              <th>Cash</th>
              <th>Card</th>
              <th>UPI</th>
              <th>Difference</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? (
              <tr><td colSpan="12" style={{ textAlign: 'center' }}>No shifts found</td></tr>
            ) : shifts.map((shift) => (
              <tr key={shift.id}>
                <td><strong>{shift.status}</strong></td>
                <td>{shift.opened_by?.name || '-'}</td>
                <td>{formatDateTime(shift.opened_at)}</td>
                <td>{shift.closed_by?.name || '-'}</td>
                <td>{formatDateTime(shift.closed_at)}</td>
                <td>{money(shift.opening_cash)}</td>
                <td>{shift.closing_cash === null ? '-' : money(shift.closing_cash)}</td>
                <td>{money(shift.cash_total)}</td>
                <td>{money(shift.card_total)}</td>
                <td>{money(shift.upi_total)}</td>
                <td style={{ color: Number(shift.difference || 0) < 0 ? 'var(--danger-color)' : 'var(--success-color)', fontWeight: 'bold' }}>
                  {shift.difference === null ? '-' : money(shift.difference)}
                </td>
                <td>{[shift.opening_notes, shift.closing_notes].filter(Boolean).join(' / ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftManagementTab;
