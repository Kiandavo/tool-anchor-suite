import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
  angle: number;
  strength: 'strong' | 'moderate' | 'weak';
  nature: 'harmonious' | 'challenging' | 'neutral';
  interpretation: string;
}

interface PlanetaryAspectsProps {
  aspects: Aspect[];
}

const ASPECT_INFO: Record<string, { persian: string; color: string; symbol: string }> = {
  conjunction: { persian: 'اقتران (0°)', color: 'text-yellow-600 bg-yellow-50', symbol: '☌' },
  opposition: { persian: 'تقابل (180°)', color: 'text-red-600 bg-red-50', symbol: '☍' },
  trine: { persian: 'مثلث (120°)', color: 'text-blue-600 bg-blue-50', symbol: '△' },
  square: { persian: 'مربع (90°)', color: 'text-orange-600 bg-orange-50', symbol: '□' },
  sextile: { persian: 'شش‌ضلعی (60°)', color: 'text-green-600 bg-green-50', symbol: '⚹' }
};

const ASPECT_MEANINGS: Record<string, string> = {
  conjunction: "انرژی‌های ترکیبی - قدرت یا تنش بسته به سیارات",
  opposition: "کشمکش و تضاد - نیاز به تعادل و یکپارچگی",
  trine: "هماهنگی و جریان آسان - استعداد طبیعی",
  square: "چالش و تنش - انگیزه برای رشد و تغییر",
  sextile: "فرصت و پتانسیل - نیاز به اقدام فعال"
};

export const PlanetaryAspects: React.FC<PlanetaryAspectsProps> = ({ aspects }) => {
  // Group aspects by type
  const groupedAspects = aspects.reduce((acc, aspect) => {
    if (!acc[aspect.type]) {
      acc[aspect.type] = [];
    }
    acc[aspect.type].push(aspect);
    return acc;
  }, {} as Record<string, Aspect[]>);

  const getStrengthIcon = (strength: string) => {
    if (strength === 'strong') return '●●●';
    if (strength === 'moderate') return '●●○';
    return '●○○';
  };

  const getNatureColor = (nature: string) => {
    if (nature === 'harmonious') return 'text-green-600';
    if (nature === 'challenging') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Aspect Summary */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100">
          <CardTitle className="flex items-center gap-2">
            <Link2 size={20} />
            خلاصه اتصالات
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(ASPECT_INFO).map(([type, info]) => (
              <div key={type} className="text-center p-3 rounded-lg border-2 bg-white">
                <div className="text-3xl mb-1">{info.symbol}</div>
                <div className="text-xs text-muted-foreground mb-1">{info.persian}</div>
                <div className="text-2xl font-bold text-purple-600">
                  {groupedAspects[type]?.length || 0}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Aspects */}
      <div className="space-y-4">
        {Object.entries(groupedAspects).map(([type, aspectList], index) => {
          const info = ASPECT_INFO[type];
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2">
                <CardHeader className={info.color}>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{info.symbol}</span>
                      {info.persian}
                    </span>
                    <span className="text-sm font-normal opacity-75">
                      {aspectList.length} اتصال
                    </span>
                  </CardTitle>
                  <p className="text-sm opacity-80 mt-1">
                    {ASPECT_MEANINGS[type]}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {aspectList.map((aspect, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Circle size={8} className={getNatureColor(aspect.nature)} fill="currentColor" />
                            <span className="font-bold">
                              {aspect.planet1} {info.symbol} {aspect.planet2}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">{aspect.angle}°</span>
                            <span className="text-xs text-muted-foreground">
                              {getStrengthIcon(aspect.strength)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {aspect.interpretation}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            aspect.nature === 'harmonious' 
                              ? 'bg-green-100 text-green-700' 
                              : aspect.nature === 'challenging'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {aspect.nature === 'harmonious' ? 'هماهنگ' : aspect.nature === 'challenging' ? 'چالش‌برانگیز' : 'خنثی'}
                          </span>
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                            قدرت: {aspect.strength === 'strong' ? 'قوی' : aspect.strength === 'moderate' ? 'متوسط' : 'ضعیف'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <Card className="border-2 border-gray-200">
        <CardContent className="pt-4">
          <h4 className="font-bold text-sm mb-3">راهنمای اتصالات</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold">قدرت:</span>
              <ul className="mt-1 space-y-1 text-muted-foreground mr-4">
                <li>●●● قوی: تأثیر شدید و مشخص</li>
                <li>●●○ متوسط: تأثیر قابل توجه</li>
                <li>●○○ ضعیف: تأثیر ملایم</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold">ماهیت:</span>
              <ul className="mt-1 space-y-1 text-muted-foreground mr-4">
                <li><Circle size={6} className="text-green-600 inline" fill="currentColor" /> هماهنگ: انرژی مثبت و جریان آسان</li>
                <li><Circle size={6} className="text-red-600 inline" fill="currentColor" /> چالش‌برانگیز: تنش و نیاز به کار</li>
                <li><Circle size={6} className="text-gray-600 inline" fill="currentColor" /> خنثی: بستگی به استفاده دارد</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
