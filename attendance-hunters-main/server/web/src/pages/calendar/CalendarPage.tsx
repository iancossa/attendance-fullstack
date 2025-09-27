import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  Filter,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  Download
} from 'lucide-react';
import { MOCK_CALENDAR_EVENTS, CalendarEvent } from '../../data/mockCalendar';
import { useAppStore } from '../../store/useAppStore';
import { exportToExcel } from '../../utils/exportUtils';
import { AddEventModal } from '../../components/modals/AddEventModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const CalendarPage: React.FC = () => {
  useDocumentTitle('Calendar');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('events');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventsList, setEventsList] = useState<CalendarEvent[]>([]);
  const { addNotification } = useAppStore();

  const allEvents: CalendarEvent[] = eventsList;
  
  const filteredEvents = allEvents.filter(event => {
    const matchesFilter = selectedFilter === 'All' || event.type === selectedFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Exam':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      case 'Class':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'Holiday':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'Event':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f8f8f2]">Academic Calendar</h1>
            <p className="text-sm text-gray-600 dark:text-[#6272a4] mt-1">Manage academic schedules and exam timetables</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 sm:flex-none bg-orange-50 dark:bg-[#44475a] border-orange-200 dark:border-[#6272a4] text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/10"
              onClick={() => {
                exportToExcel(filteredEvents, 'academic-calendar');
                addNotification({ message: 'Calendar data exported successfully', type: 'success' });
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button 
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Total Events</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">{allEvents.length}</div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">scheduled events</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Upcoming Exams</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">
                    {allEvents.filter(e => e.type === 'Exam' && new Date(e.date) >= new Date()).length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">this month</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">This Week</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">
                    {allEvents.filter(e => {
                      const eventDate = new Date(e.date);
                      const today = new Date();
                      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                      return eventDate >= today && eventDate <= weekFromNow;
                    }).length}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">upcoming events</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-orange-50 dark:bg-[#44475a]">
            <CardContent className="p-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#f8f8f2]">Departments</p>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-[#f8f8f2] mt-2">
                    {allEvents.length > 0 ? new Set(allEvents.map(e => e.department)).size : 0}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-[#e5e7eb] mt-1">participating</p>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
              <Filter className="h-4 w-4" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-[#6272a4]" />
              <input 
                type="text"
                placeholder="Search events by title, description, or department..."
                className="w-full h-9 pl-10 pr-3 border border-gray-200 dark:border-[#6272a4] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] placeholder:text-gray-500 dark:placeholder:text-[#6272a4]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'events' ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-[#44475a] text-gray-700 dark:text-[#f8f8f2] hover:bg-gray-200 dark:hover:bg-[#6272a4]'
                  }`}
                >
                  Events List
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'calendar' ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-[#44475a] text-gray-700 dark:text-[#f8f8f2] hover:bg-gray-200 dark:hover:bg-[#6272a4]'
                  }`}
                >
                  Calendar View
                </button>
              </div>
              <select 
                className="h-9 px-3 py-2 border border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#44475a] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-[#f8f8f2]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="All">All Events</option>
                <option value="Exam">Exams</option>
                <option value="Class">Classes</option>
                <option value="Holiday">Holidays</option>
                <option value="Event">Events</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {activeTab === 'events' ? (
          <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">All Events ({filteredEvents.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-[#44475a] rounded-full flex items-center justify-center mb-4">
                    <CalendarIcon className="h-12 w-12 text-gray-400 dark:text-[#6272a4]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">No events scheduled</h3>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-6 max-w-sm mx-auto">
                    Get started by creating your first academic event. Add exams, classes, holidays, and special events to keep everyone informed.
                  </p>
                  <Button 
                    className="gap-2"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Create First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 dark:border-[#6272a4] rounded-lg hover:bg-gray-50 dark:hover:bg-[#44475a] transition-colors bg-white dark:bg-[#282a36]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-[#f8f8f2]">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-2">{event.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-[#6272a4]">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.department}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white dark:bg-[#282a36] border-gray-200 dark:border-[#6272a4]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-[#f8f8f2]">
                  {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              {allEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-[#44475a] rounded-full flex items-center justify-center mb-4">
                    <CalendarIcon className="h-12 w-12 text-gray-400 dark:text-[#6272a4]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">Calendar is empty</h3>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-6 max-w-sm mx-auto">
                    No events are scheduled for this month. Add events to see them displayed on the calendar.
                  </p>
                  <Button 
                    className="gap-2"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-[#6272a4]">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((day, index) => {
                      const dayEvents = day ? getEventsForDate(day) : [];
                      return (
                        <div key={index} className="min-h-[80px] p-1 border border-gray-200 dark:border-[#6272a4] rounded bg-white dark:bg-[#282a36]">
                          {day && (
                            <>
                              <div className="text-sm font-medium mb-1 text-gray-900 dark:text-[#f8f8f2]">{day}</div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map(event => (
                                  <div key={event.id} className={`text-xs p-1 rounded ${getEventTypeColor(event.type)}`}>
                                    {event.title.substring(0, 15)}...
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <div className="text-xs text-gray-500 dark:text-[#6272a4]">+{dayEvents.length - 2} more</div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(eventData) => {
          setEventsList(prev => [...prev, eventData]);
          addNotification({ message: 'Event added successfully!', type: 'success' });
        }}
      />
    </Layout>
  );
};