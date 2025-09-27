import React, { useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 3,
  maxSize = 5,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  className
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter(file => {
      const sizeValid = file.size <= maxSize * 1024 * 1024;
      const typeValid = acceptedTypes.some(type => 
        file.name.toLowerCase().endsWith(type.toLowerCase())
      );
      return sizeValid && typeValid;
    });

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragActive 
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10' 
            : 'border-gray-300 dark:border-[#6272a4] hover:border-orange-400 dark:hover:border-orange-500'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-[#6272a4] mb-2" />
        <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-2">
          Drag files here or click to browse
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Choose Files
        </Button>
        <p className="text-xs text-gray-500 dark:text-[#6272a4] mt-2">
          Max {maxFiles} files, {maxSize}MB each. {acceptedTypes.join(', ')}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#44475a] rounded border"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500 dark:text-[#6272a4]" />
                <span className="text-sm text-gray-700 dark:text-[#f8f8f2] truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-[#6272a4]">
                  ({(file.size / 1024 / 1024).toFixed(1)}MB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};