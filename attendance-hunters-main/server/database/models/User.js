const { pool } = require('../config/database');

class User {
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { email, password, name, role, status, phone, avatar_url } = userData;
    const result = await pool.query(
      `INSERT INTO users (email, password, name, role, status, phone, avatar_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [email, password, name, role, status, phone, avatar_url]
    );
    return result.rows[0];
  }

  static async updateLastLogin(id) {
    const result = await pool.query(
      'UPDATE users SET last_login = NOW(), last_seen = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  }
}

module.exports = User;