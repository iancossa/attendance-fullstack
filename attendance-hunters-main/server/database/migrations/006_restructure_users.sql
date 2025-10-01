-- Drop all existing tables to recreate with new structure
DROP TABLE IF EXISTS leaderboard_rankings CASCADE;
DROP TABLE IF EXISTS student_streaks CASCADE;
DROP TABLE IF EXISTS student_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS student_points CASCADE;
DROP TABLE IF EXISTS message_recipients CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS report_shares CASCADE;
DROP TABLE IF EXISTS report_templates CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS student_alerts CASCADE;
DROP TABLE IF EXISTS student_risk_tracking CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS absence_justifications CASCADE;
DROP TABLE IF EXISTS qr_sessions CASCADE;
DROP TABLE IF EXISTS attendance_sessions CASCADE;
DROP TABLE IF EXISTS attendance_records CASCADE;
DROP TABLE IF EXISTS class_enrollments CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Main users table (common fields only)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  status user_status NOT NULL DEFAULT 'active',
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  last_seen TIMESTAMP,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  admin_level VARCHAR(50) DEFAULT 'system',
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  position VARCHAR(100),
  join_date DATE,
  salary DECIMAL(10,2),
  office_location VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  class VARCHAR(50),
  section VARCHAR(10),
  year VARCHAR(20),
  enrollment_date DATE,
  gpa DECIMAL(3,2) DEFAULT 0.00,
  parent_email VARCHAR(255),
  parent_phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  faculty_id INTEGER REFERENCES staff(id),
  room VARCHAR(100),
  capacity INTEGER DEFAULT 50,
  schedule VARCHAR(255),
  department VARCHAR(100),
  semester VARCHAR(50),
  academic_year VARCHAR(20),
  credits INTEGER DEFAULT 3,
  class_type VARCHAR(10),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Class enrollments table
CREATE TABLE class_enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  class_id INTEGER REFERENCES classes(id),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'enrolled',
  grade VARCHAR(5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

-- Attendance records table
CREATE TABLE attendance_records (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  class_id INTEGER REFERENCES classes(id),
  session_date DATE NOT NULL,
  session_time TIME,
  status attendance_status NOT NULL,
  check_in_time TIMESTAMP,
  method attendance_method DEFAULT 'manual',
  qr_session_id VARCHAR(255),
  scan_timestamp TIMESTAMP,
  is_justified BOOLEAN DEFAULT FALSE,
  justification_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  recorded_by INTEGER REFERENCES staff(id),
  UNIQUE(student_id, class_id, session_date)
);

-- Attendance sessions table
CREATE TABLE attendance_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  class_id INTEGER REFERENCES classes(id),
  created_by INTEGER REFERENCES staff(id),
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  session_type session_type DEFAULT 'lecture',
  location VARCHAR(255),
  planned_topic VARCHAR(255),
  target_learning TEXT,
  target_level VARCHAR(100),
  planning_status planning_status DEFAULT 'planned',
  notes TEXT,
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- QR sessions table
CREATE TABLE qr_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  attendance_session_id INTEGER REFERENCES attendance_sessions(id),
  qr_data TEXT NOT NULL,
  scan_count INTEGER DEFAULT 0,
  max_scans INTEGER,
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Absence justifications table
CREATE TABLE absence_justifications (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  class_id INTEGER REFERENCES classes(id),
  attendance_record_id INTEGER REFERENCES attendance_records(id),
  absence_date DATE NOT NULL,
  reason justification_reason NOT NULL,
  description TEXT,
  documents JSONB,
  status justification_status DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by INTEGER REFERENCES staff(id),
  review_note TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  head_id INTEGER REFERENCES staff(id),
  type department_type DEFAULT 'Other',
  status department_status DEFAULT 'Active',
  programs_count INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  priority notification_priority DEFAULT 'normal',
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Student risk tracking table
CREATE TABLE student_risk_tracking (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  risk_level risk_level NOT NULL,
  attendance_rate DECIMAL(5,2) NOT NULL,
  consecutive_absences INTEGER DEFAULT 0,
  total_absences INTEGER DEFAULT 0,
  last_attendance_date DATE,
  parent_email VARCHAR(255),
  parent_phone VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Student alerts table
CREATE TABLE student_alerts (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  alert_type alert_type NOT NULL,
  message TEXT NOT NULL,
  recipient VARCHAR(255),
  status alert_status DEFAULT 'pending',
  sent_by INTEGER REFERENCES staff(id),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for new structure
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_admins_user_id ON admins(user_id);
CREATE INDEX idx_staff_user_id ON staff(user_id);
CREATE INDEX idx_staff_employee_id ON staff(employee_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_student_id ON students(student_id);

CREATE INDEX idx_classes_faculty_id ON classes(faculty_id);
CREATE INDEX idx_classes_code ON classes(code);
CREATE INDEX idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX idx_class_enrollments_class_id ON class_enrollments(class_id);

CREATE INDEX idx_attendance_records_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_records_class_id ON attendance_records(class_id);
CREATE INDEX idx_attendance_records_session_date ON attendance_records(session_date);

CREATE INDEX idx_attendance_sessions_class_id ON attendance_sessions(class_id);
CREATE INDEX idx_attendance_sessions_created_by ON attendance_sessions(created_by);

CREATE INDEX idx_qr_sessions_session_id ON qr_sessions(session_id);
CREATE INDEX idx_absence_justifications_student_id ON absence_justifications(student_id);
CREATE INDEX idx_departments_head_id ON departments(head_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_student_risk_tracking_student_id ON student_risk_tracking(student_id);
CREATE INDEX idx_student_alerts_student_id ON student_alerts(student_id);