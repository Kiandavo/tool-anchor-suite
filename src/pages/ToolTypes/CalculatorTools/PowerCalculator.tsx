import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Lightbulb, DollarSign } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

type CalculatorMode = 'ohm' | 'cost' | 'power';

export default function PowerCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('ohm');
  
  // Ohm's Law
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  
  // Power & Cost
  const [power, setPower] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [pricePerKwh, setPricePerKwh] = useState<string>('1500'); // Default Iranian electricity price
  
  const [result, setResult] = useState<string | null>(null);

  const appliances = [
    { name: 'لامپ LED', power: 10 },
    { name: 'تلویزیون', power: 100 },
    { name: 'یخچال', power: 150 },
    { name: 'کولر', power: 2000 },
    { name: 'ماشین لباسشویی', power: 500 },
  ];

  const calculateOhm = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    let resultText = 'قانون اهم (V = I × R):\n\n';

    if (!isNaN(v) && !isNaN(i)) {
      const calculatedR = v / i;
      setResistance(calculatedR.toFixed(2));
      resultText += `مقاومت = ${formatPersianNumber(calculatedR)} اهم\n`;
      resultText += `توان = ${formatPersianNumber(v * i)} وات`;
    } else if (!isNaN(v) && !isNaN(r)) {
      const calculatedI = v / r;
      setCurrent(calculatedI.toFixed(2));
      resultText += `جریان = ${formatPersianNumber(calculatedI)} آمپر\n`;
      resultText += `توان = ${formatPersianNumber(v * calculatedI)} وات`;
    } else if (!isNaN(i) && !isNaN(r)) {
      const calculatedV = i * r;
      setVoltage(calculatedV.toFixed(2));
      resultText += `ولتاژ = ${formatPersianNumber(calculatedV)} ولت\n`;
      resultText += `توان = ${formatPersianNumber(calculatedV * i)} وات`;
    } else {
      resultText = 'لطفاً حداقل دو مقدار را وارد کنید';
    }

    setResult(resultText);
  };

  const calculateCost = () => {
    const p = parseFloat(power);
    const h = parseFloat(hours);
    const price = parseFloat(pricePerKwh);

    if (isNaN(p) || isNaN(h) || isNaN(price)) {
      setResult('لطفاً تمام مقادیر را وارد کنید');
      return;
    }

    const energyKwh = (p * h) / 1000;
    const cost = energyKwh * price;
    const dailyCost = cost;
    const monthlyCost = cost * 30;
    const yearlyCost = cost * 365;

    setResult(
      `محاسبه هزینه برق:\n\n` +
      `انرژی مصرفی: ${formatPersianNumber(energyKwh)} کیلووات‌ساعت\n` +
      `هزینه روزانه: ${formatPersianNumber(dailyCost)} تومان\n` +
      `هزینه ماهانه: ${formatPersianNumber(monthlyCost)} تومان\n` +
      `هزینه سالانه: ${formatPersianNumber(yearlyCost)} تومان`
    );
  };

  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setHours('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="محاسبه‌گر توان الکتریکی" icon={Zap} onReset={handleReset}>
        {/* Mode Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={mode === 'ohm' ? 'default' : 'outline'}
            onClick={() => setMode('ohm')}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            قانون اهم
          </Button>
          <Button
            variant={mode === 'cost' ? 'default' : 'outline'}
            onClick={() => setMode('cost')}
            className="gap-2"
          >
            <DollarSign className="h-4 w-4" />
            هزینه برق
          </Button>
          <Button
            variant={mode === 'power' ? 'default' : 'outline'}
            onClick={() => setMode('power')}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            دستگاه‌ها
          </Button>
        </div>

        {mode === 'ohm' && (
          <>
            <VisualizationCard title="مثلث قانون اهم">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <div className="relative w-48 h-40">
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    <polygon
                      points="100,20 20,140 180,140"
                      fill="hsl(var(--primary)/0.1)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    <line x1="100" y1="80" x2="20" y2="140" stroke="hsl(var(--border))" strokeWidth="1" />
                    <line x1="100" y1="80" x2="180" y2="140" stroke="hsl(var(--border))" strokeWidth="1" />
                    <text x="100" y="50" textAnchor="middle" fill="hsl(var(--primary))" className="font-bold text-lg">V</text>
                    <text x="50" y="155" textAnchor="middle" fill="hsl(var(--foreground))" className="font-medium">I</text>
                    <text x="150" y="155" textAnchor="middle" fill="hsl(var(--foreground))" className="font-medium">R</text>
                  </svg>
                </div>
              </motion.div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                V = I × R
              </p>
            </VisualizationCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voltage">ولتاژ (V)</Label>
                <Input
                  id="voltage"
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="220"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current">جریان (A)</Label>
                <Input
                  id="current"
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="2"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resistance">مقاومت (Ω)</Label>
                <Input
                  id="resistance"
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  placeholder="110"
                  dir="ltr"
                />
              </div>
            </div>

            <Button onClick={calculateOhm} className="w-full gap-2" size="lg">
              <Zap className="h-5 w-5" />
              محاسبه
            </Button>
          </>
        )}

        {mode === 'cost' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="power">توان دستگاه (وات)</Label>
                <Input
                  id="power"
                  type="number"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="100"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">ساعت استفاده روزانه</Label>
                <Input
                  id="hours"
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="8"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">قیمت هر کیلووات‌ساعت (تومان)</Label>
                <Input
                  id="price"
                  type="number"
                  value={pricePerKwh}
                  onChange={(e) => setPricePerKwh(e.target.value)}
                  placeholder="1500"
                  dir="ltr"
                />
              </div>
            </div>

            <Button onClick={calculateCost} className="w-full gap-2" size="lg">
              <DollarSign className="h-5 w-5" />
              محاسبه هزینه
            </Button>
          </>
        )}

        {mode === 'power' && (
          <div className="space-y-4">
            <Label>دستگاه‌های خانگی رایج:</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appliances.map((appliance) => (
                <Button
                  key={appliance.name}
                  variant="outline"
                  onClick={() => {
                    setPower(appliance.power.toString());
                    setMode('cost');
                  }}
                  className="justify-between h-auto py-4"
                >
                  <span className="font-medium">{appliance.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatPersianNumber(appliance.power)} وات
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {result && <OutcomeInfoCard outcome={result} />}
      </CalculatorCard>
    </div>
  );
}