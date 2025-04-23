
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, CirclePercent, Calendar, CreditCard } from 'lucide-react';
import { formatToToman, convertNumberToPersianWords } from '@/utils/calculatorUtils';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [result, setResult] = useState<string | null>(null);
  const [amountInWords, setAmountInWords] = useState<string | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{ month: number; payment: number; interest: number; principal: number; remainingBalance: number }> | null>(null);
  const [extendedSchedule, setExtendedSchedule] = useState<Array<{ year: number; month: number; totalPaid: number; remainingBalance: number }> | null>(null);

  const calculate = () => {
    // Parse the loan amount by removing commas
    const amount = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100 / 12; // Convert annual rate to monthly
    const term = loanTerm * 12; // Convert years to months

    if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || rate <= 0 || term <= 0) {
      return;
    }

    // Calculate monthly payment: P = (r * PV) / (1 - (1 + r)^(-n))
    const monthlyPayment = (rate * amount) / (1 - Math.pow(1 + rate, -term));
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    // Format numbers and set result
    setResult(`پرداخت ماهیانه: ${formatToToman(monthlyPayment)} تومان - کل پرداختی: ${formatToToman(totalPayment)} تومان - کل بهره: ${formatToToman(totalInterest)} تومان`);
    
    // Convert amount to Persian words
    setAmountInWords(`مبلغ وام به حروف: ${convertNumberToPersianWords(amount)} تومان`);

    // Generate payment schedule for first 12 months
    const schedule = [];
    let remainingBalance = amount;
    
    for (let month = 1; month <= Math.min(term, 12); month++) {
      const interestForMonth = remainingBalance * rate;
      const principalForMonth = monthlyPayment - interestForMonth;
      remainingBalance -= principalForMonth;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        interest: interestForMonth,
        principal: principalForMonth,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });
    }
    
    setPaymentSchedule(schedule);

    // Generate extended schedule up to 10 years
    const extended = [];
    let extendedBalance = amount;
    let totalPaid = 0;
    
    const maxYears = 10;
    const maxMonths = maxYears * 12;
    const yearsToShow = Math.min(Math.ceil(term / 12), maxYears);
    
    for (let year = 1; year <= yearsToShow; year++) {
      for (let month = 1; month <= 12; month++) {
        const overallMonth = (year - 1) * 12 + month;
        
        if (overallMonth > term) break;
        
        const interestForMonth = extendedBalance * rate;
        const principalForMonth = monthlyPayment - interestForMonth;
        extendedBalance -= principalForMonth;
        totalPaid += monthlyPayment;

        if (month === 12 || overallMonth === term) {
          extended.push({
            year,
            month: overallMonth,
            totalPaid,
            remainingBalance: extendedBalance > 0 ? extendedBalance : 0
          });
        }
      }
    }
    
    setExtendedSchedule(extended);
  };

  // Fix for loan amount input handling
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the raw value without any formatting
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    
    if (rawValue) {
      // Format the value with commas and update state
      setLoanAmount(Number(rawValue).toLocaleString());
    } else {
      setLoanAmount('');
    }
  };

  // Slider handler for loan term
  const handleLoanTermChange = (value: number[]) => {
    setLoanTerm(value[0]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <CirclePercent className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">ماشین حساب وام</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">مبلغ وام (تومان)</Label>
              <div className="relative">
                <Input
                  id="loanAmount"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
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
                onChange={(e) => setInterestRate(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="مثال: 18"
                type="text"
                dir="ltr"
              />
            </div>
          </div>

          {/* Improved loan term UI with slider */}
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
              onValueChange={handleLoanTermChange}
              className="py-4"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>۱ سال</span>
              <span>۱۵ سال</span>
              <span>۳۰ سال</span>
            </div>
          </div>

          <button
            onClick={calculate}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </button>

          {result && <OutcomeInfoCard outcome={result} />}
          
          {amountInWords && (
            <div className="bg-primary/5 text-primary p-3 rounded-lg text-center text-sm">
              {amountInWords}
            </div>
          )}

          {paymentSchedule && (
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b">
                <h3 className="font-medium">جدول پرداخت (12 ماه اول)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-right">ماه</th>
                      <th className="px-4 py-2 text-right">پرداخت</th>
                      <th className="px-4 py-2 text-right">بهره</th>
                      <th className="px-4 py-2 text-right">اصل</th>
                      <th className="px-4 py-2 text-right">مانده</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule.map((item) => (
                      <tr key={item.month} className="border-t">
                        <td className="px-4 py-2">{item.month.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{formatToToman(item.payment)}</td>
                        <td className="px-4 py-2">{formatToToman(item.interest)}</td>
                        <td className="px-4 py-2">{formatToToman(item.principal)}</td>
                        <td className="px-4 py-2">{formatToToman(item.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {extendedSchedule && (
            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-primary ml-1" />
                <h3 className="font-medium">پیش‌بینی بازپرداخت تا 10 سال</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-right">سال</th>
                      <th className="px-4 py-2 text-right">ماه</th>
                      <th className="px-4 py-2 text-right">کل پرداختی</th>
                      <th className="px-4 py-2 text-right">مانده بدهی</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extendedSchedule.map((item, index) => (
                      <tr key={index} className={cn("border-t", item.year % 2 === 0 ? "bg-gray-50/50" : "")}>
                        <td className="px-4 py-2">{item.year.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{item.month.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{formatToToman(item.totalPaid)}</td>
                        <td className="px-4 py-2">{formatToToman(item.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
