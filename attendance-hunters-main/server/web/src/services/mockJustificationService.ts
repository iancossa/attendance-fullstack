import type { AbsenceJustification, JustificationFormData, Notification, ApiResponse } from '../types';

// Mock data for development
const mockJustifications: AbsenceJustification[] = [
  {
    id: '1',
    studentId: 'ST001',
    classId: 'CS101',
    date: '2024-01-15',
    reason: 'Medical/Health Issues',
    description: 'Had fever and was advised bed rest by doctor',
    status: 'approved',
    documents: ['medical_certificate.pdf'],
    submittedAt: '2024-01-16T10:00:00Z',
    reviewedAt: '2024-01-17T14:30:00Z',
    reviewedBy: 'STAFF001',
    reviewNote: 'Valid medical certificate provided. Approved.'
  },
  {
    id: '2',
    studentId: 'ST001',
    classId: 'CS102',
    date: '2024-01-20',
    reason: 'Family Emergency',
    description: 'Had to attend family emergency out of town',
    status: 'pending',
    documents: [],
    submittedAt: '2024-01-21T09:15:00Z'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'ST001',
    type: 'justification_status',
    title: 'Justification Approved',
    message: 'Your absence justification for Jan 15 has been approved',
    read: false,
    priority: 'normal',
    createdAt: '2024-01-17T14:30:00Z'
  },
  {
    id: '2',
    userId: 'ST001',
    type: 'absence_reminder',
    title: 'Submit Justification',
    message: 'Please submit justification for your absence on Jan 20',
    read: false,
    priority: 'high',
    createdAt: '2024-01-21T08:00:00Z'
  }
];

// Mock service implementation
export class MockJustificationService {
  private justifications = [...mockJustifications];
  private notifications = [...mockNotifications];

  async submitJustification(attendanceId: string, data: JustificationFormData): Promise<ApiResponse<AbsenceJustification>> {
    const newJustification: AbsenceJustification = {
      id: Date.now().toString(),
      studentId: 'ST001',
      classId: 'CS101',
      date: new Date().toISOString().split('T')[0],
      reason: data.reason,
      description: data.description,
      status: 'pending',
      documents: data.documents.map(f => f.name),
      submittedAt: new Date().toISOString()
    };

    this.justifications.push(newJustification);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: newJustification,
      success: true,
      message: 'Justification submitted successfully'
    };
  }

  async getMyJustifications(): Promise<ApiResponse<AbsenceJustification[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: this.justifications,
      success: true,
      message: 'Success'
    };
  }

  async getPendingJustifications(): Promise<ApiResponse<AbsenceJustification[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: this.justifications,
      success: true,
      message: 'Success'
    };
  }

  async approveJustification(id: string, note?: string): Promise<ApiResponse<AbsenceJustification>> {
    const justification = this.justifications.find(j => j.id === id);
    if (justification) {
      justification.status = 'approved';
      justification.reviewedAt = new Date().toISOString();
      justification.reviewNote = note;
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: justification!,
      success: true,
      message: 'Justification approved'
    };
  }

  async rejectJustification(id: string, note: string): Promise<ApiResponse<AbsenceJustification>> {
    const justification = this.justifications.find(j => j.id === id);
    if (justification) {
      justification.status = 'rejected';
      justification.reviewedAt = new Date().toISOString();
      justification.reviewNote = note;
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: justification!,
      success: true,
      message: 'Justification rejected'
    };
  }

  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      data: this.notifications,
      success: true,
      message: 'Success'
    };
  }

  async markAsRead(id: string): Promise<ApiResponse<void>> {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      data: undefined as any,
      success: true,
      message: 'Marked as read'
    };
  }

  async markAllAsRead(): Promise<ApiResponse<void>> {
    this.notifications.forEach(n => n.read = true);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      data: undefined as any,
      success: true,
      message: 'All marked as read'
    };
  }

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    const count = this.notifications.filter(n => !n.read).length;
    
    return {
      data: { count },
      success: true,
      message: 'Success'
    };
  }
}

export const mockJustificationService = new MockJustificationService();