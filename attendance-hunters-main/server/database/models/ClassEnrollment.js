const { pool } = require('../config/database');

class ClassEnrollment {
  static async create(enrollmentData) {
    const { student_id, class_id } = enrollmentData;
    const result = await pool.query(
      `INSERT INTO class_enrollments (student_id, class_id) VALUES ($1, $2) RETURNING *`,
      [student_id, class_id]
    );
    return result.rows[0];
  }

  static async findByClass(class_id) {
    const result = await pool.query(
      `SELECT ce.*, u.name, s.student_id, u.email 
       FROM class_enrollments ce 
       JOIN students s ON ce.student_id = s.id
       JOIN users u ON s.user_id = u.id 
       WHERE ce.class_id = $1`,
      [class_id]
    );
    return result.rows;
  }

  static async findByStudent(student_id) {
    const result = await pool.query(
      `SELECT ce.*, c.name as class_name, c.code 
       FROM class_enrollments ce 
       JOIN classes c ON ce.class_id = c.id 
       WHERE ce.student_id = $1`,
      [student_id]
    );
    return result.rows;
  }

  static async findByStudentUserId(user_id) {
    const result = await pool.query(
      `SELECT ce.*, c.name as class_name, c.code 
       FROM class_enrollments ce 
       JOIN classes c ON ce.class_id = c.id 
       JOIN students s ON ce.student_id = s.id
       WHERE s.user_id = $1`,
      [user_id]
    );
    return result.rows;
  }
}

module.exports = ClassEnrollment;