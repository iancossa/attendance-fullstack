import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Settings, 
  Users, 
  Clock, 
  Zap, 
  Globe, 
  School, 
  Calendar, 
  Timer, 
  Target, 
  Trophy, 
  Award, 
  UserPlus, 
  Download, 
  Upload,
  Link,
  Mail,
  Fingerprint,
  BookOpen,
  Save
} from 'lucide-react';
import { useAppStore } from '../../store';
export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const { addNotification } = useAppStore();

  const tabs = [
    { id: 'General', label: 'General', icon: <Settings className="h-4 w-4" /> },
    { id: 'Attendance', label: 'Attendance', icon: <Clock className="h-4 w-4" /> },
    { id: 'Users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    { id: 'Integrations', label: 'Integrations', icon: <Link className="h-4 w-4" /> }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your system configuration and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Config</span>
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save All</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full">
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 gap-2 text-sm ${activeTab === tab.id ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>

          {activeTab === 'General' && (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <School className="h-4 w-4" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <School className="h-4 w-4" />
                        Institution Name
                      </label>
                      <Input defaultValue="University of Technology" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Academic Year
                      </label>
                      <Input defaultValue="2024-2025" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Time Zone
                      </label>
                      <Input defaultValue="UTC-5 (Eastern Time)" />
                    </div>
                  </div>
                  <Button 
                    className="gap-2"
                    onClick={() => addNotification({ message: 'Settings saved successfully', type: 'success' })}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'Attendance' && (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Clock className="h-4 w-4" />
                    Attendance Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        Grace Period (minutes)
                      </label>
                      <Input type="number" defaultValue="15" />
                      <p className="text-xs text-gray-500">Students can mark attendance within this time</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Minimum Attendance (%)
                      </label>
                      <Input type="number" defaultValue="75" />
                      <p className="text-xs text-gray-500">Required for course completion</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Auto-mark Absent After (hours)
                      </label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>
                  <Button 
                    className="gap-2"
                    onClick={() => addNotification({ message: 'Attendance rules updated', type: 'success' })}
                  >
                    <Save className="h-4 w-4" />
                    Update Rules
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Trophy className="h-4 w-4" />
                    Gamification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">Enable Leaderboards</p>
                          <p className="text-sm text-gray-600">Show student rankings</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">Achievement Badges</p>
                          <p className="text-sm text-gray-600">Reward system for students</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Zap className="h-4 w-4" />
                    Configure Rewards
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'Users' && (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Users className="h-4 w-4" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Students</p>
                            <div className="text-2xl font-semibold text-gray-900 mt-2">402</div>
                            <p className="text-xs text-gray-500 mt-1">active accounts</p>
                          </div>
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Faculty</p>
                            <div className="text-2xl font-semibold text-gray-900 mt-2">8</div>
                            <p className="text-xs text-gray-500 mt-1">teaching staff</p>
                          </div>
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4 pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Admins</p>
                            <div className="text-2xl font-semibold text-gray-900 mt-2">3</div>
                            <p className="text-xs text-gray-500 mt-1">system admins</p>
                          </div>
                          <div className="p-2 bg-orange-50 rounded-lg">
                            <Settings className="h-5 w-5 text-orange-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex gap-3">
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add User
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Import Users
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'Integrations' && (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Link className="h-4 w-4" />
                    External Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Learning Management System</p>
                          <p className="text-sm text-gray-600">Sync with Canvas/Moodle</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-red-200 text-red-700">Not Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">Biometric Devices</p>
                          <p className="text-sm text-gray-600">Fingerprint scanners</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-red-200 text-red-700">Not Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">SMTP configuration</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Link className="h-4 w-4" />
                    Configure Integrations
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};