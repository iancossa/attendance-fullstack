import { useCallback } from 'react';
import { useApi, useMutation } from './useApi';
import { attendanceService } from '../services/attendanceService';
import { environment } from '../config/environment';
import type { 
  AttendanceSession, 
  AttendanceRecord, 
  CreateSessionData, 
  MarkAttendanceData,
  QRSessionStatus,
  QRSession
} from '../types/api';

export function useAttendance(classId?: number) {
  // Fetch attendance sessions with real-time polling
  const { 
    data: sessions, 
    loading: sessionsLoading, 
    error: sessionsError, 
    refetch: refetchSessions 
  } = useApi<AttendanceSession[]>(
    `/attendance/sessions${classId ? `?classId=${classId}` : ''}`,
    { 
      enabled: true,
      refetchInterval: environment.POLLING_INTERVAL // 2 seconds
    }
  );

  // Create session mutation
  const { mutate: createSessionMutate, loading: createLoading } = useMutation<AttendanceSession, CreateSessionData>(
    attendanceService.createAttendanceSession
  );

  // Mark attendance mutation
  const { mutate: markAttendanceMutate, loading: markLoading } = useMutation<AttendanceRecord, MarkAttendanceData>(
    attendanceService.markAttendance
  );

  // Bulk mark attendance mutation
  const { mutate: bulkMarkMutate, loading: bulkLoading } = useMutation<AttendanceRecord[], MarkAttendanceData[]>(
    attendanceService.bulkMarkAttendance
  );

  const createSession = useCallback(async (data: CreateSessionData) => {
    const result = await createSessionMutate(data);
    refetchSessions(); // Refresh sessions list
    return result;
  }, [createSessionMutate, refetchSessions]);

  const markAttendance = useCallback(async (data: MarkAttendanceData) => {
    const result = await markAttendanceMutate(data);
    refetchSessions(); // Refresh to get updated attendance
    return result;
  }, [markAttendanceMutate, refetchSessions]);

  const bulkMarkAttendance = useCallback(async (records: MarkAttendanceData[]) => {
    const result = await bulkMarkMutate(records);
    refetchSessions(); // Refresh to get updated attendance
    return result;
  }, [bulkMarkMutate, refetchSessions]);

  return {
    sessions,
    loading: sessionsLoading || createLoading || markLoading || bulkLoading,
    error: sessionsError,
    createSession,
    markAttendance,
    bulkMarkAttendance,
    refetchSessions,
  };
}

export function useQRSession(sessionId?: string) {
  const { 
    data: qrStatus, 
    loading, 
    error, 
    refetch 
  } = useApi<QRSessionStatus>(
    sessionId ? `/qr/session/${sessionId}` : '',
    { 
      enabled: !!sessionId,
      refetchInterval: environment.POLLING_INTERVAL // Real-time QR status updates
    }
  );

  // Generate QR session mutation
  const { mutate: generateQRMutate, loading: generateLoading } = useMutation<QRSession, string>(
    attendanceService.generateQRSession
  );

  // Mark attendance via QR mutation
  const { mutate: markViaQRMutate, loading: markLoading } = useMutation<AttendanceRecord, { sessionId: string; studentData: { studentId: string; studentName: string } }>(
    ({ sessionId, studentData }) => attendanceService.markAttendanceViaQR(sessionId, studentData)
  );

  const generateQR = useCallback(async (sessionId: string) => {
    return await generateQRMutate(sessionId);
  }, [generateQRMutate]);

  const markViaQR = useCallback(async (sessionId: string, studentData: { studentId: string; studentName: string }) => {
    const result = await markViaQRMutate({ sessionId, studentData });
    refetch(); // Refresh QR status
    return result;
  }, [markViaQRMutate, refetch]);

  return {
    qrStatus,
    loading: loading || generateLoading || markLoading,
    error,
    generateQR,
    markViaQR,
    refetch,
  };
}

export function useStudentAttendance(studentId?: number) {
  const { 
    data: attendanceRecords, 
    loading, 
    error, 
    refetch 
  } = useApi<AttendanceRecord[]>(
    studentId ? `/students/${studentId}/attendance` : '',
    { enabled: !!studentId }
  );

  return {
    attendanceRecords,
    loading,
    error,
    refetch,
  };
}