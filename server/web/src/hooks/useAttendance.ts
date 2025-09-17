import { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendanceService';
import { useAppStore } from '../store';
import { AttendanceRecord } from '../types';

export const useAttendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const { setLoading, addNotification } = useAppStore();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getAttendanceRecords();
      setRecords(data);
    } catch (error) {
      addNotification({ message: 'Failed to fetch attendance records', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await attendanceService.getAttendanceSummary();
      setSummary(data);
    } catch (error) {
      addNotification({ message: 'Failed to fetch attendance summary', type: 'error' });
    }
  };

  const markAttendance = async (studentId: string, classId: string, status: 'present' | 'absent' | 'late') => {
    try {
      await attendanceService.markAttendance({ studentId, classId, status });
      addNotification({ message: 'Attendance marked successfully', type: 'success' });
      fetchRecords(); // Refresh data
    } catch (error) {
      addNotification({ message: 'Failed to mark attendance', type: 'error' });
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchSummary();
  }, []);

  return {
    records,
    summary,
    markAttendance,
    refetch: fetchRecords
  };
};