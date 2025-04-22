
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radio, RadioGroup, RadioIndicator, RadioItem } from "@/components/ui/radio-group";
import { calculateInvestment } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, TrendingUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<number>(18);
  const [years, setYears] = useState<string>('');
  const [contributionAmount, setContributionAmount] = useState<string>('');
  const [contributionFrequency, setContributionFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [result, setResult] = useState<string | null>(null);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('fa-IR') + ' تومان';
  };

  const handleCalculate = () => {
    const principal = parseFloat(initialAmount.replace(/,/g, ''));
    const contribution = parseFloat(contributionAmount.replace(/,/g, ''));
    const investmentYears = parseFloat(years);
    
    if (isNaN(principal) || isNaN(contribution) || isNaN(investmentYears) || 
        principal < 0 || contribution < 0 || investmentYears <= 0) {
      setResult("لطفاً اطلاعات را به درستی وارد کنید");
      return;
    }
    
    const { finalAmount, totalContributions, totalInterest } = calculateInvestment(
      principal,
      annualRate,
      investmentYears,
      contribution,
      contributionFrequency
    );

    // Create result message
    let resultMessage = `مبلغ نهایی پس از ${investmentYears.toLocaleString('fa-IR')} سال: ${formatCurrency(finalAmount)}\n\n`;
    resultMessage += `سرمایه اولیه: ${formatCurrency(principal)}\n`;
    resultMessage += `کل مبالغ اضافه شده: ${formatCurrency(totalContributions - principal)}\n`;
    resultMessage += `کل سود: ${formatCurrency(totalInterest)}\n`;
    
    setResult(resultMessage);
  };

  // Format input for currency
  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Remove non-numeric characters
    const numberValue = value.replace(/[^\d]/g, '');
    // Format with commas
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <TrendingUp className="ml-2 h-5 w-5" />
          محاسبه‌گر سرمایه‌گذاری
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="initialAmount">سرمایه اولیه (تومان)</Label>
            <Input
              id="initialAmount"
              type="text"
              dir="ltr"
              value={initialAmount}
              onChange={(e) => formatInput(e.target.value, setInitialAmount)}
              placeholder="مثال: 10,000,000"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="annualRate">نرخ سود سالیانه</Label>
              <span className="text-sm font-medium">{annualRate}٪</span>
            </div>
            <Slider
              id="annualRate"
              min={1}
              max={50}
              step={0.5}
              value={[annualRate]}
              onValueChange={(value) => setAnnualRate(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>۱٪</span>
              <span>۲۵٪</span>
              <span>۵۰٪</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="years">مدت سرمایه‌گذاری (سال)</Label>
            <Input
              id="years"
              type="number"
              min="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="مثال: 5"
            />
          </div>
          
          <div>
            <Label htmlFor="contributionAmount">مبلغ افزایش منظم (تومان)</Label>
            <Input
              id="contributionAmount"
              type="text"
              dir="ltr"
              value={contributionAmount}
              onChange={(e) => formatInput(e.target.value, setContributionAmount)}
              placeholder="مثال: 1,000,000"
            />
          </div>
          
          <div className="space-y-2">
            <Label>دوره افزایش سرمایه</Label>
            <RadioGroup 
              value={contributionFrequency} 
              onValueChange={(value) => setContributionFrequency(value as 'monthly' | 'yearly')}
              className="flex"
            >
              <div className="flex items-center space-x-2 space-x-reverse ml-6">
                <RadioItem value="monthly" id="monthly" className="peer"/>
                <Label htmlFor="monthly" className="cursor-pointer">ماهیانه</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioItem value="yearly" id="yearly" className="peer"/>
                <Label htmlFor="yearly" className="cursor-pointer">سالیانه</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button onClick={handleCalculate} className="w-full">
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه سرمایه‌گذاری
          </Button>
          
          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </CardContent>
    </Card>
  );
}
