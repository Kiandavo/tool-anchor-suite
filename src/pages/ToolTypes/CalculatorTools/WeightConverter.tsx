import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { weightUnits, convertUnit, Unit } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Scale, ArrowLeftRight } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

const WeightConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Unit>(weightUnits[0]);
  const [toUnit, setToUnit] = useState<Unit>(weightUnits[1]);
  const [results, setResults] = useState<{ unit: Unit; value: number }[]>([]);

  useEffect(() => {
    handleCalculate();
  }, [amount, fromUnit, toUnit]);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      const allResults = weightUnits.map(unit => ({
        unit,
        value: convertUnit(numAmount, fromUnit, unit)
      }));
      setResults(allResults);
    } else {
      setResults([]);
    }
  };

  const handleReset = () => {
    setAmount('');
    setResults([]);
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getWeightComparison = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return null;

    const kgValue = convertUnit(numAmount, fromUnit, weightUnits.find(u => u.symbol === 'kg')!);
    
    if (kgValue < 0.5) return { emoji: '🍎', text: `حدود ${Math.round(kgValue * 5)} سیب` };
    if (kgValue < 5) return { emoji: '🐱', text: 'وزن یک گربه' };
    if (kgValue < 30) return { emoji: '🐕', text: 'وزن یک سگ' };
    if (kgValue < 70) return { emoji: '👤', text: 'وزن یک فرد متوسط' };
    if (kgValue < 200) return { emoji: '🏍️', text: 'وزن یک موتورسیکلت' };
    if (kgValue < 1500) return { emoji: '🚗', text: 'وزن یک خودرو' };
    return { emoji: '🐘', text: 'وزن یک فیل' };
  };

  const comparison = getWeightComparison();

  return (
    <div className="space-y-6">
      <CalculatorCard title="تبدیل واحدهای وزن" icon={Scale} onReset={handleReset}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>مقدار</Label>
            <Input
              type="number"
              placeholder="مقدار وزن را وارد کنید"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
            <div className="space-y-2">
              <Label>از واحد</Label>
              <Select
                value={fromUnit.name}
                onValueChange={(value) => {
                  const unit = weightUnits.find(u => u.name === value);
                  if (unit) setFromUnit(unit);
                }}
              >
                <SelectTrigger>
                  <SelectValue>{fromUnit.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapUnits}
              className="mb-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label>به واحد</Label>
              <Select
                value={toUnit.name}
                onValueChange={(value) => {
                  const unit = weightUnits.find(u => u.name === value);
                  if (unit) setToUnit(unit);
                }}
              >
                <SelectTrigger>
                  <SelectValue>{toUnit.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {weightUnits.map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
          <>
            <OutcomeInfoCard
              outcome={`${formatPersianNumber(parseFloat(amount))} ${fromUnit.name} = ${formatPersianNumber(convertUnit(parseFloat(amount), fromUnit, toUnit))} ${toUnit.name}`}
            />

            {comparison && (
              <VisualizationCard title="مقایسه تقریبی">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="text-center space-y-2"
                >
                  <div className="text-4xl">{comparison.emoji}</div>
                  <p className="text-sm font-medium text-muted-foreground">{comparison.text}</p>
                </motion.div>
              </VisualizationCard>
            )}
            
            <div className="rounded-xl border bg-muted/30 overflow-hidden">
              <div className="px-4 py-3 border-b bg-muted/50 font-medium text-sm">
                تمام تبدیل‌ها
              </div>
              <div className="divide-y">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex justify-between items-center px-4 py-3 hover:bg-muted/20 transition-colors"
                  >
                    <span className="font-medium">{result.unit.name}</span>
                    <span className="text-primary font-bold">
                      {formatPersianNumber(result.value)} {result.unit.symbol}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </CalculatorCard>
    </div>
  );
};

export default WeightConverter;