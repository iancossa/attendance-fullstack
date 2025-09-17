import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  Plus,
  Calendar,
  Users,
  BookOpen,
  Sun,
  Moon,
  Monitor,
  Circle,
  User,
  Menu
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store';
import { AddStudentModal } from '../modals/AddStudentModal';
import { AddClassModal } from '../modals/AddClassModal';
import { ScheduleSessionModal } from '../modals/ScheduleSessionModal';
import logo from '../../assets/img/logo.png';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [themeSubmenuOpen, setThemeSubmenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const { notifications, addNotification } = useAppStore();

  const notificationsList = notifications || [];

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={onMobileMenuToggle}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <img src={logo} alt="Logo" className="h-16 w-16" />
            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                Attendance Hunters
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Academic Year 2024-25
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search students, classes..."
                className="pl-10 bg-gray-50 border-gray-200 text-sm h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Quick Actions - Admin Only */}
            {user?.role === 'admin' && (
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-8 px-3"
                  onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Quick Add</span>
                </DropdownMenuTrigger>
                {quickActionsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setQuickActionsOpen(false)} />
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem 
                        className="hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => handleModalOpen('addStudent')}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Add Student
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => handleModalOpen('addClass')}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Create Class
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => handleModalOpen('scheduleSession')}
                      >
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
                className="relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-8 px-3"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className={`h-4 w-4 ${notificationCount > 0 ? 'animate-pulse' : ''}`} />
                <span className="hidden sm:inline">Notifications</span>
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                    {notificationCount}
                  </Badge>
                )}
              </DropdownMenuTrigger>
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <DropdownMenuContent className="w-80">
                <div className="p-3 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Notifications</h4>
                    <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                      Mark all read
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{notificationsList.length} unread</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notificationsList.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">No notifications</p>
                      <p className="text-xs text-gray-500">You're all caught up!</p>
                    </div>
                  ) : (
                    notificationsList.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-3 hover:bg-gray-50">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{notification.type.toUpperCase()}</p>
                          <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">Just now</p>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                <div className="border-t" />
                    <DropdownMenuItem 
                      className="p-3 text-center text-sm text-orange-600 hover:bg-orange-50 font-medium"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </>
              )}
            </DropdownMenu>



            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 h-8 w-8"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <DropdownMenuContent className="w-64">
                    <div className="p-3 border-b bg-gradient-to-r from-orange-50 to-transparent">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user?.name || 'Student User'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user?.email || 'student@university.edu'}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {user?.role === 'admin' ? 'Administrator' : 
                         user?.role === 'staff' ? 'Faculty Staff' : 'Student'}
                      </Badge>
                    </div>
                    <DropdownMenuItem 
                      className="hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile Settings
                    </DropdownMenuItem>
                    <div className="relative">
                      <DropdownMenuItem 
                        className="flex items-center justify-between hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => setThemeSubmenuOpen(!themeSubmenuOpen)}
                      >
                        <div className="flex items-center gap-2">
                          {theme === 'light' && <Sun className="h-4 w-4" />}
                          {theme === 'dark' && <Moon className="h-4 w-4" />}
                          {theme === 'system' && <Monitor className="h-4 w-4" />}
                          <span>Theme</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {theme === 'light' && 'Light'}
                          {theme === 'dark' && 'Dark'}
                          {theme === 'system' && 'System'}
                        </span>
                      </DropdownMenuItem>
                      {themeSubmenuOpen && (
                        <div className="absolute right-full top-0 mr-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                          {themeOptions.map((themeOption) => (
                            <div
                              key={themeOption.id}
                              className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors"
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
                      className="hover:bg-orange-50 hover:text-orange-600"
                    >
                      System Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Help & Support
                    </DropdownMenuItem>
                    <div className="border-t" />
                    <DropdownMenuItem 
                      className="text-red-600 hover:bg-red-50" 
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 z-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search students, classes..."
                className="pl-10 bg-gray-50 border-gray-200 text-sm h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
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
    </header>
  );
};