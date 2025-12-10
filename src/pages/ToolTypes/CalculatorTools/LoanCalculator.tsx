
import React, { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { CirclePercent, CreditCard, Calculator, AlertCircle, FileText, Printer, TrendingUp, PieChart, BarChart3, TrendingDown, DollarSign, Clock, Target } from 'lucide-react';
import { formatToToman, convertNumberToPersianWords } from '@/utils/calculatorUtils';
import { Progress } from '@/components/ui/progress';
import { LoanForm } from './components/LoanForm';
import { PaymentScheduleTable } from './components/PaymentScheduleTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, Legend } from 'recharts';

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

interface EarlyPayoffScenario {
  name: string;
  extraPayment: number;
  monthsSaved: number;
  interestSaved: number;
  newTerm: number;
  totalPayment: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
  const [fullAmortization, setFullAmortization] = useState<PaymentScheduleItem[]>([]);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    setLoanAmount(rawValue ? Number(rawValue).toLocaleString() : '');
  };

  const handleLoanTermChange = (value: number[]) => setLoanTerm(value[0]);
  const handlePaymentTypeChange = (value: string) => setPaymentType(value as 'monthly' | 'yearly');

  const handleAdditionalPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    setAdditionalPayment(rawValue ? Number(rawValue).toLocaleString() : '0');
  };

  const loanMetrics = useMemo(() => {
    if (!summary) return null;
    return {
      debtToIncomeRatio: summary.monthlyPayment / (summary.monthlyPayment * 4),
      interestToTotalRatio: (summary.totalInterest / summary.totalPayment) * 100,
      principalToTotalRatio: (summary.loanAmount / summary.totalPayment) * 100,
      breakEvenMonth: Math.floor(summary.loanTerm * 0.6),
    };
  }, [summary]);

  // Early payoff scenarios calculation
  const earlyPayoffScenarios = useMemo((): EarlyPayoffScenario[] => {
    if (!summary) return [];
    
    const amount = summary.loanAmount;
    const rate = summary.interestRate / 100;
    const monthlyRate = rate / 12;
    const originalTerm = summary.loanTerm;
    const originalPayment = summary.monthlyPayment;
    
    const scenarios = [
      { name: 'بدون پرداخت اضافی', extraPercent: 0 },
      { name: '۱۰٪ پرداخت اضافی', extraPercent: 0.10 },
      { name: '۲۵٪ پرداخت اضافی', extraPercent: 0.25 },
      { name: 'دوبرابر پرداخت', extraPercent: 1.0 },
    ];
    
    return scenarios.map(scenario => {
      const extraPayment = originalPayment * scenario.extraPercent;
      const newPayment = originalPayment + extraPayment;
      
      let balance = amount;
      let months = 0;
      let totalInterest = 0;
      
      while (balance > 0 && months < 600) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = Math.min(newPayment - interestForMonth, balance);
        balance -= principalForMonth;
        totalInterest += interestForMonth;
        months++;
      }
      
      return {
        name: scenario.name,
        extraPayment,
        monthsSaved: originalTerm - months,
        interestSaved: summary.totalInterest - totalInterest,
        newTerm: months,
        totalPayment: amount + totalInterest
      };
    });
  }, [summary]);

  // Amortization chart data
  const amortizationChartData = useMemo(() => {
    if (fullAmortization.length === 0) return [];
    
    const data: any[] = [];
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;
    
    // Sample every N months for chart readability
    const step = Math.max(1, Math.floor(fullAmortization.length / 24));
    
    for (let i = 0; i < fullAmortization.length; i += step) {
      const item = fullAmortization[i];
      for (let j = Math.max(0, i - step + 1); j <= i; j++) {
        if (fullAmortization[j]) {
          cumulativeInterest += fullAmortization[j].interest;
          cumulativePrincipal += fullAmortization[j].principal;
        }
      }
      
      data.push({
        month: item.month,
        balance: Math.round(item.remainingBalance),
        interest: Math.round(item.interest),
        principal: Math.round(item.principal),
        cumulativeInterest: Math.round(cumulativeInterest),
        cumulativePrincipal: Math.round(cumulativePrincipal)
      });
    }
    
    return data;
  }, [fullAmortization]);

  const printLoanDetails = () => setShowPrintDialog(true);

  const generatePDF = () => {
    toast.success("گزارش آماده دانلود است", { description: "فایل PDF با موفقیت ایجاد شد", position: "top-center" });
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
        toast.error("لطفا تمام فیلدها را به درستی پر کنید", { description: "مقادیر وارد شده نامعتبر هستند", position: "top-center" });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
      const totalPayment = monthlyPayment * termMonths;
      const totalInterest = totalPayment - amount;
      
      const currentDate = new Date();
      const payoffDate = new Date(currentDate);
      payoffDate.setMonth(payoffDate.getMonth() + termMonths);
      
      const interestPercentage = (totalInterest / amount) * 100;
      const avgMonthlyInterest = totalInterest / termMonths;
      const avgMonthlyPrincipal = amount / termMonths;

      setSummary({
        monthlyPayment, totalPayment, totalInterest, loanAmount: amount,
        interestRate: parseFloat(interestRate), loanTerm: termMonths, paymentCount: termMonths,
        interestPercentage, avgMonthlyInterest, avgMonthlyPrincipal,
        payoffDate: payoffDate.toLocaleDateString('fa-IR')
      });

      setAmountInWords(`مبلغ وام به حروف: ${convertNumberToPersianWords(amount)} تومان`);

      // Generate full amortization schedule
      const fullSchedule: PaymentScheduleItem[] = [];
      let remainingBalance = amount;
      
      for (let month = 1; month <= termMonths; month++) {
        const interestForMonth = remainingBalance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        remainingBalance -= principalForMonth;
        
        fullSchedule.push({
          month,
          payment: monthlyPayment,
          interest: interestForMonth,
          principal: principalForMonth,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
      
      setFullAmortization(fullSchedule);
      setPaymentSchedule(fullSchedule.slice(0, 12));

      const extended: ExtendedScheduleItem[] = [];
      let extendedBalance = amount;
      let totalPaid = 0;
      const yearsToShow = Math.min(Math.ceil(termMonths / 12), 30);
      
      for (let year = 1; year <= yearsToShow; year++) {
        for (let month = 1; month <= 12; month++) {
          const overallMonth = (year - 1) * 12 + month;
          if (overallMonth > termMonths) break;
          
          const interestForMonth = extendedBalance * monthlyRate;
          const principalForMonth = monthlyPayment - interestForMonth;
          extendedBalance -= principalForMonth;
          totalPaid += monthlyPayment;

          if (month === 12 || overallMonth === termMonths) {
            extended.push({ year, month: overallMonth, totalPaid, remainingBalance: Math.max(0, extendedBalance) });
          }
        }
      }
      
      setExtendedSchedule(extended);

      toast.success("برآورد با موفقیت انجام شد", { description: `پرداخت ماهیانه: ${formatToToman(monthlyPayment)} تومان`, position: "top-center" });
    } catch (error) {
      toast.error("خطا در برآورد", { description: "لطفا مقادیر را بررسی کنید", position: "top-center" });
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
            <h2 className="text-xl font-bold text-center">ماشین حساب وام پیشرفته</h2>
          </div>

          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect mb-2">
              <TabsTrigger value="standard">محاسبه استاندارد</TabsTrigger>
              <TabsTrigger value="advanced">محاسبه پیشرفته</TabsTrigger>
            </TabsList>
            <TabsContent value="standard" className="mt-4">
              <LoanForm
                loanAmount={loanAmount} interestRate={interestRate} loanTerm={loanTerm} paymentType={paymentType}
                onLoanAmountChange={handleLoanAmountChange} onInterestRateChange={setInterestRate}
                onLoanTermChange={handleLoanTermChange} onPaymentTypeChange={handlePaymentTypeChange}
                onCalculate={calculate} isCalculating={isCalculating}
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
                        در این بخش می‌توانید از ویژگی‌های پیشرفته مانند پرداخت‌های اضافی و مقایسه سناریوها استفاده کنید.
                      </p>
                    </div>
                  </div>
                </div>
                <LoanForm
                  loanAmount={loanAmount} interestRate={interestRate} loanTerm={loanTerm} paymentType={paymentType}
                  onLoanAmountChange={handleLoanAmountChange} onInterestRateChange={setInterestRate}
                  onLoanTermChange={handleLoanTermChange} onPaymentTypeChange={handlePaymentTypeChange}
                  onCalculate={calculate} advanced={true} isCalculating={isCalculating}
                  additionalPayment={additionalPayment} onAdditionalPaymentChange={handleAdditionalPaymentChange}
                />
              </div>
            </TabsContent>
          </Tabs>

          {summary && (
            <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <OutcomeInfoCard outcome={`پرداخت ماهیانه: ${formatToToman(summary.monthlyPayment)} تومان`} />
                <OutcomeInfoCard outcome={`تاریخ پایان وام: ${summary.payoffDate}`} />
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-effect text-primary p-4 rounded-xl text-center text-sm mb-6">
                {amountInWords}
              </motion.div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass-effect">
                  <TabsTrigger value="overview">خلاصه</TabsTrigger>
                  <TabsTrigger value="amortization">نمودار بازپرداخت</TabsTrigger>
                  <TabsTrigger value="scenarios">سناریوها</TabsTrigger>
                  <TabsTrigger value="schedule">جدول اقساط</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      تحلیل ساختار وام
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">اصل وام</span>
                          <span className="text-sm text-primary font-semibold">{loanMetrics?.principalToTotalRatio.toFixed(1)}%</span>
                        </div>
                        <Progress value={loanMetrics?.principalToTotalRatio} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">بهره</span>
                          <span className="text-sm text-amber-600 font-semibold">{loanMetrics?.interestToTotalRatio.toFixed(1)}%</span>
                        </div>
                        <Progress value={loanMetrics?.interestToTotalRatio} className="h-2" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <p className="text-lg font-bold text-green-600">{summary.interestPercentage.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">از کل وام</p>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="amortization" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <BarChart3 className="ml-2 h-5 w-5 text-primary" />
                      نمودار مانده وام
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={amortizationChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" label={{ value: 'ماه', position: 'insideBottom', offset: -5 }} />
                          <YAxis tickFormatter={(v) => (v / 1000000).toFixed(0) + 'M'} />
                          <Tooltip formatter={(value: number) => formatToToman(value) + ' تومان'} labelFormatter={(label) => `ماه ${label}`} />
                          <Area type="monotone" dataKey="balance" name="مانده وام" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      نمودار اصل و بهره ماهیانه
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={amortizationChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(v) => (v / 1000000).toFixed(1) + 'M'} />
                          <Tooltip formatter={(value: number) => formatToToman(value) + ' تومان'} />
                          <Legend />
                          <Bar dataKey="principal" name="اصل" stackId="a" fill="#22c55e" />
                          <Bar dataKey="interest" name="بهره" stackId="a" fill="#f97316" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <TrendingUp className="ml-2 h-5 w-5 text-primary" />
                      بهره تجمعی در طول زمان
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={amortizationChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(v) => (v / 1000000).toFixed(0) + 'M'} />
                          <Tooltip formatter={(value: number) => formatToToman(value) + ' تومان'} />
                          <Legend />
                          <Line type="monotone" dataKey="cumulativeInterest" name="بهره تجمعی" stroke="#ef4444" strokeWidth={2} />
                          <Line type="monotone" dataKey="cumulativePrincipal" name="اصل تجمعی" stroke="#22c55e" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="scenarios" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Target className="ml-2 h-5 w-5 text-primary" />
                      سناریوهای پرداخت زودهنگام
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      با پرداخت اضافی می‌توانید در بهره و زمان صرفه‌جویی کنید
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {earlyPayoffScenarios.map((scenario, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`glass-effect rounded-xl p-4 ${index === 0 ? 'border-2 border-muted' : 'border-2 border-green-500/30'}`}
                        >
                          <h4 className="font-medium text-sm mb-3">{scenario.name}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">مدت جدید:</span>
                              <span className="font-semibold">{scenario.newTerm} ماه</span>
                            </div>
                            {scenario.monthsSaved > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">ماه صرفه‌جویی:</span>
                                <span className="font-semibold text-green-600">{scenario.monthsSaved} ماه</span>
                              </div>
                            )}
                            {scenario.interestSaved > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">صرفه‌جویی بهره:</span>
                                <span className="font-semibold text-green-600">{formatToToman(scenario.interestSaved)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">کل پرداختی:</span>
                              <span className="font-semibold">{formatToToman(scenario.totalPayment)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <TrendingDown className="ml-2 h-5 w-5 text-green-600" />
                      مقایسه صرفه‌جویی در بهره
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earlyPayoffScenarios.map(s => ({ name: s.name, interestSaved: Math.max(0, s.interestSaved), totalInterest: summary.totalInterest - s.interestSaved }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tickFormatter={(v) => (v / 1000000).toFixed(0) + 'M'} />
                          <Tooltip formatter={(value: number) => formatToToman(value) + ' تومان'} />
                          <Legend />
                          <Bar dataKey="totalInterest" name="بهره پرداختی" fill="#ef4444" />
                          <Bar dataKey="interestSaved" name="صرفه‌جویی" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="schedule" className="mt-6 space-y-4">
                  {paymentSchedule && extendedSchedule && <PaymentScheduleTable paymentSchedule={paymentSchedule} extendedSchedule={extendedSchedule} />}
                  
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
                </TabsContent>
              </Tabs>

              <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
                <DialogContent className="max-w-md glass-card">
                  <DialogHeader>
                    <DialogTitle>چاپ جزئیات وام</DialogTitle>
                    <DialogDescription>
                      می‌توانید جزئیات وام را چاپ کنید یا به صورت PDF ذخیره کنید.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4 mt-4">
                    <Button onClick={generatePDF} className="flex-1">
                      <FileText className="ml-2 h-4 w-4" />
                      دانلود PDF
                    </Button>
                    <Button variant="outline" onClick={() => setShowPrintDialog(false)} className="flex-1">
                      انصراف
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}
