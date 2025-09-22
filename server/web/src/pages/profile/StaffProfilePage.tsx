import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Award, Users, BookOpen, CheckCircle, Star, GraduationCap, Clock } from 'lucide-react';

export const StaffProfilePage: React.FC = () => {
  const qualifications = [
    { degree: 'Ph.D. Computer Science', institution: 'MIT', year: '2018', verified: true },
    { degree: 'M.S. Software Engineering', institution: 'Stanford University', year: '2014', verified: true },
    { degree: 'B.Tech Computer Science', institution: 'IIT Delhi', year: '2012', verified: true }
  ];

  const achievements = [
    { title: 'Excellence in Teaching', description: 'Outstanding faculty award 2023', icon: Award, color: 'text-yellow-600' },
    { title: 'Research Publication', description: '15+ papers in top-tier conferences', icon: Star, color: 'text-purple-600' },
    { title: 'Student Mentor', description: 'Guided 50+ students to success', icon: Users, color: 'text-blue-600' }
  ];

  const courses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', students: 45, semester: 'Fall 2024' },
    { code: 'CS401', name: 'Database Management Systems', students: 38, semester: 'Fall 2024' },
    { code: 'CS501', name: 'Advanced Software Engineering', students: 25, semester: 'Fall 2024' }
  ];

  const stats = [
    { label: 'Total Students', value: '108', icon: Users },
    { label: 'Courses Teaching', value: '3', icon: BookOpen },
    { label: 'Years Experience', value: '8', icon: Clock },
    { label: 'Research Papers', value: '15', icon: Star }
  ];

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
                    <AvatarFallback className="text-xl bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#f8f8f2]">Dr. Sarah Wilson</h2>
                    <p className="text-gray-600 dark:text-[#6272a4]">Associate Professor</p>
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
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">sarah.wilson@university.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Office: CS Building, Room 301</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Joined January 2016</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                          <Icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-[#f8f8f2]">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-[#6272a4]">{stat.label}</div>
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
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{course.code} - {course.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-[#6272a4]">{course.semester}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">{course.students} students</div>
                    </div>
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
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{qual.degree}</h4>
                      <p className="text-sm text-gray-600 dark:text-[#6272a4]">{qual.institution} • {qual.year}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Verified
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Achievements & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <div className={`p-2 rounded-full bg-white dark:bg-[#44475a] ${achievement.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-[#6272a4]">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};