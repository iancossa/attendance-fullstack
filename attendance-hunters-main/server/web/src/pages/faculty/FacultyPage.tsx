import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Building,
  Download
} from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { AddFacultyModal } from '../../components/modals/AddFacultyModal';
import { ViewFacultyProfileModal } from '../../components/modals/ViewFacultyProfileModal';
import { EditFacultyDetailsModal } from '../../components/modals/EditFacultyDetailsModal';
import { ManageStudentsModal } from '../../components/modals/ManageStudentsModal';
import { ScheduleSessionModal } from '../../components/modals/ScheduleSessionModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  classes: number;
  students: number;
  experience: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  phone: string;
  joinDate: string;
}

const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    employeeId: 'FAC001',
    department: 'Computer Science',
    position: 'Professor',
    classes: 3,
    students: 85,
    experience: '12 years',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    joinDate: '2012-08-15'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    employeeId: 'FAC002',
    department: 'Mathematics',
    position: 'Associate Professor',
    classes: 4,
    students: 120,
    experience: '8 years',
    status: 'Active',
    phone: '+1 (555) 234-5678',
    joinDate: '2016-01-10'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    employeeId: 'FAC003',
    department: 'Physics',
    position: 'Assistant Professor',
    classes: 2,
    students: 45,
    experience: '5 years',
    status: 'Active',
    phone: '+1 (555) 345-6789',
    joinDate: '2019-09-01'
  },
  {
    id: '4',
    name: 'Prof. David Wilson',
    email: 'david.wilson@university.edu',
    employeeId: 'FAC004',
    department: 'Chemistry',
    position: 'Professor',
    classes: 3,
    students: 78,
    experience: '15 years',
    status: 'On Leave',
    phone: '+1 (555) 456-7890',
    joinDate: '2009-03-20'
  },
  {
    id: '5',
    name: 'Dr. Lisa Brown',
    email: 'lisa.brown@university.edu',
    employeeId: 'FAC005',
    department: 'Biology',
    position: 'Associate Professor',
    classes: 2,
    students: 52,
    experience: '9 years',
    status: 'Active',
    phone: '+1 (555) 567-8901',
    joinDate: '2015-07-12'
  }
];

