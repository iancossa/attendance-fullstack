import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    // Map common routes to readable names
    const routeMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'student-dashboard': 'Dashboard',
      'staff-dashboard': 'Dashboard',
      'attendance': 'Attendance',
      'classes': 'Classes',
      'students': 'Students',
      'reports': 'Reports',
      'leaderboard': 'Leaderboard',
      'settings': 'Settings',
      'faculty': 'Faculty',
      'departments': 'Departments',
      'calendar': 'Calendar',
      'profile': 'Profile',
      'take-attendance': 'Take Attendance',
      'qr-mode': 'QR Mode',
      'manual-mode': 'Manual Mode',
      'hybrid-mode': 'Hybrid Mode'
    };
    
    segments.forEach((segment, index) => {
      const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const href = '/' + segments.slice(0, index + 1).join('/');
      breadcrumbs.push({ label, href });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <div className="flex items-center">
              <Home className="h-4 w-4" />
              {breadcrumbs.length > 1 && (
                <span className="ml-1 hidden sm:inline">{item.label}</span>
              )}
            </div>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-900'}>
                {item.label}
              </span>
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};