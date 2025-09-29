const { pool } = require('../config/database');

class Achievement {
  static async create(achievementData) {
    const { name, description, category, points_reward, requirement_type, requirement_value } = achievementData;
    const result = await pool.query(
      `INSERT INTO achievements (name, description, category, points_reward, requirement_type, requirement_value) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, category, points_reward, requirement_type, requirement_value]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM achievements WHERE is_active = TRUE');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM achievements WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Achievement;