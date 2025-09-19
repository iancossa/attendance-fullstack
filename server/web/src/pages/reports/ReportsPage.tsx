import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { FileText, Download, TrendingUp, Users, AlertTriangle, Calendar, Search, BarChart3, MoreVertical, X, Plus } from 'lucide-react';
import { AttendanceChart, ClassPerformanceChart } from '../../components/charts';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { COURSES, MOCK_STUDENTS } from '../../data/mockStudents';

interface ReportData {
  id: string;
  type: string;
  class: string;
  period: string;
  attendance: number;
  students: number;
  generated: string;
  status: 'Generated' | 'Processing' | 'Failed';
}

const mockReports: ReportData[] = [
  {
    id: '1',
    type: 'Weekly Report',
    class: '303105221 - Digital Electronics Laboratory',
    period: 'Jan 8-14, 2024',
    attendance: 84.2,
    students: 16,
    generated: '2024-01-15',
    status: 'Generated'
  },
  {
    id: '2',
    type: 'Monthly Report',
    class: '303191202 - Discrete Mathematics',
    period: 'December 2023',
    attendance: 87.8,
    students: 12,
    generated: '2024-01-01',
    status: 'Generated'
  },
  {
    id: '3',
    type: 'Semester Report',
    class: '303201301 - Data Structures and Algorithms',
    period: 'Fall 2023',
    attendance: 89.5,
    students: 8,
    generated: '2024-01-10',
    status: 'Processing'
  },
  {
    id: '4',
    type: 'Weekly Report',
    class: '303105222 - Microprocessor Systems',
    period: 'Jan 1-7, 2024',
    attendance: 86.3,
    students: 6,
    generated: '2024-01-08',
    status: 'Generated'
  },
  {
    id: '5',
    type: 'Monthly Report',
    class: '303191203 - Linear Algebra',
    period: 'December 2023',
    attendance: 91.0,
    students: 4,
    generated: '2024-01-05',
    status: 'Generated'
  },
  {
    id: '6',
    type: 'Weekly Report',
    class: '303201302 - Database Management Systems',
    period: 'Jan 8-14, 2024',
    attendance: 85.7,
    students: 4,
    generated: '2024-01-15',
    status: 'Generated'
  },
  {
    id: '7',
    type: 'Semester Report',
    class: '303105223 - Communication Systems',
    period: 'Fall 2023',
    attendance: 88.5,
    students: 4,
    generated: '2024-01-12',
    status: 'Processing'
  }
];

