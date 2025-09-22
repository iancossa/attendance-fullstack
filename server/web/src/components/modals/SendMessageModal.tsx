import React, { useState } from 'react';
import { X, Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { Student } from '../../data/mockStudents';

interface SendMessageModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const SendMessageModal: React.FC<SendMessageModalProps> = ({ student, isOpen, onClose }) => {
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    priority: 'Normal',
    sendCopy: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send message functionality
    alert(`Message sent to ${student.name} successfully!`);
    setMessageData({
      subject: '',
      message: '',
      priority: 'Normal',
      sendCopy: false
    });
    onClose();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setMessageData(prev => ({ ...prev, [field]: value }));
  };

  const quickTemplates = [
    {
      title: 'Attendance Reminder',
      subject: 'Attendance Below Required Threshold',
      message: `Dear ${student.name},\n\nWe noticed that your attendance is currently at ${student.attendance}%. As per university policy, students must maintain at least 75% attendance.\n\nPlease ensure regular attendance to avoid any academic complications.\n\nBest regards,\nAcademic Office`
    },
    {
      title: 'Performance Appreciation',
      subject: 'Excellent Academic Performance',
      message: `Dear ${student.name},\n\nCongratulations on your excellent academic performance and consistent attendance of ${student.attendance}%.\n\nKeep up the great work!\n\nBest regards,\nAcademic Office`
    },
    {
      title: 'Meeting Request',
      subject: 'Request for Academic Meeting',
      message: `Dear ${student.name},\n\nWe would like to schedule a meeting to discuss your academic progress.\n\nPlease contact the academic office to arrange a suitable time.\n\nBest regards,\nAcademic Office`
    }
  ];

  const handleUseTemplate = (template: typeof quickTemplates[0]) => {
    setMessageData(prev => ({
      ...prev,
      subject: template.subject,
      message: template.message
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Send Message</h2>
            <p className="text-sm text-gray-600">To: {student.name} ({student.email})</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Quick Templates */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleUseTemplate(template)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{template.title}</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">{template.subject}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Message Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={messageData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="sendCopy"
                  checked={messageData.sendCopy}
                  onChange={(e) => handleChange('sendCopy', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="sendCopy" className="text-sm text-gray-700">
                  Send copy to my email
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input
                value={messageData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Enter message subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={messageData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Type your message here..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  {messageData.message.length} characters
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email notification
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    In-app message
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};