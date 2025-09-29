-- Create ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE attendance_method AS ENUM ('qr', 'manual', 'hybrid');
CREATE TYPE session_type AS ENUM ('lecture', 'lab', 'tutorial', 'exam');
CREATE TYPE planning_status AS ENUM ('planned', 'in_progress', 'completed');
CREATE TYPE justification_reason AS ENUM ('medical', 'family', 'emergency', 'academic', 'other');
CREATE TYPE justification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE department_type AS ENUM ('Technology', 'Engineering', 'Science', 'Arts', 'Business', 'Other');
CREATE TYPE department_status AS ENUM ('Active', 'Inactive');
CREATE TYPE notification_type AS ENUM ('absence_reminder', 'justification_status', 'attendance_alert', 'class_reminder');
CREATE TYPE notification_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE alert_type AS ENUM ('notification', 'email', 'parent-email', 'parent-sms');
CREATE TYPE alert_status AS ENUM ('pending', 'sent', 'failed');

-- Users table (unified)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  status user_status NOT NULL DEFAULT 'active',
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  
  -- Staff fields
  employee_id VARCHAR(50) UNIQUE,
  department VARCHAR(100),
  position VARCHAR(100),
  join_date DATE,
  
  -- Student fields
  student_id VARCHAR(50) UNIQUE,
  class VARCHAR(50),
  section VARCHAR(10),
  year VARCHAR(20),
  enrollment_date DATE,
  gpa DECIMAL(3,2) DEFAULT 0.00,
  
  CONSTRAINT check_role_fields CHECK (
    (role IN ('admin', 'staff') AND employee_id IS NOT NULL) OR
    (role = 'student' AND student_id IS NOT NULL)
  )
);

-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  faculty_id INTEGER REFERENCES users(id),
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
  student_id INTEGER REFERENCES users(id),
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
  student_id INTEGER REFERENCES users(id),
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
  recorded_by INTEGER REFERENCES users(id),
  UNIQUE(student_id, class_id, session_date)
);

-- Attendance sessions table
CREATE TABLE attendance_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  class_id INTEGER REFERENCES classes(id),
  created_by INTEGER REFERENCES users(id),
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
  student_id INTEGER REFERENCES users(id),
  class_id INTEGER REFERENCES classes(id),
  attendance_record_id INTEGER REFERENCES attendance_records(id),
  absence_date DATE NOT NULL,
  reason justification_reason NOT NULL,
  description TEXT,
  documents JSONB,
  status justification_status DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by INTEGER REFERENCES users(id),
  review_note TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  head_id INTEGER REFERENCES users(id),
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
  student_id INTEGER REFERENCES users(id),
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
  student_id INTEGER REFERENCES users(id),
  alert_type alert_type NOT NULL,
  message TEXT NOT NULL,
  recipient VARCHAR(255),
  status alert_status DEFAULT 'pending',
  sent_by INTEGER REFERENCES users(id),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);