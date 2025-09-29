# Database Schema - PostgreSQL

## Frontend Analysis Summary

### Pages Analyzed:
- **Auth**: Admin/Staff/Student login with unified authentication
- **Dashboards**: Role-specific dashboards with attendance metrics
- **Classes**: Class management with faculty assignments and enrollment
- **Attendance**: QR scanning, manual marking, and record tracking

### Key Data Requirements:
- Unified user management (admin/staff/student)
- Class scheduling and enrollment system
- Multi-method attendance tracking (QR/Manual/Hybrid)
- Real-time attendance statistics and reporting

---

## Complete SQL Schema

### 1. Main Users Table (Common Fields)
```sql
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

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
```

### 2. Admins Table
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  admin_level VARCHAR(50) DEFAULT 'system',
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Staff Table
```sql
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
```

### 4. Students Table
```sql
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
```

### 5. Classes Table
```sql
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  faculty_id INTEGER REFERENCES staff(id),
  room VARCHAR(100),
  capacity INTEGER DEFAULT 50,
  schedule VARCHAR(255), -- "Mon,Wed,Fri 09:00-10:30"
  department VARCHAR(100),
  semester VARCHAR(50),
  academic_year VARCHAR(20),
  credits INTEGER DEFAULT 3,
  class_type VARCHAR(10), -- CRT, PSS, SB, etc.
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geofence_radius INTEGER DEFAULT 100,
  geofence_enabled BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Class Enrollments Table
```sql
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
```

### 7. Attendance Records Table
```sql
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE attendance_method AS ENUM ('qr', 'manual', 'hybrid');

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
  student_latitude DOUBLE PRECISION,
  student_longitude DOUBLE PRECISION,
  distance_from_class DOUBLE PRECISION,
  location_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  recorded_by INTEGER REFERENCES staff(id),
  UNIQUE(student_id, class_id, session_date)
);
```

### 8. Attendance Sessions Table
```sql
CREATE TYPE session_type AS ENUM ('lecture', 'lab', 'tutorial', 'exam');
CREATE TYPE planning_status AS ENUM ('planned', 'in_progress', 'completed');

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
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geofence_radius INTEGER DEFAULT 100,
  expires_at TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 9. QR Sessions Table
```sql
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
```

### 10. Absence Justifications Table
```sql
CREATE TYPE justification_reason AS ENUM ('medical', 'family', 'emergency', 'academic', 'other');
CREATE TYPE justification_status AS ENUM ('pending', 'approved', 'rejected');

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
```

### 11. Departments Table
```sql
CREATE TYPE department_type AS ENUM ('Technology', 'Engineering', 'Science', 'Arts', 'Business', 'Other');
CREATE TYPE department_status AS ENUM ('Active', 'Inactive');

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
```

### 12. Notifications Table
```sql
CREATE TYPE notification_type AS ENUM ('absence_reminder', 'justification_status', 'attendance_alert', 'class_reminder');
CREATE TYPE notification_priority AS ENUM ('low', 'normal', 'high', 'urgent');

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
```

### 13. Student Risk Tracking Table
```sql
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');

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
```

### 14. Student Alerts Table
```sql
CREATE TYPE alert_type AS ENUM ('notification', 'email', 'parent-email', 'parent-sms');
CREATE TYPE alert_status AS ENUM ('pending', 'sent', 'failed');

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
```

