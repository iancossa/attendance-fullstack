import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Users, BookOpen, CheckCircle, GraduationCap, Clock, Building, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const StaffProfilePage: React.FC = () => {
  useDocumentTitle('Staff Profile');
  const { user } = useAuth();
  
  const qualifications = [
    { degree: 'M.S. Computer Science', institution: 'Stanford University', year: '2018', verified: true },
    { degree: 'B.Tech Computer Science', institution: 'University of Technology', year: '2016', verified: true },
    { degree: 'Teaching Certification', institution: 'Education Board', year: '2019', verified: true }
  ];



  const courses = [
    { code: '303105221', name: 'Digital Electronics Laboratory', students: 16, semester: 'Fall 2024', attendance: '84.2%' },
    { code: '303105222', name: 'Microprocessor Systems', students: 12, semester: 'Fall 2024', attendance: '86.3%' }
  ];

  const stats = [
    { label: 'Total Students', value: '28', icon: Users },
    { label: 'Courses Teaching', value: '2', icon: BookOpen },
    { label: 'Years Experience', value: '6', icon: Clock },
    { label: 'Avg Attendance', value: '85.3%', icon: TrendingUp }
  ];



  const departmentInfo = {
    name: 'Computer Science & Engineering',
    head: 'Dr. John Smith',
    faculty: 25,
    students: 450
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#f8f8f2]">Staff Profile</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Manage your professional information and courses</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-20 w-20 ring-4 ring-orange-100 dark:ring-orange-500/20">
                    <AvatarFallback className="text-xl bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'SU'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#f8f8f2]">{user?.name || 'Staff User'}</h2>
                    <p className="text-gray-600 dark:text-[#6272a4]">Faculty Member</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Faculty
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">{user?.email || 'staff@university.edu'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Computer Science Department</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Office: CS Building, Room 205</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Joined September 2019</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">{stat.label}</p>
                          <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">{stat.value}</div>
                          <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">current semester</p>
                        </div>
                        <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                          <Icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Current Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-400">{course.code} - {course.name}</p>
                      <p className="text-xs text-green-600 dark:text-green-300">{course.semester} • {course.students} students</p>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                      {course.attendance}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Academic Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 dark:from-green-500/10 to-transparent rounded-lg border border-green-200 dark:border-green-500/20">
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-400">{qual.degree}</h4>
                      <p className="text-sm text-green-600 dark:text-green-300">{qual.institution} • {qual.year}</p>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                      ✓ Verified
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Building className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Department</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{departmentInfo.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Department Head</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{departmentInfo.head}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Faculty Members</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{departmentInfo.faculty}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Total Students</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{departmentInfo.students}</p>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </Layout>
  );
};