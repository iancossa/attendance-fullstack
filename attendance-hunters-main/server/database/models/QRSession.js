const { pool } = require('../config/database');

class QRSession {
  static async create(sessionData) {
    const { session_id, attendance_session_id, qr_data, expires_at } = sessionData;
    const result = await pool.query(
      `INSERT INTO qr_sessions (session_id, attendance_session_id, qr_data, expires_at) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [session_id, attendance_session_id, qr_data, expires_at]
    );
    return result.rows[0];
  }

  static async findBySessionId(session_id) {
    const result = await pool.query(
      `SELECT qs.*, ats.class_id, ats.session_date, ats.location, c.name as class_name, s.name as staff_name
       FROM qr_sessions qs
       JOIN attendance_sessions ats ON qs.attendance_session_id = ats.id
       JOIN classes c ON ats.class_id = c.id
       LEFT JOIN staff st ON ats.created_by = st.id
       LEFT JOIN users s ON st.user_id = s.id
       WHERE qs.session_id = $1`,
      [session_id]
    );
    return result.rows[0];
  }

  static async incrementScanCount(session_id) {
    const result = await pool.query(
      'UPDATE qr_sessions SET scan_count = scan_count + 1 WHERE session_id = $1 RETURNING *',
      [session_id]
    );
    return result.rows[0];
  }

  static async updateStatus(session_id, status) {
    const result = await pool.query(
      'UPDATE qr_sessions SET status = $1 WHERE session_id = $2 RETURNING *',
      [status, session_id]
    );
    return result.rows[0];
  }

  static async cleanupExpired() {
    const result = await pool.query(
      'DELETE FROM qr_sessions WHERE expires_at < NOW() AND status = $1',
      ['active']
    );
    return result.rowCount;
  }
}

module.exports = QRSession;