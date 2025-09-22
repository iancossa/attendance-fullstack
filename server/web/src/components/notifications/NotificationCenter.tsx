import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, CheckCheck, Clock, AlertCircle, Calendar } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import type { Notification } from '../../types';

interface NotificationCenterProps {
  onClose: () => void;
  onUnreadCountChange: (count: number) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  onClose,
  onUnreadCountChange
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.data);
      const unreadCount = response.data.filter(n => !n.read).length;
      onUnreadCountChange(unreadCount);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      const unreadCount = notifications.filter(n => !n.read && n.id !== id).length;
      onUnreadCountChange(unreadCount);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      onUnreadCountChange(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'absence_reminder':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'justification_status':
        return <CheckCheck className="h-4 w-4 text-green-500" />;
      case 'attendance_alert':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'class_reminder':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400';
      case 'normal':
        return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'low':
        return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <Card className="w-80 max-h-96 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Notifications</CardTitle>
          {notifications.some(n => !n.read) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-64 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-[#44475a] rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-[#44475a] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-[#6272a4]">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-[#6272a4]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-[#44475a] cursor-pointer transition-colors ${
                    !notification.read ? 'bg-orange-50 dark:bg-orange-500/10' : ''
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2] truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-[#6272a4] mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-[#6272a4]">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {notification.priority !== 'normal' && (
                          <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};