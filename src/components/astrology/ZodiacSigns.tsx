import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Flame, Droplets, Wind, Mountain } from 'lucide-react';

interface ZodiacSign {
  name: string;
  latin: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  ruler: string;
  dates: string;
  symbol: string;
  traits: string[];
  description: string;
  color: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: 'حمل',
    latin: 'Aries',
    element: 'fire',
    quality: 'cardinal',
    ruler: 'مریخ',
    dates: '۲۱ مارس - ۱۹ آوریل',
    symbol: '♈',
    traits: ['شجاع', 'مستقل', 'رهبر', 'پرانرژی'],
    description: 'برج حمل نماد شروع و آغاز است. افراد متولد این برج پیشگام، شجاع و پر از انرژی هستند.',
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'ثور',
    latin: 'Taurus',
    element: 'earth',
    quality: 'fixed',
    ruler: 'ونوس',
    dates: '۲۰ آوریل - ۲۰ می',
    symbol: '♉',
    traits: ['باثبات', 'قابل اعتماد', 'صبور', 'عملی'],
    description: 'برج ثور نماد ثبات و امنیت است. این افراد عملی، صبور و دوستدار زیبایی هستند.',
    color: 'from-green-600 to-emerald-600'
  },
  {
    name: 'جوزا',
    latin: 'Gemini',
    element: 'air',
    quality: 'mutable',
    ruler: 'تیر',
    dates: '۲۱ می - ۲۰ ژوئن',
    symbol: '♊',
    traits: ['باهوش', 'کنجکاو', 'اجتماعی', 'انعطاف‌پذیر'],
    description: 'برج جوزا نماد ارتباط و تفکر است. افراد این برج هوشمند، کنجکاو و اجتماعی هستند.',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    name: 'سرطان',
    latin: 'Cancer',
    element: 'water',
    quality: 'cardinal',
    ruler: 'ماه',
    dates: '۲۱ ژوئن - ۲۲ ژوئیه',
    symbol: '♋',
    traits: ['احساساتی', 'مراقب', 'وفادار', 'شهودی'],
    description: 'برج سرطان نماد احساسات و خانواده است. این افراد مهربان، حساس و مراقب دیگرانند.',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    name: 'اسد',
    latin: 'Leo',
    element: 'fire',
    quality: 'fixed',
    ruler: 'خورشید',
    dates: '۲۳ ژوئیه - ۲۲ آگوست',
    symbol: '♌',
    traits: ['با اعتماد به نفس', 'خلاق', 'سخاوتمند', 'رهبر'],
    description: 'برج اسد نماد قدرت و خلاقیت است. افراد این برج با اعتماد به نفس، خلاق و سخاوتمند هستند.',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    name: 'سنبله',
    latin: 'Virgo',
    element: 'earth',
    quality: 'mutable',
    ruler: 'تیر',
    dates: '۲۳ آگوست - ۲۲ سپتامبر',
    symbol: '♍',
    traits: ['تحلیلگر', 'دقیق', 'کمال‌گرا', 'کاربردی'],
    description: 'برج سنبله نماد دقت و تحلیل است. این افراد تحلیلگر، دقیق و کمال‌گرا هستند.',
    color: 'from-green-700 to-teal-700'
  },
  {
    name: 'میزان',
    latin: 'Libra',
    element: 'air',
    quality: 'cardinal',
    ruler: 'ونوس',
    dates: '۲۳ سپتامبر - ۲۲ اکتبر',
    symbol: '♎',
    traits: ['متعادل', 'دیپلمات', 'عاشق زیبایی', 'عادل'],
    description: 'برج میزان نماد تعادل و عدالت است. افراد این برج دیپلمات، متعادل و عاشق هماهنگی هستند.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'عقرب',
    latin: 'Scorpio',
    element: 'water',
    quality: 'fixed',
    ruler: 'پلوتو',
    dates: '۲۳ اکتبر - ۲۱ نوامبر',
    symbol: '♏',
    traits: ['شدید', 'پرشور', 'وفادار', 'قدرتمند'],
    description: 'برج عقرب نماد قدرت و تحول است. این افراد شدید، پرشور و تحول‌آفرین هستند.',
    color: 'from-red-700 to-purple-700'
  },
  {
    name: 'قوس',
    latin: 'Sagittarius',
    element: 'fire',
    quality: 'mutable',
    ruler: 'مشتر',
    dates: '۲۲ نوامبر - ۲۱ دسامبر',
    symbol: '♐',
    traits: ['خوش‌بین', 'ماجراجو', 'فلسفی', 'آزادی‌خواه'],
    description: 'برج قوس نماد ماجراجویی و حقیقت است. افراد این برج خوش‌بین، ماجراجو و آزادی‌خواه هستند.',
    color: 'from-purple-600 to-indigo-600'
  },
  {
    name: 'جدی',
    latin: 'Capricorn',
    element: 'earth',
    quality: 'cardinal',
    ruler: 'زحل',
    dates: '۲۲ دسامبر - ۱۹ ژانویه',
    symbol: '♑',
    traits: ['منضبط', 'جاه‌طلب', 'مسئول', 'صبور'],
    description: 'برج جدی نماد موفقیت و انضباط است. این افراد منضبط، جاه‌طلب و مسئولیت‌پذیر هستند.',
    color: 'from-gray-700 to-slate-700'
  },
  {
    name: 'دلو',
    latin: 'Aquarius',
    element: 'air',
    quality: 'fixed',
    ruler: 'اورانوس',
    dates: '۲۰ ژانویه - ۱۸ فوریه',
    symbol: '♒',
    traits: ['نوآور', 'مستقل', 'بشردوست', 'اصیل'],
    description: 'برج دلو نماد نوآوری و آینده است. افراد این برج نوآور، مستقل و بشردوست هستند.',
    color: 'from-cyan-600 to-blue-600'
  },
  {
    name: 'حوت',
    latin: 'Pisces',
    element: 'water',
    quality: 'mutable',
    ruler: 'نپتون',
    dates: '۱۹ فوریه - ۲۰ مارس',
    symbol: '♓',
    traits: ['شهودی', 'هنرمند', 'دلسوز', 'معنوی'],
    description: 'برج حوت نماد معنویت و رویا است. این افراد شهودی، هنرمند و دلسوز هستند.',
    color: 'from-blue-500 to-purple-500'
  }
];

