import React, { useState, useEffect } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calculator, Sparkles, Settings2, ArrowLeftRight, Building2, TrendingUp, BarChart3 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Property presets with typical Tehran prices
const PROPERTY_PRESETS = [
  { 
    id: 'small-apt',
    label: 'آپارتمان کوچک',
    icon: '🏢',
    description: '۵۰-۷۰ متر، منطقه متوسط',
    mortgage: 200000000,
    rent: 4000000,
  },
  { 
    id: 'medium-apt',
    label: 'آپارتمان متوسط',
    icon: '🏠',
    description: '۸۰-۱۰۰ متر، منطقه خوب',
    mortgage: 500000000,
    rent: 10000000,
  },
  { 
    id: 'large-apt',
    label: 'آپارتمان بزرگ',
    icon: '🏡',
    description: '۱۲۰-۱۵۰ متر، منطقه عالی',
    mortgage: 1000000000,
    rent: 20000000,
  },
  { 
    id: 'villa',
    label: 'ویلایی',
    icon: '🏘️',
    description: '۲۰۰+ متر با حیاط',
    mortgage: 2000000000,
    rent: 35000000,
  },
];

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

const DEFAULT_RATE = 24;

export default function MortgageCalculator() {
  const [mode, setMode] = useState<'simple' | 'professional' | 'compare'>('simple');
  const [conversionType, setConversionType] = useState<'mortgage-to-rent' | 'rent-to-mortgage'>('mortgage-to-rent');
  
  // Simple mode states
  const [simpleAmount, setSimpleAmount] = useState<string>('');
  const [simpleResult, setSimpleResult] = useState<number | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  
  // Professional mode states
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [interestRateM2R, setInterestRateM2R] = useState<number>(DEFAULT_RATE);
  const [durationM2R, setDurationM2R] = useState<number>(12);
  const [mortgageResult, setMortgageResult] = useState<{ rent: number; total: number } | null>(null);
  
  const [rentAmount, setRentAmount] = useState<string>('');
  const [interestRateR2M, setInterestRateR2M] = useState<number>(DEFAULT_RATE);
  const [durationR2M, setDurationR2M] = useState<number>(12);
  const [rentResult, setRentResult] = useState<{ mortgage: number } | null>(null);

  // Comparison mode states
  const [compareMortgage, setCompareMortgage] = useState<string>('500,000,000');
  const [compareRent, setCompareRent] = useState<string>('10,000,000');
  const [compareRate, setCompareRate] = useState<number>(DEFAULT_RATE);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

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

  // Generate comparison data
  useEffect(() => {
    if (mode === 'compare') {
      const mortgage = parseFloat(compareMortgage.replace(/,/g, '')) || 0;
      const rent = parseFloat(compareRent.replace(/,/g, '')) || 0;
      const monthlyRate = compareRate / 12 / 100;
      const equivalentRent = mortgage * monthlyRate;
      
      const data = [];
      for (let year = 1; year <= 5; year++) {
        const months = year * 12;
        const totalRentPaid = rent * months;
        const totalEquivalentRent = equivalentRent * months;
        const savings = totalRentPaid - totalEquivalentRent;
        
        data.push({
          year: `سال ${formatPersianNumber(year)}`,
          'پرداخت اجاره': totalRentPaid,
          'معادل رهن': totalEquivalentRent,
          savings,
          recommendation: savings > 0 ? 'رهن بهتر است' : 'اجاره بهتر است',
        });
      }
      setComparisonData(data);
    }
  }, [compareMortgage, compareRent, compareRate, mode]);

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
    setSelectedPreset(null);
  };

  const handlePresetSelect = (preset: typeof PROPERTY_PRESETS[0]) => {
    if (conversionType === 'mortgage-to-rent') {
      setSimpleAmount(preset.mortgage.toLocaleString('en-US'));
    } else {
      setSimpleAmount(preset.rent.toLocaleString('en-US'));
    }
    setSelectedPreset(preset.id);
  };

  const handleReset = () => {
    setSimpleAmount('');
    setSimpleResult(null);
    setSelectedPreset(null);
    setMortgageAmount('');
    setMortgageResult(null);
    setRentAmount('');
    setRentResult(null);
  };

  const toggleConversionType = () => {
    setConversionType(prev => prev === 'mortgage-to-rent' ? 'rent-to-mortgage' : 'mortgage-to-rent');
    setSimpleAmount('');
    setSimpleResult(null);
    setSelectedPreset(null);
  };

  const formatTooltipValue = (value: number) => {
    return value.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <CalculatorCard
      title="محاسبه‌گر رهن و اجاره"
      icon={Home}
      onReset={handleReset}
    >
      {/* Mode Switcher */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'simple' | 'professional' | 'compare')} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="simple" className="flex-1 gap-2">
            <Sparkles className="h-4 w-4" />
            ساده
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex-1 gap-2">
            <BarChart3 className="h-4 w-4" />
            مقایسه
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

            {/* Property Presets */}
            <div className="space-y-3">
              <Label className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                انتخاب نوع ملک (قیمت‌های تهران):
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {PROPERTY_PRESETS.map((preset) => (
                  <motion.button
                    key={preset.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      selectedPreset === preset.id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{preset.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{preset.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{preset.description}</p>
                        <p className="text-xs text-primary mt-1">
                          {conversionType === 'mortgage-to-rent' 
                            ? `رهن: ${(preset.mortgage / 1000000).toLocaleString('fa-IR')} میلیون`
                            : `اجاره: ${(preset.rent / 1000000).toLocaleString('fa-IR')} میلیون`
                          }
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">یا انتخاب سریع مبلغ:</Label>
              <div className="flex flex-wrap gap-2">
                {(conversionType === 'mortgage-to-rent' ? QUICK_AMOUNTS : QUICK_RENTS).map((item) => (
                  <Button
                    key={item.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(item.value)}
                    className={`transition-all ${
                      simpleAmount === item.value.toLocaleString('en-US') && !selectedPreset
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
                onChange={(e) => {
                  formatInput(e.target.value, setSimpleAmount);
                  setSelectedPreset(null);
                }}
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
          </motion.div>
        ) : mode === 'compare' ? (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Comparison Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compareMortgage">مبلغ رهن (تومان)</Label>
                <Input
                  id="compareMortgage"
                  type="text"
                  dir="ltr"
                  value={compareMortgage}
                  onChange={(e) => formatInput(e.target.value, setCompareMortgage)}
                  placeholder="۵۰۰,۰۰۰,۰۰۰"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compareRent">اجاره ماهیانه (تومان)</Label>
                <Input
                  id="compareRent"
                  type="text"
                  dir="ltr"
                  value={compareRent}
                  onChange={(e) => formatInput(e.target.value, setCompareRent)}
                  placeholder="۱۰,۰۰۰,۰۰۰"
                />
              </div>
            </div>

            {/* Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>نرخ سود سالیانه</Label>
                <span className="text-sm font-medium">{formatPersianNumber(compareRate)}٪</span>
              </div>
              <Slider
                min={12}
                max={36}
                step={1}
                value={[compareRate]}
                onValueChange={(value) => setCompareRate(value[0])}
              />
            </div>

            {/* Quick Preset Buttons for Comparison */}
            <div className="flex flex-wrap gap-2">
              {PROPERTY_PRESETS.map((preset) => (
                <Button
                  key={preset.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCompareMortgage(preset.mortgage.toLocaleString('en-US'));
                    setCompareRent(preset.rent.toLocaleString('en-US'));
                  }}
                >
                  {preset.icon} {preset.label}
                </Button>
              ))}
            </div>

            {/* Comparison Chart */}
            {comparisonData.length > 0 && (
              <VisualizationCard title="مقایسه هزینه‌ها در طول زمان">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={formatTooltipValue}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          direction: 'rtl'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="پرداخت اجاره" 
                        stroke="hsl(var(--destructive))" 
                        fill="hsl(var(--destructive) / 0.2)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="معادل رهن" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.2)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </VisualizationCard>
            )}

            {/* Summary Cards */}
            {comparisonData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 2, 4].map((index) => {
                  const data = comparisonData[index];
                  if (!data) return null;
                  const isMortgageBetter = data.savings > 0;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        isMortgageBetter 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-destructive/10 border-destructive/20'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground mb-1">{data.year}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className={`h-4 w-4 ${isMortgageBetter ? 'text-green-600' : 'text-destructive'}`} />
                        <span className={`text-sm font-medium ${isMortgageBetter ? 'text-green-600' : 'text-destructive'}`}>
                          {data.recommendation}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        تفاوت: {Math.abs(data.savings).toLocaleString('fa-IR')} تومان
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Recommendation */}
            {comparisonData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted/50 rounded-xl text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">نتیجه‌گیری:</p>
                {(() => {
                  const mortgage = parseFloat(compareMortgage.replace(/,/g, '')) || 0;
                  const rent = parseFloat(compareRent.replace(/,/g, '')) || 0;
                  const monthlyRate = compareRate / 12 / 100;
                  const equivalentRent = mortgage * monthlyRate;
                  
                  if (rent > equivalentRent) {
                    const savingsPerMonth = rent - equivalentRent;
                    return (
                      <p className="text-green-600 font-medium">
                        رهن کامل به صرفه‌تر است! ماهانه {savingsPerMonth.toLocaleString('fa-IR')} تومان صرفه‌جویی می‌کنید.
                      </p>
                    );
                  } else {
                    const extraPerMonth = equivalentRent - rent;
                    return (
                      <p className="text-destructive font-medium">
                        اجاره فعلی به صرفه‌تر است! ماهانه {extraPerMonth.toLocaleString('fa-IR')} تومان کمتر می‌پردازید.
                      </p>
                    );
                  }
                })()}
              </motion.div>
            )}
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
