import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { X, Mail, Phone, Bell, Eye, Send, AlertTriangle } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  student: {
    id: string;
    name: string;
    email: string;
    studentId: string;
    department: string;
    attendanceRate: number;
    consecutiveAbsences: number;
    riskLevel: string;
    parentEmail?: string;
    parentPhone?: string;
  };
  alertType: 'notification' | 'email' | 'parent-email' | 'parent-sms';
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onSend,
  student,
  alertType
}) => {
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const getAlertConfig = () => {
    switch (alertType) {
      case 'notification':
        return {
          title: 'Send Student Notification',
          icon: <Bell className="h-5 w-5 text-blue-600" />,
          recipient: student.name,
          recipientInfo: student.email,
          defaultMessage: `Dear ${student.name},\n\nWe've noticed your attendance has dropped to ${student.attendanceRate}%. Please ensure you attend your upcoming classes to maintain good academic standing.\n\nBest regards,\nAcademic Office`
        };
      case 'email':
        return {
          title: 'Send Student Email',
          icon: <Mail className="h-5 w-5 text-orange-600" />,
          recipient: student.name,
          recipientInfo: student.email,
          defaultMessage: `Subject: Attendance Concern - Action Required\n\nDear ${student.name},\n\nThis is to inform you that your current attendance rate is ${student.attendanceRate}%, which is below the required minimum.\n\nYou have ${student.consecutiveAbsences} consecutive absences. Please contact your academic advisor immediately.\n\nBest regards,\nAcademic Office`
        };
      case 'parent-email':
        return {
          title: 'Send Parent Email',
          icon: <Mail className="h-5 w-5 text-blue-600" />,
          recipient: `${student.name}'s Parent`,
          recipientInfo: student.parentEmail || 'parent@email.com',
          defaultMessage: `Subject: Student Attendance Alert - ${student.name}\n\nDear Parent/Guardian,\n\nWe are writing to inform you about your child ${student.name}'s attendance concerns.\n\nCurrent Status:\n- Attendance Rate: ${student.attendanceRate}%\n- Consecutive Absences: ${student.consecutiveAbsences}\n- Student ID: ${student.studentId}\n\nPlease contact us if you have any questions.\n\nBest regards,\nAcademic Office`
        };
      case 'parent-sms':
        return {
          title: 'Send Parent SMS',
          icon: <Phone className="h-5 w-5 text-green-600" />,
          recipient: `${student.name}'s Parent`,
          recipientInfo: student.parentPhone || '+1234567890',
          defaultMessage: `ATTENDANCE ALERT: Your child ${student.name} (ID: ${student.studentId}) has ${student.attendanceRate}% attendance with ${student.consecutiveAbsences} consecutive absences. Please contact the academic office. - University`
        };
      default:
        return {
          title: 'Send Alert',
          icon: <Bell className="h-5 w-5" />,
          recipient: student.name,
          recipientInfo: student.email,
          defaultMessage: ''
        };
    }
  };

  const config = getAlertConfig();

  useEffect(() => {
    if (isOpen && !message) {
      setMessage(config.defaultMessage);
    }
  }, [isOpen, config.defaultMessage, message]);

  if (!isOpen) return null;

  const handleSend = () => {
    onSend(message);
    onClose();
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 style={{ zIndex: 9999 }}">
      <div className="bg-white dark:bg-[#282a36] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <div className="flex items-center gap-3">
            {config.icon}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2]">{config.title}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <Card className="border-orange-200 dark:border-orange-400">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-[#f8f8f2]">
                <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{student.name}</span>
                    <Badge className={getRiskColor(student.riskLevel)}>
                      {student.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-[#6272a4] space-y-1">
                    <p>Student ID: {student.studentId}</p>
                    <p>Department: {student.department}</p>
                    <p>Attendance Rate: <span className="font-medium">{student.attendanceRate}%</span></p>
                    <p>Consecutive Absences: <span className="font-medium">{student.consecutiveAbsences}</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 dark:bg-[#44475a] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Sending to:</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-[#6272a4]">
              <p className="font-medium">{config.recipient}</p>
              <p>{config.recipientInfo}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={alertType === 'parent-sms' ? 4 : 8}
              className="w-full p-3 border border-gray-300 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Enter your message..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 dark:text-[#6272a4]">
                {message.length} characters
                {alertType === 'parent-sms' && message.length > 160 && (
                  <span className="text-orange-600 ml-2">
                    (SMS may be split into multiple messages)
                  </span>
                )}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {showPreview ? 'Hide' : 'Preview'}
              </Button>
            </div>
          </div>

          {showPreview && (
            <Card className="border-blue-200 dark:border-blue-400">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-blue-700 dark:text-blue-400">Message Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-[#f8f8f2] whitespace-pre-wrap">
                    {message || 'No message content'}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              Send {alertType === 'parent-sms' ? 'SMS' : alertType.includes('email') ? 'Email' : 'Notification'}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      </div>
    </ModalPortal>
  );
};