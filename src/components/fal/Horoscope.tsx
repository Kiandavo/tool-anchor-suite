import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Star, RefreshCw, Copy, Sparkles } from "lucide-react";

import { useHoroscope } from './horoscope/useHoroscope';
import { HoroscopeGuide } from './horoscope/HoroscopeGuide';
import { ZodiacSelector } from './horoscope/ZodiacSelector';
import { PredictionTypeSelector } from './horoscope/PredictionTypeSelector';
import { PredictionDisplay } from './horoscope/PredictionDisplay';
import { EmptyStateDisplay } from './horoscope/EmptyStateDisplay';
import { ZodiacConstellation, PlanetaryOrbit, ZodiacWheel } from './graphics/HoroscopeGraphics';
import { EnhancedReadingWrapper } from '@/components/readings/EnhancedReadingWrapper';
import { TutorialStep } from '@/components/readings/TutorialSystem';

export const Horoscope = () => {
  const {
    selectedSign,
    setSelectedSign,
    predictionType,
    setPredictionType,
    prediction,
    isAnimating,
    selectedZodiacSymbol,
    getHoroscope,
    copyHoroscope,
    lastRefreshTime
  } = useHoroscope();

  console.log("Horoscope rendering with selectedSign:", selectedSign, "and predictionType:", predictionType);

  // Generate reading data for export
  const readingData = prediction ? {
    title: `طالع ${selectedSign} - ${predictionType}`,
    content: prediction,
    timestamp: new Date(),
    type: 'horoscope',
    metadata: { sign: selectedSign, type: predictionType }
  } : undefined;

  // Generate narration text
  const narrationText = prediction ? `
    طالع ${selectedSign} برای ${predictionType === 'today' ? 'امروز' : predictionType === 'week' ? 'این هفته' : 'این ماه'}.
    ${prediction}
  ` : undefined;

  // Tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      target: '#zodiac-selector',
      title: 'انتخاب ماه تولد',
      description: 'ابتدا ماه تولد خود را انتخاب کنید',
      position: 'bottom'
    },
    {
      target: '#prediction-type-selector',
      title: 'نوع پیش‌بینی',
      description: 'روزانه، هفتگی یا ماهانه را انتخاب کنید',
      position: 'bottom'
    },
  ];

  return (
    <EnhancedReadingWrapper
      readingType="horoscope"
      readingData={readingData}
      narrationText={narrationText}
      elementId="horoscope-content"
      tutorialSteps={tutorialSteps}
      isLoading={isAnimating}
      loadingType="stars"
    >
    <Card className="fortune-card-enhanced fortune-card-horoscope">
      {/* Enhanced astrology graphics */}
      <ZodiacConstellation sign={selectedSign} />
      <PlanetaryOrbit />
      <ZodiacWheel selectedSign={selectedSign} />
      <div className="absolute inset-0 opacity-[0.05] pattern-drift">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c3f14' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="fortune-header fortune-header-horoscope text-center pb-2 py-2 relative">
        <div className="flex items-center justify-between">
          <HoroscopeGuide />
          <div className="flex-1 flex items-center justify-center gap-2">
            <Star className="text-purple-800" size={16} />
            <h2 className="text-sm font-bold text-purple-800">
              طالع بینی
              <Sparkles size={12} className="text-purple-800 inline-block mr-1" />
            </h2>
          </div>
          <div className="w-[70px]"></div> {/* Spacer for balance */}
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3" id="horoscope-content">
        <div className="space-y-3" id="zodiac-selector">
          <div className="bg-white p-3 rounded-lg border border-[#e6c8b0]/20 text-center text-xs text-[#5c3f14] mb-2">
            لطفاً ماه تولد و نوع پیش‌بینی مورد نظر خود را انتخاب کنید
          </div>
          
          <ZodiacSelector 
            selectedSign={selectedSign} 
            onSelectSign={setSelectedSign} 
          />
          </div>
          
          <div id="prediction-type-selector">
          <PredictionTypeSelector
            predictionType={predictionType} 
            onSelectType={setPredictionType} 
          />
          
          {/* Display the zodiac wheel or empty state */}
          {!prediction && (
            <EmptyStateDisplay 
              selectedSign={selectedSign} 
              selectedZodiacSymbol={selectedZodiacSymbol} 
            />
          )}
          
          {/* Display prediction if available */}
          {prediction && (
            <PredictionDisplay 
              prediction={prediction} 
              isAnimating={isAnimating} 
              selectedZodiacSymbol={selectedZodiacSymbol}
              selectedSign={selectedSign}
              key={`prediction-${lastRefreshTime}`} // Force re-render on refresh
            />
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white border-t border-[#e6c8b0]/20">
        <Button 
          onClick={getHoroscope} 
          disabled={isAnimating || !selectedSign}
          size="sm" 
          className="fortune-button-primary fortune-button-horoscope text-[10px] h-7 px-3"
        >
          <span className="icon-text-sm relative z-10">
            {isAnimating ? 
              <RefreshCw className="animate-spin" size={12} /> : 
              <Sparkles size={12} />
            }
            دریافت طالع
          </span>
        </Button>
        
        {prediction && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyHoroscope} 
            className="border-purple-300 text-purple-700 text-[10px] h-7 px-3 hover:bg-purple-50 backdrop-blur-sm bg-white/50"
          >
            <span className="icon-text-sm">
              <Copy size={12} />
              کپی طالع
            </span>
          </Button>
        )}
      </CardFooter>
    </Card>
    </EnhancedReadingWrapper>
  );
};

// No default export - just the named export
