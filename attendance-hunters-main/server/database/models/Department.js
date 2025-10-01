const { pool } = require('../config/database');

class Department {
  static async findAll(filters = {}) {
    let query = `
      SELECT d.*, u.name as head_name, s.employee_id as head_employee_id
      FROM departments d
      LEFT JOIN staff s ON d.head_id = s.id
      LEFT JOIN users u ON s.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;

    if (filters.type) {
      query += ` WHERE d.type = $${++paramCount}`;
      params.push(filters.type);
    }
    if (filters.status) {
      query += paramCount > 0 ? ' AND' : ' WHERE';
      query += ` d.status = $${++paramCount}`;
      params.push(filters.status);
    }

    query += ' ORDER BY d.created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM departments WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(deptData) {
    const { name, code, head_id, type, status, programs_count, description } = deptData;
    const result = await pool.query(
      `INSERT INTO departments (name, code, head_id, type, status, programs_count, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, code, head_id, type, status, programs_count, description]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await pool.query(
      `UPDATE departments SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM departments WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Department;