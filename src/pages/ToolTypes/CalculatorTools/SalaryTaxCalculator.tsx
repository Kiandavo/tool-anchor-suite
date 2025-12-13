import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Landmark, RotateCcw, Copy, Check, TrendingUp, Wallet } from "lucide-react";
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const TAX_BRACKETS = {
  '1404': [
    { max: 8_800_000, rate: 0, name: 'معاف', color: 'bg-green-500' },
    { max: 13_200_000, rate: 0.10, name: '۱۰٪', color: 'bg-lime-500' },
    { max: 22_000_000, rate: 0.15, name: '۱۵٪', color: 'bg-yellow-500' },
    { max: 30_800_000, rate: 0.20, name: '۲۰٪', color: 'bg-orange-500' },
    { max: Infinity, rate: 0.30, name: '۳۰٪', color: 'bg-red-500' },
  ],
  '1402': [
    { max: 7_000_000, rate: 0, name: 'معاف', color: 'bg-green-500' },
    { max: 10_500_000, rate: 0.10, name: '۱۰٪', color: 'bg-lime-500' },
    { max: 17_500_000, rate: 0.15, name: '۱۵٪', color: 'bg-yellow-500' },
    { max: 24_500_000, rate: 0.20, name: '۲۰٪', color: 'bg-orange-500' },
    { max: Infinity, rate: 0.30, name: '۳۰٪', color: 'bg-red-500' },
  ]
};

export default function SalaryTaxCalculator() {
  const [salary, setSalary] = useState<string>('');
  const [taxYear, setTaxYear] = useState<string>('1404');
  const [calculationType, setCalculationType] = useState<string>('monthly');
  const [copied, setCopied] = useState(false);

  const formatNumber = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (value: string): number => parseFloat(value.replace(/,/g, '')) || 0;

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('fa-IR').format(Math.round(amount)) + ' تومان';

  const result = useMemo(() => {
    const salaryValue = parseNumber(salary);
    if (!salaryValue) return null;

    const isYearly = calculationType === 'yearly';
    const monthlySalary = isYearly ? salaryValue / 12 : salaryValue;

    const brackets = TAX_BRACKETS[taxYear as keyof typeof TAX_BRACKETS];
    let totalTax = 0;
    let remainingSalary = monthlySalary;
    let previousMax = 0;

    const details: { name: string; amount: number; tax: number; color: string }[] = [];

    for (const bracket of brackets) {
      const bracketRange = bracket.max === Infinity 
        ? remainingSalary 
        : Math.min(bracket.max - previousMax, remainingSalary);

      if (bracketRange > 0) {
        const taxForBracket = bracketRange * bracket.rate;
        totalTax += taxForBracket;
        
        details.push({
          name: bracket.name,
          amount: bracketRange,
          tax: taxForBracket,
          color: bracket.color,
        });

        remainingSalary -= bracketRange;
        if (remainingSalary <= 0) break;
      }
      previousMax = bracket.max === Infinity ? previousMax : bracket.max;
    }

    const grossSalary = isYearly ? monthlySalary * 12 : monthlySalary;
    const totalTaxFinal = isYearly ? totalTax * 12 : totalTax;
    const netSalary = grossSalary - totalTaxFinal;
    const effectiveRate = grossSalary > 0 ? (totalTaxFinal / grossSalary) * 100 : 0;

    return {
      grossSalary,
      totalTax: totalTaxFinal,
      netSalary,
      effectiveRate,
      details: details.map(d => ({
        ...d,
        amount: isYearly ? d.amount * 12 : d.amount,
        tax: isYearly ? d.tax * 12 : d.tax,
      })),
    };
  }, [salary, taxYear, calculationType]);

  const handleReset = () => {
    setSalary('');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `حقوق ناخالص: ${formatCurrency(result.grossSalary)}\nمالیات: ${formatCurrency(result.totalTax)}\nحقوق خالص: ${formatCurrency(result.netSalary)}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('کپی شد');
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: '۸ میلیون', value: '8000000' },
    { label: '۱۰ میلیون', value: '10000000' },
    { label: '۱۵ میلیون', value: '15000000' },
    { label: '۲۰ میلیون', value: '20000000' },
    { label: '۲۵ میلیون', value: '25000000' },
    { label: '۳۵ میلیون', value: '35000000' },
    { label: '۵۰ میلیون', value: '50000000' },
    { label: '۱۰۰ میلیون', value: '100000000' },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Landmark className="w-4 h-4" />
              <span className="text-sm font-medium">محاسبه مالیات حقوق</span>
            </div>
          </div>

          {/* Year & Type Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">سال مالیاتی</Label>
              <Select value={taxYear} onValueChange={setTaxYear}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1404">۱۴۰۴</SelectItem>
                  <SelectItem value="1403">۱۴۰۳</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">نوع محاسبه</Label>
              <Tabs value={calculationType} onValueChange={setCalculationType}>
                <TabsList className="grid w-full grid-cols-2 h-10">
                  <TabsTrigger value="monthly" className="text-xs">ماهیانه</TabsTrigger>
                  <TabsTrigger value="yearly" className="text-xs">سالیانه</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Salary Input */}
          <div className="space-y-3">
            <Label className="text-sm">
              حقوق {calculationType === 'monthly' ? 'ماهیانه' : 'سالیانه'} (تومان)
            </Label>
            <Input
              type="text"
              value={salary}
              onChange={(e) => setSalary(formatNumber(e.target.value))}
              placeholder={calculationType === 'monthly' ? '۱۵,۰۰۰,۰۰۰' : '۱۸۰,۰۰۰,۰۰۰'}
              className="text-lg bg-background/50"
              dir="ltr"
            />
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setSalary(formatNumber(preset.value))}
                  className="text-xs rounded-full"
                >
                  {preset.label}
                </Button>
              ))}
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
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 text-center">
                  <Wallet className="w-5 h-5 mx-auto mb-2 text-green-500" />
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.netSalary)}
                  </p>
                  <p className="text-xs text-muted-foreground">حقوق خالص</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2 text-red-500" />
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(result.totalTax)}
                  </p>
                  <p className="text-xs text-muted-foreground">مالیات</p>
                </div>
              </div>

              {/* Effective Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>نرخ مؤثر مالیات</span>
                  <span className="font-semibold text-primary">{result.effectiveRate.toFixed(2)}%</span>
                </div>
                <Progress value={Math.min(result.effectiveRate, 30) * 3.33} className="h-2" />
              </div>

              {/* Tax Brackets Breakdown */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">جزئیات پله‌های مالیاتی</Label>
                <div className="space-y-2">
                  {result.details.map((detail, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${detail.color}`} />
                        <span className="text-sm">{detail.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatCurrency(detail.tax)}
                      </span>
                    </div>
                  ))}
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
