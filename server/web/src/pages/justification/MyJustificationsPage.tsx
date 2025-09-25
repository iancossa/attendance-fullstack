import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { JustificationList } from '../../components/justification/JustificationList';
import { AbsenceRequestModal } from '../../components/modals/AbsenceRequestModal';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { justificationService } from '../../services/justificationService';
import { useAppStore } from '../../store';
import type { AbsenceJustification, JustificationFormData } from '../../types';

export const MyJustificationsPage: React.FC = () => {
  useDocumentTitle('My Absence Requests');
  const navigate = useNavigate();
  const [justifications, setJustifications] = useState<AbsenceJustification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useAppStore();

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await justificationService.getMyJustifications();
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

  const handleSubmitRequest = async (data: JustificationFormData & { classInfo: any }) => {
    setIsSubmitting(true);
    try {
      await justificationService.submitJustification('temp-id', data);
      addNotification({
        message: 'Absence request submitted successfully',
        type: 'success'
      });
      setShowRequestModal(false);
      fetchJustifications();
    } catch (error) {
      console.error('Failed to submit request:', error);
      addNotification({
        message: 'Failed to submit absence request',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusCounts = () => {
    return {
      total: justifications.length,
      pending: justifications.filter(j => j.status === 'pending').length,
      approved: justifications.filter(j => j.status === 'approved').length,
      rejected: justifications.filter(j => j.status === 'rejected').length
    };
  };

  const counts = getStatusCounts();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">My Absence Requests</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Track your absence requests and approval status</p>
          </div>
          <Button onClick={() => setShowRequestModal(true)} className="gap-2 flex-1 sm:flex-none">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Request New Absence</span>
            <span className="sm:hidden">New Request</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Requests</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.total}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">absence requests</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-500/10">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Pending Review</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{counts.pending}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">awaiting approval</p>
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
        </div>

        {/* Justifications List */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              My Absence Requests ({justifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JustificationList
              justifications={justifications}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
      
      <AbsenceRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={handleSubmitRequest}
        isSubmitting={isSubmitting}
      />
    </Layout>
  );
};