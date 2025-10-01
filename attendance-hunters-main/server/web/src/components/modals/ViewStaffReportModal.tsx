import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { X, FileText, Calendar, Users, TrendingUp, Download, BarChart3 } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';

interface StaffReportData {
  id: string;
  type: string;
  class: string;
  period: string;
  attendance: number;
  students: number;
  generated: string;
  status: 'Generated' | 'Processing' | 'Failed';
}

interface ViewStaffReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: StaffReportData | null;
  onDownloadPDF: () => void;
  onExportData: () => void;
}

export const ViewStaffReportModal: React.FC<ViewStaffReportModalProps> = ({
  isOpen,
  onClose,
  report,
  onDownloadPDF,
  onExportData
}) => {
  if (!isOpen || !report) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Processing':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 dark:text-green-400';
    if (attendance >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 style={{ zIndex: 9999 }}" onClick={onClose} />
      <div className="fixed inset-0 style={{ zIndex: 9999 }} flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4] modal-scrollbar max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">
                  {report.type}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-[#6272a4]">Report ID: {report.id}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6 pt-0 space-y-6">
            {/* Status and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Generated Date</label>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-[#6272a4]">
                    <Calendar className="h-4 w-4" />
                    {report.generated}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Period</label>
                  <p className="mt-1 text-sm text-gray-600 dark:text-[#6272a4]">{report.period}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Total Students</label>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-[#6272a4]">
                    <Users className="h-4 w-4" />
                    {report.students} students
                  </div>
                </div>
              </div>
            </div>

            {/* Class Information */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Class</label>
              <div className="mt-2 p-3 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{report.class}</p>
              </div>
            </div>

            {/* Attendance Overview */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-3 block">Attendance Overview</label>
              <div className="p-4 bg-gradient-to-r from-orange-50 dark:from-orange-950/30 to-transparent rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">Class Attendance Rate</span>
                  </div>
                  <span className={`text-2xl font-bold ${getAttendanceColor(report.attendance)}`}>
                    {report.attendance}%
                  </span>
                </div>
                <Progress value={report.attendance} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-[#6272a4] mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-3 block">Class Statistics</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {Math.round(report.students * (report.attendance / 100))}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-[#6272a4]">Avg Present</div>
                </div>
                
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {report.students - Math.round(report.students * (report.attendance / 100))}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-[#6272a4]">Avg Absent</div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {report.students}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-[#6272a4]">Enrolled</div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
                  <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    {report.attendance >= 90 ? 'Excellent' : report.attendance >= 75 ? 'Good' : 'Needs Attention'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-[#6272a4]">Performance</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#6272a4]">
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={onDownloadPDF}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={onExportData}
              >
                <BarChart3 className="h-4 w-4" />
                Export Data
              </Button>
              <Button 
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};