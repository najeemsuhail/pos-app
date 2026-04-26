const AttendanceRepository = require('../repositories/AttendanceRepository');
const UserRepository = require('../repositories/UserRepository');

const VALID_STATUSES = ['present', 'absent', 'leave', 'half_day'];

function normalizeDate(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
}

function normalizeTime(value) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === '') {
    return null;
  }

  const trimmed = String(value).trim();
  if (!/^\d{2}:\d{2}$/.test(trimmed)) {
    throw { status: 400, message: 'Time must be in HH:MM format' };
  }

  return trimmed;
}

async function ensureStaffUser(userId) {
  const user = await UserRepository.findById(userId);
  if (!user) {
    throw { status: 404, message: 'Staff user not found' };
  }

  if (user.role !== 'Staff') {
    throw { status: 400, message: 'Attendance can only be recorded for staff users' };
  }

  return user;
}

class AttendanceService {
  async getStaffUsers() {
    return AttendanceRepository.getStaffUsers();
  }

  async saveAttendance(data) {
    const attendanceDate = normalizeDate(data.attendance_date);
    const status = String(data.status || '').trim().toLowerCase();
    const userId = Number(data.user_id);

    if (!Number.isInteger(userId) || userId <= 0) {
      throw { status: 400, message: 'Valid staff member is required' };
    }

    if (!attendanceDate) {
      throw { status: 400, message: 'Attendance date is required' };
    }

    if (!VALID_STATUSES.includes(status)) {
      throw { status: 400, message: 'Valid attendance status is required' };
    }

    await ensureStaffUser(userId);

    const checkIn = normalizeTime(data.check_in);
    const checkOut = normalizeTime(data.check_out);
    const notes = data.notes === undefined ? undefined : String(data.notes || '').trim() || null;

    return AttendanceRepository.upsert({
      userId,
      attendanceDate,
      status,
      checkIn: checkIn === undefined ? null : checkIn,
      checkOut: checkOut === undefined ? null : checkOut,
      notes: notes === undefined ? null : notes,
    });
  }

  async getAttendance(filters = {}) {
    return AttendanceRepository.findAll({
      startDate: normalizeDate(filters.startDate) || undefined,
      endDate: normalizeDate(filters.endDate) || undefined,
      userId: filters.userId ? Number(filters.userId) : undefined,
    });
  }

  async getSummary(filters = {}) {
    return AttendanceRepository.getSummary({
      startDate: normalizeDate(filters.startDate) || undefined,
      endDate: normalizeDate(filters.endDate) || undefined,
      userId: filters.userId ? Number(filters.userId) : undefined,
    });
  }

  async updateAttendance(id, data) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw { status: 400, message: 'Invalid attendance record ID' };
    }

    const existing = await AttendanceRepository.findById(numericId);
    if (!existing) {
      throw { status: 404, message: 'Attendance record not found' };
    }

    const updateData = {};

    if (data.user_id !== undefined) {
      const userId = Number(data.user_id);
      if (!Number.isInteger(userId) || userId <= 0) {
        throw { status: 400, message: 'Valid staff member is required' };
      }
      await ensureStaffUser(userId);
      updateData.userId = userId;
    }

    if (data.attendance_date !== undefined) {
      const attendanceDate = normalizeDate(data.attendance_date);
      if (!attendanceDate) {
        throw { status: 400, message: 'Attendance date is required' };
      }
      updateData.attendanceDate = attendanceDate;
    }

    if (data.status !== undefined) {
      const status = String(data.status || '').trim().toLowerCase();
      if (!VALID_STATUSES.includes(status)) {
        throw { status: 400, message: 'Valid attendance status is required' };
      }
      updateData.status = status;
    }

    if (data.check_in !== undefined) {
      updateData.checkIn = normalizeTime(data.check_in);
    }

    if (data.check_out !== undefined) {
      updateData.checkOut = normalizeTime(data.check_out);
    }

    if (data.notes !== undefined) {
      updateData.notes = String(data.notes || '').trim() || null;
    }

    return AttendanceRepository.update(numericId, updateData);
  }

  async deleteAttendance(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw { status: 400, message: 'Invalid attendance record ID' };
    }

    const deleted = await AttendanceRepository.delete(numericId);
    if (!deleted) {
      throw { status: 404, message: 'Attendance record not found' };
    }

    return deleted;
  }
}

module.exports = new AttendanceService();
