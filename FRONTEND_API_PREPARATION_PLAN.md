# Frontend API Preparation Plan
## Collaborative Project - Frontend Ready for Backend Integration

## 🎯 Overview
Prepare `server/web` frontend to seamlessly integrate with upcoming backend APIs based on the comprehensive database schema in DATABASE.md.

## 📊 Database Schema Analysis

### Core Entities Identified:
- **Users** (unified: admin/staff/student)
- **Classes** with enrollments
- **Attendance Records** (QR/Manual/Hybrid)
- **QR Sessions** with expiration
- **Departments** and **Reports**
- **Gamification** (Points, Achievements, Streaks, Leaderboards)
- **Messaging System** and **Notifications**

## 🚀 Implementation Plan

### Phase 1: Core API Services (Week 1)

#### 1.1 Enhanced API Client
```typescript
// src/services/apiClient.ts
interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
}

class ApiClient {
  private config: ApiConfig;
  private requestQueue: RequestQueue;
  
  async request<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  async get<T>(endpoint: string): Promise<ApiResponse<T>>;
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>>;
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>>;
  async delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}
```

#### 1.2 Type Definitions
```typescript
// src/types/api.ts
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  status: 'active' | 'inactive' | 'suspended';
  // Role-specific fields
  employee_id?: string;
  student_id?: string;
  department?: string;
  class?: string;
  section?: string;
}

export interface Class {
  id: number;
  name: string;
  code: string;
  subject: string;
  faculty_id: number;
  room: string;
  schedule: string;
  department: string;
}

export interface AttendanceRecord {
  id: number;
  student_id: number;
  class_id: number;
  session_date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  method: 'qr' | 'manual' | 'hybrid';
  check_in_time?: string;
}
```

### Phase 2: Service Layer (Week 1-2)

#### 2.1 Authentication Services
```typescript
// src/services/authService.ts
export const authService = {
  // Staff/Admin login
  async staffLogin(email: string, password: string): Promise<AuthResponse>;
  
  // Student login
  async studentLogin(email: string, password: string): Promise<AuthResponse>;
  
  // Profile management
  async getProfile(): Promise<User>;
  async updateProfile(data: Partial<User>): Promise<User>;
  
  // Token management
  refreshToken(): Promise<string>;
  logout(): void;
};
```

#### 2.2 Class Management Services
```typescript
// src/services/classService.ts
export const classService = {
  async getAllClasses(filters?: ClassFilters): Promise<Class[]>;
  async getClassById(id: number): Promise<Class>;
  async createClass(data: CreateClassData): Promise<Class>;
  async updateClass(id: number, data: UpdateClassData): Promise<Class>;
  async deleteClass(id: number): Promise<void>;
  
  // Enrollment management
  async getClassEnrollments(classId: number): Promise<Enrollment[]>;
  async enrollStudent(classId: number, studentId: number): Promise<Enrollment>;
  async unenrollStudent(classId: number, studentId: number): Promise<void>;
};
```

#### 2.3 Attendance Services
```typescript
// src/services/attendanceService.ts
export const attendanceService = {
  // Session management
  async createAttendanceSession(data: CreateSessionData): Promise<AttendanceSession>;
  async getAttendanceSessions(classId: number): Promise<AttendanceSession[]>;
  
  // QR functionality
  async generateQRSession(sessionId: string): Promise<QRSession>;
  async markAttendanceViaQR(sessionId: string, studentData: StudentData): Promise<AttendanceRecord>;
  async getQRSessionStatus(sessionId: string): Promise<QRSessionStatus>;
  
  // Manual attendance
  async markAttendance(data: MarkAttendanceData): Promise<AttendanceRecord>;
  async bulkMarkAttendance(records: BulkAttendanceData[]): Promise<AttendanceRecord[]>;
  
  // Attendance records
  async getAttendanceRecords(filters: AttendanceFilters): Promise<AttendanceRecord[]>;
  async getStudentAttendance(studentId: number, filters?: AttendanceFilters): Promise<AttendanceRecord[]>;
};
```

#### 2.4 Gamification Services
```typescript
// src/services/gamificationService.ts
export const gamificationService = {
  // Points system
  async getStudentPoints(studentId: number): Promise<StudentPoints>;
  async awardPoints(studentId: number, points: number, type: PointType): Promise<void>;
  
  // Achievements
  async getAchievements(): Promise<Achievement[]>;
  async getStudentAchievements(studentId: number): Promise<StudentAchievement[]>;
  async checkAchievementProgress(studentId: number): Promise<AchievementProgress[]>;
  
  // Streaks
  async getStudentStreaks(studentId: number): Promise<StudentStreak[]>;
  async updateStreak(studentId: number, classId: number): Promise<StudentStreak>;
  
  // Leaderboards
  async getLeaderboard(scope: LeaderboardScope, period: LeaderboardPeriod): Promise<LeaderboardEntry[]>;
  async getStudentRanking(studentId: number): Promise<StudentRanking>;
};
```

