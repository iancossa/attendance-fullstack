// Core API Types based on DATABASE.md schema

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  status: 'active' | 'inactive' | 'suspended';
  phone?: string;
  avatarUrl?: string;
  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  student_id?: string;
  
  // Relations
  staff?: {
    id: number;
    employeeId: string;
    department?: string;
    position?: string;
    joinDate?: string;
  };
  
  admin?: {
    id: number;
    adminLevel: string;
    permissions?: any;
  };
}

export interface Class {
  id: number;
  name: string;
  code: string;
  subject: string;
  description?: string;
  faculty_id: number;
  room: string;
  capacity: number;
  schedule: string;
  department: string;
  semester: string;
  academic_year: string;
  credits: number;
  class_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  id: number;
  student_id: number;
  class_id: number;
  session_date: string;
  session_time?: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  method: 'qr' | 'manual' | 'hybrid';
  qr_session_id?: string;
  scan_timestamp?: string;
  is_justified: boolean;
  justification_id?: number;
  created_at: string;
  updated_at: string;
  recorded_by: number;
}

export interface AttendanceSession {
  id: number;
  session_id: string;
  class_id: number;
  created_by: number;
  session_date: string;
  session_time: string;
  session_type: 'lecture' | 'lab' | 'tutorial' | 'exam';
  location?: string;
  planned_topic?: string;
  target_learning?: string;
  target_level?: string;
  planning_status: 'planned' | 'in_progress' | 'completed';
  notes?: string;
  expires_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QRSession {
  id: number;
  session_id: string;
  attendance_session_id: number;
  qr_data: string;
  scan_count: number;
  max_scans?: number;
  expires_at: string;
  status: string;
  created_at: string;
}

export interface Enrollment {
  id: number;
  student_id: number;
  class_id: number;
  enrollment_date: string;
  status: string;
  grade?: string;
  created_at: string;
}

// Gamification Types
export interface StudentPoints {
  id: number;
  student_id: number;
  class_id?: number;
  points: number;
  point_type: 'attendance' | 'punctuality' | 'streak' | 'achievement' | 'bonus' | 'penalty';
  description?: string;
  reference_id?: number;
  awarded_by?: number;
  created_at: string;
}

export interface Achievement {
  id: number;
  name: string;
  description?: string;
  category: 'attendance' | 'punctuality' | 'consistency' | 'improvement' | 'special';
  icon?: string;
  points_reward: number;
  requirement_type?: string;
  requirement_value?: number;
  requirement_period?: number;
  is_active: boolean;
  created_at: string;
}

export interface StudentAchievement {
  id: number;
  student_id: number;
  achievement_id: number;
  progress: number;
  is_earned: boolean;
  earned_at?: string;
  created_at: string;
}

export interface StudentStreak {
  id: number;
  student_id: number;
  class_id: number;
  current_streak: number;
  longest_streak: number;
  last_attendance_date?: string;
  streak_start_date?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  id: number;
  student_id: number;
  class_id?: number;
  department_id?: number;
  period: 'daily' | 'weekly' | 'monthly' | 'semester' | 'yearly';
  scope: 'global' | 'class' | 'department' | 'year';
  rank_position: number;
  total_points: number;
  attendance_rate: number;
  streak_days: number;
  achievements_count: number;
  period_start: string;
  period_end: string;
  created_at: string;
}

// Request/Response Types
export interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

export interface CreateSessionData {
  class_id: number;
  session_date: string;
  session_time: string;
  session_type: 'lecture' | 'lab' | 'tutorial' | 'exam';
  location?: string;
  planned_topic?: string;
}

export interface MarkAttendanceData {
  student_id: number;
  class_id: number;
  session_date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  method: 'qr' | 'manual' | 'hybrid';
}

export interface QRSessionStatus {
  session_id: string;
  status: string;
  scan_count: number;
  expires_at: string;
  scanned_students: Array<{
    student_id: number;
    student_name: string;
    scan_time: string;
  }>;
}

// Filter Types
export interface AttendanceFilters {
  startDate?: string;
  endDate?: string;
  classId?: number;
  status?: string;
  method?: string;
}

export interface ClassFilters {
  department?: string;
  semester?: string;
  faculty_id?: number;
  status?: string;
}

export type LeaderboardScope = 'global' | 'class' | 'department' | 'year';
export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'semester' | 'yearly';
export type PointType = 'attendance' | 'punctuality' | 'streak' | 'achievement' | 'bonus' | 'penalty';