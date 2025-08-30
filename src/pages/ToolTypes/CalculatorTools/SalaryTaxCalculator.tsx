
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
  Download
} from "lucide-react";
import { toast } from 'sonner';

// Enhanced tax brackets for different years
const TAX_BRACKETS = {
  '1403': [
    { max: 8_800_000, rate: 0, name: 'معاف از مالیات' },
    { max: 13_200_000, rate: 0.10, name: 'پله اول - ۱۰٪' },
    { max: 22_000_000, rate: 0.15, name: 'پله دوم - ۱۵٪' },
    { max: 30_800_000, rate: 0.20, name: 'پله سوم - ۲۰٪' },
    { max: Infinity, rate: 0.30, name: 'پله چهارم - ۳۰٪' },
  ],
  '1402': [
    { max: 7_000_000, rate: 0, name: 'معاف از مالیات' },
    { max: 10_500_000, rate: 0.10, name: 'پله اول - ۱۰٪' },
    { max: 17_500_000, rate: 0.15, name: 'پله دوم - ۱۵٪' },
    { max: 24_500_000, rate: 0.20, name: 'پله سوم - ۲۰٪' },
    { max: Infinity, rate: 0.30, name: 'پله چهارم - ۳۰٪' },
  ]
};

interface TaxDetail {
  bracket: string;
  amount: number;
  rate: number;
  tax: number;
  name: string;
}

interface TaxResult {
  grossSalary: number;
  totalTax: number;
  netSalary: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  details: TaxDetail[];
}

