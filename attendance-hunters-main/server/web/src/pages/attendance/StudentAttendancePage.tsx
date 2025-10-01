import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, XCircle, Users, CheckCircle, TrendingUp, Eye, FileText } from 'lucide-react';
import { DayDetailsModal } from '../../components/modals/DayDetailsModal';
import { JustificationModal } from '../../components/justification/JustificationModal';
import { useAppStore } from '../../store';
import { useJustifications } from '../../hooks/useJustifications';
import type { JustificationFormData } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const StudentAttendancePage: React.FC = () => {
  useDocumentTitle('My Attendance');
  const [activeTab, setActiveTab] = useState('summary');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{date: string, data: any} | null>(null);
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<string>('');
  const { addNotification } = useAppStore();
  const { submitJustification, submitting } = useJustifications();

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

  const handleJustificationSubmit = async (data: JustificationFormData) => {
    try {
      await submitJustification(selectedAttendanceId, data);
      setShowJustificationModal(false);
      setSelectedAttendanceId('');
      addNotification({
        message: 'Justification submitted successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Failed to submit justification:', error);
    }
  };



  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white border-gray-200 dark:border-[#6272a4]">
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
              
              <Card className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white border-gray-200 dark:border-[#6272a4]">
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
              
              <Card className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white border-gray-200 dark:border-[#6272a4]">
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
              
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white border-gray-200 dark:border-[#6272a4]">
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

            <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#44475a]">
                      <tr>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Sr.</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Subject</th>
                        <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Slot Type</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Conducted</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Present</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Absent</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">%</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#282a36] divide-y divide-gray-200 dark:divide-[#6272a4]">
                      {subjectData.map((subject) => (
                        <tr key={subject.sr} className="hover:bg-gray-50 dark:hover:bg-[#44475a]">
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.sr}</td>
                          <td className="px-2 sm:px-4 py-3">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">{subject.code}</div>
                            <div className="text-xs text-gray-500 dark:text-[#6272a4] sm:hidden">{subject.subject}</div>
                            <div className="text-xs text-gray-500 dark:text-[#6272a4] hidden sm:block">{subject.subject}</div>
                            <div className="sm:hidden text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                              {subject.conducted}C • {subject.present}P • {subject.absent}A
                            </div>
                          </td>
                          <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.slotType}</td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.conducted}</td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.present}</td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.absent}</td>
                          <td className={`px-2 sm:px-4 py-3 text-sm font-medium ${getPercentageColor(subject.percentage)}`}>
                            {subject.percentage}%
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 dark:bg-[#44475a] font-medium">
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]" colSpan={2}>Total</td>
                        <td className="hidden lg:table-cell px-4 py-3"></td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{totalSlots}</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{totalPresent}</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{totalAbsent}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400">{overallPercentage}%</td>
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
              <Card className="bg-gradient-to-br from-red-300 to-red-400 dark:from-red-600 dark:to-red-700 text-white border-gray-200 dark:border-[#6272a4]">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{partialAbsentDays}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Partial Absent Days</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-700 dark:to-red-800 text-white border-gray-200 dark:border-[#6272a4]">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{fullAbsentDays}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Full Absent Days</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-700 to-red-800 dark:from-red-800 dark:to-red-900 text-white border-gray-200 dark:border-[#6272a4]">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-4xl font-bold">{totalAbsentSlots}</div>
                  <div className="text-red-100 text-xs sm:text-sm mt-1">Total Absent Slots</div>
                </CardContent>
              </Card>
            </div>

            {/* Absent Days Table */}
            <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#44475a]">
                      <tr>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Sr.</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">Date</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Conducted</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">Present</th>
                        <th className="hidden sm:table-cell px-2 sm:px-4 py-3 text-left text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">Absent</th>
                        <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#f8f8f2] uppercase tracking-wider">View</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#282a36] divide-y divide-gray-200 dark:divide-[#6272a4]">
                      {absentDaysData.map((day) => (
                        <tr key={day.sr} className="hover:bg-gray-50 dark:hover:bg-[#44475a]">
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]">{day.sr}</td>
                          <td className="px-2 sm:px-4 py-3">
                            <div className="text-sm text-gray-900 dark:text-[#f8f8f2]">{day.date}</div>
                            <div className="sm:hidden text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                              {day.conducted}C • {day.present}P • {day.absent}A
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">{day.conducted}</td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">{day.present}</td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">{day.absent}</td>
                          <td className="px-2 sm:px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  setSelectedDay({
                                    date: day.date,
                                    data: {
                                      conducted: day.conducted,
                                      present: day.present,
                                      absent: day.absent,
                                      subjects: [
                                        { code: '30310S220', name: 'Digital Electronics', time: '09:00 AM', status: day.present > 0 ? 'present' : 'absent' },
                                        { code: '30310B201', name: 'Data Structures', time: '11:00 AM', status: 'absent' },
                                        { code: '30310B203', name: 'Database Systems', time: '02:00 PM', status: 'absent' }
                                      ]
                                    }
                                  });
                                  setShowDayModal(true);
                                }}
                                className="p-1 text-gray-400 dark:text-[#6272a4] hover:text-gray-600 dark:hover:text-[#f8f8f2] transition-colors"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              {day.absent > 0 && (
                                <button 
                                  onClick={() => {
                                    setSelectedAttendanceId(`attendance_${day.sr}`);
                                    setShowJustificationModal(true);
                                  }}
                                  className="p-1 text-orange-400 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                                  title="Submit Justification"
                                >
                                  <FileText className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 dark:bg-[#44475a] font-medium">
                        <td className="px-2 sm:px-4 py-3 text-sm text-gray-900 dark:text-[#f8f8f2]" colSpan={2}>Total</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400">28</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">7</td>
                        <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400">21</td>
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
          return 'bg-white dark:bg-[#282a36] hover:bg-gray-50 dark:hover:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]';
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
                onClick={() => {
                  const status = attendanceCalendar[day];
                  setSelectedDay({
                    date: `${monthNames[month]} ${day}, ${year}`,
                    data: {
                      conducted: status ? 5 : 0,
                      present: status === 'present' ? 5 : 0,
                      absent: status === 'absent' ? 5 : 0,
                      subjects: [
                        { code: '30310S220', name: 'Digital Electronics', time: '09:00 AM', status: status || 'present' },
                        { code: '30310B201', name: 'Data Structures', time: '11:00 AM', status: status || 'present' },
                        { code: '30310B203', name: 'Database Systems', time: '02:00 PM', status: status || 'present' },
                        { code: '30310B205', name: 'OOP', time: '03:00 PM', status: status || 'present' },
                        { code: '30319L202', name: 'Discrete Math', time: '04:00 PM', status: status || 'present' }
                      ]
                    }
                  });
                  setShowDayModal(true);
                }}
                className={`h-12 sm:h-16 flex items-center justify-center text-sm font-medium border border-gray-200 dark:border-[#6272a4] cursor-pointer transition-colors ${
                  getDayClass(day)
                }`}
              >
                {day}
              </div>
            );
          }
          
          return (
            <div className="bg-gray-100 dark:bg-[#44475a] p-4 rounded-lg">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-[#6272a4] rounded text-gray-900 dark:text-[#f8f8f2]"
                >
                  <span className="text-lg">&lt;</span>
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">
                  {monthNames[month]} {year}
                </h3>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-[#6272a4] rounded text-gray-900 dark:text-[#f8f8f2]"
                >
                  <span className="text-lg">&gt;</span>
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="bg-white dark:bg-[#282a36] rounded border border-gray-200 dark:border-[#6272a4]">
                {/* Week Headers */}
                <div className="grid grid-cols-7 bg-gray-50 dark:bg-[#44475a]">
                  {weekDays.map(day => (
                    <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-[#f8f8f2] border-b border-gray-200 dark:border-[#6272a4]">
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
          <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-[#f8f8f2]">Student Attendance</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Track your attendance performance</p>
          </div>
          <Button 
            onClick={() => {
              generatePDF();
              addNotification({ message: 'Attendance report downloaded successfully', type: 'success' });
            }} 
            className="hidden sm:flex"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button 
            onClick={() => {
              generatePDF();
              addNotification({ message: 'Attendance report downloaded successfully', type: 'success' });
            }}
            size="sm"
            className="sm:hidden"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-[#6272a4]">
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
                    ? 'border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-[#6272a4] hover:text-gray-700 dark:hover:text-[#f8f8f2] hover:border-gray-300 dark:hover:border-[#6272a4]'
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
      
      {/* Day Details Modal */}
      {selectedDay && (
        <DayDetailsModal
          isOpen={showDayModal}
          onClose={() => {
            setShowDayModal(false);
            setSelectedDay(null);
          }}
          date={selectedDay.date}
          dayData={selectedDay.data}
        />
      )}
      
      {/* Justification Modal */}
      <JustificationModal
        isOpen={showJustificationModal}
        attendanceId={selectedAttendanceId}
        onClose={() => {
          setShowJustificationModal(false);
          setSelectedAttendanceId('');
        }}
        onSubmit={handleJustificationSubmit}
        isSubmitting={submitting}
      />
    </Layout>
  );
};