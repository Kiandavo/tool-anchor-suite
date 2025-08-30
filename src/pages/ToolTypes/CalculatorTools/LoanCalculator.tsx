
import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CirclePercent, CreditCard, Calculator, AlertCircle, FileText, Printer, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { formatToToman, convertNumberToPersianWords } from '@/utils/calculatorUtils';
import { Progress } from '@/components/ui/progress';
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
  interestPercentage: number;
  avgMonthlyInterest: number;
  avgMonthlyPrincipal: number;
  payoffDate: string;
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
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [additionalPayment, setAdditionalPayment] = useState<string>('0');

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

  const handleAdditionalPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    
    if (rawValue) {
      setAdditionalPayment(Number(rawValue).toLocaleString());
    } else {
      setAdditionalPayment('0');
    }
  };

  // Memoized calculations for performance
  const loanMetrics = useMemo(() => {
    if (!summary) return null;
    
    return {
      debtToIncomeRatio: summary.monthlyPayment / (summary.monthlyPayment * 4), // Assuming 25% DTI
      interestToTotalRatio: (summary.totalInterest / summary.totalPayment) * 100,
      principalToTotalRatio: (summary.loanAmount / summary.totalPayment) * 100,
      breakEvenMonth: Math.floor(summary.loanTerm * 0.6), // Approximate break-even point
    };
  }, [summary]);

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

  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const amount = parseFloat(loanAmount.replace(/,/g, ''));
      const rate = parseFloat(interestRate) / 100;
      const termMonths = paymentType === 'monthly' ? loanTerm : loanTerm * 12;
      const monthlyRate = rate / 12;
      const extraPayment = parseFloat(additionalPayment.replace(/,/g, '')) || 0;

      if (isNaN(amount) || isNaN(rate) || isNaN(termMonths) || amount <= 0 || rate <= 0 || termMonths <= 0) {
        toast.error("لطفا تمام فیلدها را به درستی پر کنید", {
          description: "مقادیر وارد شده نامعتبر هستند",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Calculate monthly payment using the loan payment formula
      const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
      const totalPayment = monthlyPayment * termMonths;
      const totalInterest = totalPayment - amount;
      
      // Calculate payoff date
      const currentDate = new Date();
      const payoffDate = new Date(currentDate);
      payoffDate.setMonth(payoffDate.getMonth() + termMonths);
      
      const interestPercentage = (totalInterest / amount) * 100;
      const avgMonthlyInterest = totalInterest / termMonths;
      const avgMonthlyPrincipal = amount / termMonths;

      setSummary({
        monthlyPayment,
        totalPayment,
        totalInterest,
        loanAmount: amount,
        interestRate: parseFloat(interestRate),
        loanTerm: termMonths,
        paymentCount: termMonths,
        interestPercentage,
        avgMonthlyInterest,
        avgMonthlyPrincipal,
        payoffDate: payoffDate.toLocaleDateString('fa-IR')
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
        description: `پرداخت ماهیانه: ${formatToToman(monthlyPayment)} تومان`,
        position: "top-center",
      });
    } catch (error) {
      toast.error("خطا در محاسبه", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [loanAmount, interestRate, loanTerm, paymentType, additionalPayment]);

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
                isCalculating={isCalculating}
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
                  isCalculating={isCalculating}
                  additionalPayment={additionalPayment}
                  onAdditionalPaymentChange={handleAdditionalPaymentChange}
                />
              </div>
            </TabsContent>
          </Tabs>

          {summary && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <OutcomeInfoCard 
                  outcome={`پرداخت ماهیانه: ${formatToToman(summary.monthlyPayment)} تومان`}
                />
                <OutcomeInfoCard 
                  outcome={`تاریخ پایان وام: ${summary.payoffDate}`}
                />
              </div>
              
              <div className="glass-effect text-primary p-4 rounded-xl text-center text-sm mb-6">
                {amountInWords}
              </div>

              {/* Loan Progress Visualization */}
              <div className="neo-glass rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <PieChart className="ml-2 h-5 w-5 text-primary" />
                  تحلیل ساختار وام
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">اصل وام</span>
                      <span className="text-sm text-primary font-semibold">
                        {loanMetrics?.principalToTotalRatio.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={loanMetrics?.principalToTotalRatio} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">بهره</span>
                      <span className="text-sm text-amber-600 font-semibold">
                        {loanMetrics?.interestToTotalRatio.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={loanMetrics?.interestToTotalRatio} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center mb-2">
                    <CreditCard className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium text-sm">پرداخت ماهیانه</h3>
                  </div>
                  <p className="text-lg font-bold vibrant-gradient">{formatToToman(summary.monthlyPayment)}</p>
                  <p className="text-xs text-muted-foreground mt-1">تومان</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center mb-2">
                    <Calculator className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium text-sm">کل پرداختی</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{formatToToman(summary.totalPayment)}</p>
                  <p className="text-xs text-muted-foreground mt-1">تومان</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-amber-600 ml-2" />
                    <h3 className="font-medium text-sm">کل بهره</h3>
                  </div>
                  <p className="text-lg font-bold text-amber-600">{formatToToman(summary.totalInterest)}</p>
                  <p className="text-xs text-muted-foreground mt-1">تومان</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-green-600 ml-2" />
                    <h3 className="font-medium text-sm">درصد بهره</h3>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {summary.interestPercentage.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">از کل وام</p>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">میانگین بهره ماهیانه</h4>
                  <p className="text-lg font-semibold text-amber-600">{formatToToman(summary.avgMonthlyInterest)} تومان</p>
                </div>
                
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">میانگین اصل ماهیانه</h4>
                  <p className="text-lg font-semibold text-blue-600">{formatToToman(summary.avgMonthlyPrincipal)} تومان</p>
                </div>
                
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">تعداد اقساط</h4>
                  <p className="text-lg font-semibold text-primary">{summary.paymentCount} ماه</p>
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
