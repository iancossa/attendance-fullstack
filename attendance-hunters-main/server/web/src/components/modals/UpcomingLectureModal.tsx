import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { JustificationModal } from '../justification/JustificationModal';
import { Clock, MapPin, User, Calendar, X, Bell, FileText } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { useJustifications } from '../../hooks/useJustifications';
import { useAppStore } from '../../store';
import type { JustificationFormData } from '../../types';

interface LectureInfo {
  code: string;
  name: string;
  instructor: string;
  room: string;
  type: string;
  time: string;
  date: string;
  duration: string;
}

interface UpcomingLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecture: LectureInfo | null;
}

export const UpcomingLectureModal: React.FC<UpcomingLectureModalProps> = ({
  isOpen,
  onClose,
  lecture
}) => {
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const { submitJustification, submitting } = useJustifications();
  const { addNotification } = useAppStore();

  if (!isOpen || !lecture) return null;

  const handleJustificationSubmit = async (data: JustificationFormData) => {
    try {
      await submitJustification(`lecture_${lecture.code}_${Date.now()}`, data);
      setShowJustificationModal(false);
      onClose();
      addNotification({
        message: 'Absence request submitted successfully',
        type: 'success'
      });
    } catch (error) {
      console.error('Failed to submit justification:', error);
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
      <div className="fixed inset-0 style={{ zIndex: 9999 }} flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Bell className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                Upcoming Lecture
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {lecture.code}
                </span>
                <Badge className={getTypeColor(lecture.type)}>
                  {lecture.type}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-4">
                {lecture.name}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <Clock className="h-5 w-5 text-gray-500 dark:text-[#6272a4]" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                    {lecture.time}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-[#6272a4]">
                    Duration: {lecture.duration}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-[#6272a4]" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                    {lecture.date}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-[#6272a4]">
                    Today's Schedule
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <User className="h-5 w-5 text-gray-500 dark:text-[#6272a4]" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                    {lecture.instructor}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-[#6272a4]">
                    Instructor
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-[#6272a4]" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                    {lecture.room}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-[#6272a4]">
                    Classroom
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <div className="flex gap-2">
                <Button 
                  onClick={onClose}
                  className="flex-1"
                >
                  Got it
                </Button>
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Set Reminder
                </Button>
              </div>
              <Button 
                variant="outline"
                onClick={() => setShowJustificationModal(true)}
                className="w-full flex items-center gap-2 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10"
              >
                <FileText className="h-4 w-4" />
                Request Absence Approval
              </Button>
            </div>
            
            <JustificationModal
              isOpen={showJustificationModal}
              attendanceId={`lecture_${lecture.code}_${Date.now()}`}
              onClose={() => setShowJustificationModal(false)}
              onSubmit={handleJustificationSubmit}
              isSubmitting={submitting}
            />
          </CardContent>
        </Card>
      </div>
      </div>
    </ModalPortal>
  );
};