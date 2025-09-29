const { pool } = require('../config/database');

class MessageRecipient {
  static async create(recipientData) {
    const { message_id, recipient_id, recipient_type, recipient_email, recipient_phone } = recipientData;
    const result = await pool.query(
      `INSERT INTO message_recipients (message_id, recipient_id, recipient_type, recipient_email, recipient_phone) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [message_id, recipient_id, recipient_type, recipient_email, recipient_phone]
    );
    return result.rows[0];
  }

  static async findByMessage(message_id) {
    const result = await pool.query(
      'SELECT * FROM message_recipients WHERE message_id = $1',
      [message_id]
    );
    return result.rows;
  }

  static async markAsRead(id) {
    const result = await pool.query(
      'UPDATE message_recipients SET read_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = MessageRecipient;