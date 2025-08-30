
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, CreditCard, CalendarDays } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoanFormProps {
  loanAmount: string;
  interestRate: string;
  loanTerm: number;
  paymentType?: 'monthly' | 'yearly';
  advanced?: boolean;
  isCalculating?: boolean;
  additionalPayment?: string;
  onLoanAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInterestRateChange: (value: string) => void;
  onLoanTermChange: (value: number[]) => void;
  onPaymentTypeChange?: (value: string) => void;
  onCalculate: () => void;
  onAdditionalPaymentChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({
  loanAmount,
  interestRate,
  loanTerm,
  paymentType = 'monthly',
  advanced = false,
  isCalculating = false,
  additionalPayment = '0',
  onLoanAmountChange,
  onInterestRateChange,
  onLoanTermChange,
  onPaymentTypeChange,
  onCalculate,
  onAdditionalPaymentChange,
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
              className="pl-12 text-left glass-effect"
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
            className="glass-effect"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="loanTerm">مدت وام</Label>
          <div className="flex items-center">
            <span className="font-medium text-lg bg-primary/10 text-primary px-3 py-1 rounded-full ml-2">
              {loanTerm} {paymentType === 'monthly' ? 'ماه' : 'سال'}
            </span>
            
            {onPaymentTypeChange && (
              <Select defaultValue={paymentType} onValueChange={onPaymentTypeChange}>
                <SelectTrigger className="w-[100px] glass-effect">
                  <SelectValue placeholder="واحد زمان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">ماه</SelectItem>
                  <SelectItem value="yearly">سال</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        
        <Slider 
          id="loanTerm"
          defaultValue={[loanTerm]} 
          min={paymentType === 'monthly' ? 1 : 1} 
          max={paymentType === 'monthly' ? 360 : 30}
          step={1}
          value={[loanTerm]}
          onValueChange={(value) => onLoanTermChange(value)}
          className="py-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          {paymentType === 'monthly' ? (
            <>
              <span>۱ ماه</span>
              <span>۱۸۰ ماه</span>
              <span>۳۶۰ ماه</span>
            </>
          ) : (
            <>
              <span>۱ سال</span>
              <span>۱۵ سال</span>
              <span>۳۰ سال</span>
            </>
          )}
        </div>
      </div>

      {advanced && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">تنظیمات پیشرفته</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentDate">تاریخ اولین پرداخت</Label>
              <div className="relative">
                <Input
                  id="paymentDate"
                  type="date"
                  className="pl-12 glass-effect"
                  dir="ltr"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalPayment">پرداخت اضافه ماهانه (تومان)</Label>
              <Input
                id="additionalPayment"
                value={additionalPayment}
                onChange={onAdditionalPaymentChange}
                placeholder="مثال: 1,000,000"
                dir="ltr"
                className="glass-effect"
              />
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={onCalculate}
        disabled={isCalculating}
        className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
        {isCalculating ? 'در حال محاسبه...' : 'محاسبه کن'}
      </Button>
    </div>
  );
};
