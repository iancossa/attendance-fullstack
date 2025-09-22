import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { StatusBadge } from '../ui/status-badge';
import { Button } from '../ui/button';
import { FileText, Calendar, User } from 'lucide-react';
import type { AbsenceJustification } from '../../types';

interface JustificationListProps {
  justifications: AbsenceJustification[];
  isStaff?: boolean;
  onReview?: (id: string, action: 'approve' | 'reject', note?: string) => void;
  loading?: boolean;
}

export const JustificationList: React.FC<JustificationListProps> = ({
  justifications,
  isStaff = false,
  onReview,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 dark:bg-[#44475a] rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-[#44475a] rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (justifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 dark:text-[#6272a4] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-[#6272a4]">
            {isStaff ? 'No justifications to review' : 'No justifications submitted yet'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {justifications.map((justification) => (
        <Card key={justification.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base mb-2">
                  {justification.reason}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-[#6272a4]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(justification.date).toLocaleDateString()}
                  </div>
                  {isStaff && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Student ID: {justification.studentId}
                    </div>
                  )}
                </div>
              </div>
              <StatusBadge status={justification.status} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-700 dark:text-[#f8f8f2] mb-3">
              {justification.description}
            </p>

            {justification.documents.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-2">
                  Documents:
                </p>
                <div className="flex flex-wrap gap-2">
                  {justification.documents.map((doc, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Document {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {justification.reviewNote && (
              <div className="bg-gray-50 dark:bg-[#44475a] p-3 rounded-md mb-3">
                <p className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2] mb-1">
                  Review Note:
                </p>
                <p className="text-sm text-gray-600 dark:text-[#6272a4]">
                  {justification.reviewNote}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#6272a4]">
              <span>Submitted: {new Date(justification.submittedAt).toLocaleString()}</span>
              {justification.reviewedAt && (
                <span>Reviewed: {new Date(justification.reviewedAt).toLocaleString()}</span>
              )}
            </div>

            {isStaff && justification.status === 'pending' && onReview && (
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-[#6272a4]">
                <Button
                  size="sm"
                  onClick={() => onReview(justification.id, 'approve')}
                  className="flex-1"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReview(justification.id, 'reject')}
                  className="flex-1"
                >
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};