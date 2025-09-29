import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { UserCheck, Users, UserX, Clock, Search, Filter, Download, Edit, MoreVertical, Eye, History, MessageSquare, BarChart3 } from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { ATTENDANCE_RECORDS, MOCK_STUDENTS, Student } from '../../data/mockStudents';
import { ViewProfileModal } from '../../components/modals/ViewProfileModal';
import { EditDetailsModal } from '../../components/modals/EditDetailsModal';
import { AttendanceReportModal } from '../../components/modals/AttendanceReportModal';
import { AttendanceHistoryModal } from '../../components/modals/AttendanceHistoryModal';
import { SendMessageModal } from '../../components/modals/SendMessageModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AttendancePage: React.FC = () => {
  useDocumentTitle('Attendance Records');
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Attendance Records</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Track and manage student attendance</p>
          </div>
          <div className="flex gap-2">
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
          <Card className="border-l-4 border-l-green-500 dark:border-l-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Present Today</p>
                  <div className="text-2xl font-semibold text-green-900 dark:text-green-200 mt-2">285</div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">out of 342 total</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 dark:border-l-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Absent Today</p>
                  <div className="text-2xl font-semibold text-red-900 dark:text-red-200 mt-2">45</div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">requires follow-up</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
                  <UserX className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500 dark:border-l-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Late Arrivals</p>
                  <div className="text-2xl font-semibold text-yellow-900 dark:text-yellow-200 mt-2">12</div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">within grace period</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-[#f8f8f2]">
              <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg">
                <Filter className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                <Input 
                  placeholder="Search students or classes..." 
                  className="pl-10 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:max-w-sm">
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
              <Button 
                className="bg-orange-50 dark:bg-[#44475a] border-orange-200 dark:border-[#6272a4] text-orange-700 dark:text-[#f8f8f2] hover:bg-orange-100 dark:hover:bg-[#6272a4]"
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
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                Attendance Records ({filteredRecords.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600 dark:text-[#6272a4] border-gray-300 dark:border-[#6272a4]">
                Today: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-[#6272a4] overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#44475a]">
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] min-w-[120px]">Student</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Class</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden lg:table-cell">Time</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] w-[60px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] bg-white dark:bg-[#282a36]">
                        <TableCell className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                          <div>
                            <div className="font-medium">{record.student}</div>
                            <div className="text-xs text-gray-500 dark:text-[#6272a4] sm:hidden">
                              {record.class} • {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className="text-xs border-gray-300 dark:border-[#6272a4] text-gray-700 dark:text-[#6272a4]">
                            {record.class}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-[#6272a4] hidden md:table-cell">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-[#6272a4] hidden lg:table-cell">{record.time}</TableCell>
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
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center"
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
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#44475a] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'viewProfile')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                                >
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'editDetails')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                                >
                                  Edit Details
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'attendanceHistory')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                                >
                                  Attendance History
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'sendMessage')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                                >
                                  Send Message
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(record.student, 'attendanceReport')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left"
                                >
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
            </div>
            
            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-[#6272a4]">
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