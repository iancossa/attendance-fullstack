import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export const StudentSchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-09-01');

  const timeSlots = [
    '09:30 - 10:25',
    '10:45 - 11:40', 
    '12:00 - 12:55',
    '01:15 - 02:10',
    '02:30 - 03:25',
    '03:45 - 04:40'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const schedule = {
    'Monday': [
      { code: 'CS301', name: 'Data Structures', instructor: 'Dr. Smith', room: 'CS-101', type: 'CRT' },
      { code: 'CS302', name: 'Algorithms', instructor: 'Ms. Johnson', room: 'CS-102', type: 'PSS' },
      { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
      { code: 'CS303', name: 'Database Systems', instructor: 'Mr. Wilson', room: 'CS-103', type: 'CRT' },
      { code: 'CS304', name: 'Software Engineering', instructor: 'Dr. Brown', room: 'CS-104', type: 'SB' },
      { code: 'CS305', name: 'Computer Networks', instructor: 'Ms. Davis', room: 'CS-105', type: 'PSS' }
    ],
    'Tuesday': [
      { code: 'CS306', name: 'Operating Systems', instructor: 'Dr. Miller', room: 'CS-106', type: 'CRT' },
      { code: 'CS307', name: 'Web Development', instructor: 'Mr. Garcia', room: 'CS-107', type: 'SB' },
      { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
      { code: 'CS308', name: 'Mobile App Dev', instructor: 'Ms. Martinez', room: 'CS-108', type: 'PSS' },
      { code: 'CS309', name: 'AI Fundamentals', instructor: 'Dr. Anderson', room: 'CS-109', type: 'CRT' },
      { code: 'LAB', name: 'Programming Lab', instructor: 'Mr. Taylor', room: 'LAB-01', type: 'SB' }
    ],
    'Wednesday': [
      { code: 'CS301', name: 'Data Structures', instructor: 'Dr. Smith', room: 'CS-101', type: 'CRT' },
      { code: 'CS310', name: 'Machine Learning', instructor: 'Dr. White', room: 'CS-110', type: 'PSS' },
      { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
      { code: 'CS311', name: 'Cybersecurity', instructor: 'Ms. Thompson', room: 'CS-111', type: 'CRT' },
      { code: 'CS312', name: 'Cloud Computing', instructor: 'Mr. Lee', room: 'CS-112', type: 'SB' },
      { code: 'CS313', name: 'DevOps', instructor: 'Dr. Clark', room: 'CS-113', type: 'PSS' }
    ],
    'Thursday': [
      { code: 'CS302', name: 'Algorithms', instructor: 'Ms. Johnson', room: 'CS-102', type: 'PSS' },
      { code: 'CS314', name: 'Blockchain Tech', instructor: 'Mr. Rodriguez', room: 'CS-114', type: 'CRT' },
      { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
      { code: 'CS315', name: 'IoT Systems', instructor: 'Dr. Lewis', room: 'CS-115', type: 'SB' },
      { code: 'CS316', name: 'Data Analytics', instructor: 'Ms. Walker', room: 'CS-116', type: 'PSS' },
      { code: 'LAB', name: 'Project Lab', instructor: 'Mr. Hall', room: 'LAB-02', type: 'CRT' }
    ],
    'Friday': [
      { code: 'CS317', name: 'Software Testing', instructor: 'Dr. Young', room: 'CS-117', type: 'SB' },
      { code: 'CS318', name: 'System Design', instructor: 'Ms. King', room: 'CS-118', type: 'PSS' },
      { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
      { code: 'CS319', name: 'Distributed Systems', instructor: 'Mr. Wright', room: 'CS-119', type: 'CRT' },
      { code: 'CS320', name: 'Computer Graphics', instructor: 'Dr. Lopez', room: 'CS-120', type: 'SB' },
      { code: 'SEMINAR', name: 'Tech Seminar', instructor: 'Various', room: 'HALL-A', type: 'PSS' }
    ]
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CRT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PSS': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'SB': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Class Schedule</h1>
            <p className="text-sm text-gray-600">Academic Year 2024-25 | September 1-5, 2025</p>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 mb-2 text-base">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>
                  Student Timetable
                </CardTitle>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="font-medium text-gray-900">IT-3A-2025-26</div>
                  <div>PIET-1 - BTech - IT</div>
                  <div>06-09-2025</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto min-w-[150px] text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 sm:p-3 font-medium bg-orange-50 text-orange-800 text-sm">Time</th>
                    {days.map(day => (
                      <th key={day} className="text-center p-2 sm:p-3 font-medium bg-orange-50 text-orange-800 min-w-[180px] text-sm">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, timeIndex) => (
                    <tr key={time} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3 font-medium text-sm bg-orange-50/50">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-gray-700">{time}</span>
                        </div>
                      </td>
                      {days.map(day => {
                        const classInfo = schedule[day as keyof typeof schedule][timeIndex];
                        
                        if (classInfo.code === 'BREAK') {
                          return (
                            <td key={day} className="p-2 text-center">
                              <div className="bg-orange-100 p-2 rounded border-l-4 border-orange-500">
                                <span className="text-orange-700 font-medium text-sm">
                                  Lunch Break
                                </span>
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td key={day} className="p-1.5 sm:p-2">
                            <div className="bg-white border border-orange-200 rounded-lg p-2 sm:p-3 hover:shadow-sm hover:border-orange-300 transition-all">
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-bold text-sm text-orange-700">{classInfo.code}</span>
                                <Badge className={`text-xs ${getTypeColor(classInfo.type)}`}>
                                  {classInfo.type}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <div className="font-medium text-sm text-gray-900">{classInfo.name}</div>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <User className="h-3 w-3" />
                                  {classInfo.instructor}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <MapPin className="h-3 w-3" />
                                  {classInfo.room}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">CRT</Badge>
                <span className="text-sm">Core/Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">PSS</Badge>
                <span className="text-sm">Program Specification</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">SB</Badge>
                <span className="text-sm">Subject/Batch</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>Session Duration: 55 minutes</div>
              <div>Break Duration: 20 minutes</div>
              <div>Lunch Break: 12:55 - 01:15 PM</div>
              <div>Total Classes: 30 per week</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>Core Subjects: 12</div>
              <div>Electives: 8</div>
              <div>Lab Sessions: 4</div>
              <div>Seminars: 2</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};