import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import QRCode from 'react-qr-code';
import { RefreshCw, Smartphone, QrCode, CheckCircle } from 'lucide-react';

export const QRModePage: React.FC = () => {
  const [qrValue, setQrValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [sessionActive, setSessionActive] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  
  const presentCount = 24;
  const totalStudents = 50;

  useEffect(() => {
    // Load session data from localStorage
    const storedSession = localStorage.getItem('attendanceSession');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      setSessionData(parsed);
    }
    generateQRCode();
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
      expires: Date.now() + (300 * 1000)
    };
    setQrValue(JSON.stringify(qrData));
    setSessionActive(true);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">QR Code Attendance Mode</h1>
          <p className="text-muted-foreground text-sm">Students scan QR code with mobile app</p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-yellow-600">3</div>
              <div className="text-xs text-yellow-600">Late</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{totalStudents - presentCount - 3}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{Math.round((presentCount / totalStudents) * 100)}%</div>
              <div className="text-xs text-blue-600">Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Live QR Code</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-6 bg-white rounded-lg inline-block">
                {qrValue && <QRCode value={qrValue} size={180} />}
              </div>
              
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                  {formatTime(timeLeft)}
                </div>
                <Badge className={sessionActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                  {sessionActive ? 'Active Session' : 'Session Expired'}
                </Badge>
              </div>

              <Button onClick={generateQRCode}>
                Regenerate QR
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="text-center py-8 text-muted-foreground">
                  <QrCode className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Waiting for QR scans...</p>
                  <p className="text-xs mt-1">Students will appear here as they scan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => setShowSaveModal(true)}>
            Save Attendance ({presentCount}/{totalStudents})
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg h-32 flex flex-col justify-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm">Step 1: Open App</h3>
                <p className="text-xs text-muted-foreground">Launch mobile app</p>
              </div>
              <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg h-32 flex flex-col justify-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm">Step 2: Scan QR</h3>
                <p className="text-xs text-muted-foreground">Point camera at QR code</p>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg h-32 flex flex-col justify-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm">Step 3: Confirm</h3>
                <p className="text-xs text-muted-foreground">Attendance marked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Attendance Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Save Attendance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Save attendance for <strong>{presentCount}</strong> present and <strong>{totalStudents - presentCount}</strong> absent students?
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('QR Attendance saved');
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