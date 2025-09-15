import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, Zap } from "lucide-react";
import { ToolInfoCard } from '@/components/ToolInfoCard';

const SpeedCalculator = () => {
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [speed, setSpeed] = useState<string>("");
  const [distanceUnit, setDistanceUnit] = useState<string>("km");
  const [timeUnit, setTimeUnit] = useState<string>("hour");
  const [speedUnit, setSpeedUnit] = useState<string>("kmh");
  const [calculationType, setCalculationType] = useState<string>("speed");
  const [result, setResult] = useState<string>("");

  const distanceUnits = {
    km: "کیلومتر",
    m: "متر",
    mile: "مایل"
  };

  const timeUnits = {
    hour: "ساعت",
    minute: "دقیقه", 
    second: "ثانیه"
  };

  const speedUnits = {
    kmh: "کیلومتر بر ساعت",
    ms: "متر بر ثانیه",
    mph: "مایل بر ساعت"
  };

  const convertDistance = (value: number, from: string, to: string = "km"): number => {
    const conversions = { km: 1, m: 0.001, mile: 1.60934 };
    return (value * conversions[from as keyof typeof conversions]) / conversions[to as keyof typeof conversions];
  };

  const convertTime = (value: number, from: string, to: string = "hour"): number => {
    const conversions = { hour: 1, minute: 1/60, second: 1/3600 };
    return (value * conversions[from as keyof typeof conversions]) / conversions[to as keyof typeof conversions];
  };

  const convertSpeed = (value: number, from: string, to: string): number => {
    // Convert everything to km/h first, then to target unit
    let kmh = value;
    if (from === "ms") kmh = value * 3.6;
    if (from === "mph") kmh = value * 1.60934;
    
    if (to === "ms") return kmh / 3.6;
    if (to === "mph") return kmh / 1.60934;
    return kmh; // already km/h
  };

  const calculate = () => {
    try {
      if (calculationType === "speed") {
        if (!distance || !time) {
          setResult("لطفاً مسافت و زمان را وارد کنید");
          return;
        }
        
        const distanceInKm = convertDistance(parseFloat(distance), distanceUnit);
        const timeInHours = convertTime(parseFloat(time), timeUnit);
        const calculatedSpeed = distanceInKm / timeInHours;
        const finalSpeed = convertSpeed(calculatedSpeed, "kmh", speedUnit);
        
        setResult(`سرعت: ${finalSpeed.toFixed(2)} ${speedUnits[speedUnit as keyof typeof speedUnits]}`);
        
      } else if (calculationType === "distance") {
        if (!speed || !time) {
          setResult("لطفاً سرعت و زمان را وارد کنید");
          return;
        }
        
        const speedInKmh = convertSpeed(parseFloat(speed), speedUnit, "kmh");
        const timeInHours = convertTime(parseFloat(time), timeUnit);
        const calculatedDistance = speedInKmh * timeInHours;
        const finalDistance = convertDistance(calculatedDistance, "km", distanceUnit);
        
        setResult(`مسافت: ${finalDistance.toFixed(2)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits]}`);
        
      } else if (calculationType === "time") {
        if (!distance || !speed) {
          setResult("لطفاً مسافت و سرعت را وارد کنید");
          return;
        }
        
        const distanceInKm = convertDistance(parseFloat(distance), distanceUnit);
        const speedInKmh = convertSpeed(parseFloat(speed), speedUnit, "kmh");
        const calculatedTime = distanceInKm / speedInKmh;
        const finalTime = convertTime(calculatedTime, "hour", timeUnit);
        
        setResult(`زمان: ${finalTime.toFixed(2)} ${timeUnits[timeUnit as keyof typeof timeUnits]}`);
      }
    } catch (error) {
      setResult("خطا در برآورد. لطفاً اعداد معتبر وارد کنید.");
    }
  };

  const clearAll = () => {
    setDistance("");
    setTime("");
    setSpeed("");
    setResult("");
  };

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name="ماشین حساب سرعت"
        description="با این ابزار می‌توانید سرعت، مسافت یا زمان را بر اساس دو مقدار دیگر محاسبه کنید. از واحدهای مختلف پشتیبانی می‌کند و تبدیل خودکار انجام می‌دهد."
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            ماشین حساب سرعت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="calculation-type">نوع محاسبه:</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع محاسبه را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speed">محاسبه سرعت</SelectItem>
                <SelectItem value="distance">محاسبه مسافت</SelectItem>
                <SelectItem value="time">محاسبه زمان</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculationType !== "distance" && (
              <div className="space-y-2">
                <Label htmlFor="distance">مسافت:</Label>
                <div className="flex gap-2">
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="مسافت را وارد کنید"
                  />
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(distanceUnits).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {calculationType !== "time" && (
              <div className="space-y-2">
                <Label htmlFor="time">زمان:</Label>
                <div className="flex gap-2">
                  <Input
                    id="time"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="زمان را وارد کنید"
                  />
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(timeUnits).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {calculationType !== "speed" && (
              <div className="space-y-2">
                <Label htmlFor="speed">سرعت:</Label>
                <div className="flex gap-2">
                  <Input
                    id="speed"
                    type="number"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    placeholder="سرعت را وارد کنید"
                  />
                  <Select value={speedUnit} onValueChange={setSpeedUnit}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(speedUnits).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button onClick={calculate} className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
               برآورد
            </Button>
            <Button variant="outline" onClick={clearAll}>
              پاک کردن
            </Button>
          </div>

          {result && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">نتیجه:</h3>
              <p className="text-lg">{result}</p>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>نکته:</strong> فرمول سرعت: سرعت = مسافت ÷ زمان</p>
            <p>این ابزار از تبدیل خودکار واحدها پشتیبانی می‌کند.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeedCalculator;