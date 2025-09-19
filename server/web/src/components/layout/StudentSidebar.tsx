import React, { useState } from 'react';
import { BarChart3, Target, Trophy, User, Calendar, BookOpen } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useAppStore } from '../../store';
import logo from '../../assets/img/logo.png';

interface StudentSidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ isMobileOpen = false, setIsMobileOpen }) => {
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const { addNotification } = useAppStore();

  const mainMenuItems = [
    { name: 'Dashboard', path: '/student-dashboard', icon: BarChart3, badge: null },
    { name: 'My Attendance', path: '/attendance', icon: Target, badge: null },
    { name: 'My Classes', path: '/classes', icon: BookOpen, badge: null },
    { name: 'Schedule', path: '/calendar', icon: Calendar, badge: null },
  ];

  const academicItems = [
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy, badge: null },
    { name: 'Profile', path: '/profile', icon: User, badge: null },
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    setIsMobileOpen?.(false);
    addNotification({ message: `Navigated to ${path.replace('/', '').replace('-', ' ')}`, type: 'info' });
  };

  const renderMenuGroup = (title: string, items: any[]) => (
    <div className="mb-4">
      <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 transition-colors ${
                  isActive ? 'text-orange-600' : 'group-hover:text-gray-900'
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
        bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        h-screen overflow-hidden
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-14 flex items-center px-3 border-b border-gray-200">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <div className="ml-2">
              <h1 className="text-sm font-semibold text-gray-900">Attendance Hunters</h1>
            </div>
          </div>
          <nav className="flex-1 p-3 overflow-y-auto pt-4">
            {renderMenuGroup('Main', mainMenuItems)}
            {renderMenuGroup('Academic', academicItems)}
          </nav>
          <div className="p-3 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">Academic Year 2024-25</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};