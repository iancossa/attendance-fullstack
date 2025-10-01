import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';

interface DayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  dayData: {
    conducted: number;
    present: number;
    absent: number;
    subjects: Array<{
      code: string;
      name: string;
      time: string;
      status: 'present' | 'absent';
    }>;
  };
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({ isOpen, onClose, date, dayData }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 style={{ zIndex: 9999 }}" onClick={onClose} />
      <div className="fixed inset-0 style={{ zIndex: 9999 }} flex items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-md mx-2 sm:mx-0 bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4] max-h-[90vh] overflow-y-auto modal-scrollbar">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">
              <Calendar className="h-5 w-5" />
              {date}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">{dayData.conducted}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Conducted</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">{dayData.present}</div>
                <div className="text-xs text-green-600 dark:text-green-400">Present</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400">{dayData.absent}</div>
                <div className="text-xs text-red-600 dark:text-red-400">Absent</div>
              </div>
            </div>

            {/* Subject Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-[#f8f8f2]">Subject Details</h4>
              {dayData.subjects.map((subject, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg gap-2 sm:gap-0">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{subject.code}</div>
                    <div className="text-xs text-gray-600 dark:text-[#6272a4]">{subject.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                      <Clock className="h-3 w-3" />
                      {subject.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {subject.status === 'present' ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 gap-1 text-xs">
                        <CheckCircle className="h-3 w-3" />
                        Present
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 gap-1 text-xs">
                        <XCircle className="h-3 w-3" />
                        Absent
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};