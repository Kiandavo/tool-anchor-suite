import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Moon, Sunset, Clock } from 'lucide-react';
import { toPersianNumber, getPersianMonthName, getUpcomingPersianHolidays } from '@/utils/persianUtils';
import { getCurrentDates, formatPersianDate } from '@/utils/calendar/persianCalendar';

export function SeasonalToolsSection() {
  const [holidays, setHolidays] = useState<ReturnType<typeof getUpcomingPersianHolidays>>([]);
  const [currentPersianDate, setCurrentPersianDate] = useState<string>('');

  useEffect(() => {
    setHolidays(getUpcomingPersianHolidays());
    
    // Get current Persian date using proper conversion
    const { persian } = getCurrentDates();
    setCurrentPersianDate(formatPersianDate(persian));
  }, []);

  const seasonalTools = [
    {
      id: 'nowruz-countdown',
      title: 'شمارش معکوس نوروز ۱۴۰۵',
      description: 'محاسبه دقیق روزها، ساعت‌ها و دقیقه‌های مانده تا تحویل سال نو',
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
      keywords: ['نوروز', 'تحویل سال', 'سال نو ایرانی', 'شمارش معکوس']
    },
    {
      id: 'yalda-calculator',
      title: 'محاسبه‌گر شب یلدا',
      description: 'تاریخ دقیق شب یلدا و طولانی‌ترین شب سال را محاسبه کنید',
      icon: Moon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      keywords: ['شب یلدا', 'شب چله', 'طولانی‌ترین شب']
    },
    {
      id: 'ramadan-times',
      title: 'اوقات شرعی ماه رمضان',
      description: 'جدول کامل اوقات شرعی، سحر، افطار و اذان مغرب',
      icon: Sunset,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      keywords: ['رمضان', 'اوقات شرعی', 'افطار', 'سحر']
    },
    {
      id: 'persian-calendar',
      title: 'تقویم کامل فارسی',
      description: 'تقویم شمسی با تعطیلات رسمی، مناسبت‌ها و رویدادهای ملی',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      keywords: ['تقویم فارسی', 'تعطیلات رسمی', 'مناسبت‌ها']
    }
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-3">
          ابزارهای فصلی و فرهنگی
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          ابزارهای ویژه فرهنگ ایرانی
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
          محاسبه‌گرها و ابزارهای تخصصی برای مناسبت‌های ایرانی و اسلامی
        </p>
        <p className="text-sm text-muted-foreground">
          امروز: {currentPersianDate}
        </p>
      </div>

      {/* Upcoming Holidays Alert */}
      {holidays.length > 0 && (
        <Card className="mb-6 border-primary/50 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  مناسبت‌های پیش رو
                </h3>
                <div className="flex flex-wrap gap-2">
                  {holidays.slice(0, 2).map((holiday, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {holiday.name}: {toPersianNumber(holiday.daysUntil)} روز دیگر
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seasonal Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasonalTools.map((tool) => (
          <Card 
            key={tool.id}
            className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className={`p-3 rounded-lg ${tool.bgColor} w-fit mb-3`}>
                <tool.icon className={`w-6 h-6 ${tool.color}`} />
              </div>
              <CardTitle className="text-lg leading-tight">
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {tool.keywords.slice(0, 2).map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-8 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          چرا از ابزارهای فصلی لنگر استفاده کنیم؟
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-semibold text-foreground mb-2">ویژگی‌های منحصر به فرد:</h4>
            <ul className="space-y-1 pr-4">
              <li>• محاسبات دقیق بر اساس تقویم شمسی</li>
              <li>• به‌روزرسانی خودکار اطلاعات</li>
              <li>• سازگار با فرهنگ و آداب ایرانی</li>
              <li>• رایگان و بدون نیاز به ثبت‌نام</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">کاربردها:</h4>
            <ul className="space-y-1 pr-4">
              <li>• برنامه‌ریزی برای مناسبت‌های خاص</li>
              <li>• اطلاع از تعطیلات رسمی</li>
              <li>• محاسبه اوقات شرعی برای روزه‌داری</li>
              <li>• آگاهی از رویدادهای فرهنگی</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
