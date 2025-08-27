import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Volume2, Users, Sparkles, Search, Map, BookOpen } from 'lucide-react';

interface DialectInfo {
  id: string;
  name: string;
  englishName: string;
  region: string;
  speakers: string;
  examples: Array<{
    standard: string;
    dialect: string;
    pronunciation?: string;
    meaning: string;
  }>;
  characteristics: string[];
  culturalNotes: string;
  color: string;
}

const iranianDialects: DialectInfo[] = [
  {
    id: 'gilaki',
    name: 'گیلکی',
    englishName: 'Gilaki',
    region: 'گیلان',
    speakers: '2.5 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'درود',
        pronunciation: 'dorud',
        meaning: 'Hello'
      },
      {
        standard: 'آب',
        dialect: 'اَو',
        pronunciation: 'aw',
        meaning: 'Water'
      },
      {
        standard: 'خانه',
        dialect: 'کَله',
        pronunciation: 'kale',
        meaning: 'House'
      },
      {
        standard: 'برادر',
        dialect: 'بِرار',
        pronunciation: 'birar',
        meaning: 'Brother'
      }
    ],
    characteristics: [
      'استفاده از حروف اضافی مانند "ئه"',
      'تلفظ متفاوت حروف صدادار',
      'ساختار جمله منحصر به فرد',
      'واژگان مشترک با زبان‌های کاسپی'
    ],
    culturalNotes: 'گیلکی یکی از قدیمی‌ترین گویش‌های ایرانی است که در منطقه کاسپی صحبت می‌شود و تأثیرات عمیقی از فرهنگ محلی دارد.',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'mazandarani',
    name: 'مازندرانی (تبری)',
    englishName: 'Mazandarani (Tabari)',
    region: 'مازندران',
    speakers: '3 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'درود',
        pronunciation: 'dorud',
        meaning: 'Hello'
      },
      {
        standard: 'پدر',
        dialect: 'بابا',
        pronunciation: 'baba',
        meaning: 'Father'
      },
      {
        standard: 'مادر',
        dialect: 'نَنه',
        pronunciation: 'nane',
        meaning: 'Mother'
      },
      {
        standard: 'دختر',
        dialect: 'کِنیزه',
        pronunciation: 'kenize',
        meaning: 'Girl'
      }
    ],
    characteristics: [
      'نظام زمانی پیچیده',
      'استفاده از پسوندهای خاص',
      'تأثیرپذیری از زبان‌های کاسپی',
      'حفظ کلمات باستانی ایرانی'
    ],
    culturalNotes: 'مازندرانی که به تبری نیز معروف است، زبان مردم شمال ایران است و یکی از غنی‌ترین گویش‌های ایرانی محسوب می‌شود.',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'lori',
    name: 'لری',
    englishName: 'Luri',
    region: 'لرستان و کهگیلویه و بویراحمد',
    speakers: '4 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'خدا دیت بکه',
        pronunciation: 'khoda dit bake',
        meaning: 'Hello (God protect you)'
      },
      {
        standard: 'آب',
        dialect: 'آو',
        pronunciation: 'aw',
        meaning: 'Water'
      },
      {
        standard: 'برو',
        dialect: 'بشو',
        pronunciation: 'besho',
        meaning: 'Go'
      },
      {
        standard: 'خوب',
        dialect: 'خوش',
        pronunciation: 'khosh',
        meaning: 'Good'
      }
    ],
    characteristics: [
      'نزدیکی زیاد به فارسی باستان',
      'حفظ کلمات کهن فارسی',
      'لهجه‌های مختلف در نواحی مختلف',
      'ترکیب با عناصر کردی'
    ],
    culturalNotes: 'لری زبان اصلی مردم لرستان است و از نظر زبان‌شناسی جایگاه ویژه‌ای در خانواده زبان‌های ایرانی دارد.',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'kurdish',
    name: 'کردی',
    englishName: 'Kurdish',
    region: 'کردستان، کرمانشاه، ایلام',
    speakers: '8 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'سڵاو',
        pronunciation: 'slaw',
        meaning: 'Hello'
      },
      {
        standard: 'آب',
        dialect: 'ئاو',
        pronunciation: 'aw',
        meaning: 'Water'
      },
      {
        standard: 'خانه',
        dialect: 'ماڵ',
        pronunciation: 'mal',
        meaning: 'House'
      },
      {
        standard: 'دوست',
        dialect: 'هاوریێ',
        pronunciation: 'hawre',
        meaning: 'Friend'
      }
    ],
    characteristics: [
      'استفاده از الفبای عربی اصلاح‌شده',
      'گویش‌های مختلف: سورانی، کرمانجی',
      'ساختار گرامری منحصر به فرد',
      'ادبیات غنی شفاهی'
    ],
    culturalNotes: 'کردی یکی از زبان‌های اصلی ایران است که در مناطق غربی کشور صحبت می‌شود و دارای ادبیات و فرهنگ غنی است.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'azeri',
    name: 'آذری (ترکی آذربایجانی)',
    englishName: 'Azerbaijani Turkish',
    region: 'آذربایجان شرقی و غربی، اردبیل',
    speakers: '16 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'سالام',
        pronunciation: 'salam',
        meaning: 'Hello'
      },
      {
        standard: 'آب',
        dialect: 'سو',
        pronunciation: 'su',
        meaning: 'Water'
      },
      {
        standard: 'خانه',
        dialect: 'اِو',
        pronunciation: 'ev',
        meaning: 'House'
      },
      {
        standard: 'دوست',
        dialect: 'دوست',
        pronunciation: 'dust',
        meaning: 'Friend'
      }
    ],
    characteristics: [
      'متعلق به خانواده زبان‌های ترکی',
      'تأثیر متقابل با فارسی',
      'گویش‌های مختلف در نواحی مختلف',
      'الفبای عربی-فارسی'
    ],
    culturalNotes: 'آذری زبان اصلی مردم آذربایجان است و یکی از پرگویشگرترین زبان‌های ایران محسوب می‌شود.',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'balochi',
    name: 'بلوچی',
    englishName: 'Balochi',
    region: 'سیستان و بلوچستان',
    speakers: '2 میلیون نفر',
    examples: [
      {
        standard: 'سلام',
        dialect: 'سلام',
        pronunciation: 'salam',
        meaning: 'Hello'
      },
      {
        standard: 'آب',
        dialect: 'آپ',
        pronunciation: 'ap',
        meaning: 'Water'
      },
      {
        standard: 'خانه',
        dialect: 'گَدان',
        pronunciation: 'gadan',
        meaning: 'House'
      },
      {
        standard: 'مرد',
        dialect: 'مرد',
        pronunciation: 'mard',
        meaning: 'Man'
      }
    ],
    characteristics: [
      'زبان‌های شاخه‌ای: بلوچی شمالی و جنوبی',
      'تأثیرپذیری از عربی و فارسی',
      'ادبیات شفاهی غنی',
      'حفظ عناصر کهن ایرانی'
    ],
    culturalNotes: 'بلوچی زبان مردم بلوچستان است و یکی از زبان‌های ایرانی شاخه شمال‌غربی محسوب می‌شود.',
    color: 'from-yellow-500 to-orange-600'
  }
];

