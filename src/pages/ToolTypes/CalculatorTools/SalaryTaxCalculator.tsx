
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  Landmark, 
  TrendingUp, 
  Calculator, 
  FileText, 
  PieChart, 
  Info,
  DollarSign,
  RotateCcw,
  Download,
  BarChart3,
  Clock,
  Calendar,
  Wallet
} from "lucide-react";
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Legend } from 'recharts';

// Enhanced tax brackets for different years
const TAX_BRACKETS = {
  '1403': [
    { max: 8_800_000, rate: 0, name: 'معاف از مالیات', color: '#22c55e' },
    { max: 13_200_000, rate: 0.10, name: 'پله اول - ۱۰٪', color: '#84cc16' },
    { max: 22_000_000, rate: 0.15, name: 'پله دوم - ۱۵٪', color: '#eab308' },
    { max: 30_800_000, rate: 0.20, name: 'پله سوم - ۲۰٪', color: '#f97316' },
    { max: Infinity, rate: 0.30, name: 'پله چهارم - ۳۰٪', color: '#ef4444' },
  ],
  '1402': [
    { max: 7_000_000, rate: 0, name: 'معاف از مالیات', color: '#22c55e' },
    { max: 10_500_000, rate: 0.10, name: 'پله اول - ۱۰٪', color: '#84cc16' },
    { max: 17_500_000, rate: 0.15, name: 'پله دوم - ۱۵٪', color: '#eab308' },
    { max: 24_500_000, rate: 0.20, name: 'پله سوم - ۲۰٪', color: '#f97316' },
    { max: Infinity, rate: 0.30, name: 'پله چهارم - ۳۰٪', color: '#ef4444' },
  ]
};

interface TaxDetail {
  bracket: string;
  amount: number;
  rate: number;
  tax: number;
  name: string;
  color: string;
}

interface TaxResult {
  grossSalary: number;
  totalTax: number;
  netSalary: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  details: TaxDetail[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SalaryTaxCalculator() {
  const [salary, setSalary] = useState<string>('');
  const [taxYear, setTaxYear] = useState<string>('1403');
  const [calculationType, setCalculationType] = useState<string>('monthly');
  const [result, setResult] = useState<TaxResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Format input with thousands separator
  const formatInput = (value: string): string => {
    const plainNumber = value.replace(/[^\d]/g, '');
    if (plainNumber === '') return '';
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);
    setSalary(formatted);
  };
  
  const formatRial = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(Math.round(amount)) + ' تومان';
  };

  const calculateTax = useCallback(async (yearToCalculate: string = taxYear): Promise<TaxResult | null> => {
    const salaryValueRaw = parseFloat(salary.replace(/,/g, ''));
    
    if (isNaN(salaryValueRaw) || salaryValueRaw < 0) return null;

    const isYearly = calculationType === 'yearly';
    const salaryMonthly = isYearly ? salaryValueRaw / 12 : salaryValueRaw;

    const brackets = TAX_BRACKETS[yearToCalculate as keyof typeof TAX_BRACKETS];
    let totalTaxMonthly = 0;
    let remainingSalaryMonthly = salaryMonthly;
    const detailsMonthly: TaxDetail[] = [];
    let previousMax = 0;
    
    for (const bracket of brackets) {
      const bracketRange = bracket.max === Infinity ? remainingSalaryMonthly : Math.min(bracket.max - previousMax, remainingSalaryMonthly);
      
      if (bracketRange > 0) {
        const taxForBracket = bracketRange * bracket.rate;
        totalTaxMonthly += taxForBracket;
        
        detailsMonthly.push({
          bracket: `${formatRial(previousMax)} تا ${bracket.max !== Infinity ? formatRial(bracket.max) : 'بی‌نهایت'}`,
          amount: bracketRange,
          rate: bracket.rate * 100,
          tax: taxForBracket,
          name: bracket.name,
          color: bracket.color
        });
        
        remainingSalaryMonthly -= bracketRange;
        if (remainingSalaryMonthly <= 0) break;
      }
      
      previousMax = bracket.max === Infinity ? previousMax : bracket.max;
    }

    const grossSalary = isYearly ? salaryMonthly * 12 : salaryMonthly;
    const totalTax = isYearly ? totalTaxMonthly * 12 : totalTaxMonthly;
    const netSalary = grossSalary - totalTax;
    const effectiveTaxRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
    const marginalTaxRate = detailsMonthly.length > 0 ? detailsMonthly[detailsMonthly.length - 1].rate : 0;

    const details = detailsMonthly.map(d => ({
      ...d,
      amount: isYearly ? d.amount * 12 : d.amount,
      tax: isYearly ? d.tax * 12 : d.tax,
    }));

    return { grossSalary, totalTax, netSalary, effectiveTaxRate, marginalTaxRate, details };
  }, [salary, taxYear, calculationType]);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    try {
      const salaryValue = parseFloat(salary.replace(/,/g, ''));
      
      if (isNaN(salaryValue) || salaryValue < 0) {
        toast.error("مقدار نامعتبر", { description: "لطفا مقدار معتبری برای حقوق وارد کنید", position: "top-center" });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 800));
      const taxResult = await calculateTax();
      
