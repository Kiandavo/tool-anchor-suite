import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap, Heart, Crown, Brain, Scale, Sparkles, Waves, Star } from 'lucide-react';

interface Planet {
  name: string;
  latin: string;
  symbol: string;
  rules: string;
  represents: string[];
  description: string;
  color: string;
  icon: React.ReactNode;
}

const PLANETS: Planet[] = [
  {
    name: 'خورشید',
    latin: 'Sun',
    symbol: '☉',
    rules: 'اسد',
    represents: ['هویت', 'خودآگاهی', 'اراده', 'حیات'],
    description: 'خورشید نماد هویت اصلی، خودآگاهی و اراده شماست. نشان‌دهنده هسته مرکزی شخصیت و هدف زندگی شما است.',
    color: 'from-yellow-400 to-orange-500',
    icon: <Sun className="text-yellow-500" size={32} />
  },
  {
    name: 'ماه',
    latin: 'Moon',
    symbol: '☽',
    rules: 'سرطان',
    represents: ['احساسات', 'غریزه', 'نیازهای درونی', 'مادر'],
    description: 'ماه نماد احساسات، غرایز و نیازهای احساسی شماست. نشان‌دهنده واکنش‌های شهودی و طرز تفکر درونی شما است.',
    color: 'from-blue-300 to-cyan-300',
    icon: <Moon className="text-blue-400" size={32} />
  },
  {
    name: 'تیر',
    latin: 'Mercury',
    symbol: '☿',
    rules: 'جوزا، سنبله',
    represents: ['تفکر', 'ارتباط', 'یادگیر', 'منطق'],
    description: 'تیر نماد تفکر، ارتباط و یادگیریست. نشان‌دهنده نحوه فکر کردن، صحبت کردن و پردازش اطلاعات شماست.',
    color: 'from-cyan-400 to-blue-500',
    icon: <Brain className="text-cyan-500" size={32} />
  },
  {
    name: 'ونوس',
    latin: 'Venus',
    symbol: '♀',
    rules: 'ثور، میزان',
    represents: ['عشق', 'زیبایی', 'روابط', 'ارزش‌ها'],
    description: 'ونوس نماد عشق، زیبایی و روابط است. نشان‌دهنده نحوه دوست داشتن، ارزش‌ها و چیزهایی که شما را جذب می‌کنند.',
    color: 'from-pink-400 to-rose-500',
    icon: <Heart className="text-pink-500" size={32} />
  },
  {
    name: 'مریخ',
    latin: 'Mars',
    symbol: '♂',
    rules: 'حمل',
    represents: ['انرژی', 'اقدام', 'شهامت', 'خشم'],
    description: 'مریخ نماد انرژی، اقدام و جسارت است. نشان‌دهنده نحوه عمل، رقابت و دفاع از خود شماست.',
    color: 'from-red-500 to-orange-600',
    icon: <Zap className="text-red-500" size={32} />
  },
  {
    name: 'مشتر',
    latin: 'Jupiter',
    symbol: '♃',
    rules: 'قوس',
    represents: ['گسترش', 'خوش‌شانسی', 'حکمت', 'رشد'],
    description: 'مشتر نماد رشد، گسترش و خوش‌شانسی است. نشان‌دهنده فلسفه زندگی، اعتقادات و فرصت‌های شماست.',
    color: 'from-purple-500 to-indigo-600',
    icon: <Crown className="text-purple-500" size={32} />
  },
  {
    name: 'زحل',
    latin: 'Saturn',
    symbol: '♄',
    rules: 'جدی',
    represents: ['انضباط', 'مسئولیت', 'درس‌ها', 'زمان'],
    description: 'زحل نماد انضباط، مسئولیت و درس‌های زندگی است. نشان‌دهنده محدودیت‌ها، چالش‌ها و بلوغ شماست.',
    color: 'from-gray-600 to-slate-700',
    icon: <Scale className="text-gray-600" size={32} />
  },
  {
    name: 'اورانوس',
    latin: 'Uranus',
    symbol: '♅',
    rules: 'دلو',
    represents: ['نوآوری', 'آزادی', 'تغییر ناگهانی', 'بیداری'],
    description: 'اورانوس نماد نوآوریت، آزادی و تغییرات غیرمنتظره است. نشان‌دهنده انقلاب، اصالت و بیداری شماست.',
    color: 'from-cyan-500 to-blue-600',
    icon: <Sparkles className="text-cyan-500" size={32} />
  },
  {
    name: 'نپتون',
    latin: 'Neptune',
    symbol: '♆',
    rules: 'حوت',
    represents: ['معنویت', 'تخیل', 'رویا', 'شهود'],
    description: 'نپتون نماد معنویت، رویا و تخیل است. نشان‌دهنده شهود، الهام و اتصال با جهان نامرئی شماست.',
    color: 'from-blue-400 to-purple-500',
    icon: <Waves className="text-blue-500" size={32} />
  },
  {
    name: 'پلوتو',
    latin: 'Pluto',
    symbol: '♇',
    rules: 'عقرب',
    represents: ['تحول', 'قدرت', 'مرگ و تولد', 'عمق'],
    description: 'پلوتو نماد تحول عمیق، قدرت و دگرگونی است. نشان‌دهنده تحولات ریشه‌ای و قدرت درونی شماست.',
    color: 'from-purple-700 to-red-800',
    icon: <Star className="text-purple-700" size={32} />
  }
];

