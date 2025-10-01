const { pool } = require('../config/database');

class Notification {
  static async create(notificationData) {
    const { user_id, type, title, message, priority, data } = notificationData;
    const result = await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, priority, data) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, type, title, message, priority, JSON.stringify(data)]
    );
    return result.rows[0];
  }

  static async findByUser(user_id, unreadOnly = false) {
    let query = 'SELECT * FROM notifications WHERE user_id = $1';
    if (unreadOnly) {
      query += ' AND read = FALSE';
    }
    query += ' ORDER BY created_at DESC LIMIT 50';
    
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  static async markAsRead(id) {
    const result = await pool.query(
      'UPDATE notifications SET read = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async deleteExpired() {
    const result = await pool.query(
      'DELETE FROM notifications WHERE expires_at < NOW()'
    );
    return result.rowCount;
  }
}

module.exports = Notification;