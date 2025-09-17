import React from 'react';
import { X, Download, Calendar, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

import { Student } from '../../data/mockStudents';

interface AttendanceReportModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceReportModal: React.FC<AttendanceReportModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock attendance data
  const attendanceData = {
    totalClasses: 120,
    attendedClasses: Math.round(((student.attendance || 0) / 100) * 120),
    absentClasses: 120 - Math.round(((student.attendance || 0) / 100) * 120),
    lateArrivals: Math.floor(Math.random() * 10) + 1,
    monthlyData: [
      { month: 'Jan', attendance: 92 },
      { month: 'Feb', attendance: 88 },
      { month: 'Mar', attendance: 95 },
      { month: 'Apr', attendance: student.attendance || 0 },
    ]
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceBg = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const exportReport = () => {
    // Mock export functionality
    alert('Attendance report exported successfully!');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Attendance Report</h2>
            <p className="text-sm text-gray-600">{student.name} - {student.studentId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportReport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Overall Attendance</p>
                    <div className={`text-2xl font-semibold mt-2 ${getAttendanceColor(student.attendance || 0)}`}>
                      {student.attendance || 0}%
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Classes Attended</p>
                    <div className="text-2xl font-semibold text-green-600 mt-2">
                      {attendanceData.attendedClasses}
                    </div>
                    <p className="text-xs text-green-500">out of {attendanceData.totalClasses}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Classes Missed</p>
                    <div className="text-2xl font-semibold text-red-600 mt-2">
                      {attendanceData.absentClasses}
                    </div>
                    <p className="text-xs text-red-500">total absences</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Late Arrivals</p>
                    <div className="text-2xl font-semibold text-yellow-600 mt-2">
                      {attendanceData.lateArrivals}
                    </div>
                    <p className="text-xs text-yellow-500">this semester</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Monthly Attendance Trend</h3>
              <div className="space-y-4">
                {attendanceData.monthlyData.map((month, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getAttendanceBg(month.attendance || 0)}`}
                        style={{ width: `${month.attendance}%` }}
                      ></div>
                    </div>
                    <div className={`w-12 text-sm font-medium ${getAttendanceColor(month.attendance || 0)}`}>
                      {month.attendance}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Breakdown */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Subject-wise Attendance</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Data Structures', attendance: 95, total: 30 },
                  { subject: 'Database Management', attendance: 88, total: 28 },
                  { subject: 'Web Development', attendance: 92, total: 25 },
                  { subject: 'Software Engineering', attendance: 85, total: 22 },
                  { subject: 'Computer Networks', attendance: 78, total: 20 }
                ].map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{subject.subject}</div>
                      <div className="text-xs text-gray-600">{Math.round((subject.attendance / 100) * subject.total)}/{subject.total} classes</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getAttendanceBg(subject.attendance)}`}
                          style={{ width: `${subject.attendance}%` }}
                        ></div>
                      </div>
                      <Badge variant="outline" className={getAttendanceColor(subject.attendance)}>
                        {subject.attendance}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-2">
                {(student.attendance || 0) >= 90 ? (
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Excellent Attendance!</p>
                      <p className="text-xs text-green-600">Keep up the great work. Your consistent attendance is commendable.</p>
                    </div>
                  </div>
                ) : (student.attendance || 0) >= 75 ? (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Good Attendance</p>
                      <p className="text-xs text-yellow-600">Try to improve attendance to reach 90% for better academic standing.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                    <TrendingDown className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Attendance Below Requirement</p>
                      <p className="text-xs text-red-600">Immediate attention required. Please meet with academic advisor.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};