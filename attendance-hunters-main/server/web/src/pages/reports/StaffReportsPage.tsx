import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { FileText, Download, TrendingUp, Users, Calendar, Search, MoreVertical } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { useAppStore } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { ViewStaffReportModal } from '../../components/modals';

interface StaffReportData {
  id: string;
  type: string;
  class: string;
  period: string;
  attendance: number;
  students: number;
  generated: string;
  status: 'Generated' | 'Processing' | 'Failed';
}

// Mock data for staff's classes only
const staffReports: StaffReportData[] = [
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
    class: '303105221 - Digital Electronics Laboratory',
    period: 'December 2023',
    attendance: 87.8,
    students: 16,
    generated: '2024-01-01',
    status: 'Generated'
  },
  {
    id: '3',
    type: 'Weekly Report',
    class: '303105222 - Microprocessor Systems',
    period: 'Jan 1-7, 2024',
    attendance: 86.3,
    students: 12,
    generated: '2024-01-08',
    status: 'Generated'
  },
  {
    id: '4',
    type: 'Semester Report',
    class: '303105222 - Microprocessor Systems',
    period: 'Fall 2023',
    attendance: 88.5,
    students: 12,
    generated: '2024-01-12',
    status: 'Processing'
  }
];

export const StaffReportsPage: React.FC = () => {
  useDocumentTitle('My Class Reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<StaffReportData | null>(null);
  const { addNotification } = useAppStore();
  const { user } = useAuth();

  const filteredReports = staffReports.filter(report => {
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

  const avgAttendance = Math.round(staffReports.reduce((acc, r) => acc + r.attendance, 0) / staffReports.length);
  const totalStudents = staffReports.reduce((acc, r) => acc + r.students, 0);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">My Class Reports</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Reports for your assigned classes</p>
          </div>
          <Button 
            className="gap-2 flex-1 sm:flex-none"
            onClick={() => {
              exportToExcel(filteredReports, 'my-class-reports');
              addNotification({ message: 'Reports exported successfully', type: 'success' });
            }}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Data</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <Search className="h-4 w-4" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
                <input 
                  type="text"
                  placeholder="Search reports by type, class, or period..."
                  className="w-full h-9 pl-10 pr-3 border border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#44475a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#44475a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2] min-w-[140px]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Weekly Report">Weekly Report</option>
                <option value="Monthly Report">Monthly Report</option>
                <option value="Semester Report">Semester Report</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">My Reports</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{staffReports.length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">generated this year</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Avg Attendance</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{avgAttendance}%</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">across my classes</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Students</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{totalStudents}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">in my classes</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                My Class Reports ({filteredReports.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600 dark:text-[#6272a4] border-gray-300 dark:border-[#6272a4]">
                {user?.name || 'Staff User'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-[#6272a4] overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#44475a]">
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Report Details</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden lg:table-cell">Class & Period</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Attendance</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden sm:table-cell">Students</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] hidden md:table-cell">Generated</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-gray-50 dark:hover:bg-[#44475a] transition-colors bg-white dark:bg-[#282a36]">
                        <TableCell className="px-3 py-2">
                          <div>
                            <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{report.type}</div>
                            <Badge variant="outline" className="text-xs mt-1 border-gray-300 dark:border-[#6272a4] text-gray-600 dark:text-[#6272a4]">
                              ID: {report.id}
                            </Badge>
                            <div className="lg:hidden text-xs text-gray-500 dark:text-[#6272a4] mt-1">
                              {report.class} • {report.period}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-3 py-2 hidden lg:table-cell">
                          <div>
                            <div className="font-medium text-sm text-gray-900 dark:text-[#f8f8f2]">{report.class}</div>
                            <div className="text-xs text-gray-500 dark:text-[#6272a4]">{report.period}</div>
                          </div>
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getAttendanceColor(report.attendance)}`}>
                              {report.attendance}%
                            </span>
                            <div className="w-16 bg-gray-200 dark:bg-[#44475a] rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getAttendanceBg(report.attendance)}`}
                                style={{ width: `${report.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-3 py-2 hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-[#6272a4]">
                            <Users className="h-3 w-3 text-gray-400 dark:text-[#6272a4]" />
                            {report.students}
                          </div>
                        </TableCell>
                        <TableCell className="px-3 py-2 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-[#6272a4]">
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
                              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-[#44475a] transition-colors rounded-md flex items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-[#6272a4]"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === report.id ? null : report.id);
                              }}
                            >
                              <MoreVertical className="h-4 w-4 text-gray-600 dark:text-[#6272a4]" />
                            </button>
                            {openDropdown === report.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                                <div className="absolute right-0 top-8 mt-1 w-48 bg-white dark:bg-[#282a36] border border-gray-200 dark:border-[#6272a4] rounded-lg shadow-lg z-50 py-1">
                                  <button 
                                    onClick={() => {
                                      setSelectedReport(report);
                                      setShowViewModal(true);
                                      setOpenDropdown(null);
                                    }} 
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                  >
                                    View Report
                                  </button>
                                  <button 
                                    onClick={() => {
                                      exportToPDF([report], `${report.type}-${report.id}`);
                                      addNotification({ message: 'PDF downloaded successfully', type: 'success' });
                                      setOpenDropdown(null);
                                    }} 
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                  >
                                    Download PDF
                                  </button>
                                  <button 
                                    onClick={() => {
                                      exportToExcel([report], `${report.type}-${report.id}`);
                                      addNotification({ message: 'Data exported successfully', type: 'success' });
                                      setOpenDropdown(null);
                                    }} 
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-left text-gray-700 dark:text-[#f8f8f2]"
                                  >
                                    Export Data
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
            </div>
            
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-600 dark:text-[#6272a4]">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No reports found</p>
                <p className="text-sm">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Staff Report Modal */}
        <ViewStaffReportModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedReport(null);
          }}
          report={selectedReport}
          onDownloadPDF={() => {
            if (selectedReport) {
              exportToPDF([selectedReport], `${selectedReport.type}-${selectedReport.id}`);
              addNotification({ message: 'PDF downloaded successfully', type: 'success' });
            }
          }}
          onExportData={() => {
            if (selectedReport) {
              exportToExcel([selectedReport], `${selectedReport.type}-${selectedReport.id}`);
              addNotification({ message: 'Data exported successfully', type: 'success' });
            }
          }}
        />
      </div>
    </Layout>
  );
};