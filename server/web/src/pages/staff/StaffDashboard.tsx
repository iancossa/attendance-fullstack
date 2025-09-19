import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { 
  Users, 
  Calendar, 
  Clock, 
  QrCode,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Staff Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your classes and track attendance</p>
          </div>
          <Button 
            onClick={() => navigate('/attendance/take')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">My Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">5</div>
                  <p className="text-xs text-gray-500 mt-1">active classes</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BookOpen className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">142</div>
                  <p className="text-xs text-gray-500 mt-1">across all classes</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Today's Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">3</div>
                  <p className="text-xs text-gray-500 mt-1">scheduled today</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Avg Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">87%</div>
                  <p className="text-xs text-gray-500 mt-1">this week</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
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
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-900">{item.time}</div>
                    <div>
                      <div className="font-medium text-green-800">{item.class}</div>
                      <div className="text-xs text-green-600">{item.room} • {item.students} students</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
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
              <div className="p-3 bg-gradient-to-r from-green-50 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Data Structures</span>
                  <span className="text-green-600 font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-50 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Algorithms</span>
                  <span className="text-orange-600 font-medium">88%</span>
                </div>
                <Progress value={88} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Database Systems</span>
                  <span className="text-yellow-600 font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Web Development</span>
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