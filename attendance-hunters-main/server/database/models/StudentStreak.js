const { pool } = require('../config/database');

class StudentStreak {
  static async create(streakData) {
    const { student_id, class_id } = streakData;
    const result = await pool.query(
      `INSERT INTO student_streaks (student_id, class_id) VALUES ($1, $2) RETURNING *`,
      [student_id, class_id]
    );
    return result.rows[0];
  }

  static async updateStreak(student_id, class_id, current_streak, longest_streak) {
    const result = await pool.query(
      `UPDATE student_streaks SET current_streak = $3, longest_streak = $4, last_attendance_date = CURRENT_DATE, updated_at = NOW() 
       WHERE student_id = $1 AND class_id = $2 RETURNING *`,
      [student_id, class_id, current_streak, longest_streak]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id) {
    const result = await pool.query(
      `SELECT ss.*, c.name as class_name 
       FROM student_streaks ss 
       JOIN classes c ON ss.class_id = c.id 
       WHERE ss.student_id = $1`,
      [student_id]
    );
    return result.rows;
  }
}

module.exports = StudentStreak;