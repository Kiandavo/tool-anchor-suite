
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, ChevronDown, ChevronUp, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";

type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type Celebration = {
  name: string;
  date: string;
  description: string;
  location?: string;
  rituals?: string[];
  season: Season;
};

const celebrations: Celebration[] = [
  {
    name: "نوروز",
    date: "۱ فروردین",
    description: "جشن باستانی آغاز سال نو و بهار که با آیین‌هایی چون خانه‌تکانی، سفره هفت‌سین، دید و بازدید و سیزده به در همراه است.",
    rituals: ["خانه تکانی", "چیدن سفره هفت‌سین", "تحویل سال", "دید و بازدید", "سیزده به در"],
    season: "spring"
  },
  {
    name: "چهارشنبه‌سوری",
    date: "آخرین سه‌شنبه سال",
    description: "جشن آتش که در شب آخرین سه‌شنبه سال برگزار می‌شود و مردم با پریدن از روی آتش، سرخی آتش را به خود و زردی خود را به آتش می‌دهند.",
    rituals: ["روشن کردن آتش", "پریدن از روی آتش", "قاشق‌زنی", "فال گوش ایستادن"],
    season: "winter"
  },
  {
    name: "شب یلدا",
    date: "۳۰ آذر",
    description: "طولانی‌ترین شب سال که ایرانیان با دورهمی خانوادگی، خوردن هندوانه و انار، خواندن شعر و حافظ‌خوانی جشن می‌گیرند.",
    rituals: ["دورهمی خانوادگی", "خوردن هندوانه و انار", "حافظ‌خوانی", "قصه‌گویی بزرگان"],
    season: "autumn"
  },
  {
    name: "سیزده به در",
    date: "۱۳ فروردین",
    description: "روز طبیعت که مردم به دامان طبیعت می‌روند و با تفریح و گردش، سال نو را جشن می‌گیرند.",
    location: "پارک‌ها و طبیعت",
    season: "spring"
  },
  {
    name: "مهرگان",
    date: "۱۶ مهر",
    description: "جشن پاییزی ایرانیان باستان که به مناسبت پاسداشت مهر (خورشید) برگزار می‌شود. این جشن از مهم‌ترین جشن‌های ایران باستان بوده است.",
    rituals: ["پوشیدن لباس‌های نو", "پختن آش مهرگان", "برپایی آتش"],
    season: "autumn"
  },
  {
    name: "تیرگان",
    date: "۱۳ تیر",
    description: "جشن آب‌پاشان که به مناسبت بارش باران و پایان خشکسالی برگزار می‌شود.",
    rituals: ["آب‌پاشی", "بستن نخ به مچ دست", "آرزو کردن"],
    season: "summer"
  },
  {
    name: "سده",
    date: "۱۰ بهمن",
    description: "جشن آتش در میانه زمستان که به مناسبت پیروزی گرما بر سرما و روشنایی بر تاریکی برگزار می‌شود.",
    rituals: ["افروختن آتش بزرگ", "خواندن سرودهای کهن"],
    season: "winter"
  },
  {
    name: "جشن اسفندگان",
    date: "۵ اسفند",
    description: "روز بزرگداشت زمین و زنان که در دوران باستان برگزار می‌شده و امروزه نیز در برخی مناطق احیا شده است.",
    season: "winter"
  }
];

const seasonColors: Record<Season, {bg: string, text: string, border: string}> = {
  spring: {bg: "bg-gradient-to-br from-green-50 to-emerald-100", text: "text-emerald-700", border: "border-emerald-200"},
  summer: {bg: "bg-gradient-to-br from-amber-50 to-yellow-100", text: "text-amber-700", border: "border-amber-200"},
  autumn: {bg: "bg-gradient-to-br from-orange-50 to-amber-100", text: "text-orange-700", border: "border-orange-200"},
  winter: {bg: "bg-gradient-to-br from-blue-50 to-cyan-100", text: "text-blue-700", border: "border-blue-200"},
};

