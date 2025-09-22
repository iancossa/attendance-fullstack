import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileUpload } from '../ui/file-upload';
import { AlertCircle } from 'lucide-react';
import type { JustificationFormData } from '../../types';

interface JustificationFormProps {
  attendanceId: string;
  onSubmit: (data: JustificationFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ABSENCE_REASONS = [
  'Medical/Health Issues',
  'Family Emergency',
  'Transportation Issues',
  'Technical Problems',
  'Personal Emergency',
  'Other'
];

export const JustificationForm: React.FC<JustificationFormProps> = ({
  attendanceId,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<JustificationFormData>({
    reason: '',
    description: '',
    documents: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for absence';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit justification:', error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          Request Absence Approval
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
              Reason for Upcoming Absence *
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select a reason...</option>
              {ABSENCE_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please explain why you will not be able to attend this class..."
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
              Supporting Documents (Optional)
            </label>
            <FileUpload
              onFilesChange={(files) => setFormData({ ...formData, documents: files })}
              maxFiles={3}
              maxSize={5}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Justification'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};