import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Clock, Camera, Building2, Mountain, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ArchitecturalSite {
  id: string;
  name: string;
  englishName: string;
  period: string;
  location: string;
  yearBuilt: string;
  description: string;
  significance: string;
  architecturalStyle: string;
  features: string[];
  images: string[];
  virtualTour?: string;
  status: 'UNESCO' | 'National' | 'Regional';
}

const architecturalSites: ArchitecturalSite[] = [
  {
    id: 'persepolis',
    name: 'تخت جمشید',
    englishName: 'Persepolis',
    period: 'هخامنشی',
    location: 'شیراز، فارس',
    yearBuilt: '515 ق.م',
    description: 'تخت جمشید یا پارسه، پایتخت تشریفاتی امپراتوری هخامنشی بود که توسط داریوش بزرگ بنا شد.',
    significance: 'نماد عظمت تمدن ایران باستان و شاهکار معماری جهان',
    architecturalStyle: 'معماری هخامنشی',
    features: ['تالار صد ستون', 'کاخ آپادانا', 'نقش‌برجسته‌های باستانی', 'پلکان شاهانه'],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'isfahan-square',
    name: 'میدان نقش جهان',
    englishName: 'Naqsh-e Jahan Square',
    period: 'صفوی',
    location: 'اصفهان',
    yearBuilt: '1602 م',
    description: 'میدان نقش جهان یکی از بزرگ‌ترین میدان‌های جهان و نمونه‌ای از معماری اسلامی ایران است.',
    significance: 'مرکز اجتماعی و اقتصادی دوران صفوی',
    architecturalStyle: 'معماری اسلامی - ایرانی',
    features: ['مسجد شاه', 'مسجد شیخ لطف‌الله', 'کاخ عالی‌قاپو', 'بازار قیصریه'],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'pasargadae',
    name: 'پاسارگاد',
    englishName: 'Pasargadae',
    period: 'هخامنشی',
    location: 'شیراز، فارس',
    yearBuilt: '546 ق.م',
    description: 'پاسارگاد اولین پایتخت امپراتوری هخامنشی و محل آرامگاه کوروش بزرگ است.',
    significance: 'آرامگاه بنیانگذار امپراتوری هخامنشی',
    architecturalStyle: 'معماری هخامنشی اولیه',
    features: ['آرامگاه کوروش', 'کاخ‌های باستانی', 'باغ چهارباغ', 'سنگ‌نگاره‌ها'],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'golestan-palace',
    name: 'کاخ گلستان',
    englishName: 'Golestan Palace',
    period: 'قاجار',
    location: 'تهران',
    yearBuilt: '1524 م',
    description: 'کاخ گلستان یکی از قدیمی‌ترین بناهای تاریخی تهران و مقر سلطنتی دودمان قاجار بود.',
    significance: 'نمونه معماری قاجاری و مرکز سیاسی ایران',
    architecturalStyle: 'معماری قاجاری',
    features: ['تالار آینه', 'تالار عاج', 'موزه هدایا', 'باغ‌های زیبا'],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'soltaniyeh',
    name: 'گنبد سلطانیه',
    englishName: 'Soltaniyeh Dome',
    period: 'ایلخانی',
    location: 'زنجان',
    yearBuilt: '1302 م',
    description: 'گنبد سلطانیه بزرگترین گنبد آجری جهان و شاهکار معماری دوران ایلخانی است.',
    significance: 'بزرگترین گنبد آجری جهان',
    architecturalStyle: 'معماری ایلخانی',
    features: ['گنبد عظیم آجری', 'تزیینات کاشی‌کاری', 'خط‌کشی‌های هندسی', 'آرامگاه اولجایتو'],
    images: [],
    status: 'UNESCO'
  },
  {
    id: 'chogha-zanbil',
    name: 'چغازنبیل',
    englishName: 'Chogha Zanbil',
    period: 'عیلامی',
    location: 'خوزستان',
    yearBuilt: '1250 ق.م',
    description: 'چغازنبیل بقایای شهر باستانی دور اونتاش و زیگورات عیلامی است.',
    significance: 'تنها زیگورات باقی‌مانده خارج از بین‌النهرین',
    architecturalStyle: 'معماری عیلامی',
    features: ['زیگورات چهارطبقه', 'معابد باستانی', 'کاخ شاهی', 'سیستم آبرسانی'],
    images: [],
    status: 'UNESCO'
  }
];

const architecturalPeriods = [
  { id: 'all', name: 'همه دوره‌ها', count: architecturalSites.length },
  { id: 'هخامنشی', name: 'هخامنشی', count: 2 },
  { id: 'صفوی', name: 'صفوی', count: 1 },
  { id: 'قاجار', name: 'قاجار', count: 1 },
  { id: 'ایلخانی', name: 'ایلخانی', count: 1 },
  { id: 'عیلامی', name: 'عیلامی', count: 1 }
];

export function PersianArchitectureEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedSite, setSelectedSite] = useState<ArchitecturalSite | null>(null);

  const filteredSites = architecturalSites.filter(site => {
    const matchesSearch = site.name.includes(searchTerm) || 
                         site.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.location.includes(searchTerm);
    const matchesPeriod = selectedPeriod === 'all' || site.period === selectedPeriod;
    return matchesSearch && matchesPeriod;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNESCO':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">میراث جهانی یونسکو</Badge>;
      case 'National':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">میراث ملی</Badge>;
      case 'Regional':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">میراث منطقه‌ای</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building2 size={28} />
            معماری ایران باستان
          </CardTitle>
          <p className="text-white/90">
            کاوش در شاهکارهای معماری ایران از دوران باستان تا دوره‌های اسلامی
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="جستجو در بناهای تاریخی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {architecturalPeriods.map((period) => (
            <TabsTrigger key={period.id} value={period.id} className="text-sm">
              {period.name}
              <span className="mr-1 text-xs">({period.count})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedPeriod}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <Card key={site.id} className="hover-lift cursor-pointer" onClick={() => setSelectedSite(site)}>
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                  <Building2 size={64} className="text-amber-600" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{site.name}</h3>
                    <p className="text-sm text-muted-foreground">{site.englishName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {getStatusBadge(site.status)}
                    <Badge variant="outline">{site.period}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{site.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} />
                    <span>{site.yearBuilt}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {site.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedSite && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedSite.name}</CardTitle>
                <p className="text-muted-foreground">{selectedSite.englishName}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedSite(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock size={16} />
                  دوره تاریخی
                </h4>
                <Badge>{selectedSite.period}</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <MapPin size={16} />
                  موقعیت
                </h4>
                <p className="text-sm">{selectedSite.location}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Star size={16} />
                  وضعیت
                </h4>
                {getStatusBadge(selectedSite.status)}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">شرح</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedSite.description}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">اهمیت تاریخی</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedSite.significance}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">ویژگی‌های معماری</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedSite.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="justify-center">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Camera size={16} />
                <span className="font-medium">تور مجازی</span>
              </div>
              <p className="text-blue-600 text-sm">
                تور مجازی سه‌بعدی این محوطه باستانی به زودی در دسترس خواهد بود.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}