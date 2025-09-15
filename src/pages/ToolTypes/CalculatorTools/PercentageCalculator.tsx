
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Percent } from 'lucide-react';

export default function PercentageCalculator() {
  const [value, setValue] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [calcType, setCalcType] = useState<'percentOf' | 'isWhatPercent' | 'percentIncrease'>('percentOf');

  const calculate = () => {
    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numValue) || isNaN(numPercentage)) {
      return;
    }

    // Helper function to format numbers precisely without approximation
    const formatPreciseNumber = (num: number): string => {
      // Keep exact precision and format with Persian numerals
      const formatted = num.toString();
      return formatted.replace(/\./g, '.').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
    };

    if (calcType === 'percentOf') {
      // Calculate X% of Y
      const calculatedResult = (numPercentage / 100) * numValue;
      const formattedResult = formatPreciseNumber(calculatedResult);
      setResult(`${formatPreciseNumber(numPercentage)}% از ${formatPreciseNumber(numValue)} برابر است با ${formattedResult}`);
    } else if (calcType === 'isWhatPercent') {
      // X is what percent of Y
      if (numPercentage === 0) {
        setResult('تقسیم بر صفر امکان‌پذیر نیست');
        return;
      }
      const calculatedResult = (numValue / numPercentage) * 100;
      const formattedResult = formatPreciseNumber(calculatedResult);
      setResult(`${formatPreciseNumber(numValue)} برابر است با ${formattedResult}% از ${formatPreciseNumber(numPercentage)}`);
    } else if (calcType === 'percentIncrease') {
      // Percent increase/decrease from X to Y
      if (numValue === 0) {
        setResult('تقسیم بر صفر امکان‌پذیر نیست');
        return;
      }
      const change = numPercentage - numValue;
      const percentChange = (change / numValue) * 100;
      const increaseOrDecrease = percentChange >= 0 ? 'افزایش' : 'کاهش';
      const formattedChange = formatPreciseNumber(Math.abs(percentChange));
      setResult(`تغییر از ${formatPreciseNumber(numValue)} به ${formatPreciseNumber(numPercentage)} برابر است با ${formattedChange}% ${increaseOrDecrease}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Percent className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر درصد</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button
                onClick={() => setCalcType('percentOf')}
                className={`px-4 py-2 rounded-md ${calcType === 'percentOf' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                محاسبه X درصد از Y
              </button>
              <button
                onClick={() => setCalcType('isWhatPercent')}
                className={`px-4 py-2 rounded-md ${calcType === 'isWhatPercent' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                X چند درصد از Y است
              </button>
              <button
                onClick={() => setCalcType('percentIncrease')}
                className={`px-4 py-2 rounded-md ${calcType === 'percentIncrease' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                درصد تغییر
              </button>
            </div>
          </div>

          {calcType === 'percentOf' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="percentage">درصد (X)</Label>
                <Input
                  id="percentage"
                  value={percentage}
                  onChange={(e) => handleInputChange(e, setPercentage)}
                  placeholder="مثال: 20"
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
                  placeholder="مثال: 100"
                  type="text"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {calcType === 'isWhatPercent' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="value">مقدار اول (X)</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => handleInputChange(e, setValue)}
                  placeholder="مثال: 20"
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
                  placeholder="مثال: 100"
                  type="text"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {calcType === 'percentIncrease' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="value">مقدار اولیه</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => handleInputChange(e, setValue)}
                  placeholder="مثال: 100"
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
                  placeholder="مثال: 120"
                  type="text"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          <button
            onClick={calculate}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </button>

          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </Card>
    </div>
  );
}
