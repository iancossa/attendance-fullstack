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
        setUser({
          id: '1',
          email: 'admin@attendance.com',
          name: 'Admin User',
          role: 'admin'
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
        const response = await fetch('https://attendance-fullstack.onrender.com/api/auth/login', {
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
        // Demo login logic for admin only
        const isValidLogin = (role === 'admin' && email === 'admin@university.edu' && password === 'admin123');

        if (isValidLogin && role) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const token = `${role}_token_${Date.now()}`;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', role);
          
          const newUser = {
            id: '1',
            email: email,
            name: 'Admin User',
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('staffInfo');
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