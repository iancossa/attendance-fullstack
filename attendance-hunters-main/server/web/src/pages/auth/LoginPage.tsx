import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Users, UserCheck } from 'lucide-react';
import { useAppStore } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import logo from '../../assets/img/logo.png';

type UserRole = 'staff' | 'student';

export const LoginPage: React.FC = () => {
  useDocumentTitle('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const { addNotification } = useAppStore();
  const { login } = useAuth();
  const { theme } = useTheme();




  const getUserFriendlyError = (error: any) => {
    const message = error.message || '';
    if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('fetch')) {
      return 'Unable to connect to server. Please check your internet connection and try again.';
    }
    if (message.includes('Invalid credentials') || message.includes('401') || message.includes('Unauthorized')) {
      return 'Invalid email or password. Please check your credentials and try again.';
    }
    if (message.includes('500') || message.includes('Internal Server Error')) {
      return 'Server error occurred. Please try again in a few moments.';
    }
    if (message.includes('timeout') || message.includes('Request timeout')) {
      return 'Request timed out. Please check your connection and try again.';
    }
    return message || 'Login failed. Please try again.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const user = await login(email, password, activeRole);
      addNotification({ message: `Welcome back, ${user.name || activeRole}!`, type: 'success' });
      const destination = activeRole === 'staff' ? '/staff-dashboard' : '/student-dashboard';
      window.location.href = destination;
    } catch (error: any) {
      const friendlyError = getUserFriendlyError(error);
      setError(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-[#282a36] dark:to-slate-800 flex items-center justify-center p-3 md:p-4">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-primary dark:bg-[#282a36] rounded-full mb-3 md:mb-4">
            <img src={logo} alt="Logo" className="h-28 w-28 md:h-32 md:w-32 object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-[#f8f8f2]">Attendance Hunters</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-[#6272a4]">Sign in to your account</p>
        </div>

        {/* Role Tabs */}
        <div className="flex mb-4 md:mb-6 bg-gray-100 dark:bg-[#44475a] p-1 rounded-lg">
          <button
            onClick={() => setActiveRole('student')}
            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${
              activeRole === 'student'
                ? 'bg-white dark:bg-[#282a36] text-gray-900 dark:text-[#f8f8f2] shadow-sm'
                : 'text-gray-600 dark:text-[#6272a4] hover:text-gray-900 dark:hover:text-[#f8f8f2]'
            }`}
          >
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            Student
          </button>
          <button
            onClick={() => setActiveRole('staff')}
            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${
              activeRole === 'staff'
                ? 'bg-white dark:bg-[#282a36] text-gray-900 dark:text-[#f8f8f2] shadow-sm'
                : 'text-gray-600 dark:text-[#6272a4] hover:text-gray-900 dark:hover:text-[#f8f8f2]'
            }`}
          >
            <UserCheck className="h-3 w-3 md:h-4 md:w-4" />
            Staff
          </button>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="text-center pb-4 md:pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-lg md:text-xl text-gray-900 dark:text-[#f8f8f2]">
              Welcome Back
              <Badge variant="outline" className="ml-2 text-xs border-gray-300 dark:border-[#6272a4] text-gray-700 dark:text-[#6272a4]">
                {activeRole === 'student' ? 'Student' : 'Staff'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}



            <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                  {activeRole === 'student' ? 'Student Email' : 'Staff Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 md:h-11 text-sm md:text-base bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 md:h-11 text-sm md:text-base bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 dark:text-[#6272a4] hover:text-gray-900 dark:hover:text-[#f8f8f2]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-10 md:h-11 text-sm md:text-base bg-orange-600 dark:bg-[#bd93f9] hover:bg-orange-700 dark:hover:bg-[#bd93f9]/80 text-white dark:text-[#282a36]" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  `Sign In as ${activeRole === 'student' ? 'Student' : 'Staff'}`
                )}
              </Button>
            </form>

            <div className="mt-4 md:mt-6 text-center">
              <p className="text-xs md:text-sm text-gray-600 dark:text-[#6272a4]">
                Administrator?{' '}
                <a href="/admin" className="text-orange-600 dark:text-[#bd93f9] hover:text-orange-700 dark:hover:text-[#bd93f9]/80 hover:underline">
                  Admin Login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};