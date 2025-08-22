import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Clock, Users, Crown, Scroll, MapPin } from 'lucide-react';

interface HistoricalPeriod {
  id: string;
  name: string;
  timeRange: string;
  color: string;
  description: string;
  capital?: string;
  notableRulers: string[];
  keyEvents: HistoricalEvent[];
  culturalAchievements: string[];
  territory: string;
}

interface HistoricalEvent {
  year: string;
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  category: 'political' | 'cultural' | 'military' | 'economic';
}

const persianPeriods: HistoricalPeriod[] = [
  {
    id: 'elamite',
    name: 'عیلام',
    timeRange: '3200 - 539 ق.م',
    color: 'from-amber-500 to-orange-500',
    description: 'یکی از قدیمی‌ترین تمدن‌های ایران که در جنوب غربی فلات ایران شکوفا شد',
    capital: 'شوش (سوسه)',
    notableRulers: ['اونتاش نپیریشا', 'شیلهاک اینشوشیناک'],
    territory: 'خوزستان و لرستان',
    culturalAchievements: [
      'زیگورات چغازنبیل',
      'خط خطی عیلامی',
      'کاری با فلزات',
      'هنر سفالگری'
    ],
    keyEvents: [
      {
        year: '3200 ق.م',
        title: 'آغاز تمدن عیلام',
        description: 'شکل‌گیری اولین شهرهای عیلامی در خوزستان',
        importance: 'high',
        category: 'cultural'
      },
      {
        year: '1250 ق.م',
        title: 'ساخت زیگورات چغازنبیل',
        description: 'ساخت بزرگترین زیگورات خارج از بین‌النهرین',
        importance: 'high',
        category: 'cultural'
      }
    ]
  },
  {
    id: 'achaemenid',
    name: 'هخامنشی',
    timeRange: '550 - 330 ق.م',
    color: 'from-purple-500 to-indigo-500',
    description: 'اولین امپراتوری جهانی که از هند تا یونان گسترده شد',
    capital: 'پاسارگاد، پارسه (تخت جمشید)',
    notableRulers: ['کوروش بزرگ', 'داریوش یکم', 'خشایارشا'],
    territory: 'از هند تا یونان و مصر',
    culturalAchievements: [
      'منشور کوروش (اولین منشور حقوق بشر)',
      'معماری تخت جمشید',
      'سیستم راه شاهی',
      'سیستم پست امپراتوری'
    ],
    keyEvents: [
      {
        year: '550 ق.م',
        title: 'تأسیس امپراتوری هخامنشی',
        description: 'کوروش بزرگ امپراتوری هخامنشی را بنیان نهاد',
        importance: 'high',
        category: 'political'
      },
      {
        year: '539 ق.م',
        title: 'فتح بابل',
        description: 'کوروش بابل را فتح کرد و یهودیان را آزاد ساخت',
        importance: 'high',
        category: 'political'
      }
    ]
  },
  {
    id: 'parthian',
    name: 'اشکانی',
    timeRange: '247 ق.م - 224 م',
    color: 'from-green-500 to-teal-500',
    description: 'امپراتوری پارتی که بیش از 400 سال با روم رقابت کرد',
    capital: 'تیسفون، ری',
    notableRulers: ['اشک یکم', 'مهرداد یکم', 'اردشیر سوم'],
    territory: 'از رود فرات تا رود سند',
    culturalAchievements: [
      'هنر پارتی',
      'معماری ایوان',
      'موسیقی پارتی',
      'تجارت جاده ابریشم'
    ],
    keyEvents: [
      {
        year: '247 ق.م',
        title: 'تأسیس سلسله اشکانی',
        description: 'اشک یکم سلسله اشکانی را بنیان نهاد',
        importance: 'high',
        category: 'political'
      },
      {
        year: '53 ق.م',
        title: 'نبرد کاره',
        description: 'پیروزی اشکانیان بر رومیان در کاره',
        importance: 'high',
        category: 'military'
      }
    ]
  },
  {
    id: 'sassanid',
    name: 'ساسانی',
    timeRange: '224 - 651 م',
    color: 'from-red-500 to-pink-500',
    description: 'آخرین امپراتوری پیش از اسلام که فرهنگ ایرانی را احیا کرد',
    capital: 'تیسفون، استخر',
    notableRulers: ['اردشیر یکم', 'شاپور یکم', 'خسرو انوشیروان'],
    territory: 'از قفقاز تا یمن و از آسیای میانه تا مصر',
    culturalAchievements: [
      'کتاب آیین نامه تنسر',
      'دانشگاه جندی‌شاپور',
      'معماری ایوان کسری',
      'هنر نقش‌برجسته'
    ],
    keyEvents: [
      {
        year: '224 م',
        title: 'تأسیس سلسله ساسانی',
        description: 'اردشیر یکم سلسله ساسانی را بنیان نهاد',
        importance: 'high',
        category: 'political'
      },
      {
        year: '531-579 م',
        title: 'دوران خسرو انوشیروان',
        description: 'عصر طلایی ساسانیان و شکوفایی علم و فرهنگ',
        importance: 'high',
        category: 'cultural'
      }
    ]
  },
  {
    id: 'samanid',
    name: 'سامانی',
    timeRange: '819 - 999 م',
    color: 'from-blue-500 to-cyan-500',
    description: 'نخستین سلسله مستقل ایرانی پس از اسلام',
    capital: 'بخارا، سمرقند',
    notableRulers: ['اسماعیل سامانی', 'نصر دوم', 'نوح یکم'],
    territory: 'خراسان، ماوراءالنهر، کرمان',
    culturalAchievements: [
      'احیای زبان فارسی',
      'شاهنامه فردوسی',
      'کتب علمی رازی',
      'معماری اسلامی ایرانی'
    ],
    keyEvents: [
      {
        year: '875 م',
        title: 'اوج قدرت سامانیان',
        description: 'گسترش حکومت سامانیان در خراسان و ماوراءالنهر',
        importance: 'high',
        category: 'political'
      },
      {
        year: '977 م',
        title: 'تکمیل شاهنامه',
        description: 'فردوسی شاهنامه را در دربار سامانیان تکمیل کرد',
        importance: 'high',
        category: 'cultural'
      }
    ]
  },
  {
    id: 'safavid',
    name: 'صفوی',
    timeRange: '1501 - 1736 م',
    color: 'from-indigo-500 to-purple-500',
    description: 'سلسله‌ای که ایران مدرن را بنیان نهاد و شیعه را دین رسمی کرد',
    capital: 'تبریز، قزوین، اصفهان',
    notableRulers: ['شاه اسماعیل', 'شاه عباس بزرگ', 'شاه طهماسب'],
    territory: 'ایران، افغانستان، بخش‌هایی از قفقاز و عراق',
    culturalAchievements: [
      'میدان نقش جهان اصفهان',
      'مسجد شاه و شیخ لطف‌الله',
      'فرش ایرانی',
      'نقاشی مکتب اصفهان'
    ],
    keyEvents: [
      {
        year: '1501 م',
        title: 'تأسیس دولت صفوی',
        description: 'شاه اسماعیل صفوی دولت صفوی را بنیان نهاد',
        importance: 'high',
        category: 'political'
      },
      {
        year: '1598 م',
        title: 'انتقال پایتخت به اصفهان',
        description: 'شاه عباس اصفهان را پایتخت جدید قرار داد',
        importance: 'high',
        category: 'political'
      }
    ]
  }
];

