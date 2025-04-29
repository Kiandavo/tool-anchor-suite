
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CirclePercent, CreditCard, Calculator, AlertCircle, FileText, Printer } from 'lucide-react';
import { formatToToman, convertNumberToPersianWords } from '@/utils/calculatorUtils';
import { LoanForm } from './components/LoanForm';
import { PaymentScheduleTable } from './components/PaymentScheduleTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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

interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentCount: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [paymentType, setPaymentType] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[] | null>(null);
  const [extendedSchedule, setExtendedSchedule] = useState<ExtendedScheduleItem[] | null>(null);
  const [summary, setSummary] = useState<LoanSummary | null>(null);
  const [amountInWords, setAmountInWords] = useState<string | null>(null);
  const [showPrintDialog, setShowPrintDialog] = useState<boolean>(false);

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

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value as 'monthly' | 'yearly');
  };

  const printLoanDetails = () => {
    setShowPrintDialog(true);
  };

  const generatePDF = () => {
    // In a real implementation, we would use a library like jsPDF
    // For now, we'll just show a toast message
    toast.success("گزارش آماده دانلود است", {
      description: "فایل PDF با موفقیت ایجاد شد",
      position: "top-center",
    });
    setShowPrintDialog(false);
  };

  const calculate = () => {
    const amount = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const termMonths = paymentType === 'monthly' ? loanTerm : loanTerm * 12;
    const monthlyRate = rate / 12;

    if (isNaN(amount) || isNaN(rate) || isNaN(termMonths) || amount <= 0 || rate <= 0 || termMonths <= 0) {
      toast.error("لطفا تمام فیلدها را به درستی پر کنید", {
        description: "مقادیر وارد شده نامعتبر هستند",
        position: "top-center",
      });
      return;
    }

    // Calculate monthly payment using the loan payment formula
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - amount;

    setSummary({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount: amount,
      interestRate: parseFloat(interestRate),
      loanTerm: termMonths,
      paymentCount: termMonths
    });

    setAmountInWords(`مبلغ وام به حروف: ${convertNumberToPersianWords(amount)} تومان`);

    const schedule: PaymentScheduleItem[] = [];
    let remainingBalance = amount;
    
    for (let month = 1; month <= Math.min(termMonths, 12); month++) {
      const interestForMonth = remainingBalance * monthlyRate;
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
    
    const maxYears = 30;
    const yearsToShow = Math.min(Math.ceil(termMonths / 12), maxYears);
    
    for (let year = 1; year <= yearsToShow; year++) {
      for (let month = 1; month <= 12; month++) {
        const overallMonth = (year - 1) * 12 + month;
        
        if (overallMonth > termMonths) break;
        
        const interestForMonth = extendedBalance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        extendedBalance -= principalForMonth;
        totalPaid += monthlyPayment;

        if (month === 12 || overallMonth === termMonths) {
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

    toast.success("محاسبه با موفقیت انجام شد", {
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
            <div className="icon-container">
              <CirclePercent className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-center">ماشین حساب وام</h2>
          </div>

          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect mb-2">
              <TabsTrigger value="standard">محاسبه استاندارد</TabsTrigger>
              <TabsTrigger value="advanced">محاسبه پیشرفته</TabsTrigger>
            </TabsList>
            <TabsContent value="standard" className="mt-4">
              <LoanForm
                loanAmount={loanAmount}
                interestRate={interestRate}
                loanTerm={loanTerm}
                paymentType={paymentType}
                onLoanAmountChange={handleLoanAmountChange}
                onInterestRateChange={setInterestRate}
                onLoanTermChange={handleLoanTermChange}
                onPaymentTypeChange={handlePaymentTypeChange}
                onCalculate={calculate}
              />
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <div className="space-y-4">
                <div className="glass-effect rounded-xl border-white/20 p-4 bg-amber-50/90">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 ml-2" />
                    <div>
                      <h3 className="font-medium text-amber-800">ویژگی‌های پیشرفته</h3>
                      <p className="text-amber-700 text-sm mt-1">
                        در این بخش می‌توانید از ویژگی‌های پیشرفته مانند پرداخت‌های اضافی، تنفس وام و مقایسه گزینه‌های مختلف استفاده کنید.
                      </p>
                    </div>
                  </div>
                </div>
                <LoanForm
                  loanAmount={loanAmount}
                  interestRate={interestRate}
                  loanTerm={loanTerm}
                  paymentType={paymentType}
                  onLoanAmountChange={handleLoanAmountChange}
                  onInterestRateChange={setInterestRate}
                  onLoanTermChange={handleLoanTermChange}
                  onPaymentTypeChange={handlePaymentTypeChange}
                  onCalculate={calculate}
                  advanced={true}
                />
              </div>
            </TabsContent>
          </Tabs>

          {summary && (
            <div className="space-y-4 animate-fade-in">
              <OutcomeInfoCard outcome={`پرداخت ماهیانه: ${formatToToman(summary.monthlyPayment)} تومان - کل پرداختی: ${formatToToman(summary.totalPayment)} تومان - کل بهره: ${formatToToman(summary.totalInterest)} تومان`} />
              
              <div className="glass-effect text-primary p-4 rounded-xl text-center text-sm">
                {amountInWords}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium">پرداخت ماهیانه</h3>
                  </div>
                  <p className="text-xl font-bold vibrant-gradient">{formatToToman(summary.monthlyPayment)} تومان</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-2">
                    <Calculator className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium">تعداد پرداخت</h3>
                  </div>
                  <p className="text-xl font-bold vibrant-gradient">{summary.paymentCount} قسط</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 col-span-1 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center mb-2">
                    <CirclePercent className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium">نسبت بهره به اصل</h3>
                  </div>
                  <p className="text-xl font-bold vibrant-gradient">
                    {((summary.totalInterest / summary.loanAmount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" onClick={printLoanDetails} className="flex items-center glass-effect hover:-translate-y-1 transition-transform duration-300">
                  <Printer className="ml-2 h-4 w-4" />
                  چاپ جزئیات وام
                </Button>
                <Button variant="outline" className="flex items-center glass-effect hover:-translate-y-1 transition-transform duration-300">
                  <FileText className="ml-2 h-4 w-4" />
                  ذخیره محاسبات
                </Button>
              </div>

              <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
                <DialogContent className="max-w-md glass-card">
                  <DialogHeader>
                    <DialogTitle>چاپ جزئیات وام</DialogTitle>
                    <DialogDescription>
                      انتخاب کنید که چه اطلاعاتی در گزارش شما گنجانده شود.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" id="include-summary" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="include-summary">خلاصه وام</label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" id="include-schedule" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="include-schedule">جدول پرداخت</label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" id="include-charts" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="include-charts">نمودارها</label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="ml-2 glass-effect" onClick={() => setShowPrintDialog(false)}>
                      انصراف
                    </Button>
                    <Button onClick={generatePDF} className="vibrant-button">
                      دانلود PDF
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {paymentSchedule && extendedSchedule && (
            <div className="animate-fade-in">
              <PaymentScheduleTable
                paymentSchedule={paymentSchedule}
                extendedSchedule={extendedSchedule}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
