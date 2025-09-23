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

### 1. Users Table (Unified)
```sql
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'student');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

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
```

### 2. Classes Table
```sql
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  faculty_id INTEGER REFERENCES users(id),
  room VARCHAR(100),
  capacity INTEGER DEFAULT 50,
  schedule VARCHAR(255), -- "Mon,Wed,Fri 09:00-10:30"
  department VARCHAR(100),
  semester VARCHAR(50),
  academic_year VARCHAR(20),
  credits INTEGER DEFAULT 3,
  class_type VARCHAR(10), -- CRT, PSS, SB, etc.
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Class Enrollments Table
```sql
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
```

### 4. Attendance Records Table
```sql
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE attendance_method AS ENUM ('qr', 'manual', 'hybrid');

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
```

### 5. Attendance Sessions Table
```sql
CREATE TYPE session_type AS ENUM ('lecture', 'lab', 'tutorial', 'exam');
CREATE TYPE planning_status AS ENUM ('planned', 'in_progress', 'completed');

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
```

### 6. QR Sessions Table
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

### 7. Absence Justifications Table
```sql
CREATE TYPE justification_reason AS ENUM ('medical', 'family', 'emergency', 'academic', 'other');
CREATE TYPE justification_status AS ENUM ('pending', 'approved', 'rejected');

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
```

### 8. Departments Table
```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  head_id INTEGER REFERENCES users(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 9. Notifications Table
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

### 10. Indexes for Performance
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
```

