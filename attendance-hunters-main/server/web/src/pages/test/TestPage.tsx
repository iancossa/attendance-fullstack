import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const TestPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="p-8">
      <h1>Auth Test Page</h1>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User Role: {user?.role || 'None'}</p>
      <p>User Name: {user?.name || 'None'}</p>
    </div>
  );
};