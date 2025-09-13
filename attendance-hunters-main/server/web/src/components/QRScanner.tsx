import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Camera, X, RotateCcw } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
        
        // Start scanning for QR codes
        videoRef.current.onloadedmetadata = () => {
          setTimeout(scanForQR, 1000); // Wait 1 second for camera to stabilize
        };
      }
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
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

    try {
      const codeReader = new BrowserQRCodeReader();
      
      // Scan from video element
      const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current);
      
      if (result) {
        onScan(result.getText());
        stopCamera();
        return;
      }
    } catch (error) {
      // Fallback: Use canvas-based detection
      try {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const codeReader = new BrowserQRCodeReader();
            
            // Convert canvas to data URL and decode
            const dataUrl = canvas.toDataURL();
            const result = await codeReader.decodeFromImage(dataUrl);
            if (result) {
              onScan(result.getText());
              stopCamera();
              return;
            }
          }
        }
      } catch (canvasError) {
        // Continue scanning
      }
      
      // Continue scanning if no QR found
      if (isScanning) {
        setTimeout(scanForQR, 500); // Try again in 500ms
      }
    }
  };

  const handleManualInput = () => {
    const qrData = prompt('Enter QR code data manually:');
    if (qrData) {
      onScan(qrData);
      stopCamera();
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
        
        <div className="p-4">
          {error ? (
            <div className="text-center py-8">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-red-500 mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={startCamera} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
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
                  <Button 
                    onClick={() => {
                      // Simulate successful scan for demo
                      const demoQR = 'attendance://mark?session=qr_demo_camera&class=Camera Demo';
                      onScan(demoQR);
                      stopCamera();
                    }}
                    variant="secondary" 
                    className="w-full"
                  >
                    Demo Scan (Test)
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