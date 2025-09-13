import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { QRScanner } from '../../components/QRScanner';
import { 
  QrCode, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  BookOpen,
  Target,
  Trophy,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  useEffect(() => {
    // Initialize with a demo student (in real app, get from auth context)
    const demoStudent = {
      studentId: 'CS2024001',
      name: 'Alice Johnson',
      department: 'Computer Science',
      class: 'CS-301',
      email: 'alice.johnson@university.edu'
    };
    
    localStorage.setItem('studentInfo', JSON.stringify(demoStudent));
    setCurrentStudent(demoStudent);
  }, []);

  const handleQRScan = () => {
    setShowQRScanner(true);
  };

  const processQRCode = async (qrData: string) => {
    try {
      let sessionId: string;
      let className: string;
      
      // Handle both JSON and URL formats
      try {
        // Try JSON format first (new format)
        const qrJson = JSON.parse(qrData);
        sessionId = qrJson.sessionId;
        className = qrJson.className;
      } catch {
        // Fallback to URL format (old format)
        const url = new URL(qrData);
        sessionId = url.searchParams.get('session') || '';
        className = url.searchParams.get('class') || '';
      }
      
      if (!sessionId) {
        throw new Error('Invalid QR code format');
      }

      // Get student info from localStorage or context (should be set during login)
      const studentData = localStorage.getItem('studentInfo');
      let studentId = 'CS2024001'; // Default for demo
      let studentName = 'Demo Student';
      
      if (studentData) {
        const student = JSON.parse(studentData);
        studentId = student.studentId;
        studentName = student.name;
      }

      // Mark attendance with validation
      const response = await fetch(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: studentId,
          studentName: studentName
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setScanResult(`✅ Attendance marked for ${result.studentName} in ${className}`);
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          setScanResult(`❌ Access Denied: ${result.error}`);
        } else if (response.status === 409) {
          setScanResult(`❌ Already Marked: ${result.error}`);
        } else if (response.status === 410) {
          setScanResult(`❌ Session Expired: ${result.error}`);
        } else {
          setScanResult(`❌ ${result.error || 'Failed to mark attendance'}`);
        }
      }
    } catch (error) {
      setScanResult(`❌ Invalid QR code or network error`);
    }
  };

  const handleScanResult = async (qrData: string) => {
    setShowQRScanner(false);
    await processQRCode(qrData);
  };

  const closeQRScanner = () => {
    setShowQRScanner(false);
    setScanResult(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {currentStudent ? `Welcome, ${currentStudent.name} (${currentStudent.studentId})` : 'Track your attendance and achievements'}
            </p>
          </div>
          <Button onClick={handleQRScan} className="gap-2 w-full sm:w-auto">
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                  <div className="text-2xl font-bold text-green-600 mt-1">87%</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                  <div className="text-2xl font-bold text-blue-600 mt-1">4</div>
                  <p className="text-xs text-muted-foreground">2 completed</p>
                </div>
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                  <div className="text-2xl font-bold text-purple-600 mt-1">12</div>
                  <p className="text-xs text-muted-foreground">days present</p>
                </div>
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rank</p>
                  <div className="text-2xl font-bold text-orange-600 mt-1">#8</div>
                  <p className="text-xs text-muted-foreground">in class</p>
                </div>
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: '09:00 AM', subject: 'Data Structures', room: 'CS-101', status: 'present', attendance: 95 },
                  { time: '11:00 AM', subject: 'Algorithms', room: 'CS-102', status: 'present', attendance: 88 },
                  { time: '02:00 PM', subject: 'Database Systems', room: 'CS-103', status: 'upcoming', attendance: 92 },
                  { time: '04:00 PM', subject: 'Software Engineering', room: 'CS-104', status: 'upcoming', attendance: 85 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium w-16">{item.time}</div>
                      <div className="flex-1">
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-sm text-muted-foreground">{item.room}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">{item.attendance}%</div>
                      <Badge variant={item.status === 'present' ? 'default' : item.status === 'upcoming' ? 'secondary' : 'destructive'}>
                        {item.status === 'present' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {item.status === 'absent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Perfect Week', desc: '100% attendance this week', color: 'bg-green-500' },
                  { name: '10 Day Streak', desc: 'Attended 10 days in a row', color: 'bg-blue-500' },
                  { name: 'Early Bird', desc: 'First to scan QR code', color: 'bg-purple-500' }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className={`w-8 h-8 rounded-full ${achievement.color} flex items-center justify-center`}>
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: 'Data Structures', attendance: 95, color: 'bg-green-500' },
                  { subject: 'Algorithms', attendance: 88, color: 'bg-blue-500' },
                  { subject: 'Database Systems', attendance: 92, color: 'bg-purple-500' },
                  { subject: 'Software Eng.', attendance: 85, color: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.subject}</span>
                      <span className="text-muted-foreground">{item.attendance}%</span>
                    </div>
                    <Progress value={item.attendance} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* QR Scanner */}
        {showQRScanner && (
          <QRScanner 
            onScan={handleScanResult}
            onClose={closeQRScanner}
          />
        )}
        
        {/* Scan Result Modal */}
        {scanResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6">
              <div className="text-center py-4">
                <div className="text-lg mb-4">{scanResult}</div>
                <Button onClick={() => setScanResult(null)} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};