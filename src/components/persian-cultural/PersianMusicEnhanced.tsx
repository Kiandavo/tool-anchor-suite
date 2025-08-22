import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, Search, Music, Info, Users } from 'lucide-react';
import { persianInstruments, getInstrumentsByCategory, searchInstruments } from '@/data/persian-instruments-comprehensive';

export const PersianMusicEnhanced: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(persianInstruments[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredInstruments = selectedCategory === 'all' 
    ? persianInstruments.filter(instrument => 
        searchTerm === '' || 
        instrument.nameFarsi.includes(searchTerm) ||
        instrument.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instrument.description.includes(searchTerm)
      )
    : getInstrumentsByCategory(selectedCategory).filter(instrument => 
        searchTerm === '' || 
        instrument.nameFarsi.includes(searchTerm) ||
        instrument.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instrument.description.includes(searchTerm)
      );

  const categories = [
    { id: 'all', name: 'همه سازها', nameEn: 'All Instruments' },
    { id: 'string', name: 'سازهای زهی', nameEn: 'String Instruments' },
    { id: 'wind', name: 'سازهای بادی', nameEn: 'Wind Instruments' },
    { id: 'percussion', name: 'سازهای کوبه‌ای', nameEn: 'Percussion Instruments' }
  ];

  const handlePlayAudio = () => {
    if (!selectedInstrument.audioSample) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = selectedInstrument.audioSample;
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  const getCategoryBadge = (category: string) => {
    const styles = {
      string: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      wind: 'bg-blue-100 text-blue-800 border-blue-200',
      percussion: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    
    const names = {
      string: 'زهی',
      wind: 'بادی',
      percussion: 'کوبه‌ای'
    };

    return (
      <Badge className={styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-800'}>
        {names[category as keyof typeof names] || category}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-persian-primary/5 via-persian-accent/5 to-persian-secondary/5">
      <audio ref={audioRef} />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <Music className="w-8 h-8 text-persian-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-persian-primary to-persian-accent bg-clip-text text-transparent">
              موسیقی ایرانی
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            آشنایی با سازهای سنتی ایرانی، تاریخ و فرهنگ موسیقی کهن فارس
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="جستجو در سازها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instruments List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-right">فهرست سازها</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredInstruments.map((instrument) => (
                <Card 
                  key={instrument.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedInstrument.id === instrument.id 
                      ? 'ring-2 ring-persian-primary bg-persian-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedInstrument(instrument)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <h3 className="font-bold text-lg">{instrument.nameFarsi}</h3>
                        <p className="text-sm text-muted-foreground">{instrument.nameEnglish}</p>
                        <p className="text-xs text-muted-foreground mt-1">{instrument.region}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getCategoryBadge(instrument.category)}
                        {instrument.audioSample && (
                          <Volume2 className="w-4 h-4 text-persian-accent" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Instrument Details */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="text-right">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getCategoryBadge(selectedInstrument.category)}
                    {selectedInstrument.audioSample && (
                      <Button
                        onClick={handlePlayAudio}
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isPlaying ? 'توقف' : 'پخش نمونه'}</span>
                      </Button>
                    )}
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-2xl">{selectedInstrument.nameFarsi}</CardTitle>
                    <p className="text-muted-foreground">{selectedInstrument.nameEnglish}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="description">توضیحات</TabsTrigger>
                    <TabsTrigger value="history">تاریخچه</TabsTrigger>
                    <TabsTrigger value="technique">نحوه نواختن</TabsTrigger>
                    <TabsTrigger value="details">جزئیات</TabsTrigger>
                    <TabsTrigger value="artists">هنرمندان</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="space-y-4 text-right">
                    <div>
                      <h4 className="font-bold mb-2 flex items-center">
                        <Info className="w-4 h-4 ml-2" />
                        توضیحات
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedInstrument.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">ویژگی‌های صوتی</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedInstrument.soundCharacteristics}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="space-y-4 text-right">
                    <div>
                      <h4 className="font-bold mb-2">تاریخچه</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedInstrument.history}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technique" className="space-y-4 text-right">
                    <div>
                      <h4 className="font-bold mb-2">نحوه نواختن</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedInstrument.playingTechnique}
                      </p>
                    </div>
                    {selectedInstrument.tuning && (
                      <div>
                        <h4 className="font-bold mb-2">کوک</h4>
                        <p className="text-muted-foreground font-mono">
                          {selectedInstrument.tuning}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4 text-right">
                    <div>
                      <h4 className="font-bold mb-2">منطقه</h4>
                      <p className="text-muted-foreground">{selectedInstrument.region}</p>
                    </div>
                    {selectedInstrument.materials && (
                      <div>
                        <h4 className="font-bold mb-2">مواد ساخت</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInstrument.materials.map((material, index) => (
                            <Badge key={index} variant="secondary">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedInstrument.relatedInstruments && (
                      <div>
                        <h4 className="font-bold mb-2">سازهای مرتبط</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInstrument.relatedInstruments.map((related, index) => (
                            <Badge key={index} variant="outline">
                              {related}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="artists" className="space-y-4 text-right">
                    {selectedInstrument.famousPlayers && (
                      <div>
                        <h4 className="font-bold mb-2 flex items-center">
                          <Users className="w-4 h-4 ml-2" />
                          هنرمندان مشهور
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedInstrument.famousPlayers.map((player, index) => (
                            <Card key={index} className="p-3">
                              <p className="text-center font-medium">{player}</p>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};