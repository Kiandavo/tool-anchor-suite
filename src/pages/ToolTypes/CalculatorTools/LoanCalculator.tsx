import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Calculator, RotateCcw, Copy, Check, TrendingUp, Calendar, Wallet,
  Building2, ArrowLeftRight, FileSpreadsheet, Plus, Trash2, Keyboard
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';
import { iranianBanks, loanCategories, getBanksByCategory, getBankColor, type BankLoanProduct, type LoanCategory } from '@/data/iranian-banks';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell 
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  interestPercentage: number;
  payoffDate: string;
  principalPercentage: number;
}

interface ComparisonLoan {
  id: string;
  name: string;
  amount: number;
  rate: number;
  term: number;
  result: LoanResult | null;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const formatNumber = (value: string) => {
  const num = value.replace(/[^\d]/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumber = (value: string): number => parseFloat(value.replace(/,/g, '')) || 0;

const formatCurrency = (num: number) => 
  new Intl.NumberFormat('fa-IR').format(Math.round(num)) + ' تومان';

const formatCurrencyShort = (num: number) => {
  if (num >= 1000000000) {
    return new Intl.NumberFormat('fa-IR').format(Math.round(num / 1000000000)) + ' میلیارد';
  }
  if (num >= 1000000) {
    return new Intl.NumberFormat('fa-IR').format(Math.round(num / 1000000)) + ' میلیون';
  }
  return new Intl.NumberFormat('fa-IR').format(Math.round(num));
};

const calculateLoan = (amount: number, rate: number, term: number): LoanResult | null => {
  if (!amount || !rate || !term) return null;
  
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  const totalPayment = monthlyPayment * term;
  const totalInterest = totalPayment - amount;
  const interestPercentage = (totalInterest / amount) * 100;

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + term);

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    interestPercentage,
    payoffDate: payoffDate.toLocaleDateString('fa-IR'),
    principalPercentage: (amount / totalPayment) * 100,
  };
};

const generateAmortization = (amount: number, rate: number, term: number): AmortizationRow[] => {
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  
  const rows: AmortizationRow[] = [];
  let balance = amount;
  
  for (let month = 1; month <= term; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    
    rows.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }
  
  return rows;
};

export default function LoanCalculator() {
  const [activeTab, setActiveTab] = useState<string>('simple');
  const [selectedCategory, setSelectedCategory] = useState<LoanCategory>('all');
  const [selectedBank, setSelectedBank] = useState<BankLoanProduct | null>(null);
  
  // Simple mode state
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('18');
  const [loanTerm, setLoanTerm] = useState<number>(24);
  const [copied, setCopied] = useState(false);
  
  // Comparison mode state
  const [comparisonLoans, setComparisonLoans] = useState<ComparisonLoan[]>([
    { id: '1', name: 'وام ۱', amount: 100000000, rate: 18, term: 24, result: null },
    { id: '2', name: 'وام ۲', amount: 100000000, rate: 23, term: 24, result: null },
  ]);
  
  // Professional mode state
  const [additionalPayment, setAdditionalPayment] = useState<string>('0');

  const result = useMemo(() => {
    return calculateLoan(parseNumber(loanAmount), parseFloat(interestRate), loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  const amortizationData = useMemo(() => {
    const amount = parseNumber(loanAmount);
    const rate = parseFloat(interestRate);
    if (!amount || !rate || !loanTerm) return [];
    return generateAmortization(amount, rate, loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  const comparisonChartData = useMemo(() => {
    const data: { month: number; [key: string]: number }[] = [];
    const maxTerm = Math.max(...comparisonLoans.map(l => l.term));
    
    for (let month = 1; month <= maxTerm; month++) {
      const point: { month: number; [key: string]: number } = { month };
      comparisonLoans.forEach((loan, idx) => {
        if (loan.result && month <= loan.term) {
          const amort = generateAmortization(loan.amount, loan.rate, loan.term);
          const row = amort[month - 1];
          if (row) {
            point[`balance${idx}`] = row.balance;
          }
        }
      });
      data.push(point);
    }
    return data;
  }, [comparisonLoans]);

  const comparisonBarData = useMemo(() => {
    return comparisonLoans.map((loan, idx) => ({
      name: loan.name,
      principal: loan.amount,
      interest: loan.result?.totalInterest || 0,
    }));
  }, [comparisonLoans]);

  const handleReset = useCallback(() => {
    setLoanAmount('');
    setInterestRate('18');
    setLoanTerm(24);
    setSelectedBank(null);
    setAdditionalPayment('0');
  }, []);

  const copyResult = useCallback(async () => {
    if (!result) return;
    const text = `
${selectedBank ? `بانک: ${selectedBank.bankName} - ${selectedBank.loanType}` : 'محاسبه وام'}
مبلغ وام: ${formatCurrency(parseNumber(loanAmount))}
نرخ سود: ${interestRate}%
مدت: ${loanTerm} ماه
قسط ماهیانه: ${formatCurrency(result.monthlyPayment)}
کل پرداختی: ${formatCurrency(result.totalPayment)}
کل سود: ${formatCurrency(result.totalInterest)}
پایان وام: ${result.payoffDate}
    `.trim();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('نتیجه کپی شد');
    setTimeout(() => setCopied(false), 2000);
  }, [result, loanAmount, interestRate, loanTerm, selectedBank]);

  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: () => {
        if (result) {
          toast.success('محاسبه انجام شد');
        }
      },
      description: 'محاسبه',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: handleReset,
      description: 'پاک کردن',
    },
  ]);

  const handleBankSelect = (bank: BankLoanProduct) => {
    setSelectedBank(bank);
    setInterestRate(bank.interestRate.toString());
    if (bank.maxTerm < loanTerm) {
      setLoanTerm(bank.maxTerm);
    }
  };

  const updateComparisonLoan = (id: string, field: keyof ComparisonLoan, value: number | string) => {
    setComparisonLoans(prev => prev.map(loan => {
      if (loan.id !== id) return loan;
      const updated = { ...loan, [field]: value };
      updated.result = calculateLoan(updated.amount, updated.rate, updated.term);
      return updated;
    }));
  };

  const addComparisonLoan = () => {
    if (comparisonLoans.length >= 4) {
      toast.error('حداکثر ۴ وام قابل مقایسه است');
      return;
    }
    const newId = (comparisonLoans.length + 1).toString();
    setComparisonLoans(prev => [...prev, {
      id: newId,
      name: `وام ${newId}`,
      amount: 100000000,
      rate: 18,
      term: 24,
      result: calculateLoan(100000000, 18, 24),
    }]);
  };

  const removeComparisonLoan = (id: string) => {
    if (comparisonLoans.length <= 2) {
      toast.error('حداقل ۲ وام برای مقایسه نیاز است');
      return;
    }
    setComparisonLoans(prev => prev.filter(l => l.id !== id));
  };

  const amountPresets = [
    { label: '۵۰ میلیون', value: '50000000' },
    { label: '۱۰۰ میلیون', value: '100000000' },
    { label: '۲۰۰ میلیون', value: '200000000' },
    { label: '۵۰۰ میلیون', value: '500000000' },
    { label: '۱ میلیارد', value: '1000000000' },
  ];

  const termPresets = [
    { label: '۱ سال', value: 12 },
    { label: '۲ سال', value: 24 },
    { label: '۳ سال', value: 36 },
    { label: '۵ سال', value: 60 },
    { label: '۱۰ سال', value: 120 },
  ];

  const chartColors = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Keyboard className="w-3 h-3" />
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Enter</kbd>
          محاسبه
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Shift+R</kbd>
          پاک کردن
        </span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="simple" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            ساده
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            مقایسه
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            حرفه‌ای
          </TabsTrigger>
        </TabsList>

        {/* Simple Mode */}
        <TabsContent value="simple" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Inputs */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                {/* Bank Category Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">دسته‌بندی وام</Label>
                  <div className="flex flex-wrap gap-2">
                    {loanCategories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedBank(null);
                        }}
                        className="text-xs rounded-full"
                      >
                        <span className="ml-1">{cat.icon}</span>
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Bank Presets */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">انتخاب بانک و نوع وام</Label>
                  <ScrollArea className="h-40">
                    <div className="grid gap-2 pr-4">
                      {getBanksByCategory(selectedCategory).map((bank) => (
                        <motion.button
                          key={bank.id}
                          onClick={() => handleBankSelect(bank)}
                          className={`p-3 rounded-lg border text-right transition-all ${
                            selectedBank?.id === bank.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{bank.bankName}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getBankColor(bank.bankName)}`}>
                              {bank.interestRate}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{bank.loanType}</p>
                        </motion.button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Loan Amount */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">مبلغ وام (تومان)</Label>
                  <Input
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(formatNumber(e.target.value))}
                    placeholder="مثال: 100,000,000"
                    className="text-lg bg-background/50"
                    dir="ltr"
                  />
                  <div className="flex flex-wrap gap-2">
                    {amountPresets.map((preset) => (
                      <Button
                        key={preset.value}
                        variant="outline"
                        size="sm"
                        onClick={() => setLoanAmount(formatNumber(preset.value))}
                        className="text-xs rounded-full"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">نرخ سود سالیانه</Label>
                    <span className="text-lg font-bold text-primary">{interestRate}%</span>
                  </div>
                  <Slider
                    value={[parseFloat(interestRate) || 18]}
                    onValueChange={(v) => setInterestRate(v[0].toString())}
                    min={2}
                    max={36}
                    step={1}
                    className="py-2"
                  />
                </div>

                {/* Loan Term */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">مدت بازپرداخت</Label>
                    <span className="text-lg font-bold text-primary">{loanTerm} ماه</span>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(v) => setLoanTerm(v[0])}
                    min={6}
                    max={selectedBank?.maxTerm || 120}
                    step={6}
                    className="py-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {termPresets.map((preset) => (
                      <Button
                        key={preset.value}
                        variant={loanTerm === preset.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLoanTerm(preset.value)}
                        className="text-xs rounded-full"
                        disabled={selectedBank && preset.value > selectedBank.maxTerm}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Results */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Selected Bank Info */}
                    {selectedBank && (
                      <Card className={`border ${getBankColor(selectedBank.bankName)}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            <div>
                              <p className="font-medium">{selectedBank.bankName}</p>
                              <p className="text-xs text-muted-foreground">{selectedBank.loanType} - {selectedBank.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Main Result */}
                    <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-1">قسط ماهیانه</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(result.monthlyPayment)}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4 text-center">
                          <Wallet className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-lg font-semibold">
                            {formatCurrency(result.totalPayment)}
                          </p>
                          <p className="text-xs text-muted-foreground">کل پرداختی</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-amber-500" />
                          <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                            {formatCurrency(result.totalInterest)}
                          </p>
                          <p className="text-xs text-muted-foreground">کل سود</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Interest vs Principal */}
                    <Card>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>اصل وام</span>
                          <span className="text-primary font-medium">{result.principalPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={result.principalPercentage} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span>سود</span>
                          <span className="text-amber-500 font-medium">{result.interestPercentage.toFixed(1)}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payoff Date */}
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">پایان وام: {result.payoffDate}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" onClick={copyResult} className="rounded-full">
                        {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                        کپی نتیجه
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
                        <RotateCcw className="w-4 h-4 ml-2" />
                        پاک کردن
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                    <Card className="w-full bg-muted/30">
                      <CardContent className="p-12 text-center">
                        <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          مبلغ وام را وارد کنید
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        {/* Comparison Mode */}
        <TabsContent value="compare" className="space-y-6">
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-6">
              {/* Comparison Inputs */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisonLoans.map((loan, idx) => (
                  <Card key={loan.id} className="relative">
                    <CardContent className="p-4 space-y-3">
                      {comparisonLoans.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-2 h-6 w-6"
                          onClick={() => removeComparisonLoan(loan.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                      <Input
                        value={loan.name}
                        onChange={(e) => updateComparisonLoan(loan.id, 'name', e.target.value)}
                        className="text-sm font-medium"
                      />
                      <div>
                        <Label className="text-xs">مبلغ</Label>
                        <Input
                          type="text"
                          value={formatNumber(loan.amount.toString())}
                          onChange={(e) => updateComparisonLoan(loan.id, 'amount', parseNumber(e.target.value))}
                          className="text-sm"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">نرخ سود (%)</Label>
                        <Input
                          type="number"
                          value={loan.rate}
                          onChange={(e) => updateComparisonLoan(loan.id, 'rate', parseFloat(e.target.value))}
                          className="text-sm"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">مدت (ماه)</Label>
                        <Input
                          type="number"
                          value={loan.term}
                          onChange={(e) => updateComparisonLoan(loan.id, 'term', parseInt(e.target.value))}
                          className="text-sm"
                          dir="ltr"
                        />
                      </div>
                      {loan.result && (
                        <div className="pt-2 border-t space-y-1">
                          <p className="text-xs text-muted-foreground">قسط ماهیانه:</p>
                          <p className="font-semibold text-sm" style={{ color: chartColors[idx] }}>
                            {formatCurrency(loan.result.monthlyPayment)}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {comparisonLoans.length < 4 && (
                  <Card className="border-dashed cursor-pointer hover:border-primary/50 transition-colors" onClick={addComparisonLoan}>
                    <CardContent className="p-4 h-full flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Plus className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">افزودن وام</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Comparison Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Balance Over Time Chart */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4 text-sm">مانده وام در طول زمان</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={comparisonChartData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tickFormatter={(v) => formatCurrencyShort(v)} tick={{ fontSize: 10 }} />
                          <Tooltip 
                            formatter={(value: number) => formatCurrency(value)}
                            labelFormatter={(label) => `ماه ${label}`}
                          />
                          <Legend />
                          {comparisonLoans.map((loan, idx) => (
                            <Area
                              key={loan.id}
                              type="monotone"
                              dataKey={`balance${idx}`}
                              name={loan.name}
                              stroke={chartColors[idx]}
                              fill={chartColors[idx]}
                              fillOpacity={0.2}
                            />
                          ))}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Principal vs Interest Chart */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4 text-sm">اصل وام و سود</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonBarData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis type="number" tickFormatter={(v) => formatCurrencyShort(v)} tick={{ fontSize: 10 }} />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="principal" name="اصل وام" stackId="a" fill="hsl(var(--primary))" />
                          <Bar dataKey="interest" name="سود" stackId="a" fill="hsl(var(--chart-2))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Best Option */}
              {comparisonLoans.every(l => l.result) && (
                <Card className="bg-green-500/10 border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-600 dark:text-green-400">بهترین گزینه</p>
                        <p className="text-sm text-muted-foreground">
                          {comparisonLoans.reduce((best, curr) => 
                            (curr.result?.totalInterest || Infinity) < (best.result?.totalInterest || Infinity) ? curr : best
                          ).name} با کمترین سود
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">صرفه‌جویی</p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(
                            Math.max(...comparisonLoans.map(l => l.result?.totalInterest || 0)) -
                            Math.min(...comparisonLoans.map(l => l.result?.totalInterest || 0))
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Mode - Amortization */}
        <TabsContent value="professional" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Inputs */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>مبلغ وام (تومان)</Label>
                  <Input
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(formatNumber(e.target.value))}
                    placeholder="مثال: 100,000,000"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>نرخ سود سالیانه (%)</Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>مدت بازپرداخت (ماه)</Label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value) || 12)}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>پرداخت اضافی ماهیانه</Label>
                  <Input
                    type="text"
                    value={additionalPayment}
                    onChange={(e) => setAdditionalPayment(formatNumber(e.target.value))}
                    placeholder="اختیاری"
                    dir="ltr"
                  />
                </div>

                {result && (
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>قسط ماهیانه:</span>
                      <span className="font-medium">{formatCurrency(result.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>کل سود:</span>
                      <span className="font-medium text-amber-600">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>کل پرداختی:</span>
                      <span className="font-medium">{formatCurrency(result.totalPayment)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Amortization Table */}
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">جدول اقساط</h4>
                  {amortizationData.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => {
                      const csv = [
                        'ماه,قسط,اصل,سود,مانده',
                        ...amortizationData.map(row => 
                          `${row.month},${Math.round(row.payment)},${Math.round(row.principal)},${Math.round(row.interest)},${Math.round(row.balance)}`
                        )
                      ].join('\n');
                      navigator.clipboard.writeText(csv);
                      toast.success('جدول اقساط کپی شد');
                    }}>
                      <Copy className="w-4 h-4 ml-2" />
                      کپی جدول
                    </Button>
                  )}
                </div>
                
                {amortizationData.length > 0 ? (
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-right">ماه</TableHead>
                          <TableHead className="text-right">قسط</TableHead>
                          <TableHead className="text-right">اصل</TableHead>
                          <TableHead className="text-right">سود</TableHead>
                          <TableHead className="text-right">مانده</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {amortizationData.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell className="font-medium">{row.month}</TableCell>
                            <TableCell>{formatCurrency(row.payment)}</TableCell>
                            <TableCell className="text-primary">{formatCurrency(row.principal)}</TableCell>
                            <TableCell className="text-amber-600">{formatCurrency(row.interest)}</TableCell>
                            <TableCell>{formatCurrency(row.balance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>مبلغ وام را وارد کنید تا جدول اقساط نمایش داده شود</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
