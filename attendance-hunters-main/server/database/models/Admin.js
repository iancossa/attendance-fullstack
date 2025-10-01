const { pool } = require('../config/database');

class Admin {
  static async create(adminData) {
    const { user_id, admin_level, permissions } = adminData;
    const result = await pool.query(
      `INSERT INTO admins (user_id, admin_level, permissions) 
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, admin_level, JSON.stringify(permissions)]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT a.*, u.name, u.email, u.phone 
       FROM admins a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(
      `SELECT a.*, u.name, u.email, u.status 
       FROM admins a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.created_at DESC`
    );
    return result.rows;
  }
}

module.exports = Admin;