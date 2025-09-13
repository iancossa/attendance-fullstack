import React, { useState } from 'react';
import { Button } from './ui/button';
import { QrCode } from 'lucide-react';
import { QRScanner } from './QRScanner';

export const QRTestButton: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setResult(data);
    setShowScanner(false);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setShowScanner(true)} className="mb-4">
        <QrCode className="h-4 w-4 mr-2" />
        Test QR Scanner
      </Button>
      
      {result && (
        <div className="p-4 bg-muted rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Scanned Result:</h3>
          <pre className="text-sm overflow-auto">{result}</pre>
          <Button onClick={() => setResult(null)} size="sm" className="mt-2">
            Clear
          </Button>
        </div>
      )}
      
      {showScanner && (
        <QRScanner 
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};