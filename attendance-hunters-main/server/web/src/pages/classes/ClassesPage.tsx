import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { GraduationCap, Users, UserPlus, Upload, Plus, Search, Edit, BarChart3, Calendar, Clock, MoreVertical } from 'lucide-react';
import { exportToExcel } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { COURSES } from '../../data/mockStudents';
import { AddClassModal } from '../../components/modals/AddClassModal';
import { EditClassModal } from '../../components/modals/EditClassModal';
import { ManageStudentsModal } from '../../components/modals/ManageStudentsModal';
import { ClassReportsModal } from '../../components/modals/ClassReportsModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ClassesPage: React.FC = () => {
  useDocumentTitle('Classes');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [classes, setClasses] = useState(() => 
    COURSES.map((course, index) => ({
      id: index + 1,
      name: course.name.split(' – ')[1],
      code: course.code,
      faculty: course.faculty,
      students: course.students,
      enrolled: course.enrolled,
      schedule: course.schedule,
      room: course.room,
      status: course.status
    }))
  );
  const { addNotification } = useAppStore();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);
  
  const handleModalOpen = (classData: any, modalType: string) => {
    setSelectedClass(classData);
    setActiveModal(modalType);
    setOpenDropdown(null);
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setActiveModal(null);
  };

  const handleAddClass = (classData: any) => {
    setClasses(prev => [...prev, classData]);
    addNotification({ message: 'Class added successfully', type: 'success' });
  };

  const handleEditClass = (updatedClass: any) => {
    setClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));
    addNotification({ message: 'Class updated successfully', type: 'success' });
  };

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.faculty || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Class Management</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Manage classes, faculty assignments, and student enrollment</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                exportToExcel(filteredClasses, 'classes-data');
                addNotification({ message: 'Classes data exported successfully', type: 'success' });
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Export Classes
            </Button>
            <Button size="sm" onClick={() => setActiveModal('addClass')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Classes</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">12</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">across all departments</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">402</div>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Faculty Members</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">8</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">active instructors</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <UserPlus className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Active Sessions</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">3</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">currently in progress</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardContent className="p-4 pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
              <Input 
                placeholder="Search classes, codes, or faculty..." 
                className="pl-10 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Classes Table */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                All Classes ({filteredClasses.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600 dark:text-[#6272a4] border-gray-300 dark:border-[#6272a4]">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-[#6272a4] overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#44475a]">
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] min-w-[200px]">Class Details</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Faculty</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Enrollment</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden lg:table-cell">Schedule</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredClasses.map((classItem) => (
                    <TableRow key={classItem.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] bg-white dark:bg-[#282a36]">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{classItem.name}</div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                              {classItem.code}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-[#6272a4]">{classItem.room}</span>
                            <div className="md:hidden text-xs text-gray-500 dark:text-[#6272a4]">
                              {classItem.faculty} • {classItem.schedule}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-[#6272a4] hidden md:table-cell">{classItem.faculty}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{classItem.students}/{classItem.enrolled}</span>
                          <div className="w-16 bg-gray-200 dark:bg-[#44475a] rounded-full h-2">
                            <div 
                              className="bg-orange-500 dark:bg-orange-400 h-2 rounded-full" 
                              style={{ width: `${(classItem.students / (classItem.enrolled || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                          <Calendar className="h-3 w-3" />
                          {classItem.schedule}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20">
                          {classItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === classItem.id ? null : classItem.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                          </button>
                          {openDropdown === classItem.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => handleModalOpen(classItem, 'editClass')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Edit Class
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(classItem, 'manageStudents')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  Manage Students
                                </button>
                                <button 
                                  onClick={() => handleModalOpen(classItem, 'viewReports')} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                >
                                  View Reports
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
            
            {filteredClasses.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-[#6272a4]">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No classes found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddClassModal
        isOpen={activeModal === 'addClass'}
        onClose={handleModalClose}
        onSave={handleAddClass}
      />
      
      {selectedClass && (
        <>
          <EditClassModal
            isOpen={activeModal === 'editClass'}
            onClose={handleModalClose}
            onSave={handleEditClass}
            classData={selectedClass}
          />
          <ManageStudentsModal
            isOpen={activeModal === 'manageStudents'}
            onClose={handleModalClose}
            classData={selectedClass}
          />
          <ClassReportsModal
            isOpen={activeModal === 'viewReports'}
            onClose={handleModalClose}
            classData={selectedClass}
          />
        </>
      )}
    </Layout>
  );
};