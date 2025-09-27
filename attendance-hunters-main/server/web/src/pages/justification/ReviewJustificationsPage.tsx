import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { JustificationList } from '../../components/justification/JustificationList';
import { Badge } from '../../components/ui/badge';
import { FileText, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { justificationService } from '../../services/justificationService';
import { useAppStore } from '../../store';
import type { AbsenceJustification } from '../../types';

export const ReviewJustificationsPage: React.FC = () => {
  useDocumentTitle('Review Absence Requests');
  const [justifications, setJustifications] = useState<AbsenceJustification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const { addNotification } = useAppStore();

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await justificationService.getPendingJustifications();
      setJustifications(response.data);
    } catch (error) {
      console.error('Failed to fetch justifications:', error);
      addNotification({
        message: 'Failed to load justifications',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, action: 'approve' | 'reject', note?: string) => {
    try {
      if (action === 'approve') {
        await justificationService.approveJustification(id, note);
        addNotification({
          message: 'Justification approved successfully',
          type: 'success'
        });
      } else {
        const reviewNote = note || prompt('Please provide a reason for rejection:');
        if (!reviewNote) return;
        
        await justificationService.rejectJustification(id, reviewNote);
        addNotification({
          message: 'Justification rejected',
          type: 'info'
        });
      }
      
      // Refresh the list
      fetchJustifications();
    } catch (error) {
      console.error('Failed to review justification:', error);
      addNotification({
        message: 'Failed to process review',
        type: 'error'
      });
    }
  };

  const getFilteredJustifications = () => {
    if (filter === 'all') return justifications;
    return justifications.filter(j => j.status === filter);
  };

  const getStatusCounts = () => {
    return {
      all: justifications.length,
      pending: justifications.filter(j => j.status === 'pending').length,
      approved: justifications.filter(j => j.status === 'approved').length,
      rejected: justifications.filter(j => j.status === 'rejected').length
    };
  };

  const counts = getStatusCounts();
  const filteredJustifications = getFilteredJustifications();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Review Absence Requests</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Review and approve student absence requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Pending Review</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.pending}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">awaiting decision</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Approved</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.approved}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">accepted requests</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Rejected</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.rejected}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">declined requests</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Requests</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.all}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">absence requests</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <Filter className="h-4 w-4" />
              Filter Absence Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
                { key: 'all', label: 'All', icon: FileText, count: counts.all },
                { key: 'approved', label: 'Approved', icon: CheckCircle, count: counts.approved },
                { key: 'rejected', label: 'Rejected', icon: XCircle, count: counts.rejected }
              ].map(({ key, label, icon: Icon, count }) => (
                <Button
                  key={key}
                  variant={filter === key ? 'default' : 'outline'}
                  onClick={() => setFilter(key as any)}
                  className="flex items-center gap-2 h-9"
                  size="sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Justifications List */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                  <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                {filter === 'all' ? 'All Absence Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`} ({filteredJustifications.length})
              </CardTitle>
              <Badge variant="outline" className="text-gray-600 dark:text-[#6272a4] border-gray-300 dark:border-[#6272a4]">
                Academic Year 2024-25
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <JustificationList
              justifications={filteredJustifications}
              isStaff={true}
              onReview={handleReview}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};