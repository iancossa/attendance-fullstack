import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { 
  Search, 
  Plus,
  Calendar,
  Users,
  BookOpen,
  Sun,
  Moon,
  Monitor,
  Circle,
  User,
  Menu,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store';
import { AddStudentModal } from '../modals/AddStudentModal';
import { AddClassModal } from '../modals/AddClassModal';
import { ScheduleSessionModal } from '../modals/ScheduleSessionModal';
import { Breadcrumb } from '../ui/breadcrumb';


interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [themeSubmenuOpen, setThemeSubmenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const { addNotification } = useAppStore();

  const themeOptions = [
    { id: 'light', name: 'Light', icon: <Sun className="h-4 w-4" /> },
    { id: 'dark', name: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { id: 'system', name: 'System', icon: <Monitor className="h-4 w-4" /> }
  ] as const;

  const handleModalOpen = (modalType: string) => {
    setActiveModal(modalType);
    setQuickActionsOpen(false);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleAddStudent = (studentData: any) => {
    addNotification({ message: 'Student added successfully', type: 'success' });
  };

  const handleAddClass = (classData: any) => {
    addNotification({ message: 'Class created successfully', type: 'success' });
  };

  const handleScheduleSession = (sessionData: any) => {
    addNotification({ message: 'Session scheduled successfully', type: 'success' });
  };

  return (
    <>
      <header className="bg-white dark:bg-[#282a36] border-b border-gray-200 dark:border-[#6272a4] sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center h-12">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden hover:bg-orange-100 dark:hover:bg-[#44475a] text-gray-700 dark:text-[#f8f8f2]"
                onClick={onMobileMenuToggle}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Breadcrumb />
            </div>
            
            {/* Center Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 h-full justify-center">
              <div className="relative w-full max-w-lg flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4] z-10" />
                <Input 
                  placeholder="Search students, classes..."
                  className="pl-10 bg-orange-50 dark:bg-[#44475a] border-orange-200 dark:border-[#6272a4] text-sm h-full w-full rounded-none border-0 text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4] focus:border-orange-300 dark:focus:border-[#bd93f9] focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Mobile Search */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden hover:bg-orange-100 dark:hover:bg-[#44475a] text-gray-700 dark:text-[#f8f8f2]"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Quick Actions - Admin Only */}
              {user?.role === 'admin' && (
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className="gap-2 text-foreground"
                    onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Quick Add</span>
                  </DropdownMenuTrigger>
                  {quickActionsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setQuickActionsOpen(false)} />
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem onClick={() => handleModalOpen('addStudent')}>
                          <Users className="h-4 w-4 mr-2" />
                          Add Student
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleModalOpen('addClass')}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Create Class
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleModalOpen('scheduleSession')}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </>
                  )}
                </DropdownMenu>
              )}





              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-[#f8f8f2] hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2"
                  onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </DropdownMenuTrigger>
                {notificationMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationMenuOpen(false)} />
                    <DropdownMenuContent className="w-80">
                      <div className="p-3 border-b bg-gradient-to-r from-orange-50 to-transparent dark:from-[#282a36] dark:to-transparent border-orange-100 dark:border-[#6272a4]">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">Notifications</h3>
                            <p className="text-sm text-gray-600 dark:text-[#6272a4]">0 unread</p>
                          </div>
                          <button className="text-sm text-orange-600 hover:text-orange-700">
                            Mark all read
                          </button>
                        </div>
                      </div>
                      <div className="p-8 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center">
                          <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <p className="font-medium text-gray-900 dark:text-[#f8f8f2] mb-1">No notifications</p>
                        <p className="text-sm text-gray-600 dark:text-[#6272a4]">You're all caught up!</p>
                      </div>
                      <DropdownMenuItem onClick={() => setNotificationMenuOpen(false)}>
                        <span className="text-orange-600 dark:text-orange-400 font-medium">View all notifications</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="rounded-full p-0 h-8 w-8 hover:bg-accent"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <Avatar className="h-8 w-8">
                    {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <DropdownMenuContent className="w-64">
                      <div className="p-3 border-b bg-gradient-to-r from-orange-50 to-transparent dark:from-[#282a36] dark:to-transparent border-orange-100 dark:border-[#6272a4]">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                            <AvatarFallback className="bg-orange-100 text-orange-600">
                              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-[#f8f8f2]">
                              {user?.name || user?.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-[#6272a4]">
                              {user?.email || 'user@university.edu'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {user?.role === 'admin' ? 'Administrator' : 
                           user?.role === 'staff' ? 'Faculty Staff' : 'Student'}
                        </Badge>
                      </div>
                      <DropdownMenuItem onClick={() => {
                        navigate('/profile/settings');
                        setUserMenuOpen(false);
                      }}>
                        Profile Settings
                      </DropdownMenuItem>
                      <div className="relative">
                        <DropdownMenuItem 
                          className="flex items-center justify-between"
                          onClick={() => setThemeSubmenuOpen(!themeSubmenuOpen)}
                        >
                          <div className="flex items-center gap-2">
                            {theme === 'light' && <Sun className="h-4 w-4" />}
                            {theme === 'dark' && <Moon className="h-4 w-4" />}
                            {theme === 'system' && <Monitor className="h-4 w-4" />}
                            <span>Theme</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-[#6272a4] capitalize">
                            {theme}
                          </span>
                        </DropdownMenuItem>
                        {themeSubmenuOpen && (
                          <div className="absolute right-full top-0 mr-1 w-32 bg-white dark:bg-[#44475a] border border-gray-200 dark:border-[#6272a4] rounded-md shadow-lg z-50 py-1 animate-in fade-in-0 zoom-in-95 slide-in-from-right-2 duration-200">
                            {themeOptions.map((themeOption) => (
                              <div
                                key={themeOption.id}
                                className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer text-gray-700 dark:text-[#f8f8f2] hover:bg-orange-50 dark:hover:bg-[#bd93f9]/20 hover:text-orange-600 dark:hover:text-[#bd93f9] transition-colors mx-1"
                                onClick={() => {
                                  setTheme(themeOption.id);
                                  setThemeSubmenuOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {themeOption.icon}
                                  <span>{themeOption.name}</span>
                                </div>
                                {theme === themeOption.id && (
                                  <Circle className="h-2 w-2 fill-orange-500 text-orange-500" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <DropdownMenuItem 
                        onClick={() => {
                          window.location.href = '/settings';
                          setUserMenuOpen(false);
                        }}
                      >
                        System Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserMenuOpen(false)}>
                        Help & Support
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                        onClick={() => {
                          logout();
                          addNotification({ message: 'Logged out successfully', type: 'info' });
                          setUserMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile Search Overlay */}
          {mobileSearchOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#282a36] border-b border-orange-200 dark:border-[#6272a4] p-4 z-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search students, classes..."
                  className="pl-10 bg-orange-50 dark:bg-[#44475a] border-orange-200 dark:border-[#6272a4] text-sm h-10 rounded-none text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals - Rendered outside header to fix z-index stacking */}
      <AddStudentModal
        isOpen={activeModal === 'addStudent'}
        onClose={handleModalClose}
        onSave={handleAddStudent}
      />
      <AddClassModal
        isOpen={activeModal === 'addClass'}
        onClose={handleModalClose}
        onSave={handleAddClass}
      />
      <ScheduleSessionModal
        isOpen={activeModal === 'scheduleSession'}
        onClose={handleModalClose}
        onSave={handleScheduleSession}
      />
    </>
  );
};