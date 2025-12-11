import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Copy, 
  BookOpen, 
  Sparkles, 
  Heart,
  Brain,
  Scale,
  Clock,
  ThumbsUp,
  Flower2,
  TreeDeciduous,
  Quote,
  BookHeart,
  Eye
} from "lucide-react";

import { useSaadiReading } from '@/hooks/useSaadiReading';
import { SaadiPoem, themeLabels, sourceLabels } from '@/data/poetry/saadiPoetry';
import { 
  RosePattern, 
  FloatingRosePetals, 
  PersianBorder, 
  MeditationCircle,
  SaadiBookIcon 
} from './saadi/SaadiGraphics';
import { EnhancedReadingWrapper } from '@/components/readings/EnhancedReadingWrapper';
import { TutorialStep } from '@/components/readings/TutorialSystem';
import { copyToClipboard } from '@/utils/randomUtils';
import { useToast } from '@/hooks/use-toast';

// Theme icons mapping
const themeIcons: Record<SaadiPoem['theme'], React.ReactNode> = {
  love: <Heart className="w-4 h-4" />,
  wisdom: <Brain className="w-4 h-4" />,
  morality: <Scale className="w-4 h-4" />,
  life: <Sparkles className="w-4 h-4" />,
  patience: <Clock className="w-4 h-4" />,
  justice: <Scale className="w-4 h-4" />,
  gratitude: <ThumbsUp className="w-4 h-4" />,
  humility: <Flower2 className="w-4 h-4" />,
};

// Source icons mapping
const sourceIcons: Record<SaadiPoem['source'], React.ReactNode> = {
  gulistan: <Flower2 className="w-4 h-4" />,
  bustan: <TreeDeciduous className="w-4 h-4" />,
  ghazaliyat: <Heart className="w-4 h-4" />,
  qasaid: <Quote className="w-4 h-4" />,
};

