import React from 'react';
import { JustificationForm } from './JustificationForm';
import type { JustificationFormData } from '../../types';

interface JustificationModalProps {
  isOpen: boolean;
  attendanceId: string;
  onClose: () => void;
  onSubmit: (data: JustificationFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const JustificationModal: React.FC<JustificationModalProps> = ({
  isOpen,
  attendanceId,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <JustificationForm
          attendanceId={attendanceId}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};