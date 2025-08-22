import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Clock, Camera, Building2, Mountain, Star, ZoomIn, Heart, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  architecturalSites, 
  architecturalPeriods,
  getArchitecturalSitesByPeriod,
  searchArchitecturalSites 
} from '@/data/persian-architecture-comprehensive';

// Import images
import persepolisImg from '@/assets/persepolis.jpg';
import naqshJahanImg from '@/assets/naqsh-jahan-square.jpg';
import pasargadaeImg from '@/assets/pasargadae.jpg';
import golestanImg from '@/assets/golestan-palace.jpg';
import soltaniyehImg from '@/assets/soltaniyeh.jpg';
import choghaZanbilImg from '@/assets/chogha-zanbil.jpg';

const imageMap: Record<string, string> = {
  'persepolis': persepolisImg,
  'isfahan-square': naqshJahanImg,
  'pasargadae': pasargadaeImg,
  'golestan-palace': golestanImg,
  'soltaniyeh': soltaniyehImg,
  'chogha-zanbil': choghaZanbilImg,
};

export function PersianArchitectureEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [imageView, setImageView] = useState<string | null>(null);

  const filteredSites = searchTerm 
    ? searchArchitecturalSites(searchTerm) 
    : selectedPeriod === 'all' 
      ? architecturalSites 
      : getArchitecturalSitesByPeriod(selectedPeriod);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNESCO':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">🏛️ میراث جهانی یونسکو</Badge>;
      case 'National':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">🇮🇷 میراث ملی</Badge>;
      case 'Regional':
        return <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">🏛️ میراث منطقه‌ای</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const toggleFavorite = (siteId: string) => {
    setFavorites(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const getPeriodColor = (period: string) => {
    const colors: Record<string, string> = {
      'هخامنشی': 'from-amber-500 to-yellow-500',
      'صفوی': 'from-blue-500 to-indigo-500', 
      'قاجار': 'from-purple-500 to-pink-500',
      'ایلخانی': 'from-green-500 to-teal-500',
      'عیلامی': 'from-red-500 to-orange-500',
      'ساسانی': 'from-gray-500 to-slate-500',
    };
    return colors[period] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-primary-glow to-secondary p-8 text-white">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-3 text-3xl md:text-4xl font-bold">
              <Building2 size={40} />
              معماری ایران باستان
            </CardTitle>
            <p className="text-white/90 text-lg mt-4 leading-relaxed">
              سفری در میان شاهکارهای معماری ایران از دوران باستان تا دوره‌های اسلامی
            </p>
          </CardHeader>
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="جستجو در بناهای تاریخی، شهرها، دوره‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 h-12 text-lg"
          />
        </div>
        <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
          {filteredSites.length} بنای تاریخی یافت شد
        </div>
      </div>

      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="space-y-6">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full h-auto p-1">
          {architecturalPeriods.map((period) => {
            const count = period.id === 'all' 
              ? architecturalSites.length 
              : architecturalSites.filter(site => site.period === period.id).length;
            
            return (
              <TabsTrigger 
                key={period.id} 
                value={period.id} 
                className="flex flex-col gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <span className="font-medium">{period.name}</span>
                <span className="text-xs opacity-70">({count})</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <Card 
                key={site.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                onClick={() => setSelectedSite(site)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={imageMap[site.id] || `https://images.unsplash.com/photo-1588666209969-9bdc1b6e7c47?w=800&h=600&fit=crop`}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${getPeriodColor(site.period)} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {getStatusBadge(site.status)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 left-3 bg-white/20 hover:bg-white/30 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(site.id);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(site.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {site.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">{site.englishName}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={`bg-gradient-to-r ${getPeriodColor(site.period)} text-white border-0`}>
                      {site.period}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{site.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{site.yearBuilt}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {site.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedSite && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-background/95 backdrop-blur-sm">
          <CardHeader className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-foreground">
                  {selectedSite.name}
                </CardTitle>
                <p className="text-muted-foreground text-lg">{selectedSite.englishName}</p>
                <div className="flex gap-3">
                  {getStatusBadge(selectedSite.status)}
                  <Badge variant="outline" className={`bg-gradient-to-r ${getPeriodColor(selectedSite.period)} text-white border-0`}>
                    {selectedSite.period}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedSite.id)}>
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedSite.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" onClick={() => setSelectedSite(null)}>
                  ✕
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 p-8">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <img 
                src={imageMap[selectedSite.id] || `https://images.unsplash.com/photo-1588666209969-9bdc1b6e7c47?w=1200&h=600&fit=crop`}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
                onClick={() => setImageView(imageMap[selectedSite.id])}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-primary" />
                  دوره تاریخی
                </h4>
                <Badge className={`bg-gradient-to-r ${getPeriodColor(selectedSite.period)} text-white border-0`}>
                  {selectedSite.period}
                </Badge>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-primary" />
                  موقعیت جغرافیایی
                </h4>
                <p className="text-foreground">{selectedSite.location}</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Star size={18} className="text-primary" />
                  وضعیت حفاظت
                </h4>
                {getStatusBadge(selectedSite.status)}
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h4 className="font-bold text-xl mb-4 text-foreground">شرح تاریخی</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedSite.description}</p>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-xl mb-4 text-foreground">اهمیت و ارزش</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedSite.significance}</p>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-xl mb-4 text-foreground">ویژگی‌های معماری</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedSite.features.map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="justify-center py-2 px-4 text-center">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-6">
              <div className="flex items-center gap-3 text-blue-700 mb-4">
                <Camera size={24} />
                <h4 className="font-bold text-xl">تور مجازی و تصاویر</h4>
              </div>
              <p className="text-blue-600 leading-relaxed mb-4">
                تور مجازی سه‌بعدی این محوطه باستانی و گالری تصاویر با کیفیت بالا به زودی در دسترس خواهد بود.
                شما می‌توانید از نزدیک جزئیات معماری، نقش‌برجسته‌ها و تزیینات این بنای تاریخی را مشاهده کنید.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Camera className="w-4 h-4 ml-2" />
                مشاهده گالری تصاویر
              </Button>
            </Card>
          </CardContent>
        </Card>
      )}

      {imageView && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setImageView(null)}
        >
          <img 
            src={imageView} 
            alt="Zoomed view"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}