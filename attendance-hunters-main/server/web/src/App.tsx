import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { ClassesPage } from './pages/classes/ClassesPage';
import { StudentsPage } from './pages/students/StudentsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { StaffReportsPage } from './pages/reports/StaffReportsPage';
import { LeaderboardPage } from './pages/leaderboard/LeaderboardPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { FacultyPage } from './pages/faculty/FacultyPage';
import { DepartmentsPage } from './pages/departments/DepartmentsPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentSchedulePage } from './pages/calendar/StudentSchedulePage';
import { StudentClassesPage } from './pages/classes/StudentClassesPage';
import { StudentAttendancePage } from './pages/attendance/StudentAttendancePage';
import { StudentProfilePage } from './pages/profile/StudentProfilePage';
import { StaffProfilePage } from './pages/profile/StaffProfilePage';
import { ProfileSettingsPage } from './pages/profile/ProfileSettingsPage';
import { QRModePage } from './pages/attendance/QRModePage';
import { ManualModePage } from './pages/attendance/ManualModePage';
import { HybridModePage } from './pages/attendance/HybridModePage';
import { TakeAttendancePage } from './pages/attendance/TakeAttendancePage';
import { LoginPage } from './pages/auth/LoginPage';
import { MyJustificationsPage } from './pages/justification/MyJustificationsPage';
import { ReviewJustificationsPage } from './pages/justification/ReviewJustificationsPage';
import { DetentionPage } from './pages/detention/DetentionPage';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';
import { Loading } from './components/ui/loading';
import { NotificationContainer } from './components/ui/notification';
import { ErrorBoundary } from './components/ui/error-boundary';

function AppContent() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background transition-all duration-300">
        <Loading size="lg" fullScreen />
      </div>
    );
  }

  return (
    <Routes>
      {/* Login Routes - only when not authenticated */}
      {!isAuthenticated && (
        <>
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
      
      {/* Authenticated Routes */}
      {isAuthenticated && (
        <>
          {/* Admin Routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              <Route path="/admin" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
              <Route path={ROUTES.CLASSES} element={<ClassesPage />} />
              <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
              <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
              <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/detention" element={<DetentionPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/take-attendance" element={<TakeAttendancePage />} />
              <Route path="/attendance/take" element={<TakeAttendancePage />} />
              <Route path="/attendance/qr-mode" element={<QRModePage />} />
              <Route path="/attendance/manual-mode" element={<ManualModePage />} />
              <Route path="/attendance/hybrid-mode" element={<HybridModePage />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            </>
          )}
          
          {/* Staff Routes */}
          {user?.role === 'staff' && (
            <>
              <Route path="/" element={<Navigate to="/staff-dashboard" replace />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
              <Route path={ROUTES.CLASSES} element={<ClassesPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/detention" element={<DetentionPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
              <Route path="/staff-reports" element={<StaffReportsPage />} />
              <Route path="/staff-profile" element={<StaffProfilePage />} />
              <Route path="/review-justifications" element={<ReviewJustificationsPage />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
              <Route path="/attendance/take" element={<TakeAttendancePage />} />
              <Route path="/attendance/qr-mode" element={<QRModePage />} />
              <Route path="/attendance/manual-mode" element={<ManualModePage />} />
              <Route path="/attendance/hybrid-mode" element={<HybridModePage />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            </>
          )}
          
          {/* Student Routes */}
          {user?.role === 'student' && (
            <>
              <Route path="/" element={<Navigate to="/student-dashboard" replace />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path={ROUTES.ATTENDANCE} element={<StudentAttendancePage />} />
              <Route path="/calendar" element={<StudentSchedulePage />} />
              <Route path={ROUTES.CLASSES} element={<StudentClassesPage />} />
              <Route path="/profile" element={<StudentProfilePage />} />
              <Route path="/justifications" element={<MyJustificationsPage />} />
              <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            </>
          )}
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="animate-in fade-in duration-300">
          <NotificationContainer />
          <AppContent />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;