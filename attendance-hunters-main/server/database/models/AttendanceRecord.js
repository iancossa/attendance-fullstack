const { pool } = require('../config/database');

class AttendanceRecord {
  static async create(attendanceData) {
    const { student_id, class_id, session_date, status, method, qr_session_id, recorded_by } = attendanceData;
    const result = await pool.query(
      `INSERT INTO attendance_records (student_id, class_id, session_date, status, method, qr_session_id, recorded_by, check_in_time) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
      [student_id, class_id, session_date, status, method, qr_session_id, recorded_by]
    );
    return result.rows[0];
  }

  static async findByStudentId(student_id, filters = {}) {
    let query = `
      SELECT ar.*, c.name as class_name, c.code as class_code, s.student_id as student_number
      FROM attendance_records ar 
      JOIN classes c ON ar.class_id = c.id 
      JOIN students s ON ar.student_id = s.id
      WHERE ar.student_id = $1
    `;
    const params = [student_id];
    let paramCount = 1;

    if (filters.startDate && filters.endDate) {
      query += ` AND ar.session_date BETWEEN $${++paramCount} AND $${++paramCount}`;
      params.push(filters.startDate, filters.endDate);
    }
    if (filters.classId) {
      query += ` AND ar.class_id = $${++paramCount}`;
      params.push(filters.classId);
    }

    query += ' ORDER BY ar.session_date DESC LIMIT 100';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findByStudentAndDate(student_id, class_id, session_date) {
    const result = await pool.query(
      'SELECT * FROM attendance_records WHERE student_id = $1 AND class_id = $2 AND session_date = $3',
      [student_id, class_id, session_date]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id, filters = {}) {
    let query = `
      SELECT ar.*, c.name as class_name, c.code as class_code 
      FROM attendance_records ar 
      JOIN classes c ON ar.class_id = c.id 
      WHERE ar.student_id = $1
    `;
    const params = [student_id];
    let paramCount = 1;

    if (filters.startDate && filters.endDate) {
      query += ` AND ar.session_date BETWEEN $${++paramCount} AND $${++paramCount}`;
      params.push(filters.startDate, filters.endDate);
    }
    if (filters.classId) {
      query += ` AND ar.class_id = $${++paramCount}`;
      params.push(filters.classId);
    }

    query += ' ORDER BY ar.session_date DESC LIMIT 100';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async getAttendanceSummary(student_id) {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_classes,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present_classes,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent_classes,
        COUNT(CASE WHEN status = 'late' THEN 1 END) as late_classes,
        ROUND(
          (COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)), 2
        ) as attendance_percentage
      FROM attendance_records 
      WHERE student_id = $1
    `, [student_id]);
    return result.rows[0];
  }
}

module.exports = AttendanceRecord;