const { pool } = require('../config/database');

class ReportTemplate {
  static async create(templateData) {
    const { name, description, type, category, fields, created_by } = templateData;
    const result = await pool.query(
      `INSERT INTO report_templates (name, description, type, category, fields, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, type, category, JSON.stringify(fields), created_by]
    );
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM report_templates WHERE is_public = TRUE';
    const params = [];
    let paramCount = 0;

    if (filters.type) {
      query += ` AND type = $${++paramCount}`;
      params.push(filters.type);
    }
    if (filters.category) {
      query += ` AND category = $${++paramCount}`;
      params.push(filters.category);
    }

    query += ' ORDER BY usage_count DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async incrementUsage(id) {
    const result = await pool.query(
      'UPDATE report_templates SET usage_count = usage_count + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = ReportTemplate;