
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GaugeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Speed calculation modes
type CalculationMode = 'distance' | 'time' | 'speed';

const SpeedCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalculationMode>('speed');
  const [distance, setDistance] = useState<string>('100');
  const [time, setTime] = useState<string>('2');
  const [speed, setSpeed] = useState<string>('50');
  const [distanceUnit, setDistanceUnit] = useState<string>('km');
  const [timeUnit, setTimeUnit] = useState<string>('h');
  const [result, setResult] = useState<string>('');

  const distanceUnits = [
    { label: 'متر', value: 'm' },
    { label: 'کیلومتر', value: 'km' },
    { label: 'مایل', value: 'mi' },
  ];

  const timeUnits = [
    { label: 'ثانیه', value: 's' },
    { label: 'دقیقه', value: 'min' },
    { label: 'ساعت', value: 'h' },
  ];

  useEffect(() => {
    calculateResult();
  }, [distance, time, speed, distanceUnit, timeUnit, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const calculateResult = () => {
    try {
      // Convert inputs to numbers
      const distanceValue = parseFloat(distance) || 0;
      const timeValue = parseFloat(time) || 0;
      const speedValue = parseFloat(speed) || 0;

      // Apply unit conversions to standardized units (meters and seconds)
      let standardizedDistance = distanceValue;
      if (distanceUnit === 'km') standardizedDistance *= 1000;
      else if (distanceUnit === 'mi') standardizedDistance *= 1609.34;

      let standardizedTime = timeValue;
      if (timeUnit === 'min') standardizedTime *= 60;
      else if (timeUnit === 'h') standardizedTime *= 3600;

      let standardizedSpeed = speedValue;
      
      // Calculate based on mode
      if (mode === 'speed' && standardizedTime > 0) {
        standardizedSpeed = standardizedDistance / standardizedTime;
        // Convert to km/h for display
        const speedInKmH = standardizedSpeed * 3.6;
        setSpeed(speedInKmH.toFixed(2));
        setResult(`سرعت = ${speedInKmH.toFixed(2)} کیلومتر بر ساعت`);
      } else if (mode === 'distance') {
        standardizedDistance = standardizedSpeed * standardizedTime;
        // Convert to selected unit
        let resultDistance = standardizedDistance;
        if (distanceUnit === 'km') resultDistance /= 1000;
        else if (distanceUnit === 'mi') resultDistance /= 1609.34;
        
        setDistance(resultDistance.toFixed(2));
        setResult(`مسافت = ${resultDistance.toFixed(2)} ${
          distanceUnit === 'km' ? 'کیلومتر' : 
          distanceUnit === 'mi' ? 'مایل' : 'متر'
        }`);
      } else if (mode === 'time' && standardizedSpeed > 0) {
        standardizedTime = standardizedDistance / standardizedSpeed;
        // Convert to selected unit
        let resultTime = standardizedTime;
        if (timeUnit === 'min') resultTime /= 60;
        else if (timeUnit === 'h') resultTime /= 3600;
        
        setTime(resultTime.toFixed(2));
        setResult(`زمان = ${resultTime.toFixed(2)} ${
          timeUnit === 'h' ? 'ساعت' : 
          timeUnit === 'min' ? 'دقیقه' : 'ثانیه'
        }`);
      }
    } catch (error) {
      setResult('خطا در محاسبه');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "کپی شد!",
      description: "نتیجه در کلیپ‌بورد ذخیره شد.",
      duration: 2000,
    });
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <GaugeIcon className="h-5 w-5" />
          محاسبه سرعت، زمان و مسافت
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calculation-mode">محاسبه</Label>
            <Select value={mode} onValueChange={(value) => setMode(value as CalculationMode)}>
              <SelectTrigger id="calculation-mode">
                <SelectValue placeholder="انتخاب حالت محاسبه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speed">محاسبه سرعت</SelectItem>
                <SelectItem value="distance">محاسبه مسافت</SelectItem>
                <SelectItem value="time">محاسبه زمان</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distance">مسافت</Label>
            <div className="flex gap-2">
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => handleInputChange(e, setDistance)}
                placeholder="مسافت را وارد کنید"
                className="text-left"
                disabled={mode === 'distance'}
              />
              <Select 
                value={distanceUnit} 
                onValueChange={setDistanceUnit}
                disabled={mode === 'distance'}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {distanceUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">زمان</Label>
            <div className="flex gap-2">
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => handleInputChange(e, setTime)}
                placeholder="زمان را وارد کنید"
                className="text-left"
                disabled={mode === 'time'}
              />
              <Select 
                value={timeUnit} 
                onValueChange={setTimeUnit}
                disabled={mode === 'time'}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeUnits.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="speed">سرعت (کیلومتر بر ساعت)</Label>
          <Input
            id="speed"
            type="number"
            value={speed}
            onChange={(e) => handleInputChange(e, setSpeed)}
            placeholder="سرعت را وارد کنید"
            className="text-left"
            disabled={mode === 'speed'}
          />
        </div>

        <div className="space-y-2">
          <Label>نتیجه</Label>
          <div className="flex gap-2">
            <div className="p-3 border rounded-md flex-1 bg-gray-50">
              {result || 'لطفاً مقادیر را وارد کنید'}
            </div>
            <Button onClick={copyResult} disabled={!result}>
              کپی
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedCalculator;
