import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { TrendingUp, Users, Calendar, AlertTriangle, Plus } from 'lucide-react';
import { AttendanceChart, ClassPerformanceChart } from '../../components/charts';
import { useAttendance } from '../../hooks/useAttendance';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';


export const Dashboard: React.FC = () => {
  useDocumentTitle('Dashboard');
  const navigate = useNavigate();
  // Disable polling for dashboard - we don't need real-time updates here
  // const { sessions } = useAttendance();
  
  // Mock summary data until backend provides dashboard endpoint
  const summary = {
    todayAttendance: 85,
    presentStudents: 342,
    totalStudents: 402,
    alerts: 5
  };
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-[#f8f8f2]">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Welcome back, here's what's happening today</p>
          </div>
          <Button 
            onClick={() => navigate('/take-attendance')}
            className="hidden sm:flex"
          >
            <Plus className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
          <Button 
            onClick={() => navigate('/take-attendance')}
            size="sm"
            className="sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Today's Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">{summary?.todayAttendance || 85}%</div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +2% from yesterday</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Present Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">{summary?.presentStudents || 342}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">out of {summary?.totalStudents || 402} total</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Active Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">2</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">2 active courses</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Alerts</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">{summary?.alerts || 5}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">Low attendance warnings</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                Weekly Attendance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={[
                { day: 'Mon', attendance: 92 },
                { day: 'Tue', attendance: 88 },
                { day: 'Wed', attendance: 85 },
                { day: 'Thu', attendance: 90 },
                { day: 'Fri', attendance: 87 }
              ]} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                Class Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassPerformanceChart data={[
                { class: 'CS101', attendance: 94 },
                { class: 'MATH201', attendance: 90 },
                { class: 'ENG101', attendance: 83 },
                { class: 'PHY101', attendance: 78 }
              ]} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">303105221 - Digital Electronics Laboratory</p>
                  <p className="text-xs text-green-600 dark:text-green-300">Attendance marked - 14/16 present</p>
                </div>
                <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">90%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/20">
                <div>
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-400">303191202 - Discrete Mathematics</p>
                  <p className="text-xs text-orange-600 dark:text-orange-300">Attendance marked - 11/12 present</p>
                </div>
                <Badge className="bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">90%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border border-yellow-200 dark:border-yellow-500/20">
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">303105221 - Digital Electronics Laboratory</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300">Lab session - 13/16 present</p>
                </div>
                <Badge className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">80%</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-green-50 dark:from-green-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Monday</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-50 dark:from-orange-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Tuesday</span>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">88%</span>
                </div>
                <Progress value={88} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 dark:from-yellow-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Wednesday</span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 dark:from-blue-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Thursday</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">90%</span>
                </div>
                <Progress value={90} />
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 dark:from-purple-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Friday</span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium">87%</span>
                </div>
                <Progress value={87} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};