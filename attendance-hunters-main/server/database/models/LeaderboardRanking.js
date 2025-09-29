const { pool } = require('../config/database');

class LeaderboardRanking {
  static async create(rankingData) {
    const { student_id, class_id, period, scope, rank_position, total_points, attendance_rate, period_start, period_end } = rankingData;
    const result = await pool.query(
      `INSERT INTO leaderboard_rankings (student_id, class_id, period, scope, rank_position, total_points, attendance_rate, period_start, period_end) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [student_id, class_id, period, scope, rank_position, total_points, attendance_rate, period_start, period_end]
    );
    return result.rows[0];
  }

  static async getLeaderboard(period, scope, class_id = null, limit = 10) {
    let query = `
      SELECT lr.*, u.name, s.student_id as student_number 
      FROM leaderboard_rankings lr 
      JOIN students s ON lr.student_id = s.id
      JOIN users u ON s.user_id = u.id 
      WHERE lr.period = $1 AND lr.scope = $2
    `;
    const params = [period, scope];
    
    if (class_id) {
      query += ' AND lr.class_id = $3';
      params.push(class_id);
    }

    query += ' ORDER BY lr.rank_position ASC LIMIT $' + (params.length + 1);
    params.push(limit);

    const result = await pool.query(query, params);
    return result.rows;
  }
}

module.exports = LeaderboardRanking;