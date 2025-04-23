
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from 'lucide-react';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { InvestmentForm } from './components/InvestmentForm';
import { InvestmentInfoCard } from './components/InvestmentInfoCard';

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [rateOfReturn, setRateOfReturn] = useState<number>(20);
  const [additionalInvestment, setAdditionalInvestment] = useState<string>('');
  const [investmentFrequency, setInvestmentFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [result, setResult] = useState<string | null>(null);

  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numberValue = value.replace(/[^\d]/g, '');
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  const formatToman = (value: number): string => {
    return value.toLocaleString('fa-IR') + ' تومان';
  };

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
      } else if (i % 12 === 0) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Coins className="ml-2 h-5 w-5" />
          محاسبه‌گر سرمایه‌گذاری
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <InvestmentInfoCard />
        <InvestmentForm
          initialAmount={initialAmount}
          setInitialAmount={setInitialAmount}
          additionalInvestment={additionalInvestment}
          setAdditionalInvestment={setAdditionalInvestment}
          investmentPeriod={investmentPeriod}
          setInvestmentPeriod={setInvestmentPeriod}
          rateOfReturn={rateOfReturn}
          setRateOfReturn={setRateOfReturn}
          investmentFrequency={investmentFrequency}
          setInvestmentFrequency={setInvestmentFrequency}
          onCalculate={calculateROI}
          formatInput={formatInput}
        />
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
