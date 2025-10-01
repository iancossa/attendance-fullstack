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
import { User, Mail, Lock, Camera, Save, CheckCircle, Shield, X } from 'lucide-react';
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
      
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const updatedUser = { ...userInfo, ...data.user };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      
      addNotification({ message: 'Profile updated successfully!', type: 'success' });
      setAvatarFile(null);
      setAvatarPreview(null);
      
      refreshUser();
    } catch (error: any) {
      addNotification({ message: error.message || 'Failed to update profile', type: 'error' });
      throw error;
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({ message: 'New passwords do not match', type: 'error' });
      throw new Error('Passwords do not match');
    }
    if (formData.newPassword.length < 6) {
      addNotification({ message: 'Password must be at least 6 characters', type: 'error' });
      throw new Error('Password too short');
    }
    
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
      throw error;
    }
  };

  return (
    <Layout>
      <div className="space-y-4 p-4 sm:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-[#f8f8f2]">Profile Settings</h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-[#6272a4]">Manage your account information and security</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-orange-100 dark:ring-orange-500/20">
                      {(avatarPreview || user?.avatarUrl) && <AvatarImage src={avatarPreview || user?.avatarUrl} alt={user?.name} />}
                      <AvatarFallback className="text-lg sm:text-xl bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-6 w-6 sm:h-8 sm:w-8" />}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 bg-orange-600 hover:bg-orange-700"
                    >
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
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
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#f8f8f2]">{user?.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-[#6272a4] break-all">{user?.email}</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {user?.role === 'admin' ? 'Administrator' : 
                       user?.role === 'staff' ? 'Faculty Staff' : 'Student'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-1.5 sm:mb-2">
                      Full Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <Input
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-sm"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-1.5 sm:mb-2">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    className="bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-1.5 sm:mb-2">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                      className="bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-1.5 sm:mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                      className="bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-sm"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-[#6272a4] mt-6 pt-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-gray-300 dark:border-[#6272a4] text-gray-700 dark:text-[#f8f8f2] hover:bg-gray-50 dark:hover:bg-[#44475a] text-sm w-full sm:w-auto"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleSaveProfile();
                if (formData.currentPassword && formData.newPassword && formData.confirmPassword) {
                  await handleChangePassword();
                }
              }}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm w-full sm:w-auto"
            >
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {loading ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};