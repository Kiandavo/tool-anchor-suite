import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCalories } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator, Activity, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [result, setResult] = useState<string | null>(null);
  const [detailedResults, setDetailedResults] = useState<{
    bmr: number;
    tdee: number;
    weightLoss: number;
    maintain: number;
    weightGain: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  const handleCalculate = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageValue = parseFloat(age);

    if (isNaN(weightValue) || isNaN(heightValue) || isNaN(ageValue) || 
        weightValue <= 0 || heightValue <= 0 || ageValue <= 0) {
      setResult("لطفاً اطلاعات را به درستی وارد کنید.");
      return;
    }

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];
    const weightLoss = tdee - 500;
    const weightGain = tdee + 500;

    // Calculate macronutrients (rough estimates)
    const protein = weightValue * 2; // 2g per kg
    const fats = (tdee * 0.25) / 9; // 25% of calories from fats
    const carbs = (tdee - (protein * 4) - (fats * 9)) / 4;

    setDetailedResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLoss),
      maintain: Math.round(tdee),
      weightGain: Math.round(weightGain),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats)
    });
    
    setResult(
      `نرخ متابولیسم پایه (BMR): ${formatPersianNumber(Math.round(bmr))} کالری\n` +
      `نیاز کالری روزانه (TDEE): ${formatPersianNumber(Math.round(tdee))} کالری\n\n` +
      `برای کاهش وزن: ${formatPersianNumber(Math.round(weightLoss))} کالری\n` +
      `برای حفظ وزن: ${formatPersianNumber(Math.round(tdee))} کالری\n` +
      `برای افزایش وزن: ${formatPersianNumber(Math.round(weightGain))} کالری`
    );
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setResult(null);
    setDetailedResults(null);
  };

  const activityOptions = [
    { value: 'sedentary', label: 'کم تحرک (بدون ورزش)', icon: '🛋️' },
    { value: 'light', label: 'کم (ورزش 1-3 روز در هفته)', icon: '🚶' },
    { value: 'moderate', label: 'متوسط (ورزش 3-5 روز در هفته)', icon: '🏃' },
    { value: 'active', label: 'فعال (ورزش 6-7 روز در هفته)', icon: '💪' },
    { value: 'very-active', label: 'بسیار فعال (ورزش سنگین روزانه)', icon: '🏋️' }
  ];

  return (
    <div className="space-y-6">
      <CalculatorCard title="محاسبه کالری مورد نیاز روزانه" icon={Calculator} onReset={handleReset}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">جنسیت</Label>
            <Select
              value={gender}
              onValueChange={(value) => setGender(value as 'male' | 'female')}
            >
              <SelectTrigger>
                <SelectValue placeholder="جنسیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">👨 مرد</SelectItem>
                <SelectItem value="female">👩 زن</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">سن (سال)</Label>
            <Input
              id="age"
              type="number"
              placeholder="مثال: ۳۰"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">وزن (کیلوگرم)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="مثال: ۷۰"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">قد (سانتی‌متر)</Label>
            <Input
              id="height"
              type="number"
              placeholder="مثال: ۱۷۵"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="activityLevel">سطح فعالیت</Label>
            <Select
              value={activityLevel}
              onValueChange={(value) => setActivityLevel(value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="سطح فعالیت" />
              </SelectTrigger>
              <SelectContent>
                {activityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full gap-2"
          size="lg"
        >
          <Calculator className="h-5 w-5" />
          محاسبه کالری
        </Button>

        {/* Activity Level Visualization */}
        {detailedResults && (
          <>
            <VisualizationCard title="سطح فعالیت شما">
              <div className="flex justify-between items-center">
                {activityOptions.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col items-center ${
                      option.value === activityLevel ? 'scale-125' : 'opacity-40'
                    } transition-all`}
                  >
                    <div className={`text-2xl mb-1 ${
                      option.value === activityLevel ? 'animate-pulse' : ''
                    }`}>
                      {option.icon}
                    </div>
                    {option.value === activityLevel && (
                      <div className="h-1 w-8 bg-primary rounded-full" />
                    )}
                  </motion.div>
                ))}
              </div>
            </VisualizationCard>

            {/* Calorie Goals Visualization */}
            <VisualizationCard title="اهداف کالری روزانه">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    <span className="font-medium">کاهش وزن</span>
                  </div>
                  <span className="text-lg font-bold">{formatPersianNumber(detailedResults.weightLoss)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <Minus className="h-5 w-5 text-primary" />
                    <span className="font-medium">حفظ وزن</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{formatPersianNumber(detailedResults.maintain)}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium">افزایش وزن</span>
                  </div>
                  <span className="text-lg font-bold">{formatPersianNumber(detailedResults.weightGain)}</span>
                </motion.div>
              </div>
            </VisualizationCard>

            {/* Macronutrients Breakdown */}
            <VisualizationCard title="توزیع ماکروها (برای حفظ وزن)">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>پروتئین</span>
                    <span className="font-bold">{formatPersianNumber(detailedResults.protein)}g</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '30%' }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>کربوهیدرات</span>
                    <span className="font-bold">{formatPersianNumber(detailedResults.carbs)}g</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>چربی</span>
                    <span className="font-bold">{formatPersianNumber(detailedResults.fats)}g</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '20%' }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                    />
                  </div>
                </div>
              </div>
            </VisualizationCard>
          </>
        )}

        {result && <OutcomeInfoCard outcome={result} />}
      </CalculatorCard>
    </div>
  );
}