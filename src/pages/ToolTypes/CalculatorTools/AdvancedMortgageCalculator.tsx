import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  calculateAdvancedMortgageToRent, 
  calculateAdvancedRentToMortgage,
  compareMortgageOptions,
  calculateAffordability,
  generateAmortizationSchedule,
  getMarketRates,
  type MortgageCalculationResult,
  type RentCalculationResult,
  type ComparisonResult,
  type AffordabilityResult
} from '@/utils/calculator/advancedMortgage';
import { formatToToman } from '@/utils/calculator/numberFormatting';
import { Calculator, Home, TrendingUp, DollarSign, BarChart3, PieChart, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdvancedMortgageCalculator() {
  // Basic calculator states
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [rentAmount, setRentAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<number>(25);
  const [duration, setDuration] = useState<number>(12);
  const [selectedCity, setSelectedCity] = useState<string>('تهران');
  
  // Advanced options
  const [includeInflation, setIncludeInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(15);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(8);
  
  // Affordability calculator
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  
  // Results
  const [mortgageResult, setMortgageResult] = useState<MortgageCalculationResult | null>(null);
  const [rentResult, setRentResult] = useState<RentCalculationResult | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [affordabilityResult, setAffordabilityResult] = useState<AffordabilityResult | null>(null);
  
  const marketRates = getMarketRates();
  
  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const numberValue = value.replace(/[^\d]/g, '');
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };
  
  const parseNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };
  
  const handleMortgageToRent = () => {
    const amount = parseNumber(mortgageAmount);
    if (amount <= 0) return;
    
    const result = calculateAdvancedMortgageToRent(amount, interestRate, duration, inflationRate, {
      includeInflation,
      calculateProjection: true,
      yearCount: 5
    });
    
    setMortgageResult(result);
  };
  
  const handleRentToMortgage = () => {
    const amount = parseNumber(rentAmount);
    if (amount <= 0) return;
    
    const result = calculateAdvancedRentToMortgage(amount, interestRate, duration, propertyAppreciation, {
      includePropertyGrowth: true,
      calculateBreakEven: true,
      yearCount: 10
    });
    
    setRentResult(result);
  };
  
  const handleComparison = () => {
    const mortgage = parseNumber(mortgageAmount);
    const rent = parseNumber(rentAmount);
    if (mortgage <= 0 || rent <= 0) return;
    
    const result = compareMortgageOptions(
      { type: 'mortgage', amount: mortgage, interestRate, termMonths: duration },
      { type: 'rent', amount: rent, interestRate, termMonths: duration },
      60
    );
    
    setComparisonResult(result);
  };
  
  const handleAffordabilityCheck = () => {
    const income = parseNumber(monthlyIncome);
    const expenses = parseNumber(monthlyExpenses);
    const down = parseNumber(downPayment);
    if (income <= 0) return;
    
    const result = calculateAffordability(income, expenses, down, interestRate);
    setAffordabilityResult(result);
  };
  
  const applyCityRate = () => {
    const cityRate = marketRates[selectedCity];
    if (cityRate) {
      setInterestRate(cityRate.rentRate);
      setPropertyAppreciation(cityRate.appreciation);
    }
  };
  
  const renderResultCard = (title: string, content: React.ReactNode, icon: React.ReactNode) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
  
  const renderChart = (data: any[], dataKey: string, name: string, color: string = "#8884d8") => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => formatToToman(value)} />
        <Tooltip formatter={(value: any) => formatToToman(value)} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} name={name} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Home className="h-6 w-6" />
            محاسبه‌گر پیشرفته رهن و اجاره
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* City Selection and Market Rates */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Label>شهر:</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(marketRates).map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={applyCityRate}>
                اعمال نرخ بازار
              </Button>
              <Badge variant="secondary">
                نرخ فعلی: {marketRates[selectedCity]?.rentRate}%
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نرخ اجاره:</span>
                <span className="font-medium">{marketRates[selectedCity]?.rentRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نرخ وام:</span>
                <span className="font-medium">{marketRates[selectedCity]?.mortgageRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رشد قیمت:</span>
                <span className="font-medium">{marketRates[selectedCity]?.appreciation}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تورم:</span>
                <span className="font-medium">{inflationRate}%</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">محاسبه ساده</TabsTrigger>
              <TabsTrigger value="advanced">محاسبه پیشرفته</TabsTrigger>
              <TabsTrigger value="comparison">مقایسه</TabsTrigger>
              <TabsTrigger value="affordability">قدرت خرید</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mortgage to Rent */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      تبدیل رهن به اجاره
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>مبلغ رهن (تومان)</Label>
                      <Input
                        value={mortgageAmount}
                        onChange={(e) => formatInput(e.target.value, setMortgageAmount)}
                        placeholder="مثال: 5,000,000,000"
                      />
                    </div>
                    
                    <div>
                      <Label>نرخ سالیانه (%): {interestRate}</Label>
                      <Slider
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        max={35}
                        min={15}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label>مدت قرارداد (ماه): {duration}</Label>
                      <Slider
                        value={[duration]}
                        onValueChange={(value) => setDuration(value[0])}
                        max={36}
                        min={6}
                        step={3}
                        className="mt-2"
                      />
                    </div>
                    
                    <Button onClick={handleMortgageToRent} className="w-full">
                      محاسبه اجاره
                    </Button>
                    
                    {mortgageResult && (
                      <div className="space-y-3">
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">اجاره ماهیانه:</span>
                            <span className="font-bold text-lg">{formatToToman(mortgageResult.monthlyRent)}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">اجاره سالیانه:</span>
                            <span className="font-medium">{formatToToman(mortgageResult.annualRent)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">هزینه کل:</span>
                            <span className="font-medium">{formatToToman(mortgageResult.totalCost)}</span>
                          </div>
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{mortgageResult.recommendation}</AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Rent to Mortgage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      تبدیل اجاره به رهن
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>مبلغ اجاره ماهیانه (تومان)</Label>
                      <Input
                        value={rentAmount}
                        onChange={(e) => formatInput(e.target.value, setRentAmount)}
                        placeholder="مثال: 50,000,000"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>لحاظ کردن رشد ملک</Label>
                      <Switch
                        checked={includeInflation}
                        onCheckedChange={setIncludeInflation}
                      />
                    </div>
                    
                    {includeInflation && (
                      <div>
                        <Label>نرخ رشد سالیانه ملک (%): {propertyAppreciation}</Label>
                        <Slider
                          value={[propertyAppreciation]}
                          onValueChange={(value) => setPropertyAppreciation(value[0])}
                          max={20}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    )}
                    
                    <Button onClick={handleRentToMortgage} className="w-full">
                      محاسبه رهن
                    </Button>
                    
                    {rentResult && (
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">مبلغ رهن معادل:</span>
                            <span className="font-bold text-lg">{formatToToman(rentResult.mortgageAmount)}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">نقطه سربه‌سر:</span>
                            <span className="font-medium">{rentResult.breakEvenMonths} ماه</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">کل سود:</span>
                            <span className="font-medium">{formatToToman(rentResult.totalInterest)}</span>
                          </div>
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{rentResult.recommendation}</AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <Label>لحاظ کردن تورم</Label>
                  <Switch
                    checked={includeInflation}
                    onCheckedChange={setIncludeInflation}
                  />
                </div>
                
                {includeInflation && (
                  <div>
                    <Label>نرخ تورم (%): {inflationRate}</Label>
                    <Slider
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                      max={30}
                      min={5}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                )}
                
                <div>
                  <Label>رشد قیمت ملک (%): {propertyAppreciation}</Label>
                  <Slider
                    value={[propertyAppreciation]}
                    onValueChange={(value) => setPropertyAppreciation(value[0])}
                    max={20}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
              
              {mortgageResult && mortgageResult.details.length > 0 && (
                renderResultCard(
                  "روند تغییرات اجاره",
                  renderChart(mortgageResult.details, "rent", "اجاره ماهیانه", "#22c55e"),
                  <TrendingUp className="h-5 w-5" />
                )
              )}
              
              {rentResult && rentResult.details.length > 0 && (
                renderResultCard(
                  "تجمع هزینه‌های اجاره",
                  renderChart(rentResult.details.map(d => ({ ...d, month: d.year * 12 })), "cumulativeRent", "تجمع اجاره", "#3b82f6"),
                  <BarChart3 className="h-5 w-5" />
                )
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <div className="flex gap-4 mb-6">
                <Button onClick={handleComparison} disabled={!mortgageAmount || !rentAmount}>
                  مقایسه گزینه‌ها
                </Button>
              </div>
              
              {comparisonResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`border-2 ${comparisonResult.betterOption === 'option1' ? 'border-green-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>گزینه خرید</span>
                        {comparisonResult.betterOption === 'option1' && <Badge variant="default">بهترین</Badge>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>پرداخت ماهیانه:</span>
                          <span>{formatToToman(comparisonResult.option1.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>هزینه اولیه:</span>
                          <span>{formatToToman(comparisonResult.option1.initialCost)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>کل هزینه:</span>
                          <span>{formatToToman(comparisonResult.option1.totalCost)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`border-2 ${comparisonResult.betterOption === 'option2' ? 'border-green-500' : 'border-gray-200'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>گزینه اجاره</span>
                        {comparisonResult.betterOption === 'option2' && <Badge variant="default">بهترین</Badge>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>پرداخت ماهیانه:</span>
                          <span>{formatToToman(comparisonResult.option2.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>هزینه اولیه:</span>
                          <span>{formatToToman(comparisonResult.option2.initialCost)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>کل هزینه:</span>
                          <span>{formatToToman(comparisonResult.option2.totalCost)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {comparisonResult && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{comparisonResult.recommendation}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="affordability" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>درآمد ماهیانه (تومان)</Label>
                  <Input
                    value={monthlyIncome}
                    onChange={(e) => formatInput(e.target.value, setMonthlyIncome)}
                    placeholder="مثال: 100,000,000"
                  />
                </div>
                
                <div>
                  <Label>هزینه‌های ماهیانه (تومان)</Label>
                  <Input
                    value={monthlyExpenses}
                    onChange={(e) => formatInput(e.target.value, setMonthlyExpenses)}
                    placeholder="مثال: 30,000,000"
                  />
                </div>
                
                <div>
                  <Label>پیش‌پرداخت موجود (تومان)</Label>
                  <Input
                    value={downPayment}
                    onChange={(e) => formatInput(e.target.value, setDownPayment)}
                    placeholder="مثال: 1,000,000,000"
                  />
                </div>
              </div>
              
              <Button onClick={handleAffordabilityCheck} disabled={!monthlyIncome}>
                بررسی قدرت خرید
              </Button>
              
              {affordabilityResult && (
                <div className="space-y-4">
                  <Card className={`${affordabilityResult.isAffordable ? 'border-green-500' : 'border-red-500'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        نتیجه تحلیل قدرت خرید
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">حداکثر قدرت خرید</Label>
                          <p className="text-2xl font-bold">{formatToToman(affordabilityResult.maxMortgage)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">مبلغ توصیه شده</Label>
                          <p className="text-2xl font-bold text-green-600">{formatToToman(affordabilityResult.recommendedMortgage)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">حداکثر اجاره</Label>
                          <p className="text-xl font-semibold">{formatToToman(affordabilityResult.maxRent)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">نسبت بدهی به درآمد</Label>
                          <div className="flex items-center gap-2">
                            <Progress value={affordabilityResult.debtToIncomeRatio} className="flex-1" />
                            <span className="text-sm font-medium">{affordabilityResult.debtToIncomeRatio}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {affordabilityResult.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">توصیه‌ها:</Label>
                          {affordabilityResult.recommendations.map((rec, index) => (
                            <Alert key={index}>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{rec}</AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}