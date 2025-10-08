import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { Users, Search, Send, Save } from 'lucide-react';
import { studentService } from '../../services/backendService';
import { isAuthenticated, getUserRole, clearAuthData, canAccessStudents } from '../../services/api';
import { AuthDebug } from '../../components/AuthDebug';

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  department: string;
  class: string;
  section: string;
  present: boolean;
}

export const ManualModePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rollNumbers, setRollNumbers] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setAuthError('');
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
          setAuthError('Authentication required. Please login to access student data.');
          console.warn('❌ User not authenticated');
          setStudents([]);
          setLoading(false);
          return;
        }
        
        // Check if user has permission to access students
        if (!canAccessStudents()) {
          const role = getUserRole();
          setAuthError(`Access denied. Students can only view their own data. Current role: ${role}`);
          console.warn('❌ Insufficient permissions for student list access');
          setStudents([]);
          setLoading(false);
          return;
        }
        
        console.log('🔍 Loading students with authentication...');
        const response = await studentService.getAllStudents();
        console.log('📊 Students API Response:', response);
        
        if (response.data && (response.data as any).students && Array.isArray((response.data as any).students)) {
          const dbStudents = (response.data as any).students.map((s: any) => ({
            id: s.id,
            studentId: s.studentId || s.id.toString(), // Fallback to id if studentId missing
            name: s.name,
            email: s.email,
            department: s.department,
            class: s.class,
            section: s.section,
            present: false
          }));
          console.log(`✅ Loaded ${dbStudents.length} students successfully`);
          setStudents(dbStudents);
        } else {
          console.warn('⚠️ No students array found in response:', response.data);
          setStudents([]);
        }
      } catch (error) {
        console.error('❌ Failed to load students:', error);
        
        // Check if it's an authentication error
        if (error instanceof Error) {
          if (error.message.includes('401')) {
            setAuthError('Authentication expired. Please login again.');
            clearAuthData();
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          } else {
            setAuthError(`Error loading students: ${error.message}`);
          }
        } else {
          setAuthError('Unknown error occurred while loading students.');
        }
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAttendance = (studentId: number) => {
    setStudents(prev => {
      const updated = prev.map(student => 
        student.id === studentId ? { ...student, present: !student.present } : student
      );
      const presentRollNumbers = updated.filter(s => s.present).map(s => s.studentId);
      setRollNumbers(presentRollNumbers.join(', '));
      return updated;
    });
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
    setRollNumbers(students.map(s => s.studentId).join(', '));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: false })));
    setRollNumbers('');
  };

  const handleRollNumbersChange = (value: string) => {
    setRollNumbers(value);
    const numbers = value.split(',').map(n => n.trim()).filter(n => n);
    setStudents(prev => prev.map(student => ({
      ...student,
      present: numbers.includes(student.studentId)
    })));
  };

  const presentCount = students.filter(s => s.present).length;
  const absentCount = students.length - presentCount;

  return (
    <Layout>
      <AuthDebug />
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Manual Attendance Mode</h1>
          <p className="text-muted-foreground text-sm">Mark attendance manually from student list</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{absentCount}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{Math.round((presentCount / students.length) * 100)}%</div>
              <div className="text-xs text-blue-600">Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-950/20">
            <CardContent className="p-2">
              <div className="flex gap-1">
                <Button size="sm" onClick={markAllPresent} className="flex-1 h-7 text-xs bg-green-600 hover:bg-green-700">
                  All
                </Button>
                <Button size="sm" variant="outline" onClick={markAllAbsent} className="flex-1 h-7 text-xs">
                  None
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Roll Numbers Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter student IDs separated by commas (e.g., STU001, CS2024001)"
                value={rollNumbers}
                onChange={(e) => handleRollNumbersChange(e.target.value)}
                className="text-sm flex-1"
              />
              <Button 
                size="sm" 
                onClick={() => setShowSubmitModal(true)}
                disabled={!rollNumbers.trim()}
              >
                Submit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Type student IDs to mark present, or check students to auto-fill this field
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students ({filteredStudents.length})
              </div>
              <div className="relative w-60">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow className="bg-muted/80 backdrop-blur-sm border-b h-10">
                    <TableHead className="w-10 text-center p-2">
                      <input
                        type="checkbox"
                        className="w-3 h-3 rounded"
                        onChange={(e) => {
                          if (e.target.checked) markAllPresent();
                          else markAllAbsent();
                        }}
                      />
                    </TableHead>
                    <TableHead className="font-medium text-sm p-2">Student</TableHead>
                    <TableHead className="font-medium text-center w-20 text-sm p-2">Student ID</TableHead>
                    <TableHead className="font-medium text-center w-20 text-sm p-2">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          Loading students...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : authError ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="text-red-600 space-y-2">
                          <div className="font-medium">Authentication Error</div>
                          <div className="text-sm">{authError}</div>
                          <Button 
                            size="sm" 
                            onClick={() => window.location.href = '/login'}
                            className="mt-2"
                          >
                            Go to Login
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : students.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        <div className="space-y-2">
                          <div>No students found.</div>
                          <div className="text-xs">Please check your database connection or contact administrator.</div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="mt-2"
                          >
                            Retry
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student, index) => (
                      <TableRow 
                      key={student.id} 
                      className={`
                        h-12 transition-colors cursor-pointer hover:bg-muted/30
                        ${student.present 
                          ? 'bg-green-50 dark:bg-green-950/20 border-l-2 border-l-green-500' 
                          : ''
                        }
                        ${index % 2 === 0 ? 'bg-muted/5' : ''}
                      `}
                      onClick={() => toggleAttendance(student.id)}
                    >
                      <TableCell className="text-center p-2">
                        <input
                          type="checkbox"
                          checked={student.present}
                          onChange={() => toggleAttendance(student.id)}
                          className="w-3 h-3 text-green-600 rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs font-medium p-2">
                        <span className="px-1 py-0.5 bg-muted rounded text-xs">{student.studentId}</span>
                      </TableCell>
                      <TableCell className="text-center p-2">
                        <Badge 
                          className={`text-xs h-5 ${
                            student.present 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          {student.present ? 'Present' : 'Absent'}
                        </Badge>
                      </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => setShowSaveModal(true)}>
            Save Attendance ({presentCount}/{students.length})
          </Button>
        </div>

        {/* Submit Roll Numbers Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Roll Numbers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mark the following student IDs as present: <strong>{rollNumbers}</strong>
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  const numbers = rollNumbers.split(',').map(n => n.trim()).filter(n => n);
                  setStudents(prev => prev.map(student => ({
                    ...student,
                    present: numbers.includes(student.studentId)
                  })));
                  setShowSubmitModal(false);
                }}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Save Attendance Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Save Attendance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Save attendance for <strong>{presentCount}</strong> present and <strong>{absentCount}</strong> absent students?
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Attendance saved:', students.filter(s => s.present));
                  setShowSaveModal(false);
                }}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};