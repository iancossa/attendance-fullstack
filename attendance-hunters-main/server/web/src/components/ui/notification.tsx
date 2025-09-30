import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAppStore } from '../../store';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useAppStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: { id: string; message: string; type: 'success' | 'error' | 'info' };
  onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default: return <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/30';
      case 'error': return 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30';
      default: return 'bg-orange-50 border-orange-200 dark:bg-orange-500/10 dark:border-orange-500/30';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'success': return 'text-green-800 dark:text-green-300';
      case 'error': return 'text-red-800 dark:text-red-300';
      default: return 'text-orange-800 dark:text-orange-300';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${getBgColor()} shadow-lg backdrop-blur-none animate-in slide-in-from-right-2 pointer-events-auto`}>
      {getIcon()}
      <span className={`text-sm font-medium ${getTextColor()}`}>{notification.message}</span>
      <button onClick={onClose} className={`ml-auto ${getTextColor()} hover:opacity-70 transition-opacity`}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};