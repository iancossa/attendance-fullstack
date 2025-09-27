import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Award, Users, BookOpen, CheckCircle, Star } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  useDocumentTitle('My Profile');
  const certifications = [
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2024', verified: true },
    { name: 'Google Analytics Certified', issuer: 'Google', date: '2024', verified: true },
    { name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft', date: '2023', verified: false }
  ];

  const achievements = [
    { title: 'Perfect Attendance', description: '100% attendance for 3 consecutive months', icon: Award, color: 'text-yellow-600' },
    { title: 'Dean\'s List', description: 'Academic excellence recognition', icon: Star, color: 'text-purple-600' },
    { title: 'Coding Champion', description: 'Winner of inter-college programming contest', icon: BookOpen, color: 'text-blue-600' }
  ];

  const activities = [
    { role: 'President', organization: 'Computer Science Society', period: '2024-Present', type: 'Leadership' },
    { role: 'Team Lead', organization: 'Hackathon Club', period: '2023-2024', type: 'Technical' },
    { role: 'Volunteer', organization: 'Tech for Good Initiative', period: '2023-Present', type: 'Community' },
    { role: 'Member', organization: 'Debate Society', period: '2022-Present', type: 'Cultural' }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#f8f8f2]">My Profile</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Manage your personal information and achievements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-20 w-20 ring-4 ring-orange-100 dark:ring-orange-500/20">
                    <AvatarFallback className="text-xl bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#f8f8f2]">John Doe</h2>
                    <p className="text-gray-600 dark:text-[#6272a4]">@john.doe</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Student
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
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">john.doe@university.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">New York, NY</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                  <span className="text-sm text-gray-700 dark:text-[#f8f8f2]">Joined September 2022</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Student ID</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">ST001</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Program</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">BTech - Computer Science</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Year</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">3rd Year</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">CGPA</p>
                  <p className="font-medium text-green-600 dark:text-green-400">8.5/10.0</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Department</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">Computer Science</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-[#6272a4]">Overall Attendance</p>
                  <p className="font-medium text-orange-600 dark:text-orange-400">85.50%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Achievements & Badges
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

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Verified Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{cert.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-[#6272a4]">{cert.issuer} • {cert.date}</p>
                    </div>
                    <Badge className={cert.verified 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
                    }>
                      {cert.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  Extracurricular & Leadership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{activity.role}</h4>
                      <p className="text-sm text-gray-600 dark:text-[#6272a4]">{activity.organization}</p>
                      <p className="text-xs text-gray-500 dark:text-[#6272a4]">{activity.period}</p>
                    </div>
                    <Badge variant="outline" className="border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-400">{activity.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};