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
  Building
} from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { addNotification } = useAppStore();

  const filteredFaculty = mockFaculty.filter(faculty => {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Faculty</h1>
            <p className="text-muted-foreground mt-1">Manage faculty members and academic staff</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                exportToExcel(filteredFaculty, 'faculty-data');
                addNotification({ message: 'Faculty data exported successfully', type: 'success' });
              }}
            >
              <Filter className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Faculty
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                  <div className="text-3xl font-bold text-primary mt-2">24</div>
                  <p className="text-xs text-muted-foreground mt-1">academic staff</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Faculty</p>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">22</div>
                  <p className="text-xs text-muted-foreground mt-1">currently teaching</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">68</div>
                  <p className="text-xs text-muted-foreground mt-1">being taught</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 dark:from-purple-950/30 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">8</div>
                  <p className="text-xs text-muted-foreground mt-1">academic departments</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Building className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search faculty by name, ID, email, or department..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
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
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                All Faculty ({filteredFaculty.length})
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Faculty Member</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Department & Position</TableHead>
                    <TableHead className="font-semibold">Teaching Load</TableHead>
                    <TableHead className="font-semibold">Experience</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaculty.map((faculty) => (
                    <TableRow key={faculty.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {faculty.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{faculty.name}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {faculty.employeeId}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {faculty.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {faculty.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{faculty.department}</div>
                          <Badge className={getPositionColor(faculty.position)}>
                            {faculty.position}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <BookOpen className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{faculty.classes}</span> classes
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {faculty.students} students
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-muted/80 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === faculty.id ? null : faculty.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          {openDropdown === faculty.id && (
                            <>
                              <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40" onClick={() => setOpenDropdown(null)} />
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">View Profile</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Edit Details</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">Manage Classes</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDropdown(null)}>
                                  <div className="font-medium text-sm">View Schedule</div>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </>
                          )}
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredFaculty.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No faculty members found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};