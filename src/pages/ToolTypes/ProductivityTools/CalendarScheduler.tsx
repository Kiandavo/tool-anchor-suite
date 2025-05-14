
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Trash2, Clock, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  category: string;
  isCompleted: boolean;
}

const CalendarScheduler: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('event-categories');
    return savedCategories ? JSON.parse(savedCategories) : ['شخصی', 'کاری', 'مهم'];
  });
  
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });
  
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'isCompleted'>>({
    title: '',
    description: '',
    date: selectedDate,
    time: '12:00',
    category: categories[0] || 'شخصی'
  });
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  // Generate days for month view
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);
  
  useEffect(() => {
    localStorage.setItem('event-categories', JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);
  
  useEffect(() => {
    setNewEvent({
      ...newEvent,
      date: selectedDate
    });
  }, [selectedDate]);

  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, monthIndex, 1);
    // Last day of the month
    const lastDay = new Date(year, monthIndex + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    let firstDayOfWeek = firstDay.getDay();
    // Adjust for starting the week from Saturday (instead of Sunday)
    firstDayOfWeek = (firstDayOfWeek + 1) % 7;
    
    // Calculate days from previous month to display
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 0 : firstDayOfWeek;
    
    // Calculate days in current month
    const daysInMonth = lastDay.getDate();
    
    // Calculate total days to display (42 ensures a 6x7 grid)
    const totalDays = Math.ceil((daysFromPrevMonth + daysInMonth) / 7) * 7;
    
    // Generate array of dates
    const days: Date[] = [];
    
    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = new Date(year, monthIndex, -i);
      days.push(day);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, monthIndex, i);
      days.push(day);
    }
    
    // Next month days
    const daysToAdd = totalDays - days.length;
    for (let i = 1; i <= daysToAdd; i++) {
      const day = new Date(year, monthIndex + 1, i);
      days.push(day);
    }
    
    setCalendarDays(days);
  };

  const addEvent = () => {
    if (newEvent.title.trim() === '') {
      toast({
        title: "خطا",
        description: "عنوان رویداد نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return;
    }

    const eventToAdd: Event = {
      ...newEvent,
      id: Date.now().toString(),
      isCompleted: false
    };

    setEvents([...events, eventToAdd]);
    setIsAddingEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: selectedDate,
      time: '12:00',
      category: categories[0] || 'شخصی'
    });

    toast({
      title: "رویداد افزوده شد",
      description: `"${newEvent.title}" به تقویم اضافه شد.`,
      duration: 2000,
    });
  };

  const deleteEvent = (id: string) => {
    const eventToDelete = events.find(event => event.id === id);
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "رویداد حذف شد",
      description: `"${eventToDelete?.title}" از تقویم حذف شد.`,
      duration: 2000,
    });
  };

  const toggleEventCompletion = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
    ));
  };

  const editEvent = () => {
    if (!editingEvent) return;
    
    if (editingEvent.title.trim() === '') {
      toast({
        title: "خطا",
        description: "عنوان رویداد نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return;
    }

    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    
    setIsEditDialogOpen(false);
    setEditingEvent(null);

    toast({
      title: "رویداد ویرایش شد",
      description: "تغییرات با موفقیت ذخیره شد.",
      duration: 2000,
    });
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('fa-IR');
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getDayEvents = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getWeekDates = () => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day);
    const dayOfWeek = currentDate.getDay();
    const diff = dayOfWeek === 6 ? 0 : dayOfWeek + 1; // Adjust for weeks starting from Saturday
    
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - diff);
    
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      dates.push(dateStr);
    }
    
    return dates;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const navigateToToday = () => {
    const today = new Date();
    setSelectedDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    setCurrentMonth(today);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isSelectedDate = (date: Date) => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    return date.getDate() === day &&
           date.getMonth() === month - 1 &&
           date.getFullYear() === year;
  };

  const selectDate = (date: Date) => {
    setSelectedDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
  };
  
  const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5" />
          تقویم و برنامه‌ریز
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              variant={view === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('day')}
            >
              روز
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('week')}
            >
              هفته
            </Button>
            <Button 
              variant={view === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('month')}
            >
              ماه
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={navigateToToday}>
              امروز
            </Button>
          </div>
        </div>

        {view === 'month' && (
          <div className="border rounded-md">
            <div className="flex justify-between items-center p-4 border-b">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                &larr; ماه قبل
              </Button>
              <h3 className="text-lg font-medium">{formatDateForDisplay(currentMonth)}</h3>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                ماه بعد &rarr;
              </Button>
            </div>
            
            <div className="grid grid-cols-7 text-center p-2 border-b">
              {weekDays.map((day, index) => (
                <div key={index} className="py-2 font-medium">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 text-center">
              {calendarDays.map((day, index) => {
                const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                const dayEvents = getDayEvents(dateStr);
                
                return (
                  <div 
                    key={index} 
                    className={`p-2 min-h-[80px] border-t border-r ${index % 7 === 0 ? '' : ''} ${
                      !isCurrentMonth(day) ? 'bg-gray-50 text-gray-400' :
                      isToday(day) ? 'bg-blue-50' :
                      isSelectedDate(day) ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => selectDate(day)}
                  >
                    <div className="flex justify-between">
                      <span className={`inline-block w-6 h-6 text-center rounded-full ${
                        isToday(day) ? 'bg-blue-500 text-white' : ''
                      }`}>
                        {day.getDate()}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-xs bg-blue-500 text-white px-1 rounded">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div 
                          key={event.id} 
                          className={`text-xs truncate p-1 mb-1 rounded-sm ${
                            event.isCompleted ? 'line-through bg-gray-100 text-gray-500' : 'bg-blue-100'
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayEvents.length - 2} بیشتر
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(view === 'day' || view === 'week') && (
          <div className="border rounded-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">
                {view === 'day' 
                  ? formatDate(selectedDate)
                  : `هفته ${formatDate(getWeekDates()[0])} تا ${formatDate(getWeekDates()[6])}`
                }
              </h3>
              <Button 
                size="sm" 
                onClick={() => {
                  setIsAddingEvent(true);
                  setNewEvent({
                    ...newEvent,
                    date: selectedDate
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> رویداد جدید
              </Button>
            </div>
            
            <div className="divide-y">
              {view === 'day' ? (
                // Day view
                <>
                  {getDayEvents(selectedDate).length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      هیچ رویدادی در این روز وجود ندارد
                    </div>
                  ) : (
                    getDayEvents(selectedDate)
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map(event => (
                        <div 
                          key={event.id} 
                          className={`p-4 hover:bg-gray-50 ${event.isCompleted ? 'bg-gray-50' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2 items-center">
                              <input 
                                type="checkbox" 
                                checked={event.isCompleted}
                                onChange={() => toggleEventCompletion(event.id)}
                                className="h-4 w-4"
                              />
                              <div className={event.isCompleted ? 'line-through text-gray-500' : ''}>
                                <div className="font-medium">{event.title}</div>
                                <div className="flex gap-2 items-center text-sm text-gray-500 mt-1">
                                  <Clock className="h-3 w-3" /> {event.time}
                                  <span className="mx-2">|</span>
                                  <span>{event.category}</span>
                                </div>
                                {event.description && (
                                  <div className="mt-2 text-sm">{event.description}</div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingEvent(event);
                                  setIsEditDialogOpen(true);
                                }}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <CalendarIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteEvent(event.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </>
              ) : (
                // Week view
                <div className="grid grid-cols-7">
                  {getWeekDates().map((dateStr, index) => (
                    <div key={index} className={`border-r ${dateStr === selectedDate ? 'bg-gray-50' : ''}`}>
                      <div 
                        className={`p-2 text-center border-b ${dateStr === selectedDate ? 'bg-blue-100' : 'bg-gray-50'}`}
                        onClick={() => setSelectedDate(dateStr)}
                      >
                        <div>{weekDays[index]}</div>
                        <div className="font-bold">{formatDate(dateStr)}</div>
                      </div>
                      <div className="p-2 min-h-[200px]">
                        {getDayEvents(dateStr).length === 0 ? (
                          <div className="text-center text-xs text-gray-400 mt-4">بدون رویداد</div>
                        ) : (
                          getDayEvents(dateStr)
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map(event => (
                              <div 
                                key={event.id}
                                className={`p-2 mb-2 text-xs rounded ${
                                  event.isCompleted ? 'bg-gray-100 line-through text-gray-500' : 'bg-blue-100'
                                }`}
                                onClick={() => {
                                  setEditingEvent(event);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <div className="font-medium">{event.title}</div>
                                <div className="mt-1">{event.time}</div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dialog for Adding Event */}
        {isAddingEvent && (
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>افزودن رویداد جدید</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">عنوان</Label>
                  <Input
                    id="event-title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="عنوان رویداد را وارد کنید"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-date">تاریخ</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-time">زمان</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-category">دسته‌بندی</Label>
                  <Select 
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                  >
                    <SelectTrigger id="event-category">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-description">توضیحات</Label>
                  <Textarea
                    id="event-description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="توضیحات رویداد را وارد کنید"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>لغو</Button>
                <Button onClick={addEvent}>افزودن</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog for Editing Event */}
        {editingEvent && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ویرایش رویداد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-event-title">عنوان</Label>
                  <Input
                    id="edit-event-title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    placeholder="عنوان رویداد را وارد کنید"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-event-date">تاریخ</Label>
                  <Input
                    id="edit-event-date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-event-time">زمان</Label>
                  <Input
                    id="edit-event-time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-event-category">دسته‌بندی</Label>
                  <Select 
                    value={editingEvent.category}
                    onValueChange={(value) => setEditingEvent({ ...editingEvent, category: value })}
                  >
                    <SelectTrigger id="edit-event-category">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-event-description">توضیحات</Label>
                  <Textarea
                    id="edit-event-description"
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    placeholder="توضیحات رویداد را وارد کنید"
                  />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    id="edit-event-completed"
                    checked={editingEvent.isCompleted}
                    onChange={(e) => setEditingEvent({ ...editingEvent, isCompleted: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="edit-event-completed">تکمیل شده</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>لغو</Button>
                <Button variant="destructive" onClick={() => {
                  deleteEvent(editingEvent.id);
                  setIsEditDialogOpen(false);
                }}>حذف</Button>
                <Button onClick={editEvent}>ذخیره تغییرات</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarScheduler;
