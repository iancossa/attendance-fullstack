import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileUpload } from '../ui/file-upload';
import { X, Calendar, Clock, MapPin, User, AlertCircle } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import type { JustificationFormData } from '../../types';

interface AbsenceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JustificationFormData & { classInfo: any }) => Promise<void>;
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

const timeSlots = [
  '09:30 - 10:25',
  '10:45 - 11:40', 
  '12:00 - 12:55',
  '01:15 - 02:10',
  '02:30 - 03:25',
  '03:45 - 04:40'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const schedule = {
  'Monday': [
    { code: 'CS301', name: 'Data Structures', instructor: 'Dr. Smith', room: 'CS-101', type: 'CRT' },
    { code: 'CS302', name: 'Algorithms', instructor: 'Ms. Johnson', room: 'CS-102', type: 'PSS' },
    { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
    { code: 'CS303', name: 'Database Systems', instructor: 'Mr. Wilson', room: 'CS-103', type: 'CRT' },
    { code: 'CS304', name: 'Software Engineering', instructor: 'Dr. Brown', room: 'CS-104', type: 'SB' },
    { code: 'CS305', name: 'Computer Networks', instructor: 'Ms. Davis', room: 'CS-105', type: 'PSS' }
  ],
  'Tuesday': [
    { code: 'CS306', name: 'Operating Systems', instructor: 'Dr. Miller', room: 'CS-106', type: 'CRT' },
    { code: 'CS307', name: 'Web Development', instructor: 'Mr. Garcia', room: 'CS-107', type: 'SB' },
    { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
    { code: 'CS308', name: 'Mobile App Dev', instructor: 'Ms. Martinez', room: 'CS-108', type: 'PSS' },
    { code: 'CS309', name: 'AI Fundamentals', instructor: 'Dr. Anderson', room: 'CS-109', type: 'CRT' },
    { code: 'LAB', name: 'Programming Lab', instructor: 'Mr. Taylor', room: 'LAB-01', type: 'SB' }
  ],
  'Wednesday': [
    { code: 'CS301', name: 'Data Structures', instructor: 'Dr. Smith', room: 'CS-101', type: 'CRT' },
    { code: 'CS310', name: 'Machine Learning', instructor: 'Dr. White', room: 'CS-110', type: 'PSS' },
    { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
    { code: 'CS311', name: 'Cybersecurity', instructor: 'Ms. Thompson', room: 'CS-111', type: 'CRT' },
    { code: 'CS312', name: 'Cloud Computing', instructor: 'Mr. Lee', room: 'CS-112', type: 'SB' },
    { code: 'CS313', name: 'DevOps', instructor: 'Dr. Clark', room: 'CS-113', type: 'PSS' }
  ],
  'Thursday': [
    { code: 'CS302', name: 'Algorithms', instructor: 'Ms. Johnson', room: 'CS-102', type: 'PSS' },
    { code: 'CS314', name: 'Blockchain Tech', instructor: 'Mr. Rodriguez', room: 'CS-114', type: 'CRT' },
    { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
    { code: 'CS315', name: 'IoT Systems', instructor: 'Dr. Lewis', room: 'CS-115', type: 'SB' },
    { code: 'CS316', name: 'Data Analytics', instructor: 'Ms. Walker', room: 'CS-116', type: 'PSS' },
    { code: 'LAB', name: 'Project Lab', instructor: 'Mr. Hall', room: 'LAB-02', type: 'CRT' }
  ],
  'Friday': [
    { code: 'CS317', name: 'Software Testing', instructor: 'Dr. Young', room: 'CS-117', type: 'SB' },
    { code: 'CS318', name: 'System Design', instructor: 'Ms. King', room: 'CS-118', type: 'PSS' },
    { code: 'BREAK', name: 'Lunch Break', instructor: '', room: '', type: '' },
    { code: 'CS319', name: 'Distributed Systems', instructor: 'Mr. Wright', room: 'CS-119', type: 'CRT' },
    { code: 'CS320', name: 'Computer Graphics', instructor: 'Dr. Lopez', room: 'CS-120', type: 'SB' },
    { code: 'SEMINAR', name: 'Tech Seminar', instructor: 'Various', room: 'HALL-A', type: 'PSS' }
  ]
};

export const AbsenceRequestModal: React.FC<AbsenceRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [formData, setFormData] = useState<JustificationFormData>({
    reason: '',
    description: '',
    documents: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedClass) {
      newErrors.class = 'Please select a class';
    }

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
      await onSubmit({ ...formData, classInfo: selectedClass });
      onClose();
    } catch (error) {
      console.error('Failed to submit absence request:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CRT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PSS': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'SB': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 style={{ zIndex: 9999 }}">
      <div className="bg-white dark:bg-[#282a36] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2]">Request Absence Approval</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800 dark:text-red-300">Important Notice</h4>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  This system is for legitimate absence requests only. Submitting false information or using proxy attendance is strictly prohibited and may result in disciplinary action.
                </p>
              </div>
            </div>
          </div>
          
          {!selectedClass ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Select Class to Request Absence</h3>
              {errors.class && (
                <p className="text-red-500 text-sm mb-4">{errors.class}</p>
              )}
              <div className="grid gap-4">
                {days.map(day => (
                  <Card key={day} className="border-gray-200 dark:border-[#6272a4]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-gray-900 dark:text-[#f8f8f2]">{day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {schedule[day as keyof typeof schedule].map((classInfo, index) => {
                          if (classInfo.code === 'BREAK') return null;
                          
                          return (
                            <div
                              key={index}
                              className="border border-gray-200 dark:border-[#6272a4] rounded-lg p-3 hover:border-orange-300 dark:hover:border-orange-400 cursor-pointer transition-all"
                              onClick={() => setSelectedClass({
                                ...classInfo,
                                day,
                                time: timeSlots[index],
                                date: new Date().toLocaleDateString()
                              })}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-bold text-sm text-orange-700 dark:text-orange-400">{classInfo.code}</span>
                                <span className={`text-xs px-2 py-1 rounded ${getTypeColor(classInfo.type)}`}>
                                  {classInfo.type}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{classInfo.name}</div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#6272a4]">
                                  <Clock className="h-3 w-3" />
                                  {timeSlots[index]}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#6272a4]">
                                  <User className="h-3 w-3" />
                                  {classInfo.instructor}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#6272a4]">
                                  <MapPin className="h-3 w-3" />
                                  {classInfo.room}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-orange-200 dark:border-orange-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                    <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    Selected Class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-700 dark:text-orange-400">{selectedClass.code}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(selectedClass.type)}`}>
                          {selectedClass.type}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">{selectedClass.name}</div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-[#6272a4]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {selectedClass.day}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {selectedClass.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {selectedClass.instructor}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {selectedClass.room}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedClass(null)}
                    >
                      Change Class
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                  Reason for Absence *
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
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </ModalPortal>
  );
};