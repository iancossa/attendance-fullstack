import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/endpoints';
import type { Class, Enrollment, ClassFilters } from '../types/api';

interface CreateClassData {
  name: string;
  code: string;
  subject: string;
  description?: string;
  faculty_id: number;
  room: string;
  capacity: number;
  schedule: string;
  department: string;
  semester: string;
  academic_year: string;
  credits: number;
  class_type: string;
}

interface UpdateClassData extends Partial<CreateClassData> {}

export const classService = {
  async getAllClasses(filters?: ClassFilters): Promise<Class[]> {
    let endpoint = API_ENDPOINTS.CLASSES;
    
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
      endpoint += `?${params.toString()}`;
    }
    
    const response = await apiClient.get<Class[]>(endpoint);
    return response.data;
  },

  async getClassById(id: number): Promise<Class> {
    const response = await apiClient.get<Class>(API_ENDPOINTS.CLASS_BY_ID(id));
    return response.data;
  },

  async createClass(data: CreateClassData): Promise<Class> {
    const response = await apiClient.post<Class>(API_ENDPOINTS.CLASSES, data);
    return response.data;
  },

  async updateClass(id: number, data: UpdateClassData): Promise<Class> {
    const response = await apiClient.put<Class>(API_ENDPOINTS.CLASS_BY_ID(id), data);
    return response.data;
  },

  async deleteClass(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CLASS_BY_ID(id));
  },

  // Enrollment management
  async getClassEnrollments(classId: number): Promise<Enrollment[]> {
    const response = await apiClient.get<Enrollment[]>(API_ENDPOINTS.CLASS_ENROLLMENTS(classId));
    return response.data;
  },

  async enrollStudent(classId: number, studentId: number): Promise<Enrollment> {
    const response = await apiClient.post<Enrollment>(API_ENDPOINTS.CLASS_ENROLLMENTS(classId), {
      student_id: studentId,
    });
    return response.data;
  },

  async unenrollStudent(classId: number, studentId: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.CLASS_ENROLLMENTS(classId)}/${studentId}`);
  },

  async bulkEnrollStudents(classId: number, studentIds: number[]): Promise<Enrollment[]> {
    const response = await apiClient.post<Enrollment[]>(`${API_ENDPOINTS.CLASS_ENROLLMENTS(classId)}/bulk`, {
      student_ids: studentIds,
    });
    return response.data;
  },
};