import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Target, Plus, Trash2, Check, Flame, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Habit {
  id: string;
  name: string;
  color: string;
  streak: number;
  completedDates: string[];
  createdAt: number;
}

const colors = [
  { name: 'قرمز', value: '#ef4444' },
  { name: 'نارنجی', value: '#f97316' },
  { name: 'زرد', value: '#eab308' },
  { name: 'سبز', value: '#22c55e' },
  { name: 'آبی', value: '#3b82f6' },
  { name: 'بنفش', value: '#8b5cf6' },
  { name: 'صورتی', value: '#ec4899' },
];

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabit, setNewHabit] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.trim(),
      color: selectedColor,
      streak: 0,
      completedDates: [],
      createdAt: Date.now(),
    };

    setHabits([...habits, habit]);
    setNewHabit('');
    toast({ title: 'عادت جدید اضافه شد' });
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== habitId) return habit;

      const isCompleted = habit.completedDates.includes(today);
      let newDates: string[];
      let newStreak: number;

      if (isCompleted) {
        newDates = habit.completedDates.filter(d => d !== today);
        newStreak = calculateStreak(newDates);
      } else {
        newDates = [...habit.completedDates, today];
        newStreak = calculateStreak(newDates);
      }

      return { ...habit, completedDates: newDates, streak: newStreak };
    }));
  };

  const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    
    const sortedDates = [...dates].sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diff = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diff <= 1) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    toast({ title: 'عادت حذف شد' });
  };

  // Get last 7 days
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('fa-IR', { weekday: 'short' }),
        dayNum: date.getDate(),
      });
    }
    return days;
  }, []);

  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const totalHabits = habits.length;
  const todayProgress = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const longestStreak = Math.max(...habits.map(h => h.streak), 0);

  const reset = () => {
    if (confirm('آیا از پاک کردن همه عادت‌ها مطمئن هستید؟')) {
      setHabits([]);
    }
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="پیگیری عادت" icon={Target} onReset={reset}>
        {/* Add Habit Form */}
        <form onSubmit={addHabit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="عادت جدید..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newHabit.trim()}>
              <Plus className="h-4 w-4 ml-1" />
              افزودن
            </Button>
          </div>

          <div className="flex gap-2">
            <Label className="text-sm text-muted-foreground">رنگ:</Label>
            <div className="flex gap-1">
              {colors.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-6 h-6 rounded-full transition-transform ${selectedColor === color.value ? 'scale-125 ring-2 ring-offset-2 ring-primary' : ''}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Today's Progress */}
        {totalHabits > 0 && (
          <div className="space-y-2 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium">پیشرفت امروز</span>
              <span className="text-sm text-muted-foreground">{completedToday} از {totalHabits}</span>
            </div>
            <Progress value={todayProgress} className="h-2" />
          </div>
        )}
      </CalculatorCard>

      {/* Habit Grid */}
      {habits.length > 0 && (
        <VisualizationCard title="عادت‌های من">
          <div className="space-y-4">
            {/* Week Header */}
            <div className="grid grid-cols-[1fr,repeat(7,40px)] gap-2 text-center text-xs text-muted-foreground">
              <div></div>
              {last7Days.map(day => (
                <div key={day.date} className={day.date === today ? 'font-bold text-primary' : ''}>
                  <div>{day.dayName}</div>
                  <div>{day.dayNum}</div>
                </div>
              ))}
            </div>

            {/* Habits */}
            <AnimatePresence>
              {habits.map(habit => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-[1fr,repeat(7,40px)] gap-2 items-center"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: habit.color }} />
                    <span className="truncate font-medium">{habit.name}</span>
                    {habit.streak > 0 && (
                      <Badge variant="secondary" className="shrink-0 gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {habit.streak}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>

                  {last7Days.map(day => {
                    const isCompleted = habit.completedDates.includes(day.date);
                    const isToday = day.date === today;
                    
                    return (
                      <button
                        key={day.date}
                        onClick={() => isToday && toggleHabit(habit.id)}
                        disabled={!isToday}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'text-white'
                            : isToday
                            ? 'bg-muted hover:bg-muted/80 cursor-pointer'
                            : 'bg-muted/30'
                        }`}
                        style={isCompleted ? { backgroundColor: habit.color } : undefined}
                      >
                        {isCompleted && <Check className="h-5 w-5" />}
                      </button>
                    );
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </VisualizationCard>
      )}

      {/* Stats */}
      {habits.length > 0 && (
        <VisualizationCard title="آمار">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold">{habits.length}</div>
              <div className="text-sm text-muted-foreground">کل عادت‌ها</div>
            </div>
            <div className="p-4 bg-orange-500/10 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <Flame className="h-5 w-5" />
                {longestStreak}
              </div>
              <div className="text-sm text-muted-foreground">بیشترین استریک</div>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold">{Math.round(todayProgress)}%</div>
              <div className="text-sm text-muted-foreground">امروز</div>
            </div>
          </div>
        </VisualizationCard>
      )}

      {/* Empty State */}
      {habits.length === 0 && (
        <VisualizationCard>
          <div className="text-center py-12 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>هنوز عادتی اضافه نکردید</p>
            <p className="text-sm">عادت‌های روزانه خود را اضافه کنید و پیشرفت‌تان را پیگیری کنید</p>
          </div>
        </VisualizationCard>
      )}
    </div>
  );
};

export default HabitTracker;
