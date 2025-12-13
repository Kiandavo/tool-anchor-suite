import React, { useState, useEffect } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calculator, Sparkles, Settings2, ArrowLeftRight } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

const QUICK_AMOUNTS = [
  { label: '۵۰ میلیون', value: 50000000 },
  { label: '۱۰۰ میلیون', value: 100000000 },
  { label: '۲۰۰ میلیون', value: 200000000 },
  { label: '۳۰۰ میلیون', value: 300000000 },
  { label: '۵۰۰ میلیون', value: 500000000 },
];

const QUICK_RENTS = [
  { label: '۲ میلیون', value: 2000000 },
  { label: '۵ میلیون', value: 5000000 },
  { label: '۱۰ میلیون', value: 10000000 },
  { label: '۱۵ میلیون', value: 15000000 },
];

const DEFAULT_RATE = 24; // Standard rate in Iran

export default function MortgageCalculator() {
  const [mode, setMode] = useState<'simple' | 'professional'>('simple');
  const [conversionType, setConversionType] = useState<'mortgage-to-rent' | 'rent-to-mortgage'>('mortgage-to-rent');
  
  // Simple mode states
  const [simpleAmount, setSimpleAmount] = useState<string>('');
  const [simpleResult, setSimpleResult] = useState<number | null>(null);
  
  // Professional mode states
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [interestRateM2R, setInterestRateM2R] = useState<number>(DEFAULT_RATE);
  const [durationM2R, setDurationM2R] = useState<number>(12);
  const [mortgageResult, setMortgageResult] = useState<{ rent: number; total: number } | null>(null);
  
  const [rentAmount, setRentAmount] = useState<string>('');
  const [interestRateR2M, setInterestRateR2M] = useState<number>(DEFAULT_RATE);
  const [durationR2M, setDurationR2M] = useState<number>(12);
  const [rentResult, setRentResult] = useState<{ mortgage: number } | null>(null);

  // Auto-calculate in simple mode
  useEffect(() => {
    if (mode === 'simple' && simpleAmount) {
      const amount = parseFloat(simpleAmount.replace(/,/g, ''));
      if (!isNaN(amount) && amount > 0) {
        const monthlyRate = DEFAULT_RATE / 12 / 100;
        if (conversionType === 'mortgage-to-rent') {
          setSimpleResult(Math.round(amount * monthlyRate));
        } else {
          setSimpleResult(Math.round(amount / monthlyRate));
        }
      } else {
        setSimpleResult(null);
      }
    }
  }, [simpleAmount, conversionType, mode]);

  const handleMortgageToRent = () => {
    const amount = parseFloat(mortgageAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) return;
    
    const monthlyInterestRate = interestRateM2R / 12 / 100;
    const monthlyRent = Math.round(amount * monthlyInterestRate);
    const totalPaid = monthlyRent * durationM2R;
    
    setMortgageResult({ rent: monthlyRent, total: totalPaid });
  };

  const handleRentToMortgage = () => {
    const amount = parseFloat(rentAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) return;
    
    const monthlyInterestRate = interestRateR2M / 12 / 100;
    const mortgageAmount = Math.round(amount / monthlyInterestRate);
    
    setRentResult({ mortgage: mortgageAmount });
  };

  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numberValue = value.replace(/[^\d]/g, '');
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  const handleQuickSelect = (value: number) => {
    setSimpleAmount(value.toLocaleString('en-US'));
  };

  const handleReset = () => {
    setSimpleAmount('');
    setSimpleResult(null);
    setMortgageAmount('');
    setMortgageResult(null);
    setRentAmount('');
    setRentResult(null);
  };

  const toggleConversionType = () => {
    setConversionType(prev => prev === 'mortgage-to-rent' ? 'rent-to-mortgage' : 'mortgage-to-rent');
    setSimpleAmount('');
    setSimpleResult(null);
  };

  return (
    <CalculatorCard
      title="محاسبه‌گر رهن و اجاره"
      icon={Home}
      onReset={handleReset}
    >
      {/* Mode Switcher */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'simple' | 'professional')} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="simple" className="flex-1 gap-2">
            <Sparkles className="h-4 w-4" />
            ساده
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex-1 gap-2">
            <Settings2 className="h-4 w-4" />
            حرفه‌ای
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        {mode === 'simple' ? (
          <motion.div
            key="simple"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Conversion Type Toggle */}
            <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-xl">
              <span className={`text-sm font-medium transition-colors ${conversionType === 'mortgage-to-rent' ? 'text-primary' : 'text-muted-foreground'}`}>
                رهن به اجاره
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleConversionType}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <span className={`text-sm font-medium transition-colors ${conversionType === 'rent-to-mortgage' ? 'text-primary' : 'text-muted-foreground'}`}>
                اجاره به رهن
              </span>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">انتخاب سریع:</Label>
              <div className="flex flex-wrap gap-2">
                {(conversionType === 'mortgage-to-rent' ? QUICK_AMOUNTS : QUICK_RENTS).map((item) => (
                  <Button
                    key={item.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(item.value)}
                    className={`transition-all ${
                      simpleAmount === item.value.toLocaleString('en-US')
                        ? 'bg-primary text-primary-foreground border-primary'
                        : ''
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Simple Input */}
            <div className="space-y-2">
              <Label htmlFor="simpleAmount">
                {conversionType === 'mortgage-to-rent' ? 'مبلغ رهن (تومان)' : 'مبلغ اجاره ماهیانه (تومان)'}
              </Label>
              <Input
                id="simpleAmount"
                type="text"
                dir="ltr"
                value={simpleAmount}
                onChange={(e) => formatInput(e.target.value, setSimpleAmount)}
                placeholder={conversionType === 'mortgage-to-rent' ? '۱۰۰,۰۰۰,۰۰۰' : '۵,۰۰۰,۰۰۰'}
                className="text-lg h-12 text-center font-medium"
              />
            </div>

            {/* Instant Result */}
            <AnimatePresence>
              {simpleResult !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {conversionType === 'mortgage-to-rent' ? 'اجاره ماهیانه معادل' : 'رهن معادل'}
                  </p>
                  <p className="text-4xl font-bold text-primary">
                    {simpleResult.toLocaleString('fa-IR')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">تومان</p>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-primary/10">
                    محاسبه با نرخ استاندارد ۲۴٪ سالانه
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            <p className="text-center text-xs text-muted-foreground">
              برای تنظیم نرخ سود و مدت قرارداد، از حالت «حرفه‌ای» استفاده کنید
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="professional"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Tabs defaultValue="mortgage-to-rent">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="mortgage-to-rent" className="flex-1">رهن به اجاره</TabsTrigger>
                <TabsTrigger value="rent-to-mortgage" className="flex-1">اجاره به رهن</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mortgage-to-rent" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mortgageAmount">مبلغ رهن (تومان)</Label>
                    <Input
                      id="mortgageAmount"
                      type="text"
                      dir="ltr"
                      value={mortgageAmount}
                      onChange={(e) => formatInput(e.target.value, setMortgageAmount)}
                      placeholder="۱۰۰,۰۰۰,۰۰۰"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>نرخ سود سالیانه</Label>
                      <span className="text-sm font-medium">{formatPersianNumber(interestRateM2R)}٪</span>
                    </div>
                    <Slider
                      min={12}
                      max={36}
                      step={1}
                      value={[interestRateM2R]}
                      onValueChange={(value) => setInterestRateM2R(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>۱۲٪</span>
                      <span>۳۶٪</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>مدت قرارداد</Label>
                      <span className="text-sm font-medium">{formatPersianNumber(durationM2R)} ماه</span>
                    </div>
                    <Slider
                      min={1}
                      max={24}
                      step={1}
                      value={[durationM2R]}
                      onValueChange={(value) => setDurationM2R(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>۱ ماه</span>
                      <span>۲۴ ماه</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleMortgageToRent} className="w-full" size="lg">
                    <Calculator className="ml-2 h-5 w-5" />
                    محاسبه اجاره
                  </Button>
                  
                  {mortgageResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <VisualizationCard title="نتیجه محاسبه">
                        <div className="space-y-4">
                          <div className="relative h-24 bg-gradient-to-br from-card to-muted/30 rounded-xl overflow-hidden border border-border">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '70%' }}
                              transition={{ duration: 0.8 }}
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40 flex items-center justify-center"
                            >
                              <div className="text-center px-2">
                                <p className="text-xs font-medium">رهن</p>
                                <p className="text-sm font-bold">{parseFloat(mortgageAmount.replace(/,/g, '')).toLocaleString('fa-IR')}</p>
                              </div>
                            </motion.div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '30%' }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="absolute right-0 top-0 h-full bg-gradient-to-l from-green-500/60 to-green-500/40 flex items-center justify-center"
                            >
                              <div className="text-center px-2">
                                <p className="text-xs font-medium">اجاره</p>
                                <p className="text-sm font-bold">{mortgageResult.rent.toLocaleString('fa-IR')}</p>
                              </div>
                            </motion.div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-green-500/10 rounded-xl text-center border border-green-500/20">
                              <p className="text-xs text-muted-foreground mb-1">اجاره ماهیانه</p>
                              <p className="text-lg font-bold text-green-600">{mortgageResult.rent.toLocaleString('fa-IR')}</p>
                            </div>
                            <div className="p-4 bg-card rounded-xl text-center border border-border">
                              <p className="text-xs text-muted-foreground mb-1">کل پرداختی ({formatPersianNumber(durationM2R)} ماه)</p>
                              <p className="text-lg font-bold">{mortgageResult.total.toLocaleString('fa-IR')}</p>
                            </div>
                          </div>
                        </div>
                      </VisualizationCard>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="rent-to-mortgage" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rentAmount">مبلغ اجاره ماهیانه (تومان)</Label>
                    <Input
                      id="rentAmount"
                      type="text"
                      dir="ltr"
                      value={rentAmount}
                      onChange={(e) => formatInput(e.target.value, setRentAmount)}
                      placeholder="۵,۰۰۰,۰۰۰"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>نرخ سود سالیانه</Label>
                      <span className="text-sm font-medium">{formatPersianNumber(interestRateR2M)}٪</span>
                    </div>
                    <Slider
                      min={12}
                      max={36}
                      step={1}
                      value={[interestRateR2M]}
                      onValueChange={(value) => setInterestRateR2M(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>۱۲٪</span>
                      <span>۳۶٪</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>مدت قرارداد</Label>
                      <span className="text-sm font-medium">{formatPersianNumber(durationR2M)} ماه</span>
                    </div>
                    <Slider
                      min={1}
                      max={24}
                      step={1}
                      value={[durationR2M]}
                      onValueChange={(value) => setDurationR2M(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>۱ ماه</span>
                      <span>۲۴ ماه</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleRentToMortgage} className="w-full" size="lg">
                    <Calculator className="ml-2 h-5 w-5" />
                    محاسبه رهن
                  </Button>
                  
                  {rentResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 text-center">
                        <p className="text-sm text-muted-foreground mb-2">مبلغ رهن معادل</p>
                        <p className="text-3xl font-bold text-primary">{rentResult.mortgage.toLocaleString('fa-IR')}</p>
                        <p className="text-sm text-muted-foreground mt-1">تومان</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </CalculatorCard>
  );
}
