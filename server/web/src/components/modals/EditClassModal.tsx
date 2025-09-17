import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Edit, X } from 'lucide-react';

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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Class</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Code</label>
            <Input
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
            <Input
              value={formData.faculty}
              onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
            <Input
              value={formData.room}
              onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
            <Input
              value={formData.schedule}
              onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Enrollment</label>
            <Input
              type="number"
              value={formData.enrolled}
              onChange={(e) => setFormData(prev => ({ ...prev, enrolled: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full p-2 border border-gray-200 rounded-md"
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
  );
};