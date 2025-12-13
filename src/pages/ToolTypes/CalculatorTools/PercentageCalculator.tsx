import React, { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Percent, TrendingUp, Equal, PieChart, Copy, Check, Keyboard } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { toast } from 'sonner';

export default function PercentageCalculator() {
  const [value, setValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [calcType, setCalcType] = useState<'percentOf' | 'isWhatPercent' | 'percentIncrease'>('percentOf');
  const [visualPercentage, setVisualPercentage] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const copyResult = useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success('نتیجه کپی شد');
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const calculate = () => {
    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numValue) || isNaN(numPercentage)) {
      return;
    }

    if (calcType === 'percentOf') {
      const calculatedResult = (numPercentage / 100) * numValue;
      setResult(`${formatPersianNumber(numPercentage)}% از ${formatPersianNumber(numValue)} = ${formatPersianNumber(calculatedResult)}`);
      setVisualPercentage(Math.min(numPercentage, 100));
    } else if (calcType === 'isWhatPercent') {
      if (numPercentage === 0) {
        setResult('تقسیم بر صفر امکان‌پذیر نیست');
        return;
      }
      const calculatedResult = (numValue / numPercentage) * 100;
      setResult(`${formatPersianNumber(numValue)} = ${formatPersianNumber(calculatedResult)}% از ${formatPersianNumber(numPercentage)}`);
      setVisualPercentage(Math.min(calculatedResult, 100));
    } else if (calcType === 'percentIncrease') {
      if (numValue === 0) {
        setResult('تقسیم بر صفر امکان‌پذیر نیست');
        return;
      }
      const change = numPercentage - numValue;
      const percentChange = (change / numValue) * 100;
      const increaseOrDecrease = percentChange >= 0 ? 'افزایش' : 'کاهش';
      setResult(`تغییر از ${formatPersianNumber(numValue)} به ${formatPersianNumber(numPercentage)}: ${formatPersianNumber(Math.abs(percentChange))}% ${increaseOrDecrease}`);
      setVisualPercentage(Math.min(Math.abs(percentChange), 100));
    }
  };

  const handleReset = useCallback(() => {
    setValue('');
    setPercentage('');
    setResult(null);
    setVisualPercentage(0);
  }, []);

  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: calculate,
      description: 'محاسبه',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: handleReset,
      description: 'پاک کردن',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  const presets = [10, 15, 20, 25, 50, 75];

  return (
    <div className="space-y-6">
      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Keyboard className="w-3 h-3" />
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Enter</kbd>
          محاسبه
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Shift+R</kbd>
          پاک کردن
        </span>
      </div>

      <CalculatorCard title="محاسبه‌گر درصد" icon={Percent} onReset={handleReset}>
        {/* Calculation Type Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={calcType === 'percentOf' ? 'default' : 'outline'}
            onClick={() => setCalcType('percentOf')}
            className="gap-2"
          >
            <PieChart className="h-4 w-4" />
            X% از Y
          </Button>
          <Button
            variant={calcType === 'isWhatPercent' ? 'default' : 'outline'}
            onClick={() => setCalcType('isWhatPercent')}
            className="gap-2"
          >
            <Equal className="h-4 w-4" />
            X چند درصد Y
          </Button>
          <Button
            variant={calcType === 'percentIncrease' ? 'default' : 'outline'}
            onClick={() => setCalcType('percentIncrease')}
            className="gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            درصد تغییر
          </Button>
        </div>

        {/* Quick Presets */}
        {calcType === 'percentOf' && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">درصدهای پرکاربرد:</Label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset}
                  variant="secondary"
                  size="sm"
                  onClick={() => setPercentage(preset.toString())}
                  className="text-xs"
                >
                  {formatPersianNumber(preset)}%
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Fields */}
        {calcType === 'percentOf' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="percentage">درصد (X)</Label>
              <Input
                id="percentage"
                value={percentage}
                onChange={(e) => handleInputChange(e, setPercentage)}
                placeholder="مثال: ۲۰"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">مقدار (Y)</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => handleInputChange(e, setValue)}
                placeholder="مثال: ۱۰۰"
                type="text"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {calcType === 'isWhatPercent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">مقدار اول (X)</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => handleInputChange(e, setValue)}
                placeholder="مثال: ۲۰"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">مقدار دوم (Y)</Label>
              <Input
                id="percentage"
                value={percentage}
                onChange={(e) => handleInputChange(e, setPercentage)}
                placeholder="مثال: ۱۰۰"
                type="text"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {calcType === 'percentIncrease' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">مقدار اولیه</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => handleInputChange(e, setValue)}
                placeholder="مثال: ۱۰۰"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">مقدار نهایی</Label>
              <Input
                id="percentage"
                value={percentage}
                onChange={(e) => handleInputChange(e, setPercentage)}
                placeholder="مثال: ۱۲۰"
                type="text"
                dir="ltr"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={calculate} className="flex-1 gap-2" size="lg">
            <Calculator className="h-5 w-5" />
            محاسبه کن
          </Button>
          {result && (
            <Button onClick={copyResult} variant="outline" size="lg" className="gap-2">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              کپی
            </Button>
          )}
        </div>

        {/* Visual Percentage Chart */}
        {result && visualPercentage > 0 && (
          <VisualizationCard title="نمایش بصری">
            <div className="space-y-3">
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${visualPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full flex items-center justify-center"
                >
                  {visualPercentage > 15 && (
                    <span className="text-xs font-bold text-primary-foreground px-2">
                      {formatPersianNumber(visualPercentage)}%
                    </span>
                  )}
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>۰%</span>
                <span>۱۰۰%</span>
              </div>
            </div>
          </VisualizationCard>
        )}

        {result && <OutcomeInfoCard outcome={result} />}
      </CalculatorCard>
    </div>
  );
}