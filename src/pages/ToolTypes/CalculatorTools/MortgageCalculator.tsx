
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateMortgageRent } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Home, Info } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

export default function MortgageCalculator() {
  // Mortgage to Rent
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [interestRateM2R, setInterestRateM2R] = useState<number>(24);
  const [durationM2R, setDurationM2R] = useState<number>(12);
  const [mortgageResult, setMortgageResult] = useState<string | null>(null);
  
  // Rent to Mortgage
  const [rentAmount, setRentAmount] = useState<string>('');
  const [interestRateR2M, setInterestRateR2M] = useState<number>(24);
  const [durationR2M, setDurationR2M] = useState<number>(12);
  const [rentResult, setRentResult] = useState<string | null>(null);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('fa-IR') + ' تومان';
  };

  const handleMortgageToRent = () => {
    const amount = parseFloat(mortgageAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      setMortgageResult("لطفاً مبلغ رهن را به درستی وارد کنید");
      return;
    }
    
    // Calculate monthly rent with duration factor
    const monthlyInterestRate = interestRateM2R / 12 / 100;
    const monthlyRent = Math.round(amount * monthlyInterestRate);
    const adjustedRent = durationM2R === 12 ? monthlyRent : Math.round(monthlyRent * (durationM2R / 12));
    
    setMortgageResult(`با تبدیل ${formatCurrency(amount)} رهن کامل با نرخ سالانه ${interestRateM2R}٪ و مدت ${durationM2R} ماه، مبلغ اجاره ${formatCurrency(adjustedRent)} خواهد بود.`);
  };

  const handleRentToMortgage = () => {
    const amount = parseFloat(rentAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      setRentResult("لطفاً مبلغ اجاره را به درستی وارد کنید");
      return;
    }
    
    // Calculate deposit amount with duration factor
    const monthlyInterestRate = interestRateR2M / 12 / 100;
    const baseDepositAmount = Math.round(amount / monthlyInterestRate);
    const adjustedDeposit = durationR2M === 12 ? baseDepositAmount : Math.round(baseDepositAmount * (12 / durationR2M));
    
    setRentResult(`با تبدیل ${formatCurrency(amount)} اجاره ماهیانه با نرخ سالانه ${interestRateR2M}٪ و مدت ${durationR2M} ماه، مبلغ رهن کامل ${formatCurrency(adjustedDeposit)} خواهد بود.`);
  };

  // Format input for currency
  const formatInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Remove non-numeric characters
    const numberValue = value.replace(/[^\d]/g, '');
    // Format with commas
    const formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setter(formattedValue);
  };

  const renderInfoCard = () => (
    <Card className="mb-6 border-primary/10 bg-primary/5">
      <CardContent className="p-4 flex gap-3">
        <div className="mt-1">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">اطلاعات مفید درباره رهن و اجاره:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>در محاسبه رهن و اجاره معمولاً نرخ سالیانه بین ۲۰٪ تا ۳۰٪ در نظر گرفته می‌شود.</li>
            <li>مدت قرارداد اجاره معمولاً ۱۲ ماه است اما می‌توانید برای مدت‌های مختلف محاسبه کنید.</li>
            <li>فرمول محاسبه: اجاره ماهیانه = مبلغ رهن × نرخ سالیانه ÷ ۱۲ ÷ ۱۰۰</li>
            <li>با افزایش مبلغ رهن، اجاره ماهیانه کاهش می‌یابد و بالعکس.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Home className="ml-2 h-5 w-5" />
          محاسبه‌گر رهن و اجاره
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderInfoCard()}
        
        <Tabs defaultValue="mortgage-to-rent">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="mortgage-to-rent" className="flex-1">تبدیل رهن به اجاره</TabsTrigger>
            <TabsTrigger value="rent-to-mortgage" className="flex-1">تبدیل اجاره به رهن</TabsTrigger>
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
                  placeholder="مثال: 100,000,000"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRateM2R">نرخ سود سالیانه</Label>
                  <span className="text-sm font-medium">{interestRateM2R}٪</span>
                </div>
                <Slider
                  id="interestRateM2R"
                  min={12}
                  max={36}
                  step={1}
                  value={[interestRateM2R]}
                  onValueChange={(value) => setInterestRateM2R(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>۱۲٪</span>
                  <span>۲۴٪</span>
                  <span>۳۶٪</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="durationM2R">مدت قرارداد (ماه)</Label>
                  <span className="text-sm font-medium">{durationM2R} ماه</span>
                </div>
                <Slider
                  id="durationM2R"
                  min={1}
                  max={24}
                  step={1}
                  value={[durationM2R]}
                  onValueChange={(value) => setDurationM2R(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>۱ ماه</span>
                  <span>۱۲ ماه</span>
                  <span>۲۴ ماه</span>
                </div>
              </div>
              
              <Button onClick={handleMortgageToRent} className="w-full">
                <Calculator className="ml-2 h-5 w-5" />
                محاسبه اجاره ماهیانه
              </Button>
              
              {mortgageResult && <OutcomeInfoCard outcome={mortgageResult} />}
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
                  placeholder="مثال: 5,000,000"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRateR2M">نرخ سود سالیانه</Label>
                  <span className="text-sm font-medium">{interestRateR2M}٪</span>
                </div>
                <Slider
                  id="interestRateR2M"
                  min={12}
                  max={36}
                  step={1}
                  value={[interestRateR2M]}
                  onValueChange={(value) => setInterestRateR2M(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>۱۲٪</span>
                  <span>۲۴٪</span>
                  <span>۳۶٪</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="durationR2M">مدت قرارداد (ماه)</Label>
                  <span className="text-sm font-medium">{durationR2M} ماه</span>
                </div>
                <Slider
                  id="durationR2M"
                  min={1}
                  max={24}
                  step={1}
                  value={[durationR2M]}
                  onValueChange={(value) => setDurationR2M(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>۱ ماه</span>
                  <span>۱۲ ماه</span>
                  <span>۲۴ ماه</span>
                </div>
              </div>
              
              <Button onClick={handleRentToMortgage} className="w-full">
                <Calculator className="ml-2 h-5 w-5" />
                محاسبه مبلغ رهن
              </Button>
              
              {rentResult && <OutcomeInfoCard outcome={rentResult} />}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
