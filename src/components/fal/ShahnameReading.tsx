import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Copy, RefreshCw, Sparkles, RotateCw } from "lucide-react";

import { useShahnameReading } from '@/hooks/useShahnameReading';
import { ShahnameIntention } from './shahname/ShahnameIntention';
import { ShahnameDisplay } from './shahname/ShahnameDisplay';
import { ShahnameGuide } from './shahname/ShahnameGuide';
import { lazyImport } from '@/utils/performance/lazyImport';
const ToolSeoContent = lazyImport(() => import('@/components/seo/ToolSeoContent'), 'ToolSeoContent');
import { shahnameSeoContent } from '@/data/shahname-seo-content';

export const ShahnameReading = () => {
  const {
    verse,
    isLoading,
    isAnimating,
    hasNewReading,
    showIntention,
    hasSetIntention,
    prepareForReading,
    getShahnameVerse,
    copyReading,
    resetReading
  } = useShahnameReading();

  return (
    <div className="space-y-8">
      <Card className="lcp-tool-card">
        {/* Persian epic background graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5"></div>
          <div className="absolute top-4 right-4 text-amber-200/20 text-6xl">👑</div>
          <div className="absolute bottom-4 left-4 text-amber-200/20 text-4xl">⚔️</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-100/10 text-8xl">📜</div>
        </div>
      
        <CardHeader className="lcp-tool-header">
          <div className="flex items-center justify-center">
            <Crown className="text-amber-100 mr-2" size={18} />
            <h2 className="lcp-tool-title">
              راهنمایی از شاهنامه فردوسی
              <span className="mr-2 inline-block"><Sparkles size={14} className="text-amber-100 animate-pulse" /></span>
            </h2>
          </div>
          
          {/* Enhanced subtitle */}
          <p className="lcp-tool-subtitle">
            حکمت و اندرز از حماسه ملی ایران
          </p>
          
          {/* Help button */}
          <ShahnameGuide />
        </CardHeader>
      
        <CardContent className="lcp-content-area">
          <div className="space-y-3">
            {showIntention ? (
              <ShahnameIntention onSetIntention={prepareForReading} />
            ) : (
              verse ? (
                <ShahnameDisplay 
                  verse={verse}
                  isAnimating={isAnimating}
                  hasNewReading={hasNewReading}
                />
              ) : (
                <div className="h-48 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <div className="animate-spin-slow">
                      <div className="w-12 h-12 rounded-full border-2 border-amber-600/20 border-t-amber-600 animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Crown size={20} className="text-amber-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm animate-pulse">در حال دریافت راهنمایی از شاهنامه...</p>
                  <p className="text-muted-foreground/70 text-xs mt-1">صبر کلید گشایش است</p>
                </div>
              )
            )}
          </div>
        </CardContent>
      
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 pt-4 pb-4 bg-background/50 border-t border-border">
          {hasSetIntention && (
            <>
              <Button 
                onClick={getShahnameVerse} 
                disabled={isLoading}
                size="sm" 
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm h-9 px-6 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                {isLoading ? 
                  <RefreshCw className="animate-spin mr-2" size={16} /> : 
                  <Crown size={16} className="mr-2 animate-pulse" />
                }
                راهنمایی جدید
              </Button>
              
              {verse && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyReading} 
                    className="border-amber-600/50 text-amber-700 hover:bg-amber-50 text-sm h-9 px-4 hover:border-amber-600 transition-colors"
                  >
                    <Copy size={16} className="mr-2" />
                    کپی راهنمایی
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={resetReading} 
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
      
      {/* SEO Content Section (deferred) */}
      <section data-defer>
        <Suspense fallback={<div aria-hidden="true" style={{ minHeight: '200px' }} />}> 
          <ToolSeoContent
            toolName="راهنمایی از شاهنامه فردوسی"
            category="ابزارهای طالع‌بینی و فرهنگ ایرانی"
            description={shahnameSeoContent.description}
            benefits={shahnameSeoContent.benefits}
            howToUse={shahnameSeoContent.howToUse}
            faq={shahnameSeoContent.faq}
            relatedTools={shahnameSeoContent.relatedTools}
          />
        </Suspense>
      </section>
    </div>
  );
};