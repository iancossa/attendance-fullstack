const pool = require('../config/database');

class StudentPoints {
  static async award(pointData) {
    const { student_id, class_id, points, point_type, description, awarded_by } = pointData;
    const result = await pool.query(
      `INSERT INTO student_points (student_id, class_id, points, point_type, description, awarded_by) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [student_id, class_id, points, point_type, description, awarded_by]
    );
    return result.rows[0];
  }

  static async getStudentTotal(student_id, class_id = null) {
    let query = 'SELECT SUM(points) as total_points FROM student_points WHERE student_id = $1';
    const params = [student_id];
    
    if (class_id) {
      query += ' AND class_id = $2';
      params.push(class_id);
    }

    const result = await pool.query(query, params);
    return result.rows[0]?.total_points || 0;
  }

  static async getLeaderboard(class_id = null, limit = 10) {
    let query = `
      SELECT sp.student_id, u.name, s.student_id as student_number, SUM(sp.points) as total_points
      FROM student_points sp
      JOIN students s ON sp.student_id = s.id
      JOIN users u ON s.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;
    
    if (class_id) {
      query += ' WHERE sp.class_id = $' + (++paramCount);
      params.push(class_id);
    }

    query += ' GROUP BY sp.student_id, u.name, s.student_id ORDER BY total_points DESC LIMIT $' + (++paramCount);
    params.push(limit);

    const result = await pool.query(query, params);
    return result.rows;
  }
}

module.exports = StudentPoints;