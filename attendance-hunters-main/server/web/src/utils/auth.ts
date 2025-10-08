// Authentication utilities
export const AUTH_KEYS = {
  TOKEN: 'token',
  AUTH_TOKEN: 'auth_token', 
  USER_ROLE: 'user_role',
  STUDENT_INFO: 'studentInfo',
  USER_INFO: 'userInfo'
} as const;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
}

export class AuthManager {
  static setAuthData(token: string, user: AuthUser): void {
    // Store token in both keys for compatibility
    localStorage.setItem(AUTH_KEYS.TOKEN, token);
    localStorage.setItem(AUTH_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(AUTH_KEYS.USER_ROLE, user.role);
    
    if (user.role === 'student') {
      localStorage.setItem(AUTH_KEYS.STUDENT_INFO, JSON.stringify(user));
    } else {
      localStorage.setItem(AUTH_KEYS.USER_INFO, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(AUTH_KEYS.TOKEN) || localStorage.getItem(AUTH_KEYS.AUTH_TOKEN);
  }

  static getRole(): string | null {
    return localStorage.getItem(AUTH_KEYS.USER_ROLE);
  }

  static getUser(): AuthUser | null {
    const role = this.getRole();
    if (!role) return null;

    try {
      if (role === 'student') {
        const studentInfo = localStorage.getItem(AUTH_KEYS.STUDENT_INFO);
        return studentInfo ? JSON.parse(studentInfo) : null;
      } else {
        const userInfo = localStorage.getItem(AUTH_KEYS.USER_INFO);
        return userInfo ? JSON.parse(userInfo) : null;
      }
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return !!(token && role);
  }

  static canAccessStudents(): boolean {
    const role = this.getRole();
    return role === 'admin' || role === 'staff';
  }

  static clearAuth(): void {
    Object.values(AUTH_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  static async loginAdmin(email: string, password: string): Promise<AuthUser> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Admin login failed');
    }

    const data = await response.json();
    const user: AuthUser = {
      id: data.user.id.toString(),
      email: data.user.email,
      name: data.user.name,
      role: data.user.role === 'employee' ? 'staff' : 'admin'
    };

    this.setAuthData(data.token, user);
    return user;
  }

  static async loginStudent(email: string, password: string): Promise<AuthUser> {
    const response = await fetch('/api/student-auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Student login failed');
    }

    const data = await response.json();
    const user: AuthUser = {
      id: data.student.id.toString(),
      email: data.student.email,
      name: data.student.name,
      role: 'student'
    };

    this.setAuthData(data.token, user);
    return user;
  }
}