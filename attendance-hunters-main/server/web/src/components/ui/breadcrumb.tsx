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
      'take-attendance': 'Attendance',
      'qr-mode': 'QR Mode',
      'manual-mode': 'Manual',
      'hybrid-mode': 'Hybrid'
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
    <nav className="flex items-center h-8 space-x-1 text-sm text-muted-foreground">
      {/* Mobile: Show only home icon and current page */}
      <div className="flex items-center sm:hidden">
        <Home className="h-4 w-4 text-muted-foreground" />
        {breadcrumbs.length > 1 && (
          <>
            <span className="mx-1 text-muted-foreground/60">•</span>
            <span className="text-foreground font-medium truncate max-w-[120px]">
              {breadcrumbs[breadcrumbs.length - 1].label}
            </span>
          </>
        )}
      </div>
      
      {/* Desktop: Show full breadcrumb */}
      <div className="hidden sm:flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index === 0 ? (
              <div className="flex items-center transition-colors duration-200">
                <Home className="h-4 w-4 text-muted-foreground" />
                {breadcrumbs.length > 1 && (
                  <span className="ml-1 text-muted-foreground">{item.label}</span>
                )}
              </div>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                <span className={`transition-colors duration-200 ${
                  index === breadcrumbs.length - 1 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-primary cursor-pointer'
                }`}>
                  {item.label}
                </span>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};