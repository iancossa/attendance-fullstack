import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { FileUpload } from '../../components/ui/file-upload';
import { Calendar, Clock, MapPin, User, AlertTriangle, Send, FileText } from 'lucide-react';
import { justificationService } from '../../services/justificationService';
import { useAppStore } from '../../store';
import type { JustificationFormData } from '../../types';

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

export const RequestAbsencePage: React.FC = () => {
  useDocumentTitle('Request Absence Approval');
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    if (location.state?.selectedClass) {
      setSelectedClass(location.state.selectedClass);
    }
  }, [location.state]);
  const [formData, setFormData] = useState<JustificationFormData>({
    reason: '',
    description: '',
    documents: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useAppStore();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CRT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PSS': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'SB': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

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

    setIsSubmitting(true);
    try {
      await justificationService.submitJustification('temp-id', formData);
      addNotification({
        message: 'Absence request submitted successfully',
        type: 'success'
      });
      navigate('/justifications');
    } catch (error) {
      console.error('Failed to submit request:', error);
      addNotification({
        message: 'Failed to submit absence request',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-full mb-4">
            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#f8f8f2] mb-2">Request Absence Approval</h1>
          <p className="text-gray-600 dark:text-[#6272a4] max-w-md mx-auto">Submit a formal request for class absence with proper justification</p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">Academic Integrity Notice</h3>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                This system is designed for legitimate absence requests only. All submissions are reviewed by faculty and academic staff. 
                Providing false information or misusing this system may result in disciplinary action according to university policies.
              </p>
              <div className="mt-3 text-sm text-amber-700 dark:text-amber-400">
                <strong>Remember:</strong> Submit requests as early as possible for better approval chances.
              </div>
            </div>
          </div>
        </div>

        {!selectedClass ? (
          /* Class Selection */
          <Card className="border-0 shadow-lg bg-white dark:bg-[#282a36]">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-b border-orange-100 dark:border-orange-800">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                Select Class for Absence Request
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-2">Choose the specific class you need to request absence for</p>
            </CardHeader>
            <CardContent className="p-6">
              {errors.class && (
                <p className="text-red-500 text-sm mb-4">{errors.class}</p>
              )}
              <div className="space-y-4">
                {days.map(day => (
                  <div key={day}>
                    <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-3">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {schedule[day as keyof typeof schedule].map((classInfo, index) => {
                        if (classInfo.code === 'BREAK') return null;
                        
                        return (
                          <div
                            key={index}
                            className="border border-gray-200 dark:border-[#6272a4] rounded-lg p-3 hover:border-orange-300 dark:hover:border-orange-400 cursor-pointer transition-all hover:shadow-sm"
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Class */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
              <CardHeader className="border-b border-orange-200 dark:border-orange-700">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
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
                    onClick={() => {
                      setSelectedClass(null);
                      navigate('/request-absence', { replace: true });
                    }}
                  >
                    Change Class
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reason Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gray-50 dark:bg-[#44475a] border-b border-gray-200 dark:border-[#6272a4]">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Reason for Absence
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Select the primary reason for your absence</p>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gray-50 dark:bg-[#44475a] border-b border-gray-200 dark:border-[#6272a4]">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  Detailed Description
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Provide a clear explanation of your circumstances</p>
              </CardHeader>
              <CardContent>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please explain why you will not be able to attend this class..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gray-50 dark:bg-[#44475a] border-b border-gray-200 dark:border-[#6272a4]">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                    <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Supporting Documents
                  <span className="text-sm font-normal text-gray-500 dark:text-[#6272a4]">(Optional)</span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Upload medical certificates, official letters, or other relevant documents</p>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesChange={(files) => setFormData({ ...formData, documents: files })}
                  maxFiles={3}
                  maxSize={5}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="bg-gray-50 dark:bg-[#44475a] rounded-xl p-6 border border-gray-200 dark:border-[#6272a4]">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-2">Ready to Submit?</h3>
                <p className="text-sm text-gray-600 dark:text-[#6272a4]">Please review your information before submitting your absence request</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg"
                  size="lg"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Submitting Request...' : 'Submit Absence Request'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/justifications')}
                  disabled={isSubmitting}
                  size="lg"
                  className="sm:w-auto w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};