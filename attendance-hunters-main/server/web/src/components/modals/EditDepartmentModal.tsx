import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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

interface EditDepartmentModalProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDepartment: Department) => void;
}

export const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({ department, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: department.name,
    code: department.code,
    head: department.head,
    email: department.email,
    phone: department.phone,
    type: department.type,
    status: department.status,
    building: department.building,
    description: department.description
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDepartment: Department = {
      ...department,
      ...formData
    };
    onSave(updatedDepartment);
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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Edit Department</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Department Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Department Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Department Head</label>
                <Input
                  value={formData.head}
                  onChange={(e) => handleChange('head', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Building Location</label>
                <Input
                  value={formData.building}
                  onChange={(e) => handleChange('building', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Department Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Department Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Department Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="h-9 w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                >
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Science">Science</option>
                </select>
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
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4] resize-none"
              placeholder="Department description..."
            />
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