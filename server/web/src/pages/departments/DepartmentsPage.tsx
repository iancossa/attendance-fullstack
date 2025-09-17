import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Building2, 
  Users, 
  Search, 
  MoreVertical,
  UserCheck,
  Award,
  Plus,
  Download,
  Eye,
  Edit,
  Settings
} from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { MOCK_DEPARTMENTS } from '../../data/mockDepartments';

export const DepartmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { addNotification } = useAppStore();

  const filteredDepartments = MOCK_DEPARTMENTS.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.head.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || dept.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Inactive':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technology':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'Engineering':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Science':
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
            <h1 className="text-lg font-semibold text-gray-900">Departments</h1>
            <p className="text-sm text-gray-600 mt-1">Manage academic departments and organizational structure</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => {
                exportToExcel(filteredDepartments, 'departments-data');
                addNotification({ message: 'Department data exported successfully', type: 'success' });
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
            <Button className="gap-2 flex-1 sm:flex-none">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Department</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Departments</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">{MOCK_DEPARTMENTS.length}</div>
                  <p className="text-xs text-gray-500 mt-1">academic departments</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-blue-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Technology Depts</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">
                    {MOCK_DEPARTMENTS.filter(d => d.type === 'Technology').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">tech-focused</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-green-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">
                    {MOCK_DEPARTMENTS.reduce((acc, d) => acc + d.faculty, 0)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">across all departments</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-purple-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">
                    {MOCK_DEPARTMENTS.reduce((acc, d) => acc + d.students, 0)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">enrolled students</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Search className="h-4 w-4" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search departments by name, code, or head..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <select 
                className="h-9 px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Technology">Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Departments Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Building2 className="h-4 w-4 text-orange-600" />
                </div>
                All Departments ({filteredDepartments.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-sm font-medium text-gray-900">Sr No</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Department</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Head & Contact</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Type & Programs</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Faculty</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Students</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Status</TableHead>
                    <TableHead className="text-sm font-medium text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department, index) => (
                    <TableRow key={department.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="text-sm font-medium text-gray-600">{index + 1}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{department.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {department.code}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{department.head}</div>
                          <div className="text-xs text-gray-600">{department.email}</div>
                          <div className="text-xs text-gray-600">{department.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getTypeColor(department.type)}>
                            {department.type}
                          </Badge>
                          <div className="text-xs text-gray-600">
                            {department.programs} programs
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <UserCheck className="h-3 w-3 text-gray-600" />
                          <span className="font-medium">{department.faculty}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-gray-600" />
                          <span className="font-medium">{department.students}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(department.status)}>
                          {department.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === department.id ? null : department.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openDropdown === department.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit Department
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Users className="h-4 w-4" />
                                  Manage Faculty
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  <Settings className="h-4 w-4" />
                                  Department Settings
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
            
            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredDepartments.map((department, index) => (
                <div key={department.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
                        <Badge className={getStatusColor(department.status)}>
                          {department.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900">{department.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {department.code}
                      </Badge>
                    </div>
                    <div className="relative">
                      <button 
                        className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors rounded-md flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === department.id ? null : department.id);
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openDropdown === department.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                          <div className="absolute right-0 top-8 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                            <button onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left">
                              <Eye className="h-4 w-4" />View Details
                            </button>
                            <button onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left">
                              <Edit className="h-4 w-4" />Edit Department
                            </button>
                            <button onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left">
                              <Users className="h-4 w-4" />Manage Faculty
                            </button>
                            <button onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left">
                              <Settings className="h-4 w-4" />Department Settings
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Department Head</p>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{department.head}</div>
                        <div className="text-xs text-gray-600">{department.email}</div>
                        <div className="text-xs text-gray-600">{department.phone}</div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 mb-1">Type & Programs</p>
                      <div className="text-gray-600">
                        <Badge className={getTypeColor(department.type)}>
                          {department.type}
                        </Badge>
                        <div className="text-xs mt-1">{department.programs} programs</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <UserCheck className="h-3 w-3" />
                        <span className="font-medium">{department.faculty}</span> faculty
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span className="font-medium">{department.students}</span> students
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDepartments.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No departments found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};