const PersianHolidays = () => {
  const [expandedCelebration, setExpandedCelebration] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Season>('spring');
  
  const toggleCelebration = (name: string) => {
    setExpandedCelebration(expandedCelebration === name ? null : name);
  };

  const seasonalCelebrations = celebrations.filter(celebration => celebration.season === activeSection);

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تعطیلات و جشن‌های سنتی ایرانی</h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          تقویم جامع مناسبت‌ها، جشن‌ها و آیین‌های سنتی ایران، آشنایی با تاریخچه و آداب و رسوم جشن‌های باستانی
        </p>
      </header>
      
      {/* Season selector - Apple style segmented control */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-xl p-1 flex justify-between max-w-lg mx-auto neo-glass">
          {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((season) => (
            <button
              key={season}
              onClick={() => setActiveSection(season)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === season 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {season === 'spring' && 'بهار'}
              {season === 'summer' && 'تابستان'}
              {season === 'autumn' && 'پاییز'}
              {season === 'winter' && 'زمستان'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Celebrations grid with Apple style cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasonalCelebrations.map((celebration, index) => {
          const seasonStyle = seasonColors[celebration.season];
          const isExpanded = expandedCelebration === celebration.name;
          
          return (
            <motion.div
              key={celebration.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`card-apple-gradient rounded-3xl border ${seasonStyle.border} overflow-hidden`}
            >
              {/* Card header */}
              <div className={`p-6 ${seasonStyle.bg}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${seasonStyle.text}`}>{celebration.name}</h3>
                    <div className="flex items-center mt-1 text-gray-500 text-sm">
                      <Clock size={14} className="ml-1" />
                      {celebration.date}
                      
                      {celebration.location && (
                        <span className="mr-3 flex items-center">
                          <MapPin size={14} className="ml-1" />
                          {celebration.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => toggleCelebration(celebration.name)}
                    variant="apple-outline"
                    size="sm"
                    className="rounded-full hover:shadow-sm"
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {isExpanded ? 'بستن' : 'بیشتر'}
                  </Button>
                </div>
              </div>
              
              {/* Card content */}
              <Collapsible open={isExpanded} className="transition-all duration-300">
                <CollapsibleContent className="p-5 pt-0">
                  <div className="pt-5 border-t border-gray-100">
                    <p className="text-gray-700 mb-4 leading-relaxed">{celebration.description}</p>
                    
                    {celebration.rituals && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">آیین‌ها و مراسم:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {celebration.rituals.map((ritual, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-3 py-1 rounded-full ${seasonStyle.bg} ${seasonStyle.text}`}
                            >
                              {ritual}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          );
        })}
      </div>
      
      {/* Calendar visualization */}
      <div className="my-12">
        <Card className="neo-glass shadow-sm border-white/50">
          <CardHeader>
            <div className="flex items-center">
              <CalendarDays className="ml-2 text-primary" size={20} />
              <h2 className="text-xl font-bold">تقویم جشن‌های سنتی در طول سال</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-12 gap-2">
                  {/* Month headers */}
                  {['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].map((month, index) => (
                    <div key={month} className="p-2 text-center">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        index < 3 ? seasonColors.spring.bg : 
                        index < 6 ? seasonColors.summer.bg :
                        index < 9 ? seasonColors.autumn.bg : 
                        seasonColors.winter.bg
                      }`}>
                        {month}
                      </span>
                    </div>
                  ))}
                  
                  {/* Month cells with events */}
                  {[...Array(12)].map((_, monthIndex) => {
                    // Find celebrations for this month
                    const monthCelebrations = celebrations.filter(cel => {
                      const monthName = cel.date.split(' ')[1];
                      const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                                          'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                      return monthNames.indexOf(monthName) === monthIndex;
                    });
                    
                    return (
                      <div key={monthIndex} className="border-t border-dashed border-gray-200 p-2 min-h-[80px] flex flex-col items-center justify-center">
                        {monthCelebrations.map(cel => (
                          <div 
                            key={cel.name}
                            className={`text-xs ${seasonColors[cel.season].text} mb-1 p-1 rounded w-full text-center`}
                          >
                            {cel.name}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mb-8 mt-12">
        <Card className="neo-glass bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-8">
            <h2 className="text-lg font-bold text-gray-700 mb-3">اهمیت جشن‌های سنتی در فرهنگ ایرانی</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              جشن‌های سنتی و آیین‌های باستانی بخش جدایی‌ناپذیر از هویت فرهنگی و تاریخی ایرانیان هستند.
              این جشن‌ها که اغلب ریشه در تاریخ چند هزار ساله ایران دارند، نمادی از پیوند عمیق مردم با طبیعت، 
              فصل‌ها و پدیده‌های آسمانی بوده‌اند. همچنین، آنها بستری برای تقویت روابط اجتماعی، انتقال ارزش‌های فرهنگی
              و حفظ سنت‌های کهن از نسلی به نسل دیگر هستند.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersianHolidays;
