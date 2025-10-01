-- Messaging system
CREATE TYPE message_type AS ENUM ('email', 'notification', 'sms', 'system');
CREATE TYPE message_status AS ENUM ('draft', 'sent', 'delivered', 'read', 'failed');
CREATE TYPE message_priority AS ENUM ('low', 'normal', 'high', 'urgent');

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  recipient_id INTEGER REFERENCES users(id),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  message_type message_type DEFAULT 'notification',
  priority message_priority DEFAULT 'normal',
  status message_status DEFAULT 'draft',
  parent_message_id INTEGER REFERENCES messages(id),
  thread_id VARCHAR(255),
  read_at TIMESTAMP,
  delivered_at TIMESTAMP,
  failed_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE message_recipients (
  id SERIAL PRIMARY KEY,
  message_id INTEGER REFERENCES messages(id),
  recipient_id INTEGER REFERENCES users(id),
  recipient_type VARCHAR(50),
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  status message_status DEFAULT 'sent',
  read_at TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);