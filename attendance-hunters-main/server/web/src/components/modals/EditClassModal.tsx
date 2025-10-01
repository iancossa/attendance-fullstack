import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Edit, X } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';

interface Class {
  id: number;
  name: string;
  code: string;
  faculty: string;
  room: string;
  schedule: string;
  enrolled: number;
  students: number;
  status: string;
}

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classData: Class) => void;
  classData: Class | null;
}

export const EditClassModal: React.FC<EditClassModalProps> = ({ isOpen, onClose, onSave, classData }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    faculty: '',
    room: '',
    schedule: '',
    enrolled: '',
    status: 'Active'
  });

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name,
        code: classData.code,
        faculty: classData.faculty || '',
        room: classData.room || '',
        schedule: classData.schedule || '',
        enrolled: classData.enrolled.toString(),
        status: classData.status
      });
    }
  }, [classData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (classData) {
      onSave({
        ...classData,
        ...formData,
        enrolled: parseInt(formData.enrolled) || 0
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center style={{ zIndex: 9999 }} p-4">
      <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Edit Class</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Class Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Class Code</label>
            <Input
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Faculty</label>
            <Input
              value={formData.faculty}
              onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Room</label>
            <Input
              value={formData.room}
              onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Schedule</label>
            <Input
              value={formData.schedule}
              onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Max Enrollment</label>
            <Input
              type="number"
              value={formData.enrolled}
              onChange={(e) => setFormData(prev => ({ ...prev, enrolled: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 border border-gray-200 dark:border-[#6272a4] rounded-md bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Edit className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </ModalPortal>
  );
};