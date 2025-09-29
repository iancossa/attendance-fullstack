-- Updated indexes for new structure
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_admins_user_id ON admins(user_id);
CREATE INDEX idx_staff_user_id ON staff(user_id);
CREATE INDEX idx_staff_employee_id ON staff(employee_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_student_id ON students(student_id);

-- Class indexes
CREATE INDEX idx_classes_faculty_id ON classes(faculty_id);
CREATE INDEX idx_classes_code ON classes(code);
CREATE INDEX idx_classes_department ON classes(department);
CREATE INDEX idx_classes_status ON classes(status);

-- Attendance indexes
CREATE INDEX idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_class_id ON attendance_records(class_id);
CREATE INDEX idx_attendance_date ON attendance_records(session_date);
CREATE INDEX idx_attendance_status ON attendance_records(status);
CREATE INDEX idx_attendance_method ON attendance_records(method);

-- Session indexes
CREATE INDEX idx_attendance_sessions_class_id ON attendance_sessions(class_id);
CREATE INDEX idx_attendance_sessions_date ON attendance_sessions(session_date);
CREATE INDEX idx_attendance_sessions_created_by ON attendance_sessions(created_by);
CREATE INDEX idx_attendance_sessions_status ON attendance_sessions(status);

-- QR session indexes
CREATE INDEX idx_qr_sessions_session_id ON qr_sessions(session_id);
CREATE INDEX idx_qr_sessions_attendance_session_id ON qr_sessions(attendance_session_id);
CREATE INDEX idx_qr_sessions_expires_at ON qr_sessions(expires_at);

-- Enrollment indexes
CREATE INDEX idx_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX idx_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX idx_enrollments_status ON class_enrollments(status);

-- Department indexes
CREATE INDEX idx_departments_code ON departments(code);
CREATE INDEX idx_departments_head_id ON departments(head_id);
CREATE INDEX idx_departments_type ON departments(type);
CREATE INDEX idx_departments_status ON departments(status);