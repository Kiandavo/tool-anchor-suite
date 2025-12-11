import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, RotateCcw, Copy, Check, TrendingUp, Calendar, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('18');
  const [loanTerm, setLoanTerm] = useState<number>(24);
  const [copied, setCopied] = useState(false);

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => parseFloat(value.replace(/,/g, '')) || 0;

  const result = useMemo(() => {
    const amount = parseNumber(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    
    if (!amount || !rate || !loanTerm) return null;

    const monthlyRate = rate / 12;
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - amount;
    const interestPercentage = (totalInterest / amount) * 100;

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + loanTerm);

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestPercentage,
      payoffDate: payoffDate.toLocaleDateString('fa-IR'),
      principalPercentage: (amount / totalPayment) * 100,
    };
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('fa-IR').format(Math.round(num)) + ' تومان';

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('18');
    setLoanTerm(24);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `
وام: ${formatCurrency(parseNumber(loanAmount))}
نرخ سود: ${interestRate}%
مدت: ${loanTerm} ماه
قسط ماهیانه: ${formatCurrency(result.monthlyPayment)}
کل پرداختی: ${formatCurrency(result.totalPayment)}
کل سود: ${formatCurrency(result.totalInterest)}
    `.trim();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: '۵۰ میلیون', value: '50000000' },
    { label: '۱۰۰ میلیون', value: '100000000' },
    { label: '۲۰۰ میلیون', value: '200000000' },
    { label: '۵۰۰ میلیون', value: '500000000' },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-medium">ماشین حساب وام</span>
            </div>
          </div>

          {/* Loan Amount */}
          <div className="space-y-3">
            <Label className="text-sm">مبلغ وام (تومان)</Label>
            <Input
              type="text"
              value={loanAmount}
              onChange={(e) => setLoanAmount(formatNumber(e.target.value))}
              placeholder="مثال: 100,000,000"
              className="text-lg bg-background/50"
              dir="ltr"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
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
              <Label className="text-sm">نرخ سود سالیانه</Label>
              <span className="text-lg font-bold text-primary">{interestRate}%</span>
            </div>
            <Slider
              value={[parseFloat(interestRate) || 18]}
              onValueChange={(v) => setInterestRate(v[0].toString())}
              min={4}
              max={36}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>۴٪</span>
              <span>۱۸٪</span>
              <span>۳۶٪</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm">مدت بازپرداخت</Label>
              <span className="text-lg font-bold text-primary">{loanTerm} ماه</span>
            </div>
            <Slider
              value={[loanTerm]}
              onValueChange={(v) => setLoanTerm(v[0])}
              min={6}
              max={120}
              step={6}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>۶ ماه</span>
              <span>۵ سال</span>
              <span>۱۰ سال</span>
            </div>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">قسط ماهیانه</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(result.monthlyPayment)}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <Wallet className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(result.totalPayment)}
                  </p>
                  <p className="text-xs text-muted-foreground">کل پرداختی</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2 text-amber-500" />
                  <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {formatCurrency(result.totalInterest)}
                  </p>
                  <p className="text-xs text-muted-foreground">کل سود</p>
                </div>
              </div>

              {/* Interest vs Principal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>اصل وام</span>
                  <span className="text-primary">{result.principalPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={result.principalPercentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>سود</span>
                  <span className="text-amber-500">{result.interestPercentage.toFixed(1)}%</span>
                </div>
              </div>

              {/* Payoff Date */}
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    پایان وام: {result.payoffDate}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {result && (
              <Button variant="outline" size="sm" onClick={copyResult} className="rounded-full">
                {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                کپی
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full text-muted-foreground">
              <RotateCcw className="w-4 h-4 ml-2" />
              پاک کردن
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
