
import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Heart, 
  Scale, 
  Target, 
  TrendingUp, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Ruler,
  BarChart3,
  User,
  Zap,
  Trophy,
  Apple,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BMIResult {
  bmi: number;
  category: string;
  status: 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';
  color: string;
  healthRisk: string;
  idealWeightRange: { min: number; max: number };
  weightToLose: number;
  weightToGain: number;
  recommendations: string[];
}

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [targetWeight, setTargetWeight] = useState<string>('');

  // Enhanced BMI calculation with comprehensive analysis
  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const heightValue = parseFloat(height);
      const weightValue = parseFloat(weight);
      const ageValue = parseInt(age);

      // Enhanced validation
      if (isNaN(heightValue) || isNaN(weightValue)) {
        toast.error("مقادیر نامعتبر", {
          description: "لطفا قد و وزن معتبری وارد کنید",
          position: "top-center",
        });
        return;
      }

      if (heightValue < 50 || heightValue > 300) {
        toast.error("قد نامعتبر", {
          description: "قد باید بین ۵۰ تا ۳۰۰ سانتی‌متر باشد",
          position: "top-center",
        });
        return;
      }

      if (weightValue < 10 || weightValue > 500) {
        toast.error("وزن نامعتبر", {
          description: "وزن باید بین ۱۰ تا ۵۰۰ کیلوگرم باشد",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Convert height from cm to meters
      const heightInMeters = heightValue / 100;
      
      // Calculate BMI: weight(kg) / height²(m)
      const bmi = weightValue / (heightInMeters * heightInMeters);
      const roundedBmi = Math.round(bmi * 10) / 10;

      // Calculate ideal weight range (BMI 18.5-24.9)
      const idealWeightMin = 18.5 * (heightInMeters * heightInMeters);
      const idealWeightMax = 24.9 * (heightInMeters * heightInMeters);
      
      // Determine BMI category with comprehensive analysis
      let category: string;
      let status: BMIResult['status'];
      let color: string;
      let healthRisk: string;
      let recommendations: string[];
      
      if (bmi < 18.5) {
        category = "کمبود وزن";
        status = "underweight";
        color = "text-blue-600";
        healthRisk = "کم";
        recommendations = [
          "افزایش تدریجی وزن با تغذیه سالم",
          "مشورت با متخصص تغذیه",
          "ورزش‌های مقاومتی برای افزایش عضله",
          "مصرف پروتئین کافی در وعده‌های غذایی"
        ];
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "وزن نرمال";
        status = "normal";
        color = "text-green-600";
        healthRisk = "کم";
        recommendations = [
          "حفظ وزن فعلی با تغذیه متعادل",
          "ورزش منظم ۳-۵ روز در هفته",
          "مراقبت از سلامت قلب و عروق",
          "نظارت بر وزن هر ماه"
        ];
      } else if (bmi >= 25 && bmi < 30) {
        category = "اضافه وزن";
        status = "overweight";
        color = "text-amber-600";
        healthRisk = "متوسط";
        recommendations = [
          "کاهش ۵-۱۰% وزن در ۶ ماه",
          "افزایش فعالیت جسمانی روزانه",
          "کاهش کالری ۵۰۰-۷۵۰ در روز",
          "مشورت با متخصص تغذیه"
        ];
      } else if (bmi >= 30 && bmi < 35) {
        category = "چاقی درجه ۱";
        status = "obese1";
        color = "text-orange-600";
        healthRisk = "بالا";
        recommendations = [
          "کاهش ۱۰% وزن در ۶ ماه",
          "برنامه ورزشی نظارت شده",
          "رژیم غذایی تحت نظر پزشک",
          "بررسی فشار خون و قند خون"
        ];
      } else if (bmi >= 35 && bmi < 40) {
        category = "چاقی درجه ۲";
        status = "obese2";
        color = "text-red-600";
        healthRisk = "خیلی بالا";
        recommendations = [
          "مراجعه فوری به متخصص",
          "برنامه کاهش وزن جامع",
          "درمان بیماری‌های همراه",
          "احتمال نیاز به درمان دارویی"
        ];
      } else {
        category = "چاقی مفرط درجه ۳";
        status = "obese3";
        color = "text-red-700";
        healthRisk = "بسیار بالا";
        recommendations = [
          "مراجعه اورژانسی به متخصص",
          "ارزیابی جراحی کاهش وزن",
          "درمان فوری بیماری‌های مرتبط",
          "نظارت پزشکی مستمر"
        ];
      }

      const weightToLose = Math.max(0, weightValue - idealWeightMax);
      const weightToGain = Math.max(0, idealWeightMin - weightValue);

      const bmiResult: BMIResult = {
        bmi: roundedBmi,
        category,
        status,
        color,
        healthRisk,
        idealWeightRange: { min: idealWeightMin, max: idealWeightMax },
        weightToLose,
        weightToGain,
        recommendations
      };

      setResult(bmiResult);
      
      toast.success("برآورد BMI با موفقیت انجام شد", {
        description: `BMI شما: ${roundedBmi} - ${category}`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در برآورد", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [height, weight, age]);

  // BMI categories for visualization
  const bmiCategories = [
    { name: 'کمبود وزن', range: '< 18.5', color: 'bg-blue-500', width: '18.5%' },
    { name: 'نرمال', range: '18.5-24.9', color: 'bg-green-500', width: '24.9%' },
    { name: 'اضافه وزن', range: '25-29.9', color: 'bg-amber-500', width: '29.9%' },
    { name: 'چاقی درجه ۱', range: '30-34.9', color: 'bg-orange-500', width: '34.9%' },
    { name: 'چاقی درجه ۲', range: '35-39.9', color: 'bg-red-500', width: '39.9%' },
    { name: 'چاقی درجه ۳', range: '≥ 40', color: 'bg-red-700', width: '100%' }
  ];

  // Calculate BMI position on scale
  const bmiPosition = useMemo(() => {
    if (!result) return 0;
    return Math.min((result.bmi / 40) * 100, 100);
  }, [result]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxValue?: number
  ) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    
    if (maxValue && parseFloat(value) > maxValue) {
      value = maxValue.toString();
    }
    
    setter(value);
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setTargetWeight('');
    setResult(null);
    toast.info("فرم پاک شد", {
      description: "اطلاعات جدید وارد کنید",
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="icon-container">
              <Scale className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-center">محاسبه‌گر پیشرفته BMI</h2>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center text-sm font-medium">
                  <Ruler className="ml-1 h-3 w-3 text-primary" />
                  قد (سانتی‌متر)
                </Label>
                <Input
                  id="height"
                  value={height}
                  onChange={(e) => handleInputChange(e, setHeight, 300)}
                  placeholder="مثال: 175"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center text-sm font-medium">
                  <Scale className="ml-1 h-3 w-3 text-primary" />
                  وزن (کیلوگرم)
                </Label>
                <Input
                  id="weight"
                  value={weight}
                  onChange={(e) => handleInputChange(e, setWeight, 500)}
                  placeholder="مثال: 70"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center text-sm font-medium">
                  <User className="ml-1 h-3 w-3 text-primary" />
                  سن (اختیاری)
                </Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => handleInputChange(e, setAge, 120)}
                  placeholder="مثال: 30"
                  type="text"
                  dir="ltr"
                  className="glass-effect transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium">
                  <Heart className="ml-1 h-3 w-3 text-primary" />
                  جنسیت
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={gender === 'male' ? 'default' : 'outline'}
                    onClick={() => setGender('male')}
                    className="flex-1 glass-effect hover:-translate-y-1 transition-transform duration-300"
                  >
                    مرد
                  </Button>
                  <Button
                    variant={gender === 'female' ? 'default' : 'outline'}
                    onClick={() => setGender('female')}
                    className="flex-1 glass-effect hover:-translate-y-1 transition-transform duration-300"
                  >
                    زن
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={calculate}
                disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه BMI'}
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
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-effect">
                  <TabsTrigger value="overview" className="flex items-center">
                    <BarChart3 className="ml-1 h-4 w-4" />
                    نتایج
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="flex items-center">
                    <Activity className="ml-1 h-4 w-4" />
                    تحلیل
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="flex items-center">
                    <Apple className="ml-1 h-4 w-4" />
                    توصیه‌ها
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`BMI شما: ${result.bmi.toLocaleString('fa-IR')} - ${result.category}`}
                    />
                    <OutcomeInfoCard 
                      outcome={`ریسک سلامتی: ${result.healthRisk}`}
                    />
                  </div>

                  <div className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Target className="ml-2 h-5 w-5 text-primary" />
                      وضعیت BMI شما
                    </h3>
                    
                    {/* BMI Scale Visualization */}
                    <div className="relative">
                      <div className="w-full h-8 rounded-full overflow-hidden flex">
                        {bmiCategories.map((cat, index) => (
                          <div
                            key={index}
                            className={`${cat.color} flex items-center justify-center text-xs text-white font-medium transition-all duration-500`}
                            style={{ width: `${(parseFloat(cat.width) / 40) * 100}%` }}
                          >
                            {index < 3 && cat.name}
                          </div>
                        ))}
                      </div>
                      
                      {/* BMI Pointer */}
                      <div 
                        className="absolute top-0 h-8 w-1 bg-black transform -translate-x-0.5 transition-all duration-700"
                        style={{ left: `${bmiPosition}%` }}
                      >
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-black"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                        <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
                        وزن ایده‌آل
                      </h4>
                      <p className="text-lg font-semibold text-green-600">
                        {result.idealWeightRange.min.toFixed(1)} - {result.idealWeightRange.max.toFixed(1)} کیلو
                      </p>
                    </div>
                    
                    {result.weightToLose > 0 && (
                      <div className="glass-effect rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                          <TrendingUp className="ml-1 h-3 w-3 text-red-500" />
                          وزن کم کنید
                        </h4>
                        <p className="text-lg font-semibold text-red-600">
                          {result.weightToLose.toFixed(1)} کیلو
                        </p>
                      </div>
                    )}
                    
                    {result.weightToGain > 0 && (
                      <div className="glass-effect rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                          <TrendingUp className="ml-1 h-3 w-3 text-blue-500" />
                          وزن اضافه کنید
                        </h4>
                        <p className="text-lg font-semibold text-blue-600">
                          {result.weightToGain.toFixed(1)} کیلو
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                      result.status === 'normal' ? 'border-green-200' : 
                      result.status === 'underweight' ? 'border-blue-200' :
                      result.status === 'overweight' ? 'border-amber-200' : 'border-red-200'
                    }`}>
                      <div className="flex items-center mb-3">
                        {result.status === 'normal' ? (
                          <CheckCircle className="h-6 w-6 text-green-500 ml-2" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-amber-500 ml-2" />
                        )}
                        <h3 className="font-medium">وضعیت وزن</h3>
                      </div>
                      <p className={`text-xl font-bold ${result.color}`}>{result.category}</p>
                      <p className="text-sm text-muted-foreground mt-2">BMI: {result.bmi}</p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <Heart className="h-6 w-6 text-red-500 ml-2" />
                        <h3 className="font-medium">ریسک سلامتی</h3>
                      </div>
                      <p className={`text-xl font-bold ${
                        result.healthRisk === 'کم' ? 'text-green-600' :
                        result.healthRisk === 'متوسط' ? 'text-amber-600' :
                        'text-red-600'
                      }`}>{result.healthRisk}</p>
                      <p className="text-sm text-muted-foreground mt-2">بر اساس BMI فعلی</p>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Trophy className="ml-2 h-5 w-5 text-primary" />
                      هدف‌گذاری وزن
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label htmlFor="targetWeight" className="min-w-0 flex-shrink-0">وزن هدف:</Label>
                        <Input
                          id="targetWeight"
                          value={targetWeight}
                          onChange={(e) => handleInputChange(e, setTargetWeight, 500)}
                          placeholder="مثال: 65"
                          type="text"
                          dir="ltr"
                          className="glass-effect flex-1"
                        />
                        <span className="text-sm text-muted-foreground">کیلو</span>
                      </div>
                      
                      {targetWeight && parseFloat(targetWeight) > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {parseFloat(weight) > parseFloat(targetWeight) ? (
                            <span className="text-red-600">
                              برای رسیدن به هدف باید {(parseFloat(weight) - parseFloat(targetWeight)).toFixed(1)} کیلو کم کنید
                            </span>
                          ) : parseFloat(weight) < parseFloat(targetWeight) ? (
                            <span className="text-blue-600">
                              برای رسیدن به هدف باید {(parseFloat(targetWeight) - parseFloat(weight)).toFixed(1)} کیلو اضافه کنید
                            </span>
                          ) : (
                            <span className="text-green-600">شما در وزن هدف هستید!</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6 space-y-4">
                  <div className="glass-effect rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Zap className="ml-2 h-5 w-5 text-primary" />
                      توصیه‌های شخصی‌سازی شده
                    </h3>
                    <div className="space-y-3">
                      {result.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span className="text-sm">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Activity className="ml-2 h-4 w-4 text-primary" />
                        ورزش پیشنهادی
                      </h4>
                      <div className="space-y-2 text-sm">
                        {result.status === 'underweight' && (
                          <>
                            <p>• تمرینات مقاومتی ۳ روز در هفته</p>
                            <p>• یوگا و کششی</p>
                            <p>• پیاده‌روی آرام</p>
                          </>
                        )}
                        {result.status === 'normal' && (
                          <>
                            <p>• ترکیب کاردیو و قدرتی</p>
                            <p>• ۳۰ دقیقه ورزش روزانه</p>
                            <p>• ورزش‌های گروهی</p>
                          </>
                        )}
                        {(result.status === 'overweight' || result.status.includes('obese')) && (
                          <>
                            <p>• کاردیو کم‌ضربان</p>
                            <p>• شنا و دوچرخه‌سواری</p>
                            <p>• تمرینات تناوبی</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-5">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Apple className="ml-2 h-4 w-4 text-primary" />
                        تغذیه پیشنهادی
                      </h4>
                      <div className="space-y-2 text-sm">
                        {result.status === 'underweight' && (
                          <>
                            <p>• افزایش کالری سالم</p>
                            <p>• پروتئین در هر وعده</p>
                            <p>• میان‌وعده‌های مغذی</p>
                          </>
                        )}
                        {result.status === 'normal' && (
                          <>
                            <p>• رژیم متعادل مدیترانه‌ای</p>
                            <p>• ۵ وعده سبزی در روز</p>
                            <p>• آب کافی (۸ لیوان)</p>
                          </>
                        )}
                        {(result.status === 'overweight' || result.status.includes('obese')) && (
                          <>
                            <p>• کاهش کالری تدریجی</p>
                            <p>• افزایش فیبر و پروتئین</p>
                            <p>• کاهش قند و چربی اشباع</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
