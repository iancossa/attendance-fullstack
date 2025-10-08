import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { AuthManager } from '../utils/auth';
import { isAuthenticated, getUserRole, canAccessStudents } from '../services/api';
import { studentService } from '../services/backendService';

export const TestAuthPage: React.FC = () => {
  const [authStatus, setAuthStatus] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);
  const [email, setEmail] = useState('admin@attendance.com');
  const [password, setPassword] = useState('admin123');

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testAuth = async () => {
    try {
      addResult('🔍 Testing authentication...');
      
      // Test current auth status
      const isAuth = isAuthenticated();
      const role = getUserRole();
      const canAccess = canAccessStudents();
      
      addResult(`Current auth: ${isAuth}, Role: ${role}, Can access students: ${canAccess}`);
      
      if (!isAuth) {
        addResult('🔐 Attempting demo admin login...');
        const user = await AuthManager.loginAdmin(email, password);
        addResult(`✅ Login successful: ${user.name} (${user.role})`);
      }
      
      // Test students API
      addResult('📊 Testing students API...');
      const response = await studentService.getAllStudents();
      addResult(`✅ Students API response: ${JSON.stringify(response).substring(0, 100)}...`);
      
    } catch (error) {
      addResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearAuth = () => {
    AuthManager.clearAuth();
    addResult('🧹 Auth data cleared');
    setAuthStatus('');
  };

  useEffect(() => {
    const updateStatus = () => {
      const isAuth = isAuthenticated();
      const role = getUserRole();
      const user = AuthManager.getUser();
      setAuthStatus(`Auth: ${isAuth}, Role: ${role}, User: ${user?.name || 'None'}`);
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-gray-100 rounded">
            <strong>Status:</strong> {authStatus}
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Input 
              placeholder="Password" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={testAuth}>Test Auth & API</Button>
            <Button variant="outline" onClick={clearAuth}>Clear Auth</Button>
            <Button variant="outline" onClick={() => setTestResults([])}>Clear Results</Button>
          </div>
          
          <div className="border rounded p-3 h-64 overflow-y-auto bg-black text-green-400 font-mono text-sm">
            {testResults.map((result, i) => (
              <div key={i}>{result}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};