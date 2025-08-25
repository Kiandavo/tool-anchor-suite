import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Crown, Sword, Heart, Star, Users, Map, BookOpen, Globe } from "lucide-react";

interface ShahnameStory {
  id: string;
  title: string;
  titleEn: string;
  character: string;
  era: 'Pishdadian' | 'Kayanian' | 'Sassanian';
  theme: 'heroism' | 'love' | 'wisdom' | 'tragedy' | 'victory' | 'justice';
  summary: string;
  summaryEn: string;
  moralLesson: string;
  moralLessonEn: string;
  keyCharacters: string[];
  significance: string;
  significanceEn: string;
}

const shahnameStories: ShahnameStory[] = [
  {
    id: "rostam-sohrab",
    title: "رستم و سهراب",
    titleEn: "Rostam and Sohrab",
    character: "رستم",
    era: "Kayanian",
    theme: "tragedy",
    summary: "داستان غم‌انگیز پدر و پسری که در نبرد، یکدیگر را نمی‌شناسند و سهراب به دست پدرش رستم کشته می‌شود.",
    summaryEn: "The tragic story of father and son who don't recognize each other in battle, and Sohrab is killed by his father Rostam.",
    moralLesson: "عجله و خشم در تصمیم‌گیری می‌تواند به فاجعه منجر شود. شناخت و گفتگو پیش از اقدام ضروری است.",
    moralLessonEn: "Haste and anger in decision-making can lead to tragedy. Recognition and dialogue before action are essential.",
    keyCharacters: ["رستم", "سهراب", "تهمینه", "افراسیاب"],
    significance: "این داستان نماد عواقب جنگ و اهمیت صلح و تفاهم است.",
    significanceEn: "This story symbolizes the consequences of war and the importance of peace and understanding."
  },
  {
    id: "siavash",
    title: "سیاوش پاک‌نهاد",
    titleEn: "Pure Siavash",
    character: "سیاوش",
    era: "Kayanian",
    theme: "justice",
    summary: "داستان شاهزاده پاک‌نهادی که به خاطر پاکدامنی و عدالت‌خواهی جان خود را از دست می‌دهد.",
    summaryEn: "The story of a pure prince who loses his life because of his chastity and pursuit of justice.",
    moralLesson: "پاکدامنی و راستگویی ارزشمندترین صفات انسانی است، حتی اگر گران تمام شود.",
    moralLessonEn: "Chastity and truthfulness are the most valuable human qualities, even if they come at a high cost.",
    keyCharacters: ["سیاوش", "کیکاووس", "سودابه", "افراسیاب"],
    significance: "نماد پاکی، عدالت و مقاومت در برابر فساد است.",
    significanceEn: "Symbol of purity, justice, and resistance against corruption."
  },
  {
    id: "zal-rudaba",
    title: "زال و رودابه",
    titleEn: "Zal and Rudaba",
    character: "زال",
    era: "Pishdadian",
    theme: "love",
    summary: "داستان عشق زال پهلوان با رودابه زیبا که علیرغم مخالفت‌ها به پیوند آنان منجر می‌شود.",
    summaryEn: "The love story of hero Zal and beautiful Rudaba that leads to their union despite opposition.",
    moralLesson: "عشق واقعی موانع را در می‌نوردد و صبر و استقامت پاداش دارد.",
    moralLessonEn: "True love overcomes obstacles and patience and perseverance are rewarded.",
    keyCharacters: ["زال", "رودابه", "سام", "سیندخت"],
    significance: "نخستین داستان عاشقانه شاهنامه و نماد عشق پاک است.",
    significanceEn: "The first romantic story in Shahnameh and symbol of pure love."
  },
  {
    id: "fereydoun",
    title: "فریدون عادل",
    titleEn: "Just Fereydoun",
    character: "فریدون",
    era: "Pishdadian",
    theme: "justice",
    summary: "داستان پادشاه عادلی که ضحاک ستمگر را شکست داد و عدالت را در جهان برقرار کرد.",
    summaryEn: "The story of a just king who defeated the tyrant Zahhak and established justice in the world.",
    moralLesson: "عدالت بر ستم پیروز می‌شود و صبر و مقاومت در برابر ظلم ثمربخش است.",
    moralLessonEn: "Justice triumphs over tyranny and patience and resistance against oppression bear fruit.",
    keyCharacters: ["فریدون", "ضحاک", "کاوه", "فرانک"],
    significance: "نماد مبارزه با ستم و برقراری عدالت است.",
    significanceEn: "Symbol of fighting tyranny and establishing justice."
  },
  {
    id: "esfandiar",
    title: "اسفندیار پهلوان",
    titleEn: "Hero Esfandiar",
    character: "اسفندیار",
    era: "Kayanian",
    theme: "heroism",
    summary: "داستان شاهزاده‌ای که هفت خان را پشت سر گذاشت و در نبرد با رستم کشته شد.",
    summaryEn: "The story of a prince who passed seven trials and was killed in battle with Rostam.",
    moralLesson: "شجاعت و قدرت باید با حکمت همراه باشد تا به فاجعه منجر نشود.",
    moralLessonEn: "Courage and power must be accompanied by wisdom to avoid tragedy.",
    keyCharacters: ["اسفندیار", "رستم", "گشتاسپ", "زال"],
    significance: "نماد شجاعت و فداکاری برای وطن است.",
    significanceEn: "Symbol of courage and sacrifice for homeland."
  },
  {
    id: "bizhan-manijeh",
    title: "بیژن و منیژه",
    titleEn: "Bizhan and Manijeh",
    character: "بیژن",
    era: "Kayanian",
    theme: "love",
    summary: "داستان عشق بیژن پهلوان ایرانی با منیژه دختر افراسیاب و نجات او توسط رستم.",
    summaryEn: "The love story of Iranian hero Bizhan with Manijeh, daughter of Afrasiab, and his rescue by Rostam.",
    moralLesson: "دوستی و وفاداری در سختی‌ها آزمایش می‌شود و یاران راستین کمیاب‌اند.",
    moralLessonEn: "Friendship and loyalty are tested in hardships and true friends are rare.",
    keyCharacters: ["بیژن", "منیژه", "رستم", "افراسیاب"],
    significance: "نماد عشق فراتر از مرزها و اهمیت دوستی است.",
    significanceEn: "Symbol of love beyond borders and the importance of friendship."
  }
];

