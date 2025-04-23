
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Coins, Info } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Slider } from "@/components/ui/slider";

export default function InvestmentCalculator() {
  // Basic Investment State
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [rateOfReturn, setRateOfReturn] = useState<number>(20);
  const [additionalInvestment, setAdditionalInvestment] = useState<string>('');
  const [investmentFrequency, setInvestmentFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [result, setResult] = useState<string | null>(null);

  const calculateROI = () => {
    const principal = parseFloat(initialAmount.replace(/,/g, ''));
    const years = parseFloat(investmentPeriod);
    const monthlyContribution = parseFloat(additionalInvestment.replace(/,/g, ''));
    
    if (isNaN(principal) || isNaN(years) || isNaN(monthlyContribution) || 
        principal < 0 || years <= 0) {
      setResult("لطفاً تمام مقادیر را به درستی وارد کنید");
      return;
    }

    let totalValue = principal;
    let totalContributions = principal;
    const monthlyRate = rateOfReturn / 100 / 12;
    const totalMonths = years * 12;

    for (let i = 1; i <= totalMonths; i++) {
      totalValue = totalValue * (1 + monthlyRate);
      if (investmentFrequency === 'monthly') {
        totalValue += monthlyContribution;
        totalContributions += monthlyContribution;
      } else if (i % 12 === 0) { // yearly contribution
        totalValue += monthlyContribution * 12;
        totalContributions += monthlyContribution * 12;
      }
    }

    const totalProfit = totalValue - totalContributions;
    const annualizedROI = (Math.pow(totalValue / principal, 1 / years) - 1) * 100;

    setResult(
      `نتایج سرمایه‌گذاری شما پس از ${years} سال:\n\n` +
      `سرمایه اولیه: ${formatToman(principal)}\n` +
      `کل سرمایه‌گذاری: ${formatToman(totalContributions)}\n` +
      `ارزش نهایی: ${formatToman(Math.round(totalValue))}\n` +
      `سود کل: ${formatToman(Math.round(totalProfit))}\n` +
      `نرخ بازگشت سالانه: ${annualizedROI.toFixed(2)}٪`
    );
  };

  const formatToman = (value: number): string => {
    return value.toLocaleString('fa-IR') + ' تومان';
  };

  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numberValue = value.replace(/[^\d]/g, '');
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  const renderInfoCard = () => (
    <Card className="mb-6 border-primary/10 bg-primary/5">
      <CardContent className="p-4 flex gap-3">
        <div className="mt-1">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">راهنمای محاسبه‌گر سرمایه‌گذاری:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>سرمایه اولیه: مبلغی که در ابتدا سرمایه‌گذاری می‌کنید</li>
            <li>سرمایه‌گذاری منظم: مبلغی که به صورت ماهانه یا سالانه اضافه می‌کنید</li>
            <li>نرخ بازده: درصد سود سالانه مورد انتظار (به طور متوسط بین ۱۵٪ تا ۲۵٪)</li>
            <li>مدت سرمایه‌گذاری: طول دوره سرمایه‌گذاری بر حسب سال</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Coins className="ml-2 h-5 w-5" />
          محاسبه‌گر سرمایه‌گذاری
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderInfoCard()}

        <div className="space-y-4">
          <div>
            <Label htmlFor="initialAmount">سرمایه اولیه (تومان)</Label>
            <Input
              id="initialAmount"
              type="text"
              dir="ltr"
              value={initialAmount}
              onChange={(e) => formatInput(e.target.value, setInitialAmount)}
              placeholder="مثال: 100,000,000"
            />
          </div>

          <div>
            <Label htmlFor="additionalInvestment">سرمایه‌گذاری منظم (تومان)</Label>
            <Input
              id="additionalInvestment"
              type="text"
              dir="ltr"
              value={additionalInvestment}
              onChange={(e) => formatInput(e.target.value, setAdditionalInvestment)}
              placeholder="مثال: 5,000,000"
            />
            <div className="mt-2 flex items-center space-x-4 space-x-reverse">
              <Label className="text-sm text-muted-foreground">دوره پرداخت:</Label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="monthly"
                  value="monthly"
                  checked={investmentFrequency === 'monthly'}
                  onChange={(e) => setInvestmentFrequency('monthly')}
                  className="accent-primary"
                />
                <Label htmlFor="monthly" className="text-sm cursor-pointer">ماهانه</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="yearly"
                  value="yearly"
                  checked={investmentFrequency === 'yearly'}
                  onChange={(e) => setInvestmentFrequency('yearly')}
                  className="accent-primary"
                />
                <Label htmlFor="yearly" className="text-sm cursor-pointer">سالانه</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="rateOfReturn">نرخ بازده سالانه</Label>
              <span className="text-sm font-medium">{rateOfReturn}٪</span>
            </div>
            <Slider
              id="rateOfReturn"
              min={1}
              max={50}
              step={0.5}
              value={[rateOfReturn]}
              onValueChange={(value) => setRateOfReturn(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>۱٪</span>
              <span>۲۵٪</span>
              <span>۵۰٪</span>
            </div>
          </div>

          <div>
            <Label htmlFor="investmentPeriod">مدت سرمایه‌گذاری (سال)</Label>
            <Input
              id="investmentPeriod"
              type="number"
              min="1"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
              placeholder="مثال: 5"
            />
          </div>

          <Button onClick={calculateROI} className="w-full">
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه سرمایه‌گذاری
          </Button>

          {result && <OutcomeInfoCard outcome={result} />}
        </div>
      </CardContent>
    </Card>
  );
}
