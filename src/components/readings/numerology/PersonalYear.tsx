import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PERSONAL_YEAR_MEANINGS } from '@/hooks/useAdvancedNumerology';
import { Calendar, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface PersonalYearProps {
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

const MONTH_NAMES = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const MONTHLY_GUIDANCE: Record<number, string> = {
  1: "ماه شروع و ابتکار - زمان آغاز پروژه‌های جدید",
  2: "ماه همکاری - تمرکز بر روابط و شراکت‌ها",
  3: "ماه خلاقیت - بیان خود و لذت بردن از زندگی",
  4: "ماه کار سخت - ساختن پایه و برنامه‌ریزی",
  5: "ماه تغییر - انعطاف و پذیرش فرصت‌های جدید",
  6: "ماه مسئولیت - توجه به خانواده و عزیزان",
  7: "ماه تأمل - زمان یادگیری و معنویت",
  8: "ماه موفقیت - تمرکز بر اهداف مالی و شغلی",
  9: "ماه پایان - رها کردن و آماده شدن برای چرخه جدید"
};

const DAILY_ENERGY: Record<number, string> = {
  1: "انرژی روز: رهبری و اقدام",
  2: "انرژی روز: صبر و همکاری",
  3: "انرژی روز: خلاقیت و ارتباط",
  4: "انرژی روز: نظم و سازماندهی",
  5: "انرژی روز: تغییر و انعطاف",
  6: "انرژی روز: خدمت و مسئولیت",
  7: "انرژی روز: تحقیق و تأمل",
  8: "انرژی روز: قدرت و دستاورد",
  9: "انرژی روز: تکمیل و رهایی"
};

export const PersonalYear: React.FC<PersonalYearProps> = ({ personalYear, personalMonth, personalDay }) => {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  return (
    <div className="space-y-4">
      {/* Personal Year */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar size={24} />
              سال شخصی شما: {personalYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {personalYear}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <p className="text-lg text-center text-purple-900 leading-relaxed">
                {PERSONAL_YEAR_MEANINGS[personalYear]}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-purple-100 rounded-lg">
                <div className="text-sm text-purple-700 mb-1">تمرکز سال</div>
                <div className="font-bold text-purple-900">
                  {personalYear === 1 && "شروع‌های جدید"}
                  {personalYear === 2 && "روابط"}
                  {personalYear === 3 && "خلاقیت"}
                  {personalYear === 4 && "پایه‌گذاری"}
                  {personalYear === 5 && "آزادی"}
                  {personalYear === 6 && "خانواده"}
                  {personalYear === 7 && "معنویت"}
                  {personalYear === 8 && "موفقیت"}
                  {personalYear === 9 && "تکمیل"}
                </div>
              </div>
              <div className="text-center p-3 bg-indigo-100 rounded-lg">
                <div className="text-sm text-indigo-700 mb-1">انرژی کلی</div>
                <div className="font-bold text-indigo-900">
                  {[1, 3, 5, 8].includes(personalYear) ? "پویا و فعال" : "آرام و تأملی"}
                </div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="text-sm text-blue-700 mb-1">فرصت اصلی</div>
                <div className="font-bold text-blue-900">
                  {personalYear <= 3 && "رشد شخصی"}
                  {personalYear >= 4 && personalYear <= 6 && "ثبات"}
                  {personalYear >= 7 && "تحول معنوی"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Month */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              ماه شخصی فعلی ({MONTH_NAMES[currentMonth]}): {personalMonth}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="text-5xl font-bold text-blue-600">{personalMonth}</div>
            </div>
            <p className="text-center text-muted-foreground mb-3">
              {MONTHLY_GUIDANCE[personalMonth]}
            </p>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                این ماه برای شما زمان {MONTHLY_GUIDANCE[personalMonth].split(' - ')[0]} است
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
            <CardTitle className="flex items-center gap-2">
              <Star size={20} />
              روز شخصی امروز ({currentDay} {MONTH_NAMES[currentMonth]}): {personalDay}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="text-4xl font-bold text-green-600">{personalDay}</div>
            </div>
            <p className="text-center text-muted-foreground mb-3">
              {DAILY_ENERGY[personalDay]}
            </p>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 text-center font-medium">
                امروز روز مناسبی برای {
                  personalDay === 1 ? "شروع کارهای جدید" :
                  personalDay === 2 ? "همکاری با دیگران" :
                  personalDay === 3 ? "بیان خلاقانه" :
                  personalDay === 4 ? "سازماندهی" :
                  personalDay === 5 ? "تغییرات مثبت" :
                  personalDay === 6 ? "کمک به دیگران" :
                  personalDay === 7 ? "تفکر و برنامه‌ریزی" :
                  personalDay === 8 ? "اقدامات مهم" :
                  "تکمیل کارها"
                } است
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