export const PersianRegionalDialectsEnhanced = () => {
  const [selectedDialect, setSelectedDialect] = useState<DialectInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDialects = iranianDialects.filter(dialect =>
    dialect.name.includes(searchTerm) ||
    dialect.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dialect.region.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Map className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            گویش‌های محلی ایران
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          آشنایی با تنوع زبان‌شناختی غنی ایران - از گیلکی تا بلوچی، هر گویش داستانی از فرهنگ و تاریخ دارد
        </p>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">60+</div>
              <div className="text-sm text-muted-foreground">گویش و زبان محلی</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">35+</div>
              <div className="text-sm text-muted-foreground">میلیون گویشگر</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">3000+</div>
              <div className="text-sm text-muted-foreground">سال تاریخ</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجو در گویش‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Dialects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDialects.map((dialect) => (
          <Card 
            key={dialect.id} 
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group overflow-hidden"
            onClick={() => setSelectedDialect(dialect)}
          >
            <div className={`h-2 bg-gradient-to-r ${dialect.color}`} />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {dialect.name}
                </CardTitle>
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {dialect.englishName}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{dialect.region}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-secondary" />
                <span>{dialect.speakers}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                <span>{dialect.examples.length} نمونه کلمه</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedDialect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedDialect(null)}>
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`h-3 bg-gradient-to-r ${selectedDialect.color}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-primary">
                    {selectedDialect.name}
                  </CardTitle>
                  <p className="text-muted-foreground font-medium">
                    {selectedDialect.englishName}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedDialect(null)}
                  className="text-2xl hover:bg-destructive/10 hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">منطقه</div>
                    <div className="text-sm text-muted-foreground">{selectedDialect.region}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-secondary" />
                  <div>
                    <div className="font-medium">گویشگران</div>
                    <div className="text-sm text-muted-foreground">{selectedDialect.speakers}</div>
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  نمونه کلمات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDialect.examples.map((example, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-card">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-primary">{example.dialect}</span>
                        <span className="text-sm text-muted-foreground">({example.standard})</span>
                      </div>
                      {example.pronunciation && (
                        <div className="text-xs text-muted-foreground mb-1">
                          تلفظ: {example.pronunciation}
                        </div>
                      )}
                      <div className="text-sm font-medium text-secondary">
                        {example.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Characteristics */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  ویژگی‌های زبان‌شناسی
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDialect.characteristics.map((char, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Cultural Notes */}
              <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary">یادداشت فرهنگی</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedDialect.culturalNotes}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cultural Note */}
      <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-3 text-primary">
            گنجینه زبان‌شناسی ایران
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            ایران با بیش از 60 گویش و زبان محلی، یکی از غنی‌ترین کشورهای جهان از نظر تنوع زبان‌شناسی است. 
            هر گویش حامل فرهنگ، تاریخ و هویت منحصر به فرد مردمان آن منطقه است و بخشی از میراث ناملموس کشور محسوب می‌شود.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};