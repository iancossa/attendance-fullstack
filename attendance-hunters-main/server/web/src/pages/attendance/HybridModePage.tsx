import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import QRCode from 'react-qr-code';
import { RefreshCw, ArrowRight, Smartphone } from 'lucide-react';
import { QRScanner } from '../../components/QRScanner';
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
  method: 'qr' | 'manual' | '';
}

// Mock student data for fallback
const getMockStudents = (): Student[] => [
  { id: 1, studentId: 'CS2024001', name: 'John Doe', email: 'john.doe@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 2, studentId: 'CS2024002', name: 'Jane Smith', email: 'jane.smith@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 3, studentId: 'CS2024003', name: 'Bob Johnson', email: 'bob.johnson@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 4, studentId: 'CS2024004', name: 'Alice Brown', email: 'alice.brown@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 5, studentId: 'CS2024005', name: 'Charlie Wilson', email: 'charlie.wilson@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 6, studentId: 'CS2024006', name: 'Diana Davis', email: 'diana.davis@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 7, studentId: 'CS2024007', name: 'Eva Martinez', email: 'eva.martinez@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' },
  { id: 8, studentId: 'CS2024008', name: 'Frank Garcia', email: 'frank.garcia@student.edu', department: 'Computer Science', class: 'CS-101', section: 'A', present: false, method: '' }
];

export const HybridModePage: React.FC = () => {
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

  useEffect(() => {
    // Load real students from database
    const loadStudents = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated and has proper permissions
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const userRole = localStorage.getItem('user_role');
        
        if (!token) {
          console.warn('No authentication token found - using mock data');
          setStudents(getMockStudents());
          return;
        }
        
        if (userRole !== 'admin' && userRole !== 'staff') {
          console.warn('Insufficient permissions for student data - using mock data');
          setStudents(getMockStudents());
          return;
        }
        
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
          console.log('✅ Loaded', dbStudents.length, 'students from database');
        } else {
          console.warn('No students data in response - using mock data');
          setStudents(getMockStudents());
        }
      } catch (error) {
        console.error('Failed to load students:', error);
        console.log('📋 Falling back to mock student data');
        setStudents(getMockStudents());
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
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present, method: !student.present ? 'manual' : '' }
        : student
    ));
  };

  const qrScannedStudents = students.filter(s => s.method === 'qr');
  const manualMarkedStudents = students.filter(s => s.method === 'manual');
  const presentCount = students.filter(s => s.present).length;
  const absentStudents = students.filter(s => !s.present);

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Hybrid Attendance Mode</h1>
          <p className="text-muted-foreground text-sm">Start with QR scanning, then manual adjustments</p>
          {sessionData && (
            <Card className="mt-3 bg-primary/5 border-primary/20">
              <CardContent className="p-3">
                <div className="text-sm">
                  <strong>{sessionData.courseName}</strong> • Section {sessionData.section} • {sessionData.sessionType}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{qrScannedStudents.length}</div>
              <div className="text-xs text-blue-600">QR Scanned</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{manualMarkedStudents.length}</div>
              <div className="text-xs text-green-600">Manual</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-purple-600">{presentCount}</div>
              <div className="text-xs text-purple-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{absentStudents.length}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr">QR Scanning</TabsTrigger>
            <TabsTrigger value="manual">Manual Review</TabsTrigger>
          </TabsList>

          {/* QR Scanning Tab */}
          <TabsContent value="qr" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">QR Code Scanner</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="p-6 bg-white rounded-lg inline-block">
                    {qrValue && <QRCode value={qrValue} size={180} />}
                  </div>
                  <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="space-y-2">
                    <Button onClick={generateQRCode} className="w-full">
                      Regenerate QR
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowScanner(true)}
                      className="w-full"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Scan as Student
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recently Scanned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recentScans.slice(0, 8).map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/30 rounded border">
                        <div>
                          <div className="font-medium text-sm">{scan.studentName}</div>
                          <div className="text-xs text-muted-foreground">{scan.studentId}</div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            QR Scanned
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
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
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Student List - Manual Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">Select</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
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
                            <div className="space-y-2">
                              <p>No students found.</p>
                              <p className="text-xs">Please ensure you're logged in with admin/staff permissions.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        students.map((student) => (
                          <TableRow key={student.id} className="hover:bg-muted/30">
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={student.present}
                                onChange={() => toggleManualAttendance(student.id)}
                                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell className="text-muted-foreground">{student.studentId}</TableCell>
                          <TableCell>
                            <Badge variant={student.present ? 'default' : 'secondary'}>
                              {student.present ? 'Present' : 'Absent'}
                            </Badge>
                          </TableCell>
                          <TableCell>
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
                              <Badge variant="outline">
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
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={() => setShowSaveModal(true)}>
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

        {/* Save Attendance Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Save Attendance</h3>
              <p className="text-sm text-muted-foreground mb-4">
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