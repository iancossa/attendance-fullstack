import React, { useState } from 'react';
import { ROUTES } from '../../constants';
import { Badge } from '../ui/badge';
import { useAuth } from '../../hooks/useAuth';
import { Icon } from '../ui/Icon';
import logo from '../../assets/img/logo.png';

interface SidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, setIsMobileOpen }) => {
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const { user } = useAuth();

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'chart-histogram', badge: null },
        { name: 'Attendance', path: ROUTES.ATTENDANCE, icon: 'checkbox', badge: null },
        { name: 'Classes', path: ROUTES.CLASSES, icon: 'graduation-cap', badge: null },
        { name: 'Students', path: '/students', icon: 'users', badge: null },
        { name: 'Detention', path: '/detention', icon: 'triangle-warning', badge: null },
        { name: 'Faculty', path: '/faculty', icon: 'users-alt', badge: null },
        { name: 'Departments', path: '/departments', icon: 'building', badge: null },
        { name: 'Calendar', path: '/calendar', icon: 'calendar', badge: null },
      ];
    } else if (user?.role === 'staff') {
      return [
        { name: 'Dashboard', path: '/staff-dashboard', icon: 'chart-histogram', badge: null },
        { name: 'Attendance', path: ROUTES.ATTENDANCE, icon: 'checkbox', badge: null },
        { name: 'Classes', path: ROUTES.CLASSES, icon: 'graduation-cap', badge: null },
        { name: 'Reports', path: ROUTES.REPORTS, icon: 'newspaper', badge: null },
      ];
    } else if (user?.role === 'student') {
      return [
        { name: 'Dashboard', path: '/student-dashboard', icon: 'chart-histogram', badge: null },
        { name: 'Attendance', path: ROUTES.ATTENDANCE, icon: 'checkbox', badge: null },
        { name: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'troph-cap', badge: null },
      ];
    }
    return [];
  };

  const mainMenuItems = getMenuItems();

  const analyticsItems = user?.role === 'admin' ? [
    { name: 'Reports', path: ROUTES.REPORTS, icon: 'newspaper', badge: null },
    { name: 'Leaderboard', path: ROUTES.LEADERBOARD, icon: 'troph-cap', badge: null },
  ] : [];

  const systemItems = [
    { name: 'Settings', path: ROUTES.SETTINGS, icon: 'settings', badge: null },
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    setIsMobileOpen?.(false);
  };

  const renderMenuGroup = (title: string, items: any[]) => (
    <div className="mb-4">
      <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 dark:text-[#6272a4] uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = activeItem === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-orange-50 dark:bg-[#bd93f9]/20 text-orange-600 dark:text-[#bd93f9] border-r-2 border-orange-500 dark:border-[#bd93f9]'
                  : 'text-gray-600 dark:text-[#f8f8f2] hover:bg-orange-100 dark:hover:bg-[#6272a4]/30 hover:text-orange-700 dark:hover:text-[#f8f8f2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={item.icon} className={`h-4 w-4 transition-colors ${
                  isActive ? 'text-orange-600 dark:text-[#bd93f9]' : 'group-hover:text-orange-700 dark:group-hover:text-[#f8f8f2]'
                }`} />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <Badge 
                  variant={item.badge === 'Live' ? 'default' : 'secondary'} 
                  className={`text-xs px-1.5 py-0.5 ${
                    item.badge === 'Live' 
                      ? 'bg-green-100 text-green-700 animate-pulse' 
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 md:z-auto
        w-60 md:w-60
        bg-orange-50 dark:bg-[#44475a] border-r border-orange-100 dark:border-[#6272a4]
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        h-screen overflow-hidden
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <header className="bg-white dark:bg-[#282a36] border-b border-orange-100 dark:border-[#6272a4]">
            <div className="px-4">
              <div className="flex items-center h-12">
                <img src={logo} alt="Logo" className="h-14 w-14" />
                <h1 className="ml-3 text-sm font-semibold text-gray-900 dark:text-[#f8f8f2]">Attendance Hunters</h1>
              </div>
            </div>
          </header>
          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto pt-4">
            {renderMenuGroup('Main', mainMenuItems)}
            {analyticsItems.length > 0 && renderMenuGroup('Analytics', analyticsItems)}
            {user?.role === 'admin' && renderMenuGroup('System', systemItems)}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-orange-100 dark:border-[#44475a]">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-[#6272a4]">Academic Year 2024-25</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};