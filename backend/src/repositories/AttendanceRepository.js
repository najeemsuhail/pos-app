const prisma = require('../db/prisma');
const { mapAttendance } = require('../db/mappers');

let ensureAttendanceTablePromise = null;

async function ensureAttendanceTable() {
  if (!ensureAttendanceTablePromise) {
    ensureAttendanceTablePromise = (async () => {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS staff_attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          attendance_date TEXT NOT NULL,
          status TEXT NOT NULL,
          check_in TEXT,
          check_out TEXT,
          notes TEXT,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE(user_id, attendance_date)
        )
      `);

      await prisma.$executeRawUnsafe(
        'CREATE INDEX IF NOT EXISTS idx_staff_attendance_date ON staff_attendance(attendance_date)'
      );
      await prisma.$executeRawUnsafe(
        'CREATE INDEX IF NOT EXISTS idx_staff_attendance_user_id ON staff_attendance(user_id)'
      );
    })();
  }

  return ensureAttendanceTablePromise;
}

class AttendanceRepository {
  async getStaffUsers() {
    await ensureAttendanceTable();

    return prisma.$queryRawUnsafe(
      `SELECT id, name, role, created_at AS createdAt
       FROM users
       WHERE role = 'Staff'
       ORDER BY name ASC`
    );
  }

  async upsert(data) {
    await ensureAttendanceTable();

    const {
      userId,
      attendanceDate,
      status,
      checkIn,
      checkOut,
      notes,
    } = data;

    await prisma.$executeRawUnsafe(
      `INSERT INTO staff_attendance (user_id, attendance_date, status, check_in, check_out, notes)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, attendance_date)
       DO UPDATE SET
         status = excluded.status,
         check_in = excluded.check_in,
         check_out = excluded.check_out,
         notes = excluded.notes,
         updated_at = CURRENT_TIMESTAMP`,
      Number(userId),
      attendanceDate,
      status,
      checkIn,
      checkOut,
      notes
    );

    const rows = await prisma.$queryRawUnsafe(
      `SELECT
         sa.id,
         sa.user_id AS userId,
         sa.attendance_date AS attendanceDate,
         sa.status,
         sa.check_in AS checkIn,
         sa.check_out AS checkOut,
         sa.notes,
         sa.created_at AS createdAt,
         sa.updated_at AS updatedAt,
         u.id AS linkedUserId,
         u.name AS linkedUserName,
         u.role AS linkedUserRole
       FROM staff_attendance sa
       INNER JOIN users u ON u.id = sa.user_id
       WHERE sa.user_id = ? AND sa.attendance_date = ?
       LIMIT 1`,
      Number(userId),
      attendanceDate
    );

    return this.mapAttendanceRow(rows[0] || null);
  }

  async findAll(filters = {}) {
    await ensureAttendanceTable();

    const clauses = [];
    const params = [];

    if (filters.startDate) {
      clauses.push('sa.attendance_date >= ?');
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      clauses.push('sa.attendance_date <= ?');
      params.push(filters.endDate);
    }

    if (filters.userId) {
      clauses.push('sa.user_id = ?');
      params.push(Number(filters.userId));
    }

    const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const rows = await prisma.$queryRawUnsafe(
      `SELECT
         sa.id,
         sa.user_id AS userId,
         sa.attendance_date AS attendanceDate,
         sa.status,
         sa.check_in AS checkIn,
         sa.check_out AS checkOut,
         sa.notes,
         sa.created_at AS createdAt,
         sa.updated_at AS updatedAt,
         u.id AS linkedUserId,
         u.name AS linkedUserName,
         u.role AS linkedUserRole
       FROM staff_attendance sa
       INNER JOIN users u ON u.id = sa.user_id
       ${whereClause}
       ORDER BY sa.attendance_date DESC, u.name ASC`,
      ...params
    );

    return rows.map((row) => this.mapAttendanceRow(row));
  }

  async findById(id) {
    await ensureAttendanceTable();

    const rows = await prisma.$queryRawUnsafe(
      `SELECT
         sa.id,
         sa.user_id AS userId,
         sa.attendance_date AS attendanceDate,
         sa.status,
         sa.check_in AS checkIn,
         sa.check_out AS checkOut,
         sa.notes,
         sa.created_at AS createdAt,
         sa.updated_at AS updatedAt,
         u.id AS linkedUserId,
         u.name AS linkedUserName,
         u.role AS linkedUserRole
       FROM staff_attendance sa
       INNER JOIN users u ON u.id = sa.user_id
       WHERE sa.id = ?
       LIMIT 1`,
      Number(id)
    );

    return this.mapAttendanceRow(rows[0] || null);
  }

  async update(id, data) {
    await ensureAttendanceTable();

    const updates = [];
    const params = [];

    if (data.userId !== undefined) {
      updates.push('user_id = ?');
      params.push(Number(data.userId));
    }

    if (data.attendanceDate !== undefined) {
      updates.push('attendance_date = ?');
      params.push(data.attendanceDate);
    }

    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }

    if (data.checkIn !== undefined) {
      updates.push('check_in = ?');
      params.push(data.checkIn);
    }

    if (data.checkOut !== undefined) {
      updates.push('check_out = ?');
      params.push(data.checkOut);
    }

    if (data.notes !== undefined) {
      updates.push('notes = ?');
      params.push(data.notes);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(Number(id));

    await prisma.$executeRawUnsafe(
      `UPDATE staff_attendance
       SET ${updates.join(', ')}
       WHERE id = ?`,
      ...params
    );

    return this.findById(id);
  }

  async delete(id) {
    await ensureAttendanceTable();

    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    await prisma.$executeRawUnsafe(
      'DELETE FROM staff_attendance WHERE id = ?',
      Number(id)
    );

    return existing;
  }

  async getSummary(filters = {}) {
    await ensureAttendanceTable();

    const clauses = [];
    const params = [];

    if (filters.startDate) {
      clauses.push('attendance_date >= ?');
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      clauses.push('attendance_date <= ?');
      params.push(filters.endDate);
    }

    if (filters.userId) {
      clauses.push('user_id = ?');
      params.push(Number(filters.userId));
    }

    const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const rows = await prisma.$queryRawUnsafe(
      `SELECT status, COUNT(*) AS count
       FROM staff_attendance
       ${whereClause}
       GROUP BY status`,
      ...params
    );

    return rows.reduce(
      (summary, row) => ({
        ...summary,
        [row.status]: Number(row.count) || 0,
        total: summary.total + (Number(row.count) || 0),
      }),
      { total: 0, present: 0, absent: 0, leave: 0, half_day: 0 }
    );
  }

  mapAttendanceRow(row) {
    if (!row) {
      return null;
    }

    return mapAttendance({
      id: row.id,
      userId: row.userId,
      attendanceDate: row.attendanceDate,
      status: row.status,
      checkIn: row.checkIn,
      checkOut: row.checkOut,
      notes: row.notes,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      user: row.linkedUserId
        ? {
            id: row.linkedUserId,
            name: row.linkedUserName,
            role: row.linkedUserRole,
          }
        : null,
    });
  }
}

module.exports = new AttendanceRepository();
