
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, Calculator, Copy, RefreshCw } from "lucide-react";
import { motion } from 'framer-motion';

interface NumerologyResult {
  name: string;
  lifePath: number;
  destiny: number;
  personality: number;
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
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const calculateNumerology = () => {
    if (!firstName.trim()) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      const fullName = firstName + (lastName ? ' ' + lastName : '');
      const totalValue = calculateAbjadValue(fullName);
      
      const lifePath = reduceToSingleDigit(calculateAbjadValue(firstName));
      const destiny = reduceToSingleDigit(totalValue);
      const personality = lastName ? reduceToSingleDigit(calculateAbjadValue(lastName)) : lifePath;
      
      const interpretation = generateInterpretation(lifePath, destiny, personality);
      
      setResult({
        name: fullName,
        lifePath,
        destiny,
        personality,
        interpretation
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const generateInterpretation = (lifePath: number, destiny: number, personality: number): string => {
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

    return `مسیر زندگی (${lifePath}): ${lifePathMeanings[lifePath as keyof typeof lifePathMeanings]}

هدف زندگی (${destiny}): ${destinyMeanings[destiny as keyof typeof destinyMeanings]}

شخصیت ظاهری (${personality}): ${lifePathMeanings[personality as keyof typeof lifePathMeanings]}

نام شما حاوی انرژی‌های قوی است که می‌تواند در مسیر رشد شخصی و معنوی شما نقش مهمی ایفا کند.`;
  };

  const copyResult = () => {
    if (!result) return;
    const text = `اعداد شناسی نام: ${result.name}

${result.interpretation}`;
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setFirstName('');
    setLastName('');
    setResult(null);
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-300 to-teal-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Hash className="text-emerald-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-emerald-800">اعداد شناسی نام فارسی</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <div className="space-y-4">
          {!result ? (
            <div className="space-y-3">
              <div className="bg-white/60 p-3 rounded-lg border border-emerald-200">
                <p className="text-emerald-800 text-sm font-medium mb-3">
                  نام خود را وارد کنید:
                </p>
                <div className="space-y-2">
                  <Input
                    placeholder="نام (اجباری)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                  <Input
                    placeholder="نام خانوادگی (اختیاری)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="bg-emerald-100/50 p-3 rounded-lg border border-emerald-200">
                <p className="text-emerald-700 text-xs">
                  💡 این ابزار بر اساس محاسبات ابجد سنتی ایرانی کار می‌کند و هر حرف فارسی ارزش عددی خاصی دارد.
                </p>
              </div>

              <Button
                onClick={calculateNumerology}
                disabled={isCalculating || !firstName.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isCalculating ? (
                  <>
                    <Calculator className="animate-pulse ml-2" size={16} />
                    در حال محاسبه...
                  </>
                ) : (
                  <>
                    <Hash className="ml-2" size={16} />
                    محاسبه اعداد شناسی
                  </>
                )}
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Name Display */}
              <div className="bg-white/80 p-3 rounded-lg border border-emerald-200 text-center">
                <h3 className="text-lg font-bold text-emerald-800 mb-1">
                  {result.name}
                </h3>
                <p className="text-sm text-emerald-600">تحلیل اعداد شناسی</p>
              </div>

              {/* Numbers Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-lg text-center border border-emerald-300">
                  <div className="text-2xl font-bold text-emerald-800">{result.lifePath}</div>
                  <div className="text-xs text-emerald-700 font-medium">مسیر زندگی</div>
                </div>
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-lg text-center border border-teal-300">
                  <div className="text-2xl font-bold text-teal-800">{result.destiny}</div>
                  <div className="text-xs text-teal-700 font-medium">هدف زندگی</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-3 rounded-lg text-center border border-cyan-300">
                  <div className="text-2xl font-bold text-cyan-800">{result.personality}</div>
                  <div className="text-xs text-cyan-700 font-medium">شخصیت</div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-white/90 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
                  <Hash className="ml-2" size={16} />
                  تفسیر اعداد شناسی
                </h4>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.interpretation}
                </div>
              </div>

              {/* Abjad Info */}
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <p className="text-xs text-emerald-700">
                  📚 محاسبات بر اساس سیستم ابجد که در فرهنگ ایرانی و اسلامی کاربرد دارد.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-emerald-50/50">
        {result && (
          <>
            <Button
              onClick={copyResult}
              variant="outline"
              size="sm"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
            >
              <Copy size={14} className="ml-1" />
              کپی نتیجه
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              size="sm"
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
            >
              <RefreshCw size={14} className="ml-1" />
              نام جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NameNumerology;
