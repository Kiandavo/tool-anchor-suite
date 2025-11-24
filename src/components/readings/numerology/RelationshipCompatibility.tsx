import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart, Users, ThumbsUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompatibilityResult {
  score: number;
  level: 'عالی' | 'خوب' | 'متوسط' | 'چالش‌برانگیز';
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

const COMPATIBILITY_MATRIX: Record<string, CompatibilityResult> = {
  '1-1': {
    score: 70,
    level: 'خوب',
    description: 'دو رهبر قوی - رقابت و همکاری',
    strengths: ['انرژی بالا', 'استقلال', 'انگیزه مشترک'],
    challenges: ['رقابت برای رهبری', 'سرسختی'],
    advice: 'یاد بگیرید به نوبت رهبری کنید و از قدرت یکدیگر حمایت کنید'
  },
  '1-2': {
    score: 85,
    level: 'عالی',
    description: 'رهبر و حامی - تعادل عالی',
    strengths: ['تکمیل‌کننده', 'تعادل قدرت', 'حمایت متقابل'],
    challenges: ['تفاوت در سبک تصمیم‌گیری'],
    advice: '1 رهبری کند و 2 حمایت کند - هر دو نقش مهم هستند'
  },
  '1-3': {
    score: 90,
    level: 'عالی',
    description: 'قدرت و خلاقیت - ترکیب پویا',
    strengths: ['هیجان‌انگیز', 'خلاق', 'انرژی مثبت'],
    challenges: ['پراکندگی 3', 'جدیت بیش از حد 1'],
    advice: '1 ساختار دهد و 3 خلاقیت آورد'
  },
  '2-2': {
    score: 75,
    level: 'خوب',
    description: 'دو روح حساس - هماهنگی عمیق',
    strengths: ['درک عمیق', 'صلح‌آمیز', 'حمایت‌گر'],
    challenges: ['تصمیم‌گیری سخت', 'حساسیت زیاد'],
    advice: 'یکی باید قاطع‌تر باشد تا رابطه پیش برود'
  },
  '2-3': {
    score: 80,
    level: 'خوب',
    description: 'دیپلمات و هنرمند - رابطه شاد',
    strengths: ['ارتباط خوب', 'شادی', 'خلاقیت'],
    challenges: ['2 جدی‌تر از 3'],
    advice: '2 از شوخ‌طبعی 3 لذت ببرد و 3 احساسات 2 را درک کند'
  },
  '3-3': {
    score: 95,
    level: 'عالی',
    description: 'دو روح خلاق - شادی و هیجان',
    strengths: ['سرگرم‌کننده', 'خلاق', 'اجتماعی'],
    challenges: ['مسئولیت‌ناپذیری', 'پراکندگی'],
    advice: 'کمی جدیت و برنامه‌ریزی اضافه کنید'
  },
  '4-4': {
    score: 70,
    level: 'خوب',
    description: 'دو سنگ محکم - ثبات و امنیت',
    strengths: ['قابل اعتماد', 'امن', 'سخت‌کوش'],
    challenges: ['سفت و سخت', 'کمبود هیجان'],
    advice: 'کمی خود را شل کنید و از زندگی لذت ببرید'
  },
  '5-5': {
    score: 85,
    level: 'عالی',
    description: 'دو ماجراجو - هیجان و آزادی',
    strengths: ['پرانرژی', 'ماجراجو', 'آزادی‌خواه'],
    challenges: ['بی‌ثباتی', 'کمبود تعهد'],
    advice: 'کمی ثبات و تعهد به رابطه اضافه کنید'
  },
  '6-6': {
    score: 90,
    level: 'عالی',
    description: 'دو نگهبان - عشق و مراقبت',
    strengths: ['مهربان', 'مسئول', 'خانواده‌دوست'],
    challenges: ['مداخله زیاد', 'فراموش کردن خود'],
    advice: 'مراقب باشید خودتان را فراموش نکنید'
  },
  '7-7': {
    score: 75,
    level: 'خوب',
    description: 'دو جستجوگر - عمق معنوی',
    strengths: ['عمیق', 'معنوی', 'فکری'],
    challenges: ['انزوا', 'کمبود گرما'],
    advice: 'بیشتر احساسات را ابراز کنید'
  },
  '8-8': {
    score: 70,
    level: 'متوسط',
    description: 'دو قدرتمند - رقابت برای کنترل',
    strengths: ['موفق', 'قدرتمند', 'جاه‌طلب'],
    challenges: ['رقابت شدید', 'کار بیش از عشق'],
    advice: 'تعادل بین کار و عشق پیدا کنید'
  },
  '9-9': {
    score: 80,
    level: 'خوب',
    description: 'دو انسان‌دوست - عشق جهانی',
    strengths: ['مهربان', 'فداکار', 'ایده‌آل‌گرا'],
    challenges: ['ایده‌آل‌گرایی بیش از حد'],
    advice: 'کمی واقع‌بین‌تر باشید و به خودتان برسید'
  }
};

export const RelationshipCompatibility: React.FC = () => {
  const [person1Name, setPerson1Name] = useState('');
  const [person1LifePath, setPerson1LifePath] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2LifePath, setPerson2LifePath] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const calculateCompatibility = () => {
    const num1 = parseInt(person1LifePath);
    const num2 = parseInt(person2LifePath);

    if (!num1 || !num2 || num1 < 1 || num1 > 9 || num2 < 1 || num2 > 9) {
      return;
    }

    const key = `${Math.min(num1, num2)}-${Math.max(num1, num2)}`;
    const compatibility = COMPATIBILITY_MATRIX[key] || {
      score: 70,
      level: 'متوسط' as const,
      description: 'رابطه قابل قبول با تلاش',
      strengths: ['یادگیری از یکدیگر'],
      challenges: ['تفاوت‌های اساسی'],
      advice: 'صبر و درک متقابل کلیدی است'
    };

    setResult(compatibility);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-400 to-emerald-400';
    if (score >= 70) return 'from-blue-400 to-cyan-400';
    if (score >= 50) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-400';
  };

  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100">
        <CardTitle className="flex items-center gap-2">
          <Heart size={20} />
          سازگاری رابطه
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>شخص اول</Label>
              <Input
                placeholder="نام"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
              />
              <Input
                type="number"
                min="1"
                max="9"
                placeholder="عدد مسیر زندگی (1-9)"
                value={person1LifePath}
                onChange={(e) => setPerson1LifePath(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Label>شخص دوم</Label>
              <Input
                placeholder="نام"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
              />
              <Input
                type="number"
                min="1"
                max="9"
                placeholder="عدد مسیر زندگی (1-9)"
                value={person2LifePath}
                onChange={(e) => setPerson2LifePath(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={calculateCompatibility}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            <Users size={16} className="ml-2" />
            محاسبه سازگاری
          </Button>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Score */}
              <div className={`bg-gradient-to-r ${getScoreColor(result.score)} p-6 rounded-lg text-white text-center`}>
                <div className="text-sm mb-2">امتیاز سازگاری</div>
                <div className="text-6xl font-bold mb-2">{result.score}%</div>
                <div className="text-xl font-semibold">{result.level}</div>
                <p className="mt-3 text-white/90">{result.description}</p>
              </div>

              {/* Strengths */}
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-900">
                    <ThumbsUp size={18} />
                    نقاط قوت
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-900">
                    <AlertTriangle size={18} />
                    چالش‌ها
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {result.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">!</span>
                        <span className="text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Advice */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Heart size={16} />
                  توصیه
                </h4>
                <p className="text-sm text-blue-800">{result.advice}</p>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
