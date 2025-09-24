import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { BrowserQRCodeReader } from '@zxing/library';

export const QRDebugger: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('Not started');
  const [result, setResult] = useState<string>('');

  const testQRScanner = async () => {
    try {
      setStatus('Starting camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStatus('Camera started, initializing scanner...');
        
        videoRef.current.onplaying = async () => {
          setStatus('Video playing, starting QR detection...');
          
          const codeReader = new BrowserQRCodeReader();
          
          try {
            const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current!);
            setResult(result.getText());
            setStatus('QR Code detected!');
          } catch (error) {
            setStatus('No QR code found, trying continuous scan...');
            
            // Try continuous scanning
            const scanContinuously = async () => {
              try {
                const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current!);
                setResult(result.getText());
                setStatus('QR Code detected!');
              } catch (err) {
                setTimeout(scanContinuously, 1000);
              }
            };
            
            scanContinuously();
          }
        };
      }
    } catch (error: any) {
      setStatus('Error: ' + (error?.message || 'Unknown error'));
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-4">QR Scanner Debug</h3>
      
      <div className="space-y-4">
        <Button onClick={testQRScanner}>Start QR Test</Button>
        
        <div>
          <strong>Status:</strong> {status}
        </div>
        
        {result && (
          <div>
            <strong>Result:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-sm border rounded"
        />
      </div>
    </div>
  );
};