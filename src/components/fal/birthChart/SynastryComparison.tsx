import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SynastryResult {
  overallScore: number;
  sunMoonScore: number;
  venusMarScore: number;
  ascendantScore: number;
  elementBalance: string;
  strengths: string[];
  challenges: string[];
  advice: string[];
}

interface SynastryComparisonProps {
  person1Data?: {
    name: string;
    sunSign: string;
    moonSign: string;
    ascendant: string;
  };
}

export const SynastryComparison: React.FC<SynastryComparisonProps> = ({ person1Data }) => {
  const [person2Name, setPerson2Name] = useState('');
  const [person2BirthDate, setPerson2BirthDate] = useState('');
  const [person2BirthTime, setPerson2BirthTime] = useState('');
  const [person2BirthPlace, setPerson2BirthPlace] = useState('');
  const [result, setResult] = useState<SynastryResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSynastry = () => {
    if (!person2Name || !person2BirthDate) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation
    setTimeout(() => {
      const mockResult: SynastryResult = {
        overallScore: 75,
        sunMoonScore: 80,
        venusMarScore: 70,
        ascendantScore: 75,
        elementBalance: 'متعادل',
        strengths: [
          'ارتباط عاطفی قوی بین ماه و خورشید',
          'هماهنگی خوب در ارزش‌ها و اهداف',
          'درک متقابل و همدلی بالا',
          'تعادل بین انرژی‌های مکمل'
        ],
        challenges: [
          'ممکن است در سبک ابراز احساسات تفاوت داشته باشید',
          'نیاز به کار بر روی ارتباطات در مواقع تنش',
          'توجه به نیازهای استقلال یکدیگر'
        ],
        advice: [
          'زمان کیفی با هم بگذرانید و به یکدیگر گوش دهید',
          'تفاوت‌ها را به عنوان فرصت یادگیری ببینید',
          'احترام به فضای شخصی یکدیگر را حفظ کنید',
          'در مورد انتظارات و نیازها صادق باشید'
        ]
      };

      setResult(mockResult);
      setIsCalculating(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-400';
    if (score >= 60) return 'from-blue-400 to-cyan-400';
    if (score >= 40) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'عالی';
    if (score >= 60) return 'خوب';
    if (score >= 40) return 'متوسط';
    return 'چالش‌برانگیز';
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="border-2 border-pink-200">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            اطلاعات شریک دوم
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {person1Data && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 mb-4">
                <p className="text-sm font-medium text-purple-900">
                  شخص اول: {person1Data.name}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  خورشید: {person1Data.sunSign} | ماه: {person1Data.moonSign} | طالع: {person1Data.ascendant}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="person2-name">نام شریک دوم</Label>
                <Input
                  id="person2-name"
                  value={person2Name}
                  onChange={(e) => setPerson2Name(e.target.value)}
                  placeholder="نام کامل"
                />
              </div>
              <div>
                <Label htmlFor="person2-date">تاریخ تولد</Label>
                <Input
                  id="person2-date"
                  type="date"
                  value={person2BirthDate}
                  onChange={(e) => setPerson2BirthDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="person2-time">ساعت تولد (اختیاری)</Label>
                <Input
                  id="person2-time"
                  type="time"
                  value={person2BirthTime}
                  onChange={(e) => setPerson2BirthTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="person2-place">محل تولد (اختیاری)</Label>
                <Input
                  id="person2-place"
                  value={person2BirthPlace}
                  onChange={(e) => setPerson2BirthPlace(e.target.value)}
                  placeholder="شهر"
                />
              </div>
            </div>

            <Button
              onClick={calculateSynastry}
              disabled={isCalculating || !person2Name || !person2BirthDate}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              <Heart size={16} className="ml-2" />
              {isCalculating ? 'در حال محاسبه...' : 'محاسبه سازگاری'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Overall Score */}
          <Card className="border-2">
            <CardHeader className={`bg-gradient-to-r ${getScoreColor(result.overallScore)} text-white`}>
              <CardTitle className="text-center">
                امتیاز کلی سازگاری
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-7xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  {result.overallScore}%
                </div>
                <div className="text-2xl font-semibold text-gray-700 mb-4">
                  {getScoreLabel(result.overallScore)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">خورشید-ماه</div>
                    <div className="text-2xl font-bold text-yellow-700">{result.sunMoonScore}%</div>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">زهره-مریخ</div>
                    <div className="text-2xl font-bold text-pink-700">{result.venusMarScore}%</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">طالع</div>
                    <div className="text-2xl font-bold text-purple-700">{result.ascendantScore}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Element Balance */}
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp size={18} />
                تعادل عناصر
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <p className="text-lg font-semibold text-blue-900">{result.elementBalance}</p>
                <p className="text-sm text-blue-700 mt-2">
                  ترکیب عناصر شما تعادل خوبی دارد و می‌تواند به رشد متقابل کمک کند
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg flex items-center gap-2 text-green-900">
                <Heart size={18} />
                نقاط قوت رابطه
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-2 bg-green-50 rounded"
                  >
                    <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                    <span className="text-sm text-green-900">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-900">
                <AlertCircle size={18} />
                چالش‌های بالقوه
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {result.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-2 bg-orange-50 rounded"
                  >
                    <span className="text-orange-600 mt-1 flex-shrink-0">!</span>
                    <span className="text-sm text-orange-900">{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Advice */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
                <Users size={18} />
                توصیه‌ها برای رابطه بهتر
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {result.advice.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-2 bg-purple-50 rounded"
                  >
                    <span className="text-purple-600 mt-1 flex-shrink-0">→</span>
                    <span className="text-sm text-purple-900">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
