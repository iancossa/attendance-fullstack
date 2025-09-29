import React from 'react';
import { X, Mail, Phone, Calendar, GraduationCap, User, TrendingUp, Clock, Award, BookOpen } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  classes: number;
  students: number;
  experience: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  phone: string;
  joinDate: string;
}

interface ViewFacultyProfileModalProps {
  faculty: Faculty;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewFacultyProfileModal: React.FC<ViewFacultyProfileModalProps> = ({ faculty, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Professor':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
      case 'Associate Professor':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'Assistant Professor':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center style={{ zIndex: 9999 }} p-2 sm:p-4">
      <div className="bg-white dark:bg-[#282a36] rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Faculty Profile</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-[#44475a] flex items-center justify-center"
          >
            <X className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2]">{faculty.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">{faculty.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{faculty.employeeId}</Badge>
                <Badge className={getStatusColor(faculty.status)}>{faculty.status}</Badge>
                <Badge className={getPositionColor(faculty.position)}>{faculty.position}</Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                  <span className="text-gray-600 dark:text-[#6272a4]">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                  <span className="text-gray-600 dark:text-[#6272a4]">Phone:</span>
                  <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Academic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Department</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Position</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Experience</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{faculty.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Join Date</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{new Date(faculty.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Load */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Teaching Load
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                    {faculty.classes}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Classes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    {faculty.students}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Students</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                    {faculty.status === 'Active' ? 'Active' : 'Inactive'}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Employment Details
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#6272a4]">
                <Clock className="h-4 w-4" />
                <span>Joined: {new Date(faculty.joinDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-[#6272a4]">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      </div>
    </ModalPortal>
  );
};