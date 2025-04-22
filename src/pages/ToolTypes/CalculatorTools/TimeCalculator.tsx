
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertTime } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Plus, Minus, Clock } from 'lucide-react';

export default function TimeCalculator() {
  // For time addition and subtraction
  const [time1, setTime1] = useState({ hours: '', minutes: '', seconds: '' });
  const [time2, setTime2] = useState({ hours: '', minutes: '', seconds: '' });
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<string | null>(null);
  
  // For time conversion
  const [conversionTime, setConversionTime] = useState({ hours: '', minutes: '', seconds: '' });
  const [conversionResult, setConversionResult] = useState<string | null>(null);

  const handleTimeCalc = () => {
    // Validate inputs
    const hours1 = parseInt(time1.hours) || 0;
    const minutes1 = parseInt(time1.minutes) || 0;
    const seconds1 = parseInt(time1.seconds) || 0;
    
    const hours2 = parseInt(time2.hours) || 0;
    const minutes2 = parseInt(time2.minutes) || 0;
    const seconds2 = parseInt(time2.seconds) || 0;
    
    if (operation === 'add') {
      // Add times
      let totalSeconds = seconds1 + seconds2;
      let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
      totalSeconds %= 60;
      
      let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
      
      const days = Math.floor(totalHours / 24);
      totalHours %= 24;
      
      let resultText = '';
      if (days > 0) {
        resultText += `${days} روز و `;
      }
      
      resultText += `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
      setResult(resultText);
    } else {
      // Convert times to seconds
      const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
      const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
      
      // Check if second time is greater than first time for subtraction
      if (totalSeconds2 > totalSeconds1) {
        setResult("زمان دوم نمی‌تواند بیشتر از زمان اول باشد");
        return;
      }
      
      // Calculate difference
      let diffSeconds = totalSeconds1 - totalSeconds2;
      
      // Convert back to hours, minutes, seconds
      const hours = Math.floor(diffSeconds / 3600);
      diffSeconds %= 3600;
      const minutes = Math.floor(diffSeconds / 60);
      diffSeconds %= 60;
      
      setResult(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${diffSeconds.toString().padStart(2, '0')}`);
    }
  };

  const handleTimeConversion = () => {
    const hours = parseInt(conversionTime.hours) || 0;
    const minutes = parseInt(conversionTime.minutes) || 0;
    const seconds = parseInt(conversionTime.seconds) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setConversionResult("لطفاً مقادیر زمان را وارد کنید");
      return;
    }
    
    const converted = convertTime(hours, minutes, seconds);
    
    let resultText = '';
    if (converted.days > 0) {
      resultText += `${converted.days.toLocaleString('fa-IR')} روز و ${Math.floor(converted.remainingHours).toLocaleString('fa-IR')} ساعت\n`;
    }
    
    resultText += `کل ثانیه‌ها: ${converted.totalSeconds.toLocaleString('fa-IR')}\n`;
    resultText += `کل دقیقه‌ها: ${converted.totalMinutes.toFixed(2).toLocaleString('fa-IR')}\n`;
    resultText += `کل ساعت‌ها: ${converted.totalHours.toFixed(2).toLocaleString('fa-IR')}`;
    
    setConversionResult(resultText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Clock className="ml-2 h-5 w-5" />
          محاسبه‌گر زمان
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="calculator" className="flex-1">محاسبه زمان</TabsTrigger>
            <TabsTrigger value="converter" className="flex-1">تبدیل زمان</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="flex justify-center space-x-4 space-x-reverse mb-4">
              <Button
                onClick={() => { setOperation('add'); setResult(null); }}
                variant={operation === 'add' ? "default" : "outline"}
              >
                <Plus className="ml-2 h-4 w-4" />
                جمع
              </Button>
              <Button
                onClick={() => { setOperation('subtract'); setResult(null); }}
                variant={operation === 'subtract' ? "default" : "outline"}
              >
                <Minus className="ml-2 h-4 w-4" />
                تفریق
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>زمان اول</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="hours1">ساعت</Label>
                    <Input
                      id="hours1"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="99"
                      value={time1.hours}
                      onChange={(e) => setTime1({...time1, hours: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minutes1">دقیقه</Label>
                    <Input
                      id="minutes1"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="59"
                      value={time1.minutes}
                      onChange={(e) => setTime1({...time1, minutes: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seconds1">ثانیه</Label>
                    <Input
                      id="seconds1"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="59"
                      value={time1.seconds}
                      onChange={(e) => setTime1({...time1, seconds: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label>زمان دوم</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="hours2">ساعت</Label>
                    <Input
                      id="hours2"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="99"
                      value={time2.hours}
                      onChange={(e) => setTime2({...time2, hours: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minutes2">دقیقه</Label>
                    <Input
                      id="minutes2"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="59"
                      value={time2.minutes}
                      onChange={(e) => setTime2({...time2, minutes: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seconds2">ثانیه</Label>
                    <Input
                      id="seconds2"
                      type="number"
                      placeholder="0"
                      min="0"
                      max="59"
                      value={time2.seconds}
                      onChange={(e) => setTime2({...time2, seconds: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleTimeCalc} className="w-full">
                <Calculator className="ml-2 h-5 w-5" />
                {operation === 'add' ? 'جمع زمان‌ها' : 'تفریق زمان‌ها'}
              </Button>
              
              {result && <OutcomeInfoCard outcome={`نتیجه: ${result}`} />}
            </div>
          </TabsContent>
          
          <TabsContent value="converter" className="space-y-6">
            <div className="space-y-4">
              <Label>زمان برای تبدیل</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="convHours">ساعت</Label>
                  <Input
                    id="convHours"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={conversionTime.hours}
                    onChange={(e) => setConversionTime({...conversionTime, hours: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="convMinutes">دقیقه</Label>
                  <Input
                    id="convMinutes"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="59"
                    value={conversionTime.minutes}
                    onChange={(e) => setConversionTime({...conversionTime, minutes: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="convSeconds">ثانیه</Label>
                  <Input
                    id="convSeconds"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="59"
                    value={conversionTime.seconds}
                    onChange={(e) => setConversionTime({...conversionTime, seconds: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleTimeConversion} className="w-full">
                <Calculator className="ml-2 h-5 w-5" />
                تبدیل زمان
              </Button>
              
              {conversionResult && <OutcomeInfoCard outcome={conversionResult} />}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
