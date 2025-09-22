import { apiService } from './api';
import { mockJustificationService } from './mockJustificationService';
import type { AbsenceJustification, JustificationFormData, ApiResponse } from '../types';

// Use mock service for development
const USE_MOCK = true;

class JustificationService {
  async submitJustification(attendanceId: string, data: JustificationFormData): Promise<ApiResponse<AbsenceJustification>> {
    if (USE_MOCK) {
      return mockJustificationService.submitJustification(attendanceId, data);
    }

    const formData = new FormData();
    formData.append('attendanceId', attendanceId);
    formData.append('reason', data.reason);
    formData.append('description', data.description);
    
    data.documents.forEach((file, index) => {
      formData.append(`documents`, file);
    });

    const response = await fetch('/api/justifications', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const result = await response.json();
    return { data: result, success: response.ok, message: response.ok ? 'Success' : 'Error' };
  }

  async getMyJustifications(): Promise<ApiResponse<AbsenceJustification[]>> {
    if (USE_MOCK) {
      return mockJustificationService.getMyJustifications();
    }
    return apiService.get<AbsenceJustification[]>('/api/justifications');
  }

  async getPendingJustifications(): Promise<ApiResponse<AbsenceJustification[]>> {
    if (USE_MOCK) {
      return mockJustificationService.getPendingJustifications();
    }
    return apiService.get<AbsenceJustification[]>('/api/justifications/pending');
  }

  async approveJustification(id: string, note?: string): Promise<ApiResponse<AbsenceJustification>> {
    if (USE_MOCK) {
      return mockJustificationService.approveJustification(id, note);
    }
    return apiService.put<AbsenceJustification>(`/api/justifications/${id}/approve`, { note });
  }

  async rejectJustification(id: string, note: string): Promise<ApiResponse<AbsenceJustification>> {
    if (USE_MOCK) {
      return mockJustificationService.rejectJustification(id, note);
    }
    return apiService.put<AbsenceJustification>(`/api/justifications/${id}/reject`, { note });
  }
}

export const justificationService = new JustificationService();