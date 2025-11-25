import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertTime } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Clock, Timer, Globe } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

type CalculatorMode = 'convert' | 'countdown' | 'timezone';

export default function TimeCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('convert');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');
  const [seconds, setSeconds] = useState<string>('0');
  const [result, setResult] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCalculate = () => {
    const parsedHours = parseInt(hours) || 0;
    const parsedMinutes = parseInt(minutes) || 0;
    const parsedSeconds = parseInt(seconds) || 0;
    
    if (parsedHours < 0 || parsedMinutes < 0 || parsedSeconds < 0) {
      setResult('لطفاً مقادیر مثبت وارد کنید.');
      return;
    }

    const conversion = convertTime(parsedHours, parsedMinutes, parsedSeconds);
    
    let resultText = '';
    
    if (conversion.days > 0) {
      resultText += `${formatPersianNumber(conversion.days)} روز`;
      if (conversion.remainingHours > 0) {
        resultText += ` و ${formatPersianNumber(conversion.remainingHours)} ساعت`;
      }
      resultText += '\n';
    }
    
    resultText += `کل ثانیه‌ها: ${formatPersianNumber(conversion.totalSeconds)}\n`;
    resultText += `کل دقیقه‌ها: ${formatPersianNumber(conversion.totalMinutes)}\n`;
    
    if (conversion.days === 0 || conversion.totalHours < 24) {
      resultText += `کل ساعت‌ها: ${formatPersianNumber(conversion.totalHours)}\n`;
    }
    
    setResult(resultText);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  const handleReset = () => {
    setHours('0');
    setMinutes('0');
    setSeconds('0');
    setResult(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const quickPresets = [
    { label: '1 ساعت', h: 1, m: 0, s: 0 },
    { label: '1 روز', h: 24, m: 0, s: 0 },
    { label: '1 هفته', h: 168, m: 0, s: 0 },
    { label: '1 ماه', h: 720, m: 0, s: 0 },
  ];

  return (
    <div className="space-y-6">
      <CalculatorCard title="محاسبه‌گر زمان" icon={Clock} onReset={handleReset}>
        {/* Mode Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={mode === 'convert' ? 'default' : 'outline'}
            onClick={() => setMode('convert')}
            className="gap-2"
          >
            <Timer className="h-4 w-4" />
            تبدیل زمان
          </Button>
          <Button
            variant={mode === 'countdown' ? 'default' : 'outline'}
            onClick={() => setMode('countdown')}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            ساعت زنده
          </Button>
          <Button
            variant={mode === 'timezone' ? 'default' : 'outline'}
            onClick={() => setMode('timezone')}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            منطقه زمانی
          </Button>
        </div>

        {mode === 'convert' && (
          <>
            {/* Quick Presets */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">زمان‌های پرکاربرد:</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickPresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setHours(preset.h.toString());
                      setMinutes(preset.m.toString());
                      setSeconds(preset.s.toString());
                    }}
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hours">ساعت</Label>
                <Input
                  id="hours"
                  type="text"
                  value={hours}
                  onChange={(e) => handleInputChange(e, setHours)}
                  placeholder="0"
                  dir="ltr"
                  className="text-center text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minutes">دقیقه</Label>
                <Input
                  id="minutes"
                  type="text"
                  value={minutes}
                  onChange={(e) => handleInputChange(e, setMinutes)}
                  placeholder="0"
                  dir="ltr"
                  className="text-center text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seconds">ثانیه</Label>
                <Input
                  id="seconds"
                  type="text"
                  value={seconds}
                  onChange={(e) => handleInputChange(e, setSeconds)}
                  placeholder="0"
                  dir="ltr"
                  className="text-center text-lg font-bold"
                />
              </div>
            </div>

            <Button onClick={handleCalculate} className="w-full gap-2" size="lg">
              <Clock className="h-5 w-5" />
              محاسبه زمان
            </Button>

            {result && <OutcomeInfoCard outcome={result} />}
          </>
        )}

        {mode === 'countdown' && (
          <VisualizationCard title="ساعت زنده">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 mx-auto"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/30">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentTime.toLocaleDateString('fa-IR', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </VisualizationCard>
        )}

        {mode === 'timezone' && (
          <div className="space-y-4">
            <VisualizationCard title="ساعت جهانی">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { city: 'تهران', timezone: 'Asia/Tehran' },
                  { city: 'لندن', timezone: 'Europe/London' },
                  { city: 'نیویورک', timezone: 'America/New_York' },
                  { city: 'توکیو', timezone: 'Asia/Tokyo' },
                ].map((location) => (
                  <motion.div
                    key={location.city}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {location.city}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {new Date().toLocaleTimeString('fa-IR', {
                        timeZone: location.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </VisualizationCard>
          </div>
        )}
      </CalculatorCard>
    </div>
  );
}