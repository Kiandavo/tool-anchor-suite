import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Calculator, Info } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

export default function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [interestRateM2R, setInterestRateM2R] = useState<number>(24);
  const [durationM2R, setDurationM2R] = useState<number>(12);
  const [mortgageResult, setMortgageResult] = useState<{ rent: number; total: number } | null>(null);
  
  const [rentAmount, setRentAmount] = useState<string>('');
  const [interestRateR2M, setInterestRateR2M] = useState<number>(24);
  const [durationR2M, setDurationR2M] = useState<number>(12);
  const [rentResult, setRentResult] = useState<{ mortgage: number } | null>(null);

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

  const handleReset = () => {
    setMortgageAmount('');
    setMortgageResult(null);
    setRentAmount('');
    setRentResult(null);
  };

  return (
    <CalculatorCard
      title="محاسبه‌گر رهن و اجاره"
      icon={Home}
      onReset={handleReset}
    >
      <div className="p-4 mb-6 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="text-sm space-y-1">
          <p className="font-medium">نکات مهم:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>نرخ معمول: ۲۰-۳۰٪ سالیانه</li>
            <li>فرمول: اجاره = رهن × نرخ ÷ ۱۲</li>
          </ul>
        </div>
      </div>
      
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
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>مدت قرارداد (ماه)</Label>
                <span className="text-sm font-medium">{formatPersianNumber(durationM2R)} ماه</span>
              </div>
              <Slider
                min={1}
                max={24}
                step={1}
                value={[durationM2R]}
                onValueChange={(value) => setDurationM2R(value[0])}
              />
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
                <VisualizationCard title="مقایسه مبالغ">
                  <div className="space-y-4">
                    <div className="relative h-32 bg-gradient-to-br from-card to-muted/30 rounded-xl overflow-hidden border border-border">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40 flex items-center justify-center"
                      >
                        <div className="text-center px-2">
                          <p className="text-xs font-medium">مبلغ رهن</p>
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
                          <p className="text-xs font-medium">اجاره ماهیانه</p>
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
                        <p className="text-xs text-muted-foreground mb-1">کل پرداختی</p>
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
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>مدت قرارداد (ماه)</Label>
                <span className="text-sm font-medium">{formatPersianNumber(durationR2M)} ماه</span>
              </div>
              <Slider
                min={1}
                max={24}
                step={1}
                value={[durationR2M]}
                onValueChange={(value) => setDurationR2M(value[0])}
              />
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
    </CalculatorCard>
  );
}