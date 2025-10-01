-- Reports system
CREATE TYPE report_type AS ENUM ('weekly', 'monthly', 'semester', 'custom', 'attendance', 'performance', 'analytics');
CREATE TYPE report_category AS ENUM ('student', 'class', 'department', 'faculty', 'system');
CREATE TYPE report_format AS ENUM ('pdf', 'excel', 'csv', 'json');
CREATE TYPE report_status AS ENUM ('generating', 'completed', 'failed', 'scheduled');

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type report_type NOT NULL,
  category report_category NOT NULL,
  description TEXT,
  generated_by INTEGER REFERENCES users(id),
  template_id INTEGER,
  class_id INTEGER REFERENCES classes(id),
  department_id INTEGER REFERENCES departments(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  filters JSONB,
  data JSONB,
  format report_format DEFAULT 'pdf',
  status report_status DEFAULT 'generating',
  file_path VARCHAR(500),
  file_size VARCHAR(50),
  download_count INTEGER DEFAULT 0,
  recipients TEXT[],
  is_scheduled BOOLEAN DEFAULT FALSE,
  schedule_frequency VARCHAR(50),
  next_generation TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE TABLE report_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type report_type NOT NULL,
  category report_category NOT NULL,
  fields JSONB NOT NULL,
  default_filters JSONB,
  is_public BOOLEAN DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE report_shares (
  id SERIAL PRIMARY KEY,
  report_id INTEGER REFERENCES reports(id),
  shared_by INTEGER REFERENCES users(id),
  shared_with INTEGER REFERENCES users(id),
  share_token VARCHAR(255) UNIQUE,
  expires_at TIMESTAMP,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gamification system
CREATE TYPE point_type AS ENUM ('attendance', 'punctuality', 'streak', 'achievement', 'bonus', 'penalty');
CREATE TYPE achievement_category AS ENUM ('attendance', 'punctuality', 'consistency', 'improvement', 'special');
CREATE TYPE ranking_period AS ENUM ('daily', 'weekly', 'monthly', 'semester', 'yearly');
CREATE TYPE ranking_scope AS ENUM ('global', 'class', 'department', 'year');

CREATE TABLE student_points (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  class_id INTEGER REFERENCES classes(id),
  points INTEGER NOT NULL,
  point_type point_type NOT NULL,
  description VARCHAR(255),
  reference_id INTEGER,
  awarded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category achievement_category NOT NULL,
  icon VARCHAR(100),
  points_reward INTEGER DEFAULT 0,
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  requirement_period INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE student_achievements (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  achievement_id INTEGER REFERENCES achievements(id),
  progress INTEGER DEFAULT 0,
  is_earned BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, achievement_id)
);

CREATE TABLE student_streaks (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  class_id INTEGER REFERENCES classes(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_attendance_date DATE,
  streak_start_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

CREATE TABLE leaderboard_rankings (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  class_id INTEGER REFERENCES classes(id),
  department_id INTEGER REFERENCES departments(id),
  period ranking_period NOT NULL,
  scope ranking_scope NOT NULL,
  rank_position INTEGER NOT NULL,
  total_points INTEGER DEFAULT 0,
  attendance_rate DECIMAL(5,2),
  streak_days INTEGER DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, period, scope, period_start)
);