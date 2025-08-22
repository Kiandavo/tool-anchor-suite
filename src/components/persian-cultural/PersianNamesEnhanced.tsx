import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Heart, User, Crown, Star, BookOpen } from 'lucide-react';
import { persianNamesComprehensive, getNamesByGenderComprehensive, getNamesByOriginComprehensive, searchNamesComprehensive, getRandomNameComprehensive } from '@/data/persian-names-comprehensive';

export const PersianNamesEnhanced: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedName, setSelectedName] = useState(persianNamesComprehensive[0]);
  const [randomName, setRandomName] = useState(getRandomNameComprehensive());

  const filteredNames = (() => {
    let names = persianNamesComprehensive;
    
    if (selectedGender !== 'all') {
      names = getNamesByGenderComprehensive(selectedGender as 'male' | 'female' | 'unisex');
    }
    
    if (selectedOrigin !== 'all') {
      names = names.filter(name => name.origin === selectedOrigin);
    }
    
    if (searchTerm) {
      names = searchNamesComprehensive(searchTerm);
    }
    
    return names;
  })();

  const genders = [
    { id: 'all', name: 'همه', nameEn: 'All' },
    { id: 'male', name: 'پسرانه', nameEn: 'Male' },
    { id: 'female', name: 'دخترانه', nameEn: 'Female' },
    { id: 'unisex', name: 'مشترک', nameEn: 'Unisex' }
  ];

  const origins = [
    { id: 'all', name: 'همه منشاء', nameEn: 'All Origins' },
    { id: 'persian', name: 'فارسی', nameEn: 'Persian' },
    { id: 'zoroastrian', name: 'زرتشتی', nameEn: 'Zoroastrian' },
    { id: 'mythological', name: 'اساطیری', nameEn: 'Mythological' },
    { id: 'historical', name: 'تاریخی', nameEn: 'Historical' },
    { id: 'nature', name: 'طبیعت', nameEn: 'Nature' },
    { id: 'royal', name: 'شاهانه', nameEn: 'Royal' }
  ];

  const getGenderBadge = (gender: string) => {
    const styles = {
      male: 'bg-blue-100 text-blue-800 border-blue-200',
      female: 'bg-pink-100 text-pink-800 border-pink-200',
      unisex: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    const names = {
      male: 'پسرانه',
      female: 'دخترانه',
      unisex: 'مشترک'
    };

    return (
      <Badge className={styles[gender as keyof typeof styles] || 'bg-gray-100 text-gray-800'}>
        {names[gender as keyof typeof names] || gender}
      </Badge>
    );
  };

  const getOriginIcon = (origin: string) => {
    const icons = {
      persian: Star,
      zoroastrian: Crown,
      mythological: BookOpen,
      historical: User,
      nature: Heart,
      royal: Crown
    };
    
    const Icon = icons[origin as keyof typeof icons] || User;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-persian-primary/5 via-persian-accent/5 to-persian-secondary/5">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <User className="w-8 h-8 text-persian-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-persian-primary to-persian-accent bg-clip-text text-transparent">
              معانی نام‌های ایرانی
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            کاوش در معانی و ریشه‌های نام‌های زیبای ایرانی و انتخاب نام مناسب
          </p>
        </div>

        {/* Random Name Generator */}
        <Card className="bg-gradient-to-r from-persian-primary/10 to-persian-accent/10 border-persian-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-persian-primary">نام تصادفی</h3>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold">{randomName.name}</h4>
              <p className="text-lg text-muted-foreground">{randomName.meaning}</p>
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                {getGenderBadge(randomName.gender)}
                <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                  {getOriginIcon(randomName.origin)}
                  <span>{randomName.origin}</span>
                </Badge>
              </div>
            </div>
            <Button 
              onClick={() => setRandomName(getRandomNameComprehensive())}
              className="bg-persian-primary hover:bg-persian-primary/90"
            >
              نام جدید
            </Button>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="جستجو در نام‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <Tabs value={selectedGender} onValueChange={setSelectedGender}>
            <TabsList className="grid w-full grid-cols-4">
              {genders.map((gender) => (
                <TabsTrigger key={gender.id} value={gender.id} className="text-xs">
                  {gender.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Tabs value={selectedOrigin} onValueChange={setSelectedOrigin}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-xs">همه</TabsTrigger>
              <TabsTrigger value="persian" className="text-xs">فارسی</TabsTrigger>
              <TabsTrigger value="zoroastrian" className="text-xs">زرتشتی</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Names List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-right">فهرست نام‌ها ({filteredNames.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredNames.map((name) => (
                <Card 
                  key={name.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedName.id === name.id 
                      ? 'ring-2 ring-persian-primary bg-persian-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedName(name)}
                >
                  <CardContent className="p-4">
                    <div className="text-right space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          {getGenderBadge(name.gender)}
                          <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse text-xs">
                            {getOriginIcon(name.origin)}
                            <span>{name.origin}</span>
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg">{name.name}</h3>
                      </div>
                      {name.pronunciation && (
                        <p className="text-sm text-muted-foreground">{name.pronunciation}</p>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2">{name.meaning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Name Details */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="text-right">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getGenderBadge(selectedName.gender)}
                    <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                      {getOriginIcon(selectedName.origin)}
                      <span>{selectedName.origin}</span>
                    </Badge>
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-3xl">{selectedName.name}</CardTitle>
                    {selectedName.pronunciation && (
                      <p className="text-muted-foreground text-lg">{selectedName.pronunciation}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-right space-y-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-persian-primary">معنی</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {selectedName.meaning}
                    </p>
                  </div>

                  {selectedName.etymology && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">ریشه‌شناسی</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedName.etymology}
                      </p>
                    </div>
                  )}

                  {(selectedName.historicalFigure || selectedName.historicalPeriod) && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">زمینه تاریخی</h4>
                      <div className="space-y-2">
                        {selectedName.historicalFigure && (
                          <p className="text-muted-foreground leading-relaxed">
                            <span className="font-medium">شخصیت تاریخی:</span> {selectedName.historicalFigure}
                          </p>
                        )}
                        {selectedName.historicalPeriod && (
                          <p className="text-muted-foreground leading-relaxed">
                            <span className="font-medium">دوره تاریخی:</span> {selectedName.historicalPeriod}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedName.famousBearers && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">شخصیت‌های مشهور</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedName.famousBearers.map((person, index) => (
                          <Card key={index} className="p-3 bg-muted/20">
                            <p className="text-center font-medium">{person}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedName.variations && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">تنوعات</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedName.variations.map((variation, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {variation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedName.literaryReference && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">مرجع ادبی</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedName.literaryReference}
                      </p>
                    </div>
                  )}

                  {selectedName.numerology && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">عددشناسی</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-muted/20 p-3 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">عدد نام</p>
                          <p className="text-xl font-bold text-persian-primary">{selectedName.numerology}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedName.popularity && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">محبوبیت</h4>
                      <Badge variant={selectedName.popularity === 'high' ? 'default' : 'secondary'}>
                        {selectedName.popularity === 'high' ? 'بالا' : selectedName.popularity === 'medium' ? 'متوسط' : 'کم'}
                      </Badge>
                    </div>
                  )}

                  {selectedName.region && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-persian-primary">منطقه</h4>
                      <p className="text-muted-foreground">{selectedName.region}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};