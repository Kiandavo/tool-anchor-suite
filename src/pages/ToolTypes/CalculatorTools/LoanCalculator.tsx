
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, CirclePercent } from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{ month: number; payment: number; interest: number; principal: number; remainingBalance: number }> | null>(null);

  const calculate = () => {
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Convert annual rate to monthly
    const term = parseInt(loanTerm) * 12; // Convert years to months

    if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || rate <= 0 || term <= 0) {
      return;
    }

    // Calculate monthly payment: P = (r * PV) / (1 - (1 + r)^(-n))
    const monthlyPayment = (rate * amount) / (1 - Math.pow(1 + rate, -term));
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    setResult(`پرداخت ماهیانه: ${monthlyPayment.toLocaleString('fa-IR')} - کل پرداختی: ${totalPayment.toLocaleString('fa-IR')} - کل بهره: ${totalInterest.toLocaleString('fa-IR')}`);

    // Generate payment schedule for first 12 months or full term if less than 12
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <CirclePercent className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">ماشین حساب وام</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">مبلغ وام</Label>
              <Input
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => handleInputChange(e, setLoanAmount)}
                placeholder="مثال: 100000000"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">نرخ بهره سالیانه (%)</Label>
              <Input
                id="interestRate"
                value={interestRate}
                onChange={(e) => handleInputChange(e, setInterestRate)}
                placeholder="مثال: 18"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">مدت وام (سال)</Label>
              <Input
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => handleInputChange(e, setLoanTerm)}
                placeholder="مثال: 5"
                type="text"
                dir="ltr"
              />
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
                        <td className="px-4 py-2">{item.payment.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{item.interest.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{item.principal.toLocaleString('fa-IR')}</td>
                        <td className="px-4 py-2">{item.remainingBalance.toLocaleString('fa-IR')}</td>
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
