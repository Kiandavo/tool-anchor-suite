import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompleteNumerologyChart } from '@/hooks/useAdvancedNumerology';
import { Hash, Star, Heart, Target, Calendar, Award, Shield, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface NumerologyChartProps {
  data: CompleteNumerologyChart;
}

const NUMBER_MEANINGS: Record<string, Record<number, string>> = {
  lifePath: {
    1: "رهبری، استقلال و نوآوری - شما پیشگام و آغازگر هستید",
    2: "همکاری، دیپلماسی و صلح - شما میانجی و متعادل‌کننده هستید",
    3: "خلاقیت، بیان و شادی - شما هنرمند و الهام‌بخش هستید",
    4: "نظم، سخت‌کوشی و پایداری - شما سازنده و قابل اعتماد هستید",
    5: "آزادی، تغییر و ماجراجویی - شما کاوشگر و انعطاف‌پذیر هستید",
    6: "عشق، مسئولیت و خانواده - شما مراقب و فداکار هستید",
    7: "معنویت، حکمت و تحلیل - شما متفکر و جستجوگر حقیقت هستید",
    8: "قدرت، موفقیت و مدیریت - شما رهبر و دستیابنده به موفقیت مادی هستید",
    9: "انسان‌دوستی، فداکاری و عشق جهانی - شما خدمت‌گزار بشریت هستید",
    11: "روشن‌بینی، شهود و الهام - شما معلم معنوی و الهام‌بخش هستید",
    22: "سازنده بزرگ، متحول‌کننده - شما تبدیل‌کننده رویاها به واقعیت هستید",
    33: "معلم بزرگ، درمانگر - شما خدمت‌کار عشق بی‌قید و شرط هستید"
  },
  expression: {
    1: "استعداد رهبری و ابتکار - توانایی شما در خلق راه‌های جدید است",
    2: "استعداد همکاری و حمایت - توانایی شما در ایجاد هماهنگی است",
    3: "استعداد هنری و ارتباطی - توانایی شما در بیان خلاقانه است",
    4: "استعداد سازماندهی و ساختن - توانایی شما در ایجاد نظم است",
    5: "استعداد سازگاری و نوآوری - توانایی شما در مدیریت تغییر است",
    6: "استعداد مراقبت و خدمت - توانایی شما در ایجاد هماهنگی است",
    7: "استعداد تحلیل و کشف - توانایی شما در درک عمیق است",
    8: "استعداد مدیریت و دستاورد - توانایی شما در رسیدن به موفقیت است",
    9: "استعداد خدمت و الهام - توانایی شما در تاثیرگذاری مثبت است",
    11: "استعداد الهام‌بخشی - توانایی شما در روشنگری است",
    22: "استعداد متحول‌سازی - توانایی شما در ساختن بزرگ است",
    33: "استعداد درمانگری - توانایی شما در بخشیدن عشق است"
  },
  soulUrge: {
    1: "میل درونی به استقلال و رهبری",
    2: "میل درونی به صلح و روابط هماهنگ",
    3: "میل درونی به بیان خلاقانه و شادی",
    4: "میل درونی به ثبات و امنیت",
    5: "میل درونی به آزادی و تجربه",
    6: "میل درونی به عشق و خدمت",
    7: "میل درونی به حقیقت و معنویت",
    8: "میل درونی به موفقیت و قدرت",
    9: "میل درونی به خدمت به بشریت",
    11: "میل درونی به روشنگری معنوی",
    22: "میل درونی به ساختن بزرگ",
    33: "میل درونی به عشق جهانی"
  }
};

export const NumerologyChart: React.FC<NumerologyChartProps> = ({ data }) => {
  const chartItems = [
    {
      icon: Star,
      title: "عدد مسیر زندگی",
      number: data.lifePathNumber,
      meaning: NUMBER_MEANINGS.lifePath[data.lifePathNumber] || "معنای خاص",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: Target,
      title: "عدد بیان (Expression)",
      number: data.expressionNumber,
      meaning: NUMBER_MEANINGS.expression[data.expressionNumber] || "معنای خاص",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Heart,
      title: "عدد میل روحانی (Soul Urge)",
      number: data.soulUrgeNumber,
      meaning: NUMBER_MEANINGS.soulUrge[data.soulUrgeNumber] || "معنای خاص",
      color: "from-pink-400 to-rose-400"
    },
    {
      icon: Shield,
      title: "عدد شخصیت ظاهری",
      number: data.personalityNumber,
      meaning: `شخصیت ظاهری شما به دیگران - طرز برخورد اولیه`,
      color: "from-purple-400 to-indigo-400"
    },
    {
      icon: Calendar,
      title: "عدد روز تولد",
      number: data.birthdayNumber,
      meaning: "استعداد ویژه از زمان تولد",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: Award,
      title: "عدد بلوغ",
      number: data.maturityNumber,
      meaning: "هدف نهایی زندگی شما - ترکیب مسیر و بیان",
      color: "from-amber-400 to-yellow-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Core Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className={`bg-gradient-to-r ${item.color} text-white py-3`}>
                <CardTitle className="text-lg flex items-center gap-2">
                  <item.icon size={20} />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center mb-3">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.number}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {item.meaning}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Numbers */}
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-violet-100 to-purple-100">
          <CardTitle className="flex items-center gap-2">
            <Eye size={20} />
            اعداد تکمیلی
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-violet-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">میل پنهان</div>
              <div className="text-3xl font-bold text-violet-600">{data.hiddenPassion}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">ناخودآگاه</div>
              <div className="text-3xl font-bold text-purple-600">{data.subconscious}</div>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">تعادل</div>
              <div className="text-3xl font-bold text-indigo-600">{data.balanceNumber}</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">سال شخصی</div>
              <div className="text-3xl font-bold text-blue-600">{data.personalYear}</div>
            </div>
          </div>

          {data.karmicDebtNumbers.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <Shield size={16} />
                اعداد بدهی کارمایی
              </h4>
              <p className="text-sm text-red-700">
                اعداد: {data.karmicDebtNumbers.join(', ')} - این اعداد نشان‌دهنده درس‌های مهم زندگی شما هستند
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
