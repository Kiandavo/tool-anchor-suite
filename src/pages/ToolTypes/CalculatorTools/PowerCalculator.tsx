
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Zap } from "lucide-react";

export default function PowerCalculator() {
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('ac-single');
  const [result, setResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Clear error message when inputs change
  const clearError = () => {
    if (errorMsg) setErrorMsg('');
  };
  
  // Format number with thousands separator
  const formatNumber = (value: number): string => {
    return value.toLocaleString('fa-IR');
  };
  
  // Calculate power based on the active tab
  const calculatePower = () => {
    setErrorMsg('');
    setResult('');
    
    try {
      switch(activeTab) {
        case 'ac-single': {
          // P = V * I (Single phase)
          const v = parseFloat(voltage.replace(/,/g, ''));
          const i = parseFloat(current.replace(/,/g, ''));
          
          if (isNaN(v) || isNaN(i)) {
            setErrorMsg('لطفاً مقادیر ولتاژ و جریان را وارد کنید.');
            return;
          }
          
          const p = v * i;
          const apparentPower = p; // VA (Volt-Ampere)
          const powerFactor = 1.0;
          
          // Format result
          setResult(
            `نتایج محاسبه توان الکتریکی (تکفاز):\n\n` +
            `ولتاژ: ${formatNumber(v)} ولت\n` +
            `جریان: ${formatNumber(i)} آمپر\n` +
            `توان اکتیو: ${formatNumber(p)} وات\n` +
            `توان ظاهری: ${formatNumber(apparentPower)} ولت‌آمپر\n` +
            `ضریب توان: ${powerFactor}`
          );
          break;
        }
        
        case 'ac-three': {
          // P = √3 * V * I (Three phase)
          const v = parseFloat(voltage.replace(/,/g, ''));
          const i = parseFloat(current.replace(/,/g, ''));
          
          if (isNaN(v) || isNaN(i)) {
            setErrorMsg('لطفاً مقادیر ولتاژ و جریان را وارد کنید.');
            return;
          }
          
          const sqrt3 = Math.sqrt(3);
          const p = sqrt3 * v * i;
          const apparentPower = p; // VA (Volt-Ampere)
          const powerFactor = 1.0;
          
          // Format result
          setResult(
            `نتایج محاسبه توان الکتریکی (سه‌فاز):\n\n` +
            `ولتاژ خط: ${formatNumber(v)} ولت\n` +
            `جریان خط: ${formatNumber(i)} آمپر\n` +
            `توان اکتیو: ${formatNumber(p)} وات\n` +
            `توان ظاهری: ${formatNumber(apparentPower)} ولت‌آمپر\n` +
            `ضریب توان: ${powerFactor}`
          );
          break;
        }
        
        case 'dc': {
          // P = V * I (DC)
          const v = parseFloat(voltage.replace(/,/g, ''));
          const i = parseFloat(current.replace(/,/g, ''));
          
          if (isNaN(v) || isNaN(i)) {
            setErrorMsg('لطفاً مقادیر ولتاژ و جریان را وارد کنید.');
            return;
          }
          
          const p = v * i;
          
          // Alternative calculation using resistance
          let pFromR = null;
          if (resistance) {
            const r = parseFloat(resistance.replace(/,/g, ''));
            if (!isNaN(r) && r > 0) {
              pFromR = Math.pow(v, 2) / r; // P = V²/R
            }
          }
          
          // Format result
          let resultText = 
            `نتایج محاسبه توان الکتریکی (DC):\n\n` +
            `ولتاژ: ${formatNumber(v)} ولت\n` +
            `جریان: ${formatNumber(i)} آمپر\n` +
            `توان: ${formatNumber(p)} وات\n`;
            
          if (pFromR !== null) {
            const r = parseFloat(resistance.replace(/,/g, ''));
            resultText += `مقاومت: ${formatNumber(r)} اهم\n`;
            resultText += `توان (محاسبه شده با مقاومت): ${formatNumber(pFromR)} وات\n`;
          }
          
          setResult(resultText);
          break;
        }
        
        case 'resistance': {
          // P = I²R or P = V²/R
          const r = parseFloat(resistance.replace(/,/g, ''));
          const v = parseFloat(voltage.replace(/,/g, ''));
          const i = parseFloat(current.replace(/,/g, ''));
          
          if ((isNaN(i) || isNaN(r)) && (isNaN(v) || isNaN(r))) {
            setErrorMsg('لطفاً مقاومت و حداقل یکی از مقادیر ولتاژ یا جریان را وارد کنید.');
            return;
          }
          
          if (!isNaN(i) && !isNaN(r)) {
            const p = Math.pow(i, 2) * r; // P = I²R
            const calculatedV = i * r; // V = IR
            
            setResult(
              `نتایج محاسبه توان با استفاده از مقاومت و جریان:\n\n` +
              `جریان: ${formatNumber(i)} آمپر\n` +
              `مقاومت: ${formatNumber(r)} اهم\n` +
              `توان: ${formatNumber(p)} وات\n` +
              `ولتاژ محاسبه شده: ${formatNumber(calculatedV)} ولت`
            );
          } else if (!isNaN(v) && !isNaN(r)) {
            const p = Math.pow(v, 2) / r; // P = V²/R
            const calculatedI = v / r; // I = V/R
            
            setResult(
              `نتایج محاسبه توان با استفاده از مقاومت و ولتاژ:\n\n` +
              `ولتاژ: ${formatNumber(v)} ولت\n` +
              `مقاومت: ${formatNumber(r)} اهم\n` +
              `توان: ${formatNumber(p)} وات\n` +
              `جریان محاسبه شده: ${formatNumber(calculatedI)} آمپر`
            );
          }
          break;
        }
      }
    } catch (error) {
      console.error('Error calculating power:', error);
      setErrorMsg('خطا در محاسبه. لطفاً مقادیر را بررسی کنید.');
    }
  };
  
  // Format input to add thousand separators
  const handleNumericInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    clearError();
    const numberValue = value.replace(/[^\d.]/g, '');
    
    if (numberValue === '') {
      setter('');
      return;
    }
    
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Zap className="h-5 w-5" />
          محاسبه‌گر توان الکتریکی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ac-single" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="ac-single">تکفاز AC</TabsTrigger>
            <TabsTrigger value="ac-three">سه‌فاز AC</TabsTrigger>
            <TabsTrigger value="dc">DC</TabsTrigger>
            <TabsTrigger value="resistance">محاسبه با مقاومت</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voltage">ولتاژ (V)</Label>
                <Input 
                  id="voltage"
                  value={voltage}
                  onChange={(e) => handleNumericInput(e.target.value, setVoltage)}
                  placeholder="مقدار ولتاژ به ولت"
                  className="mt-1"
                  dir="ltr"
                />
              </div>
              <div>
                <Label htmlFor="current">جریان (A)</Label>
                <Input 
                  id="current"
                  value={current}
                  onChange={(e) => handleNumericInput(e.target.value, setCurrent)}
                  placeholder="مقدار جریان به آمپر"
                  className="mt-1"
                  dir="ltr"
                />
              </div>
            </div>
            
            {(activeTab === 'dc' || activeTab === 'resistance') && (
              <div>
                <Label htmlFor="resistance">مقاومت (Ω)</Label>
                <Input 
                  id="resistance"
                  value={resistance}
                  onChange={(e) => handleNumericInput(e.target.value, setResistance)}
                  placeholder="مقدار مقاومت به اهم"
                  className="mt-1"
                  dir="ltr"
                />
              </div>
            )}
            
            {errorMsg && (
              <div className="text-red-500 text-sm py-1">
                {errorMsg}
              </div>
            )}
            
            <Button onClick={calculatePower} className="w-full">محاسبه توان</Button>
          </div>
        </Tabs>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
