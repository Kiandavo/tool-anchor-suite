
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Copy, RefreshCw, Sparkles, RotateCw } from "lucide-react";

import { useRumiIstikhara } from './rumi/useRumiIstikhara';
import { RumiIntention } from './rumi/RumiIntention';
import { RumiDisplay } from './rumi/RumiDisplay';
import { RumiGuide } from './rumi/RumiGuide';

export const RumiIstikhara = () => {
  const {
    poem,
    isLoading,
    isAnimating,
    hasNewFortune,
    showIntention,
    hasSetIntention,
    prepareForIstikhara,
    getRumiPoem,
    copyFortune,
    resetIstikhara
  } = useRumiIstikhara();

  return (
    <Card className="bg-[#fff7ec] border-[#c19e67] shadow-md overflow-hidden relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pattern-drift">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238e6d43' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#c19e67] to-[#8e6d43] text-center pb-2 py-2 relative border-b border-[#c19e67]">
        <div className="flex items-center justify-center">
          <BookOpen className="text-white mr-2" size={16} />
          <h2 className="text-sm font-bold text-white flex items-center">
            استخاره با مولانا
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-white opacity-70" /></span>
          </h2>
        </div>
        
        {/* Help button */}
        <RumiGuide />
      </CardHeader>
      
      <CardContent className="pt-3 px-3 relative">
        <div className="space-y-2">
          {showIntention ? (
            <RumiIntention onSetIntention={prepareForIstikhara} />
          ) : (
            poem ? (
              <RumiDisplay 
                poem={poem}
                isAnimating={isAnimating}
                hasNewFortune={hasNewFortune}
              />
            ) : (
              <div className="h-40 flex flex-col items-center justify-center">
                <div className="animate-spin-slow mb-4">
                  <Sparkles size={24} className="text-[#c19e67]" />
                </div>
                <p className="text-[#8e6d43] text-xs">در حال دریافت استخاره...</p>
              </div>
            )
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/30 border-t border-[#c19e67]/20">
        {hasSetIntention && (
          <>
            <Button 
              onClick={getRumiPoem} 
              disabled={isLoading}
              size="sm" 
              className="bg-[#c19e67] hover:bg-[#8e6d43] text-white text-xs h-8 px-4 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              {isLoading ? 
                <RefreshCw className="animate-spin mr-1" size={14} /> : 
                <Sparkles size={14} className="mr-1" />
              }
              استخاره جدید
            </Button>
            
            {poem && (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={copyFortune} 
                  className="border-[#c19e67] text-[#8e6d43] text-xs h-8 px-3"
                >
                  <Copy size={14} className="mr-1" />
                  کپی استخاره
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={resetIstikhara} 
                  className="border-[#c19e67] text-[#8e6d43] text-xs h-8 px-3"
                >
                  <RotateCw size={14} className="mr-1" />
                  نیت جدید
                </Button>
              </>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

// No default export - just the named export
