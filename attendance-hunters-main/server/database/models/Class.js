const { pool } = require('../config/database');

class Class {
  static async findAll() {
    const result = await pool.query(`
      SELECT c.*, u.name as faculty_name,
        (SELECT COUNT(*) FROM class_enrollments WHERE class_id = c.id) as student_count
      FROM classes c
      LEFT JOIN staff s ON c.faculty_id = s.id
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY c.created_at DESC
    `);
    return result.rows;
  }

  static async create(classData) {
    const { name, code, subject, description, faculty_id, room, capacity, schedule, department, semester, academic_year, credits, class_type } = classData;
    const result = await pool.query(
      `INSERT INTO classes (name, code, subject, description, faculty_id, room, capacity, schedule, department, semester, academic_year, credits, class_type) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [name, code, subject, description, faculty_id, room, capacity, schedule, department, semester, academic_year, credits, class_type]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await pool.query(
      `UPDATE classes SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM classes WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Class;