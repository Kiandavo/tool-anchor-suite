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

export const Horoscope = () => {
  // ... keep existing code (hooks, component logic)
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

  return (
    <Card className="bg-[#fdf0e9] border-[#e6c8b0] shadow-md overflow-hidden relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03] pattern-drift">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c3f14' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#e6c8b0] to-[#d2b095] text-center pb-2 py-2 relative border-b border-[#e6c8b0]">
        <div className="flex items-center justify-center">
          <Star className="text-[#5c3f14] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#5c3f14] flex items-center">
            طالع بینی
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-[#5c3f14] opacity-70" /></span>
          </h2>
        </div>
        
        {/* Help button */}
        <HoroscopeGuide />
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          <div className="bg-white/30 p-3 rounded-lg border border-[#e6c8b0]/20 text-center text-xs text-[#5c3f14] mb-2">
            لطفاً ماه تولد و نوع پیش‌بینی مورد نظر خود را انتخاب کنید
          </div>
          
          <ZodiacSelector 
            selectedSign={selectedSign} 
            onSelectSign={setSelectedSign} 
          />
          
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
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/20 border-t border-[#e6c8b0]/20">
        <Button 
          onClick={getHoroscope} 
          disabled={isAnimating || !selectedSign}
          size="sm" 
          className="bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14] text-[10px] h-7 px-3 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isAnimating ? 
            <RefreshCw className="animate-spin mr-1" size={12} /> : 
            <Sparkles size={12} className="mr-1" />
          }
          دریافت طالع
        </Button>
        
        {prediction && (
          <Button 
            variant="outline"
            size="sm"
            onClick={copyHoroscope} 
            className="border-[#e6c8b0] text-[#5c3f14] text-[10px] h-7 px-3 hover:bg-[#fdf0e9]/50"
          >
            <Copy size={12} className="mr-1" />
            کپی طالع
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// No default export - just the named export
