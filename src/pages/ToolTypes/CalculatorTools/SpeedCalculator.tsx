import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, Zap, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { ToolInfoCard } from '@/components/ToolInfoCard';

type CalculationMode = 'distance' | 'time' | 'speed';

const SpeedCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalculationMode>('speed');
  const [distance, setDistance] = useState<string>('100');
  const [time, setTime] = useState<string>('2');
  const [speed, setSpeed] = useState<string>('50');
  const [distanceUnit, setDistanceUnit] = useState<string>('km');
  const [timeUnit, setTimeUnit] = useState<string>('h');
  const [speedUnit, setSpeedUnit] = useState<string>('km/h');
  const [result, setResult] = useState<string>('');

  const speedPresets = [
    { label: 'راه رفتن', value: { speed: 5, unit: 'km/h' } },
    { label: 'دویدن', value: { speed: 12, unit: 'km/h' } },
    { label: 'دوچرخه', value: { speed: 25, unit: 'km/h' } },
    { label: 'خودرو', value: { speed: 80, unit: 'km/h' } },
    { label: 'هواپیما', value: { speed: 800, unit: 'km/h' } },
  ];

  useEffect(() => {
    calculateResult();
  }, [distance, time, speed, distanceUnit, timeUnit, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'distance' | 'time' | 'speed'
  ) => {
    const value = e.target.value;
    if (field === 'distance') setDistance(value);
    else if (field === 'time') setTime(value);
    else setSpeed(value);
  };

  const calculateResult = () => {
    try {
      const distanceValue = parseFloat(distance) || 0;
      const timeValue = parseFloat(time) || 0;
      const speedValue = parseFloat(speed) || 0;

      let standardizedDistance = distanceValue;
      if (distanceUnit === 'km') standardizedDistance *= 1000;
      else if (distanceUnit === 'mi') standardizedDistance *= 1609.34;

      let standardizedTime = timeValue;
      if (timeUnit === 'min') standardizedTime *= 60;
      else if (timeUnit === 'h') standardizedTime *= 3600;

      if (mode === 'speed' && standardizedTime > 0) {
        const standardizedSpeed = standardizedDistance / standardizedTime;
        const speedInKmH = standardizedSpeed * 3.6;
        setSpeed(speedInKmH.toFixed(2));
        setResult(`سرعت = ${formatPersianNumber(speedInKmH)} کیلومتر بر ساعت`);
      } else if (mode === 'distance') {
        standardizedDistance = speedValue * standardizedTime;
        let resultDistance = standardizedDistance;
        if (distanceUnit === 'km') resultDistance /= 1000;
        else if (distanceUnit === 'mi') resultDistance /= 1609.34;
        
        setDistance(resultDistance.toFixed(2));
        setResult(`مسافت = ${formatPersianNumber(resultDistance)} ${
          distanceUnit === 'km' ? 'کیلومتر' : 
          distanceUnit === 'mi' ? 'مایل' : 'متر'
        }`);
      } else if (mode === 'time' && speedValue > 0) {
        standardizedTime = standardizedDistance / speedValue;
        let resultTime = standardizedTime;
        if (timeUnit === 'min') resultTime /= 60;
        else if (timeUnit === 'h') resultTime /= 3600;
        
        setTime(resultTime.toFixed(2));
        setResult(`زمان = ${formatPersianNumber(resultTime)} ${
          timeUnit === 'h' ? 'ساعت' : 
          timeUnit === 'min' ? 'دقیقه' : 'ثانیه'
        }`);
      }
    } catch (error) {
      setResult('خطا در محاسبه');
    }
  };

  const getSpeedPercentage = () => {
    const speedValue = parseFloat(speed);
    if (isNaN(speedValue)) return 0;
    return Math.min((speedValue / 1000) * 100, 100);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "کپی شد!",
      description: "نتیجه در کلیپ‌بورد ذخیره شد.",
    });
  };

  const handleReset = () => {
    setDistance('');
    setTime('');
    setSpeed('');
    setResult('');
  };

  return (
    <div className="space-y-6">

      <CalculatorCard title="محاسبه‌گر سرعت" icon={Gauge} onReset={handleReset}>
        {/* Speed Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">سرعت‌های پرکاربرد:</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {speedPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSpeed(preset.value.speed.toString());
                  setSpeedUnit(preset.value.unit as any);
                }}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculation Mode */}
        <div className="space-y-2">
          <Label>چه چیزی را می‌خواهید محاسبه کنید؟</Label>
          <Select value={mode} onValueChange={(value: any) => setMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">مسافت</SelectItem>
              <SelectItem value="time">زمان</SelectItem>
              <SelectItem value="speed">سرعت</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Distance */}
          <div className="space-y-2">
            <Label htmlFor="distance">مسافت</Label>
            <div className="flex gap-2">
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => handleInputChange(e, 'distance')}
                placeholder="مسافت"
                disabled={mode === 'distance'}
                dir="ltr"
                className="flex-1"
              />
              <Select value={distanceUnit} onValueChange={(value: any) => setDistanceUnit(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">کیلومتر</SelectItem>
                  <SelectItem value="m">متر</SelectItem>
                  <SelectItem value="mi">مایل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label htmlFor="time">زمان</Label>
            <div className="flex gap-2">
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => handleInputChange(e, 'time')}
                placeholder="زمان"
                disabled={mode === 'time'}
                dir="ltr"
                className="flex-1"
              />
              <Select value={timeUnit} onValueChange={(value: any) => setTimeUnit(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h">ساعت</SelectItem>
                  <SelectItem value="min">دقیقه</SelectItem>
                  <SelectItem value="s">ثانیه</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <Label htmlFor="speed">سرعت</Label>
            <div className="flex gap-2">
              <Input
                id="speed"
                type="number"
                value={speed}
                onChange={(e) => handleInputChange(e, 'speed')}
                placeholder="سرعت"
                disabled={mode === 'speed'}
                dir="ltr"
                className="flex-1"
              />
              <Select value={speedUnit} onValueChange={(value: any) => setSpeedUnit(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km/h">km/h</SelectItem>
                  <SelectItem value="m/s">m/s</SelectItem>
                  <SelectItem value="mph">mph</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Speedometer Visualization */}
        {result && mode === 'speed' && parseFloat(speed) > 0 && (
          <VisualizationCard title="سرعت‌سنج">
            <div className="relative w-full h-32 flex items-end justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative w-48 h-24 rounded-t-full bg-gradient-to-t from-muted to-muted/50 border-4 border-border overflow-hidden"
              >
                <div className="absolute inset-0 flex items-end justify-center">
                  <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: (getSpeedPercentage() * 1.8) - 90 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 60 }}
                    className="absolute bottom-0 w-1 h-20 bg-primary rounded-full origin-bottom"
                    style={{ transformOrigin: 'bottom center' }}
                  />
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <Zap className="h-6 w-6 text-primary mx-auto animate-pulse" />
                </div>
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>آهسته</span>
              <span>متوسط</span>
              <span>سریع</span>
            </div>
          </VisualizationCard>
        )}

        {result && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">نتیجه محاسبه:</p>
                <p className="text-lg font-bold text-primary" dir="ltr">{result}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={copyResult}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CalculatorCard>

      <div className="text-sm text-muted-foreground space-y-2 p-4 bg-muted/50 rounded-lg">
        <p className="font-medium">فرمول‌های محاسبه:</p>
        <ul className="space-y-1 mr-4">
          <li>• سرعت = مسافت ÷ زمان</li>
          <li>• مسافت = سرعت × زمان</li>
          <li>• زمان = مسافت ÷ سرعت</li>
        </ul>
      </div>
    </div>
  );
};

export default SpeedCalculator;