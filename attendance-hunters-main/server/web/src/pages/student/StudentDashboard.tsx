import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { QRScanner } from '../../components/QRScanner';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { 
  QrCode, 
  Calendar, 
  TrendingUp, 
  Clock,
  Target,
  Trophy,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  useDocumentTitle('Student Dashboard');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  useEffect(() => {
    // Get student info from localStorage (set during login)
    const studentData = localStorage.getItem('studentInfo');
    if (studentData) {
      const student = JSON.parse(studentData);
      setCurrentStudent({
        studentId: student.studentId,
        name: student.name,
        department: student.department,
        class: student.class,
        email: student.email
      });
    }
  }, []);

  const handleQRScan = () => {
    setShowQRScanner(true);
  };

  const handleScanResult = async (qrData: string) => {
    setShowQRScanner(false);
    
    try {
      let sessionId: string;
      let className: string = 'Unknown Class';
      
      // Handle both JSON and URL formats
      try {
        // Try JSON format first (new format)
        const qrJson = JSON.parse(qrData);
        sessionId = qrJson.sessionId;
        className = qrJson.className || 'Unknown Class';
      } catch {
        // Fallback to URL format (old format)
        const url = new URL(qrData);
        sessionId = url.searchParams.get('session') || '';
        className = url.searchParams.get('class') || 'Unknown Class';
      }
      
      if (!sessionId) {
        throw new Error('Invalid QR code format');
      }

      // Get student info from localStorage (set during login)
      const studentData = localStorage.getItem('studentInfo');
      if (!studentData) {
        throw new Error('Student not logged in');
      }
      
      const student = JSON.parse(studentData);

      // Mark attendance with validation
      const response = await fetch(`https://attendance-fullstack.onrender.com/api/qr/mark/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: student.studentId,
          studentName: student.name
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setScanResult(`✅ Attendance marked successfully for ${className}!`);
        
        // Add to recent scans for QR/Hybrid modes
        const scanData = {
          studentId: student.studentId,
          studentName: student.name,
          markedAt: new Date().toISOString(),
          status: 'present',
          sessionId: sessionId,
          className: className
        };
        
        const existingScans = JSON.parse(localStorage.getItem('recentScans') || '[]');
        existingScans.unshift(scanData);
        localStorage.setItem('recentScans', JSON.stringify(existingScans.slice(0, 50)));
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

  const closeQRScanner = () => {
    setShowQRScanner(false);
    setScanResult(null);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-[#f8f8f2]">My Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">
              {currentStudent ? `Welcome, ${currentStudent.name} (${currentStudent.studentId})` : 'Track your attendance and achievements'}
            </p>
          </div>
          <Button onClick={handleQRScan} className="gap-2 bg-orange-500 hover:bg-orange-600 hidden sm:flex">
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </Button>
          <Button onClick={handleQRScan} size="sm" className="bg-orange-500 hover:bg-orange-600 sm:hidden">
            <QrCode className="h-4 w-4" />
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Overall Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">87%</div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +3% this week</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Classes Today</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">4</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">2 completed</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Current Streak</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">12</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">days present</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-[#f8f8f2]">Class Rank</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-1">#8</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">out of 45 students</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Trophy className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '09:00 AM', subject: 'Data Structures', room: 'CS-101', status: 'present', attendance: 95 },
                { time: '11:00 AM', subject: 'Algorithms', room: 'CS-102', status: 'present', attendance: 88 },
                { time: '02:00 PM', subject: 'Database Systems', room: 'CS-103', status: 'upcoming', attendance: 92 },
                { time: '04:00 PM', subject: 'Software Engineering', room: 'CS-104', status: 'upcoming', attendance: 85 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg border border-gray-200 dark:border-[#6272a4]">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium w-16 text-gray-900 dark:text-[#f8f8f2]">{item.time}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{item.subject}</div>
                      <div className="text-xs text-gray-600 dark:text-[#6272a4]">{item.room}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      item.status === 'present' 
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : item.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                    }>
                      {item.status === 'present' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {item.status === 'absent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { subject: 'Data Structures', attendance: 95 },
                { subject: 'Algorithms', attendance: 88 },
                { subject: 'Database Systems', attendance: 92 },
                { subject: 'Software Engineering', attendance: 85 }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-orange-50 dark:from-orange-500/10 to-transparent rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 dark:text-[#f8f8f2]">{item.subject}</span>
                    <span className="text-orange-600 font-medium">{item.attendance}%</span>
                  </div>
                  <Progress value={item.attendance} />
                </div>
              ))}
            </CardContent>
          </Card>
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
            <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-200 dark:border-[#6272a4]">
              <div className="text-center py-4">
                <div className={`text-4xl mb-4 ${
                  scanResult.includes('✅') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {scanResult.includes('✅') ? '🎉' : '⚠️'}
                </div>
                <div className="text-base mb-6 font-medium text-gray-900 dark:text-[#f8f8f2]">{scanResult}</div>
                <Button onClick={() => setScanResult(null)} className="w-full">
                  {scanResult.includes('✅') ? 'Great!' : 'Try Again'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};