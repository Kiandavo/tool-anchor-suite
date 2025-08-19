import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Crown, Book } from "lucide-react";
import { historicalPeriods, historicalEvents, historicalFigures, dynasties } from '@/data/historical-timeline-expanded';

const HistoricalTimeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const historicalPeriods = [
    {
      id: "ancient",
      name: "دوران باستان",
      timeRange: "3000 ق.م - 651 م",
      color: "bg-blue-500",
      events: [
        { year: "3000 ق.م", title: "تمدن عیلام", description: "شکل‌گیری یکی از قدیمی‌ترین تمدن‌های ایران در خوزستان" },
        { year: "550 ق.م", title: "امپراتوری هخامنشی", description: "کوروش بزرگ امپراتوری هخامنشی را بنیان گذاشت" },
        { year: "331 ق.م", title: "حمله اسکندر", description: "اسکندر مقدونی امپراتوری هخامنشی را شکست داد" },
        { year: "247 ق.م", title: "امپراتوری اشکانی", description: "اشکانیان قدرت را در ایران به دست گرفتند" },
        { year: "224 م", title: "امپراتوری ساسانی", description: "اردشیر بابکان امپراتوری ساسانی را تأسیس کرد" }
      ]
    },
    {
      id: "islamic",
      name: "دوران اسلامی",
      timeRange: "651 - 1501 م",
      color: "bg-green-500",
      events: [
        { year: "651 م", title: "فتح ایران", description: "عرب‌های مسلمان ایران را فتح کردند" },
        { year: "750 م", title: "خلافت عباسی", description: "عباسیان از ایرانیان برای اداره امپراتوری استفاده کردند" },
        { year: "820 م", title: "طاهریان", description: "اولین سلسله مستقل ایرانی پس از اسلام" },
        { year: "1037 م", title: "امپراتوری سلجوقی", description: "سلجوقیان قدرت را در ایران و آناتولی به دست گرفتند" },
        { year: "1220 م", title: "حمله مغول", description: "چنگیزخان و مغولان ایران را ویران کردند" }
      ]
    },
    {
      id: "safavid",
      name: "دوران صفوی تا قاجار",
      timeRange: "1501 - 1925 م",
      color: "bg-purple-500",
      events: [
        { year: "1501 م", title: "سلسله صفوی", description: "شاه اسماعیل صفوی ایران مدرن را بنیان گذاشت" },
        { year: "1588 م", title: "شاه عباس", description: "دوران طلایی صفویان و ساخت اصفهان" },
        { year: "1736 م", title: "نادرشاه افشار", description: "نادرشاه امپراتوری بزرگی در آسیا تشکیل داد" },
        { year: "1794 م", title: "سلسله قاجار", description: "آغاز حکومت قاجارها و تجدید وحدت ایران" },
        { year: "1906 م", title: "انقلاب مشروطه", description: "مردم ایران خواستار مشروطیت شدند" }
      ]
    },
    {
      id: "modern",
      name: "دوران مدرن",
      timeRange: "1925 - اکنون",
      color: "bg-red-500",
      events: [
        { year: "1925 م", title: "رضاشاه پهلوی", description: "رضاخان سلسله پهلوی را تأسیس کرد" },
        { year: "1941 م", title: "محمدرضا شاه", description: "محمدرضا پهلوی پادشاه ایران شد" },
        { year: "1979 م", title: "انقلاب اسلامی", description: "پیروزی انقلاب اسلامی تحت رهبری امام خمینی" },
        { year: "1980 م", title: "جنگ ایران و عراق", description: "آغاز جنگ هشت ساله بین ایران و عراق" },
        { year: "1988 م", title: "پایان جنگ", description: "پذیرش قطعنامه 598 و پایان جنگ" }
      ]
    }
  ];

  const importantFigures = [
    { name: "کوروش بزرگ", period: "هخامنشی", achievement: "بنیانگذار امپراتوری هخامنشی و منشور کوروش" },
    { name: "فردوسی", period: "غزنوی", achievement: "سرایش شاهنامه و احیای زبان فارسی" },
    { name: "عمر خیام", period: "سلجوقی", achievement: "ریاضی‌دان، نجوم‌شناس و شاعر بزرگ" },
    { name: "حافظ شیرازی", period: "مظفری", achievement: "استاد غزل فارسی و شاعر بزرگ ایران" },
    { name: "شاه عباس", period: "صفوی", achievement: "شکوفایی هنر و معماری ایرانی در اصفهان" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            خط زمانی تاریخ ایران
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">خط زمانی</TabsTrigger>
              <TabsTrigger value="figures">شخصیت‌های مهم</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              <p className="text-muted-foreground">
                بر روی هر دوره کلیک کنید تا رویدادهای مهم آن دوره را مشاهده کنید.
              </p>
              
              <div className="space-y-4">
                {historicalPeriods.map((period) => (
                  <div key={period.id} className="space-y-2">
                    <Button
                      variant={selectedPeriod === period.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
                    >
                      <div className={`w-4 h-4 rounded-full ${period.color} ml-3`}></div>
                      <div className="text-right flex-1">
                        <div className="font-semibold">{period.name}</div>
                        <div className="text-sm opacity-70">{period.timeRange}</div>
                      </div>
                    </Button>

                    {selectedPeriod === period.id && (
                      <div className="mr-6 space-y-3 border-r-2 border-primary/20 pr-4">
                        {period.events.map((event, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-start gap-3">
                              <Badge variant="outline" className="min-w-fit">
                                {event.year}
                              </Badge>
                              <div>
                                <h4 className="font-medium text-primary">{event.title}</h4>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="figures" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4" />
                شخصیت‌های تاریخی مهم
              </h3>
              
              <div className="grid gap-4">
                {importantFigures.map((figure, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-primary">{figure.name}</h4>
                        <Badge variant="secondary" className="mt-1">{figure.period}</Badge>
                      </div>
                      <Book className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{figure.achievement}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-muted-foreground">به زودی با امکانات بیشتر</h3>
            <p className="text-sm text-muted-foreground">
              نقشه‌های تاریخی، جزئیات بیشتر رویدادها، و تصاویر مربوط به هر دوره به زودی اضافه خواهد شد.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalTimeline;