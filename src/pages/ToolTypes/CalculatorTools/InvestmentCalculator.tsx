import React, { useState, useMemo } from 'react';
import { Coins, Target, TrendingUp } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { InvestmentForm } from './components/InvestmentForm';
import { InvestmentInfoCard } from './components/InvestmentInfoCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InvestmentData {
  year: number;
  value: number;
  contributions: number;
  interest: number;
}

interface ScenarioResult {
  name: string;
  finalValue: number;
  totalInterest: number;
  data: InvestmentData[];
}

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [rateOfReturn, setRateOfReturn] = useState<number>(20);
  const [additionalInvestment, setAdditionalInvestment] = useState<string>('');
  const [investmentFrequency, setInvestmentFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [goalAmount, setGoalAmount] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numberValue = value.replace(/[^\d]/g, '');
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  const calculateInvestmentGrowth = (
    principal: number,
    years: number,
    rate: number,
    monthlyContribution: number,
    frequency: 'monthly' | 'yearly'
  ): InvestmentData[] => {
    const data: InvestmentData[] = [];
    let totalValue = principal;
    let totalContributions = principal;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;

    data.push({
      year: 0,
      value: Math.round(totalValue),
      contributions: Math.round(totalContributions),
      interest: 0,
    });

    for (let month = 1; month <= totalMonths; month++) {
      totalValue = totalValue * (1 + monthlyRate);
      
      if (frequency === 'monthly') {
        totalValue += monthlyContribution;
        totalContributions += monthlyContribution;
      } else if (month % 12 === 0) {
        totalValue += monthlyContribution * 12;
        totalContributions += monthlyContribution * 12;
      }

      if (month % 12 === 0) {
        data.push({
          year: month / 12,
          value: Math.round(totalValue),
          contributions: Math.round(totalContributions),
          interest: Math.round(totalValue - totalContributions),
        });
      }
    }

    return data;
  };

  const result = useMemo(() => {
    if (!initialAmount || !investmentPeriod || !additionalInvestment) {
      return null;
    }

    const principal = parseFloat(initialAmount.replace(/,/g, ''));
    const years = parseFloat(investmentPeriod);
    const monthlyContribution = parseFloat(additionalInvestment.replace(/,/g, ''));

    if (isNaN(principal) || isNaN(years) || isNaN(monthlyContribution) || 
        principal < 0 || years <= 0) {
      return null;
    }

    return calculateInvestmentGrowth(principal, years, rateOfReturn, monthlyContribution, investmentFrequency);
  }, [initialAmount, investmentPeriod, rateOfReturn, additionalInvestment, investmentFrequency]);

  const scenarios = useMemo(() => {
    if (!result) return [];

    const principal = parseFloat(initialAmount.replace(/,/g, ''));
    const years = parseFloat(investmentPeriod);
    const monthlyContribution = parseFloat(additionalInvestment.replace(/,/g, ''));

    const scenarioResults: ScenarioResult[] = [
      {
        name: 'محافظه‌کارانه (۱۰٪)',
        finalValue: 0,
        totalInterest: 0,
        data: calculateInvestmentGrowth(principal, years, 10, monthlyContribution, investmentFrequency),
      },
      {
        name: `فعلی (${rateOfReturn}٪)`,
        finalValue: 0,
        totalInterest: 0,
        data: result,
      },
      {
        name: 'خوش‌بینانه (۳۰٪)',
        finalValue: 0,
        totalInterest: 0,
        data: calculateInvestmentGrowth(principal, years, 30, monthlyContribution, investmentFrequency),
      },
    ];

    scenarioResults.forEach(scenario => {
      const lastData = scenario.data[scenario.data.length - 1];
      scenario.finalValue = lastData.value;
      scenario.totalInterest = lastData.interest;
    });

    return scenarioResults;
  }, [result, initialAmount, investmentPeriod, rateOfReturn, additionalInvestment, investmentFrequency]);

  const goalProgress = useMemo(() => {
    if (!result || !goalAmount) return null;

    const goal = parseFloat(goalAmount.replace(/,/g, ''));
    if (isNaN(goal) || goal <= 0) return null;

    const finalValue = result[result.length - 1].value;
    const progress = Math.min((finalValue / goal) * 100, 100);
    const achieved = finalValue >= goal;

    return { goal, finalValue, progress, achieved };
  }, [result, goalAmount]);

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  const handleReset = () => {
    setInitialAmount('');
    setInvestmentPeriod('');
    setRateOfReturn(20);
    setAdditionalInvestment('');
    setInvestmentFrequency('monthly');
    setGoalAmount('');
    setHasCalculated(false);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg" dir="rtl">
          <p className="font-semibold mb-2">سال {payload[0].payload.year}</p>
          <p className="text-sm text-primary">
            ارزش کل: {payload[0].payload.value.toLocaleString('fa-IR')} تومان
          </p>
          <p className="text-sm text-muted-foreground">
            سرمایه: {payload[0].payload.contributions.toLocaleString('fa-IR')} تومان
          </p>
          <p className="text-sm text-green-500">
            سود: {payload[0].payload.interest.toLocaleString('fa-IR')} تومان
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <CalculatorCard
      title="محاسبه‌گر سرمایه‌گذاری"
      icon={Coins}
      onReset={handleReset}
    >
      <InvestmentInfoCard />
      
      <InvestmentForm
        initialAmount={initialAmount}
        setInitialAmount={setInitialAmount}
        additionalInvestment={additionalInvestment}
        setAdditionalInvestment={setAdditionalInvestment}
        investmentPeriod={investmentPeriod}
        setInvestmentPeriod={setInvestmentPeriod}
        rateOfReturn={rateOfReturn}
        setRateOfReturn={setRateOfReturn}
        investmentFrequency={investmentFrequency}
        setInvestmentFrequency={setInvestmentFrequency}
        onCalculate={handleCalculate}
        formatInput={formatInput}
      />

      {/* Goal Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="goalAmount">هدف سرمایه‌گذاری (اختیاری)</Label>
        <Input
          id="goalAmount"
          type="text"
          dir="ltr"
          value={goalAmount}
          onChange={(e) => formatInput(e.target.value, setGoalAmount)}
          placeholder="مثال: 1,000,000,000"
        />
      </motion.div>

      {hasCalculated && result && result.length > 0 && (
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">رشد سرمایه</TabsTrigger>
            <TabsTrigger value="scenarios">مقایسه سناریوها</TabsTrigger>
            <TabsTrigger value="summary">خلاصه</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4">
            <VisualizationCard title="نمودار رشد سرمایه‌گذاری">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={result}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'سال', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}م`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="hsl(var(--muted-foreground))" 
                    fillOpacity={1} 
                    fill="url(#colorContributions)"
                    name="سرمایه"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)"
                    name="ارزش کل"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </VisualizationCard>

            {goalProgress && (
              <VisualizationCard>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-semibold">پیشرفت هدف</span>
                    </div>
                    <span className={`text-sm font-medium ${goalProgress.achieved ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {goalProgress.progress.toFixed(1)}٪
                    </span>
                  </div>
                  
                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goalProgress.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${goalProgress.achieved ? 'bg-green-500' : 'bg-primary'}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">هدف شما</p>
                      <p className="font-semibold">{goalProgress.goal.toLocaleString('fa-IR')} تومان</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ارزش نهایی</p>
                      <p className="font-semibold">{goalProgress.finalValue.toLocaleString('fa-IR')} تومان</p>
                    </div>
                  </div>

                  {goalProgress.achieved ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center"
                    >
                      <p className="text-green-600 font-semibold">🎉 به هدف خود رسیدید!</p>
                    </motion.div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-sm text-muted-foreground">
                        تا رسیدن به هدف: {(goalProgress.goal - goalProgress.finalValue).toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  )}
                </div>
              </VisualizationCard>
            )}
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <VisualizationCard title="مقایسه سناریوهای مختلف">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                    type="number"
                    domain={[0, 'dataMax']}
                    label={{ value: 'سال', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}م`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {scenarios.map((scenario, index) => (
                    <Line
                      key={scenario.name}
                      data={scenario.data}
                      type="monotone"
                      dataKey="value"
                      stroke={index === 0 ? '#ef4444' : index === 1 ? 'hsl(var(--primary))' : '#22c55e'}
                      strokeWidth={index === 1 ? 3 : 2}
                      dot={false}
                      name={scenario.name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </VisualizationCard>

            <div className="grid gap-3">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold flex items-center gap-2">
                      <TrendingUp className={`h-4 w-4 ${index === 0 ? 'text-red-500' : index === 1 ? 'text-primary' : 'text-green-500'}`} />
                      {scenario.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">ارزش نهایی</p>
                      <p className="font-semibold">{scenario.finalValue.toLocaleString('fa-IR')} تومان</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">سود کل</p>
                      <p className="font-semibold text-green-600">{scenario.totalInterest.toLocaleString('fa-IR')} تومان</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <VisualizationCard>
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">ارزش نهایی سرمایه‌گذاری</p>
                  <p className="text-3xl font-bold text-primary">
                    {result[result.length - 1].value.toLocaleString('fa-IR')} تومان
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">کل سرمایه‌گذاری</p>
                    <p className="text-lg font-semibold">
                      {result[result.length - 1].contributions.toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">سود کل</p>
                    <p className="text-lg font-semibold text-green-600">
                      {result[result.length - 1].interest.toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">نرخ بازده</p>
                    <p className="text-lg font-semibold">{rateOfReturn}٪</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">مدت زمان</p>
                    <p className="text-lg font-semibold">{investmentPeriod} سال</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">نسبت سود به سرمایه</span>
                    <span className="text-sm font-semibold text-primary">
                      {((result[result.length - 1].interest / result[result.length - 1].contributions) * 100).toFixed(1)}٪
                    </span>
                  </div>
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result[result.length - 1].interest / result[result.length - 1].value) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-green-500"
                    />
                  </div>
                </div>
              </div>
            </VisualizationCard>
          </TabsContent>
        </Tabs>
      )}
    </CalculatorCard>
  );
}
