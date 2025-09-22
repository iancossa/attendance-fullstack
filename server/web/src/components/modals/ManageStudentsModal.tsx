import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Users, Search, UserPlus, UserMinus, X } from 'lucide-react';
import { MOCK_STUDENTS } from '../../data/mockStudents';

interface Class {
  id: number;
  name: string;
  code: string;
  students: number;
  enrolled: number;
}

interface ManageStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
}

export const ManageStudentsModal: React.FC<ManageStudentsModalProps> = ({ isOpen, onClose, classData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState<string[]>([]);

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.studentId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (studentId: string) => {
    setEnrolledStudents(prev => [...prev, studentId]);
  };

  const handleUnenroll = (studentId: string) => {
    setEnrolledStudents(prev => prev.filter(id => id !== studentId));
  };

  const isEnrolled = (studentId: string) => enrolledStudents.includes(studentId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto modal-scrollbar">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Manage Students - {classData?.name}</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Class: {classData?.code}</span>
          </div>
          <Badge variant="outline">
            {enrolledStudents.length}/{classData?.enrolled} enrolled
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{student.name}</div>
                <div className="text-sm text-gray-600">{student.email}</div>
                <div className="text-xs text-gray-500">{student.studentId} • {student.department}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                  {student.status}
                </Badge>
                {isEnrolled(student.id) ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnenroll(student.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <UserMinus className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleEnroll(student.id)}
                    disabled={enrolledStudents.length >= (classData?.enrolled || 0)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Enroll
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onClose}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};