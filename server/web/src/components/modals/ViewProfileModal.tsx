import React from 'react';
import { X, Mail, Phone, Calendar, GraduationCap, User, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import { Student } from '../../data/mockStudents';

interface ViewProfileModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewProfileModal: React.FC<ViewProfileModalProps> = ({ student, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Suspended':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Student Profile</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{student.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{student.studentId}</Badge>
                <Badge className={getStatusColor(student.status || 'Active')}>{student.status || 'Active'}</Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{student.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{student.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Academic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{student.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{student.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="font-medium">Section {student.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Academic Year</p>
                  <p className="font-medium">Year {student.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-medium">{student.enrollmentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">GPA</p>
                  <p className="font-medium">{student.gpa?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-semibold ${getAttendanceColor(student.attendance || 0)}`}>
                    {student.attendance || 0}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Attendance Rate</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-semibold text-blue-600">
                    {student.gpa?.toFixed(1) || 'N/A'}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Current GPA</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-semibold text-green-600">
                    {student.status === 'Active' ? 'Good' : 'At Risk'}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Standing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Activity
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Last seen: {student.lastSeen}</span>
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