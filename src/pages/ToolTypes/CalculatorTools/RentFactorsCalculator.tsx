import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RentFactorsCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [utilities, setUtilities] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [result, setResult] = useState<{
    total: number;
    ratio: number;
    recommended: number;
    budget: { category: string; amount: number; color: string }[];
  } | null>(null);

  const formatCurrency = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>): void => {
    const numericValue = value.replace(/,/g, '');
    if (numericValue === '' || /^\d+$/.test(numericValue)) {
      setter(formatCurrency(numericValue));
    }
  };

  const calculateRentFactors = () => {
    const rent = parseFloat(monthlyRent.replace(/,/g, '') || '0');
    const util = parseFloat(utilities.replace(/,/g, '') || '0');
    const inc = parseFloat(income.replace(/,/g, '') || '0');

    if (rent <= 0 || inc <= 0) return;

    const total = rent + util;
    const ratio = (total / inc) * 100;
    const recommended = inc * 0.3;

    const remainingIncome = inc - total;
    const budget = [
      { category: 'اجاره', amount: rent, color: 'from-primary/60 to-primary/40' },
      { category: 'هزینه‌ها', amount: util, color: 'from-orange-500/60 to-orange-500/40' },
      { category: 'باقیمانده', amount: remainingIncome, color: 'from-green-500/60 to-green-500/40' },
    ];

    setResult({ total, ratio, recommended, budget });
  };

  const handleReset = () => {
    setMonthlyRent('');
    setUtilities('');
    setIncome('');
    setResult(null);
  };

  return (
    <CalculatorCard
      title="محاسبه عوامل اجاره"
      icon={Home}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rent">اجاره ماهیانه (تومان)</Label>
            <Input
              id="rent"
              type="text"
              value={monthlyRent}
              onChange={(e) => handleInputChange(e.target.value, setMonthlyRent)}
              placeholder="۵,۰۰۰,۰۰۰"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="utilities">هزینه‌های جانبی (تومان)</Label>
            <Input
              id="utilities"
              type="text"
              value={utilities}
              onChange={(e) => handleInputChange(e.target.value, setUtilities)}
              placeholder="۱,۰۰۰,۰۰۰"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">درآمد ماهیانه (تومان)</Label>
            <Input
              id="income"
              type="text"
              value={income}
              onChange={(e) => handleInputChange(e.target.value, setIncome)}
              placeholder="۲۰,۰۰۰,۰۰۰"
              dir="ltr"
            />
          </div>

          <Button onClick={calculateRentFactors} className="w-full" size="lg">
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه عوامل
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-primary/10 rounded-xl text-center border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">کل هزینه</p>
                <p className="text-sm font-bold text-primary">{result.total.toLocaleString('fa-IR')}</p>
              </div>
              <div className={`p-4 rounded-xl text-center border ${
                result.ratio > 30 
                  ? 'bg-red-500/10 border-red-500/20' 
                  : 'bg-green-500/10 border-green-500/20'
              }`}>
                <p className="text-xs text-muted-foreground mb-1">نسبت به درآمد</p>
                <p className={`text-sm font-bold ${result.ratio > 30 ? 'text-red-600' : 'text-green-600'}`}>
                  {result.ratio.toFixed(1)}٪
                </p>
              </div>
              <div className="p-4 bg-card rounded-xl text-center border border-border">
                <p className="text-xs text-muted-foreground mb-1">پیشنهادی</p>
                <p className="text-sm font-bold">{result.recommended.toLocaleString('fa-IR')}</p>
              </div>
            </div>

            <VisualizationCard title="تقسیم‌بندی بودجه">
              <div className="space-y-4">
                <div className="relative h-8 bg-card rounded-full overflow-hidden border border-border">
                  {result.budget.map((item, idx) => {
                    const totalIncome = parseFloat(income.replace(/,/g, ''));
                    const percentage = (item.amount / totalIncome) * 100;
                    const cumulativePercentage = result.budget
                      .slice(0, idx)
                      .reduce((sum, b) => sum + (b.amount / totalIncome) * 100, 0);

                    return (
                      <motion.div
                        key={idx}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        className={`absolute top-0 h-full bg-gradient-to-r ${item.color}`}
                        style={{ right: `${cumulativePercentage}%` }}
                      />
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {result.budget.map((item, idx) => {
                    const totalIncome = parseFloat(income.replace(/,/g, ''));
                    const percentage = (item.amount / totalIncome) * 100;
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-3 bg-card rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                          <p className="text-xs font-medium">{item.category}</p>
                        </div>
                        <p className="text-sm font-bold">{item.amount.toLocaleString('fa-IR')}</p>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}٪</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </VisualizationCard>

            {result.ratio > 30 && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-center text-red-600">
                  ⚠️ نسبت هزینه اجاره به درآمد شما بیش از ۳۰٪ است. این میزان ممکن است بار مالی زیادی ایجاد کند.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}