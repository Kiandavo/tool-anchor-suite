import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Clock, Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Target, TrendingUp, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  dailyGoal: number;
}

interface SessionRecord {
  date: string;
  sessions: number;
  minutes: number;
}

const defaultSettings: TimerSettings = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longBreakInterval: 4,
  dailyGoal: 8,
};

const modeConfig = {
  work: { label: 'تمرکز', color: 'hsl(var(--destructive))', bgClass: 'from-red-500/20 to-red-500/5' },
  shortBreak: { label: 'استراحت کوتاه', color: 'hsl(142, 76%, 36%)', bgClass: 'from-green-500/20 to-green-500/5' },
  longBreak: { label: 'استراحت طولانی', color: 'hsl(217, 91%, 60%)', bgClass: 'from-blue-500/20 to-blue-500/5' },
};

export default function PomodoroTimer() {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [history, setHistory] = useState<SessionRecord[]>(() => {
    const saved = localStorage.getItem('pomodoroHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and request notification permission
  useEffect(() => {
    bellRef.current = new Audio('https://assets.mixkit.co/sfx/download/mixkit-alarm-digital-clock-beep-989.wav');
    
    // Load today's progress
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = history.find(h => h.date === today);
    if (todayRecord) {
      setSessions(todayRecord.sessions);
      setTodayMinutes(todayRecord.minutes);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
  }, [history]);

  // Save settings
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.target?.toString().includes('Input')) {
        e.preventDefault();
        toggleTimer();
      }
      if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, mode]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  const showNotification = (title: string, body: string) => {
    if (notificationsEnabled && 'Notification' in window) {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const total = settings[mode];
    return ((total - timeLeft) / total) * 100;
  };

  const getNextMode = (): TimerMode => {
    if (mode === 'work') {
      return (sessions + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  };

  const switchMode = (newMode: TimerMode) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(settings[newMode]);
  };

  const updateHistory = (addedMinutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setHistory(prev => {
      const existing = prev.find(h => h.date === today);
      if (existing) {
        return prev.map(h => 
          h.date === today 
            ? { ...h, sessions: h.sessions + 1, minutes: h.minutes + addedMinutes }
            : h
        );
      }
      return [...prev.slice(-29), { date: today, sessions: 1, minutes: addedMinutes }];
    });
  };

  const toggleTimer = useCallback(() => {
    if (isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            if (soundEnabled && bellRef.current) {
              bellRef.current.play().catch(() => {});
            }

            const nextMode = getNextMode();
            const modeLabel = modeConfig[mode].label;
            const nextLabel = modeConfig[nextMode].label;

            toast({ 
              title: `${modeLabel} تمام شد!`,
              description: `وقت ${nextLabel} است.`
            });

            showNotification(`${modeLabel} تمام شد!`, `وقت ${nextLabel} است.`);

            if (mode === 'work') {
              const addedMinutes = Math.round(settings.work / 60);
              setSessions(s => s + 1);
              setTodayMinutes(m => m + addedMinutes);
              updateHistory(addedMinutes);
            }

            setMode(nextMode);
            setIsRunning(false);
            return settings[nextMode];
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, mode, settings, soundEnabled, notificationsEnabled]);

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setMode('work');
    setTimeLeft(settings.work);
  };

  const goalProgress = Math.min((sessions / settings.dailyGoal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (getProgress() / 100) * circumference;

  // Chart data - last 7 days
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const record = history.find(h => h.date === dateStr);
    return {
      day: date.toLocaleDateString('fa-IR', { weekday: 'short' }),
      minutes: record?.minutes || 0,
    };
  });

  return (
    <div className="space-y-6">
      <CalculatorCard title="تایمر پومودورو" icon={Clock} onReset={handleReset}>
        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(modeConfig) as TimerMode[]).map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'default' : 'outline'}
              size="sm"
              onClick={() => switchMode(m)}
              className={mode === m ? '' : 'hover:bg-muted/50'}
            >
              {modeConfig[m].label}
            </Button>
          ))}
        </div>

        {/* Timer Circle */}
        <div className="flex justify-center py-4">
          <div className="relative w-56 h-56">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={modeConfig[mode].color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeLeft}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-5xl font-bold tabular-nums"
                >
                  {formatTime(timeLeft)}
                </motion.div>
              </AnimatePresence>
              <span className="text-sm text-muted-foreground mt-1">
                {modeConfig[mode].label}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            size="lg"
            onClick={toggleTimer}
            className="w-32 gap-2"
          >
            {isRunning ? (
              <><Pause className="h-5 w-5" /> توقف</>
            ) : (
              <><Play className="h-5 w-5" /> شروع</>
            )}
          </Button>
          
          <Button variant="outline" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={requestNotificationPermission}
            className={notificationsEnabled ? 'bg-primary/10' : ''}
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تنظیمات تایمر</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>زمان تمرکز: {Math.round(settings.work / 60)} دقیقه</Label>
                  <Slider
                    value={[settings.work / 60]}
                    onValueChange={([v]) => setSettings(s => ({ ...s, work: v * 60 }))}
                    min={5}
                    max={60}
                    step={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label>استراحت کوتاه: {Math.round(settings.shortBreak / 60)} دقیقه</Label>
                  <Slider
                    value={[settings.shortBreak / 60]}
                    onValueChange={([v]) => setSettings(s => ({ ...s, shortBreak: v * 60 }))}
                    min={1}
                    max={15}
                  />
                </div>
                <div className="space-y-2">
                  <Label>استراحت طولانی: {Math.round(settings.longBreak / 60)} دقیقه</Label>
                  <Slider
                    value={[settings.longBreak / 60]}
                    onValueChange={([v]) => setSettings(s => ({ ...s, longBreak: v * 60 }))}
                    min={10}
                    max={30}
                  />
                </div>
                <div className="space-y-2">
                  <Label>هدف روزانه: {settings.dailyGoal} دوره</Label>
                  <Slider
                    value={[settings.dailyGoal]}
                    onValueChange={([v]) => setSettings(s => ({ ...s, dailyGoal: v }))}
                    min={1}
                    max={16}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Space</kbd> شروع/توقف
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+R</kbd> ریست
        </p>
      </CalculatorCard>

      {/* Daily Goal */}
      <VisualizationCard title="هدف روزانه">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - goalProgress / 100) }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{sessions}</span>
              <span className="text-muted-foreground">/ {settings.dailyGoal} دوره</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {todayMinutes} دقیقه تمرکز امروز
            </p>
            {sessions >= settings.dailyGoal && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-600 font-medium mt-1"
              >
                🎉 به هدف روزانه رسیدید!
              </motion.p>
            )}
          </div>
        </div>
      </VisualizationCard>

      {/* Weekly Stats */}
      <VisualizationCard title="آمار هفتگی">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => [`${value} دقیقه`, 'زمان تمرکز']}
                labelStyle={{ fontFamily: 'inherit' }}
              />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorMinutes)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </VisualizationCard>
    </div>
  );
}