export const PlanetsGuide: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="pt-6">
          <p className="text-sm text-center leading-relaxed">
            سیارات در طالع‌بینی نشان‌دهنده انرژی‌ها و نیروهای مختلفی هستند که بر زندگی ما تأثیر می‌گذارند.
            هر سیاره حوزه خاصی از زندگی را کنترل می‌کند و موقعیت آن در نقشه تولد شما، نحوه تجربه آن انرژی را مشخص می‌کند.
          </p>
        </CardContent>
      </Card>

      {/* Personal Planets */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sun size={20} className="text-yellow-500" />
          سیارات شخصی (تأثیر روزانه)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANETS.slice(0, 5).map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:scale-105"
                onClick={() => setSelectedPlanet(planet)}
              >
                <CardHeader className={`bg-gradient-to-r ${planet.color} text-white py-4`}>
                  <CardTitle className="flex items-center gap-3">
                    {planet.icon}
                    <div>
                      <div className="text-xl">{planet.name}</div>
                      <div className="text-xs opacity-90">{planet.latin}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className={`text-5xl text-center mb-3 bg-gradient-to-r ${planet.color} bg-clip-text text-transparent`}>
                    {planet.symbol}
                  </div>
                  <div className="text-sm text-center">
                    <span className="text-muted-foreground">حاکم: </span>
                    <span className="font-medium">{planet.rules}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outer Planets */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-purple-500" />
          سیارات بیرونی (تأثیر نسلی و تحول)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANETS.slice(5).map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:scale-105"
                onClick={() => setSelectedPlanet(planet)}
              >
                <CardHeader className={`bg-gradient-to-r ${planet.color} text-white py-4`}>
                  <CardTitle className="flex items-center gap-3">
                    {planet.icon}
                    <div>
                      <div className="text-xl">{planet.name}</div>
                      <div className="text-xs opacity-90">{planet.latin}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className={`text-5xl text-center mb-3 bg-gradient-to-r ${planet.color} bg-clip-text text-transparent`}>
                    {planet.symbol}
                  </div>
                  <div className="text-sm text-center">
                    <span className="text-muted-foreground">حاکم: </span>
                    <span className="font-medium">{planet.rules}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Planet Details */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardHeader className={`bg-gradient-to-r ${selectedPlanet.color} text-white`}>
              <CardTitle className="flex items-center gap-4">
                {selectedPlanet.icon}
                <div>
                  <div className="text-2xl">{selectedPlanet.name}</div>
                  <div className="text-sm opacity-90">{selectedPlanet.latin}</div>
                </div>
                <div className="mr-auto text-5xl">{selectedPlanet.symbol}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3">نماینده:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanet.represents.map(item => (
                      <span 
                        key={item}
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${selectedPlanet.color} text-white`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedPlanet.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <h5 className="font-bold text-blue-900 mb-2">حاکم برج:</h5>
                    <p className="text-sm text-blue-800">{selectedPlanet.rules}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <h5 className="font-bold text-purple-900 mb-2">سمبل:</h5>
                    <p className="text-4xl text-purple-800">{selectedPlanet.symbol}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
