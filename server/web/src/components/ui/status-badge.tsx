import React from 'react';
import { Badge } from './badge';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          text: 'Pending',
          className: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          text: 'Approved',
          className: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
        };
      case 'rejected':
        return {
          icon: XCircle,
          text: 'Rejected',
          className: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
        };
      default:
        return {
          icon: Clock,
          text: 'Unknown',
          className: 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
        };
    }
  };

  const { icon: Icon, text, className: statusClassName } = getStatusConfig();

  return (
    <Badge className={cn(statusClassName, 'flex items-center gap-1', className)}>
      <Icon className="h-3 w-3" />
      {text}
    </Badge>
  );
};