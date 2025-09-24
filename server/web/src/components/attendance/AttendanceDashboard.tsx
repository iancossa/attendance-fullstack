import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { QrCode, Users, Clock, AlertCircle } from 'lucide-react';
import { useAttendance, useQRSession } from '../../hooks/useAttendance';
import { QRScanner } from '../QRScanner';
import type { AttendanceSession, CreateSessionData } from '../../types/api';

interface AttendanceDashboardProps {
  classId: number;
  className?: string;
}

export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({ 
  classId, 
  className 
}) => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(null);
  const [showCreateSession, setShowCreateSession] = useState(false);
  
  const { 
    sessions, 
    loading, 
    error, 
    createSession, 
    refetchSessions 
  } = useAttendance(classId);
  
  const { 
    qrStatus, 
    generateQR, 
    loading: qrLoading 
  } = useQRSession(activeSession?.session_id);

  // Real-time updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSession) {
        refetchSessions();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeSession, refetchSessions]);

  const handleCreateSession = async (data: CreateSessionData) => {
    try {
      const newSession = await createSession(data);
      setActiveSession(newSession);
      setShowCreateSession(false);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleGenerateQR = async () => {
    if (activeSession) {
      try {
        await generateQR(activeSession.session_id);
        setShowQRScanner(true);
      } catch (error) {
        console.error('Failed to generate QR:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Attendance Dashboard</h2>
          {className && (
            <p className="text-gray-600 dark:text-gray-400">{className}</p>
          )}
        </div>
        <Button 
          onClick={() => setShowCreateSession(true)}
          className="flex items-center gap-2"
        >
          <Clock className="h-4 w-4" />
          New Session
        </Button>
      </div>

      {/* Active Session Card */}
      {activeSession && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Active Session
              </div>
              {getStatusBadge(activeSession.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Session ID</p>
                <p className="font-mono text-sm">{activeSession.session_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                <p className="text-sm">
                  {new Date(activeSession.session_date).toLocaleDateString()} at {activeSession.session_time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p className="text-sm capitalize">{activeSession.session_type}</p>
              </div>
            </div>

            {/* QR Status */}
            {qrStatus && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">QR Code Status</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {qrStatus.scan_count} students scanned
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{qrStatus.scan_count}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Scans</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={handleGenerateQR}
                disabled={qrLoading}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                {qrStatus ? 'Show QR Code' : 'Generate QR Code'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setActiveSession(null)}
              >
                End Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions && sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div 
                  key={session.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => setActiveSession(session)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{session.session_id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(session.session_date).toLocaleDateString()} at {session.session_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(session.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {session.session_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">No sessions found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Create a new session to start taking attendance
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* QR Scanner Modal */}
      {showQRScanner && activeSession && (
        <QRScanner
          onScan={(data) => {
            console.log('QR Scanned:', data);
            setShowQRScanner(false);
          }}
          onClose={() => setShowQRScanner(false)}
          sessionId={activeSession.session_id}
          autoSubmit={false}
          studentMode={false}
        />
      )}

      {/* Create Session Modal */}
      {showCreateSession && (
        <CreateSessionModal
          classId={classId}
          onSubmit={handleCreateSession}
          onClose={() => setShowCreateSession(false)}
        />
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Session Modal Component
interface CreateSessionModalProps {
  classId: number;
  onSubmit: (data: CreateSessionData) => void;
  onClose: () => void;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  classId,
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState<CreateSessionData>({
    class_id: classId,
    session_date: new Date().toISOString().split('T')[0],
    session_time: new Date().toTimeString().slice(0, 5),
    session_type: 'lecture',
    location: '',
    planned_topic: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Create New Session</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={formData.session_date}
              onChange={(e) => setFormData({ ...formData, session_date: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={formData.session_time}
              onChange={(e) => setFormData({ ...formData, session_time: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.session_type}
              onChange={(e) => setFormData({ ...formData, session_type: e.target.value as any })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="lecture">Lecture</option>
              <option value="lab">Lab</option>
              <option value="tutorial">Tutorial</option>
              <option value="exam">Exam</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Room number or location"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Topic</label>
            <input
              type="text"
              value={formData.planned_topic || ''}
              onChange={(e) => setFormData({ ...formData, planned_topic: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Session topic"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Create Session
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};