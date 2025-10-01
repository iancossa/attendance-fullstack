import { useState, useEffect } from 'react';
import { justificationService } from '../services/justificationService';
import { useAppStore } from '../store';
import type { AbsenceJustification, JustificationFormData } from '../types';

export const useJustifications = (isStaff = false) => {
  const [justifications, setJustifications] = useState<AbsenceJustification[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { addNotification } = useAppStore();

  const fetchJustifications = async () => {
    try {
      setLoading(true);
      const response = isStaff 
        ? await justificationService.getPendingJustifications()
        : await justificationService.getMyJustifications();
      setJustifications(response.data);
    } catch (error) {
      console.error('Failed to fetch justifications:', error);
      addNotification({
        message: 'Failed to load justifications',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const submitJustification = async (attendanceId: string, data: JustificationFormData) => {
    try {
      setSubmitting(true);
      await justificationService.submitJustification(attendanceId, data);
      addNotification({
        message: 'Justification submitted successfully',
        type: 'success'
      });
      await fetchJustifications();
    } catch (error) {
      console.error('Failed to submit justification:', error);
      addNotification({
        message: 'Failed to submit justification',
        type: 'error'
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const reviewJustification = async (id: string, action: 'approve' | 'reject', note?: string) => {
    try {
      if (action === 'approve') {
        await justificationService.approveJustification(id, note);
        addNotification({
          message: 'Justification approved',
          type: 'success'
        });
      } else {
        await justificationService.rejectJustification(id, note || '');
        addNotification({
          message: 'Justification rejected',
          type: 'info'
        });
      }
      await fetchJustifications();
    } catch (error) {
      console.error('Failed to review justification:', error);
      addNotification({
        message: 'Failed to process review',
        type: 'error'
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchJustifications();
  }, [isStaff]);

  return {
    justifications,
    loading,
    submitting,
    fetchJustifications,
    submitJustification,
    reviewJustification
  };
};