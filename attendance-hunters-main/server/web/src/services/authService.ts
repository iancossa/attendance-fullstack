import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/endpoints';
import type { AuthResponse, User } from '../types/api';

export const authService = {
  // Staff/Admin login
  async staffLogin(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.STAFF_LOGIN, {
      email,
      password,
    });
    
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Student login
  async studentLogin(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.STUDENT_LOGIN, {
      email,
      password,
    });
    
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.PROFILE);
    return response.data;
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(API_ENDPOINTS.PROFILE, data);
    
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  // Refresh token
  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>(API_ENDPOINTS.REFRESH_TOKEN);
    
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data.token;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Get stored user
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get stored token
  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};