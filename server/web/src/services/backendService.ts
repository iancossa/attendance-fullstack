import { apiService } from './api';

// Auth Services
export const authService = {
  async login(email: string, password: string) {
    return await apiService.post('/auth/login', { email, password });
  },
  
  async register(userData: { email: string; password: string; name: string; employeeId: string }) {
    return await apiService.post('/auth/register', userData);
  }
};

// User Services  
export const userService = {
  async getProfile() {
    return await apiService.get('/users/profile');
  },
  
  async getAllUsers() {
    return await apiService.get('/users');
  },
  
  async updateUser(id: string, userData: any) {
    return await apiService.put(`/users/${id}`, userData);
  }
};

// Attendance Services
export const attendanceService = {
  async recordAttendance(data: { employeeId: string; type: string }) {
    return await apiService.post('/attendance', data);
  },
  
  async getAttendanceRecords(employeeId?: string, date?: string) {
    const params = new URLSearchParams();
    if (employeeId) params.append('employeeId', employeeId);
    if (date) params.append('date', date);
    return await apiService.get(`/attendance?${params.toString()}`);
  }
};

// Class Services
export const classService = {
  async getAllClasses() {
    return await apiService.get('/classes');
  },
  
  async createClass(classData: {
    name: string;
    code: string;
    faculty: string;
    maxStudents: number;
    schedule: string;
    room: string;
  }) {
    return await apiService.post('/classes', classData);
  },
  
  async updateClass(id: string, classData: any) {
    return await apiService.put(`/classes/${id}`, classData);
  },
  
  async deleteClass(id: string) {
    return await apiService.delete(`/classes/${id}`);
  }
};

// Student Auth Services
export const studentAuthService = {
  async login(email: string, password: string) {
    return await apiService.post('/student-auth/login', { email, password });
  },
  
  async getProfile(token: string) {
    return await apiService.get('/student-auth/profile');
  }
};

// QR Services
export const qrService = {
  async generateQRSession(classId: string, className: string) {
    return await apiService.post('/qr/generate', { classId, className });
  },
  
  async markAttendanceViaQR(sessionId: string, studentData: { studentId: string; studentName: string }) {
    return await apiService.post(`/qr/mark/${sessionId}`, studentData);
  },
  
  async getSessionStatus(sessionId: string) {
    return await apiService.get(`/qr/session/${sessionId}`);
  },
  
  async processQRScan(qrData: string, email: string, password: string) {
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

    // Login student
    const loginResponse = await this.studentLogin(email, password);
    if (!loginResponse.success) {
      throw new Error('Student login failed');
    }

    const student = loginResponse.data.student;
    
    // Mark attendance
    const markResponse = await this.markAttendanceViaQR(sessionData.sessionId, {
      studentId: student.studentId,
      studentName: student.name
    });

    if (!markResponse.success) {
      throw new Error('Attendance marking failed');
    }

    return {
      student,
      attendance: markResponse.data,
      sessionId: sessionData.sessionId
    };
  },
  
  async studentLogin(email: string, password: string) {
    const response = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'Login failed' };
    }
    
    const data = await response.json();
    return { success: true, data };
  }
};

// Department Services
export const departmentService = {
  async getAllDepartments(filters?: { type?: string; status?: string }) {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    return await apiService.get(`/departments?${params.toString()}`);
  },
  
  async getDepartmentById(id: string) {
    return await apiService.get(`/departments/${id}`);
  },
  
  async createDepartment(departmentData: {
    name: string;
    code: string;
    head: string;
    email: string;
    phone: string;
    type: string;
    programs?: number;
    description?: string;
    location?: string;
    budget?: number;
  }) {
    return await apiService.post('/departments', departmentData);
  },
  
  async updateDepartment(id: string, departmentData: any) {
    return await apiService.put(`/departments/${id}`, departmentData);
  },
  
  async deleteDepartment(id: string) {
    return await apiService.delete(`/departments/${id}`);
  },
  
  async getDepartmentFaculty(id: string) {
    return await apiService.get(`/departments/${id}/faculty`);
  },
  
  async addFacultyToDepartment(id: string, facultyData: {
    employeeId: string;
    name: string;
    email: string;
    phone?: string;
    position: string;
    qualification?: string;
    experience?: number;
    salary?: number;
  }) {
    return await apiService.post(`/departments/${id}/faculty`, facultyData);
  },
  
  async updateFaculty(departmentId: string, facultyId: string, facultyData: any) {
    return await apiService.put(`/departments/${departmentId}/faculty/${facultyId}`, facultyData);
  },
  
  async getDepartmentSettings(id: string) {
    return await apiService.get(`/departments/${id}/settings`);
  }
};

// Student Services
export const studentService = {
  async getAllStudents(filters?: { department?: string; year?: string; section?: string; status?: string }) {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.year) params.append('year', filters.year);
    if (filters?.section) params.append('section', filters.section);
    if (filters?.status) params.append('status', filters.status);
    return await apiService.get(`/students?${params.toString()}`);
  },
  
  async createStudent(studentData: {
    studentId: string;
    name: string;
    email: string;
    phone?: string;
    department: string;
    class: string;
    section: string;
    year: string;
    gpa?: number;
  }) {
    return await apiService.post('/students', studentData);
  },
  
  async updateStudent(id: string, studentData: any) {
    return await apiService.put(`/students/${id}`, studentData);
  },
  
  async getStudentAttendance(id: string, filters?: { startDate?: string; endDate?: string; classId?: string }) {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.classId) params.append('classId', filters.classId);
    return await apiService.get(`/students/${id}/attendance?${params.toString()}`);
  }
};

// Report Services
export const reportService = {
  async generateReport(reportData: { reportType: string; dateRange?: string; classId?: string }) {
    const response = await fetch(`${apiService['baseURL']}/reports/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(reportData)
    });
    
    if (!response.ok) throw new Error('Failed to generate report');
    return response.blob();
  }
};