      if (taxResult) {
        setResult(taxResult);
        toast.success("محاسبه با موفقیت انجام شد", { description: `مالیات: ${formatRial(taxResult.totalTax)}`, position: "top-center" });
      }
    } catch (error) {
      toast.error("خطا در محاسبه", { description: "لطفا مقادیر را بررسی کنید", position: "top-center" });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setSalary('');
    setResult(null);
    toast.info("فرم پاک شد", { description: "اطلاعات جدید وارد کنید", position: "top-center" });
  };

  // Tax Bracket Chart Data
  const taxBracketChartData = useMemo(() => {
    if (!result) return [];
    return result.details.filter(d => d.amount > 0).map(d => ({
      name: d.name.replace(' - ', '\n'),
      amount: Math.round(d.amount),
      tax: Math.round(d.tax),
      fill: d.color
    }));
  }, [result]);

  // Pie Chart Data for Net vs Gross
  const pieChartData = useMemo(() => {
    if (!result) return [];
    return [
      { name: 'حقوق خالص', value: Math.round(result.netSalary), fill: '#22c55e' },
      { name: 'مالیات', value: Math.round(result.totalTax), fill: '#ef4444' }
    ];
  }, [result]);

  // Take-home pay breakdown
  const takeHomeBreakdown = useMemo(() => {
    if (!result) return null;
    const monthly = calculationType === 'yearly' ? result.netSalary / 12 : result.netSalary;
    return {
      hourly: monthly / 176, // 22 days * 8 hours
      daily: monthly / 22,
      weekly: monthly / 4,
      monthly: monthly,
      yearly: monthly * 12
    };
  }, [result, calculationType]);

  const taxBurdenPercentage = useMemo(() => {
    if (!result) return 0;
    return Math.min((result.effectiveTaxRate / 30) * 100, 100);
  }, [result]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            محاسبه‌گر پیشرفته مالیات حقوق
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="neo-glass rounded-xl p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              پلکان‌های مالیاتی سال {taxYear}
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {TAX_BRACKETS[taxYear as keyof typeof TAX_BRACKETS].map((bracket, index) => {
                const isYearly = calculationType === 'yearly';
                const prevMax = TAX_BRACKETS[taxYear as keyof typeof TAX_BRACKETS][index - 1]?.max || 0;
                const displayMax = bracket.max === Infinity ? Infinity : (isYearly ? bracket.max * 12 : bracket.max);
                return (
                  <p key={index} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: bracket.color }}></span>
                    {bracket.name}: {displayMax === Infinity ? 'بیش از ' + formatRial(isYearly ? prevMax * 12 : prevMax) : `تا ${formatRial(displayMax)}`}
                  </p>
                );
              })}
            </div>
          </div>
          
          <Tabs defaultValue="monthly" value={calculationType} onValueChange={setCalculationType}>
            <TabsList className="grid grid-cols-2 mb-4 glass-effect">
              <TabsTrigger value="monthly">محاسبه ماهیانه</TabsTrigger>
              <TabsTrigger value="yearly">محاسبه سالیانه</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tax-year" className="flex items-center text-sm font-medium">
                    <FileText className="ml-1 h-3 w-3 text-primary" />
                    سال مالیاتی
                  </Label>
                  <Select value={taxYear} onValueChange={setTaxYear}>
                    <SelectTrigger id="tax-year" className="mt-1 glass-effect">
                      <SelectValue placeholder="انتخاب سال مالیاتی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1403">۱۴۰۳</SelectItem>
                      <SelectItem value="1402">۱۴۰۲</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="salary" className="flex items-center text-sm font-medium">
                    <DollarSign className="ml-1 h-3 w-3 text-primary" />
                    حقوق {calculationType === 'monthly' ? 'ماهیانه' : 'سالیانه'} (تومان)
                  </Label>
                  <Input
                    id="salary"
                    value={salary}
                    onChange={handleSalaryChange}
                    placeholder={`مثلاً ${calculationType === 'monthly' ? '15,000,000' : '180,000,000'}`}
                    className="mt-1 glass-effect transition-all duration-300 focus:scale-105"
                    dir="ltr"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  onClick={handleCalculate} 
                  disabled={isCalculating}
                  className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                  {isCalculating ? 'در حال محاسبه...' : 'محاسبه مالیات'}
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <RotateCcw className="ml-2 h-4 w-4" />
                  پاک کردن
                </Button>
              </div>
            </div>
          </Tabs>
          
          {result && (
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass-effect">
                  <TabsTrigger value="overview">خلاصه</TabsTrigger>
                  <TabsTrigger value="brackets">پله‌های مالیاتی</TabsTrigger>
                  <TabsTrigger value="comparison">مقایسه</TabsTrigger>
                  <TabsTrigger value="breakdown">درآمد خالص</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard outcome={`حقوق خالص: ${formatRial(result.netSalary)}`} />
                    <OutcomeInfoCard outcome={`مالیات کل: ${formatRial(result.totalTax)} (${result.effectiveTaxRate.toFixed(2)}%)`} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-5 w-5 text-green-600 ml-2" />
                        <h3 className="font-medium text-sm">حقوق ناخالص</h3>
                      </div>
                      <p className="text-lg font-bold text-green-600">{formatRial(result.grossSalary)}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-red-600 ml-2" />
                        <h3 className="font-medium text-sm">نرخ مالیات مؤثر</h3>
                      </div>
                      <p className="text-lg font-bold text-red-600">{result.effectiveTaxRate.toFixed(2)}%</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <PieChart className="h-5 w-5 text-blue-600 ml-2" />
                        <h3 className="font-medium text-sm">نرخ مالیات نهایی</h3>
                      </div>
                      <p className="text-lg font-bold text-blue-600">{result.marginalTaxRate.toFixed(0)}%</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      بار مالیاتی
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>درصد مالیات از درآمد</span>
                        <span>{result.effectiveTaxRate.toFixed(2)}%</span>
                      </div>
                      <Progress value={taxBurdenPercentage} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>۰%</span>
                        <span>۱۵%</span>
                        <span>۳۰%</span>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="brackets" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <BarChart3 className="ml-2 h-5 w-5 text-primary" />
                      نمودار پله‌های مالیاتی
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={taxBracketChartData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(v) => (v / 1000000).toFixed(1) + 'M'} />
                          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value: number) => formatRial(value)}
                            labelFormatter={(label) => `پله: ${label}`}
                          />
                          <Bar dataKey="amount" name="مبلغ مشمول" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                          <Bar dataKey="tax" name="مالیات" fill="#ef4444" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="glass-effect rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="py-3 px-4 text-right text-xs font-medium">پله مالیاتی</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">مبلغ مشمول</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">نرخ</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">مالیات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {result.details.map((detail, index) => (
                            <tr key={index} className="text-sm hover:bg-muted/20 transition-colors">
                              <td className="py-3 px-4 flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: detail.color }}></span>
                                {detail.name}
                              </td>
                              <td className="py-3 px-4">{formatRial(detail.amount)}</td>
                              <td className="py-3 px-4">{detail.rate}٪</td>
                              <td className="py-3 px-4 font-semibold">{formatRial(detail.tax)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="comparison" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      مقایسه ناخالص و خالص
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatRial(value)} />
                          <Legend />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="neo-glass rounded-xl p-5">
                      <h4 className="font-medium text-sm text-muted-foreground mb-3">حقوق ناخالص</h4>
                      <p className="text-2xl font-bold text-green-600">{formatRial(result.grossSalary)}</p>
                      <div className="mt-2 w-full bg-muted rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="neo-glass rounded-xl p-5">
                      <h4 className="font-medium text-sm text-muted-foreground mb-3">حقوق خالص</h4>
                      <p className="text-2xl font-bold text-blue-600">{formatRial(result.netSalary)}</p>
                      <div className="mt-2 w-full bg-muted rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(result.netSalary / result.grossSalary) * 100}%` }}></div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="breakdown" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Wallet className="ml-2 h-5 w-5 text-primary" />
                      درآمد خالص به تفکیک
                    </h3>
                    {takeHomeBreakdown && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">ساعتی</p>
                          <p className="text-lg font-bold text-primary">{formatRial(takeHomeBreakdown.hourly)}</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">روزانه</p>
                          <p className="text-lg font-bold text-blue-600">{formatRial(takeHomeBreakdown.daily)}</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">هفتگی</p>
                          <p className="text-lg font-bold text-green-600">{formatRial(takeHomeBreakdown.weekly)}</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <Wallet className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">ماهیانه</p>
                          <p className="text-lg font-bold text-amber-600">{formatRial(takeHomeBreakdown.monthly)}</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">سالیانه</p>
                          <p className="text-lg font-bold text-purple-600">{formatRial(takeHomeBreakdown.yearly)}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">تحلیل مالیاتی</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                        <span>صرفه‌جویی مالیاتی معاف</span>
                        <span className="font-bold text-green-600">
                          {formatRial(result.details.find(d => d.rate === 0)?.amount || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                        <span>بالاترین نرخ مالیاتی اعمال شده</span>
                        <span className="font-bold text-red-600">{result.marginalTaxRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                        <span>میانگین مالیات به ازای هر پله</span>
                        <span className="font-bold text-blue-600">
                          {formatRial(result.totalTax / result.details.filter(d => d.tax > 0).length || 0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
