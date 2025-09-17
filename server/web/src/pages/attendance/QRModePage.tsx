import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import QRCode from 'react-qr-code';
import { RefreshCw, Smartphone, QrCode, CheckCircle } from 'lucide-react';
import { QRScanner } from '../../components/QRScanner';
import { qrService } from '../../services/backendService';

interface Attendee {
  studentId: string;
  studentName: string;
  markedAt: string;
  status: string;
}

interface QRResponse {
  sessionId: string;
  qrData: string;
  expiresIn: number;
  className: string;
  expiresAt: string;
}

interface SessionStatus {
  attendees: Attendee[];
  timeLeft: number;
  isActive: boolean;
}

export const QRModePage: React.FC = () => {
  const [qrValue, setQrValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [sessionActive, setSessionActive] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [recentScans, setRecentScans] = useState<Attendee[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  
  const presentCount = attendees.length;
  const totalStudents = 50; // This could come from class data

  useEffect(() => {
    // Load session data from localStorage
    const storedSession = localStorage.getItem('attendanceSession');
    if (storedSession) {
      const parsed = JSON.parse(storedSession);
      setSessionData(parsed);
    }
    
    // Load recent scans
    const loadRecentScans = () => {
      const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
      setRecentScans(scans);
      // Also update attendees count
      setAttendees(scans);
    };
    
    loadRecentScans();
    
    // Poll for new scans every 5 seconds to reduce load
    const scanInterval = setInterval(loadRecentScans, 5000);
    
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

  const generateQRCode = async () => {
    console.log('🔵 Starting QR generation...');
    setIsGenerating(true);
    try {
      const storedSession = localStorage.getItem('attendanceSession');
      const sessionInfo = storedSession ? JSON.parse(storedSession) : {};
      
      console.log('📋 Session info:', sessionInfo);
      console.log('🚀 Calling qrService.generateQRSession...');
      
      const response = await qrService.generateQRSession(
        sessionInfo.courseId || 'CS101',
        sessionInfo.courseName || 'Demo Class'
      );
      
      console.log('📥 QR Service response:', response);
      
      if (response.data) {
        const data = response.data as QRResponse;
        console.log('📝 Setting QR data:', data);
        setQrValue(data.qrData);
        setSessionActive(true);
        setTimeLeft(data.expiresIn);
        
        // Store session info for polling
        localStorage.setItem('currentQRSession', JSON.stringify({
          sessionId: data.sessionId,
          className: data.className,
          expiresAt: data.expiresAt
        }));
        
        console.log('🔄 Starting polling for session:', data.sessionId);
        // Start polling for attendees
        startPolling(data.sessionId);
      } else {
        console.error('❌ No data in response:', response);
      }
    } catch (error) {
      console.error('❌ Failed to generate QR code:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        response: (error as any)?.response?.data
      });
      
      // Fallback to local generation
      console.log('🔄 Using fallback QR generation...');
      const qrData = `attendance://demo?class=CS101&time=${Date.now()}`;
      setQrValue(qrData);
      setSessionActive(true);
      setTimeLeft(300);
    } finally {
      console.log('✅ QR generation completed');
      setIsGenerating(false);
    }
  };

  const startPolling = (sessionId: string) => {
    // Clear existing interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    
    let pollCount = 0;
    const maxPolls = 150; // Stop after 5 minutes (150 * 2s = 300s)
    
    // Poll every 5 seconds to reduce server load
    const interval = setInterval(async () => {
      try {
        pollCount++;
        
        if (pollCount > maxPolls) {
          console.log('⏰ Max polling reached, stopping');
          setSessionActive(false);
          clearInterval(interval);
          return;
        }
        
        console.log(`🔍 Polling session (${pollCount}/${maxPolls}):`, sessionId);
        const response = await qrService.getSessionStatus(sessionId);
        
        if (response.data) {
          const data = response.data as SessionStatus & { pollInterval?: number };
          setAttendees(data.attendees || []);
          setTimeLeft(data.timeLeft || 0);
          
          if (data.timeLeft <= 0 || !data.isActive) {
            console.log('⏰ Session expired, stopping polling');
            setSessionActive(false);
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('❌ Polling error:', error);
        // Stop polling on repeated errors
        if (error instanceof Error && error.message.includes('429')) {
          console.log('🚫 Rate limited, reducing polling frequency');
          clearInterval(interval);
          // Restart with longer interval
          setTimeout(() => startPolling(sessionId), 10000);
        }
      }
    }, 5000); // Increased from 2s to 5s
    
    setPollingInterval(interval);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleAttendanceMarked = (studentData: any) => {
    console.log('🔄 New attendance marked:', studentData);
    // Refresh recent scans immediately
    const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
    setRecentScans(scans);
    setAttendees(scans);
  };

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900 mb-1">QR Code Attendance Mode</h1>
          <p className="text-sm text-gray-600">Students scan QR code with mobile app</p>
          {sessionData && (
            <Card className="mt-3 bg-orange-50 border-orange-200">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-green-700">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-yellow-700">3</div>
              <div className="text-xs text-yellow-600">Late</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-red-700">{totalStudents - presentCount - 3}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-blue-700">{Math.round((presentCount / totalStudents) * 100)}%</div>
              <div className="text-xs text-blue-600">Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Live QR Code</CardTitle>
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

              <div className="space-y-2">
                <Button onClick={generateQRCode} disabled={isGenerating} size="sm" className="w-full">
                  {isGenerating ? 'Generating...' : (qrValue ? 'Regenerate QR' : 'Generate QR Code')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentScans.length > 0 ? (
                  recentScans.slice(0, 10).map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{scan.studentName}</div>
                        <div className="text-xs text-gray-600">{scan.studentId}</div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Present</Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(scan.markedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <QrCode className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Waiting for QR scans...</p>
                    <p className="text-xs mt-1">Students will appear here as they scan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => setShowSaveModal(true)} size="sm">
            Save Attendance ({presentCount}/{totalStudents})
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-center p-4 bg-orange-50 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900">Step 1: Open App</h3>
                <p className="text-xs text-gray-600">Launch mobile app</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900">Step 2: Scan QR</h3>
                <p className="text-xs text-gray-600">Point camera at QR code</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900">Step 3: Confirm</h3>
                <p className="text-xs text-gray-600">Attendance marked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 z-50">
            <QRScanner 
              onScan={(data) => {
                console.log('QR scanned:', data);
                setShowScanner(false);
              }}
              onClose={() => setShowScanner(false)}
              onAttendanceMarked={handleAttendanceMarked}
            />
          </div>
        )}

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