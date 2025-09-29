const { pool } = require('../config/database');

class Message {
  static async create(messageData) {
    const { sender_id, recipient_id, subject, message, message_type, priority } = messageData;
    const result = await pool.query(
      `INSERT INTO messages (sender_id, recipient_id, subject, message, message_type, priority, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'sent') RETURNING *`,
      [sender_id, recipient_id, subject, message, message_type, priority]
    );
    return result.rows[0];
  }

  static async findByUser(user_id, type = 'received') {
    const field = type === 'sent' ? 'sender_id' : 'recipient_id';
    const result = await pool.query(
      `SELECT m.*, u.name as ${type === 'sent' ? 'recipient' : 'sender'}_name 
       FROM messages m 
       JOIN users u ON ${type === 'sent' ? 'm.recipient_id' : 'm.sender_id'} = u.id 
       WHERE m.${field} = $1 ORDER BY m.created_at DESC`,
      [user_id]
    );
    return result.rows;
  }

  static async markAsRead(id, user_id) {
    const result = await pool.query(
      'UPDATE messages SET read_at = NOW() WHERE id = $1 AND recipient_id = $2 RETURNING *',
      [id, user_id]
    );
    return result.rows[0];
  }
}

module.exports = Message;