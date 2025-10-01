const { pool } = require('../config/database');

class StudentAlert {
  static async create(alertData) {
    const { student_id, alert_type, message, recipient, sent_by } = alertData;
    const result = await pool.query(
      `INSERT INTO student_alerts (student_id, alert_type, message, recipient, sent_by) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [student_id, alert_type, message, recipient, sent_by]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id) {
    const result = await pool.query(
      'SELECT * FROM student_alerts WHERE student_id = $1 ORDER BY created_at DESC',
      [student_id]
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE student_alerts SET status = $1, sent_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = StudentAlert;