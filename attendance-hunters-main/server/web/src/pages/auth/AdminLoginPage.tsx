import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { useAuth } from '../../hooks/useAuth';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAppStore } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import logo from '../../assets/img/logo.png';

export const AdminLoginPage: React.FC = () => {
  useDocumentTitle('Admin Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { addNotification } = useAppStore();
  const { theme } = useTheme();




  const getUserFriendlyError = (error: any) => {
    const message = error.message || '';
    if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('fetch')) {
      return 'Unable to connect to server. Please check your internet connection and try again.';
    }
    if (message.includes('Invalid credentials') || message.includes('401') || message.includes('Unauthorized')) {
      return 'Invalid admin email or password. Please check your credentials and try again.';
    }
    if (message.includes('500') || message.includes('Internal Server Error')) {
      return 'Server error occurred. Please try again in a few moments.';
    }
    if (message.includes('timeout') || message.includes('Request timeout')) {
      return 'Request timed out. Please check your connection and try again.';
    }
    return message || 'Admin login failed. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password, 'admin');
      addNotification({ message: `Welcome back, ${user.name || 'Admin'}!`, type: 'success' });
      window.location.href = '/dashboard';
    } catch (error: any) {
      const friendlyError = getUserFriendlyError(error);
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-[#282a36] dark:via-[#44475a] dark:to-[#282a36] flex items-center justify-center p-3 md:p-4">
      <div className="w-full max-w-sm md:max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-purple-600 rounded-full mb-3 md:mb-4">
            <img src={logo} alt="Logo" className="h-28 w-28 md:h-32 md:w-32 object-contain filter brightness-0 invert" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white dark:text-[#f8f8f2] mb-2">Admin Portal</h1>
          <p className="text-sm md:text-base text-purple-200 dark:text-[#6272a4]">Secure administrative access</p>
          <Badge className="mt-2 bg-purple-600/20 dark:bg-[#bd93f9]/20 text-purple-200 dark:text-[#bd93f9] border-purple-400 dark:border-[#bd93f9] text-xs">
            Administrator Only
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 dark:bg-[#44475a]/50 backdrop-blur-md border-white/20 dark:border-[#6272a4]/50">
          <CardHeader className="text-center pb-4 md:pb-6">
            <CardTitle className="text-white dark:text-[#f8f8f2] text-lg md:text-xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 dark:bg-red-900/30 border-red-500/50 dark:border-red-400/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-200 dark:text-red-300">{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-white dark:text-[#f8f8f2]">Admin Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-purple-300 dark:text-[#6272a4]" />
                  <Input
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 md:h-11 bg-white/10 dark:bg-[#44475a] border-white/20 dark:border-[#6272a4] text-white dark:text-[#f8f8f2] placeholder:text-purple-200 dark:placeholder:text-[#6272a4] text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm font-medium text-white dark:text-[#f8f8f2]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-300 dark:text-[#6272a4]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 md:h-11 bg-white/10 dark:bg-[#44475a] border-white/20 dark:border-[#6272a4] text-white dark:text-[#f8f8f2] placeholder:text-purple-200 dark:placeholder:text-[#6272a4] text-sm md:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-purple-300 dark:text-[#6272a4] hover:text-white dark:hover:text-[#f8f8f2]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 md:h-11 bg-purple-600 dark:bg-[#bd93f9] hover:bg-purple-700 dark:hover:bg-[#bd93f9]/80 text-white dark:text-[#282a36] disabled:opacity-50 text-sm md:text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  'Sign In as Admin'
                )}
              </Button>
            </form>

            <div className="mt-4 md:mt-6 text-center">
              <p className="text-xs md:text-sm text-purple-200 dark:text-[#6272a4]">
                Not an admin?{' '}
                <Link to="/" className="text-purple-400 dark:text-[#bd93f9] hover:text-purple-300 dark:hover:text-[#bd93f9]/80 underline">
                  Staff/Student Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-4 md:mt-6 text-center">
          <p className="text-xs text-purple-300 dark:text-[#6272a4]">
            This is a secure administrative portal. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};