export const SaadiOracle: React.FC = () => {
  const {
    poem,
    intention,
    drawingMethod,
    selectedTheme,
    selectedSource,
    isLoading,
    viewMode,
    isMeditating,
    setIntention,
    setDrawingMethod,
    setSelectedTheme,
    setSelectedSource,
    setViewMode,
    getNewPoem,
    resetReading,
  } = useSaadiReading();

  const { toast } = useToast();

  // Generate reading data for export
  const readingData = poem ? {
    title: 'پیام از سعدی',
    content: `${intention ? `نیت: ${intention}\n\n` : ''}${poem.title}\n\n${poem.text}\n\n${poem.interpretation}\n\nپند: ${poem.advice}`,
    timestamp: new Date(),
    type: 'saadi',
    metadata: { method: drawingMethod, theme: poem.theme, source: poem.source }
  } : undefined;

  // Generate narration text
  const narrationText = poem ? `
    پیام از سعدی. ${poem.title}.
    ${poem.text.replace(/\n/g, '. ')}
    تفسیر: ${poem.interpretation}
    پند سعدی: ${poem.advice}
  ` : undefined;

  // Tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      target: '#intention-setting',
      title: 'نیت خود را تعیین کنید',
      description: 'سوال یا نگرانی خود را بنویسید تا سعدی پاسخ دهد',
      position: 'bottom'
    },
    {
      target: '#drawing-methods',
      title: 'روش انتخاب',
      description: 'می‌توانید از گلستان، بوستان یا بر اساس موضوع پیام دریافت کنید',
      position: 'bottom'
    },
  ];

  const copyFortune = () => {
    if (!poem) return;

    const fullText = `
پیام از سعدی 🌹
${intention ? `\n💭 نیت: ${intention}\n` : ''}
━━━━━━━━━━━━━━━━━━
📖 ${poem.title}
از ${sourceLabels[poem.source]}

${poem.text}

━━━━━━━━━━━━━━━━━━
✨ تفسیر:
${poem.interpretation}

💡 پند سعدی:
${poem.advice}

🔮 معنای عمیق:
${poem.deepMeaning}
━━━━━━━━━━━━━━━━━━
    `.trim();

    copyToClipboard(fullText);
    toast({
      title: 'کپی شد',
      description: 'پیام سعدی کپی شد',
    });
  };

  return (
    <EnhancedReadingWrapper
      readingType="saadi"
      readingData={readingData}
      narrationText={narrationText}
      elementId="saadi-reading-content"
      tutorialSteps={tutorialSteps}
      isLoading={isLoading}
      loadingType="stars"
    >
      {/* Meditation overlay */}
      <AnimatePresence>
        <MeditationCircle isActive={isMeditating} />
      </AnimatePresence>
      
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-amber-200/50 shadow-xl">
        {/* Decorative elements */}
        <RosePattern />
        <FloatingRosePetals />
        <PersianBorder />
        
        <CardHeader className="relative text-center pb-2 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookHeart className="text-amber-700" size={20} />
            <h2 className="text-xl font-heading font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              پیام از سعدی
            </h2>
          </div>
          <p className="text-sm text-amber-700/70 font-body">
            حکمت و راهنمایی از استاد سخن پارسی
          </p>
        </CardHeader>
        
        <CardContent className="pt-3 px-4 space-y-4" id="saadi-reading-content">
          {/* Intention Setting */}
          <div id="intention-setting" className="space-y-2">
            <label className="text-sm font-medium text-amber-800 flex items-center gap-2">
              <Eye size={14} />
              نیت خود را بنویسید
            </label>
            <Textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="سوال یا نگرانی خود را اینجا بنویسید..."
              className="bg-white/70 border-amber-200 focus:border-amber-400 resize-none h-20 text-right font-body"
              dir="rtl"
            />
          </div>

          {/* Drawing Method Selector */}
          <div id="drawing-methods" className="space-y-3">
            <label className="text-sm font-medium text-amber-800">روش دریافت پیام</label>
            
            <Tabs value={drawingMethod} onValueChange={(v) => setDrawingMethod(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-amber-100/50">
                <TabsTrigger value="random" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  تصادفی
                </TabsTrigger>
                <TabsTrigger value="source" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  کتاب
                </TabsTrigger>
                <TabsTrigger value="theme" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  موضوع
                </TabsTrigger>
                <TabsTrigger value="meditation" className="text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  مراقبه
                </TabsTrigger>
              </TabsList>
              
              {/* Source Selection */}
              <TabsContent value="source" className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(sourceLabels) as SaadiPoem['source'][]).map((source) => (
                    <motion.button
                      key={source}
                      onClick={() => setSelectedSource(source)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        selectedSource === source
                          ? 'border-amber-500 bg-amber-100'
                          : 'border-amber-200 bg-white/50 hover:border-amber-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SaadiBookIcon source={source} />
                      <span className="text-sm font-medium text-amber-800">{sourceLabels[source]}</span>
                    </motion.button>
                  ))}
                </div>
              </TabsContent>
              
              {/* Theme Selection */}
              <TabsContent value="theme" className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(themeLabels) as SaadiPoem['theme'][]).map((theme) => (
                    <motion.button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        selectedTheme === theme
                          ? 'border-amber-500 bg-amber-100'
                          : 'border-amber-200 bg-white/50 hover:border-amber-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {themeIcons[theme]}
                      <span className="text-xs font-medium text-amber-800">{themeLabels[theme]}</span>
                    </motion.button>
                  ))}
                </div>
              </TabsContent>
              
              {/* Meditation Info */}
              <TabsContent value="meditation" className="mt-3">
                <div className="bg-emerald-50/80 rounded-lg p-4 border border-emerald-200">
                  <p className="text-sm text-emerald-800 text-center font-body leading-relaxed">
                    در این روش، ابتدا لحظاتی برای آرامش و تمرکز به شما داده می‌شود.
                    چشم‌ها را ببندید، نیت کنید و سپس پیام سعدی را دریافت نمایید.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Poem Display */}
          <AnimatePresence mode="wait">
            {poem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* View Mode Tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="normal">نمایش عادی</TabsTrigger>
                    <TabsTrigger value="calligraphy">خوشنویسی</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="normal" className="space-y-4 mt-4">
                    {/* Poem Card */}
                    <Card className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg">
                      <CardContent className="pt-4">
                        {/* Title and Source */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-heading font-bold text-amber-800">
                            {poem.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                              {sourceIcons[poem.source]}
                              <span className="mr-1">{sourceLabels[poem.source]}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        {poem.chapter && (
                          <p className="text-xs text-amber-600/70 mb-3">{poem.chapter}</p>
                        )}
                        
                        {/* Poem Text */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                          <p className="text-amber-900 font-body text-base leading-loose whitespace-pre-line text-center">
                            {poem.text}
                          </p>
                        </div>
                        
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                          {poem.keywords.map((keyword, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-rose-50 text-rose-700 border-rose-200"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Interpretation */}
                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/50">
                      <CardContent className="pt-4">
                        <h4 className="text-sm font-heading font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                          <Sparkles size={14} />
                          تفسیر فال شما
                        </h4>
                        <p className="text-sm text-emerald-700 font-body leading-relaxed">
                          {poem.interpretation}
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Advice */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
                      <CardContent className="pt-4">
                        <h4 className="text-sm font-heading font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <Brain size={14} />
                          پند سعدی
                        </h4>
                        <p className="text-sm text-blue-700 font-body leading-relaxed">
                          {poem.advice}
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Deep Meaning */}
                    <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50">
                      <CardContent className="pt-4">
                        <h4 className="text-sm font-heading font-semibold text-purple-800 mb-2 flex items-center gap-2">
                          <BookOpen size={14} />
                          معنای عمیق
                        </h4>
                        <p className="text-sm text-purple-700 font-body leading-relaxed">
                          {poem.deepMeaning}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="calligraphy" className="mt-4">
                    <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300">
                      <CardContent className="pt-6 pb-8">
                        <div className="relative">
                          <PersianBorder className="opacity-40" />
                          <div className="py-8 px-4">
                            <p className="text-amber-900 text-xl font-heading leading-loose whitespace-pre-line text-center" style={{ fontFamily: 'Nastaliq, serif' }}>
                              {poem.text}
                            </p>
                            <p className="text-amber-700/70 text-sm text-center mt-6 font-body">
                              — سعدی شیرازی —
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-4 pb-4 bg-gradient-to-t from-amber-100/50">
          <Button 
            onClick={getNewPoem} 
            disabled={isLoading || (drawingMethod === 'theme' && !selectedTheme) || (drawingMethod === 'source' && !selectedSource)}
            size="sm" 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
          >
            {isLoading ? (
              <RefreshCw className="animate-spin ml-2" size={14} />
            ) : (
              <BookHeart className="ml-2" size={14} />
            )}
            {poem ? 'پیام جدید' : 'دریافت پیام'}
          </Button>
          
          {poem && (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={copyFortune} 
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Copy size={14} className="ml-2" />
                کپی
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={resetReading} 
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <RefreshCw size={14} className="ml-2" />
                شروع مجدد
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </EnhancedReadingWrapper>
  );
};

export default SaadiOracle;
