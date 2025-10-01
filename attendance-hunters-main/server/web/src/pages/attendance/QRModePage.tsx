import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import QRCode from 'react-qr-code';
import { Smartphone, QrCode, CheckCircle } from 'lucide-react';
import { QRScanner } from '../../components/QRScanner';
import { useAttendance, useQRSession } from '../../hooks/useAttendance';
import { useEnhancedAppStore } from '../../store/enhancedAppStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

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
  useDocumentTitle('QR Mode Attendance');
  const [qrValue, setQrValue] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [recentScans, setRecentScans] = useState<Attendee[]>([]);
  
  // Use new API hooks
  const { sessions, createSession, loading } = useAttendance();
  const { qrStatus, generateQR, loading: qrLoading } = useQRSession(activeSessionId || undefined);
  const { addNotification } = useEnhancedAppStore();
  
  const presentCount = qrStatus?.scan_count || recentScans.length;
  const totalStudents = 50;
  const timeLeft = qrStatus ? Math.max(0, Math.floor((new Date(qrStatus.expires_at).getTime() - Date.now()) / 1000)) : 300;
  const sessionActive = qrStatus?.status === 'active' && timeLeft > 0;

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
    };
    
    loadRecentScans();
    
    // Poll for new scans every 5 seconds to reduce load
    const scanInterval = setInterval(loadRecentScans, 5000);
    
    return () => clearInterval(scanInterval);
  }, []);

  // Timer is now handled by the API hook, no need for local timer

  const generateQRCode = async () => {
    try {
      // First create a session if none exists
      if (!activeSessionId) {
        const newSession = await createSession({
          class_id: 1, // This should come from props or context
          session_date: new Date().toISOString().split('T')[0],
          session_time: new Date().toTimeString().slice(0, 5),
          session_type: 'lecture',
          location: 'Classroom',
          planned_topic: 'QR Attendance Session'
        });
        setActiveSessionId(newSession.session_id);
      }
      
      // Generate QR for the session
      if (activeSessionId) {
        const qrSession = await generateQR(activeSessionId);
        setQrValue(qrSession.qr_data);
        addNotification({ message: 'QR Code generated successfully', type: 'success' });
      }
    } catch (error) {
      console.error('Failed to generate QR:', error);
      addNotification({ message: 'Failed to generate QR code', type: 'error' });
      
      // Fallback
      const qrData = `attendance://demo?class=CS101&time=${Date.now()}`;
      setQrValue(qrData);
    }
  };

  // Polling is now handled by the useQRSession hook automatically

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup is handled by the API hooks

  const handleAttendanceMarked = (studentData: any) => {
    console.log('🔄 New attendance marked:', studentData);
    // Refresh recent scans immediately
    const scans = JSON.parse(localStorage.getItem('recentScans') || '[]');
    setRecentScans(scans);
  };

  return (
    <Layout>
      <div className="w-full px-4 space-y-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">QR Code Attendance Mode</h1>
          <p className="text-sm text-gray-600 dark:text-[#6272a4]">Students scan QR code with mobile app</p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-green-700">{presentCount}</div>
              <div className="text-xs text-green-600">Present</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-yellow-700">3</div>
              <div className="text-xs text-yellow-600">Late</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-red-700">{totalStudents - presentCount - 3}</div>
              <div className="text-xs text-red-600">Absent</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
            <CardContent className="p-3 pt-3 text-center">
              <div className="text-xl font-semibold text-blue-700">{Math.round((presentCount / totalStudents) * 100)}%</div>
              <div className="text-xs text-blue-600">Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">Live QR Code</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-6 bg-white dark:bg-white rounded-lg inline-block shadow-sm">
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
                <Button onClick={generateQRCode} disabled={qrLoading} size="sm" className="w-full">
                  {qrLoading ? 'Generating...' : (qrValue ? 'Regenerate QR' : 'Generate QR Code')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-[#f8f8f2]">Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentScans.length > 0 ? (
                  recentScans.slice(0, 10).map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-500/10 rounded border border-green-200 dark:border-green-500/20">
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{scan.studentName}</div>
                        <div className="text-xs text-gray-600 dark:text-[#6272a4]">{scan.studentId}</div>
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
                  <div className="text-center py-8 text-gray-500 dark:text-[#6272a4]">
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

        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-900 dark:text-[#f8f8f2]">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900 dark:text-[#f8f8f2]">Step 1: Open App</h3>
                <p className="text-xs text-gray-600 dark:text-[#6272a4]">Launch mobile app</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900 dark:text-[#f8f8f2]">Step 2: Scan QR</h3>
                <p className="text-xs text-gray-600 dark:text-[#6272a4]">Point camera at QR code</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex flex-col justify-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-medium mb-1 text-sm text-gray-900 dark:text-[#f8f8f2]">Step 3: Confirm</h3>
                <p className="text-xs text-gray-600 dark:text-[#6272a4]">Attendance marked</p>
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
            <div className="bg-white dark:bg-[#282a36] p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border border-gray-200 dark:border-[#6272a4]">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-[#f8f8f2]">Save Attendance</h3>
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