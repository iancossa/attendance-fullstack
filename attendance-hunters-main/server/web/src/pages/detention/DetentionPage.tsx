import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AlertTriangle, Users, Bell, Calendar, TrendingDown, Mail, Phone } from 'lucide-react';
import { useAppStore } from '../../store';
import { AlertModal } from '../../components/modals/AlertModal';

interface AtRiskStudent {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  parentEmail?: string;
  parentPhone?: string;
  attendanceRate: number;
  consecutiveAbsences: number;
  totalAbsences: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAttendance: string;
  classes: string[];
}

export const DetentionPage: React.FC = () => {
  useDocumentTitle('Detention & At-Risk Students');
  const [atRiskStudents, setAtRiskStudents] = useState<AtRiskStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<AtRiskStudent | null>(null);
  const [alertType, setAlertType] = useState<'notification' | 'email' | 'parent-email' | 'parent-sms'>('notification');
  const { addNotification } = useAppStore();

  useEffect(() => {
    fetchAtRiskStudents();
  }, []);

  const fetchAtRiskStudents = async () => {
    const mockData: AtRiskStudent[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@university.edu',
        studentId: 'STU001',
        department: 'Computer Science',
        parentEmail: 'parent.smith@email.com',
        parentPhone: '+1234567890',
        attendanceRate: 45,
        consecutiveAbsences: 8,
        totalAbsences: 22,
        riskLevel: 'critical',
        lastAttendance: '2024-01-10',
        classes: ['CS301', 'CS302', 'CS303']
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        studentId: 'STU002',
        department: 'Computer Science',
        parentEmail: 'parent.johnson@email.com',
        parentPhone: '+1234567891',
        attendanceRate: 62,
        consecutiveAbsences: 5,
        totalAbsences: 15,
        riskLevel: 'high',
        lastAttendance: '2024-01-12',
        classes: ['CS301', 'CS304']
      },
      {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@university.edu',
        studentId: 'STU003',
        department: 'Electronics',
        parentEmail: 'parent.davis@email.com',
        parentPhone: '+1234567892',
        attendanceRate: 71,
        consecutiveAbsences: 3,
        totalAbsences: 12,
        riskLevel: 'medium',
        lastAttendance: '2024-01-14',
        classes: ['EE201', 'EE202']
      }
    ];
    
    setAtRiskStudents(mockData);
    setLoading(false);
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

  const openAlertModal = (studentId: string, type: 'email' | 'notification' | 'parent-email' | 'parent-sms') => {
    const student = atRiskStudents.find(s => s.id === studentId);
    if (!student) return;
    
    setSelectedStudent(student);
    setAlertType(type);
    setShowAlertModal(true);
  };

  const sendAlert = async (message: string) => {
    if (!selectedStudent) return;

    const messages = {
      'email': `Alert email sent to ${selectedStudent.name}`,
      'notification': `Notification sent to ${selectedStudent.name}`,
      'parent-email': `Alert email sent to ${selectedStudent.name}'s parent`,
      'parent-sms': `SMS alert sent to ${selectedStudent.name}'s parent`
    };

    addNotification({
      message: messages[alertType],
      type: 'success'
    });
  };

  const filteredStudents = selectedRiskLevel === 'all' 
    ? atRiskStudents 
    : atRiskStudents.filter(s => s.riskLevel === selectedRiskLevel);

  const riskCounts = {
    critical: atRiskStudents.filter(s => s.riskLevel === 'critical').length,
    high: atRiskStudents.filter(s => s.riskLevel === 'high').length,
    medium: atRiskStudents.filter(s => s.riskLevel === 'medium').length,
    low: atRiskStudents.filter(s => s.riskLevel === 'low').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Detention & At-Risk Students</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Monitor and manage students with poor attendance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Critical Risk</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{riskCounts.critical}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">&lt;50% attendance</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">High Risk</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{riskCounts.high}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">50-65% attendance</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Medium Risk</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{riskCounts.medium}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">65-75% attendance</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Low Risk</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{riskCounts.low}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">75-80% attendance</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRiskLevel === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRiskLevel('all')}
          >
            All ({atRiskStudents.length})
          </Button>
          <Button
            variant={selectedRiskLevel === 'critical' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRiskLevel('critical')}
          >
            Critical ({riskCounts.critical})
          </Button>
          <Button
            variant={selectedRiskLevel === 'high' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRiskLevel('high')}
          >
            High ({riskCounts.high})
          </Button>
          <Button
            variant={selectedRiskLevel === 'medium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRiskLevel('medium')}
          >
            Medium ({riskCounts.medium})
          </Button>
        </div>

        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              At-Risk Students ({filteredStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 dark:bg-[#44475a] rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-[#6272a4]">No at-risk students found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 dark:border-[#6272a4] rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{student.name}</h3>
                          <Badge className={getRiskColor(student.riskLevel)}>
                            {student.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-[#6272a4]">Student ID: {student.studentId}</p>
                            <p className="text-gray-600 dark:text-[#6272a4]">Department: {student.department}</p>
                            <p className="text-gray-600 dark:text-[#6272a4]">Email: {student.email}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-[#6272a4]">Attendance Rate: <span className="font-medium">{student.attendanceRate}%</span></p>
                            <p className="text-gray-600 dark:text-[#6272a4]">Total Absences: <span className="font-medium">{student.totalAbsences}</span></p>
                            <p className="text-gray-600 dark:text-[#6272a4]">Consecutive Absences: <span className="font-medium">{student.consecutiveAbsences}</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-[#6272a4]">Last Attendance: {student.lastAttendance}</p>
                            <p className="text-gray-600 dark:text-[#6272a4]">Classes: {student.classes.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAlertModal(student.id, 'notification')}
                        >
                          <Bell className="h-4 w-4 mr-1" />
                          Alert
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAlertModal(student.id, 'email')}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAlertModal(student.id, 'parent-email')}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Parent Email
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAlertModal(student.id, 'parent-sms')}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Parent SMS
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {selectedStudent && (
        <AlertModal
          isOpen={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          onSend={sendAlert}
          student={selectedStudent}
          alertType={alertType}
        />
      )}
    </Layout>
  );
};