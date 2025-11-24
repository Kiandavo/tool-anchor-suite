import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Circle, Square, Triangle, Zap, ThumbsUp, AlertTriangle } from 'lucide-react';

interface Aspect {
  name: string;
  latin: string;
  angle: number;
  symbol: string;
  nature: 'harmonious' | 'challenging' | 'neutral';
  description: string;
  interpretation: string;
  color: string;
  icon: React.ReactNode;
}

const ASPECTS: Aspect[] = [
  {
    name: 'اتصال (Conjunction)',
    latin: 'Conjunction',
    angle: 0,
    symbol: '☌',
    nature: 'neutral',
    description: 'دو سیاره در یک نقطه یا بسیار نزدیک به هم قرار دارند.',
    interpretation: 'انرژی دو سیاره باهم ترکیب می‌شود و یک نیروی قوی ایجاد می‌کند. این اتصال می‌تواند قوی و مثبت یا چالش‌برانگیز باشد، بسته به سیارات درگیر.',
    color: 'from-yellow-500 to-amber-500',
    icon: <Circle className="text-yellow-500" size={24} />
  },
  {
    name: 'مقابله (Opposition)',
    latin: 'Opposition',
    angle: 180,
    symbol: '☍',
    nature: 'challenging',
    description: 'دو سیاره در نقاط مقابل دایره قرار دارند (180 درجه).',
    interpretation: 'تضاد و کشمکش بین دو انرژی. نیاز به تعادل و تلاش برای یافتن راه میانه. می‌تواند منجر به آگاهی و رشد شود.',
    color: 'from-red-500 to-orange-600',
    icon: <Zap className="text-red-500" size={24} />
  },
  {
    name: 'مثلث (Trine)',
    latin: 'Trine',
    angle: 120,
    symbol: '△',
    nature: 'harmonious',
    description: 'دو سیاره در فاصله 120 درجه از هم قرار دارند.',
    interpretation: 'جریان آسان و هماهنگ انرژی. استعداد طبیعی و موفقیت بدون تلاش زیاد. یکی از مثبت‌ترین اتصالات.',
    color: 'from-blue-500 to-cyan-500',
    icon: <Triangle className="text-blue-500" size={24} />
  },
  {
    name: 'چهارگوش (Square)',
    latin: 'Square',
    angle: 90,
    symbol: '□',
    nature: 'challenging',
    description: 'دو سیاره در زاویه 90 درجه نسبت به هم قرار دارند.',
    interpretation: 'تنش و چالش که منجر به عمل و رشد می‌شود. انرژی‌های متضاد که نیاز به حل دارند. محرک پیشرفت و تغییر.',
    color: 'from-orange-500 to-red-500',
    icon: <Square className="text-orange-500" size={24} />
  },
  {
    name: 'شش‌گوش (Sextile)',
    latin: 'Sextile',
    angle: 60,
    symbol: '⚹',
    nature: 'harmonious',
    description: 'دو سیاره در فاصله 60 درجه از هم قرار دارند.',
    interpretation: 'فرصت و هماهنگی خوب که با تلاش می‌تواند به نتیجه برسد. کمتر قوی از مثلث اما مفید و مثبت.',
    color: 'from-green-500 to-emerald-500',
    icon: <ThumbsUp className="text-green-500" size={24} />
  }
];

const AspectExample: React.FC<{ aspect: Aspect }> = ({ aspect }) => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Circle */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
        
        {/* Planets */}
        <circle cx="100" cy="20" r="8" fill="currentColor" className="text-purple-500" />
        <text x="100" y="15" textAnchor="middle" className="text-xs fill-purple-900">☉</text>
        
        {/* Second planet based on angle */}
        {aspect.angle === 0 && (
          <>
            <circle cx="105" cy="20" r="8" fill="currentColor" className="text-blue-500" />
            <text x="105" y="15" textAnchor="middle" className="text-xs fill-blue-900">☽</text>
          </>
        )}
        
        {aspect.angle === 180 && (
          <>
            <circle cx="100" cy="180" r="8" fill="currentColor" className="text-blue-500" />
            <text x="100" y="185" textAnchor="middle" className="text-xs fill-blue-900">☽</text>
            <line x1="100" y1="28" x2="100" y2="172" stroke="currentColor" strokeWidth="2" className="text-red-500" />
          </>
        )}
        
        {aspect.angle === 120 && (
          <>
            <circle cx="169" cy="140" r="8" fill="currentColor" className="text-blue-500" />
            <text x="169" y="145" textAnchor="middle" className="text-xs fill-blue-900">☽</text>
            <line x1="106" y1="26" x2="163" y2="134" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
          </>
        )}
        
        {aspect.angle === 90 && (
          <>
            <circle cx="180" cy="100" r="8" fill="currentColor" className="text-blue-500" />
            <text x="180" y="105" textAnchor="middle" className="text-xs fill-blue-900">☽</text>
            <line x1="108" y1="20" x2="172" y2="100" stroke="currentColor" strokeWidth="2" className="text-orange-500" />
          </>
        )}
        
        {aspect.angle === 60 && (
          <>
            <circle cx="154" cy="56" r="8" fill="currentColor" className="text-blue-500" />
            <text x="154" y="61" textAnchor="middle" className="text-xs fill-blue-900">☽</text>
            <line x1="107" y1="24" x2="147" y2="52" stroke="currentColor" strokeWidth="2" className="text-green-500" />
          </>
        )}
        
        {/* Angle arc */}
        <text x="100" y="100" textAnchor="middle" className="text-2xl fill-gray-600">{aspect.angle}°</text>
      </svg>
    </div>
  );
};

