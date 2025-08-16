import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Sun, Moon, Heart, Briefcase, TrendingUp, Copy, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from "@/hooks/use-toast";

interface ZodiacSign {
  id: string;
  name: string;
  persianName: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  dates: string;
  symbol: string;
  ruler: string;
}

interface HoroscopeReading {
  daily: string;
  weekly: string;
  monthly: string;
  love: string;
  career: string;
  health: string;
  luckyNumbers: number[];
  luckyColors: string[];
  compatibility: string[];
}

const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', persianName: 'حمل', element: 'fire', dates: '21 مارس - 19 آوریل', symbol: '♈', ruler: 'مریخ' },
  { id: 'taurus', name: 'Taurus', persianName: 'ثور', element: 'earth', dates: '20 آوریل - 20 می', symbol: '♉', ruler: 'ونوس' },
  { id: 'gemini', name: 'Gemini', persianName: 'جوزا', element: 'air', dates: '21 می - 20 ژوئن', symbol: '♊', ruler: 'عطارد' },
  { id: 'cancer', name: 'Cancer', persianName: 'سرطان', element: 'water', dates: '21 ژوئن - 22 ژولای', symbol: '♋', ruler: 'ماه' },
  { id: 'leo', name: 'Leo', persianName: 'اسد', element: 'fire', dates: '23 ژولای - 22 آگوست', symbol: '♌', ruler: 'خورشید' },
  { id: 'virgo', name: 'Virgo', persianName: 'سنبله', element: 'earth', dates: '23 آگوست - 22 سپتامبر', symbol: '♍', ruler: 'عطارد' },
  { id: 'libra', name: 'Libra', persianName: 'میزان', element: 'air', dates: '23 سپتامبر - 22 اکتبر', symbol: '♎', ruler: 'ونوس' },
  { id: 'scorpio', name: 'Scorpio', persianName: 'عقرب', element: 'water', dates: '23 اکتبر - 21 نوامبر', symbol: '♏', ruler: 'مریخ/پلوتو' },
  { id: 'sagittarius', name: 'Sagittarius', persianName: 'قوس', element: 'fire', dates: '22 نوامبر - 21 دسامبر', symbol: '♐', ruler: 'مشتری' },
  { id: 'capricorn', name: 'Capricorn', persianName: 'جدی', element: 'earth', dates: '22 دسامبر - 19 ژانویه', symbol: '♑', ruler: 'زحل' },
  { id: 'aquarius', name: 'Aquarius', persianName: 'دلو', element: 'air', dates: '20 ژانویه - 18 فوریه', symbol: '♒', ruler: 'زحل/اورانوس' },
  { id: 'pisces', name: 'Pisces', persianName: 'حوت', element: 'water', dates: '19 فوریه - 20 مارس', symbol: '♓', ruler: 'مشتری/نپتون' }
];

const elementColors = {
  fire: 'from-red-400 to-orange-400',
  earth: 'from-green-400 to-brown-400', 
  air: 'from-blue-400 to-cyan-400',
  water: 'from-blue-400 to-purple-400'
};

const ConstellationBackground = ({ element }: { element: ZodiacSign['element'] }) => (
  <div className="absolute inset-0 opacity-10 overflow-hidden">
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 400}
          r={Math.random() * 3 + 1}
          fill="currentColor"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </svg>
  </div>
);

