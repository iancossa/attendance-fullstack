const { pool } = require('../config/database');

class AbsenceJustification {
  static async create(justificationData) {
    const { student_id, class_id, attendance_record_id, absence_date, reason, description, documents } = justificationData;
    const result = await pool.query(
      `INSERT INTO absence_justifications (student_id, class_id, attendance_record_id, absence_date, reason, description, documents) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [student_id, class_id, attendance_record_id, absence_date, reason, description, JSON.stringify(documents)]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id, filters = {}) {
    let query = 'SELECT * FROM absence_justifications WHERE student_id = $1';
    const params = [student_id];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND status = $${++paramCount}`;
      params.push(filters.status);
    }

    query += ' ORDER BY submitted_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async updateStatus(id, status, reviewed_by, review_note) {
    const result = await pool.query(
      `UPDATE absence_justifications 
       SET status = $1, reviewed_by = $2, review_note = $3, reviewed_at = NOW() 
       WHERE id = $4 RETURNING *`,
      [status, reviewed_by, review_note, id]
    );
    return result.rows[0];
  }
}

module.exports = AbsenceJustification;