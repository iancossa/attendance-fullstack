import { API_BASE_URL } from '../constants';
import type { ApiResponse } from '../types';
import { AuthManager } from '../utils/auth';

class ApiService {
  private baseURL = API_BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = AuthManager.getToken();
    const role = AuthManager.getRole();
    
    console.log('🌐 API Request:', { 
      url, 
      method: options.method || 'GET', 
      hasToken: !!token,
      userRole: role
    });
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      console.log('📨 API Response Status:', response.status);
      
      if (!response.ok) {
        // Handle authentication errors specifically
        if (response.status === 401) {
          console.error('🔐 Authentication failed - clearing auth data');
          AuthManager.clearAuth();
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ API Success:', result);
      
      // Backend returns data directly, wrap it in ApiResponse format
      return {
        data: result,
        success: true,
        message: 'Success'
      };
    } catch (error) {
      console.error('🚨 Fetch Error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        url,
        hasToken: !!token,
        userRole: role
      });
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();

// Helper functions using AuthManager
export const isAuthenticated = (): boolean => AuthManager.isAuthenticated();
export const getUserRole = (): string | null => AuthManager.getRole();
export const getUser = () => AuthManager.getUser();
export const canAccessStudents = (): boolean => AuthManager.canAccessStudents();
export const clearAuthData = (): void => AuthManager.clearAuth();

// Helper function to ensure user is logged in before making requests
export const ensureAuthenticated = (): boolean => {
  if (!isAuthenticated()) {
    console.warn('⚠️ No authentication token found - user needs to login');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return false;
  }
  return true;
};

// Helper function to ensure user can access admin/staff endpoints
export const ensureCanAccessStudents = (): boolean => {
  if (!canAccessStudents()) {
    console.warn('⚠️ Insufficient permissions - need admin/staff access');
    throw new Error('Access denied: Admin or staff role required');
  }
  return true;
};