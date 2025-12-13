import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, Heart, Scale, Target, TrendingUp, Activity, AlertCircle, CheckCircle, Ruler, BarChart3,
  User, Zap, Trophy, Apple, RotateCcw, Dumbbell, Droplets, Salad, Timer, Copy, Check, Keyboard
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { useToolKeyboardShortcuts } from '@/hooks/useToolKeyboardShortcuts';

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

interface IdealWeightFormulas {
  bmi: { min: number; max: number };
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const bmiRanges = [
  { name: 'کمبود وزن', min: 0, max: 18.5, color: '#3b82f6', description: 'BMI زیر ۱۸.۵' },
  { name: 'نرمال', min: 18.5, max: 24.9, color: '#22c55e', description: 'BMI بین ۱۸.۵ تا ۲۴.۹' },
  { name: 'اضافه وزن', min: 25, max: 29.9, color: '#eab308', description: 'BMI بین ۲۵ تا ۲۹.۹' },
  { name: 'چاقی درجه ۱', min: 30, max: 34.9, color: '#f97316', description: 'BMI بین ۳۰ تا ۳۴.۹' },
  { name: 'چاقی درجه ۲', min: 35, max: 39.9, color: '#ef4444', description: 'BMI بین ۳۵ تا ۳۹.۹' },
  { name: 'چاقی درجه ۳', min: 40, max: 50, color: '#dc2626', description: 'BMI بالای ۴۰' },
];

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyFrame, setBodyFrame] = useState<'small' | 'medium' | 'large'>('medium');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const copyResult = useCallback(async () => {
    if (!result) return;
    const text = `
محاسبه BMI
قد: ${height} سانتی‌متر
وزن: ${weight} کیلوگرم
BMI: ${result.bmi}
وضعیت: ${result.category}
ریسک سلامتی: ${result.healthRisk}
وزن ایده‌آل: ${result.idealWeightRange.min.toFixed(1)} تا ${result.idealWeightRange.max.toFixed(1)} کیلوگرم
    `.trim();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('نتیجه کپی شد');
    setTimeout(() => setCopied(false), 2000);
  }, [result, height, weight]);

  const calculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const heightValue = parseFloat(height);
      const weightValue = parseFloat(weight);
      const ageValue = parseInt(age);

      if (isNaN(heightValue) || isNaN(weightValue)) {
        toast.error("مقادیر نامعتبر", { description: "لطفا قد و وزن معتبری وارد کنید", position: "top-center" });
        return;
      }

      if (heightValue < 50 || heightValue > 300) {
        toast.error("قد نامعتبر", { description: "قد باید بین ۵۰ تا ۳۰۰ سانتی‌متر باشد", position: "top-center" });
        return;
      }

      if (weightValue < 10 || weightValue > 500) {
        toast.error("وزن نامعتبر", { description: "وزن باید بین ۱۰ تا ۵۰۰ کیلوگرم باشد", position: "top-center" });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      const heightInMeters = heightValue / 100;
      const bmi = weightValue / (heightInMeters * heightInMeters);
      const roundedBmi = Math.round(bmi * 10) / 10;

      // Adjust ideal weight range based on body frame
      const frameMultiplier = bodyFrame === 'small' ? 0.9 : bodyFrame === 'large' ? 1.1 : 1;
      const idealWeightMin = 18.5 * (heightInMeters * heightInMeters) * frameMultiplier;
      const idealWeightMax = 24.9 * (heightInMeters * heightInMeters) * frameMultiplier;
      
      let category: string;
      let status: BMIResult['status'];
      let color: string;
      let healthRisk: string;
      let recommendations: string[];
      
      if (bmi < 18.5) {
        category = "کمبود وزن"; status = "underweight"; color = "text-blue-600"; healthRisk = "کم";
        recommendations = ["افزایش تدریجی وزن با تغذیه سالم", "مشورت با متخصص تغذیه", "ورزش‌های مقاومتی برای افزایش عضله", "مصرف پروتئین کافی"];
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "وزن نرمال"; status = "normal"; color = "text-green-600"; healthRisk = "کم";
        recommendations = ["حفظ وزن فعلی با تغذیه متعادل", "ورزش منظم ۳-۵ روز در هفته", "مراقبت از سلامت قلب و عروق", "نظارت بر وزن هر ماه"];
      } else if (bmi >= 25 && bmi < 30) {
        category = "اضافه وزن"; status = "overweight"; color = "text-amber-600"; healthRisk = "متوسط";
        recommendations = ["کاهش ۵-۱۰% وزن در ۶ ماه", "افزایش فعالیت جسمانی روزانه", "کاهش کالری ۵۰۰-۷۵۰ در روز", "مشورت با متخصص تغذیه"];
      } else if (bmi >= 30 && bmi < 35) {
        category = "چاقی درجه ۱"; status = "obese1"; color = "text-orange-600"; healthRisk = "بالا";
        recommendations = ["کاهش ۱۰% وزن در ۶ ماه", "برنامه ورزشی نظارت شده", "رژیم غذایی تحت نظر پزشک", "بررسی فشار خون و قند خون"];
      } else if (bmi >= 35 && bmi < 40) {
        category = "چاقی درجه ۲"; status = "obese2"; color = "text-red-600"; healthRisk = "خیلی بالا";
        recommendations = ["مراجعه فوری به متخصص", "برنامه کاهش وزن جامع", "درمان بیماری‌های همراه", "احتمال نیاز به درمان دارویی"];
      } else {
        category = "چاقی مفرط درجه ۳"; status = "obese3"; color = "text-red-700"; healthRisk = "بسیار بالا";
        recommendations = ["مراجعه اورژانسی به متخصص", "ارزیابی جراحی کاهش وزن", "درمان فوری بیماری‌های مرتبط", "نظارت پزشکی مستمر"];
      }

      const weightToLose = Math.max(0, weightValue - idealWeightMax);
      const weightToGain = Math.max(0, idealWeightMin - weightValue);

      setResult({
        bmi: roundedBmi, category, status, color, healthRisk,
        idealWeightRange: { min: idealWeightMin, max: idealWeightMax },
        weightToLose, weightToGain, recommendations
      });
      
      toast.success("برآورد BMI با موفقیت انجام شد", { description: `BMI شما: ${roundedBmi} - ${category}`, position: "top-center" });
    } catch (error) {
      toast.error("خطا در برآورد", { description: "لطفا مقادیر را بررسی کنید", position: "top-center" });
    } finally {
      setIsCalculating(false);
    }
  }, [height, weight, age, bodyFrame]);

  useToolKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: calculate,
      description: 'محاسبه',
    },
    {
      key: 'r',
      ctrlKey: true,
      shiftKey: true,
      callback: () => {
        setHeight(''); setWeight(''); setAge(''); setTargetWeight(''); setResult(null);
        toast.info("فرم پاک شد");
      },
      description: 'پاک کردن',
    },
  ]);

  // Calculate ideal weight using multiple formulas
  const idealWeightFormulas = useMemo((): IdealWeightFormulas | null => {
    if (!height) return null;
    const heightCm = parseFloat(height);
    if (isNaN(heightCm) || heightCm < 50) return null;
    
    const heightInMeters = heightCm / 100;
    const heightInInches = heightCm / 2.54;
    const heightOver5Feet = Math.max(0, heightInInches - 60);
    
    // BMI-based (18.5-24.9)
    const bmiMin = 18.5 * (heightInMeters * heightInMeters);
    const bmiMax = 24.9 * (heightInMeters * heightInMeters);
    
    // Devine formula
    const devine = gender === 'male' 
      ? 50 + 2.3 * heightOver5Feet 
      : 45.5 + 2.3 * heightOver5Feet;
    
    // Robinson formula
    const robinson = gender === 'male'
      ? 52 + 1.9 * heightOver5Feet
      : 49 + 1.7 * heightOver5Feet;
    
    // Miller formula
    const miller = gender === 'male'
      ? 56.2 + 1.41 * heightOver5Feet
      : 53.1 + 1.36 * heightOver5Feet;
    
    // Hamwi formula
    const hamwi = gender === 'male'
      ? 48 + 2.7 * heightOver5Feet
      : 45.5 + 2.2 * heightOver5Feet;
    
    return { bmi: { min: bmiMin, max: bmiMax }, devine, robinson, miller, hamwi };
  }, [height, gender]);

  // BMI Chart data
  const bmiChartData = bmiRanges.map(range => ({
    name: range.name,
    value: range.max - range.min,
    fill: range.color
  }));

  const bmiPosition = useMemo(() => {
    if (!result) return 0;
    return Math.min((result.bmi / 50) * 100, 100);
  }, [result]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, maxValue?: number) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    if (maxValue && parseFloat(value) > maxValue) value = maxValue.toString();
    setter(value);
  };

  const handleReset = () => {
    setHeight(''); setWeight(''); setAge(''); setTargetWeight(''); setResult(null);
    toast.info("فرم پاک شد", { description: "اطلاعات جدید وارد کنید", position: "top-center" });
  };

  // Body silhouette color based on BMI
  const getSilhouetteColor = () => {
    if (!result) return '#94a3b8';
    switch (result.status) {
      case 'underweight': return '#3b82f6';
      case 'normal': return '#22c55e';
      case 'overweight': return '#eab308';
      case 'obese1': return '#f97316';
      case 'obese2': return '#ef4444';
      case 'obese3': return '#dc2626';
      default: return '#94a3b8';
    }
  };

  const formatNumber = (num: number) => num.toLocaleString('fa-IR', { maximumFractionDigits: 1 });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Keyboard className="w-3 h-3" />
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Enter</kbd>
          محاسبه
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">Ctrl+Shift+R</kbd>
          پاک کردن
        </span>
      </div>

      <Card className="vibrant-card overflow-hidden">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="icon-container">
              <Scale className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-center">محاسبه‌گر پیشرفته BMI</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center text-sm font-medium">
                  <Ruler className="ml-1 h-3 w-3 text-primary" />
                  قد (سانتی‌متر)
                </Label>
                <Input id="height" value={height} onChange={(e) => handleInputChange(e, setHeight, 300)}
                  placeholder="مثال: 175" type="text" dir="ltr" className="glass-effect transition-all duration-300 focus:scale-105" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center text-sm font-medium">
                  <Scale className="ml-1 h-3 w-3 text-primary" />
                  وزن (کیلوگرم)
                </Label>
                <Input id="weight" value={weight} onChange={(e) => handleInputChange(e, setWeight, 500)}
                  placeholder="مثال: 70" type="text" dir="ltr" className="glass-effect transition-all duration-300 focus:scale-105" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center text-sm font-medium">
                  <User className="ml-1 h-3 w-3 text-primary" />
                  سن (اختیاری)
                </Label>
                <Input id="age" value={age} onChange={(e) => handleInputChange(e, setAge, 120)}
                  placeholder="مثال: 30" type="text" dir="ltr" className="glass-effect transition-all duration-300 focus:scale-105" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium">
                  <Heart className="ml-1 h-3 w-3 text-primary" />
                  جنسیت
                </Label>
                <div className="flex gap-2">
                  <Button variant={gender === 'male' ? 'default' : 'outline'} onClick={() => setGender('male')}
                    className="flex-1 glass-effect hover:-translate-y-1 transition-transform duration-300">مرد</Button>
                  <Button variant={gender === 'female' ? 'default' : 'outline'} onClick={() => setGender('female')}
                    className="flex-1 glass-effect hover:-translate-y-1 transition-transform duration-300">زن</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium">
                  <Dumbbell className="ml-1 h-3 w-3 text-primary" />
                  فرم بدنی
                </Label>
                <Select value={bodyFrame} onValueChange={(v: 'small' | 'medium' | 'large') => setBodyFrame(v)}>
                  <SelectTrigger className="glass-effect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">ریز استخوان</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="large">درشت استخوان</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button onClick={calculate} disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه BMI'}
              </Button>
              {result && (
                <Button onClick={copyResult} variant="outline"
                  className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300">
                  {copied ? <Check className="ml-2 h-4 w-4 text-green-500" /> : <Copy className="ml-2 h-4 w-4" />}
                  کپی نتیجه
                </Button>
              )}
              <Button onClick={handleReset} variant="outline"
                className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300">
                <RotateCcw className="ml-2 h-4 w-4" />
                پاک کردن
              </Button>
            </div>
          </div>

          {result && (
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass-effect">
                  <TabsTrigger value="overview">نتایج</TabsTrigger>
                  <TabsTrigger value="visual">تحلیل بصری</TabsTrigger>
                  <TabsTrigger value="ideal">وزن ایده‌آل</TabsTrigger>
                  <TabsTrigger value="recommendations">توصیه‌ها</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard outcome={`BMI شما: ${formatNumber(result.bmi)} - ${result.category}`} />
                    <OutcomeInfoCard outcome={`ریسک سلامتی: ${result.healthRisk}`} />
                  </motion.div>

                  {/* Body Silhouette Visualization */}
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <User className="ml-2 h-5 w-5 text-primary" />
                      نمایش بصری وضعیت بدن
                    </h3>
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <svg viewBox="0 0 100 200" className="w-24 h-48 mx-auto">
                          {/* Body silhouette */}
                          <ellipse cx="50" cy="25" rx="20" ry="22" fill={getSilhouetteColor()} opacity="0.9" />
                          <rect x="35" y="45" width="30" height="55" rx="10" fill={getSilhouetteColor()} opacity="0.8" />
                          <rect x="25" y="50" width="15" height="45" rx="5" fill={getSilhouetteColor()} opacity="0.7" />
                          <rect x="60" y="50" width="15" height="45" rx="5" fill={getSilhouetteColor()} opacity="0.7" />
                          <rect x="38" y="100" width="10" height="50" rx="4" fill={getSilhouetteColor()} opacity="0.7" />
                          <rect x="52" y="100" width="10" height="50" rx="4" fill={getSilhouetteColor()} opacity="0.7" />
                        </svg>
                        <p className={cn("text-lg font-bold mt-2", result.color)}>{result.category}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="glass-effect rounded-lg p-3">
                          <p className="text-sm text-muted-foreground">BMI</p>
                          <p className={cn("text-2xl font-bold", result.color)}>{formatNumber(result.bmi)}</p>
                        </div>
                        <div className="glass-effect rounded-lg p-3">
                          <p className="text-sm text-muted-foreground">وزن فعلی</p>
                          <p className="text-xl font-bold">{formatNumber(parseFloat(weight))} کیلو</p>
                        </div>
                        <div className="glass-effect rounded-lg p-3">
                          <p className="text-sm text-muted-foreground">قد</p>
                          <p className="text-xl font-bold">{formatNumber(parseFloat(height))} سانتی‌متر</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-effect rounded-xl p-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                        <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
                        وزن ایده‌آل
                      </h4>
                      <p className="text-lg font-semibold text-green-600">
                        {formatNumber(result.idealWeightRange.min)} - {formatNumber(result.idealWeightRange.max)} کیلو
                      </p>
                    </div>
                    
                    {result.weightToLose > 0 && (
                      <div className="glass-effect rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                          <TrendingUp className="ml-1 h-3 w-3 text-red-500" />
                          وزن کم کنید
                        </h4>
                        <p className="text-lg font-semibold text-red-600">{formatNumber(result.weightToLose)} کیلو</p>
                      </div>
                    )}
                    
                    {result.weightToGain > 0 && (
                      <div className="glass-effect rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
                          <TrendingUp className="ml-1 h-3 w-3 text-blue-500" />
                          وزن اضافه کنید
                        </h4>
                        <p className="text-lg font-semibold text-blue-600">{formatNumber(result.weightToGain)} کیلو</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="visual" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <BarChart3 className="ml-2 h-5 w-5 text-primary" />
                      نمودار محدوده‌های BMI
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bmiRanges} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 50]} />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip formatter={(value, name, props) => [`${props.payload.min} - ${props.payload.max}`, 'محدوده BMI']} />
                          {result && <ReferenceLine x={result.bmi} stroke="#000" strokeWidth={3} label={{ value: `شما: ${formatNumber(result.bmi)}`, position: 'top' }} />}
                          <Bar dataKey="max" name="محدوده" radius={[0, 4, 4, 0]}>
                            {bmiRanges.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Target className="ml-2 h-5 w-5 text-primary" />
                      موقعیت BMI شما
                    </h3>
                    <div className="relative">
                      <div className="w-full h-10 rounded-full overflow-hidden flex">
                        {bmiRanges.map((range, index) => (
                          <div key={index} className="flex-1 flex items-center justify-center text-xs text-white font-medium"
                            style={{ backgroundColor: range.color }}>
                            {range.name}
                          </div>
                        ))}
                      </div>
                      <motion.div 
                        className="absolute top-0 h-10 w-1 bg-black rounded"
                        initial={{ left: '0%' }}
                        animate={{ left: `${bmiPosition}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          {formatNumber(result.bmi)}
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>0</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35</span>
                      <span>40+</span>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="ideal" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Trophy className="ml-2 h-5 w-5 text-primary" />
                      محاسبه وزن ایده‌آل با فرمول‌های مختلف
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      فرمول‌های مختلف برای محاسبه وزن ایده‌آل بر اساس قد {formatNumber(parseFloat(height))} سانتی‌متر
                    </p>
                    {idealWeightFormulas && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="glass-effect rounded-xl p-4 border-2 border-primary/30">
                          <h4 className="font-medium text-sm mb-2">فرمول BMI</h4>
                          <p className="text-xl font-bold text-primary">
                            {formatNumber(idealWeightFormulas.bmi.min)} - {formatNumber(idealWeightFormulas.bmi.max)} کیلو
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">BMI 18.5-24.9</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4">
                          <h4 className="font-medium text-sm mb-2">فرمول Devine</h4>
                          <p className="text-xl font-bold text-blue-600">{formatNumber(idealWeightFormulas.devine)} کیلو</p>
                          <p className="text-xs text-muted-foreground mt-1">رایج‌ترین فرمول</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4">
                          <h4 className="font-medium text-sm mb-2">فرمول Robinson</h4>
                          <p className="text-xl font-bold text-green-600">{formatNumber(idealWeightFormulas.robinson)} کیلو</p>
                          <p className="text-xs text-muted-foreground mt-1">دقت بالا</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4">
                          <h4 className="font-medium text-sm mb-2">فرمول Miller</h4>
                          <p className="text-xl font-bold text-amber-600">{formatNumber(idealWeightFormulas.miller)} کیلو</p>
                          <p className="text-xs text-muted-foreground mt-1">محافظه‌کارانه</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4">
                          <h4 className="font-medium text-sm mb-2">فرمول Hamwi</h4>
                          <p className="text-xl font-bold text-purple-600">{formatNumber(idealWeightFormulas.hamwi)} کیلو</p>
                          <p className="text-xs text-muted-foreground mt-1">قدیمی و ساده</p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 border-2 border-green-500/30">
                          <h4 className="font-medium text-sm mb-2">میانگین فرمول‌ها</h4>
                          <p className="text-xl font-bold text-green-600">
                            {formatNumber((idealWeightFormulas.devine + idealWeightFormulas.robinson + idealWeightFormulas.miller + idealWeightFormulas.hamwi) / 4)} کیلو
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">پیشنهادی</p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Timer className="ml-2 h-5 w-5 text-primary" />
                      برنامه رسیدن به وزن ایده‌آل
                    </h3>
                    {(result.weightToLose > 0 || result.weightToGain > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <p className="text-sm text-muted-foreground">کاهش/افزایش ۰.۵ کیلو در هفته</p>
                          <p className="text-2xl font-bold text-primary">
                            {formatNumber(Math.ceil((result.weightToLose || result.weightToGain) / 0.5))} هفته
                          </p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <p className="text-sm text-muted-foreground">کاهش/افزایش ۱ کیلو در هفته</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {formatNumber(Math.ceil((result.weightToLose || result.weightToGain) / 1))} هفته
                          </p>
                        </div>
                        <div className="glass-effect rounded-xl p-4 text-center">
                          <p className="text-sm text-muted-foreground">کاهش/افزایش ۱.۵ کیلو در هفته</p>
                          <p className="text-2xl font-bold text-amber-600">
                            {formatNumber(Math.ceil((result.weightToLose || result.weightToGain) / 1.5))} هفته
                          </p>
                        </div>
                      </div>
                    )}
                    {result.weightToLose === 0 && result.weightToGain === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-lg font-medium text-green-600">تبریک! شما در محدوده وزن ایده‌آل هستید.</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6 space-y-4">
                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Apple className="ml-2 h-5 w-5 text-primary" />
                      توصیه‌های تغذیه‌ای و سلامتی
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.recommendations.map((rec, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-4 flex items-start gap-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Dumbbell className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                      <h4 className="font-medium mb-2">ورزش پیشنهادی</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.status === 'underweight' ? 'تمرینات قدرتی و مقاومتی' :
                         result.status === 'normal' ? 'ترکیب کاردیو و قدرتی' :
                         'پیاده‌روی و شنا'}
                      </p>
                    </div>
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Droplets className="h-10 w-10 text-cyan-500 mx-auto mb-3" />
                      <h4 className="font-medium mb-2">آب مورد نیاز</h4>
                      <p className="text-sm text-muted-foreground">
                        روزانه {formatNumber(parseFloat(weight) * 0.03)} لیتر
                      </p>
                    </div>
                    <div className="neo-glass rounded-xl p-6 text-center">
                      <Salad className="h-10 w-10 text-green-500 mx-auto mb-3" />
                      <h4 className="font-medium mb-2">کالری پیشنهادی</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.status === 'underweight' ? 'کالری بیشتر از نیاز روزانه' :
                         result.status === 'normal' ? 'حفظ کالری فعلی' :
                         'کاهش ۵۰۰ کالری روزانه'}
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}
