import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, XCircle, Users, CheckCircle, TrendingUp } from 'lucide-react';

export const StudentAttendancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [currentDate, setCurrentDate] = useState(new Date());

  const subjectData = [
    { sr: 1, code: '30310S220', subject: 'Digital Electronics', slotType: 'Theory', conducted: 28, present: 24, absent: 4, percentage: 85.71 },
    { sr: 2, code: '30310S221', subject: 'Digital Electronics Laboratory', slotType: 'Practical', conducted: 14, present: 14, absent: 0, percentage: 100.00 },
    { sr: 3, code: '30310B201', subject: 'Problem Solving With Data Structure', slotType: 'Theory', conducted: 36, present: 31, absent: 5, percentage: 86.11 },
    { sr: 4, code: '30310B202', subject: 'Problem Solving With Data Structure Laboratory', slotType: 'Practical', conducted: 24, present: 21, absent: 3, percentage: 87.50 },
    { sr: 5, code: '30310B203', subject: 'Database Information System', slotType: 'Theory', conducted: 29, present: 23, absent: 6, percentage: 79.31 },
    { sr: 6, code: '30310B204', subject: 'Database Information System Laboratory', slotType: 'Practical', conducted: 14, present: 13, absent: 1, percentage: 92.86 },
    { sr: 7, code: '30310B205', subject: 'Object Oriented Programming', slotType: 'Theory', conducted: 26, present: 24, absent: 2, percentage: 92.31 },
    { sr: 8, code: '30310B206', subject: 'Object Oriented Programming Laboratory', slotType: 'Practical', conducted: 13, present: 11, absent: 2, percentage: 84.62 },
    { sr: 9, code: '30319L202', subject: 'Discrete Mathematics', slotType: 'Theory', conducted: 42, present: 35, absent: 7, percentage: 83.33 },
    { sr: 10, code: '30319S203', subject: 'Professional Communication Skills', slotType: 'Theory', conducted: 26, present: 18, absent: 8, percentage: 69.23 },
    { sr: 11, code: 'VAC', subject: 'VAC', slotType: 'Other', conducted: 10, present: 10, absent: 0, percentage: 100.00 }
  ];

  const totalSlots = subjectData.reduce((sum, item) => sum + item.conducted, 0);
  const totalPresent = subjectData.reduce((sum, item) => sum + item.present, 0);
  const totalAbsent = subjectData.reduce((sum, item) => sum + item.absent, 0);
  const overallPercentage = ((totalPresent / totalSlots) * 100).toFixed(2);

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Attendance Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .info { margin-bottom: 20px; }
          .summary { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .stats { display: flex; justify-content: space-around; margin: 20px 0; }
          .stat-box { text-align: center; padding: 10px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Student Attendance Report</h1>
        </div>
        
        <div class="info">
          <p><strong>Student Name:</strong> John Doe</p>
          <p><strong>Student ID:</strong> ST001</p>
          <p><strong>Department:</strong> Computer Science</p>
          <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <h3>${totalSlots}</h3>
            <p>Total Slots</p>
          </div>
          <div class="stat-box">
            <h3>${totalPresent}</h3>
            <p>Present Slots</p>
          </div>
          <div class="stat-box">
            <h3>${totalAbsent}</h3>
            <p>Absent Slots</p>
          </div>
          <div class="stat-box">
            <h3>${overallPercentage}%</h3>
            <p>Attendance</p>
          </div>
        </div>
        
        <h2>Subject-wise Attendance</h2>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Type</th>
              <th>Conducted</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            ${subjectData.map(subject => `
              <tr>
                <td>${subject.sr}</td>
                <td>${subject.code}</td>
                <td>${subject.subject}</td>
                <td>${subject.slotType}</td>
                <td>${subject.conducted}</td>
                <td>${subject.present}</td>
                <td>${subject.absent}</td>
                <td>${subject.percentage}%</td>
              </tr>
            `).join('')}
            <tr style="font-weight: bold; background-color: #f9f9f9;">
              <td colspan="4">Total</td>
              <td>${totalSlots}</td>
              <td>${totalPresent}</td>
              <td>${totalAbsent}</td>
              <td>${overallPercentage}%</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const absentDaysData = [
    { sr: 1, date: '15-09-2025 Monday', conducted: 5, present: 0, absent: 5 },
    { sr: 2, date: '08-09-2025 Monday', conducted: 5, present: 4, absent: 1 },
    { sr: 3, date: '05-09-2025 Friday', conducted: 3, present: 0, absent: 3 },
    { sr: 4, date: '02-09-2025 Tuesday', conducted: 4, present: 2, absent: 2 },
    { sr: 5, date: '23-08-2025 Saturday', conducted: 3, present: 0, absent: 3 },
    { sr: 6, date: '12-08-2025 Tuesday', conducted: 2, present: 0, absent: 2 },
    { sr: 7, date: '08-08-2025 Friday', conducted: 1, present: 0, absent: 1 },
    { sr: 8, date: '29-07-2025 Tuesday', conducted: 3, present: 1, absent: 2 },
    { sr: 9, date: '26-07-2025 Saturday', conducted: 1, present: 0, absent: 1 },
    { sr: 10, date: '23-07-2025 Wednesday', conducted: 1, present: 0, absent: 1 }
  ];

  const partialAbsentDays = 3;
  const fullAbsentDays = 7;
  const totalAbsentSlots = 21;



  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-4xl font-bold">{totalSlots}</div>
                      <div className="text-purple-100 text-xs sm:text-sm mt-1">Total Slots</div>
                    </div>
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                      <Users className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-4xl font-bold">{totalPresent}</div>
                      <div className="text-teal-100 text-xs sm:text-sm mt-1">Present Slots</div>
                    </div>
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                      <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-4xl font-bold">{totalAbsent}</div>
                      <div className="text-red-100 text-xs sm:text-sm mt-1">Absent Slots</div>
                    </div>
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                      <XCircle className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-4xl font-bold">{overallPercentage}</div>
                      <div className="text-blue-100 text-xs sm:text-sm mt-1">Present %</div>
                    </div>
                    <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
                      <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot Type</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conducted</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subjectData.map((subject) => (
                        <tr key={subject.sr} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{subject.sr}</td>
                          <td className="px-2 sm:px-4 py-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">{subject.code}</div>
                            <div className="text-xs text-gray-500 hidden sm:block">{subject.subject}</div>
                          </td>
                          <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-900">{subject.slotType}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{subject.conducted}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{subject.present}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{subject.absent}</td>
                          <td className={`px-2 sm:px-4 py-3 text-sm font-medium ${getPercentageColor(subject.percentage)}`}>
                            {subject.percentage}%
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-medium">
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900" colSpan={3}>Total</td>
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{totalSlots}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{totalPresent}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{totalAbsent}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-bold text-blue-600">{overallPercentage}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'absent':
        return (
          <div className="space-y-4">
            {/* Absent Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-300 to-red-400 text-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{partialAbsentDays}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Partial Absent Days</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{fullAbsentDays}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Full Absent Days</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-700 to-red-800 text-white">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{totalAbsentSlots}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Total Absent Slots</div>
                </CardContent>
              </Card>
            </div>

            {/* Absent Days Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Date</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-blue-600">Conducted</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-green-600">Present</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-red-600">Absent</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {absentDaysData.map((day) => (
                        <tr key={day.sr} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{day.sr}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">{day.date}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm font-medium text-blue-600">{day.conducted}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm font-medium text-green-600">{day.present}</td>
                          <td className="px-2 sm:px-4 py-3 text-sm font-medium text-red-600">{day.absent}</td>
                          <td className="px-2 sm:px-4 py-3">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-medium">
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900" colSpan={2}>Total</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-bold text-blue-600">28</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-bold text-green-600">7</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-bold text-red-600">21</td>
                        <td className="px-2 sm:px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'month':
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start
        
        // Real attendance data based on subject data
        const attendanceCalendar: { [key: number]: 'present' | 'absent' } = {
          1: 'present', 2: 'absent', 3: 'absent', 5: 'absent', 8: 'absent', 9: 'present', 10: 'present',
          13: 'present', 15: 'absent', 16: 'present'
        };
        
        const getDayClass = (day: number) => {
          const status = attendanceCalendar[day];
          if (status === 'present') return 'bg-green-500 text-white';
          if (status === 'absent') return 'bg-red-500 text-white';
          return 'bg-white hover:bg-gray-50';
        };
        
        const navigateMonth = (direction: 'prev' | 'next') => {
          const newDate = new Date(currentDate);
          if (direction === 'prev') {
            newDate.setMonth(month - 1);
          } else {
            newDate.setMonth(month + 1);
          }
          setCurrentDate(newDate);
        };
        
        const renderCalendar = () => {
          const days = [];
          const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          
          // Add empty cells for days before the first day of the month
          for (let i = 0; i < adjustedFirstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-12 sm:h-16"></div>);
          }
          
          // Add days of the month
          for (let day = 1; day <= daysInMonth; day++) {
            days.push(
              <div
                key={day}
                className={`h-12 sm:h-16 flex items-center justify-center text-sm font-medium border cursor-pointer transition-colors ${
                  getDayClass(day)
                }`}
              >
                {day}
              </div>
            );
          }
          
          return (
            <div className="bg-gray-100 p-4 rounded-lg">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <span className="text-lg">&lt;</span>
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[month]} {year}
                </h3>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <span className="text-lg">&gt;</span>
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="bg-white rounded border">
                {/* Week Headers */}
                <div className="grid grid-cols-7 bg-gray-50">
                  {weekDays.map(day => (
                    <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-700 border-b">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {days}
                </div>
              </div>
            </div>
          );
        };
        
        return (
          <Card>
            <CardContent className="p-4">
              {renderCalendar()}
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Student Attendance</h1>
            <p className="text-sm text-gray-600">Track your attendance performance</p>
          </div>
          <Button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-fit">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'summary', label: 'Attendance Summary', shortLabel: 'Summary' },
              { id: 'absent', label: 'Absent Days', shortLabel: 'Absent' },
              { id: 'month', label: 'Month View', shortLabel: 'Monthly' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>



        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
};