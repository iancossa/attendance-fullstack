import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import { Student } from '../../data/mockStudents';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'Present' | 'Absent' | 'Late';
  time: string;
  remarks?: string;
}

interface AttendanceHistoryModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceHistoryModal: React.FC<AttendanceHistoryModalProps> = ({ student, isOpen, onClose }) => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');

  if (!isOpen) return null;

  // Mock attendance history data
  const attendanceHistory: AttendanceRecord[] = [
    { id: '1', date: '2024-04-15', subject: 'Data Structures', status: 'Present', time: '09:00 AM' },
    { id: '2', date: '2024-04-15', subject: 'Database Management', status: 'Present', time: '11:00 AM' },
    { id: '3', date: '2024-04-14', subject: 'Web Development', status: 'Late', time: '10:15 AM', remarks: 'Arrived 15 minutes late' },
    { id: '4', date: '2024-04-14', subject: 'Software Engineering', status: 'Present', time: '02:00 PM' },
    { id: '5', date: '2024-04-13', subject: 'Computer Networks', status: 'Absent', time: '-', remarks: 'Medical leave' },
    { id: '6', date: '2024-04-13', subject: 'Data Structures', status: 'Present', time: '09:00 AM' },
    { id: '7', date: '2024-04-12', subject: 'Database Management', status: 'Present', time: '11:00 AM' },
    { id: '8', date: '2024-04-12', subject: 'Web Development', status: 'Present', time: '10:00 AM' },
    { id: '9', date: '2024-04-11', subject: 'Software Engineering', status: 'Late', time: '02:10 PM', remarks: 'Traffic delay' },
    { id: '10', date: '2024-04-11', subject: 'Computer Networks', status: 'Present', time: '03:00 PM' },
  ];

  const subjects = Array.from(new Set(attendanceHistory.map(record => record.subject)));

  const filteredHistory = attendanceHistory.filter(record => {
    const matchesStatus = filterStatus === 'All' || record.status === filterStatus;
    const matchesSubject = filterSubject === 'All' || record.subject === filterSubject;
    return matchesStatus && matchesSubject;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Absent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Attendance History</h2>
            <p className="text-sm text-gray-600">{student.name} - {student.studentId}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-600">Present</p>
                    <div className="text-xl font-semibold text-green-600">
                      {attendanceHistory.filter(r => r.status === 'Present').length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Absent</p>
                    <div className="text-xl font-semibold text-red-600">
                      {attendanceHistory.filter(r => r.status === 'Absent').length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 pt-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Late</p>
                    <div className="text-xl font-semibold text-yellow-600">
                      {attendanceHistory.filter(r => r.status === 'Late').length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-8 px-3 py-1 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="h-8 px-3 py-1 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="All">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterStatus('All');
                    setFilterSubject('All');
                  }}
                  className="h-8 px-3 text-sm"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance History Table */}
          <Card>
            <CardContent className="p-4 pt-6">
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-sm font-medium text-gray-900">Date</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900">Subject</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900">Time</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((record) => (
                      <TableRow key={record.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-sm">
                              {new Date(record.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-sm">{record.subject}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{record.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{record.remarks || '-'}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredHistory.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No attendance records found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
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