const getElementIcon = (element: string) => {
  switch (element) {
    case 'fire': return <Flame className="text-red-500" size={20} />;
    case 'earth': return <Mountain className="text-green-600" size={20} />;
    case 'air': return <Wind className="text-blue-500" size={20} />;
    case 'water': return <Droplets className="text-cyan-500" size={20} />;
    default: return null;
  }
};

const getElementName = (element: string) => {
  switch (element) {
    case 'fire': return 'آتش';
    case 'earth': return 'خاک';
    case 'air': return 'هوا';
    case 'water': return 'آب';
    default: return '';
  }
};

const getQualityName = (quality: string) => {
  switch (quality) {
    case 'cardinal': return 'کاردینال (شروع‌کننده)';
    case 'fixed': return 'ثابت (پایدار)';
    case 'mutable': return 'متغیر (انعطاف‌پذیر)';
    default: return '';
  }
};

export const ZodiacSigns: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <div className="space-y-6">
      {/* Element Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardContent className="pt-6 text-center">
            <Flame className="mx-auto mb-2 text-red-500" size={32} />
            <h3 className="font-bold text-red-900">آتش</h3>
            <p className="text-xs text-red-700 mt-1">حمل، اسد، قوس</p>
            <p className="text-xs text-muted-foreground mt-2">پرانرژی، پرشور، خلاق</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <Mountain className="mx-auto mb-2 text-green-600" size={32} />
            <h3 className="font-bold text-green-900">خاک</h3>
            <p className="text-xs text-green-700 mt-1">ثور، سنبله، جدی</p>
            <p className="text-xs text-muted-foreground mt-2">عملی، باثبات، قابل اعتماد</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="pt-6 text-center">
            <Wind className="mx-auto mb-2 text-blue-500" size={32} />
            <h3 className="font-bold text-blue-900">هوا</h3>
            <p className="text-xs text-blue-700 mt-1">جوزا، میزان، دلو</p>
            <p className="text-xs text-muted-foreground mt-2">فکری، اجتماعی، ارتباطی</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardContent className="pt-6 text-center">
            <Droplets className="mx-auto mb-2 text-cyan-500" size={32} />
            <h3 className="font-bold text-cyan-900">آب</h3>
            <p className="text-xs text-cyan-700 mt-1">سرطان، عقرب، حوت</p>
            <p className="text-xs text-muted-foreground mt-2">احساساتی، شهودی، عمیق</p>
          </CardContent>
        </Card>
      </div>

      {/* Zodiac Signs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ZODIAC_SIGNS.map((sign, index) => (
          <motion.div
            key={sign.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:scale-105"
              onClick={() => setSelectedSign(sign)}
            >
              <CardContent className="pt-6">
                <div className={`text-6xl text-center mb-2 bg-gradient-to-r ${sign.color} bg-clip-text text-transparent`}>
                  {sign.symbol}
                </div>
                <h3 className="text-center font-bold text-lg">{sign.name}</h3>
                <p className="text-center text-xs text-muted-foreground">{sign.latin}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {getElementIcon(sign.element)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Sign Details */}
      {selectedSign && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardHeader className={`bg-gradient-to-r ${selectedSign.color} text-white`}>
              <CardTitle className="flex items-center gap-4">
                <span className="text-4xl">{selectedSign.symbol}</span>
                <div>
                  <div className="text-2xl">{selectedSign.name}</div>
                  <div className="text-sm opacity-90">{selectedSign.latin}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    {getElementIcon(selectedSign.element)}
                    اطلاعات اساسی
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">عنصر:</span>
                      <span className="font-medium">{getElementName(selectedSign.element)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">کیفیت:</span>
                      <span className="font-medium">{getQualityName(selectedSign.quality)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">حاکم:</span>
                      <span className="font-medium">{selectedSign.ruler}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">تاریخ:</span>
                      <span className="font-medium">{selectedSign.dates}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">ویژگی‌های کلیدی</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSign.traits.map(trait => (
                      <span 
                        key={trait}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedSign.color} text-white`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm leading-relaxed">{selectedSign.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
