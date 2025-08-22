import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Feather, Heart, Star, User } from 'lucide-react';

interface PersianPoet {
  id: string;
  name: string;
  englishName: string;
  period: string;
  birthYear: string;
  deathYear: string;
  birthPlace: string;
  style: string[];
  famousWorks: string[];
  biography: string;
  influence: string;
  poems: PersianPoem[];
}

interface PersianPoem {
  id: string;
  title: string;
  type: 'غزل' | 'قصیده' | 'رباعی' | 'مثنوی' | 'دوبیتی';
  content: string;
  translation?: string;
  theme: string;
  analysis: string;
}

const persianPoets: PersianPoet[] = [
  {
    id: 'hafez',
    name: 'حافظ شیرازی',
    englishName: 'Hafez',
    period: 'قرن هشتم هجری',
    birthYear: '۷۲۷ ه.ق',
    deathYear: '۷۹۲ ه.ق',
    birthPlace: 'شیراز',
    style: ['غزل', 'عرفان', 'شعر عاشقانه'],
    famousWorks: ['دیوان حافظ', 'غزلیات'],
    biography: 'حافظ شیرازی بزرگترین غزل‌سرای فارسی‌زبان است که در شیراز زندگی می‌کرد. او قرآن را از بر داشت و به همین دلیل حافظ نامیده شد.',
    influence: 'حافظ بر ادبیات فارسی و جهانی تأثیر عمیقی گذاشت و شعرهایش تا امروز مورد علاقه مردم است.',
    poems: [
      {
        id: 'alaa-ya-ayyohal-saqi',
        title: 'الا یا ایها الساقی',
        type: 'غزل',
        content: 'الا یا ایها الساقی ادر کأسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها',
        theme: 'عشق و عرفان',
        analysis: 'این غزل از مشهورترین اشعار حافظ است که در آن از ساقی می‌خواهد جام عشق را بدهد.'
      },
      {
        id: 'shirini-sokhan',
        title: 'شیرینی سخن',
        type: 'غزل',
        content: 'شیرینی و نمکی که در این طعمه نهفتست\nجز مرغ سلیمانی نداند که چه می‌گفت',
        theme: 'حکمت و معرفت',
        analysis: 'حافظ در این بیت به ظرافت کلام و عمق معنی در شعر اشاره می‌کند.'
      }
    ]
  },
  {
    id: 'rumi',
    name: 'مولانا جلال‌الدین رومی',
    englishName: 'Rumi',
    period: 'قرن هفتم هجری',
    birthYear: '۶۰۴ ه.ق',
    deathYear: '۶۷۲ ه.ق',
    birthPlace: 'بلخ',
    style: ['مثنوی', 'غزل', 'عرفان'],
    famousWorks: ['مثنوی معنوی', 'دیوان شمس', 'فیه ما فیه'],
    biography: 'مولانا از بزرگترین عارفان و شاعران فارسی‌زبان است که در قونیه ترکیه زندگی می‌کرد. او پس از ملاقات با شمس تبریزی دگرگونی روحی عمیقی یافت.',
    influence: 'مولانا یکی از شناخته‌شده‌ترین شاعران جهان است و اشعارش به زبان‌های مختلف ترجمه شده است.',
    poems: [
      {
        id: 'ney-nameh',
        title: 'نی‌نامه',
        type: 'مثنوی',
        content: 'بشنو از نی چون حکایت می‌کند\nاز جدایی‌ها شکایت می‌کند',
        theme: 'جدایی و اشتیاق',
        analysis: 'آغاز مثنوی معنوی که در آن نی نماد انسان جدا شده از اصل خویش است.'
      }
    ]
  },
  {
    id: 'ferdowsi',
    name: 'ابوالقاسم فردوسی',
    englishName: 'Ferdowsi',
    period: 'قرن چهارم و پنجم هجری',
    birthYear: '۳۲۹ ه.ق',
    deathYear: '۴۱۶ ه.ق',
    birthPlace: 'توس',
    style: ['حماسه', 'مثنوی', 'شاهنامه'],
    famousWorks: ['شاهنامه', 'یوسف و زلیخا'],
    biography: 'فردوسی شاعر بزرگ حماسی فارسی است که سی سال عمر خود را صرف سرودن شاهنامه کرد. او زبان فارسی را از واژگان عربی پاک نگه داشت.',
    influence: 'شاهنامه فردوسی باعث حفظ زبان فارسی و فرهنگ ایرانی شد و تا امروز الهام‌بخش هنرمندان است.',
    poems: [
      {
        id: 'shahnameh-opening',
        title: 'آغاز شاهنامه',
        type: 'مثنوی',
        content: 'به نام خداوند جان و خرد\nکزین برتر اندیشه برنگذرد',
        theme: 'حمد و ثنای خداوند',
        analysis: 'آغاز شاهنامه با حمد خداوند که نشان‌دهنده اعتقاد مذهبی فردوسی است.'
      }
    ]
  },
  {
    id: 'saadi',
    name: 'شیخ سعدی شیرازی',
    englishName: 'Saadi',
    period: 'قرن هفتم هجری',
    birthYear: '۶۰۶ ه.ق',
    deathYear: '۶۹۶ ه.ق',
    birthPlace: 'شیراز',
    style: ['غزل', 'قصیده', 'نثر', 'اخلاق'],
    famousWorks: ['گلستان', 'بوستان', 'دیوان سعدی'],
    biography: 'سعدی از بزرگترین شاعران اخلاقی فارسی‌زبان است. او سال‌های زیادی سفر کرد و تجربیات خود را در اشعارش بازتاب داد.',
    influence: 'سعدی به دلیل اشعار اخلاقی و حکیمانه‌اش در سراسر جهان شناخته می‌شود.',
    poems: [
      {
        id: 'bani-adam',
        title: 'بنی آدم اعضای یک پیکرند',
        type: 'غزل',
        content: 'بنی‌آدم اعضای یک‌پیکرند\nکه در آفرینش ز یک گوهرند',
        theme: 'وحدت انسانی',
        analysis: 'این شعر مشهور سعدی درباره برادری و وحدت انسان‌هاست که در سازمان ملل نیز نقل شده است.'
      }
    ]
  },
  {
    id: 'omar-khayyam',
    name: 'عمر خیام نیشابوری',
    englishName: 'Omar Khayyam',
    period: 'قرن پنجم و ششم هجری',
    birthYear: '۴۴۸ ه.ق',
    deathYear: '۵۲۲ ه.ق',
    birthPlace: 'نیشابور',
    style: ['رباعی', 'فلسفه', 'حکمت'],
    famousWorks: ['رباعیات خیام', 'رساله‌های ریاضی'],
    biography: 'عمر خیام ریاضی‌دان، ستاره‌شناس و شاعر بزرگ ایرانی بود. او علاوه بر شعر در علوم ریاضی و نجوم نیز پیشگام بود.',
    influence: 'رباعیات خیام در سراسر جهان شناخته شده و به زبان‌های مختلف ترجمه شده است.',
    poems: [
      {
        id: 'saghiya-biya',
        title: 'ساقیا بیا',
        type: 'رباعی',
        content: 'ساقیا بیا که غم فردا نخوریم\nامروز خوش باشیم فردا بمیریم',
        theme: 'لذت زندگی',
        analysis: 'این رباعی نشان‌دهنده فلسفه زندگی خیام است که بر لحظه حال تأکید دارد.'
      }
    ]
  }
];

