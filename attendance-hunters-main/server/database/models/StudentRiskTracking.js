const { pool } = require('../config/database');

class StudentRiskTracking {
  static async create(riskData) {
    const { student_id, risk_level, attendance_rate, consecutive_absences, total_absences } = riskData;
    const result = await pool.query(
      `INSERT INTO student_risk_tracking (student_id, risk_level, attendance_rate, consecutive_absences, total_absences) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [student_id, risk_level, attendance_rate, consecutive_absences, total_absences]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id) {
    const result = await pool.query('SELECT * FROM student_risk_tracking WHERE student_id = $1', [student_id]);
    return result.rows[0];
  }

  static async updateRisk(student_id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await pool.query(
      `UPDATE student_risk_tracking SET ${setClause}, updated_at = NOW() WHERE student_id = $1 RETURNING *`,
      [student_id, ...values]
    );
    return result.rows[0];
  }

  static async findHighRiskStudents() {
    const result = await pool.query(
      `SELECT srt.*, u.name, s.student_id, u.email 
       FROM student_risk_tracking srt 
       JOIN students s ON srt.student_id = s.id
       JOIN users u ON s.user_id = u.id 
       WHERE srt.risk_level IN ('high', 'critical')`
    );
    return result.rows;
  }
}

module.exports = StudentRiskTracking;