import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hash, Calculator, Copy, RefreshCw, Calendar, Heart, Briefcase, Star } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from "@/hooks/use-toast";

interface NumerologyResult {
  name: string;
  birthDate?: string;
  lifePath: number;
  destiny: number;
  personality: number;
  birthNumber?: number;
  compatibility: number;
  luckyNumbers: number[];
  luckyColors: string[];
  careerGuidance: string;
  loveLife: string;
  challenges: string;
  strengths: string;
  interpretation: string;
}

// Persian/Arabic letter values for Abjad calculation
const abjadValues: Record<string, number> = {
  'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ی': 10, 'ک': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
  'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
  'آ': 1, 'پ': 2, 'چ': 3, 'ژ': 7, 'گ': 20
};

const NameNumerology = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [calculationType, setCalculationType] = useState<'name' | 'complete'>('name');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateAbjadValue = (text: string): number => {
    return text.split('').reduce((sum, char) => {
      return sum + (abjadValues[char] || 0);
    }, 0);
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateBirthNumber = (date: string): number => {
    const digits = date.replace(/\D/g, '');
    return reduceToSingleDigit(digits.split('').reduce((sum, digit) => sum + parseInt(digit), 0));
  };

  const generateLuckyNumbers = (lifePath: number, destiny: number): number[] => {
    const base = [lifePath, destiny];
    const additional = [
      (lifePath + destiny) % 9 || 9,
      (lifePath * 2) % 9 || 9,
      (destiny * 2) % 9 || 9
    ];
    return [...base, ...additional].slice(0, 5);
  };

  const generateLuckyColors = (lifePath: number): string[] => {
    const colorMap: { [key: number]: string[] } = {
      1: ['قرمز', 'نارنجی', 'طلایی'],
      2: ['آبی', 'سبز روشن', 'نقره‌ای'],
      3: ['زرد', 'بنفش', 'صورتی'],
      4: ['سبز', 'قهوه‌ای', 'خاکستری'],
      5: ['آبی روشن', 'فیروزه‌ای', 'سفید'],
      6: ['صورتی', 'آبی کبود', 'سبز کمرنگ'],
      7: ['بنفش', 'طلایی کم‌رنگ', 'سفید'],
      8: ['مشکی', 'قهوه‌ای تیره', 'زرد'],
      9: ['قرمز', 'طلایی', 'نارنجی']
    };
    return colorMap[lifePath] || ['آبی', 'سفید', 'طلایی'];
  };

  const calculateNumerology = () => {
    if (!firstName.trim()) return;
    if (calculationType === 'complete' && !birthDate.trim()) {
      toast({
        title: "تاریخ تولد لازم است",
        description: "برای محاسبه کامل، تاریخ تولد را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const fullName = firstName + (lastName ? ' ' + lastName : '');
      const totalValue = calculateAbjadValue(fullName);
      
      const lifePath = reduceToSingleDigit(calculateAbjadValue(firstName));
      const destiny = reduceToSingleDigit(totalValue);
      const personality = lastName ? reduceToSingleDigit(calculateAbjadValue(lastName)) : lifePath;
      const birthNumber = calculationType === 'complete' && birthDate ? calculateBirthNumber(birthDate) : undefined;
      const compatibility = (lifePath + destiny) % 9 || 9;
      
      const luckyNumbers = generateLuckyNumbers(lifePath, destiny);
      const luckyColors = generateLuckyColors(lifePath);
      
      const interpretation = generateCompleteInterpretation(lifePath, destiny, personality, birthNumber);
      const careerGuidance = generateCareerGuidance(lifePath, destiny);
      const loveLife = generateLoveGuidance(lifePath, personality);
      const challenges = generateChallenges(lifePath);
      const strengths = generateStrengths(lifePath);
      
      setResult({
        name: fullName,
        birthDate: calculationType === 'complete' ? birthDate : undefined,
        lifePath,
        destiny,
        personality,
        birthNumber,
        compatibility,
        luckyNumbers,
        luckyColors,
        careerGuidance,
        loveLife,
        challenges,
        strengths,
        interpretation
      });
      
      setIsCalculating(false);
      
      toast({
        title: "برآورد تکمیل شد! ✨",
        description: "تحلیل کامل اعداد شناسی شما آماده است",
      });
    }, 2000);
  };

  const generateCompleteInterpretation = (lifePath: number, destiny: number, personality: number, birthNumber?: number): string => {
    const lifePathMeanings = {
      1: "رهبری، استقلال و نوآوری",
      2: "همکاری، صلح و دیپلماسی", 
      3: "خلاقیت، هنر و ارتباطات",
      4: "نظم، کار سخت و پایداری",
      5: "آزادی، ماجراجویی و تغییر",
      6: "عشق، خانواده و مسئولیت",
      7: "معنویت، تحقیق و حکمت",
      8: "قدرت، مال و موفقیت مادی",
      9: "خدمت، انسان‌دوستی و عشق جهانی"
    };

    const destinyMeanings = {
      1: "شما برای رهبری و پیشگامی آمده‌اید",
      2: "شما برای ایجاد تعادل و صلح آمده‌اید",
      3: "شما برای خلق زیبایی و الهام آمده‌اید",
      4: "شما برای ساختن و پایه‌گذاری آمده‌اید",
      5: "شما برای کشف و تجربه آمده‌اید",
      6: "شما برای نگهداری و محافظت آمده‌اید",
      7: "شما برای جستجوی حقیقت آمده‌اید",
      8: "شما برای دستیابی به قدرت آمده‌اید",
      9: "شما برای خدمت به بشریت آمده‌اید"
    };

    let interpretation = `مسیر زندگی (${lifePath}): ${lifePathMeanings[lifePath as keyof typeof lifePathMeanings]}

هدف زندگی (${destiny}): ${destinyMeanings[destiny as keyof typeof destinyMeanings]}

شخصیت ظاهری (${personality}): ${lifePathMeanings[personality as keyof typeof lifePathMeanings]}`;

    if (birthNumber) {
      interpretation += `

عدد تولد (${birthNumber}): ${lifePathMeanings[birthNumber as keyof typeof lifePathMeanings]}`;
    }

    interpretation += `

نام شما حاوی انرژی‌های قوی است که می‌تواند در مسیر رشد شخصی و معنوی شما نقش مهمی ایفا کند.`;
    
    return interpretation;
  };

  const generateCareerGuidance = (lifePath: number, destiny: number): string => {
    const careerMap: { [key: number]: string } = {
      1: "مناسب برای رهبری، کارآفرینی، مدیریت و مشاغل مستقل. در موقعیت‌های رهبری عملکرد بهتری دارید.",
      2: "مناسب برای مشاوره، دیپلماسی، کار تیمی و خدمات اجتماعی. در محیط‌های همکاری موفق هستید.",
      3: "مناسب برای هنر، نوشتن، رسانه، تبلیغات و ارتباطات. خلاقیت نقطه قوت شماست.",
      4: "مناسب برای حسابداری، مهندسی، ساختمان و مشاغل فنی. دقت و نظم ویژگی‌های شماست.",
      5: "مناسب برای سفر، فروش، روابط عمومی و مشاغل متنوع. تغییر و چالش را دوست دارید.",
      6: "مناسب برای آموزش، پزشکی، مددکاری و خدمات خانوادگی. کمک به دیگران رسالت شماست.",
      7: "مناسب برای تحقیق، تحلیل، معنویت و علوم انسانی. عمق فکری نقطه قوت شماست.",
      8: "مناسب برای بانکداری، املاک، سرمایه‌گذاری و مدیریت مالی. استعداد مالی دارید.",
      9: "مناسب برای خیریه، آموزش، هنر و خدمات انسان‌دوستانه. خدمت به جامعه اولویت شماست."
    };
    return careerMap[lifePath] || "مسیر شغلی متنوعی پیش رو دارید.";
  };

  const generateLoveGuidance = (lifePath: number, personality: number): string => {
    const loveMap: { [key: number]: string } = {
      1: "در روابط عاطفی رهبری می‌کنید و استقلال طلب هستید. نیاز به شریکی دارید که استقلال شما را احترام کند.",
      2: "در عشق صلح‌طلب و مهربان هستید. رابطه متعادل و هارمونی برایتان مهم است.",
      3: "در روابط عاطفی خلاق و شاد هستید. ارتباط کلامی و شوخ‌طبعی در روابط اهمیت دارد.",
      4: "در عشق پایدار و وفادار هستید. به زمان نیاز دارید تا اعتماد کنید اما روابط طولانی دارید.",
      5: "در روابط آزادی‌خواه هستید و از یکنواختی فرار می‌کنید. شریک ماجراجو و انعطاف‌پذیر نیاز دارید.",
      6: "در عشق مسئولیت‌پذیر و فداکار هستید. خانواده و امنیت عاطفی برایتان اولویت دارد.",
      7: "در روابط عمیق و معنوی هستید. به شریکی نیاز دارید که درکتان کند و فضای تنهایی بدهد.",
      8: "در عشق قدرتمند و پرشور هستید. موفقیت و امنیت مالی در انتخاب شریک مهم است.",
      9: "در روابط انسان‌دوست و فداکار هستید. عشق شما فراتر از فرد و شامل جامعه می‌شود."
    };
    return loveMap[lifePath] || "روابط عاطفی متعادلی خواهید داشت.";
  };

  const generateChallenges = (lifePath: number): string => {
    const challengeMap: { [key: number]: string } = {
      1: "گاهی خودمحور و سرسخت می‌شوید. یادگیری همکاری و صبر چالش اصلی شماست.",
      2: "حساسیت زیاد و ترس از تضاد. باید اعتمادبه‌نفس بیشتری پیدا کنید.",
      3: "پراکندگی و تمرکز کم. متمرکز ماندن روی اهداف چالش شماست.",
      4: "سخت‌گیری بیش از حد و مقاومت در برابر تغییر. انعطاف‌پذیری را یاد بگیرید.",
      5: "بی‌قراری و عدم تعهد. ثبات و پایداری چالش اصلی شماست.",
      6: "مداخله بیش از حد در زندگی دیگران. حدود سالم رعایت کنید.",
      7: "انزوای بیش از حد و دوری از جامعه. تعامل اجتماعی را فراموش نکنید.",
      8: "طمع و عدم توجه به جنبه‌های معنوی. تعادل بین مادی و معنوی پیدا کنید.",
      9: "ایده‌آل‌گرایی بیش از حد و ناامیدی. واقع‌بینی را یاد بگیرید."
    };
    return challengeMap[lifePath] || "چالش‌هایی در مسیر رشد خواهید داشت.";
  };

  const generateStrengths = (lifePath: number): string => {
    const strengthMap: { [key: number]: string } = {
      1: "رهبری طبیعی، استقلال، نوآوری، اعتمادبه‌نفس و قدرت تصمیم‌گیری از نقاط قوت شماست.",
      2: "همکاری، دیپلماسی، حساسیت، صبر و قدرت میانجی‌گری نقاط قوت شماست.",
      3: "خلاقیت، شادی، مهارت ارتباطی، بیان و الهام‌بخشی استعدادهای شماست.",
      4: "سازماندهی، دقت، قابلیت اعتماد، پشتکار و عملی بودن نقاط قوت شماست.",
      5: "انطباق‌پذیری، ماجراجویی، آزادی‌خواهی، خلاقیت و چندجانبگی قوت‌های شماست.",
      6: "مسئولیت‌پذیری، مهرورزی، درک، حمایت‌گری و ایجاد هارمونی از ویژگی‌هایتان است.",
      7: "تحلیل عمیق، معنویت، حکمت، تحقیق و بینش درونی نقاط قوت شماست.",
      8: "مدیریت، سازماندهی، قدرت مالی، عزم و دستیابی به موفقیت مادی ویژگی‌هایتان است.",
      9: "انسان‌دوستی، خدمت‌رسانی، فداکاری، حکمت و نگاه جهانی نقاط قوت شماست."
    };
    return strengthMap[lifePath] || "استعدادهای متنوعی دارید.";
  };

  const copyResult = async () => {
    if (!result) return;
    
    const text = `اعداد شناسی کامل: ${result.name} ✨

📊 اعداد اصلی:
• مسیر زندگی: ${result.lifePath}
• هدف زندگی: ${result.destiny}  
• شخصیت: ${result.personality}
${result.birthNumber ? `• عدد تولد: ${result.birthNumber}` : ''}
• سازگاری: ${result.compatibility}

🎯 تفسیر کامل:
${result.interpretation}

💼 راهنمای شغلی:
${result.careerGuidance}

💕 زندگی عاطفی:
${result.loveLife}

💪 نقاط قوت:
${result.strengths}

⚠️ چالش‌ها:
${result.challenges}

🍀 اعداد خوش‌یمن: ${result.luckyNumbers.join(' - ')}
🎨 رنگ‌های شانس: ${result.luckyColors.join(' - ')}`;
    
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: "کپی شد! ✨",
        description: "تحلیل کامل اعداد شناسی در کلیپ‌بورد ذخیره شد",
      });
    }
  };

  const clearAll = () => {
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setResult(null);
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-teal-50/80 to-cyan-50/90 border-emerald-200 shadow-2xl backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.g
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: i * 2 }}
            >
              <Hash 
                x={Math.random() * 380} 
                y={Math.random() * 380} 
                className="w-6 h-6 fill-current" 
              />
            </motion.g>
          ))}
        </svg>
      </div>
      
      <CardHeader className="relative z-10 bg-gradient-to-r from-emerald-400/95 via-teal-400/95 to-cyan-400/95 text-center py-4 backdrop-blur-sm">
        <motion.div 
          className="flex items-center justify-center"
          animate={{ scale: result ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hash className="text-white ml-3" size={24} />
          <h2 className="text-2xl font-bold text-white">اعداد شناسی نام پیشرفته</h2>
          <Star className="text-white mr-3" size={20} />
        </motion.div>
        <p className="text-white/90 mt-2 text-sm">
          تحلیل کامل شخصیت بر اساس نام و تاریخ تولد
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-6 px-6">
        <div className="space-y-6">
          {!result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Calculation Type Selection */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-200 shadow-lg">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                  <Calculator className="ml-2" size={20} />
                  نوع محاسبه را انتخاب کنید
                </h3>
                <div className="flex gap-3 mb-4">
                  <Button
                    variant={calculationType === 'name' ? 'default' : 'outline'}
                    onClick={() => setCalculationType('name')}
                    className={calculationType === 'name' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-300 text-emerald-700'}
                  >
                    <Hash className="ml-1" size={16} />
                    فقط نام
                  </Button>
                  <Button
                    variant={calculationType === 'complete' ? 'default' : 'outline'}
                    onClick={() => setCalculationType('complete')}
                    className={calculationType === 'complete' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-300 text-emerald-700'}
                  >
                    <Star className="ml-1" size={16} />
                    تحلیل کامل
                  </Button>
                </div>
                <p className="text-emerald-700 text-sm">
                  {calculationType === 'name' 
                    ? '📝 تحلیل بر اساس نام شما' 
                    : '⭐ تحلیل جامع با نام و تاریخ تولد'}
                </p>
              </div>

              {/* Input Form */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-200 shadow-lg">
                <h3 className="font-bold text-emerald-800 mb-4">اطلاعات شخصی</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        نام (اجباری) *
                      </label>
                      <Input
                        placeholder="نام خود را وارد کنید"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border-emerald-200 focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">
                        نام خانوادگی (اختیاری)
                      </label>
                      <Input
                        placeholder="نام خانوادگی"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border-emerald-200 focus:border-emerald-400"
                      />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {calculationType === 'complete' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-medium text-emerald-700 mb-1">
                          تاریخ تولد (برای تحلیل کامل) *
                        </label>
                        <Input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="border-emerald-200 focus:border-emerald-400"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-emerald-100/80 p-4 rounded-lg border border-emerald-200">
                <p className="text-emerald-800 text-sm">
                  💡 این ابزار بر اساس محاسبات ابجد سنتی ایرانی کار می‌کند. هر حرف فارسی ارزش عددی مخصوص خود را دارد و از ترکیب آن‌ها شخصیت شما تحلیل می‌شود.
                </p>
              </div>

              <Button
                onClick={calculateNumerology}
                disabled={isCalculating || !firstName.trim()}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg py-3"
              >
                {isCalculating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="ml-2"
                    >
                      <Calculator size={16} />
                    </motion.div>
                    در حال محاسبه...
                  </>
                ) : (
                  <>
                    <Hash className="ml-2" size={16} />
                    {calculationType === 'complete' ? 'تحلیل کامل' : 'محاسبه اعداد شناسی'}
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Name Display */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-emerald-200 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                  {result.name}
                </h3>
                <p className="text-emerald-600">
                  {calculationType === 'complete' ? 'تحلیل کامل اعداد شناسی' : 'تحلیل اعداد شناسی نام'}
                </p>
                {result.birthDate && (
                  <p className="text-sm text-emerald-600 mt-1">
                    📅 تاریخ تولد: {result.birthDate}
                  </p>
                )}
              </div>

              {/* Numbers Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl text-center border border-emerald-300 shadow-md">
                  <div className="text-3xl font-bold text-emerald-800 mb-1">{result.lifePath}</div>
                  <div className="text-xs text-emerald-700 font-medium">مسیر زندگی</div>
                </div>
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-4 rounded-xl text-center border border-teal-300 shadow-md">
                  <div className="text-3xl font-bold text-teal-800 mb-1">{result.destiny}</div>
                  <div className="text-xs text-teal-700 font-medium">هدف زندگی</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-4 rounded-xl text-center border border-cyan-300 shadow-md">
                  <div className="text-3xl font-bold text-cyan-800 mb-1">{result.personality}</div>
                  <div className="text-xs text-cyan-700 font-medium">شخصیت</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center border border-blue-300 shadow-md">
                  <div className="text-3xl font-bold text-blue-800 mb-1">{result.compatibility}</div>
                  <div className="text-xs text-blue-700 font-medium">سازگاری</div>
                </div>
              </div>

              {result.birthNumber && (
                <div className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80 p-4 rounded-xl text-center border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800 mb-1">{result.birthNumber}</div>
                  <div className="text-sm text-purple-700 font-medium">عدد تولد</div>
                </div>
              )}

              {/* Detailed Analysis Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/90 p-5 rounded-xl border border-emerald-200 shadow-lg">
                  <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
                    <Briefcase className="ml-2" size={18} />
                    راهنمای شغلی
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.careerGuidance}</p>
                </div>

                <div className="bg-gradient-to-br from-red-50/90 to-pink-50/90 p-5 rounded-xl border border-red-200 shadow-lg">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center">
                    <Heart className="ml-2" size={18} />
                    زندگی عاطفی
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.loveLife}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 p-5 rounded-xl border border-green-200 shadow-lg">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center">
                    <Star className="ml-2" size={18} />
                    نقاط قوت
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.strengths}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50/90 to-yellow-50/90 p-5 rounded-xl border border-orange-200 shadow-lg">
                  <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                    <Calculator className="ml-2" size={18} />
                    چالش‌ها
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{result.challenges}</p>
                </div>
              </div>

              {/* Main Interpretation */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-emerald-200 shadow-lg">
                <h4 className="font-bold text-emerald-800 mb-4 text-lg flex items-center">
                  <Hash className="ml-2" size={20} />
                  تفسیر کامل اعداد شناسی
                </h4>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.interpretation}
                </div>
              </div>

              {/* Lucky Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50/80 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-bold text-yellow-800 mb-2">🍀 اعداد خوش‌یمن</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyNumbers.map((num, index) => (
                      <span key={index} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-bold text-purple-800 mb-2">🎨 رنگ‌های شانس</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyColors.map((color, index) => (
                      <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Abjad Info */}
              <div className="bg-emerald-50/80 p-4 rounded-lg border border-emerald-200">
                <p className="text-xs text-emerald-700 text-center">
                  📚 محاسبات بر اساس سیستم ابجد کهن که در فرهنگ ایرانی و اسلامی پایه علمی دارد
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10 flex justify-center gap-3 pt-4 pb-6 bg-gradient-to-r from-emerald-50/90 to-teal-50/90 backdrop-blur-sm">
        {result && (
          <>
            <Button
              onClick={copyResult}
              variant="outline"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Copy size={14} className="ml-1" />
              کپی نتیجه
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <RefreshCw size={14} className="ml-1" />
              محاسبه جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NameNumerology;