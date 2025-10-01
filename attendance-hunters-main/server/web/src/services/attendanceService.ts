import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/endpoints';
import type {
  AttendanceSession,
  AttendanceRecord,
  QRSession,
  QRSessionStatus,
  CreateSessionData,
  MarkAttendanceData,
  AttendanceFilters,
} from '../types/api';

export const attendanceService = {
  // Session management
  async createAttendanceSession(data: CreateSessionData): Promise<AttendanceSession> {
    const response = await apiClient.post<AttendanceSession>(API_ENDPOINTS.ATTENDANCE_SESSIONS, data);
    return response.data;
  },

  async getAttendanceSessions(classId?: number): Promise<AttendanceSession[]> {
    const endpoint = classId 
      ? `${API_ENDPOINTS.ATTENDANCE_SESSIONS}?classId=${classId}`
      : API_ENDPOINTS.ATTENDANCE_SESSIONS;
    
    const response = await apiClient.get<AttendanceSession[]>(endpoint);
    return response.data;
  },

  async getAttendanceSessionById(id: number): Promise<AttendanceSession> {
    const response = await apiClient.get<AttendanceSession>(API_ENDPOINTS.ATTENDANCE_SESSION_BY_ID(id));
    return response.data;
  },

  // QR functionality
  async generateQRSession(sessionId: string): Promise<QRSession> {
    const response = await apiClient.post<QRSession>(API_ENDPOINTS.QR_GENERATE, { sessionId });
    return response.data;
  },

  async markAttendanceViaQR(sessionId: string, studentData: { studentId: string; studentName: string }): Promise<AttendanceRecord> {
    const response = await apiClient.post<AttendanceRecord>(API_ENDPOINTS.QR_MARK(sessionId), studentData);
    return response.data;
  },

  async getQRSessionStatus(sessionId: string): Promise<QRSessionStatus> {
    const response = await apiClient.get<QRSessionStatus>(API_ENDPOINTS.QR_STATUS(sessionId));
    return response.data;
  },

  // Manual attendance
  async markAttendance(data: MarkAttendanceData): Promise<AttendanceRecord> {
    const response = await apiClient.post<AttendanceRecord>(API_ENDPOINTS.ATTENDANCE_RECORDS, data);
    return response.data;
  },

  async bulkMarkAttendance(records: MarkAttendanceData[]): Promise<AttendanceRecord[]> {
    const response = await apiClient.post<AttendanceRecord[]>(`${API_ENDPOINTS.ATTENDANCE_RECORDS}/bulk`, { records });
    return response.data;
  },

  // Attendance records
  async getAttendanceRecords(filters?: AttendanceFilters): Promise<AttendanceRecord[]> {
    let endpoint = API_ENDPOINTS.ATTENDANCE_RECORDS;
    
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
      endpoint += `?${params.toString()}`;
    }
    
    const response = await apiClient.get<AttendanceRecord[]>(endpoint);
    return response.data;
  },

  async getStudentAttendance(studentId: number, filters?: AttendanceFilters): Promise<AttendanceRecord[]> {
    let endpoint = API_ENDPOINTS.STUDENT_ATTENDANCE(studentId);
    
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
      endpoint += `?${params.toString()}`;
    }
    
    const response = await apiClient.get<AttendanceRecord[]>(endpoint);
    return response.data;
  },

  // QR Processing (for student app)
  async processQRScan(qrData: string, email: string, password: string): Promise<{
    student: any;
    attendance: AttendanceRecord;
    sessionId: string;
  }> {
    // Parse QR data
    let sessionData;
    try {
      sessionData = JSON.parse(qrData);
    } catch {
      if (qrData.includes('/api/qr/mark/')) {
        const sessionId = qrData.split('/api/qr/mark/')[1];
        sessionData = { sessionId };
      } else {
        throw new Error('Invalid QR format');
      }
    }

    if (!sessionData.sessionId) {
      throw new Error('No session ID found in QR code');
    }

    // Login student first
    const { authService } = await import('./authService');
    const loginResponse = await authService.studentLogin(email, password);
    
    if (!loginResponse.user) {
      throw new Error('Student login failed');
    }

    const student = loginResponse.user;
    
    // Mark attendance
    const attendance = await this.markAttendanceViaQR(sessionData.sessionId, {
      studentId: student.student_id!.toString(),
      studentName: student.name
    });

    return {
      student,
      attendance,
      sessionId: sessionData.sessionId
    };
  },
};