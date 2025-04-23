
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CirclePercent } from 'lucide-react';
import { formatToToman, convertNumberToPersianWords } from '@/utils/calculatorUtils';
import { LoanForm } from './components/LoanForm';
import { PaymentScheduleTable } from './components/PaymentScheduleTable';

interface PaymentScheduleItem {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

interface ExtendedScheduleItem {
  year: number;
  month: number;
  totalPaid: number;
  remainingBalance: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [result, setResult] = useState<string | null>(null);
  const [amountInWords, setAmountInWords] = useState<string | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[] | null>(null);
  const [extendedSchedule, setExtendedSchedule] = useState<ExtendedScheduleItem[] | null>(null);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    
    if (rawValue) {
      setLoanAmount(Number(rawValue).toLocaleString());
    } else {
      setLoanAmount('');
    }
  };

  const handleLoanTermChange = (value: number[]) => {
    setLoanTerm(value[0]);
  };

  const calculate = () => {
    const amount = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = loanTerm * 12;

    if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || rate <= 0 || term <= 0) {
      return;
    }

    const monthlyPayment = (rate * amount) / (1 - Math.pow(1 + rate, -term));
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    setResult(`پرداخت ماهیانه: ${formatToToman(monthlyPayment)} تومان - کل پرداختی: ${formatToToman(totalPayment)} تومان - کل بهره: ${formatToToman(totalInterest)} تومان`);
    setAmountInWords(`مبلغ وام به حروف: ${convertNumberToPersianWords(amount)} تومان`);

    const schedule: PaymentScheduleItem[] = [];
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

    const extended: ExtendedScheduleItem[] = [];
    let extendedBalance = amount;
    let totalPaid = 0;
    
    const maxYears = 10;
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

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <CirclePercent className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">ماشین حساب وام</h2>
          </div>

          <LoanForm
            loanAmount={loanAmount}
            interestRate={interestRate}
            loanTerm={loanTerm}
            onLoanAmountChange={handleLoanAmountChange}
            onInterestRateChange={setInterestRate}
            onLoanTermChange={handleLoanTermChange}
            onCalculate={calculate}
          />

          {result && <OutcomeInfoCard outcome={result} />}
          
          {amountInWords && (
            <div className="bg-primary/5 text-primary p-3 rounded-lg text-center text-sm">
              {amountInWords}
            </div>
          )}

          {paymentSchedule && extendedSchedule && (
            <PaymentScheduleTable
              paymentSchedule={paymentSchedule}
              extendedSchedule={extendedSchedule}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