### Phase 3: State Management (Week 2)

#### 3.1 Enhanced Store Structure
```typescript
// src/store/useAppStore.ts
interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // UI state
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  
  // Data state
  classes: Class[];
  students: User[];
  attendanceRecords: AttendanceRecord[];
  
  // Gamification state
  leaderboard: LeaderboardEntry[];
  achievements: Achievement[];
  studentPoints: StudentPoints | null;
  
  // Actions
  setUser: (user: User) => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string) => void;
  clearError: (key: string) => void;
}
```

#### 3.2 Custom Hooks
```typescript
// src/hooks/useApi.ts
export function useApi<T>(
  endpoint: string,
  options?: UseApiOptions
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// src/hooks/useAttendance.ts
export function useAttendance(classId?: number) {
  const { data: sessions, loading, error, refetch } = useApi(`/attendance/sessions${classId ? `?classId=${classId}` : ''}`);
  
  const createSession = async (data: CreateSessionData) => {
    // Implementation
  };
  
  const markAttendance = async (data: MarkAttendanceData) => {
    // Implementation
  };
  
  return { sessions, loading, error, refetch, createSession, markAttendance };
}

// src/hooks/useGamification.ts
export function useGamification(studentId?: number) {
  // Gamification-specific hooks
}
```

### Phase 4: Component Updates (Week 2-3)

#### 4.1 Enhanced QR Scanner
```typescript
// src/components/QRScanner.tsx
interface QRScannerProps {
  onScan: (data: string) => void;
  onError: (error: string) => void;
  sessionId?: string;
  autoSubmit?: boolean;
}

export function QRScanner({ onScan, onError, sessionId, autoSubmit }: QRScannerProps) {
  // Enhanced QR scanning with session validation
}
```

#### 4.2 Real-time Attendance Dashboard
```typescript
// src/components/AttendanceDashboard.tsx
export function AttendanceDashboard({ classId }: { classId: number }) {
  const { sessions, createSession, markAttendance } = useAttendance(classId);
  const [realTimeUpdates, setRealTimeUpdates] = useState<AttendanceRecord[]>([]);
  
  // Real-time polling for attendance updates
  useEffect(() => {
    const interval = setInterval(async () => {
      // Fetch latest attendance records
    }, 2000);
    
    return () => clearInterval(interval);
  }, [classId]);
}
```

#### 4.3 Gamification Components
```typescript
// src/components/LeaderboardWidget.tsx
export function LeaderboardWidget({ scope, period }: LeaderboardProps) {
  const { data: leaderboard } = useApi(`/gamification/leaderboard?scope=${scope}&period=${period}`);
  
  return (
    <div className="leaderboard-widget">
      {/* Leaderboard display */}
    </div>
  );
}

// src/components/AchievementBadge.tsx
export function AchievementBadge({ achievement, earned }: AchievementBadgeProps) {
  // Achievement badge component
}
```

### Phase 5: Error Handling & Loading States (Week 3)

#### 5.1 Global Error Handler
```typescript
// src/services/errorHandler.ts
export class ApiErrorHandler {
  static handle(error: ApiError): UserFriendlyError {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return { message: 'Connection lost. Please check your internet.', type: 'warning' };
      case 'UNAUTHORIZED':
        return { message: 'Session expired. Please login again.', type: 'error' };
      case 'VALIDATION_ERROR':
        return { message: error.details?.message || 'Invalid data provided.', type: 'error' };
      default:
        return { message: 'Something went wrong. Please try again.', type: 'error' };
    }
  }
}
```

#### 5.2 Loading State Components
```typescript
// src/components/ui/LoadingStates.tsx
export function AttendanceTableSkeleton() {
  // Skeleton for attendance table
}

export function DashboardSkeleton() {
  // Skeleton for dashboard
}

export function LeaderboardSkeleton() {
  // Skeleton for leaderboard
}
```

### Phase 6: Environment Configuration (Week 3)

#### 6.1 Environment Setup
```typescript
// src/config/environment.ts
interface Environment {
  API_BASE_URL: string;
  WS_URL: string;
  QR_EXPIRY_TIME: number;
  POLLING_INTERVAL: number;
  CACHE_TTL: number;
  ENABLE_MOCK: boolean;
}

export const environment: Environment = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  WS_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:5000',
  QR_EXPIRY_TIME: 300000, // 5 minutes
  POLLING_INTERVAL: 2000, // 2 seconds
  CACHE_TTL: 300000, // 5 minutes
  ENABLE_MOCK: process.env.NODE_ENV === 'development',
};
```