export default function SalaryTaxCalculator() {
  const [salary, setSalary] = useState<string>('');
  const [taxYear, setTaxYear] = useState<string>('1403');
  const [calculationType, setCalculationType] = useState<string>('monthly');
  const [result, setResult] = useState<TaxResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [compareToYear, setCompareToYear] = useState<string>('1402');
  const [showComparison, setShowComparison] = useState(false);
  
  // Format input with thousands separator
  const formatInput = (value: string): string => {
    const plainNumber = value.replace(/[^\d]/g, '');
    
    if (plainNumber === '') {
      return '';
    }
    
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);
    setSalary(formatted);
  };
  
  // Format Rial amount to display
  const formatRial = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  // Enhanced tax calculation with comprehensive analysis
  const calculateTax = useCallback(async (yearToCalculate: string = taxYear): Promise<TaxResult | null> => {
    const salaryValue = parseFloat(salary.replace(/,/g, ''));
    
    if (isNaN(salaryValue) || salaryValue < 0) {
      return null;
    }

    const brackets = TAX_BRACKETS[yearToCalculate as keyof typeof TAX_BRACKETS];
    let totalTax = 0;
    let remainingSalary = salaryValue;
    const details: TaxDetail[] = [];
    let previousMax = 0;
    
    // Apply each tax bracket
    for (const bracket of brackets) {
      const bracketRange = bracket.max === Infinity ? remainingSalary : Math.min(bracket.max - previousMax, remainingSalary);
      
      if (bracketRange > 0) {
        const taxForBracket = bracketRange * bracket.rate;
        totalTax += taxForBracket;
        
        details.push({
          bracket: `${formatRial(previousMax)} تا ${bracket.max !== Infinity ? formatRial(bracket.max) : 'بی‌نهایت'}`,
          amount: bracketRange,
          rate: bracket.rate * 100,
          tax: taxForBracket,
          name: bracket.name
        });
        
        remainingSalary -= bracketRange;
        
        if (remainingSalary <= 0) {
          break;
        }
      }
      
      previousMax = bracket.max === Infinity ? previousMax : bracket.max;
    }

    const netSalary = salaryValue - totalTax;
    const effectiveTaxRate = salaryValue > 0 ? (totalTax / salaryValue) * 100 : 0;
    
    // Find marginal tax rate (highest bracket used)
    const marginalTaxRate = details.length > 0 ? details[details.length - 1].rate : 0;

    return {
      grossSalary: salaryValue,
      totalTax,
      netSalary,
      effectiveTaxRate,
      marginalTaxRate,
      details
    };
  }, [salary, taxYear]);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    try {
      const salaryValue = parseFloat(salary.replace(/,/g, ''));
      
      if (isNaN(salaryValue) || salaryValue < 0) {
        toast.error("مقدار نامعتبر", {
          description: "لطفا مقدار معتبری برای حقوق وارد کنید",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const taxResult = await calculateTax();
      
      if (taxResult) {
        setResult(taxResult);
        toast.success("محاسبه با موفقیت انجام شد", {
          description: `مالیات: ${formatRial(taxResult.totalTax)}`,
          position: "top-center",
        });
      }
      
    } catch (error) {
      toast.error("خطا در محاسبه", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setSalary('');
    setResult(null);
    toast.info("فرم پاک شد", {
      description: "اطلاعات جدید وارد کنید",
      position: "top-center",
    });
  };

  // Tax burden visualization
  const taxBurdenPercentage = useMemo(() => {
    if (!result) return 0;
    return Math.min((result.effectiveTaxRate / 30) * 100, 100); // 30% is max tax rate
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
          {/* Tax Information */}
          <div className="neo-glass rounded-xl p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              پلکان‌های مالیاتی سال {taxYear}
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {TAX_BRACKETS[taxYear as keyof typeof TAX_BRACKETS].map((bracket, index) => (
                <p key={index}>
                  • {bracket.name}: {bracket.max === Infinity ? 'بیش از ' + formatRial(TAX_BRACKETS[taxYear as keyof typeof TAX_BRACKETS][index - 1]?.max || 0) : `تا ${formatRial(bracket.max)}`}
                </p>
              ))}
            </div>
          </div>
          
          {/* Input Section */}
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
          
          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="overview">خلاصه</TabsTrigger>
                  <TabsTrigger value="details">جزئیات</TabsTrigger>
                  <TabsTrigger value="analysis">تحلیل</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`حقوق خالص: ${formatRial(result.netSalary)}`}
                    />
                    <OutcomeInfoCard 
                      outcome={`مالیات کل: ${formatRial(result.totalTax)} (${result.effectiveTaxRate.toFixed(2)}%)`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>

                  {/* Tax Burden Visualization */}
                  <div className="neo-glass rounded-xl p-6">
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
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-6 space-y-4">
                  <div className="glass-effect rounded-xl overflow-hidden">
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
                              <td className="py-3 px-4">{detail.name}</td>
                              <td className="py-3 px-4">{formatRial(detail.amount)}</td>
                              <td className="py-3 px-4">{detail.rate}٪</td>
                              <td className="py-3 px-4 font-semibold">{formatRial(detail.tax)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Yearly/Monthly Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">
                        {calculationType === 'monthly' ? 'معادل سالیانه' : 'معادل ماهیانه'}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>حقوق ناخالص:</span>
                          <span className="font-semibold">
                            {formatRial(calculationType === 'monthly' ? result.grossSalary * 12 : result.grossSalary / 12)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>مالیات:</span>
                          <span className="font-semibold">
                            {formatRial(calculationType === 'monthly' ? result.totalTax * 12 : result.totalTax / 12)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>حقوق خالص:</span>
                          <span className="font-semibold">
                            {formatRial(calculationType === 'monthly' ? result.netSalary * 12 : result.netSalary / 12)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <TrendingUp className="ml-2 h-4 w-4 text-primary" />
                        تحلیل مالیاتی
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>• نرخ مالیات مؤثر شما {result.effectiveTaxRate.toFixed(2)}% است</p>
                        <p>• در پله مالیاتی {result.marginalTaxRate}% قرار دارید</p>
                        <p>• از هر ۱۰۰ تومان درآمد، {result.effectiveTaxRate.toFixed(0)} تومان مالیات می‌پردازید</p>
                        <p>• درآمد خالص شما {((result.netSalary / result.grossSalary) * 100).toFixed(1)}% درآمد ناخالص است</p>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Info className="ml-2 h-4 w-4 text-primary" />
                        پیشنهادات بهینه‌سازی
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {result.effectiveTaxRate > 20 && (
                          <p>• بررسی امکان استفاده از معافیت‌های مالیاتی</p>
                        )}
                        {result.effectiveTaxRate > 15 && (
                          <p>• مشاوره با مشاور مالیاتی برای بهینه‌سازی</p>
                        )}
                        <p>• ثبت هزینه‌های قابل کسر از مالیات</p>
                        <p>• بررسی امکان پرداخت حق بیمه تکمیلی</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