const HoroscopeReading = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [reading, setReading] = useState<HoroscopeReading | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [readingType, setReadingType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const { toast } = useToast();

  const generateReading = async (sign: ZodiacSign) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const horoscopeData: HoroscopeReading = {
        daily: generateDailyReading(sign),
        weekly: generateWeeklyReading(sign),
        monthly: generateMonthlyReading(sign),
        love: generateLoveReading(sign),
        career: generateCareerReading(sign),
        health: generateHealthReading(sign),
        luckyNumbers: generateLuckyNumbers(),
        luckyColors: generateLuckyColors(sign),
        compatibility: generateCompatibility(sign)
      };
      
      setReading(horoscopeData);
      setIsGenerating(false);
      
      toast({
        title: "طالع شما آماده است! ⭐",
        description: `طالع ${sign.persianName} با جزئیات کامل تهیه شد`,
      });
    }, 2000);
  };

  const generateDailyReading = (sign: ZodiacSign): string => {
    const readings = {
      fire: "امروز روز انرژی و اقدام برای شماست. قدرت درونی‌تان را احساس کنید و به اهدافتان برسید.",
      earth: "روز مناسبی برای برنامه‌ریزی و کارهای عملی است. در تصمیمات مالی دقت کنید.",
      air: "ارتباطات اجتماعی امروز برای شما مهم است. ایده‌های جدیدی به ذهنتان خواهد رسید.",
      water: "حدس و شهود امروز راهنمای شماست. به احساساتتان اعتماد کنید."
    };
    return readings[sign.element];
  };

  const generateWeeklyReading = (sign: ZodiacSign): string => {
    return `این هفته برای متولدین ${sign.persianName} هفته‌ای پر از فرصت‌های جدید است. سیاره ${sign.ruler} تأثیرات مثبتی بر زندگی شما خواهد داشت.`;
  };

  const generateMonthlyReading = (sign: ZodiacSign): string => {
    return `ماه آینده برای شما ماه تحول و رشد خواهد بود. عنصر ${sign.element === 'fire' ? 'آتش' : sign.element === 'earth' ? 'خاک' : sign.element === 'air' ? 'هوا' : 'آب'} تأثیر زیادی در موفقیت‌هایتان دارد.`;
  };

  const generateLoveReading = (sign: ZodiacSign): string => {
    const loveReadings = {
      fire: "در روابط عاطفی پرشور و مصمم هستید. زمان ابراز احساسات است.",
      earth: "در عشق پایداری و وفاداری را ترجیح می‌دهید. رابطه‌تان عمق بیشتری می‌یابد.",
      air: "ارتباط فکری و گفتگو در روابط‌تان اهمیت دارد. شخص مناسب در راه است.",
      water: "احساسات عمیق و درک متقابل کلید موفقیت در روابط شماست."
    };
    return loveReadings[sign.element];
  };

  const generateCareerReading = (sign: ZodiacSign): string => {
    const careerReadings = {
      fire: "رهبری و پیشگامی در کار نقاط قوت شماست. پروژه جدیدی شروع کنید.",
      earth: "دقت و پشتکار در کار به نتایج عالی می‌رسد. تیم‌ورک مهم است.",
      air: "مهارت‌های ارتباطی و خلاقیت در کار به شما کمک می‌کند. شبکه‌سازی کنید.",
      water: "درک عمیق و همدلی در محیط کار مزیت شماست. به غریزه‌تان اعتماد کنید."
    };
    return careerReadings[sign.element];
  };

  const generateHealthReading = (sign: ZodiacSign): string => {
    return "انرژی و حال عمومی‌تان خوب است. به تغذیه سالم و ورزش منظم توجه کنید. استراحت کافی داشته باشید.";
  };

  const generateLuckyNumbers = (): number[] => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 1).sort((a, b) => a - b);
  };

  const generateLuckyColors = (sign: ZodiacSign): string[] => {
    const colorsByElement = {
      fire: ['قرمز', 'نارنجی', 'طلایی'],
      earth: ['سبز', 'قهوه‌ای', 'بژ'],
      air: ['آبی', 'زرد', 'نقره‌ای'],
      water: ['آبی کبود', 'بنفش', 'صورتی']
    };
    return colorsByElement[sign.element];
  };

  const generateCompatibility = (sign: ZodiacSign): string[] => {
    const compatibilityMap: { [key: string]: string[] } = {
      'aries': ['شیر', 'قوس', 'جوزا'],
      'taurus': ['کپریکورن', 'ویرگو', 'کنسر'],
      'gemini': ['آکواریوس', 'لیبرا', 'آریس'],
      // ... more compatibility mappings
    };
    return compatibilityMap[sign.id] || ['جوزا', 'میزان', 'دلو'];
  };

  const copyReading = async () => {
    if (!selectedSign || !reading) return;
    
    const currentReading = reading[readingType];
    const text = `طالع ${selectedSign.persianName} 🌟

📅 ${readingType === 'daily' ? 'روزانه' : readingType === 'weekly' ? 'هفتگی' : 'ماهانه'}:
${currentReading}

💕 عشق و روابط: ${reading.love}
💼 کار و شغل: ${reading.career}
🏥 سلامتی: ${reading.health}

🍀 اعداد خوش‌یمن: ${reading.luckyNumbers.join(' - ')}
🎨 رنگ‌های خوش‌یمن: ${reading.luckyColors.join(' - ')}
💑 سازگاری با: ${reading.compatibility.join(' - ')}

🔮 برج: ${selectedSign.persianName} ${selectedSign.symbol}
📍 تاریخ: ${selectedSign.dates}
🪐 سیاره حاکم: ${selectedSign.ruler}`;
    
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: "کپی شد! ⭐",
        description: "طالع شما در کلیپ‌بورد ذخیره شد",
      });
    }
  };

  const resetReading = () => {
    setSelectedSign(null);
    setReading(null);
    setReadingType('daily');
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/80 border-indigo-200 shadow-2xl">
      {selectedSign && <ConstellationBackground element={selectedSign.element} />}
      
      <CardHeader className={`relative z-10 bg-gradient-to-r ${selectedSign ? elementColors[selectedSign.element] : 'from-indigo-400 to-purple-400'} text-center py-4`}>
        <motion.div 
          className="flex items-center justify-center"
          animate={{ scale: selectedSign ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="text-white ml-3" size={24} />
          <h2 className="text-2xl font-bold text-white">
            {selectedSign ? `طالع ${selectedSign.persianName}` : 'طالع بینی'}
          </h2>
          {selectedSign && <span className="text-white mr-3 text-2xl">{selectedSign.symbol}</span>}
        </motion.div>
        <p className="text-white/90 mt-2 text-sm">
          {selectedSign ? selectedSign.dates : 'برج خود را انتخاب کنید'}
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-6 px-6">
        <AnimatePresence mode="wait">
          {!selectedSign ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-200 shadow-lg">
                <Star className="mx-auto mb-4 text-indigo-600" size={48} />
                <h3 className="text-xl font-bold text-indigo-800 mb-3">
                  برج خود را انتخاب کنید
                </h3>
                <p className="text-indigo-700 mb-4">
                  طالع کامل شما با پیش‌بینی روزانه، هفتگی و ماهانه
                </p>
              </div>

              <Select onValueChange={(value) => {
                const sign = zodiacSigns.find(s => s.id === value);
                if (sign) {
                  setSelectedSign(sign);
                  generateReading(sign);
                }
              }}>
                <SelectTrigger className="w-full h-12 border-indigo-200 focus:border-indigo-400">
                  <SelectValue placeholder="برج خود را انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.id} value={sign.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sign.symbol}</span>
                        <span>{sign.persianName}</span>
                        <span className="text-sm text-gray-500">({sign.dates})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          ) : isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4"
              >
                <Star className="text-indigo-600" size={48} />
              </motion.div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                در حال تهیه طالع شما...
              </h3>
              <p className="text-indigo-700">
                ستارگان در حال همکاری هستند ⭐
              </p>
            </motion.div>
          ) : reading ? (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* Reading Type Selector */}
              <div className="flex gap-2 bg-white/70 p-2 rounded-xl border border-indigo-200">
                {[
                  { key: 'daily', label: 'روزانه', icon: Sun },
                  { key: 'weekly', label: 'هفتگی', icon: Moon },
                  { key: 'monthly', label: 'ماهانه', icon: Star }
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={readingType === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setReadingType(key as any)}
                    className={readingType === key ? `bg-gradient-to-r ${elementColors[selectedSign.element]} text-white` : ''}
                  >
                    <Icon size={16} className="ml-1" />
                    {label}
                  </Button>
                ))}
              </div>

              {/* Main Reading */}
              <div className={`bg-gradient-to-br ${elementColors[selectedSign.element]}/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-200 shadow-lg`}>
                <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
                  <Star className="ml-2" size={18} />
                  {readingType === 'daily' ? 'طالع روزانه' : readingType === 'weekly' ? 'طالع هفتگی' : 'طالع ماهانه'}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {reading[readingType]}
                </p>
              </div>

              {/* Detailed Sections */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50/80 p-4 rounded-lg border border-red-200">
                  <h5 className="font-bold text-red-800 mb-2 flex items-center">
                    <Heart className="ml-1" size={16} />
                    عشق و روابط
                  </h5>
                  <p className="text-gray-700 text-sm">{reading.love}</p>
                </div>

                <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-bold text-blue-800 mb-2 flex items-center">
                    <Briefcase className="ml-1" size={16} />
                    کار و شغل  
                  </h5>
                  <p className="text-gray-700 text-sm">{reading.career}</p>
                </div>

                <div className="bg-green-50/80 p-4 rounded-lg border border-green-200">
                  <h5 className="font-bold text-green-800 mb-2 flex items-center">
                    <TrendingUp className="ml-1" size={16} />
                    سلامتی
                  </h5>
                  <p className="text-gray-700 text-sm">{reading.health}</p>
                </div>

                <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-bold text-purple-800 mb-2">اطلاعات مفید</h5>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>اعداد خوش‌یمن:</strong> {reading.luckyNumbers.join(' - ')}</p>
                    <p><strong>رنگ‌های شانس:</strong> {reading.luckyColors.join(' - ')}</p>
                    <p><strong>سازگاری با:</strong> {reading.compatibility.join(' - ')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="relative z-10 flex justify-center gap-3 pt-4 pb-6 bg-gradient-to-r from-indigo-50/80 to-purple-50/80">
        {reading && (
          <>
            <Button
              onClick={copyReading}
              variant="outline"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100"
            >
              <Copy size={16} className="ml-1" />
              کپی طالع
            </Button>
            <Button
              onClick={resetReading}
              variant="outline"
              className="border-indigo-300 text-indigo-800 hover:bg-indigo-100"
            >
              <RefreshCw size={16} className="ml-1" />
              برج جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default HoroscopeReading;