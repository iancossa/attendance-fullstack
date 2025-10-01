import React, { useState, useMemo } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Users, 
  GraduationCap, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Download,
  Upload,
  Eye,
  Edit,
  MessageSquare,
  History,
  BarChart3
} from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { MOCK_STUDENTS, Student } from '../../data/mockStudents';
import { ViewProfileModal } from '../../components/modals/ViewProfileModal';
import { EditDetailsModal } from '../../components/modals/EditDetailsModal';
import { AttendanceReportModal } from '../../components/modals/AttendanceReportModal';
import { AttendanceHistoryModal } from '../../components/modals/AttendanceHistoryModal';
import { SendMessageModal } from '../../components/modals/SendMessageModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';



export const StudentsPage: React.FC = () => {
  useDocumentTitle('Students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);

  const departments = Array.from(new Set(MOCK_STUDENTS.map(s => s.department)));
  const sections = Array.from(new Set(MOCK_STUDENTS.map(s => s.section)));
  const years = Array.from(new Set(MOCK_STUDENTS.map(s => s.year)));

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (student.studentId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (student.class || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (student.department || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || student.year.toString() === selectedYear;
      const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
      const matchesDepartment = selectedDepartment === 'All' || student.department === selectedDepartment;
      const matchesSection = selectedSection === 'All' || student.section === selectedSection;
      
      const matchesAttendance = 
        attendanceFilter === 'All' ||
        (attendanceFilter === 'High' && (student.attendance || 0) >= 85) ||
        (attendanceFilter === 'Medium' && (student.attendance || 0) >= 70 && (student.attendance || 0) < 85) ||
        (attendanceFilter === 'Low' && (student.attendance || 0) < 70);
      
      return matchesSearch && matchesYear && matchesStatus && matchesDepartment && matchesSection && matchesAttendance;
    });
  }, [searchTerm, selectedYear, selectedStatus, selectedDepartment, selectedSection, attendanceFilter, students]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('All');
    setSelectedStatus('All');
    setSelectedDepartment('All');
    setSelectedSection('All');
    setAttendanceFilter('All');
  };

  const handleModalOpen = (student: Student, modalType: string) => {
    setSelectedStudent(student);
    setActiveModal(modalType);
    setOpenDropdown(null);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setActiveModal(null);
  };

  const handleStudentUpdate = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 dark:text-green-400';
    if (attendance >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAttendanceBg = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Inactive':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Suspended':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Students</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Manage student records and track academic progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => exportToExcel(filteredStudents, 'students-data')}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{MOCK_STUDENTS.length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">enrolled students</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Active Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{MOCK_STUDENTS.filter(s => s.status === 'Active').length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">currently enrolled</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Average Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{Math.round(MOCK_STUDENTS.reduce((acc, s) => acc + (s.attendance || 0), 0) / MOCK_STUDENTS.length)}%</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">this semester</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">At Risk</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{MOCK_STUDENTS.filter(s => (s.attendance || 0) < 70).length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">below 70% attendance</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <Filter className="h-4 w-4" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
              <Input 
                placeholder="Search by name, ID, email, class, or department..." 
                className="pl-10 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="All">All Sections</option>
                {sections.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={attendanceFilter}
                onChange={(e) => setAttendanceFilter(e.target.value)}
              >
                <option value="All">All Attendance</option>
                <option value="High">High (85%+)</option>
                <option value="Medium">Medium (70-84%)</option>
                <option value="Low">Low (&lt;70%)</option>
              </select>
              <Button onClick={clearFilters} className="h-9 px-3 text-sm">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                All Students ({filteredStudents.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600 dark:text-[#6272a4] border-gray-300 dark:border-[#6272a4]">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-lg border border-gray-200 dark:border-[#6272a4] overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#44475a]">
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Sr No</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] min-w-[150px]">Student</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden lg:table-cell">Contact</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Academic Info</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Attendance</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden xl:table-cell">Last Seen</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] transition-colors bg-white dark:bg-[#282a36]">
                      <TableCell>
                        <div className="text-sm font-medium text-gray-600 dark:text-[#6272a4]">{index + 1}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{student.name}</div>
                          <Badge variant="outline" className="text-xs mt-1 border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                            {student.studentId}
                          </Badge>
                          <div className="lg:hidden text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                            {student.email} • {student.class}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Phone className="h-3 w-3" />
                            {student.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{student.class}</div>
                          <div className="text-xs text-gray-600 dark:text-[#6272a4]">{student.department} - Section {student.section}</div>
                          <div className="text-xs text-gray-600 dark:text-[#6272a4]">Year {student.year}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getAttendanceColor(student.attendance || 0)}`}>
                            {student.attendance || 0}%
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-[#44475a] rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAttendanceBg(student.attendance || 0)}`}
                              style={{ width: `${student.attendance || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={getStatusColor(student.status || 'Active')}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                          <Calendar className="h-3 w-3" />
                          {student.lastSeen}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-[#6272a4]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === student.id ? null : student.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                          </button>
                          {openDropdown === student.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => handleModalOpen(student, 'viewProfile')} 
                                  className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(student, 'editDetails')} 
                                  className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Edit Details
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(student, 'attendanceReport')} 
                                  className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Attendance Report
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(student, 'attendanceHistory')} 
                                  className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Attendance History
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(student, 'sendMessage')} 
                                  className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Send Message
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
            
            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredStudents.map((student, index) => (
                <div key={student.id} className="border border-gray-200 dark:border-[#6272a4] rounded-lg p-4 bg-white dark:bg-[#282a36]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-[#6272a4]">#{index + 1}</span>
                        <Badge className={getStatusColor(student.status || 'Active')}>
                          {student.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{student.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1 border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                        {student.studentId}
                      </Badge>
                    </div>
                    <div className="relative">
                      <button 
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === student.id ? null : student.id);
                        }}
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                      </button>
                      {openDropdown === student.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                          <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                            <button onClick={() => handleModalOpen(student, 'viewProfile')} className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              View Profile
                            </button>
                            <button onClick={() => handleModalOpen(student, 'editDetails')} className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Edit Details
                            </button>
                            <button onClick={() => handleModalOpen(student, 'attendanceReport')} className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Attendance Report
                            </button>
                            <button onClick={() => handleModalOpen(student, 'attendanceHistory')} className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Attendance History
                            </button>
                            <button onClick={() => handleModalOpen(student, 'sendMessage')} className="w-full px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Send Message
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-[#6272a4] mb-1">Contact</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-[#6272a4]">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-[#6272a4]">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 dark:text-[#6272a4] mb-1">Academic</p>
                      <div className="text-gray-600 dark:text-[#6272a4]">
                        <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{student.class}</div>
                        <div className="text-xs">{student.department}</div>
                        <div className="text-xs">Section {student.section} • Year {student.year}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-[#6272a4]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-[#6272a4]">Attendance:</span>
                      <span className={`font-medium ${getAttendanceColor(student.attendance || 0)}`}>
                        {student.attendance || 0}%
                      </span>
                      <div className="w-16 bg-gray-200 dark:bg-[#44475a] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getAttendanceBg(student.attendance || 0)}`}
                          style={{ width: `${student.attendance || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#6272a4]">
                      <Calendar className="h-3 w-3" />
                      {student.lastSeen}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-gray-600 dark:text-[#6272a4]">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No students found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
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
            onSave={handleStudentUpdate}
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