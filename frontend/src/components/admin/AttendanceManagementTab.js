import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { attendanceService } from '../../services/api';
import { formatDateStr, parseDateStr } from '../../utils/dateUtils';

const STATUS_OPTIONS = [
  { value: 'present', label: 'Present', color: '#1f9d55' },
  { value: 'absent', label: 'Absent', color: '#d64545' },
  { value: 'leave', label: 'Leave', color: '#b7791f' },
  { value: 'half_day', label: 'Half Day', color: '#2b6cb0' },
];

const today = new Date().toISOString().split('T')[0];

const emptyForm = {
  user_id: '',
  attendance_date: today,
  status: 'present',
  check_in: '',
  check_out: '',
  notes: '',
};

const AttendanceManagementTab = () => {
  const [staff, setStaff] = useState([]);
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    leave: 0,
    half_day: 0,
  });
  const [filters, setFilters] = useState({
    startDate: today,
    endDate: today,
    userId: '',
  });
  const [formData, setFormData] = useState(emptyForm);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStaff = useCallback(async () => {
    const response = await attendanceService.getStaff();
    const staffMembers = response.data || [];
    setStaff(staffMembers);
    setFormData((current) => ({
      ...current,
      user_id: current.user_id || String(staffMembers[0]?.id || ''),
    }));
  }, []);

  const fetchAttendance = useCallback(async (nextFilters) => {
    try {
      setLoading(true);
      const [recordsResponse, summaryResponse] = await Promise.all([
        attendanceService.getAll(nextFilters.startDate, nextFilters.endDate, nextFilters.userId || undefined),
        attendanceService.getSummary(nextFilters.startDate, nextFilters.endDate, nextFilters.userId || undefined),
      ]);
      setRecords(recordsResponse.data || []);
      setSummary(summaryResponse.data || {});
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchStaff();
        await fetchAttendance({
          startDate: today,
          endDate: today,
          userId: '',
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load staff attendance');
      }
    };

    loadInitialData();
  }, [fetchAttendance, fetchStaff]);

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      user_id: String(staff[0]?.id || ''),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.user_id || !formData.attendance_date || !formData.status) {
        setError('Staff member, date, and status are required');
        return;
      }

      await attendanceService.create(formData);
      setSuccess('Attendance saved successfully');
      setTimeout(() => setSuccess(''), 3000);
      setError('');
      setShowForm(false);
      resetForm();
      fetchAttendance(filters);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save attendance');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await attendanceService.update(editingRecord.id, editingRecord);
      setSuccess('Attendance updated successfully');
      setTimeout(() => setSuccess(''), 3000);
      setError('');
      setEditingRecord(null);
      fetchAttendance(filters);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update attendance');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this attendance record?')) {
      return;
    }

    try {
      await attendanceService.delete(id);
      setSuccess('Attendance deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
      setError('');
      fetchAttendance(filters);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete attendance');
    }
  };

  const getStatusMeta = (status) =>
    STATUS_OPTIONS.find((option) => option.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2>Staff Attendance</h2>
          <p className="compact-muted">
            Record daily presence, absence, leave, and half-day shifts for staff members.
          </p>
        </div>
        <button
          className={`btn-${showForm ? 'secondary' : 'primary'}`}
          onClick={() => {
            setShowForm((current) => !current);
            setEditingRecord(null);
            setError('');
          }}
        >
          {showForm ? 'Cancel' : 'Mark Attendance'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Daily Attendance Entry</h3>
         
            <div className="compact-grid-3 attendance-form-grid">
              <div className="form-group">
                <label>Staff Member *</label>
                <select
                  value={formData.user_id}
                  onChange={(e) => setFormData((current) => ({ ...current, user_id: e.target.value }))}
                  required
                >
                  <option value="">Select staff</option>
                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date *</label>
                <DatePicker
                  selected={parseDateStr(formData.attendance_date)}
                  onChange={(date) => setFormData((current) => ({ ...current, attendance_date: formatDateStr(date) }))}
                  required
                  className="date-input attendance-input"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((current) => ({ ...current, status: e.target.value }))}
                  required
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Check In</label>
                <input
                  type="time"
                  className="attendance-input"
                  value={formData.check_in}
                  onChange={(e) => setFormData((current) => ({ ...current, check_in: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Check Out</label>
                <input
                  type="time"
                  className="attendance-input"
                  value={formData.check_out}
                  onChange={(e) => setFormData((current) => ({ ...current, check_out: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-group attendance-notes-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData((current) => ({ ...current, notes: e.target.value }))}
                placeholder="Optional note about shift, leave, or remarks"
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success">Save Attendance</button>
            </div>
        </form>
      )}

      <div className="report-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', marginBottom: 16 }}>
        <div>
          <label>Start Date</label>
          <DatePicker
            selected={parseDateStr(filters.startDate)}
            onChange={(date) => setFilters((current) => ({ ...current, startDate: formatDateStr(date) }))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>End Date</label>
          <DatePicker
            selected={parseDateStr(filters.endDate)}
            onChange={(date) => setFilters((current) => ({ ...current, endDate: formatDateStr(date) }))}
            className="date-input"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Staff</label>
          <select
            value={filters.userId}
            onChange={(e) => setFilters((current) => ({ ...current, userId: e.target.value }))}
          >
            <option value="">All staff</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-primary" onClick={() => fetchAttendance(filters)}>Refresh</button>
      </div>

      <div className="report-grid attendance-summary-grid">
        <div className="report-card attendance-summary-card">
          <h4>Total Records</h4>
          <p className="report-value attendance-summary-value">{summary.total || 0}</p>
        </div>
        <div className="report-card attendance-summary-card attendance-summary-card-present">
          <h4>Present</h4>
          <p className="report-value attendance-summary-value">{summary.present || 0}</p>
        </div>
        <div className="report-card attendance-summary-card attendance-summary-card-absent">
          <h4>Absent</h4>
          <p className="report-value attendance-summary-value">{summary.absent || 0}</p>
        </div>
        <div className="report-card attendance-summary-card attendance-summary-card-leave">
          <h4>Leave / Half Day</h4>
          <p className="report-value attendance-summary-value">
            {(summary.leave || 0) + (summary.half_day || 0)}
          </p>
        </div>
      </div>

      {loading && <div className="loading">Loading attendance...</div>}

      {!loading && (
        <div className="section-container compact-table">
          <h3>Attendance Ledger</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Staff</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const statusMeta = getStatusMeta(record.status);
                return (
                  <tr key={record.id}>
                    <td>{record.attendance_date}</td>
                    <td>{record.user?.name || 'Unknown staff'}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: statusMeta.color,
                          color: '#fff',
                          textTransform: 'capitalize',
                        }}
                      >
                        {statusMeta.label}
                      </span>
                    </td>
                    <td>{record.check_in || '-'}</td>
                    <td>{record.check_out || '-'}</td>
                    <td>{record.notes || '-'}</td>
                    <td style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-edit" onClick={() => setEditingRecord({ ...record, user_id: String(record.user_id) })}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(record.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {records.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    No attendance records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 760, width: '100%' }}>
            <div className="modal-header">
              <h3>Edit Attendance</h3>
              <button type="button" className="modal-close" onClick={() => setEditingRecord(null)}>&times;</button>
            </div>
            <form
              onSubmit={handleUpdate}
              className="admin-form compact-admin-form"
              style={{ border: 'none', padding: 12, marginBottom: 0, background: 'transparent' }}
            >
              <div className="compact-grid-2">
                <div className="form-group">
                  <label>Staff Member</label>
                  <select
                    value={editingRecord.user_id}
                    onChange={(e) => setEditingRecord((current) => ({ ...current, user_id: e.target.value }))}
                    required
                  >
                    {staff.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <DatePicker
                    selected={parseDateStr(editingRecord.attendance_date)}
                    onChange={(date) => setEditingRecord((current) => ({ ...current, attendance_date: formatDateStr(date) }))}
                    className="date-input"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord((current) => ({ ...current, status: e.target.value }))}
                    required
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Check In</label>
                  <input
                    type="time"
                    value={editingRecord.check_in || ''}
                    onChange={(e) => setEditingRecord((current) => ({ ...current, check_in: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Check Out</label>
                  <input
                    type="time"
                    value={editingRecord.check_out || ''}
                    onChange={(e) => setEditingRecord((current) => ({ ...current, check_out: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input
                  type="text"
                  value={editingRecord.notes || ''}
                  onChange={(e) => setEditingRecord((current) => ({ ...current, notes: e.target.value }))}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingRecord(null)}>Cancel</button>
                <button type="submit" className="btn-success">Update Attendance</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .attendance-summary-grid {
              margin-top: 18px;
            }
            .attendance-summary-card {
              background: var(--card-bg);
              color: var(--text-primary);
              border: 1px solid var(--border-color);
              text-align: left;
              box-shadow: var(--shadow-sm);
              position: relative;
              overflow: hidden;
            }
            .attendance-summary-card::before {
              content: '';
              position: absolute;
              inset: 0 auto 0 0;
              width: 5px;
              background: var(--primary-color);
            }
            .attendance-summary-card h4 {
              color: var(--text-secondary);
              opacity: 1;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            }
            .attendance-summary-value {
              color: var(--text-primary);
              line-height: 1;
            }
            .attendance-summary-card-present::before {
              background: #1f9d55;
            }
            .attendance-summary-card-absent::before {
              background: #d64545;
            }
            .attendance-summary-card-leave::before {
              background: #2b6cb0;
            }
          `,
        }}
      />

    </div>
  );
};

export default AttendanceManagementTab;
