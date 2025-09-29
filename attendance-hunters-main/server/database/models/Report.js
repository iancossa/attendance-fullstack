const { pool } = require('../config/database');

class Report {
  static async create(reportData) {
    const { title, type, category, description, generated_by, template_id, class_id, department_id, period_start, period_end, filters, format, is_scheduled } = reportData;
    const result = await pool.query(
      `INSERT INTO reports (title, type, category, description, generated_by, template_id, class_id, department_id, period_start, period_end, filters, format, is_scheduled) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [title, type, category, description, generated_by, template_id, class_id, department_id, period_start, period_end, JSON.stringify(filters), format, is_scheduled]
    );
    return result.rows[0];
  }

  static async findByUser(user_id, filters = {}) {
    let query = 'SELECT * FROM reports WHERE generated_by = $1';
    const params = [user_id];
    let paramCount = 1;

    if (filters.type) {
      query += ` AND type = $${++paramCount}`;
      params.push(filters.type);
    }
    if (filters.status) {
      query += ` AND status = $${++paramCount}`;
      params.push(filters.status);
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async updateStatus(id, status, data = null) {
    const result = await pool.query(
      `UPDATE reports SET status = $1, data = $2, completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE completed_at END 
       WHERE id = $3 RETURNING *`,
      [status, data ? JSON.stringify(data) : null, id]
    );
    return result.rows[0];
  }
}

module.exports = Report;