export const AspectsGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-center leading-relaxed">
            اتصالات (Aspects) زوایای خاصی هستند که سیارات با یکدیگر تشکیل می‌دهند.
            این زوایا نشان می‌دهند که انرژی سیارات چگونه با هم تعامل دارند - به صورت هماهنگ، چالش‌برانگیز یا خنثی.
          </p>
        </CardContent>
      </Card>

      {/* Aspect Types Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="pt-6 text-center">
            <ThumbsUp className="mx-auto mb-2 text-blue-500" size={32} />
            <h3 className="font-bold text-blue-900">هماهنگ</h3>
            <p className="text-xs text-muted-foreground mt-1">مثلث، شش‌گوش</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto mb-2 text-orange-500" size={32} />
            <h3 className="font-bold text-orange-900">چالش‌برانگیز</h3>
            <p className="text-xs text-muted-foreground mt-1">مقابله، چهارگوش</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="pt-6 text-center">
            <Circle className="mx-auto mb-2 text-yellow-500" size={32} />
            <h3 className="font-bold text-yellow-900">خنثی</h3>
            <p className="text-xs text-muted-foreground mt-1">اتصال</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Aspects */}
      {ASPECTS.map((aspect, index) => (
        <motion.div
          key={aspect.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-2">
            <CardHeader className={`bg-gradient-to-r ${aspect.color} text-white`}>
              <CardTitle className="flex items-center gap-4">
                {aspect.icon}
                <div>
                  <div className="text-2xl">{aspect.name}</div>
                  <div className="text-sm opacity-90">{aspect.angle}° - {aspect.symbol}</div>
                </div>
                <div className="mr-auto">
                  {aspect.nature === 'harmonious' && (
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-sm">هماهنگ</span>
                  )}
                  {aspect.nature === 'challenging' && (
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm">چالش‌برانگیز</span>
                  )}
                  {aspect.nature === 'neutral' && (
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm">خنثی</span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">توضیح:</h4>
                  <p className="text-sm text-muted-foreground mb-4">{aspect.description}</p>
                  
                  <h4 className="font-bold mb-3">تفسیر:</h4>
                  <p className="text-sm leading-relaxed">{aspect.interpretation}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-center">نمودار:</h4>
                  <AspectExample aspect={aspect} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">زاویه</div>
                  <div className="text-2xl font-bold">{aspect.angle}°</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">سمبل</div>
                  <div className="text-4xl font-bold">{aspect.symbol}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">نوع</div>
                  <div className="text-lg font-bold">
                    {aspect.nature === 'harmonious' && 'هماهنگ'}
                    {aspect.nature === 'challenging' && 'چالش'}
                    {aspect.nature === 'neutral' && 'خنثی'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Orbs Explanation */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle>فاصله مجاز (Orbs)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed mb-4">
            اتصالات دقیقاً در زاویه مشخص رخ نمی‌دهند. یک فاصله مجاز (orb) وجود دارد که اتصال هنوز معتبر است:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-bold mb-2">اتصالات اصلی:</h5>
              <ul className="text-sm space-y-1">
                <li>• اتصال، مقابله، مثلث، چهارگوش: ±8 درجه</li>
                <li>• شش‌گوش: ±6 درجه</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-bold mb-2">مثال:</h5>
              <p className="text-sm">
                اگر خورشید در 10 درجه حمل و ماه در 15 درجه حمل باشد،
                یک اتصال (0°±5°) دارند چون فاصله آنها 5 درجه است.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
