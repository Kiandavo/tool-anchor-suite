
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, RefreshCw, Copy, Star } from "lucide-react";
import { motion } from 'framer-motion';

interface DailyPrediction {
  love: string;
  career: string;
  health: string;
  finance: string;
  general: string;
  luckyNumber: number;
  luckyColor: string;
}

const zodiacSigns = [
  { id: 'aries', name: 'فروردین (حمل)', symbol: '♈' },
  { id: 'taurus', name: 'اردیبهشت (ثور)', symbol: '♉' },
  { id: 'gemini', name: 'خرداد (جوزا)', symbol: '♊' },
  { id: 'cancer', name: 'تیر (سرطان)', symbol: '♋' },
  { id: 'leo', name: 'مرداد (اسد)', symbol: '♌' },
  { id: 'virgo', name: 'شهریور (سنبله)', symbol: '♍' },
  { id: 'libra', name: 'مهر (میزان)', symbol: '♎' },
  { id: 'scorpio', name: 'آبان (عقرب)', symbol: '♏' },
  { id: 'sagittarius', name: 'آذر (قوس)', symbol: '♐' },
  { id: 'capricorn', name: 'دی (جدی)', symbol: '♑' },
  { id: 'aquarius', name: 'بهمن (دلو)', symbol: '♒' },
  { id: 'pisces', name: 'اسفند (حوت)', symbol: '♓' }
];

const DailyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>('');
  const [prediction, setPrediction] = useState<DailyPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateDailyPrediction = () => {
    if (!selectedSign) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const predictions: DailyPrediction = {
        love: getRandomPrediction('love'),
        career: getRandomPrediction('career'),
        health: getRandomPrediction('health'),
        finance: getRandomPrediction('finance'),
        general: getRandomPrediction('general'),
        luckyNumber: Math.floor(Math.random() * 99) + 1,
        luckyColor: getRandomColor()
      };
      setPrediction(predictions);
      setIsLoading(false);
    }, 1500);
  };

  const getRandomPrediction = (category: string): string => {
    const predictions = {
      love: [
        'امروز روز مناسبی برای ابراز عشق و احساسات خود است.',
        'ممکن است با شخص مورد علاقه‌تان ملاقات جالبی داشته باشید.',
        'در روابط عاطفی خود صبور باشید و عجله نکنید.',
        'انرژی مثبت عشق امروز شما را احاطه کرده است.'
      ],
      career: [
        'در کار خود پیشرفت قابل توجهی خواهید داشت.',
        'فرصت‌های شغلی جدید در راه است، آماده باشید.',
        'همکاری با دیگران امروز ثمربخش خواهد بود.',
        'تصمیمات مهم کاری خود را به تعویق بیندازید.'
      ],
      health: [
        'امروز انرژی بالایی خواهید داشت.',
        'به ورزش و تغذیه سالم توجه کنید.',
        'استراحت کافی برای شما ضروری است.',
        'از فعالیت‌های آرام‌بخش استفاده کنید.'
      ],
      finance: [
        'روز مناسبی برای سرمایه‌گذاری است.',
        'در خرید و فروش دقت کنید.',
        'درآمد غیرمنتظره‌ای در راه است.',
        'صرفه‌جویی در مخارج را فراموش نکنید.'
      ],
      general: [
        'امروز روز بسیار مثبت و پربرکتی خواهد بود.',
        'تغییرات مثبت در زندگی شما رخ خواهد داد.',
        'به شهود درونی خود اعتماد کنید.',
        'روزی پر از فرصت‌های طلایی پیش رو دارید.'
      ]
    };
    
    const categoryPredictions = predictions[category as keyof typeof predictions];
    return categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
  };

  const getRandomColor = (): string => {
    const colors = ['آبی', 'قرمز', 'سبز', 'زرد', 'بنفش', 'نارنجی', 'سفید', 'مشکی', 'طلایی', 'نقره‌ای'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const copyPrediction = () => {
    if (!prediction) return;
    const selectedSignData = zodiacSigns.find(sign => sign.id === selectedSign);
    const text = `طالع روزانه ${selectedSignData?.name}

💕 عشق و روابط: ${prediction.love}
💼 کار و شغل: ${prediction.career}
🏥 سلامت: ${prediction.health}
💰 مالی: ${prediction.finance}
✨ کلی: ${prediction.general}

🍀 عدد شانس: ${prediction.luckyNumber}
🎨 رنگ شانس: ${prediction.luckyColor}`;
    
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-300 to-orange-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Sun className="text-amber-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-amber-800">طالع روزانه</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        {!selectedSign && (
          <div className="text-center mb-4">
            <p className="text-amber-700 text-sm mb-3">برج خود را انتخاب کنید:</p>
            <div className="grid grid-cols-3 gap-2">
              {zodiacSigns.map((sign) => (
                <Button
                  key={sign.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSign(sign.id)}
                  className="border-amber-300 text-amber-800 hover:bg-amber-100 text-xs py-2"
                >
                  <span className="ml-1 text-base">{sign.symbol}</span>
                  {sign.name.split(' ')[0]}
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedSign && !prediction && (
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-lg mb-4">
              <p className="text-amber-800 font-medium">
                {zodiacSigns.find(s => s.id === selectedSign)?.name}
              </p>
            </div>
            <Button
              onClick={generateDailyPrediction}
              disabled={isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin ml-2" size={16} />
                  در حال تولید طالع...
                </>
              ) : (
                <>
                  <Star className="ml-2" size={16} />
                  دریافت طالع روزانه
                </>
              )}
            </Button>
          </div>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="ml-2">💕</span>عشق و روابط
              </h4>
              <p className="text-sm text-gray-700">{prediction.love}</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="ml-2">💼</span>کار و شغل
              </h4>
              <p className="text-sm text-gray-700">{prediction.career}</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="ml-2">🏥</span>سلامت
              </h4>
              <p className="text-sm text-gray-700">{prediction.health}</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="ml-2">💰</span>مالی
              </h4>
              <p className="text-sm text-gray-700">{prediction.finance}</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center">
                <span className="ml-2">✨</span>پیش‌بینی کلی
              </h4>
              <p className="text-sm text-gray-700">{prediction.general}</p>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-lg border border-amber-300">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-xs text-amber-700">عدد شانس</p>
                  <p className="text-xl font-bold text-amber-800">{prediction.luckyNumber}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-amber-700">رنگ شانس</p>
                  <p className="text-sm font-bold text-amber-800">{prediction.luckyColor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center gap-2 pt-3 pb-4 bg-amber-50">
        {prediction && (
          <>
            <Button
              onClick={copyPrediction}
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <Copy size={14} className="ml-1" />
              کپی طالع
            </Button>
            <Button
              onClick={() => {
                setPrediction(null);
                setSelectedSign('');
              }}
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <RefreshCw size={14} className="ml-1" />
              برج جدید
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyHoroscope;
