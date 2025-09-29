const { pool } = require('../config/database');

class Staff {
  static async create(staffData) {
    const { user_id, employee_id, department, position, join_date, salary, office_location } = staffData;
    const result = await pool.query(
      `INSERT INTO staff (user_id, employee_id, department, position, join_date, salary, office_location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, employee_id, department, position, join_date, salary, office_location]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone, u.status 
       FROM staff s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }

  static async findByEmployeeId(employee_id) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone 
       FROM staff s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.employee_id = $1`,
      [employee_id]
    );
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT s.*, u.name, u.email, u.status 
      FROM staff s 
      JOIN users u ON s.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;

    if (filters.department) {
      query += ` WHERE s.department = $${++paramCount}`;
      params.push(filters.department);
    }

    query += ' ORDER BY s.created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }
}

module.exports = Staff;