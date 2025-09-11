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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your system configuration and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Config
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save All
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full">
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 gap-2 ${activeTab === tab.id ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>

          {activeTab === 'General' && (
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>System Configuration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <School className="h-4 w-4" />
                        Institution Name
                      </label>
                      <Input defaultValue="University of Technology" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Academic Year
                      </label>
                      <Input defaultValue="2024-2025" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Time Zone
                      </label>
                      <Input defaultValue="UTC-5 (Eastern Time)" className="bg-background" />
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
              <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Attendance Rules</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        Grace Period (minutes)
                      </label>
                      <Input type="number" defaultValue="15" className="bg-background" />
                      <p className="text-xs text-muted-foreground">Students can mark attendance within this time</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Minimum Attendance (%)
                      </label>
                      <Input type="number" defaultValue="75" className="bg-background" />
                      <p className="text-xs text-muted-foreground">Required for course completion</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Auto-mark Absent After (hours)
                      </label>
                      <Input type="number" defaultValue="2" className="bg-background" />
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

              <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/30 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <CardTitle>Gamification Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <p className="font-medium">Enable Leaderboards</p>
                          <p className="text-sm text-muted-foreground">Show student rankings</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <p className="font-medium">Achievement Badges</p>
                          <p className="text-sm text-muted-foreground">Reward system for students</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enabled</Badge>
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
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>User Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Students</p>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">402</div>
                            <p className="text-xs text-muted-foreground mt-1">active accounts</p>
                          </div>
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 dark:from-purple-950/30 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Faculty</p>
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">8</div>
                            <p className="text-xs text-muted-foreground mt-1">teaching staff</p>
                          </div>
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 dark:from-orange-950/30 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Admins</p>
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">3</div>
                            <p className="text-xs text-muted-foreground mt-1">system admins</p>
                          </div>
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                            <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
              <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 dark:from-purple-950/30 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>External Integrations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-medium">Learning Management System</p>
                          <p className="text-sm text-muted-foreground">Sync with Canvas/Moodle</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-300">Not Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium">Biometric Devices</p>
                          <p className="text-sm text-muted-foreground">Fingerprint scanners</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">SMTP configuration</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
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