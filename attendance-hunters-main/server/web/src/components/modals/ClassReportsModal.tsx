import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BarChart3, Download, Calendar, TrendingUp, X } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';

interface Class {
  id: number;
  name: string;
  code: string;
  faculty: string;
  students: number;
  enrolled: number;
}

interface ClassReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
}

export const ClassReportsModal: React.FC<ClassReportsModalProps> = ({ isOpen, onClose, classData }) => {
  const mockData = {
    averageAttendance: 87,
    totalSessions: 24,
    attendedSessions: 21,
    absentSessions: 3,
    weeklyTrend: [
      { week: 'Week 1', attendance: 92 },
      { week: 'Week 2', attendance: 88 },
      { week: 'Week 3', attendance: 85 },
      { week: 'Week 4', attendance: 90 }
    ]
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center style={{ zIndex: 9999 }} p-4">
      <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Class Reports - {classData?.name}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Class: {classData?.code}</span>
          </div>
          <Badge variant="outline">
            {classData?.students}/{classData?.enrolled} students
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Average Attendance</p>
                <div className="text-2xl font-semibold text-green-900 mt-1">{mockData.averageAttendance}%</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Sessions</p>
                <div className="text-2xl font-semibold text-blue-900 mt-1">{mockData.totalSessions}</div>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Attendance Breakdown */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">Attendance Breakdown</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <span className="text-sm font-medium text-green-800">Sessions Attended</span>
              <Badge className="bg-green-100 text-green-700">{mockData.attendedSessions}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-500/10 rounded-lg">
              <span className="text-sm font-medium text-red-800">Sessions Missed</span>
              <Badge className="bg-red-100 text-red-700">{mockData.absentSessions}</Badge>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">Weekly Attendance Trend</h3>
          <div className="space-y-2">
            {mockData.weeklyTrend.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">{week.week}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">{week.attendance}%</span>
                  <div className="w-20 bg-gray-200 dark:bg-[#6272a4] rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${week.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-[#6272a4]">
            <Button variant="outline" onClick={onClose}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
      </div>
    </ModalPortal>
  );
};