export const FacultyPage: React.FC = () => {
  useDocumentTitle('Faculty');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [isManageClassesOpen, setIsManageClassesOpen] = useState(false);
  const [isViewScheduleOpen, setIsViewScheduleOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [facultyList, setFacultyList] = useState(mockFaculty);
  const { addNotification } = useAppStore();

  const filteredFaculty = facultyList.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || faculty.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || faculty.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'On Leave':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Inactive':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Professor':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Associate Professor':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'Assistant Professor':
        return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700';
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Faculty</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Manage faculty members and academic staff</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => {
                exportToExcel(filteredFaculty, 'faculty-data');
                addNotification({ message: 'Faculty data exported successfully', type: 'success' });
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
            <Button 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => setIsAddModalOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Faculty</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Faculty</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{facultyList.length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">academic staff</p>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Active Faculty</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{facultyList.filter(f => f.status === 'Active').length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">currently teaching</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{facultyList.reduce((acc, f) => acc + f.classes, 0)}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">being taught</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Departments</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">8</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">academic departments</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Building className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                <Input 
                  placeholder="Search faculty by name, ID, email, or department..." 
                  className="pl-10 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2] min-w-[140px]"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
                <select 
                  className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2] min-w-[100px]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDepartment('All');
                    setSelectedStatus('All');
                    addNotification({ message: 'Filters cleared', type: 'success' });
                  }}
                  className="h-9 px-3 text-sm whitespace-nowrap"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Table */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                All Faculty ({filteredFaculty.length})
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
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] min-w-[200px]">Faculty Member</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden lg:table-cell">Contact</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Department & Position</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Teaching Load</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden xl:table-cell">Experience</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredFaculty.map((faculty, index) => (
                    <TableRow key={faculty.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] transition-colors bg-white dark:bg-[#282a36]">
                      <TableCell>
                        <div className="text-sm font-medium text-gray-600 dark:text-[#6272a4]">{index + 1}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {faculty.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.name}</div>
                            <Badge variant="outline" className="text-xs mt-1 border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                              {faculty.employeeId}
                            </Badge>
                            <div className="lg:hidden text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                              {faculty.email} • {faculty.department}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Mail className="h-3 w-3" />
                            {faculty.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Phone className="h-3 w-3" />
                            {faculty.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{faculty.department}</div>
                          <Badge className={getPositionColor(faculty.position)}>
                            {faculty.position}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-900 dark:text-[#f8f8f2]">
                            <BookOpen className="h-3 w-3 text-gray-500 dark:text-[#6272a4]" />
                            <span className="font-medium">{faculty.classes}</span> classes
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Users className="h-3 w-3" />
                            {faculty.students} students
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                          <Clock className="h-3 w-3" />
                          {faculty.experience}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(faculty.status)}>
                          {faculty.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-[#6272a4]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === faculty.id ? null : faculty.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                          </button>
                          {openDropdown === faculty.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setIsViewProfileOpen(true);
                                    setOpenDropdown(null);
                                  }} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setIsEditDetailsOpen(true);
                                    setOpenDropdown(null);
                                  }} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Edit Details
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setIsManageClassesOpen(true);
                                    setOpenDropdown(null);
                                  }} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Manage Classes
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedFaculty(faculty);
                                    setIsViewScheduleOpen(true);
                                    setOpenDropdown(null);
                                  }} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  View Schedule
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
              {filteredFaculty.map((faculty, index) => (
                <div key={faculty.id} className="border border-gray-200 dark:border-[#6272a4] rounded-lg p-4 bg-white dark:bg-[#282a36]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-[#6272a4]">#{index + 1}</span>
                        <Badge className={getStatusColor(faculty.status)}>
                          {faculty.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1 border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                        {faculty.employeeId}
                      </Badge>
                    </div>
                    <div className="relative">
                      <button 
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === faculty.id ? null : faculty.id);
                        }}
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                      </button>
                      {openDropdown === faculty.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                          <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                            <button onClick={() => { setSelectedFaculty(faculty); setIsViewProfileOpen(true); setOpenDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              View Profile
                            </button>
                            <button onClick={() => { setSelectedFaculty(faculty); setIsEditDetailsOpen(true); setOpenDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Edit Details
                            </button>
                            <button onClick={() => { setSelectedFaculty(faculty); setIsManageClassesOpen(true); setOpenDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              Manage Classes
                            </button>
                            <button onClick={() => { setSelectedFaculty(faculty); setIsViewScheduleOpen(true); setOpenDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]">
                              View Schedule
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
                          <span className="truncate">{faculty.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-[#6272a4]">
                          <Phone className="h-3 w-3" />
                          {faculty.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 dark:text-[#6272a4] mb-1">Department</p>
                      <div className="text-gray-600 dark:text-[#6272a4]">
                        <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.department}</div>
                        <Badge className={getPositionColor(faculty.position)}>
                          {faculty.position}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-[#6272a4]">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-[#6272a4]">
                        <BookOpen className="h-3 w-3" />
                        <span className="font-medium">{faculty.classes}</span> classes
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-[#6272a4]">
                        <Users className="h-3 w-3" />
                        {faculty.students} students
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#6272a4]">
                      <Clock className="h-3 w-3" />
                      {faculty.experience}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredFaculty.length === 0 && (
              <div className="text-center py-8 text-gray-600 dark:text-[#6272a4]">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No faculty members found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <AddFacultyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(facultyData) => {
          setFacultyList(prev => [...prev, facultyData]);
          addNotification({ message: 'Faculty member added successfully!', type: 'success' });
        }}
      />
      
      {selectedFaculty && (
        <>
          <ViewFacultyProfileModal
            faculty={selectedFaculty}
            isOpen={isViewProfileOpen}
            onClose={() => {
              setIsViewProfileOpen(false);
              setSelectedFaculty(null);
            }}
          />
          
          <EditFacultyDetailsModal
            faculty={selectedFaculty}
            isOpen={isEditDetailsOpen}
            onClose={() => {
              setIsEditDetailsOpen(false);
              setSelectedFaculty(null);
            }}
            onSave={(updatedFaculty) => {
              setFacultyList(prev => prev.map(f => 
                f.id === selectedFaculty.id ? updatedFaculty : f
              ));
              addNotification({ message: 'Faculty details updated successfully!', type: 'success' });
            }}
          />
          
          <ManageStudentsModal
            classData={{
              id: parseInt(selectedFaculty.id),
              name: `${selectedFaculty.name}'s Classes`,
              code: selectedFaculty.employeeId,
              students: selectedFaculty.students,
              enrolled: selectedFaculty.students
            }}
            isOpen={isManageClassesOpen}
            onClose={() => {
              setIsManageClassesOpen(false);
              setSelectedFaculty(null);
            }}
          />
          
          <ScheduleSessionModal
            isOpen={isViewScheduleOpen}
            onClose={() => {
              setIsViewScheduleOpen(false);
              setSelectedFaculty(null);
            }}
            onSave={() => {
              addNotification({ message: 'Schedule viewed successfully!', type: 'success' });
            }}
          />
        </>
      )}
    </Layout>
  );
};