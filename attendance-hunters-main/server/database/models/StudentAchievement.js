const { pool } = require('../config/database');

class StudentAchievement {
  static async create(achievementData) {
    const { student_id, achievement_id, progress } = achievementData;
    const result = await pool.query(
      `INSERT INTO student_achievements (student_id, achievement_id, progress) 
       VALUES ($1, $2, $3) RETURNING *`,
      [student_id, achievement_id, progress]
    );
    return result.rows[0];
  }

  static async updateProgress(student_id, achievement_id, progress) {
    const result = await pool.query(
      `UPDATE student_achievements SET progress = $3, is_earned = CASE WHEN $3 >= 100 THEN TRUE ELSE FALSE END, 
       earned_at = CASE WHEN $3 >= 100 THEN NOW() ELSE NULL END 
       WHERE student_id = $1 AND achievement_id = $2 RETURNING *`,
      [student_id, achievement_id, progress]
    );
    return result.rows[0];
  }

  static async findByStudent(student_id) {
    const result = await pool.query(
      `SELECT sa.*, a.name, a.description, a.category, a.points_reward 
       FROM student_achievements sa 
       JOIN achievements a ON sa.achievement_id = a.id 
       WHERE sa.student_id = $1`,
      [student_id]
    );
    return result.rows;
  }
}

module.exports = StudentAchievement;