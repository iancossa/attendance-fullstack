import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Class, AttendanceRecord, LeaderboardEntry, Achievement, StudentPoints } from '../types/api';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Loading states
  loading: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
  
  // Error states
  errors: Record<string, string>;
  setError: (key: string, error: string) => void;
  clearError: (key: string) => void;
  
  // Notifications
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  addNotification: (notification: { message: string; type: 'success' | 'error' | 'info' }) => void;
  removeNotification: (id: string) => void;
  
  // Data state
  classes: Class[];
  students: User[];
  attendanceRecords: AttendanceRecord[];
  setClasses: (classes: Class[]) => void;
  setStudents: (students: User[]) => void;
  setAttendanceRecords: (records: AttendanceRecord[]) => void;
  
  // Gamification state
  leaderboard: LeaderboardEntry[];
  achievements: Achievement[];
  studentPoints: StudentPoints | null;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setStudentPoints: (points: StudentPoints | null) => void;
  
  // Real-time updates
  lastUpdate: number;
  setLastUpdate: () => void;
}

export const useEnhancedAppStore = create<AppState>()(persist(
  (set, get) => ({
    // Auth state
    user: null,
    isAuthenticated: false,
    token: null,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setToken: (token) => set({ token, isAuthenticated: !!token }),
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null, isAuthenticated: false });
    },
    
    // UI state
    sidebarOpen: true,
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    
    // Loading states
    loading: {},
    setLoading: (key, loading) => set((state) => ({ 
      loading: { ...state.loading, [key]: loading } 
    })),
    
    // Error states
    errors: {},
    setError: (key, error) => set((state) => ({ 
      errors: { ...state.errors, [key]: error } 
    })),
    clearError: (key) => set((state) => {
      const { [key]: _, ...rest } = state.errors;
      return { errors: rest };
    }),
    
    // Notifications
    notifications: [],
    addNotification: (notification) => set((state) => ({
      notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
    })),
    removeNotification: (id) => set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
    
    // Data state
    classes: [],
    students: [],
    attendanceRecords: [],
    setClasses: (classes) => set({ classes }),
    setStudents: (students) => set({ students }),
    setAttendanceRecords: (attendanceRecords) => set({ attendanceRecords }),
    
    // Gamification state
    leaderboard: [],
    achievements: [],
    studentPoints: null,
    setLeaderboard: (leaderboard) => set({ leaderboard }),
    setAchievements: (achievements) => set({ achievements }),
    setStudentPoints: (studentPoints) => set({ studentPoints }),
    
    // Real-time updates
    lastUpdate: Date.now(),
    setLastUpdate: () => set({ lastUpdate: Date.now() }),
  }),
  {
    name: 'enhanced-app-store',
    partialize: (state) => ({ 
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      sidebarOpen: state.sidebarOpen 
    }),
  }
));