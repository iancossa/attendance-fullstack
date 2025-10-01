import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Loading } from '../../components/ui/loading';
import { ArrowLeft, Users, CheckCircle, QrCode, Zap, X } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../hooks/useAuth';

interface Class {
  id: string;
  name: string;
  code: string;
  department: string;
  studentCount: number;
  schedule?: string;
}

interface AttendanceData {
  classId: string;
  location: string;
  notes: string;
  sessionType: 'lecture' | 'lab' | 'tutorial' | 'exam';
  conductedBy: string;
  plannedTopic: string;
  planningStatus: 'planned' | 'in_progress' | 'completed';
  targetLearning: string;
  tgLevel: string;
}

const TakeAttendancePage: React.FC = () => {
  useDocumentTitle('Take Attendance');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({
    classId: '',
    location: '',
    notes: '',
    sessionType: 'lecture',
    conductedBy: user?.name || 'Admin User',
    plannedTopic: '',
    planningStatus: 'planned',
    targetLearning: '',
    tgLevel: ''
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    // Mock data for now
    setTimeout(() => {
      setClasses([
        {
          id: '1',
          name: 'Data Structures & Algorithms',
          code: 'CS301',
          department: 'Computer Science',
          studentCount: 45
        },
        {
          id: '2',
          name: 'Digital Electronics',
          code: 'ECE201',
          department: 'Electronics',
          studentCount: 38
        },
        {
          id: '3',
          name: 'Database Management',
          code: 'CS401',
          department: 'Computer Science',
          studentCount: 42
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
    setAttendanceData(prev => ({ ...prev, classId: classItem.id }));
    setStep(2);
  };

  const handleCreateSession = async () => {
    setLoading(true);
    // Store session data for attendance modes
    const sessionData = {
      classId: selectedClass?.id,
      className: selectedClass?.name,
      classCode: selectedClass?.code,
      department: selectedClass?.department,
      studentCount: selectedClass?.studentCount,
      sessionType: attendanceData.sessionType,
      location: attendanceData.location,
      conductedBy: attendanceData.conductedBy,
      plannedTopic: attendanceData.plannedTopic,
      planningStatus: attendanceData.planningStatus,
      targetLearning: attendanceData.targetLearning,
      tgLevel: attendanceData.tgLevel,
      notes: attendanceData.notes,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('attendanceSession', JSON.stringify(sessionData));
    
    // Mock session creation delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((stepNum) => (
        <React.Fragment key={stepNum}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            step >= stepNum ? 'bg-orange-500 dark:bg-orange-400 text-white dark:text-[#282a36]' : 'bg-gray-200 dark:bg-[#44475a] text-gray-600 dark:text-[#6272a4]'
          }`}>
            {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-12 h-0.5 transition-colors ${step > stepNum ? 'bg-orange-500 dark:bg-orange-400' : 'bg-gray-200 dark:bg-[#44475a]'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderClassSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Select Class</h2>
        <p className="text-sm text-gray-600 dark:text-[#6272a4]">Choose the class for attendance session</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <div className="grid gap-3">
          {classes.map((classItem) => (
            <Card
              key={classItem.id}
              className="cursor-pointer hover:shadow-sm transition-all duration-200 border-2 border-gray-200 dark:border-[#6272a4] hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 bg-white dark:bg-[#282a36]"
              onClick={() => handleClassSelect(classItem)}
            >
              <CardContent className="p-6 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{classItem.name}</h3>
                      <Badge variant="outline" className="text-xs">{classItem.code}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-1">{classItem.department}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {classItem.studentCount} students
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderSessionDetails = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Session Details</h2>
        <p className="text-sm text-gray-600 dark:text-[#6272a4]">Configure your attendance session</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">Selected Class</h3>
        <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/20">
          <div>
            <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">{selectedClass?.name}</p>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">{selectedClass?.code} • {selectedClass?.department}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Two column grid for most fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Session Type
            </label>
            <select
              value={attendanceData.sessionType}
              onChange={(e) => setAttendanceData(prev => ({ 
                ...prev, 
                sessionType: e.target.value as AttendanceData['sessionType']
              }))}
              className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]"
            >
              <option value="lecture">Lecture</option>
              <option value="lab">Lab</option>
              <option value="tutorial">Tutorial</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Location
            </label>
            <Input
              value={attendanceData.location}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter session location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Planned Topic
            </label>
            <select
              value={attendanceData.plannedTopic}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, plannedTopic: e.target.value }))}
              className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]"
            >
              <option value="">Select Topic</option>
              <option value="Boolean Algebra">Boolean Algebra</option>
              <option value="Sorting Algorithms">Sorting Algorithms</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Digital Logic Gates">Digital Logic Gates</option>
              <option value="Database Normalization">Database Normalization</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Conducted By
            </label>
            <Input
              value={attendanceData.conductedBy}
              readOnly
              className="bg-gray-50 dark:bg-[#44475a] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Planning Status
            </label>
            <select
              value={attendanceData.planningStatus}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, planningStatus: e.target.value as AttendanceData['planningStatus'] }))}
              className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]"
            >
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
              Target Level
            </label>
            <select
              value={attendanceData.tgLevel}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, tgLevel: e.target.value }))}
              className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2]"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="Final Year">Final Year</option>
            </select>
          </div>
        </div>

        {/* Full width fields */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
            Target Learning
          </label>
          <textarea
            value={attendanceData.targetLearning}
            onChange={(e) => setAttendanceData(prev => ({ ...prev, targetLearning: e.target.value }))}
            placeholder="Expected learning outcome of this session..."
            className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">
            Notes
          </label>
          <textarea
            value={attendanceData.notes}
            onChange={(e) => setAttendanceData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Optional session notes..."
            className="w-full p-3 border border-gray-200 dark:border-[#6272a4] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          size="sm"
          onClick={() => setStep(3)}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderModeSelection = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Choose Attendance Mode</h2>
        <p className="text-sm text-gray-600 dark:text-[#6272a4]">Select how you want to take attendance</p>
      </div>

      <div className="grid gap-3">
        <Card 
          className="cursor-pointer hover:shadow-sm transition-all duration-200 border-2 border-gray-200 dark:border-[#6272a4] hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 bg-white dark:bg-[#282a36]"
          onClick={async () => {
            await handleCreateSession();
            navigate('/attendance/qr-mode');
          }}
        >
          <CardContent className="p-6 pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-1">QR Code Mode</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4]">Students scan QR code to mark attendance</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-sm transition-all duration-200 border-2 border-gray-200 dark:border-[#6272a4] hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 bg-white dark:bg-[#282a36]"
          onClick={async () => {
            await handleCreateSession();
            navigate('/attendance/manual-mode');
          }}
        >
          <CardContent className="p-6 pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-1">Manual Mode</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4]">Manually mark attendance for each student</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-sm transition-all duration-200 border-2 border-gray-200 dark:border-[#6272a4] hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 bg-white dark:bg-[#282a36]"
          onClick={async () => {
            await handleCreateSession();
            navigate('/attendance/hybrid-mode');
          }}
        >
          <CardContent className="p-6 pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-1">Hybrid Mode</h3>
              <p className="text-sm text-gray-600 dark:text-[#6272a4]">Combine QR code and manual attendance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(2)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/attendance')}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2] mb-1">Session Created!</h2>
        <p className="text-sm text-gray-600 dark:text-[#6272a4]">Your attendance session has been created successfully</p>
      </div>
      <Button size="sm" onClick={() => navigate('/attendance')} className="w-full">
        Go to Attendance
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Take Attendance</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4]">Create a new attendance session</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/attendance')}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>
        
        {step < 4 && renderStepIndicator()}

        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardContent className="p-6 pt-6">
            {loading && step !== 1 ? (
              <div className="text-center py-8">
                <Loading />
                <p className="text-sm text-gray-600 mt-4">Creating session...</p>
              </div>
            ) : (
              <>
                {step === 1 && renderClassSelection()}
                {step === 2 && renderSessionDetails()}
                {step === 3 && renderModeSelection()}
                {step === 4 && renderSuccess()}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export { TakeAttendancePage };
export default TakeAttendancePage;