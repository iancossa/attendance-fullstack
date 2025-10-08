import { useState, useEffect } from 'react';
import type { User } from '../types';
import { AuthManager, type AuthUser } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = AuthManager.getUser();
    if (authUser) {
      setUser({
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        role: authUser.role
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: 'admin' | 'staff' | 'student') => {
    try {
      let authUser: AuthUser;
      
      if (role === 'student') {
        authUser = await AuthManager.loginStudent(email, password);
      } else {
        // Try admin login first, fallback to demo credentials
        try {
          authUser = await AuthManager.loginAdmin(email, password);
        } catch {
          // Demo login fallback
          const isValidDemo = (
            (role === 'admin' && email === 'admin@attendance.com' && password === 'admin123') ||
            (role === 'staff' && email === 'staff@university.edu' && password === 'staff123')
          );
          
          if (isValidDemo && role) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const token = `demo_${role}_${Date.now()}`;
            authUser = {
              id: '1',
              email: email,
              name: role === 'admin' ? 'Admin User' : 'Staff User',
              role: role
            };
            AuthManager.setAuthData(token, authUser);
          } else {
            throw new Error('Invalid credentials');
          }
        }
      }
      
      const user = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.name,
        role: authUser.role
      };
      
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthManager.clearAuth();
    setUser(null);
    window.location.href = '/';
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};