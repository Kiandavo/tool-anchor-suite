
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { 
  Calculator, 
  CreditCard, 
  Users, 
  Percent, 
  DollarSign, 
  Heart,
  Star,
  Gift,
  RotateCcw,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface TipResult {
  billAmount: number;
  tipPercent: number;
  tipAmount: number;
  totalAmount: number;
  perPersonAmount: number;
  tipPerPerson: number;
  serviceQuality: string;
  generosityLevel: string;
}

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');
  const [serviceQuality, setServiceQuality] = useState<string>('good');
  const [result, setResult] = useState<TipResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [customTipAmount, setCustomTipAmount] = useState<string>('');
  const [isCustomTip, setIsCustomTip] = useState(false);

  // Service quality presets
  const serviceQualities = {
    excellent: { percent: 20, label: 'عالی', color: 'text-green-600' },
    good: { percent: 15, label: 'خوب', color: 'text-blue-600' },
    average: { percent: 10, label: 'متوسط', color: 'text-amber-600' },
    poor: { percent: 5, label: 'ضعیف', color: 'text-red-600' }
  };

  // Quick tip percentages
  const quickTips = [5, 10, 15, 18, 20, 25];

  // Get generosity level
  const getGenerosityLevel = (tipPercent: number): { level: string; color: string } => {
    if (tipPercent >= 25) return { level: 'بسیار سخاوتمند', color: 'text-green-600' };
    if (tipPercent >= 20) return { level: 'سخاوتمند', color: 'text-blue-600' };
    if (tipPercent >= 15) return { level: 'استاندارد', color: 'text-amber-600' };
    if (tipPercent >= 10) return { level: 'کمینه', color: 'text-orange-600' };
    return { level: 'کم', color: 'text-red-600' };
  };

  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const amount = parseFloat(billAmount.replace(/,/g, ''));
      const people = parseInt(numberOfPeople);
      
      if (isNaN(amount) || amount <= 0) {
        toast.error("مبلغ نامعتبر", {
          description: "لطفا مبلغ صورتحساب معتبری وارد کنید",
          position: "top-center",
        });
        return;
      }

      if (isNaN(people) || people <= 0) {
        toast.error("تعداد افراد نامعتبر", {
          description: "تعداد افراد باید حداقل ۱ نفر باشد",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 600));

      let tipAmount: number;
      let tipPercent: number;

      if (isCustomTip && customTipAmount) {
        tipAmount = parseFloat(customTipAmount.replace(/,/g, ''));
        tipPercent = (tipAmount / amount) * 100;
      } else {
        tipPercent = parseFloat(tipPercentage);
        tipAmount = (amount * tipPercent) / 100;
      }

      const totalAmount = amount + tipAmount;
      const perPersonAmount = totalAmount / people;
      const tipPerPerson = tipAmount / people;
      
      const generosity = getGenerosityLevel(tipPercent);
      const quality = serviceQualities[serviceQuality as keyof typeof serviceQualities];

      const tipResult: TipResult = {
        billAmount: amount,
        tipPercent,
        tipAmount,
        totalAmount,
        perPersonAmount,
        tipPerPerson,
        serviceQuality: quality.label,
        generosityLevel: generosity.level
      };

      setResult(tipResult);
      
      toast.success("انعام محاسبه شد", {
        description: `انعام: ${tipAmount.toLocaleString('fa-IR')} تومان`,
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
  }, [billAmount, tipPercentage, numberOfPeople, serviceQuality, isCustomTip, customTipAmount]);

  // Handle bill amount formatting
  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    
    if (rawValue) {
      setBillAmount(Number(rawValue).toLocaleString());
    } else {
      setBillAmount('');
    }
  };

  // Handle custom tip amount formatting
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    
    if (rawValue) {
      setCustomTipAmount(Number(rawValue).toLocaleString());
    } else {
      setCustomTipAmount('');
    }
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage('15');
    setNumberOfPeople('1');
    setServiceQuality('good');
    setCustomTipAmount('');
    setIsCustomTip(false);
    setResult(null);
    
    toast.info("فرم پاک شد", {
      position: "top-center",
    });
  };

  // Tip percentage visualization
  const tipVisualization = useMemo(() => {
    if (!result) return 0;
    return Math.min((result.tipPercent / 30) * 100, 100); // 30% is considered very generous
  }, [result]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            محاسبه‌گر پیشرفته انعام
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Quality Selector */}
          <div className="glass-effect rounded-xl p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Star className="ml-2 h-4 w-4 text-primary" />
              کیفیت سرویس
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(serviceQualities).map(([key, quality]) => (
                <Button
                  key={key}
                  variant={serviceQuality === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setServiceQuality(key);
                    if (!isCustomTip) setTipPercentage(quality.percent.toString());
                  }}
                  className="glass-effect hover:-translate-y-1 transition-transform duration-300"
                >
                  {quality.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billAmount" className="flex items-center text-sm font-medium">
                  <CreditCard className="ml-1 h-3 w-3 text-primary" />
                  مبلغ صورت‌حساب (تومان)
                </Label>
                <Input
                  id="billAmount"
                  value={billAmount}
                  onChange={handleBillAmountChange}
                  placeholder="مثال: 150,000"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numberOfPeople" className="flex items-center text-sm font-medium">
                  <Users className="ml-1 h-3 w-3 text-primary" />
                  تعداد افراد
                </Label>
                <Select value={numberOfPeople} onValueChange={setNumberOfPeople}>
                  <SelectTrigger className="glass-effect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num.toLocaleString('fa-IR')} نفر
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tip Input Method */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="customTip"
                  checked={isCustomTip}
                  onChange={(e) => setIsCustomTip(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="customTip" className="text-sm">
                  وارد کردن مبلغ انعام به جای درصد
                </Label>
              </div>

              {isCustomTip ? (
                <div className="space-y-2">
                  <Label htmlFor="customTipAmount" className="flex items-center text-sm font-medium">
                    <DollarSign className="ml-1 h-3 w-3 text-primary" />
                    مبلغ انعام (تومان)
                  </Label>
                  <Input
                    id="customTipAmount"
                    value={customTipAmount}
                    onChange={handleCustomTipChange}
                    placeholder="مثال: 15,000"
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipPercentage" className="flex items-center text-sm font-medium">
                      <Percent className="ml-1 h-3 w-3 text-primary" />
                      درصد انعام
                    </Label>
                    <Input
                      id="tipPercentage"
                      value={tipPercentage}
                      onChange={(e) => setTipPercentage(e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder="15"
                      type="text"
                      dir="ltr"
                      className="glass-effect transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  
                  {/* Quick Tip Buttons */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">انتخاب سریع درصد:</Label>
                    <div className="flex flex-wrap gap-2">
                      {quickTips.map((tip) => (
                        <Button
                          key={tip}
                          variant={tipPercentage === tip.toString() ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTipPercentage(tip.toString())}
                          className="glass-effect hover:-translate-y-1 transition-transform duration-300"
                        >
                          {tip}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={handleCalculate}
                disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه انعام'}
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

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="summary">خلاصه</TabsTrigger>
                  <TabsTrigger value="breakdown">تفکیک</TabsTrigger>
                  <TabsTrigger value="analysis">تحلیل</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`مبلغ کل با انعام: ${result.totalAmount.toLocaleString('fa-IR')} تومان`}
                    />
                    <OutcomeInfoCard 
                      outcome={`انعام: ${result.tipAmount.toLocaleString('fa-IR')} تومان (${result.tipPercent.toFixed(1)}%)`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <CreditCard className="h-5 w-5 text-blue-600 ml-2" />
                        <h3 className="font-medium text-sm">مبلغ صورت‌حساب</h3>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {result.billAmount.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Gift className="h-5 w-5 text-green-600 ml-2" />
                        <h3 className="font-medium text-sm">مبلغ انعام</h3>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {result.tipAmount.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <DollarSign className="h-5 w-5 text-purple-600 ml-2" />
                        <h3 className="font-medium text-sm">مبلغ نهایی</h3>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        {result.totalAmount.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  </div>

                  {/* Tip Percentage Visualization */}
                  <div className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      سطح سخاوت
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>درصد انعام از صورت‌حساب</span>
                        <span className={getGenerosityLevel(result.tipPercent).color}>
                          {result.generosityLevel}
                        </span>
                      </div>
                      <Progress value={tipVisualization} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>۰%</span>
                        <span>۱۵%</span>
                        <span>۳۰%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="breakdown" className="mt-6 space-y-4">
                  {parseInt(numberOfPeople) > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass-effect rounded-xl p-5">
                        <h4 className="font-medium mb-3 flex items-center">
                          <Users className="ml-2 h-4 w-4 text-primary" />
                          تقسیم بین افراد
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>سهم هر نفر از کل:</span>
                            <span className="font-semibold text-blue-600">
                              {result.perPersonAmount.toLocaleString('fa-IR')} تومان
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>سهم هر نفر از انعام:</span>
                            <span className="font-semibold text-green-600">
                              {result.tipPerPerson.toLocaleString('fa-IR')} تومان
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>تعداد افراد:</span>
                            <span className="font-semibold">
                              {numberOfPeople} نفر
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-effect rounded-xl p-5">
                        <h4 className="font-medium mb-3">محاسبه سریع</h4>
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">هر نفر باید پرداخت کند:</p>
                          <p className="text-2xl font-bold text-primary">
                            {result.perPersonAmount.toLocaleString('fa-IR')}
                          </p>
                          <p className="text-xs text-muted-foreground">تومان</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="glass-effect rounded-xl overflow-hidden">
                    <div className="p-4 bg-muted/20">
                      <h4 className="font-medium">جزئیات محاسبه</h4>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span>مبلغ صورت‌حساب:</span>
                        <span className="font-semibold">{result.billAmount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>نرخ انعام:</span>
                        <span className="font-semibold text-primary">{result.tipPercent.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-3">
                        <span>انعام:</span>
                        <span className="font-semibold text-green-600">+ {result.tipAmount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                        <span>مجموع:</span>
                        <span className="text-primary">{result.totalAmount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Heart className="ml-2 h-4 w-4 text-primary" />
                        ارزیابی سخاوت
                      </h4>
                      <div className="space-y-2">
                        <p className={`text-lg font-semibold ${getGenerosityLevel(result.tipPercent).color}`}>
                          {result.generosityLevel}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          بر اساس {result.tipPercent.toFixed(1)}% انعام
                        </p>
                        <div className="text-xs text-muted-foreground mt-3">
                          <p>• ۵-۹%: کمینه</p>
                          <p>• ۱۰-۱۴%: استاندارد</p>
                          <p>• ۱۵-۱۹%: خوب</p>
                          <p>• ۲۰%+: عالی</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <TrendingUp className="ml-2 h-4 w-4 text-primary" />
                        آمار مقایسه
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>نسبت انعام به صورت‌حساب:</span>
                          <span className="font-semibold">{result.tipPercent.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>میانگین استاندارد:</span>
                          <span className="text-muted-foreground">۱۵%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>شما:</span>
                          <span className={result.tipPercent >= 15 ? 'text-green-600' : 'text-amber-600'}>
                            {result.tipPercent >= 15 ? 'بالاتر از میانگین' : 'زیر میانگین'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6">
                    <h4 className="font-medium mb-3">پیشنهادات بر اساس کیفیت سرویس</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• سرویس عالی: ۱۸-۲۵% (برای سرویس فوق‌العاده)</p>
                      <p>• سرویس خوب: ۱۵-۱۸% (استاندارد مطلوب)</p>
                      <p>• سرویس متوسط: ۱۰-۱۵% (معمولی)</p>
                      <p>• سرویس ضعیف: ۵-۱۰% (حداقل مودبانه)</p>
                      <p className="mt-3 text-xs">
                        💡 نکته: در رستوران‌های لوکس معمولاً انعام بالاتری انتظار می‌رود
                      </p>
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
};

export default TipCalculator;