export const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    type: 'Weekly Report',
    class: '',
    dateFrom: '',
    dateTo: '',
    format: 'PDF'
  });
  const { addNotification } = useAppStore();

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || report.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 dark:text-green-400';
    if (attendance >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAttendanceBg = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Processing':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Failed':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Reports & Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Comprehensive attendance insights and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => setShowGenerateModal(true)}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Generate Report</span>
            </Button>
            <Button 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => {
                exportToExcel(filteredReports, 'reports-data');
                addNotification({ message: 'Reports exported successfully', type: 'success' });
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Search className="h-4 w-4" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search reports by type, class, or period..."
                className="w-full h-9 pl-10 pr-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Weekly Report">Weekly Report</option>
              <option value="Monthly Report">Monthly Report</option>
              <option value="Semester Report">Semester Report</option>
            </select>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">{mockReports.length}</div>
                  <p className="text-xs text-gray-500 mt-1">generated this year</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-green-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">{Math.round(MOCK_STUDENTS.reduce((acc, s) => acc + (s.attendance || 0), 0) / MOCK_STUDENTS.length)}%</div>
                  <p className="text-xs text-gray-500 mt-1">semester average</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-blue-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Performing</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">303191203</div>
                  <p className="text-xs text-gray-500 mt-1">91.0% attendance</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-red-200">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At-Risk Students</p>
                  <div className="text-2xl font-semibold text-gray-900 mt-2">{MOCK_STUDENTS.filter(s => (s.attendance || 0) < 75).length}</div>
                  <p className="text-xs text-gray-500 mt-1">below 75% attendance</p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <FileText className="h-4 w-4" />
                Generated Reports ({filteredReports.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Report Details</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Class & Period</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Attendance Rate</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Students</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Generated</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Status</TableHead>
                    <TableHead className="h-8 px-3 text-xs font-medium text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-3 py-2">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{report.type}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            ID: {report.id}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{report.class}</div>
                          <div className="text-xs text-gray-500">{report.period}</div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getAttendanceColor(report.attendance)}`}>
                            {report.attendance}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAttendanceBg(report.attendance)}`}
                              style={{ width: `${report.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="h-3 w-3 text-gray-400" />
                          {report.students}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {report.generated}
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button 
                            className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === report.id ? null : report.id);
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openDropdown === report.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 top-8 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  View Report
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  Download PDF
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  Export Data
                                </button>
                                <button 
                                  onClick={() => setOpenDropdown(null)} 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-left"
                                >
                                  Share Report
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                  Try adjusting your search criteria or filters to find the reports you're looking for.
                </p>
                <Button className="gap-2" onClick={() => setShowGenerateModal(true)}>
                  <FileText className="h-4 w-4" />
                  Generate New Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <TrendingUp className="h-4 w-4" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={[
                { day: 'Jan', attendance: 87 },
                { day: 'Feb', attendance: 89 },
                { day: 'Mar', attendance: 85 },
                { day: 'Apr', attendance: 91 },
                { day: 'May', attendance: 88 }
              ]} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <BarChart3 className="h-4 w-4" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassPerformanceChart data={[
                { class: 'Electronics', attendance: 84 },
                { class: 'Computer Science', attendance: 88 },
                { class: 'Mathematics', attendance: 91 }
              ]} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <BarChart3 className="h-4 w-4" />
                Class Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">303191203 - Linear Algebra</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">91.0%</span>
                </div>
                <Progress value={91.0} />
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/10 dark:from-primary/20 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">303201301 - Data Structures</span>
                  <span className="text-sm font-semibold text-primary">89.5%</span>
                </div>
                <Progress value={89.5} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/30 to-transparent rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">303105222 - Microprocessor Systems</span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">86.3%</span>
                </div>
                <Progress value={86.3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <AlertTriangle className="h-4 w-4" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">Low Attendance Alert</p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">303105221 needs attention this week</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                  <Users className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-red-800 dark:text-red-300">Critical Alert</p>
                  <p className="text-sm text-red-600 dark:text-red-400">{MOCK_STUDENTS.filter(s => (s.attendance || 0) < 70).length} students missed 30%+ of classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Report Modal */}
        {showGenerateModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowGenerateModal(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Generate Report</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setShowGenerateModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select 
                      className="w-full h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={reportForm.type}
                      onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                    >
                      <option value="Weekly Report">Weekly Report</option>
                      <option value="Monthly Report">Monthly Report</option>
                      <option value="Semester Report">Semester Report</option>
                      <option value="Custom Report">Custom Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <select 
                      className="w-full h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={reportForm.class}
                      onChange={(e) => setReportForm({...reportForm, class: e.target.value})}
                    >
                      <option value="">Select Class</option>
                      <option value="303105221">303105221 - Digital Electronics Laboratory</option>
                      <option value="303191202">303191202 - Discrete Mathematics</option>
                      <option value="303201301">303201301 - Data Structures and Algorithms</option>
                      <option value="303105222">303105222 - Microprocessor Systems</option>
                      <option value="303191203">303191203 - Linear Algebra</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                      <input 
                        type="date"
                        className="w-full h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={reportForm.dateFrom}
                        onChange={(e) => setReportForm({...reportForm, dateFrom: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                      <input 
                        type="date"
                        className="w-full h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={reportForm.dateTo}
                        onChange={(e) => setReportForm({...reportForm, dateTo: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                    <select 
                      className="w-full h-9 px-3 py-2 border border-gray-200 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={reportForm.format}
                      onChange={(e) => setReportForm({...reportForm, format: e.target.value})}
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Excel">Excel Spreadsheet</option>
                      <option value="CSV">CSV File</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowGenerateModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        if (!reportForm.class || !reportForm.dateFrom || !reportForm.dateTo) {
                          addNotification({ message: 'Please fill in all required fields', type: 'error' });
                          return;
                        }
                        
                        // Simulate report generation
                        addNotification({ message: `${reportForm.type} is being generated...`, type: 'info' });
                        
                        setTimeout(() => {
                          addNotification({ message: `${reportForm.type} generated successfully!`, type: 'success' });
                        }, 2000);
                        
                        setShowGenerateModal(false);
                        setReportForm({
                          type: 'Weekly Report',
                          class: '',
                          dateFrom: '',
                          dateTo: '',
                          format: 'PDF'
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};