### 15. Geofence Settings Table
```sql
CREATE TABLE geofence_settings (
  id SERIAL PRIMARY KEY,
  default_radius INTEGER DEFAULT 100,
  enabled BOOLEAN DEFAULT TRUE,
  allow_override BOOLEAN DEFAULT TRUE,
  accuracy_threshold DOUBLE PRECISION DEFAULT 50.0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 16. Class Locations Table
```sql
CREATE TABLE class_locations (
  id SERIAL PRIMARY KEY,
  class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Geofencing Features

### Location-Based Attendance
- **Student Location Tracking**: Capture GPS coordinates during QR scan
- **Distance Validation**: Calculate distance from class location using Haversine formula
- **Geofence Radius**: Configurable radius per class (default 100m)
- **Multiple Locations**: Support multiple valid locations per class
- **Location Verification**: Flag attendance records as location-verified

### Configuration
- **Global Settings**: Default radius, enable/disable geofencing
- **Class Override**: Individual class geofence settings
- **Accuracy Threshold**: GPS accuracy requirements (default 50m)
- **Fallback Support**: Manual attendance when location unavailable

### Security
- **Distance Calculation**: Server-side validation prevents spoofing
- **Location History**: Track student location patterns
- **Audit Trail**: Complete location verification logs

---

## Database Services Status

### ✅ Implemented Services
- **GeofencingService**: Distance calculation, location validation, geofence status
- **User Management**: Admin, Staff, Student models with authentication
- **Class Management**: Class creation, enrollment, faculty assignment
- **Attendance Tracking**: QR, manual, hybrid methods with location support
- **Session Management**: QR session creation and expiration
- **Risk Tracking**: Student attendance risk assessment
- **Notifications**: Alert system for attendance issues
- **Gamification**: Points, achievements, streaks, leaderboards

### 📊 Database Layer Complete
- **22 Models**: All entities implemented with proper relationships
- **6 Migrations**: Including geofencing support (007_add_geofencing.sql)
- **Prisma Schema**: Complete schema with separated user tables
- **Services**: GeofencingService with Haversine distance calculation
- **Indexes**: Performance optimization for location queries

### 🔧 Ready for Integration
- **API Compatibility**: Models match existing API expectations
- **Frontend Support**: Schema supports all frontend requirements
- **Geofencing**: Complete location-based attendance system
- **Scalability**: Normalized structure for performance
- **Security**: Proper foreign keys and constraintsS ENUM ('generating', 'completed', 'failed', 'scheduled');

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
  schedule_frequency VARCHAR(50), -- 'weekly', 'monthly', 'quarterly'
  next_generation TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

### 13. Report Templates Table
```sql
CREATE TABLE report_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type report_type NOT NULL,
  category report_category NOT NULL,
  fields JSONB NOT NULL, -- Array of field definitions
  default_filters JSONB,
  is_public BOOLEAN DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 14. Report Shares Table
```sql
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
```

### 15. Indexes for Performance
```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_student_id ON users(student_id);
CREATE INDEX idx_users_employee_id ON users(employee_id);

-- Class indexes
CREATE INDEX idx_classes_faculty_id ON classes(faculty_id);
CREATE INDEX idx_classes_code ON classes(code);
CREATE INDEX idx_classes_department ON classes(department);

-- Attendance indexes
CREATE INDEX idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_class_id ON attendance_records(class_id);
CREATE INDEX idx_attendance_date ON attendance_records(session_date);
CREATE INDEX idx_attendance_status ON attendance_records(status);

-- Session indexes
CREATE INDEX idx_attendance_sessions_class_id ON attendance_sessions(class_id);
CREATE INDEX idx_attendance_sessions_date ON attendance_sessions(session_date);
CREATE INDEX idx_attendance_sessions_created_by ON attendance_sessions(created_by);

-- QR session indexes
CREATE INDEX idx_qr_sessions_session_id ON qr_sessions(session_id);
CREATE INDEX idx_qr_sessions_attendance_session_id ON qr_sessions(attendance_session_id);

-- Enrollment indexes
CREATE INDEX idx_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX idx_enrollments_class_id ON class_enrollments(class_id);

-- Risk tracking indexes
CREATE INDEX idx_risk_tracking_student_id ON student_risk_tracking(student_id);
CREATE INDEX idx_risk_tracking_risk_level ON student_risk_tracking(risk_level);
CREATE INDEX idx_risk_tracking_attendance_rate ON student_risk_tracking(attendance_rate);

-- Alert indexes
CREATE INDEX idx_alerts_student_id ON student_alerts(student_id);
CREATE INDEX idx_alerts_status ON student_alerts(status);
CREATE INDEX idx_alerts_created_at ON student_alerts(created_at);

-- Report indexes
CREATE INDEX idx_reports_generated_by ON reports(generated_by);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_class_id ON reports(class_id);
CREATE INDEX idx_reports_department_id ON reports(department_id);
CREATE INDEX idx_reports_period ON reports(period_start, period_end);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_is_scheduled ON reports(is_scheduled);

-- Report template indexes
CREATE INDEX idx_report_templates_type ON report_templates(type);
CREATE INDEX idx_report_templates_category ON report_templates(category);
CREATE INDEX idx_report_templates_created_by ON report_templates(created_by);
CREATE INDEX idx_report_templates_is_public ON report_templates(is_public);

-- Report share indexes
CREATE INDEX idx_report_shares_report_id ON report_shares(report_id);
CREATE INDEX idx_report_shares_shared_by ON report_shares(shared_by);
CREATE INDEX idx_report_shares_shared_with ON report_shares(shared_with);
CREATE INDEX idx_report_shares_token ON report_shares(share_token);
CREATE INDEX idx_report_shares_expires_at ON report_shares(expires_at);
```

---

## Leaderboard & Gamification System

### 16. Student Points Table
```sql
CREATE TYPE point_type AS ENUM ('attendance', 'punctuality', 'streak', 'achievement', 'bonus', 'penalty');

CREATE TABLE student_points (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES users(id),
  class_id INTEGER REFERENCES classes(id),
  points INTEGER NOT NULL,
  point_type point_type NOT NULL,
  description VARCHAR(255),
  reference_id INTEGER, -- attendance_record_id, achievement_id, etc.
  awarded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 17. Student Achievements Table
```sql
CREATE TYPE achievement_category AS ENUM ('attendance', 'punctuality', 'consistency', 'improvement', 'special');

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category achievement_category NOT NULL,
  icon VARCHAR(100),
  points_reward INTEGER DEFAULT 0,
  requirement_type VARCHAR(50), -- 'attendance_rate', 'streak_days', 'perfect_weeks'
  requirement_value INTEGER,
  requirement_period INTEGER, -- days/weeks/months
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 18. Student Achievement Progress Table
```sql
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
```

### 19. Student Streaks Table
```sql
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
```

### 20. Leaderboard Rankings Table
```sql
CREATE TYPE ranking_period AS ENUM ('daily', 'weekly', 'monthly', 'semester', 'yearly');
CREATE TYPE ranking_scope AS ENUM ('global', 'class', 'department', 'year');

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
```

### 21. Gamification Indexes
```sql
-- Student points indexes
CREATE INDEX idx_student_points_student_id ON student_points(student_id);
CREATE INDEX idx_student_points_class_id ON student_points(class_id);
CREATE INDEX idx_student_points_type ON student_points(point_type);
CREATE INDEX idx_student_points_created_at ON student_points(created_at);

-- Achievement indexes
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_is_active ON achievements(is_active);

-- Student achievement indexes
CREATE INDEX idx_student_achievements_student_id ON student_achievements(student_id);
CREATE INDEX idx_student_achievements_achievement_id ON student_achievements(achievement_id);
CREATE INDEX idx_student_achievements_is_earned ON student_achievements(is_earned);
CREATE INDEX idx_student_achievements_earned_at ON student_achievements(earned_at);

-- Streak indexes
CREATE INDEX idx_student_streaks_student_id ON student_streaks(student_id);
CREATE INDEX idx_student_streaks_class_id ON student_streaks(class_id);
CREATE INDEX idx_student_streaks_current_streak ON student_streaks(current_streak);
CREATE INDEX idx_student_streaks_longest_streak ON student_streaks(longest_streak);

-- Leaderboard indexes
CREATE INDEX idx_leaderboard_student_id ON leaderboard_rankings(student_id);
CREATE INDEX idx_leaderboard_period_scope ON leaderboard_rankings(period, scope);
CREATE INDEX idx_leaderboard_rank_position ON leaderboard_rankings(rank_position);
CREATE INDEX idx_leaderboard_period_dates ON leaderboard_rankings(period_start, period_end);
CREATE INDEX idx_leaderboard_total_points ON leaderboard_rankings(total_points);
CREATE INDEX idx_leaderboard_attendance_rate ON leaderboard_rankings(attendance_rate);
```

---

## Messaging System

### 22. Messages Table
```sql
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
```

### 23. Message Recipients Table
```sql
CREATE TABLE message_recipients (
  id SERIAL PRIMARY KEY,
  message_id INTEGER REFERENCES messages(id),
  recipient_id INTEGER REFERENCES users(id),
  recipient_type VARCHAR(50), -- 'student', 'parent', 'staff'
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  status message_status DEFAULT 'sent',
  read_at TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 24. Messaging Indexes
```sql
-- Message indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_type ON messages(message_type);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_priority ON messages(priority);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_read_at ON messages(read_at);

-- Message recipient indexes
CREATE INDEX idx_message_recipients_message_id ON message_recipients(message_id);
CREATE INDEX idx_message_recipients_recipient_id ON message_recipients(recipient_id);
CREATE INDEX idx_message_recipients_status ON message_recipients(status);
CREATE INDEX idx_message_recipients_created_at ON message_recipients(created_at);rd_rankings(attendance_rate);
```

