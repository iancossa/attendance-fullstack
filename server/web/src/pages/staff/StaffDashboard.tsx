import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { 
  Users, 
  Calendar, 
  Clock, 
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  useDocumentTitle('Staff Dashboard');
  const navigate = useNavigate();
  const [currentStaff, setCurrentStaff] = useState<any>(null);

  useEffect(() => {
    const staffData = localStorage.getItem('staffInfo');
    if (staffData) {
      const staff = JSON.parse(staffData);
      setCurrentStaff({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        department: staff.department || 'Computer Science'
      });
    }
  }, []);
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-[#f8f8f2]">Staff Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">
              {currentStaff ? `Welcome, ${currentStaff.name}` : 'Manage your classes and track attendance'}
            </p>
          </div>
          <Button 
            onClick={() => navigate('/attendance/take')}
            className="hidden sm:flex"
          >
            <Plus className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
          <Button 
            onClick={() => navigate('/attendance/take')}
            size="sm"
            className="sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">My Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">5</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">active classes</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">142</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">across all classes</p>
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
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Today's Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">3</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">scheduled today</p>
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
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Avg Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">87%</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">this week</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '09:00 AM', class: 'Data Structures', room: 'CS-101', students: 45, status: 'completed', attendance: 92 },
                { time: '11:00 AM', class: 'Algorithms', room: 'CS-102', students: 38, status: 'current', attendance: 88 },
                { time: '02:00 PM', class: 'Database Systems', room: 'CS-103', students: 42, status: 'upcoming', attendance: 85 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">{item.time}</div>
                    <div>
                      <div className="font-medium text-green-800 dark:text-green-400">{item.class}</div>
                      <div className="text-xs text-green-600 dark:text-green-300">{item.room} • {item.students} students</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                    {item.status === 'completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                     item.status === 'current' ? <AlertCircle className="h-3 w-3 mr-1" /> : null}
                    {item.attendance}%
                  </Badge>
                </div>
              ))}
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
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Data Structures</span>
                  <span className="text-green-600 font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-50 dark:from-orange-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Algorithms</span>
                  <span className="text-orange-600 font-medium">88%</span>
                </div>
                <Progress value={88} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 dark:from-yellow-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Database Systems</span>
                  <span className="text-yellow-600 font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 dark:from-blue-500/10 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">Web Development</span>
                  <span className="text-blue-600 font-medium">90%</span>
                </div>
                <Progress value={90} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};