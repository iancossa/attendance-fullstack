import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Camera, X, RotateCcw } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';
import { useQRSession } from '../hooks/useAttendance';
import { authService } from '../services/authService';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
  onAttendanceMarked?: (studentData: any) => void;
  sessionId?: string;
  autoSubmit?: boolean;
  studentMode?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ 
  onScan, 
  onClose, 
  onAttendanceMarked,
  sessionId,
  autoSubmit = false,
  studentMode = false 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [codeReader] = useState(() => new BrowserQRCodeReader());
  const [processing, setProcessing] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  const { qrStatus, markViaQR } = useQRSession(sessionId);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera not supported in this browser');
        return;
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: { ideal: 'environment' }, // Prefer back camera but allow front
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
        
        // Start scanning when video is ready
        videoRef.current.oncanplay = () => {
          console.log('📹 Video ready, starting QR scan');
          setIsScanning(true);
          scanForQR();
        };
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      if (err?.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera access and try again.');
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Camera not available. You can still enter QR data manually.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const scanForQR = async () => {
    if (!videoRef.current || !isScanning) return;

    const video = videoRef.current;
    
    if (video && video.readyState >= 2) { // HAVE_CURRENT_DATA or better
      try {
        const result = await codeReader.decodeOnceFromVideoDevice(undefined, video);
        if (result && result.getText()) {
          console.log('✅ QR Code detected:', result.getText());
          processQRData(result.getText());
          return;
        }
      } catch (error) {
        // No QR code found, continue scanning
      }
    }
    
    // Continue scanning
    if (isScanning) {
      requestAnimationFrame(scanForQR);
    }
  };

  const handleManualInput = () => {
    const qrData = prompt('Enter QR code data manually:');
    if (qrData) {
      processQRData(qrData);
    }
  };

  const processQRData = async (qrData: string) => {
    if (processing) return;
    
    setProcessing(true);
    setScanResult(qrData);
    
    try {
      console.log('🔍 Processing QR data:', qrData);
      
      if (studentMode && autoSubmit) {
        // Enhanced auto-submit for student scanning
        const user = authService.getStoredUser();
        if (user && user.student_id) {
          // Parse session ID from QR data
          let sessionId = qrData;
          if (qrData.includes('/api/qr/mark/')) {
            sessionId = qrData.split('/api/qr/mark/')[1];
          }
          
          await markViaQR(sessionId, {
            studentId: user.student_id?.toString(),
            studentName: user.name
          });
          
          onScan('Attendance marked successfully!');
        } else {
          throw new Error('Student not logged in');
        }
      } else {
        // Legacy processing for backward compatibility
        let sessionData;
        try {
          sessionData = JSON.parse(qrData);
        } catch {
          if (qrData.includes('/api/qr/mark/')) {
            const sessionId = qrData.split('/api/qr/mark/')[1];
            sessionData = { sessionId };
          } else {
            throw new Error('Invalid QR format');
          }
        }

        if (!sessionData.sessionId) {
          throw new Error('No session ID found in QR code');
        }

        // Get student info from localStorage (legacy)
        const studentData = localStorage.getItem('studentInfo');
        if (!studentData) {
          throw new Error('Student not logged in');
        }
        
        const student = JSON.parse(studentData);
        console.log('✅ Using logged in student:', student.name);

        // Mark attendance using new service
        if (markViaQR) {
          await markViaQR(sessionData.sessionId, {
            studentId: student.studentId,
            studentName: student.name
          });
        }

        // Update localStorage for real-time updates
        const scanData = {
          studentId: student.studentId,
          studentName: student.name,
          markedAt: new Date().toISOString(),
          status: 'present',
          sessionId: sessionData.sessionId
        };

        const recentScans = JSON.parse(localStorage.getItem('recentScans') || '[]');
        recentScans.unshift(scanData);
        localStorage.setItem('recentScans', JSON.stringify(recentScans.slice(0, 50)));

        if (onAttendanceMarked) {
          onAttendanceMarked(scanData);
        }

        onScan(qrData);
      }
      
      stopCamera();

    } catch (error) {
      console.error('❌ QR processing error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process QR code');
    } finally {
      setProcessing(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Scan QR Code</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Session Status */}
        {sessionId && qrStatus && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Session: {sessionId} | Scanned: {qrStatus.scan_count}
            </p>
          </div>
        )}
        
        <div className="p-4">
          {error ? (
            <div className="text-center py-8">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-red-500 mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={startCamera} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Camera Again
                </Button>

                <Button variant="outline" onClick={handleManualInput} className="w-full">
                  Enter Manually
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Position the QR code within the frame
                </p>
                <div className="space-y-2">

                  <Button variant="outline" onClick={handleManualInput} className="w-full">
                    Enter QR Data Manually
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};