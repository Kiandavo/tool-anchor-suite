
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Calculator } from 'lucide-react';

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);

  const calculate = () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = heightValue / 100;
    
    // Calculate BMI: weight(kg) / height²(m)
    const bmi = weightValue / (heightInMeters * heightInMeters);
    const roundedBmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    
    // Determine BMI category
    let category = '';
    let additionalInfo = '';
    
    if (bmi < 18.5) {
      category = "کمبود وزن";
      additionalInfo = "شما زیر وزن طبیعی هستید. با یک متخصص تغذیه مشورت کنید.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "وزن نرمال";
      additionalInfo = "وزن شما در محدوده سالم قرار دارد. تغذیه متعادل و ورزش منظم را ادامه دهید.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "اضافه وزن";
      additionalInfo = "شما کمی اضافه وزن دارید. ورزش منظم و رژیم غذایی متعادل می‌تواند به شما کمک کند.";
    } else if (bmi >= 30 && bmi < 35) {
      category = "چاقی (درجه ۱)";
      additionalInfo = "با یک متخصص برای کاهش وزن تدریجی مشورت کنید.";
    } else if (bmi >= 35 && bmi < 40) {
      category = "چاقی (درجه ۲)";
      additionalInfo = "توصیه می‌شود با پزشک متخصص مشورت کنید.";
    } else {
      category = "چاقی شدید (درجه ۳)";
      additionalInfo = "لطفاً برای کمک پزشکی فوراً با متخصص مشورت کنید.";
    }
    
    setBmiCategory(category);
    setResult(`شاخص توده بدنی (BMI) شما: ${roundedBmi.toLocaleString('fa-IR')} - ${category}. ${additionalInfo}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setter(value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Calculator className="text-primary h-6 w-6 ml-2" />
            <h2 className="text-xl font-bold text-center">محاسبه‌گر BMI</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height">قد (سانتی‌متر)</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => handleInputChange(e, setHeight)}
                placeholder="مثال: 175"
                type="text"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">وزن (کیلوگرم)</Label>
              <Input
                id="weight"
                value={weight}
                onChange={(e) => handleInputChange(e, setWeight)}
                placeholder="مثال: 70"
                type="text"
                dir="ltr"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه کن
          </button>

          {result && <OutcomeInfoCard outcome={result} />}
          
          {bmiCategory && (
            <div className="mt-4">
              <div className="w-full h-6 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full rounded-full flex items-center justify-center text-xs text-white font-medium ${
                  bmiCategory === "کمبود وزن" ? "w-[15%] bg-blue-500" :
                  bmiCategory === "وزن نرمال" ? "w-[30%] bg-green-500" :
                  bmiCategory === "اضافه وزن" ? "w-[45%] bg-yellow-500" :
                  bmiCategory === "چاقی (درجه ۱)" ? "w-[60%] bg-orange-500" :
                  bmiCategory === "چاقی (درجه ۲)" ? "w-[75%] bg-red-500" :
                  "w-[90%] bg-red-700"
                }`}>
                  {bmiCategory}
                </div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>کمبود وزن</span>
                <span>وزن نرمال</span>
                <span>اضافه وزن</span>
                <span>چاقی</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
