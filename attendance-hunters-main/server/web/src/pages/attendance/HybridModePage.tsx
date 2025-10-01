import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import QRCode from 'react-qr-code';
import { QRScanner } from '../../components/QRScanner';
import { studentService } from '../../services/backendService';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  department: string;
  class: string;
  section: string;
  present: boolean;
  method: 'qr' | 'manual' | '';
}

export const HybridModePage: React.FC = () => {
  useDocumentTitle('Hybrid Mode Attendance');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrValue, setQrValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [sessionActive, setSessionActive] = useState(false);
  const [activeTab, setActiveTab] = useState('qr');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [rollNumbers, setRollNumbers] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // Load real students from database
    const loadStudents = async () => {
      try {
        setLoading(true);
        const response = await studentService.getAllStudents();
        if (response.data && (response.data as any).students) {
          const dbStudents = (response.data as any).students.map((s: any) => ({
            id: s.id,
            studentId: s.studentId,
            name: s.name,
            email: s.email,
            department: s.department,
            class: s.class,
            section: s.section,
            present: false,
            method: '' as 'qr' | 'manual' | ''
          }));
          setStudents(dbStudents);
        }
      } catch (error) {
        console.error('Failed to load students:', error);
        // Fallback to empty array if API fails
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();

    // Load session data from localStorage
    const storedSession = localStorage.getItem('attendanceSession');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      setSessionData(parsed);
    }
    generateQRCode();
    
    // Load recent scans and update students
    const loadRecentScans = () => {
      const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
      setRecentScans(scans);
      
      // Update students based on scans
      setStudents(prev => prev.map(student => {
        const scan = scans.find((s: any) => s.studentId === student.studentId || s.studentName === student.name);
        if (scan && !student.present) {
          return { ...student, present: true, method: 'qr' };
        }
        return student;
      }));
    };
    
    loadRecentScans();
    
    // Poll for new scans every 2 seconds
    const scanInterval = setInterval(loadRecentScans, 2000);
    
    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeLeft]);

  const generateQRCode = () => {
    const storedSession = localStorage.getItem('attendanceSession');
    const sessionInfo = storedSession ? JSON.parse(storedSession) : {};
    
    const qrData = {
      sessionId: Math.random().toString(36).substring(7),
      courseId: sessionInfo.courseId || 'CS101',
      courseName: sessionInfo.courseName || 'Unknown Course',
      section: sessionInfo.section || 'A',
      sessionType: sessionInfo.sessionType || 'Lecture',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
      expires: Date.now() + (180 * 1000)
    };
    setQrValue(JSON.stringify(qrData));
    setSessionActive(true);
    setTimeLeft(180);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleManualAttendance = (studentId: number) => {
    setStudents(prev => {
      const updated = prev.map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present, method: (!student.present ? 'manual' : '') as 'qr' | 'manual' | '' }
          : student
      );
      const presentRollNumbers = updated.map((student, index) => student.present ? index + 1 : null).filter(n => n !== null);
      setRollNumbers(presentRollNumbers.join(', '));
      return updated;
    });
  };

  const handleRollNumbersChange = (value: string) => {
    const sanitized = value.replace(/[^0-9,\s]/g, '');
    setRollNumbers(sanitized);
    
    const numbers = sanitized.split(',').map(n => n.trim()).filter(n => n && /^\d+$/.test(n));
    setStudents(prev => prev.map((student, index) => ({
      ...student,
      present: numbers.includes(String(index + 1)) || student.method === 'qr',
      method: (numbers.includes(String(index + 1)) ? 'manual' : (student.method === 'qr' ? 'qr' : '')) as 'qr' | 'manual' | ''
    })));
  };

  const qrScannedStudents = students.filter(s => s.method === 'qr');
  const manualMarkedStudents = students.filter(s => s.method === 'manual');
  const presentCount = students.filter(s => s.present).length;
  const absentStudents = students.filter(s => !s.present);

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Hybrid Attendance Mode</h1>
          <p className="text-sm text-gray-600 dark:text-[#6272a4]">Start with QR scanning, then manual adjustments</p>
          {sessionData && (
            <Card className="mt-3 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20">
              <CardContent className="p-3 pt-3">
                <div className="text-sm">
                  <strong>{sessionData.courseName}</strong> • Section {sessionData.section} • {sessionData.sessionType}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-blue-700">{qrScannedStudents.length}</div>
              <div className="text-xs text-blue-600">QR Scanned</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-purple-700">{manualMarkedStudents.length}</div>
              <div className="text-xs text-purple-600">Manual</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-green-700">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-red-700">{absentStudents.length}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={activeTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-[#44475a]">
            <TabsTrigger value="qr" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#282a36] data-[state=active]:text-gray-900 dark:data-[state=active]:text-[#f8f8f2] text-gray-600 dark:text-[#6272a4]">QR Scanning</TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#282a36] data-[state=active]:text-gray-900 dark:data-[state=active]:text-[#f8f8f2] text-gray-600 dark:text-[#6272a4]">Manual Review</TabsTrigger>
          </TabsList>

          {/* QR Scanning Tab */}
          <TabsContent value="qr" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">QR Code Scanner</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="p-6 bg-white dark:bg-white rounded-lg inline-block shadow-sm">
                    {qrValue && <QRCode value={qrValue} size={180} />}
                  </div>
                  <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="space-y-2">
                    <Button onClick={generateQRCode} size="sm" className="w-full">
                      Regenerate QR
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">Recently Scanned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recentScans.slice(0, 8).map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-500/10 rounded border border-blue-200 dark:border-blue-500/20">
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{scan.studentName}</div>
                          <div className="text-xs text-gray-500 dark:text-[#6272a4]">{scan.studentId}</div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            QR Scanned
                          </Badge>
                          <div className="text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                            {new Date(scan.markedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {recentScans.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Waiting for QR scans...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>


          </TabsContent>

          {/* Manual Review Tab */}
          <TabsContent value="manual" className="space-y-4">
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
                <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">Student List - Manual Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 dark:border-[#6272a4] overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-[#44475a]">
                          <TableHead className="w-12 text-gray-900 dark:text-[#f8f8f2]">Select</TableHead>
                          <TableHead className="text-gray-900 dark:text-[#f8f8f2] min-w-[120px]">Name</TableHead>
                          <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Roll No.</TableHead>
                          <TableHead className="text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                          <TableHead className="text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Method</TableHead>
                        </TableRow>
                      </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            Loading students...
                          </TableCell>
                        </TableRow>
                      ) : students.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No students found. Please check your database connection.
                          </TableCell>
                        </TableRow>
                      ) : (
                        students.map((student) => (
                          <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] bg-white dark:bg-[#282a36]">
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={student.present}
                                onChange={() => toggleManualAttendance(student.id)}
                                className="w-4 h-4 text-orange-600 dark:text-orange-400 bg-white dark:bg-[#44475a] border-gray-300 dark:border-[#6272a4] rounded focus:ring-orange-500 dark:focus:ring-orange-400"
                              />
                            </TableCell>
                            <TableCell className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-xs text-gray-500 dark:text-[#6272a4] sm:hidden">
                                  Roll: {students.indexOf(student) + 1} • {student.method === 'qr' ? 'QR Scanned' : student.method === 'manual' ? 'Manual' : 'Not Marked'}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-[#6272a4] hidden sm:table-cell">{students.indexOf(student) + 1}</TableCell>
                          <TableCell>
                            <Badge className={student.present ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                              {student.present ? 'Present' : 'Absent'}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {student.method === 'qr' && (
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                QR Scanned
                              </Badge>
                            )}
                            {student.method === 'manual' && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                Manual
                              </Badge>
                            )}
                            {!student.method && (
                              <Badge variant="outline" className="border-gray-300 dark:border-[#6272a4] text-gray-500 dark:text-[#6272a4]">
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

            <div className="text-center">
              <Button onClick={() => setShowSaveModal(true)} size="sm">
                Save Attendance ({presentCount}/{students.length})
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* QR Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 z-50">
            <QRScanner 
              onScan={(data) => {
                console.log('QR scanned in hybrid mode:', data);
                setShowScanner(false);
              }}
              onClose={() => setShowScanner(false)}
              onAttendanceMarked={(studentData) => {
                console.log('Attendance marked in hybrid mode:', studentData);
                // Refresh recent scans
                const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
                setRecentScans(scans);
                
                // Update students list
                setStudents(prev => prev.map(student => {
                  if (student.studentId === studentData.studentId || student.name === studentData.studentName) {
                    return { ...student, present: true, method: 'qr' };
                  }
                  return student;
                }));
              }}
            />
          </div>
        )}

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
                  setStudents(prev => prev.map((student, index) => ({
                    ...student,
                    present: numbers.includes(String(index + 1)) || student.method === 'qr',
                    method: (numbers.includes(String(index + 1)) ? 'manual' : (student.method === 'qr' ? 'qr' : '')) as 'qr' | 'manual' | ''
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
                Save attendance for <strong>{presentCount}</strong> present and <strong>{absentStudents.length}</strong> absent students?
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Hybrid Attendance saved');
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