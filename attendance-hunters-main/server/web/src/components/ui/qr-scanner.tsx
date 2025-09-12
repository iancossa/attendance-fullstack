import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader, BrowserQRCodeReader } from '@zxing/library';
import { Button } from './button';
import { Camera, CameraOff } from 'lucide-react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [codeReader] = useState(() => new BrowserQRCodeReader());

  const startScanning = async () => {
    try {
      setIsScanning(true);
      if (videoRef.current) {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            onScan(result.getText());
            stopScanning();
          }
          // Only show errors that aren't normal scanning attempts
          if (error && !error.message.includes('No MultiFormat Readers')) {
            console.warn('Scanner warning:', error.message);
          }
        });
      }
    } catch (error) {
      if (onError) {
        onError('Failed to start camera');
      }
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    codeReader.reset();
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      codeReader.reset();
    };
  }, [codeReader]);

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        className="w-full max-w-md mx-auto rounded-lg border"
        style={{ display: isScanning ? 'block' : 'none' }}
      />
      
      <div className="flex justify-center gap-2">
        {!isScanning ? (
          <Button onClick={startScanning} className="gap-2">
            <Camera className="h-4 w-4" />
            Start Scanner
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="outline" className="gap-2">
            <CameraOff className="h-4 w-4" />
            Stop Scanner
          </Button>
        )}
      </div>
    </div>
  );
};