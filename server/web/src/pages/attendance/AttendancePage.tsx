import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { QrCode, UserCheck, Users, UserX, Clock, Search, Filter, Download, Edit, MoreVertical, Eye, History, MessageSquare, BarChart3 } from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { ATTENDANCE_RECORDS, MOCK_STUDENTS, Student } from '../../data/mockStudents';
import { ViewProfileModal } from '../../components/modals/ViewProfileModal';
import { EditDetailsModal } from '../../components/modals/EditDetailsModal';
import { AttendanceReportModal } from '../../components/modals/AttendanceReportModal';
import { AttendanceHistoryModal } from '../../components/modals/AttendanceHistoryModal';
import { SendMessageModal } from '../../components/modals/SendMessageModal';

export const AttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { addNotification } = useAppStore();
  
  const attendanceRecords = ATTENDANCE_RECORDS;

  const filteredRecords = attendanceRecords.filter(record => 
    record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalOpen = (studentName: string, modalType: string) => {
    const student = MOCK_STUDENTS.find(s => s.name === studentName);
    if (student) {
      setSelectedStudent(student);
      setActiveModal(modalType);
      setOpenDropdown(null);
    }
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setActiveModal(null);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Attendance Records</h1>
            <p className="text-sm text-gray-600">Track and manage student attendance</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/attendance/take')}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Scanner
            </Button>
            <Button 
              size="sm"
              onClick={() => navigate('/attendance/take')}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">285</div>
                  <p className="text-xs text-gray-500 mt-1">out of 342 total</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Absent Today</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">45</div>
                  <p className="text-xs text-gray-500 mt-1">requires follow-up</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <UserX className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">12</div>
                  <p className="text-xs text-gray-500 mt-1">within grace period</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Filter className="h-4 w-4 text-orange-600" />
              </div>
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search students or classes..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:max-w-sm">
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  exportToExcel(filteredRecords, 'attendance-records');
                  addNotification({ message: 'Attendance records exported successfully', type: 'success' });
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                Attendance Records ({filteredRecords.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600">
                Today: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">{record.student}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {record.class}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-gray-600">{record.time}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            record.status === 'present' 
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : record.status === 'absent'
                              ? 'bg-red-100 text-red-700 border-red-200'
                              : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors rounded-md flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === record.id ? null : record.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openDropdown === record.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'viewProfile')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'editDetails')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit Details
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'attendanceHistory')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <History className="h-4 w-4" />
                                  Attendance History
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'sendMessage')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  Send Message
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'attendanceReport')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <BarChart3 className="h-4 w-4" />
                                  Attendance Report
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No attendance records found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedStudent && (
        <>
          <ViewProfileModal
            student={selectedStudent}
            isOpen={activeModal === 'viewProfile'}
            onClose={handleModalClose}
          />
          <EditDetailsModal
            student={selectedStudent}
            isOpen={activeModal === 'editDetails'}
            onClose={handleModalClose}
            onSave={() => {}}
          />
          <AttendanceReportModal
            student={selectedStudent}
            isOpen={activeModal === 'attendanceReport'}
            onClose={handleModalClose}
          />
          <AttendanceHistoryModal
            student={selectedStudent}
            isOpen={activeModal === 'attendanceHistory'}
            onClose={handleModalClose}
          />
          <SendMessageModal
            student={selectedStudent}
            isOpen={activeModal === 'sendMessage'}
            onClose={handleModalClose}
          />
        </>
      )}
    </Layout>
  );
};