import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { RefreshCw, Copy, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useHafezReading } from '@/hooks/useHafezReading';
import { IntentionSetting } from './fal/hafez/IntentionSetting';
import { DrawingMethods } from './fal/hafez/DrawingMethods';
import { EmotionSelector } from './fal/hafez/EmotionSelector';
import { PoemAnalysis } from './fal/hafez/PoemAnalysis';
import { CalligraphyView } from './fal/hafez/CalligraphyView';
import { HafezGuide } from './fal/hafez/HafezGuide';
import { HafezCalligraphyPattern, FloatingPersianLetters } from './fal/graphics/HafezGraphics';
import { EnhancedReadingWrapper } from '@/components/readings/EnhancedReadingWrapper';
import { TutorialStep } from '@/components/readings/TutorialSystem';
import { copyToClipboard } from '@/utils/randomUtils';
import { useToast } from '@/hooks/use-toast';

export const HafezFortune = () => {
  const {
    poem,
    intention,
    drawingMethod,
    emotionFilter,
    isLoading,
    calligraphyStyle,
    viewMode,
    setIntention,
    setDrawingMethod,
    setEmotionFilter,
    setCalligraphyStyle,
    setViewMode,
    getRandomPoem,
    resetReading,
  } = useHafezReading();

  const { toast } = useToast();

  // Generate reading data for export
  const readingData = poem ? {
    title: 'فال حافظ',
    content: `${intention ? `نیت: ${intention}\n\n` : ''}${poem.title}\n\n${poem.text}\n\n${poem.interpretation}`,
    timestamp: new Date(),
    type: 'hafez',
    metadata: { method: drawingMethod, emotion: emotionFilter }
  } : undefined;

  // Generate narration text
  const narrationText = poem ? `
    فال حافظ. ${poem.title}.
    ${poem.text.replace(/\n/g, '. ')}
    تفسیر: ${poem.interpretation}
  ` : undefined;

  // Tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      target: '#intention-setting',
      title: 'نیت خود را تعیین کنید',
      description: 'برای دریافت پاسخ دقیق‌تر، سوال یا نیت خود را بنویسید',
      position: 'bottom'
    },
    {
      target: '#drawing-methods',
      title: 'روش انتخاب',
      description: 'می‌توانید روش انتخاب غزل را مشخص کنید',
      position: 'bottom'
    },
  ];

  const copyFortune = () => {
    if (!poem) return;

    const fullText = `
فال حافظ 🌟
${intention ? `\n💭 نیت: ${intention}\n` : ''}
━━━━━━━━━━━━━━━━━━
${poem.title}

${poem.text}

━━━━━━━━━━━━━━━━━━
📖 تفسیر:
${poem.interpretation}
━━━━━━━━━━━━━━━━━━
    `.trim();

    copyToClipboard(fullText);
    toast({
      title: 'کپی شد',
      description: 'فال حافظ کپی شد',
    });
  };

  return (
    <EnhancedReadingWrapper
      readingType="hafez"
      readingData={readingData}
      narrationText={narrationText}
      elementId="hafez-reading-content"
      tutorialSteps={tutorialSteps}
      isLoading={isLoading}
      loadingType="moon"
    >
      <Card className="fortune-card-enhanced fortune-card-hafez">
        {/* Enhanced Hafez graphics */}
        <HafezCalligraphyPattern />
        <FloatingPersianLetters />
        
        <CardHeader className="fortune-header fortune-header-hafez text-center pb-2 py-2 relative">
          <div className="icon-text justify-center">
            <BookOpen className="text-amber-800" size={16} />
            <h2 className="text-sm font-bold text-amber-800 icon-text-sm">
              فال حافظ
            </h2>
          </div>
          <HafezGuide />
        </CardHeader>
        
        <CardContent className="pt-3 px-3" id="hafez-reading-content">
          <div className="space-y-3">
            {/* Intention Setting */}
            <div id="intention-setting">
              <IntentionSetting
                intention={intention}
                onChange={setIntention}
                onSubmit={getRandomPoem}
              />
            </div>

            {/* Drawing Method Selector */}
            <div id="drawing-methods">
              <DrawingMethods
                method={drawingMethod}
                onChange={setDrawingMethod}
              />
            </div>

            {/* Emotion Selector (if emotion method selected) */}
            {drawingMethod === 'emotion' && (
              <EmotionSelector
                selected={emotionFilter}
                onChange={setEmotionFilter}
              />
            )}

            {/* Poem Display */}
            {poem && (
              <div className="space-y-3">
                {/* View Mode Tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'normal' | 'calligraphy')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="normal">نمایش عادی</TabsTrigger>
                    <TabsTrigger value="calligraphy">خوشنویسی</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="normal" className="space-y-3">
                    <PoemAnalysis
                      poem={poem}
                      intention={intention}
                      highlightKeywords={true}
                    />
                    
                    {/* Original Interpretation */}
                    <Card className="bg-white/80 backdrop-blur-sm border-[#5c3f14]/20">
                      <CardContent className="pt-4">
                        <h3 className="text-sm font-semibold text-[#5c3f14] mb-2">تفسیر:</h3>
                        <p className="text-sm text-[#5c3f14]/80 leading-relaxed">{poem.interpretation}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="calligraphy">
                    <CalligraphyView
                      text={poem.text}
                      style={calligraphyStyle}
                      onStyleChange={setCalligraphyStyle}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white border-t border-[#e6c8b0]/20">
          <Button 
            onClick={getRandomPoem} 
            disabled={isLoading || (drawingMethod === 'emotion' && !emotionFilter)}
            size="sm" 
            className="fortune-button-primary fortune-button-hafez text-[10px] h-7 px-3"
          >
            <span className="icon-text-sm relative z-10">
              {isLoading ? 
                <RefreshCw className="animate-spin" size={12} /> : 
                <BookOpen size={12} />
              }
              {poem ? 'غزل جدید' : 'فال بگیر'}
            </span>
          </Button>
          
          {poem && (
            <>
              <Button 
                variant="outline"
                size="sm"
                onClick={copyFortune} 
                className="border-amber-300 text-amber-700 text-[10px] h-7 px-3 hover:bg-amber-50 backdrop-blur-sm bg-white/50"
              >
                <span className="icon-text-sm">
                  <Copy size={12} />
                  کپی فال
                </span>
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={resetReading} 
                className="border-amber-300 text-amber-700 text-[10px] h-7 px-3 hover:bg-amber-50 backdrop-blur-sm bg-white/50"
              >
                <span className="icon-text-sm">
                  <RefreshCw size={12} />
                  شروع مجدد
                </span>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </EnhancedReadingWrapper>
  );
};
