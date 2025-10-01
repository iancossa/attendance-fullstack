const { pool } = require('../config/database');

class AttendanceSession {
  static async create(sessionData) {
    const { session_id, class_id, created_by, session_date, session_time, session_type, location, planned_topic, expires_at } = sessionData;
    const result = await pool.query(
      `INSERT INTO attendance_sessions (session_id, class_id, created_by, session_date, session_time, session_type, location, planned_topic, expires_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [session_id, class_id, created_by, session_date, session_time, session_type, location, planned_topic, expires_at]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM attendance_sessions WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE attendance_sessions SET planning_status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = AttendanceSession;