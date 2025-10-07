import { API_BASE_URL } from '../constants';
import type { ApiResponse } from '../types';

class ApiService {
  private baseURL = API_BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    console.log('🌐 API Request:', { url, method: options.method || 'GET', hasToken: !!token });
    
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
          console.error('🔐 Authentication failed - token may be invalid or missing');
          // Clear invalid token
          localStorage.removeItem('token');
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
        hasToken: !!token
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

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Helper function to ensure user is logged in before making requests
export const ensureAuthenticated = (): boolean => {
  if (!isAuthenticated()) {
    console.warn('⚠️ No authentication token found - user needs to login');
    // Redirect to login page or show login modal
    window.location.href = '/login';
    return false;
  }
  return true;
};