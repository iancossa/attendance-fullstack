import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { Student } from '../../data/mockStudents';

interface EditDetailsModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({ student, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    class: student.class,
    section: student.section,
    year: student.year,
    department: student.department,
    status: student.status,
    gpa: (student.gpa || 0).toString()
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStudent: Student = {
      ...student,
      ...formData,
      gpa: parseFloat(formData.gpa) || 0
    };
    onSave(updatedStudent);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center style={{ zIndex: 9999 }} p-2 sm:p-4">
      <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Edit Student Details</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Class</label>
                <Input
                  value={formData.class}
                  onChange={(e) => handleChange('class', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">GPA</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.gpa}
                  onChange={(e) => handleChange('gpa', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-[#6272a4]">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      </div>
    </ModalPortal>
  );
};