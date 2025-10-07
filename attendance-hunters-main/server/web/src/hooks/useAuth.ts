import { useState, useEffect } from 'react';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    
    if (token && role) {
      // Get user info based on role
      if (role === 'student') {
        const studentInfo = localStorage.getItem('studentInfo');
        if (studentInfo) {
          const student = JSON.parse(studentInfo);
          setUser({
            id: student.id.toString(),
            email: student.email,
            name: student.name,
            role: 'student'
          });
        }
      } else {
        setUser({
          id: '1',
          email: 'admin@attendance.com',
          name: role === 'admin' ? 'Admin User' : 'Staff User',
          role: role as 'student' | 'staff' | 'admin'
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: 'admin' | 'staff' | 'student') => {
    try {
      if (role === 'student') {
        // Real API call for student login
        const response = await fetch('https://attendance-fullstack.onrender.com/api/student-auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        
        // Store token in both keys for compatibility
        localStorage.setItem('token', data.token);
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
      } else {
        // Demo login logic for admin/staff
        const isValidLogin = (
          (role === 'admin' && email === 'admin@attendance.com' && password === 'admin123') ||
          (role === 'staff' && email === 'staff@university.edu' && password === 'staff123')
        );

        if (isValidLogin && role) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const token = `${role}_token_${Date.now()}`;
          // Store token in both keys for compatibility
          localStorage.setItem('token', token);
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', role);
          
          const newUser = {
            id: '1',
            email: email,
            name: role === 'admin' ? 'Admin User' : 'Staff User',
            role: role
          };
          
          return new Promise<typeof newUser>((resolve) => {
            setUser(newUser);
            setTimeout(() => resolve(newUser), 50);
          });
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('studentInfo');
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