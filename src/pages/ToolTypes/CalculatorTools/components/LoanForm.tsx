
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, CreditCard } from 'lucide-react';

interface LoanFormProps {
  loanAmount: string;
  interestRate: string;
  loanTerm: number;
  onLoanAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInterestRateChange: (value: string) => void;
  onLoanTermChange: (value: number[]) => void;
  onCalculate: () => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({
  loanAmount,
  interestRate,
  loanTerm,
  onLoanAmountChange,
  onInterestRateChange,
  onLoanTermChange,
  onCalculate,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">مبلغ وام (تومان)</Label>
          <div className="relative">
            <Input
              id="loanAmount"
              value={loanAmount}
              onChange={onLoanAmountChange}
              placeholder="مثال: 100,000,000"
              className="pl-12 text-left"
              dir="ltr"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="interestRate">نرخ بهره سالیانه (%)</Label>
          <Input
            id="interestRate"
            value={interestRate}
            onChange={(e) => onInterestRateChange(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="مثال: 18"
            type="text"
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="loanTerm">مدت وام (سال)</Label>
          <span className="font-medium text-lg bg-primary/10 text-primary px-3 py-1 rounded-full">
            {loanTerm} سال
          </span>
        </div>
        
        <Slider 
          id="loanTerm"
          defaultValue={[5]} 
          min={1} 
          max={30}
          step={1}
          value={[loanTerm]}
          onValueChange={(value) => onLoanTermChange(value)}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>۱ سال</span>
          <span>۱۵ سال</span>
          <span>۳۰ سال</span>
        </div>
      </div>

      <Button
        onClick={onCalculate}
        className="flex items-center justify-center"
      >
        <Calculator className="ml-2 h-5 w-5" />
        محاسبه کن
      </Button>
    </div>
  );
};