const ShahnameStories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<ShahnameStory | null>(null);
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const filteredStories = shahnameStories.filter(story => {
    const eraMatch = selectedEra === 'all' || story.era === selectedEra;
    const themeMatch = selectedTheme === 'all' || story.theme === selectedTheme;
    return eraMatch && themeMatch;
  });

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'heroism': return <Sword className="w-4 h-4" />;
      case 'love': return <Heart className="w-4 h-4" />;
      case 'wisdom': return <BookOpen className="w-4 h-4" />;
      case 'tragedy': return <Star className="w-4 h-4" />;
      case 'victory': return <Crown className="w-4 h-4" />;
      case 'justice': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'heroism': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'love': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'wisdom': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'tragedy': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'victory': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'justice': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getEraColor = (era: string) => {
    switch (era) {
      case 'Pishdadian': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Kayanian': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'Sassanian': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Crown className="text-amber-600 ml-2" size={28} />
          <h2 className="text-2xl font-bold text-primary">داستان‌های شاهنامه</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          مجموعه‌ای از مشهورترین داستان‌های شاهنامه فردوسی با ترجمه انگلیسی و تفسیر اخلاقی
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex items-center gap-2">
          <Map className="text-muted-foreground" size={16} />
          <select 
            value={selectedEra} 
            onChange={(e) => setSelectedEra(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">همه دوره‌ها</option>
            <option value="Pishdadian">پیشدادیان</option>
            <option value="Kayanian">کیانیان</option>
            <option value="Sassanian">ساسانیان</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="text-muted-foreground" size={16} />
          <select 
            value={selectedTheme} 
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">همه موضوعات</option>
            <option value="heroism">پهلوانی</option>
            <option value="love">عاشقانه</option>
            <option value="wisdom">حکمت</option>
            <option value="tragedy">تراژدی</option>
            <option value="victory">پیروزی</option>
            <option value="justice">عدالت</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <Card 
            key={story.id} 
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-amber-500"
            onClick={() => setSelectedStory(story)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getEraColor(story.era)}>
                  {story.era === 'Pishdadian' && 'پیشدادیان'}
                  {story.era === 'Kayanian' && 'کیانیان'}
                  {story.era === 'Sassanian' && 'ساسانیان'}
                </Badge>
                <Badge className={getThemeColor(story.theme)}>
                  <div className="flex items-center gap-1">
                    {getThemeIcon(story.theme)}
                    {story.theme === 'heroism' && 'پهلوانی'}
                    {story.theme === 'love' && 'عاشقانه'}
                    {story.theme === 'wisdom' && 'حکمت'}
                    {story.theme === 'tragedy' && 'تراژدی'}
                    {story.theme === 'victory' && 'پیروزی'}
                    {story.theme === 'justice' && 'عدالت'}
                  </div>
                </Badge>
              </div>
              <CardTitle className="text-lg text-right">{story.title}</CardTitle>
              <p className="text-sm text-muted-foreground text-left italic">{story.titleEn}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed text-right mb-3">
                {story.summary.substring(0, 120)}...
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Crown size={12} className="ml-1" />
                <span>شخصیت اصلی: {story.character}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedStory(null)}>
          <Card className="max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-right mb-1">{selectedStory.title}</CardTitle>
                  <p className="text-muted-foreground text-left italic">{selectedStory.titleEn}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedStory(null)}>✕</Button>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge className={getEraColor(selectedStory.era)}>
                  {selectedStory.era === 'Pishdadian' && 'پیشدادیان'}
                  {selectedStory.era === 'Kayanian' && 'کیانیان'}
                  {selectedStory.era === 'Sassanian' && 'ساسانیان'}
                </Badge>
                <Badge className={getThemeColor(selectedStory.theme)}>
                  <div className="flex items-center gap-1">
                    {getThemeIcon(selectedStory.theme)}
                    {selectedStory.theme === 'heroism' && 'پهلوانی'}
                    {selectedStory.theme === 'love' && 'عاشقانه'}
                    {selectedStory.theme === 'wisdom' && 'حکمت'}
                    {selectedStory.theme === 'tragedy' && 'تراژدی'}
                    {selectedStory.theme === 'victory' && 'پیروزی'}
                    {selectedStory.theme === 'justice' && 'عدالت'}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs defaultValue="persian" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="persian">فارسی</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
                </TabsList>
                
                <TabsContent value="persian" className="space-y-6 text-right">
                  <div>
                    <h3 className="font-bold text-primary mb-2 flex items-center">
                      <BookOpen className="ml-2" size={18} />
                      خلاصه داستان
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedStory.summary}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <Heart className="ml-2" size={18} />
                      درس اخلاقی
                    </h3>
                    <p className="text-green-600 dark:text-green-300 leading-relaxed">{selectedStory.moralLesson}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                      <Star className="ml-2" size={18} />
                      اهمیت فرهنگی
                    </h3>
                    <p className="text-blue-600 dark:text-blue-300 leading-relaxed">{selectedStory.significance}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2 flex items-center">
                      <Users className="ml-2" size={18} />
                      شخصیت‌های کلیدی
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.keyCharacters.map((character, index) => (
                        <Badge key={index} variant="outline" className="text-purple-600 border-purple-300">
                          {character}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="english" className="space-y-6 text-left">
                  <div>
                    <h3 className="font-bold text-primary mb-2 flex items-center">
                      <BookOpen className="mr-2" size={18} />
                      Story Summary
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedStory.summaryEn}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <Heart className="mr-2" size={18} />
                      Moral Lesson
                    </h3>
                    <p className="text-green-600 dark:text-green-300 leading-relaxed">{selectedStory.moralLessonEn}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                      <Star className="mr-2" size={18} />
                      Cultural Significance
                    </h3>
                    <p className="text-blue-600 dark:text-blue-300 leading-relaxed">{selectedStory.significanceEn}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2 flex items-center">
                      <Users className="mr-2" size={18} />
                      Key Characters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.keyCharacters.map((character, index) => (
                        <Badge key={index} variant="outline" className="text-purple-600 border-purple-300">
                          {character}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShahnameStories;