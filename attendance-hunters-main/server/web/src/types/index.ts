// Global type definitions
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'staff' | 'admin';
  avatarUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  timestamp?: string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  facultyId: string;
  schedule: string;
  room: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface AbsenceJustification {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  reason: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'absence_reminder' | 'justification_status' | 'attendance_alert' | 'class_reminder';
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  data?: any;
  createdAt: string;
  expiresAt?: string;
}

export interface JustificationFormData {
  reason: string;
  description: string;
  documents: File[];
}