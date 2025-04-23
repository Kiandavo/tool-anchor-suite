
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Home } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function RentFactorsCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('');
  const [utilities, setUtilities] = useState('');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(formatCurrency(value));
  };

  const calculateRentFactors = () => {
    const rentAmount = parseFloat(monthlyRent.replace(/,/g, '')) || 0;
    const utilitiesAmount = parseFloat(utilities.replace(/,/g, '')) || 0;
    const monthlyIncome = parseFloat(income.replace(/,/g, '')) || 0;

    const totalMonthlyExpenses = rentAmount + utilitiesAmount;
    const rentToIncomeRatio = (totalMonthlyExpenses / monthlyIncome) * 100;
    const recommendedMaxRent = monthlyIncome * 0.3;
    
    let message = '';
    
    if (monthlyIncome === 0) {
      message = 'لطفاً درآمد ماهیانه را وارد کنید';
    } else {
      message = `
        مجموع هزینه‌های ماهیانه: ${formatCurrency(totalMonthlyExpenses.toString())} تومان\n
        نسبت اجاره به درآمد: ${rentToIncomeRatio.toFixed(1)}٪\n
        حداکثر اجاره پیشنهادی (۳۰٪ درآمد): ${formatCurrency(recommendedMaxRent.toString())} تومان\n
        ${rentToIncomeRatio > 30 ? 'هشدار: نسبت اجاره به درآمد شما بیشتر از حد توصیه شده (۳۰٪) است.' : ''}
      `;
    }
    
    setResult(message);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          محاسبه‌گر عوامل اجاره
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyRent">اجاره ماهیانه (تومان)</Label>
            <Input
              id="monthlyRent"
              value={monthlyRent}
              onChange={(e) => handleInputChange(e.target.value, setMonthlyRent)}
              dir="ltr"
              placeholder="مثال: 5,000,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="utilities">هزینه‌های جانبی ماهیانه (تومان)</Label>
            <Input
              id="utilities"
              value={utilities}
              onChange={(e) => handleInputChange(e.target.value, setUtilities)}
              dir="ltr"
              placeholder="مثال: 1,000,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">درآمد ماهیانه (تومان)</Label>
            <Input
              id="income"
              value={income}
              onChange={(e) => handleInputChange(e.target.value, setIncome)}
              dir="ltr"
              placeholder="مثال: 20,000,000"
            />
          </div>

          <Button onClick={calculateRentFactors} className="w-full">
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه عوامل اجاره
          </Button>

          {result && (
            <OutcomeInfoCard outcome={result} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
