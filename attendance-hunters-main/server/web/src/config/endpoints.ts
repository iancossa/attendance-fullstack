export const API_ENDPOINTS = {
  // Authentication
  STAFF_LOGIN: '/auth/login',
  STUDENT_LOGIN: '/student-auth/login',
  PROFILE: '/auth/profile',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  
  // Classes
  CLASSES: '/classes',
  CLASS_BY_ID: (id: number) => `/classes/${id}`,
  CLASS_ENROLLMENTS: (id: number) => `/classes/${id}/enrollments`,
  
  // Students
  STUDENTS: '/students',
  STUDENT_BY_ID: (id: number) => `/students/${id}`,
  STUDENT_ATTENDANCE: (id: number) => `/students/${id}/attendance`,
  
  // Attendance
  ATTENDANCE_RECORDS: '/attendance/records',
  ATTENDANCE_SESSIONS: '/attendance/sessions',
  ATTENDANCE_SESSION_BY_ID: (id: number) => `/attendance/sessions/${id}`,
  
  // QR System
  QR_GENERATE: '/qr/generate',
  QR_MARK: (sessionId: string) => `/qr/mark/${sessionId}`,
  QR_STATUS: (sessionId: string) => `/qr/session/${sessionId}`,
  
  // Gamification
  LEADERBOARD: '/gamification/leaderboard',
  ACHIEVEMENTS: '/gamification/achievements',
  STUDENT_POINTS: (id: number) => `/gamification/students/${id}/points`,
  STUDENT_ACHIEVEMENTS: (id: number) => `/gamification/students/${id}/achievements`,
  STUDENT_STREAKS: (id: number) => `/gamification/students/${id}/streaks`,
  
  // Departments
  DEPARTMENTS: '/departments',
  DEPARTMENT_BY_ID: (id: number) => `/departments/${id}`,
  
  // Reports
  REPORTS: '/reports',
  GENERATE_REPORT: '/reports/generate',
  REPORT_BY_ID: (id: number) => `/reports/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_NOTIFICATION_READ: (id: number) => `/notifications/${id}/read`,
  
  // Messages
  MESSAGES: '/messages',
  SEND_MESSAGE: '/messages/send',
} as const;