import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { X, Upload, Download, FileText, AlertCircle } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { useAppStore } from '../../store';

interface ImportUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportUsersModal: React.FC<ImportUsersModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addNotification } = useAppStore();

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      addNotification({ message: 'Please select a file to import', type: 'error' });
      return;
    }
    
    addNotification({ message: 'Users imported successfully!', type: 'success' });
    setSelectedFile(null);
    onClose();
  };

  const downloadTemplate = () => {
    addNotification({ message: 'Template downloaded successfully', type: 'success' });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 style={{ zIndex: 9999 }}" onClick={onClose} />
      <div className="fixed inset-0 style={{ zIndex: 9999 }} flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">
              <Upload className="h-5 w-5" />
              Import Users
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            {/* Template Download */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">Download Template</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Use our CSV template to ensure proper formatting
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 gap-2 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                    onClick={downloadTemplate}
                  >
                    <Download className="h-4 w-4" />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Upload CSV File</label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30' 
                    : 'border-gray-300 dark:border-[#6272a4] hover:border-gray-400 dark:hover:border-[#bd93f9]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 dark:text-[#6272a4]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                      Drop your CSV file here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-[#6272a4]">
                      Supports CSV files up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedFile && (
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900 dark:text-green-300">{selectedFile.name}</p>
                    <p className="text-xs text-green-700 dark:text-green-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="h-6 w-6 p-0 text-green-600 dark:text-green-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Import Rules */}
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-300">Import Rules</h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-400 mt-1 space-y-1">
                    <li>• Required fields: Name, Email, Role</li>
                    <li>• Duplicate emails will be skipped</li>
                    <li>• Invalid data rows will be ignored</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                className="flex-1 gap-2" 
                onClick={handleImport}
                disabled={!selectedFile}
              >
                <Upload className="h-4 w-4" />
                Import Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};