export function PersianLiteratureEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoet, setSelectedPoet] = useState<PersianPoet | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<PersianPoem | null>(null);
  const [activeTab, setActiveTab] = useState('poets');

  const filteredPoets = persianPoets.filter(poet =>
    poet.name.includes(searchTerm) ||
    poet.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poet.style.some(s => s.includes(searchTerm)) ||
    poet.birthPlace.includes(searchTerm)
  );

  const allPoems = persianPoets.flatMap(poet => 
    poet.poems.map(poem => ({ ...poem, poetName: poet.name, poetId: poet.id }))
  );

  const filteredPoems = allPoems.filter((poem: any) =>
    poem.title.includes(searchTerm) ||
    poem.content.includes(searchTerm) ||
    poem.theme.includes(searchTerm) ||
    poem.poetName.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen size={28} />
            ادبیات کلاسیک فارسی
          </CardTitle>
          <p className="text-white/90">
            کاوش در گنجینه شعر و ادب فارسی از بزرگان گذشته
          </p>
        </CardHeader>
      </Card>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="جستجو در شاعران، اشعار یا مضامین..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="poets">شاعران</TabsTrigger>
          <TabsTrigger value="poems">اشعار</TabsTrigger>
        </TabsList>

        <TabsContent value="poets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoets.map((poet) => (
              <Card key={poet.id} className="hover-lift cursor-pointer" onClick={() => setSelectedPoet(poet)}>
                <div className="h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                  <Feather size={48} className="text-amber-600" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{poet.name}</h3>
                    <p className="text-sm text-muted-foreground">{poet.englishName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge variant="outline">{poet.period}</Badge>
                    <div className="flex flex-wrap gap-1">
                      {poet.style.slice(0, 2).map((style, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {poet.biography}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User size={14} />
                    <span>{poet.birthPlace}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="poems">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPoems.map((poem: any) => (
              <Card key={poem.id} className="hover-lift cursor-pointer" onClick={() => setSelectedPoem(poem)}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{poem.title}</h3>
                      <p className="text-sm text-muted-foreground">{poem.poetName}</p>
                    </div>
                    <Badge variant="outline">{poem.type}</Badge>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg text-right leading-relaxed">
                    <p className="font-medium">{poem.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-red-500" />
                    <span className="text-sm text-muted-foreground">{poem.theme}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPoet && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedPoet.name}</CardTitle>
                <p className="text-muted-foreground">{selectedPoet.englishName} ({selectedPoet.period})</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedPoet(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">زندگی‌نامه</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedPoet.biography}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">تولد</h4>
                    <p className="text-sm text-muted-foreground">{selectedPoet.birthYear}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">وفات</h4>
                    <p className="text-sm text-muted-foreground">{selectedPoet.deathYear}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">زادگاه</h4>
                  <Badge variant="outline">{selectedPoet.birthPlace}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">سبک شعری</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPoet.style.map((style, index) => (
                      <Badge key={index} variant="secondary">{style}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">آثار مشهور</h4>
                  <div className="space-y-1">
                    {selectedPoet.famousWorks.map((work, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Star size={14} className="text-yellow-500" />
                        <span>{work}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">تأثیر</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedPoet.influence}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">نمونه اشعار</h4>
              <div className="grid grid-cols-1 gap-4">
                {selectedPoet.poems.map((poem, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{poem.title}</h5>
                        <Badge variant="outline">{poem.type}</Badge>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-right leading-relaxed">
                        <p className="font-medium whitespace-pre-line">{poem.content}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Heart size={14} className="text-red-500" />
                          <span className="font-medium">مضمون:</span>
                          <span className="text-muted-foreground">{poem.theme}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">تحلیل:</span>
                          <p className="text-muted-foreground mt-1">{poem.analysis}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPoem && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedPoem.title}</CardTitle>
                <p className="text-muted-foreground">از {(selectedPoem as any).poetName}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedPoem(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg text-right">
              <p className="text-xl font-medium leading-relaxed whitespace-pre-line">
                {selectedPoem.content}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">نوع شعر</h4>
                <Badge variant="secondary">{selectedPoem.type}</Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">مضمون</h4>
                <Badge variant="outline">{selectedPoem.theme}</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">تحلیل ادبی</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedPoem.analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}