#### 6.2 API Endpoints Configuration
```typescript
// src/config/endpoints.ts
export const API_ENDPOINTS = {
  // Authentication
  STAFF_LOGIN: '/auth/login',
  STUDENT_LOGIN: '/student-auth/login',
  PROFILE: '/auth/profile',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Classes
  CLASSES: '/classes',
  CLASS_ENROLLMENTS: (id: number) => `/classes/${id}/enrollments`,
  
  // Attendance
  ATTENDANCE_SESSIONS: '/attendance/sessions',
  QR_GENERATE: '/qr/generate',
  QR_MARK: (sessionId: string) => `/qr/mark/${sessionId}`,
  QR_STATUS: (sessionId: string) => `/qr/session/${sessionId}`,
  
  // Gamification
  LEADERBOARD: '/gamification/leaderboard',
  ACHIEVEMENTS: '/gamification/achievements',
  STUDENT_POINTS: (id: number) => `/gamification/students/${id}/points`,
  
  // Reports
  REPORTS: '/reports',
  GENERATE_REPORT: '/reports/generate',
} as const;
```

## 📋 File Structure

```
server/web/src/
├── config/
│   ├── environment.ts
│   └── endpoints.ts
├── services/
│   ├── apiClient.ts
│   ├── authService.ts
│   ├── classService.ts
│   ├── attendanceService.ts
│   ├── gamificationService.ts
│   ├── reportService.ts
│   └── errorHandler.ts
├── types/
│   ├── api.ts
│   ├── auth.ts
│   ├── attendance.ts
│   └── gamification.ts
├── hooks/
│   ├── useApi.ts
│   ├── useAuth.ts
│   ├── useAttendance.ts
│   └── useGamification.ts
├── components/
│   ├── attendance/
│   │   ├── QRScanner.tsx
│   │   ├── AttendanceDashboard.tsx
│   │   └── AttendanceTable.tsx
│   ├── gamification/
│   │   ├── LeaderboardWidget.tsx
│   │   ├── AchievementBadge.tsx
│   │   └── PointsDisplay.tsx
│   └── ui/
│       ├── LoadingStates.tsx
│       └── ErrorBoundary.tsx
└── utils/
    ├── apiHelpers.ts
    └── dateHelpers.ts
```

## 🔧 Quick Implementation Steps

### Step 1: Install Dependencies
```bash
cd server/web
npm install @tanstack/react-query axios date-fns
```

### Step 2: Create Core Files
1. Enhanced API client with retry logic
2. Type definitions for all entities
3. Service layer for each domain
4. Custom hooks for data fetching
5. Error handling system

### Step 3: Update Existing Components
1. Enhance QR scanner with session validation
2. Add real-time polling to attendance pages
3. Implement loading states and error boundaries
4. Add gamification widgets to dashboard

### Step 4: Environment Configuration
1. Set up environment variables
2. Configure API endpoints
3. Add development/production configs

## 🎯 Expected API Endpoints

Based on database schema, prepare for these endpoints:

### Authentication
- `POST /api/auth/login` - Staff login
- `POST /api/student-auth/login` - Student login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh token

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class
- `GET /api/classes/:id` - Get class details
- `GET /api/classes/:id/enrollments` - Get enrollments

### Attendance
- `POST /api/attendance/sessions` - Create session
- `GET /api/attendance/sessions` - Get sessions
- `POST /api/qr/generate` - Generate QR code
- `POST /api/qr/mark/:sessionId` - Mark via QR
- `GET /api/qr/session/:sessionId` - Get QR status

### Gamification
- `GET /api/gamification/leaderboard` - Get leaderboard
- `GET /api/gamification/achievements` - Get achievements
- `GET /api/gamification/students/:id/points` - Get student points

### Reports
- `GET /api/reports` - Get reports
- `POST /api/reports/generate` - Generate report

## 🚀 Benefits

### For Collaboration
- **Clear API contracts** defined upfront
- **Type safety** for all data exchanges
- **Consistent error handling** across the app
- **Easy integration** when backend is ready

### For Development
- **Mock data support** for independent development
- **Real-time updates** ready for WebSocket integration
- **Caching strategy** for better performance
- **Loading states** for better UX

### For Production
- **Retry mechanisms** for network issues
- **Error recovery** for failed requests
- **Performance optimization** with caching
- **Scalable architecture** for future features

## 📅 Timeline

- **Week 1**: Core API client, types, and basic services
- **Week 2**: State management, hooks, and component updates
- **Week 3**: Error handling, loading states, and environment config
- **Week 4**: Testing, optimization, and documentation

This plan ensures your frontend is fully prepared for seamless backend integration while maintaining independent development capability.