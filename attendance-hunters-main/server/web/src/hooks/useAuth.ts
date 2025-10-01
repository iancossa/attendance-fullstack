import { useState, useEffect } from 'react';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    
    if (token && role) {
      if (role === 'student') {
        const studentInfo = localStorage.getItem('studentInfo');
        if (studentInfo) {
          const student = JSON.parse(studentInfo);
          setUser({
            id: student.id?.toString() || '1',
            email: student.email,
            name: student.name,
            role: 'student'
          });
        }
      } else if (role === 'staff') {
        const staffInfo = localStorage.getItem('staffInfo');
        if (staffInfo) {
          const staff = JSON.parse(staffInfo);
          setUser({
            id: staff.id?.toString() || '1',
            email: staff.email,
            name: staff.name,
            role: 'staff'
          });
        }
      } else {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          const user = JSON.parse(userInfo);
          setUser({
            id: user.id?.toString() || '1',
            email: user.email,
            name: user.name,
            role: user.role,
            avatarUrl: user.avatarUrl
          });
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: 'admin' | 'staff' | 'student') => {
    try {
      if (role === 'student') {
        // Real API call for student login
        const response = await fetch('http://localhost:5000/api/student-auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Invalid credentials');
        }

        const data = await response.json();
        
        if (!data.success || !data.token) {
          throw new Error('Login failed - invalid response');
        }
        
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_role', 'student');
        localStorage.setItem('studentInfo', JSON.stringify(data.student));
        
        const newUser = {
          id: data.student.id.toString(),
          email: data.student.email,
          name: data.student.name,
          role: 'student' as const
        };
        
        return new Promise<typeof newUser>((resolve) => {
          setUser(newUser);
          setTimeout(() => resolve(newUser), 50);
        });
      } else if (role === 'staff') {
        // Real API call for staff login
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Invalid credentials');
        }

        const data = await response.json();
        
        if (!data.success || !data.token) {
          throw new Error('Login failed - invalid response');
        }
        
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_role', 'staff');
        localStorage.setItem('staffInfo', JSON.stringify(data.user));
        
        const newUser = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.name,
          role: 'staff' as const
        };
        
        return new Promise<typeof newUser>((resolve) => {
          setUser(newUser);
          setTimeout(() => resolve(newUser), 50);
        });
      } else {
        // Real API call for admin/staff login
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Invalid credentials');
        }

        const data = await response.json();
        
        if (!data.success || !data.token) {
          throw new Error('Login failed - invalid response');
        }
        
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_role', data.user.role);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        
        const newUser = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.name,
          role: data.user.role as 'admin' | 'staff',
          avatarUrl: data.user.avatarUrl
        };
        
        return new Promise<typeof newUser>((resolve) => {
          setUser(newUser);
          setTimeout(() => resolve(newUser), 50);
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('staffInfo');
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/';
  };

  const refreshUser = () => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    
    if (token && role && role !== 'student' && role !== 'staff') {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const userData = JSON.parse(userInfo);
        setUser({
          id: userData.id?.toString() || '1',
          email: userData.email,
          name: userData.name,
          role: userData.role,
          avatarUrl: userData.avatarUrl
        });
      }
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
};