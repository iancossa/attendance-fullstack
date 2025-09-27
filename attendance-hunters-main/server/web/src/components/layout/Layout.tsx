import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { StudentSidebar } from './StudentSidebar';
import { StaffSidebar } from './StaffSidebar';
import { Header } from './Header';
import { useAppStore } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { TableSkeleton } from '../ui/table-skeleton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useAppStore();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const renderSidebar = () => {
    const sidebarProps = {
      isMobileOpen: isMobileMenuOpen,
      setIsMobileOpen: setIsMobileMenuOpen
    };
    
    switch (user?.role) {
      case 'student':
        return <StudentSidebar {...sidebarProps} />;
      case 'staff':
        return <StaffSidebar {...sidebarProps} />;
      case 'admin':
      default:
        return <Sidebar {...sidebarProps} />;
    }
  };
  
  return (
    <div className="h-screen bg-gray-50 dark:bg-[#282a36] flex">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-full mx-auto">
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <TableSkeleton rows={8} columns={6} />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};