export function HistoricalTimelineEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod | null>(null);
  const [activeTab, setActiveTab] = useState('timeline');

  const filteredPeriods = persianPeriods.filter(period =>
    period.name.includes(searchTerm) ||
    period.description.includes(searchTerm) ||
    period.notableRulers.some(ruler => ruler.includes(searchTerm))
  );

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'political': return <Crown size={16} />;
      case 'cultural': return <Scroll size={16} />;
      case 'military': return <Users size={16} />;
      case 'economic': return <MapPin size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Clock size={28} />
            خط زمانی تاریخ ایران باستان
          </CardTitle>
          <p className="text-white/90">
            سفری در تاریخ کهن ایران از تمدن‌های اولیه تا دوران اسلامی
          </p>
        </CardHeader>
      </Card>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="جستجو در دوره‌های تاریخی، پادشاهان یا رویدادها..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="timeline">خط زمانی</TabsTrigger>
          <TabsTrigger value="periods">دوره‌های تاریخی</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              {filteredPeriods.map((period, index) => (
                <div key={period.id} className="relative pr-12 pb-8">
                  <div className="absolute right-2 w-4 h-4 bg-white border-4 border-purple-500 rounded-full"></div>
                  
                  <Card className={`hover-lift cursor-pointer bg-gradient-to-r ${period.color} text-white`} 
                        onClick={() => setSelectedPeriod(period)}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{period.name}</h3>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {period.timeRange}
                        </Badge>
                      </div>
                      <p className="text-white/90 mb-3">{period.description}</p>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <MapPin size={16} />
                        <span>پایتخت: {period.capital}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="periods">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeriods.map((period) => (
              <Card key={period.id} className="hover-lift cursor-pointer" onClick={() => setSelectedPeriod(period)}>
                <div className={`h-32 bg-gradient-to-br ${period.color} rounded-t-lg flex items-center justify-center text-white`}>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{period.name}</h3>
                    <p className="text-sm opacity-90">{period.timeRange}</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {period.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} />
                      <span className="font-medium">پایتخت:</span>
                      <span className="text-muted-foreground">{period.capital}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">پادشاهان مشهور:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {period.notableRulers.slice(0, 2).map((ruler, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ruler}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPeriod && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedPeriod.name}</CardTitle>
                <p className="text-muted-foreground">{selectedPeriod.timeRange}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedPeriod(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">شرح دوره</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedPeriod.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">پایتخت</h4>
                  <Badge variant="outline">{selectedPeriod.capital}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">قلمرو</h4>
                  <p className="text-sm text-muted-foreground">{selectedPeriod.territory}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">پادشاهان مشهور</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPeriod.notableRulers.map((ruler, index) => (
                      <Badge key={index} variant="secondary">{ruler}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">دستاوردهای فرهنگی</h4>
                  <div className="space-y-1">
                    {selectedPeriod.culturalAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">رویدادهای مهم</h4>
              <div className="space-y-3">
                {selectedPeriod.keyEvents.map((event, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <h5 className="font-medium">{event.title}</h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.year}</Badge>
                          <Badge className={getImportanceColor(event.importance)}>
                            {event.importance === 'high' ? 'مهم' : event.importance === 'medium' ? 'متوسط' : 'کم'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}