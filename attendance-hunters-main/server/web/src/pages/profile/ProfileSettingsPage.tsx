import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { User, Mail, Lock, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfileSettingsPage: React.FC = () => {
  useDocumentTitle('Profile Settings');
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { addNotification } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addNotification({ message: 'Image size must be less than 5MB', type: 'error' });
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      // Update local storage with new user data
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const updatedUser = { ...userInfo, ...data.user };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      
      addNotification({ message: 'Profile updated successfully!', type: 'success' });
      setAvatarFile(null);
      setAvatarPreview(null);
      
      // Refresh user data in auth context
      refreshUser();
    } catch (error: any) {
      addNotification({ message: error.message || 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({ message: 'New passwords do not match', type: 'error' });
      return;
    }
    if (formData.newPassword.length < 6) {
      addNotification({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }

      addNotification({ message: 'Password changed successfully!', type: 'success' });
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error: any) {
      addNotification({ message: error.message || 'Failed to change password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2]">Profile Settings</h1>
              <p className="text-sm text-gray-600 dark:text-[#6272a4]">Manage your account information</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1 border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-orange-100 dark:ring-orange-500/20">
                    {(avatarPreview || user?.avatarUrl) && <AvatarImage src={avatarPreview || user?.avatarUrl} alt={user?.name} />}
                    <AvatarFallback className="text-xl bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">
                      {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-orange-600 hover:bg-orange-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">{user?.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">{user?.email}</p>
                  <Badge className="mt-2 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">
                    {user?.role === 'admin' ? 'Administrator' : 
                     user?.role === 'staff' ? 'Faculty Staff' : 'Student'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
                      Full Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Lock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleChangePassword}
                    disabled={loading || !formData.currentPassword || !formData.newPassword}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    {loading ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">Account Type</p>
                    <p className="text-gray-600 dark:text-[#6272a4]">
                      {user?.role === 'admin' ? 'Administrator' : 
                       user?.role === 'staff' ? 'Faculty Staff' : 'Student'}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">Member Since</p>
                    <p className="text-gray-600 dark:text-[#6272a4]">January 2024</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">Last Login</p>
                    <p className="text-gray-600 dark:text-[#6272a4]">Today at {new Date().toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">Status</p>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};