import React, { useState } from 'react';
import { X, Save, Settings, Shield, Bell, Users } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  email: string;
  phone: string;
  type: 'Technology' | 'Engineering' | 'Science';
  faculty: number;
  students: number;
  programs: number;
  status: 'Active' | 'Inactive';
  established: string;
  building: string;
  description: string;
}

interface DepartmentSettingsModalProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
}

export const DepartmentSettingsModal: React.FC<DepartmentSettingsModalProps> = ({ department, isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    attendanceThreshold: 75,
    autoNotifications: true,
    facultyPermissions: 'standard',
    studentEnrollment: 'open',
    gradeVisibility: 'faculty',
    reportGeneration: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleChange = (field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center style={{ zIndex: 9999 }} p-2 sm:p-4">
      <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Department Settings</h2>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">{department.name}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Academic Settings */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Academic Settings
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                    Minimum Attendance Threshold (%)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={settings.attendanceThreshold}
                    onChange={(e) => handleChange('attendanceThreshold', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-[#44475a] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                    <span>50%</span>
                    <span className="font-medium">{settings.attendanceThreshold}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                    Student Enrollment
                  </label>
                  <select
                    value={settings.studentEnrollment}
                    onChange={(e) => handleChange('studentEnrollment', e.target.value)}
                    className="w-full h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                  >
                    <option value="open">Open Enrollment</option>
                    <option value="approval">Requires Approval</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Permissions & Access
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                    Faculty Permissions
                  </label>
                  <select
                    value={settings.facultyPermissions}
                    onChange={(e) => handleChange('facultyPermissions', e.target.value)}
                    className="w-full h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                  >
                    <option value="standard">Standard Access</option>
                    <option value="elevated">Elevated Access</option>
                    <option value="admin">Administrative Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                    Grade Visibility
                  </label>
                  <select
                    value={settings.gradeVisibility}
                    onChange={(e) => handleChange('gradeVisibility', e.target.value)}
                    className="w-full h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                  >
                    <option value="faculty">Faculty Only</option>
                    <option value="students">Students & Faculty</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications & Alerts
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Auto Notifications</p>
                    <p className="text-xs text-gray-600 dark:text-[#6272a4]">Send automatic attendance alerts</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('autoNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoNotifications ? 'bg-orange-600' : 'bg-gray-200 dark:bg-[#44475a]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Report Generation</p>
                    <p className="text-xs text-gray-600 dark:text-[#6272a4]">Enable automated report generation</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('reportGeneration')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.reportGeneration ? 'bg-orange-600' : 'bg-gray-200 dark:bg-[#44475a]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.reportGeneration ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-[#6272a4]">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
      </div>
    </ModalPortal>
  );
};