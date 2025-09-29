import React from 'react';
import { X, Building2, Mail, Phone, Calendar, Users, Award, BookOpen, MapPin } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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

interface ViewDepartmentDetailsModalProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewDepartmentDetailsModal: React.FC<ViewDepartmentDetailsModalProps> = ({ department, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'Engineering':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
      case 'Science':
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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Department Details</h2>
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
              <Building2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2]">{department.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">{department.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{department.code}</Badge>
                <Badge className={getStatusColor(department.status)}>{department.status}</Badge>
                <Badge className={getTypeColor(department.type)}>{department.type}</Badge>
              </div>
            </div>
          </div>

          {/* Department Head & Contact */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Department Head & Contact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Department Head</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.head}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                  <span className="text-gray-600 dark:text-[#6272a4]">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                  <span className="text-gray-600 dark:text-[#6272a4]">Phone:</span>
                  <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                  <span className="text-gray-600 dark:text-[#6272a4]">Location:</span>
                  <span className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.building}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Statistics */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Department Statistics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                    {department.faculty}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Faculty Members</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    {department.students}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Students Enrolled</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-[#44475a] rounded-lg">
                  <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                    {department.programs}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Academic Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Information */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Department Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Established</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.established}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Department Type</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Building Location</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.building}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4]">Current Status</p>
                  <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{department.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-4 pt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                About Department
              </h4>
              <p className="text-sm text-gray-600 dark:text-[#6272a4]">{department.description}</p>
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