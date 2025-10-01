import { apiService } from './api';
import { mockJustificationService } from './mockJustificationService';
import type { Notification, ApiResponse } from '../types';

// Use mock service for development
const USE_MOCK = true;

class NotificationService {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    if (USE_MOCK) {
      return mockJustificationService.getNotifications();
    }
    return apiService.get<Notification[]>('/api/notifications');
  }

  async markAsRead(id: string): Promise<ApiResponse<void>> {
    if (USE_MOCK) {
      return mockJustificationService.markAsRead(id);
    }
    return apiService.post<void>('/api/notifications/mark-read', { id });
  }

  async markAllAsRead(): Promise<ApiResponse<void>> {
    if (USE_MOCK) {
      return mockJustificationService.markAllAsRead();
    }
    return apiService.post<void>('/api/notifications/mark-all-read', {});
  }

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    if (USE_MOCK) {
      return mockJustificationService.getUnreadCount();
    }
    return apiService.get<{ count: number }>('/api/notifications/unread-count');
  }
}

export const notificationService = new NotificationService();