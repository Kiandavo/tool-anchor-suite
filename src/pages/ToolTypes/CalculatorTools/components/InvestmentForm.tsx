
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator } from 'lucide-react';

interface InvestmentFormProps {
  initialAmount: string;
  setInitialAmount: (value: string) => void;
  additionalInvestment: string;
  setAdditionalInvestment: (value: string) => void;
  investmentPeriod: string;
  setInvestmentPeriod: (value: string) => void;
  rateOfReturn: number;
  setRateOfReturn: (value: number) => void;
  investmentFrequency: 'monthly' | 'yearly';
  setInvestmentFrequency: (value: 'monthly' | 'yearly') => void;
  onCalculate: () => void;
  formatInput: (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  initialAmount,
  setInitialAmount,
  additionalInvestment,
  setAdditionalInvestment,
  investmentPeriod,
  setInvestmentPeriod,
  rateOfReturn,
  setRateOfReturn,
  investmentFrequency,
  setInvestmentFrequency,
  onCalculate,
  formatInput,
}) => {
  return (
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
              onChange={() => setInvestmentFrequency('monthly')}
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
              onChange={() => setInvestmentFrequency('yearly')}
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

      <Button onClick={onCalculate} className="w-full">
        <Calculator className="ml-2 h-5 w-5" />
        محاسبه سرمایه‌گذاری
      </Button>
    </div>
  );
};
