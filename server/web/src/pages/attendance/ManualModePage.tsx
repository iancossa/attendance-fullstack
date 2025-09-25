import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Users, Search } from 'lucide-react';
import { studentService } from '../../services/backendService';

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  department: string;
  class: string;
  section: string;
  present: boolean;
  method: 'manual' | '';
}

export const ManualModePage: React.FC = () => {
  useDocumentTitle('Manual Mode Attendance');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rollNumbers, setRollNumbers] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const response = await studentService.getAllStudents();
        if (response.data && (response.data as any).students && Array.isArray((response.data as any).students)) {
          const dbStudents = (response.data as any).students.map((s: any) => ({
            id: s.id,
            studentId: s.studentId,
            name: s.name,
            email: s.email,
            department: s.department,
            class: s.class,
            section: s.section,
            present: false,
            method: '' as 'manual' | ''
          }));
          setStudents(dbStudents);
        }
      } catch (error) {
        console.error('Failed to load students:', error);
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
        student.id === studentId ? { ...student, present: !student.present, method: (!student.present ? 'manual' : '') as 'manual' | '' } : student
      );
      const presentRollNumbers = updated.map((student, index) => student.present ? index + 1 : null).filter(n => n !== null);
      setRollNumbers(presentRollNumbers.join(', '));
      return updated;
    });
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true, method: 'manual' as 'manual' | '' })));
    setRollNumbers(students.map((_, index) => index + 1).join(', '));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: false, method: '' as 'manual' | '' })));
    setRollNumbers('');
  };

  const handleRollNumbersChange = (value: string) => {
    // Only allow numbers, commas, and spaces
    const sanitized = value.replace(/[^0-9,\s]/g, '');
    setRollNumbers(sanitized);
    
    const numbers = sanitized.split(',').map(n => n.trim()).filter(n => n && /^\d+$/.test(n));
    setStudents(prev => prev.map((student, index) => ({
      ...student,
      present: numbers.includes(String(index + 1)),
      method: (numbers.includes(String(index + 1)) ? 'manual' : '') as 'manual' | ''
    })));
  };

  const presentCount = students.filter(s => s.present).length;
  const absentCount = students.length - presentCount;

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Manual Attendance Mode</h1>
          <p className="text-sm text-gray-600 dark:text-[#6272a4]">Mark attendance manually from student list</p>
          <Card className="mt-3 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20">
            <CardContent className="p-3 pt-3">
              <div className="text-sm text-gray-900 dark:text-[#f8f8f2]">
                <strong>Demo Class</strong> • Section A • Lecture
              </div>
              <div className="text-xs text-gray-500 dark:text-[#6272a4]">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-green-700">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-red-700">{absentCount}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-blue-700">{Math.round((presentCount / students.length) * 100)}%</div>
              <div className="text-xs text-blue-600">Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-[#44475a] border-gray-200 dark:border-[#6272a4]">
            <CardContent className="p-2 pt-2">
              <div className="flex gap-1">
                <Button size="sm" onClick={markAllPresent} className="flex-1 h-7 text-xs">
                  All
                </Button>
                <Button size="sm" variant="outline" onClick={markAllAbsent} className="flex-1 h-7 text-xs">
                  None
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">Roll Numbers Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter roll numbers separated by commas (e.g., 1, 2, 15, 23)"
                value={rollNumbers}
                onChange={(e) => handleRollNumbersChange(e.target.value)}
                className="text-sm flex-1 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
              />
              <Button 
                size="sm" 
                onClick={() => setShowSubmitModal(true)}
                disabled={!rollNumbers.trim()}
              >
                Submit
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#6272a4] mt-1">
              Enter natural numbers (1, 2, 3...) separated by commas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-900 dark:text-[#f8f8f2]">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students ({filteredStudents.length})
              </div>
              <div className="relative w-60">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 dark:text-[#6272a4]" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-sm bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white dark:bg-[#282a36] z-10">
                    <TableRow className="bg-gray-50 dark:bg-[#44475a] border-b border-gray-200 dark:border-[#6272a4]">
                      <TableHead className="w-12 text-center text-gray-900 dark:text-[#f8f8f2]">Select</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] min-w-[120px]">Name</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Roll No.</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Method</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Loading students...
                      </TableCell>
                    </TableRow>
                  ) : students.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No students found. Please check your database connection.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] bg-white dark:bg-[#282a36]">
                        <TableCell className="text-center">
                          <input
                            type="checkbox"
                            checked={student.present}
                            onChange={() => toggleAttendance(student.id)}
                            className="w-4 h-4 text-orange-600 dark:text-orange-400 rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-gray-500 dark:text-[#6272a4] sm:hidden">
                              Roll: {filteredStudents.indexOf(student) + 1} • {student.method === 'manual' ? 'Manual' : 'Not Marked'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-[#6272a4] hidden sm:table-cell">{filteredStudents.indexOf(student) + 1}</TableCell>
                        <TableCell>
                          <Badge className={student.present ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                            {student.present ? 'Present' : 'Absent'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.method === 'manual' && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              Manual
                            </Badge>
                          )}
                          {!student.method && (
                            <Badge variant="outline" className="text-gray-500">
                              Not Marked
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => setShowSaveModal(true)} size="sm">
            Save Attendance ({presentCount}/{students.length})
          </Button>
        </div>

        {/* Submit Roll Numbers Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#282a36] p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-[#6272a4]">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-[#f8f8f2]">Confirm Roll Numbers</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-4">
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
            <div className="bg-white dark:bg-[#282a36] p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-[#6272a4]">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-[#f8f8f2]">Save Attendance</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-4">
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