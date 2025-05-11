
import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Settings, Bell, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  work: number; // in seconds
  shortBreak: number; // in seconds
  longBreak: number; // in seconds
  longBreakInterval: number; // after how many work sessions
}

export default function PomodoroTimer() {
  const { toast } = useToast();
  const bellSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [settings, setSettings] = useState<TimerSettings>({
    work: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
    longBreakInterval: 4 // Take a long break after 4 work sessions
  });

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Refs for managing intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Initialize audio
    bellSoundRef.current = new Audio("https://assets.mixkit.co/sfx/download/mixkit-alarm-digital-clock-beep-989.wav");
    
    // Initialize timer based on current mode
    resetTimer();
    
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Reset timer based on current mode
  const resetTimer = () => {
    setTimeLeft(settings[mode]);
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const totalTime = settings[mode];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  
  // Handle timer start/pause
  const toggleTimer = () => {
    if (isRunning) {
      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsRunning(false);
    } else {
      // Start timer
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer complete
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            
            // Play sound if enabled
            if (soundEnabled && bellSoundRef.current) {
              bellSoundRef.current.play().catch(error => {
                console.error("Error playing sound:", error);
              });
            }
            
            // Show notification
            const nextMode = getNextMode();
            toast({
              title: `زمان ${getModeLabel(mode)} به پایان رسید`,
              description: `زمان ${getModeLabel(nextMode)} آغاز می‌شود.`,
              duration: 5000
            });
            
            // Update sessions counter if needed
            if (mode === 'work') {
              setSessions(prev => prev + 1);
            }
            
            // Switch to next mode
            switchMode(nextMode);
            
            return settings[nextMode];
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  
  // Reset the timer and sessions
  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setMode('work');
    setTimeLeft(settings.work);
    setSessions(0);
  };
  
  // Get next timer mode based on current mode and sessions
  const getNextMode = (): TimerMode => {
    if (mode === 'work') {
      // After work session, check if it's time for a long break
      return (sessions + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    } else {
      // After any break, go back to work
      return 'work';
    }
  };
  
  // Switch timer mode manually
  const switchMode = (newMode: TimerMode) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(settings[newMode]);
  };
  
  // Get human-readable label for timer mode
  const getModeLabel = (mode: TimerMode): string => {
    switch (mode) {
      case 'work': return 'تمرکز';
      case 'shortBreak': return 'استراحت کوتاه';
      case 'longBreak': return 'استراحت طولانی';
    }
  };
  
  // Get color theme based on current mode
  const getModeColor = (): string => {
    switch (mode) {
      case 'work': return 'bg-red-600';
      case 'shortBreak': return 'bg-green-600';
      case 'longBreak': return 'bg-blue-600';
    }
  };
  
  // Save settings to localStorage
  const saveSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    resetTimer();
  };
  
  // Convert minutes to seconds
  const minutesToSeconds = (minutes: number): number => {
    return Math.max(1, Math.floor(minutes * 60));
  };
  
  // Update specific setting field
  const updateSetting = (field: keyof TimerSettings, value: number) => {
    const newSettings = { 
      ...settings,
      [field]: field.endsWith('Interval') ? Math.max(1, value) : minutesToSeconds(value)
    };
    saveSettings(newSettings);
  };
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="shadow-md">
        <CardHeader className={`bg-gradient-to-b from-${mode === 'work' ? 'red' : mode === 'shortBreak' ? 'green' : 'blue'}-50 to-white`}>
          <div className="flex items-center gap-3">
            <Clock className={`w-6 h-6 text-${mode === 'work' ? 'red' : mode === 'shortBreak' ? 'green' : 'blue'}-600`} />
            <CardTitle>تایمر پومودورو</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="timer">تایمر</TabsTrigger>
              <TabsTrigger value="stats">آمار</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timer">
              <div className="flex flex-col items-center">
                {/* Timer Circle */}
                <div className="relative w-64 h-64 rounded-full border-8 border-gray-100 flex items-center justify-center mb-4">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#f3f4f6" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke={mode === 'work' ? '#ef4444' : mode === 'shortBreak' ? '#22c55e' : '#3b82f6'} 
                      strokeWidth="8" 
                      strokeDasharray="282.7"
                      strokeDashoffset={282.7 - (calculateProgress() / 100 * 282.7)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex flex-col items-center z-10">
                    <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 ${
                        mode === 'work' 
                          ? 'border-red-200 text-red-700' 
                          : mode === 'shortBreak' 
                            ? 'border-green-200 text-green-700' 
                            : 'border-blue-200 text-blue-700'
                      }`}
                    >
                      {getModeLabel(mode)}
                    </Badge>
                  </div>
                </div>
                
                {/* Mode Selector */}
                <div className="grid grid-cols-3 gap-2 w-full mb-6">
                  <Button 
                    variant={mode === 'work' ? 'apple' : 'outline'}
                    size="sm"
                    className={mode === 'work' ? 'bg-red-600 hover:bg-red-700' : ''}
                    onClick={() => switchMode('work')}
                  >
                    تمرکز
                  </Button>
                  <Button 
                    variant={mode === 'shortBreak' ? 'apple' : 'outline'}
                    size="sm"
                    className={mode === 'shortBreak' ? 'bg-green-600 hover:bg-green-700' : ''}
                    onClick={() => switchMode('shortBreak')}
                  >
                    استراحت کوتاه
                  </Button>
                  <Button 
                    variant={mode === 'longBreak' ? 'apple' : 'outline'}
                    size="sm"
                    className={mode === 'longBreak' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    onClick={() => switchMode('longBreak')}
                  >
                    استراحت طولانی
                  </Button>
                </div>
                
                {/* Control Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={isRunning ? 'destructive' : 'apple'}
                    size="lg"
                    className="w-32"
                    onClick={toggleTimer}
                  >
                    {isRunning ? (
                      <>
                        <Pause size={18} className="mr-1" /> توقف
                      </>
                    ) : (
                      <>
                        <Play size={18} className="mr-1" /> شروع
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleReset}
                    title="ریست کردن"
                  >
                    <RotateCcw size={18} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSound}
                    title={soundEnabled ? 'قطع صدا' : 'روشن کردن صدا'}
                  >
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        title="تنظیمات"
                      >
                        <Settings size={18} />
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تنظیمات تایمر</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="workTime">مدت زمان تمرکز (دقیقه)</Label>
                          <Input 
                            id="workTime"
                            type="number"
                            min="1"
                            value={settings.work / 60}
                            onChange={(e) => updateSetting('work', parseFloat(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="shortBreakTime">استراحت کوتاه (دقیقه)</Label>
                          <Input 
                            id="shortBreakTime"
                            type="number"
                            min="1"
                            value={settings.shortBreak / 60}
                            onChange={(e) => updateSetting('shortBreak', parseFloat(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="longBreakTime">استراحت طولانی (دقیقه)</Label>
                          <Input 
                            id="longBreakTime"
                            type="number"
                            min="1"
                            value={settings.longBreak / 60}
                            onChange={(e) => updateSetting('longBreak', parseFloat(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="longBreakInterval">استراحت طولانی پس از چند دوره تمرکز</Label>
                          <Input 
                            id="longBreakInterval"
                            type="number"
                            min="1"
                            value={settings.longBreakInterval}
                            onChange={(e) => updateSetting('longBreakInterval', parseInt(e.target.value))}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sound">صدای اعلان</Label>
                          <Switch 
                            id="sound"
                            checked={soundEnabled}
                            onCheckedChange={setSoundEnabled}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Session Counter */}
                <div className="text-center text-sm text-gray-500">
                  دوره‌های تمرکز: {sessions} / {settings.longBreakInterval}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">آمار امروز</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">دوره‌های تمرکز</p>
                      <p className="text-2xl font-bold">{sessions}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">زمان تمرکز</p>
                      <p className="text-2xl font-bold">{Math.floor(sessions * (settings.work / 60))} دقیقه</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">تنظیمات فعلی</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">زمان تمرکز:</span>
                      <span>{settings.work / 60} دقیقه</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">استراحت کوتاه:</span>
                      <span>{settings.shortBreak / 60} دقیقه</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">استراحت طولانی:</span>
                      <span>{settings.longBreak / 60} دقیقه</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">فاصله استراحت طولانی:</span>
                      <span>{settings.longBreakInterval} دوره</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-gray-50 flex justify-between text-xs text-gray-500 py-2">
          <p>از روش پومودورو برای افزایش تمرکز و بهره‌وری استفاده کنید</p>
          <div className="flex items-center">
            <Bell size={14} className="mr-1" />
            {soundEnabled ? "صدا روشن" : "صدا خاموش"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
