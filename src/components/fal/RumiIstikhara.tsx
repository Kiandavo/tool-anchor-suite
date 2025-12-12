
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Copy, RefreshCw, Sparkles, RotateCw } from "lucide-react";

import { useRumiIstikhara } from './rumi/useRumiIstikhara';
import { RumiIntention } from './rumi/RumiIntention';
import { RumiDisplay } from './rumi/RumiDisplay';
import { RumiGuide } from './rumi/RumiGuide';
import { PersianManuscriptBackground, DervishSpinAnimation, SufiSymbols, FlowingArabicPattern } from './graphics/RumiGraphics';
import { MysticalBackground, FloatingElements, PoemRevealAnimation, MysticalGlow } from './rumi/RumiEnhancedGraphics';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { rumiSeoContent } from '@/data/rumi-seo-content';

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
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-background via-background/90 to-muted/30 border-primary/20 shadow-lg overflow-hidden relative backdrop-blur-sm">
        {/* Enhanced mystical graphics */}
        <MysticalBackground />
        <FloatingElements />
        <MysticalGlow intensity={isAnimating ? 2 : 1} />
        <PoemRevealAnimation isRevealing={hasNewFortune} />
        <SufiSymbols />
        <FlowingArabicPattern />
      
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-center pb-3 py-4 relative border-b border-primary/30">
          <div className="flex items-center justify-between">
            <RumiGuide />
            <div className="flex-1 flex items-center justify-center gap-2">
              <BookOpen className="text-primary-foreground" size={18} />
              <h2 className="text-base font-bold text-primary-foreground">
                استخاره با مولانا
                <Sparkles size={14} className="text-primary-foreground animate-pulse inline-block mr-2" />
              </h2>
            </div>
            <div className="w-[70px]"></div> {/* Spacer for balance */}
          </div>
          
          {/* Enhanced subtitle */}
          <p className="text-primary-foreground/80 text-xs mt-1 font-medium text-center">راهنمایی عرفانی از اشعار جلال‌الدین مولوی</p>
        </CardHeader>
      
        <CardContent className="pt-4 px-4 relative min-h-[300px]">
          <div className="space-y-3">
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
                <div className="h-48 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="animate-spin-slow">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={20} className="text-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm animate-pulse">در حال دریافت استخاره معنوی...</p>
                  <p className="text-muted-foreground/70 text-xs mt-1">صبوری آرامش می‌آورد</p>
                </div>
              )
            )}
          </div>
        </CardContent>
      
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 pt-4 pb-4 bg-background/50 border-t border-border">
          {hasSetIntention && (
            <>
              <Button 
                onClick={getRumiPoem} 
                disabled={isLoading}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 px-6 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                {isLoading ? 
                  <RefreshCw className="animate-spin mr-2" size={16} /> : 
                  <Sparkles size={16} className="mr-2 animate-pulse" />
                }
                استخاره جدید
              </Button>
              
              {poem && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyFortune} 
                    className="border-primary/50 text-primary hover:bg-primary/5 text-sm h-9 px-4 hover:border-primary transition-colors"
                  >
                    <Copy size={16} className="mr-2" />
                    کپی استخاره
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={resetIstikhara} 
                    className="border-muted-foreground/30 text-muted-foreground hover:bg-muted text-sm h-9 px-4 transition-colors"
                  >
                    <RotateCw size={16} className="mr-2" />
                    نیت جدید
                  </Button>
                </>
              )}
            </>
          )}
        </CardFooter>
      </Card>
      
      {/* SEO Content Section */}
      <ToolSeoContent
        toolName="استخاره با مولانا"
        category="ابزارهای طالع‌بینی و عرفان"
        description={rumiSeoContent.description}
        benefits={rumiSeoContent.benefits}
        howToUse={rumiSeoContent.howToUse}
        faq={rumiSeoContent.faq}
        relatedTools={rumiSeoContent.relatedTools}
      />
    </div>
  );
};

// Enhanced Rumi Istikhara with comprehensive SEO and modern design
