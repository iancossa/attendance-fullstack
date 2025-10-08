import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AuthManager } from '../utils/auth';
import { isAuthenticated, getUserRole, canAccessStudents } from '../services/api';

export const AuthDebug: React.FC = () => {
  const isAuth = isAuthenticated();
  const role = getUserRole();
  const user = AuthManager.getUser();
  const canAccess = canAccessStudents();
  const token = AuthManager.getToken();

  const demoLogin = async () => {
    try {
      const demoUser = await AuthManager.loginAdmin('admin@attendance.com', 'admin123');
      console.log('Demo login successful:', demoUser);
      window.location.reload();
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-3 bg-white border rounded-lg shadow-lg text-xs max-w-xs">
      <div className="font-bold mb-2">Auth Debug</div>
      <div className="space-y-1">
        <div>Authenticated: <Badge variant={isAuth ? "default" : "destructive"}>{isAuth ? 'Yes' : 'No'}</Badge></div>
        <div>Role: <Badge variant="outline">{role || 'None'}</Badge></div>
        <div>User: {user?.name || 'None'}</div>
        <div>Can Access Students: <Badge variant={canAccess ? "default" : "destructive"}>{canAccess ? 'Yes' : 'No'}</Badge></div>
        <div>Token: {token ? `${token.substring(0, 10)}...` : 'None'}</div>
      </div>
      <div className="mt-2 space-x-1">
        <Button size="sm" onClick={demoLogin}>Demo Login</Button>
        <Button size="sm" variant="outline" onClick={() => { AuthManager.clearAuth(); window.location.reload(); }}>Clear</Button>
      </div>
    </div>
  );
};