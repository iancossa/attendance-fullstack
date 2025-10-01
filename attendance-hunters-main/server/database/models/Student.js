const { pool } = require('../config/database');

class Student {
  static async create(studentData) {
    const { user_id, student_id, class: studentClass, section, year, enrollment_date, gpa, parent_email, parent_phone, address } = studentData;
    const result = await pool.query(
      `INSERT INTO students (user_id, student_id, class, section, year, enrollment_date, gpa, parent_email, parent_phone, address) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [user_id, student_id, studentClass, section, year, enrollment_date, gpa, parent_email, parent_phone, address]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone, u.status 
       FROM students s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone, u.status 
       FROM students s 
       JOIN users u ON s.user_id = u.id 
       WHERE u.email = $1`,
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone, u.status 
       FROM students s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async findByStudentId(student_id) {
    const result = await pool.query(
      `SELECT s.*, u.name, u.email, u.phone 
       FROM students s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.student_id = $1`,
      [student_id]
    );
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT s.*, u.name, u.email, u.status 
      FROM students s 
      JOIN users u ON s.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;

    if (filters.class) {
      query += ` WHERE s.class ILIKE $${++paramCount}`;
      params.push(`%${filters.class}%`);
    }
    if (filters.year) {
      query += paramCount > 0 ? ' AND' : ' WHERE';
      query += ` s.year = $${++paramCount}`;
      params.push(filters.year);
    }

    query += ' ORDER BY s.created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async getAttendanceSummary(student_id) {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_classes,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present_classes,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent_classes,
        COUNT(CASE WHEN status = 'late' THEN 1 END) as late_classes,
        ROUND(
          (COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)), 2
        ) as attendance_percentage
      FROM attendance_records 
      WHERE student_id = $1
    `, [student_id]);
    return result.rows[0];
  }
}

module.exports = Student;