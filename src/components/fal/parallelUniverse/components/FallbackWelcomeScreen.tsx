import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Search, Heart, Globe, Star, Telescope, Zap, Infinity } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { EnhancedGraphics } from '@/components/ui/enhanced-graphics';

interface FallbackWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export const FallbackWelcomeScreen: React.FC<FallbackWelcomeScreenProps> = ({ 
  onDiscoverUniverse, 
  onShowBrowser, 
  isLoading,
  favoriteCount,
  totalUniverses 
}) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Globe,
      title: "جهان‌های موازی",
      description: "کشف نسخه‌های مختلف از خودتان در ابعاد موازی",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "سناریوهای هوشمند",
      description: "هر جهان داستانی منحصربه‌فرد با احتمالات واقعی",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Star,
      title: "فیزیک کوانتومی",
      description: "محاسبه دقیق احتمالات بر اساس علم روز",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 sm:py-28 mb-16 relative overflow-hidden" dir="rtl">
      {/* Background elements matching homepage */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 glass-morphism" />
      
      <EnhancedGraphics variant="floating-orbs" className="absolute inset-0" />
      
      {/* Animated background circles like homepage */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/30 blur-3xl wave-animation" />
      <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-green-200/40 to-blue-200/30 blur-3xl wave-animation" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          {/* Hero Section matching homepage style */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 mb-8 shadow-2xl bounce-subtle">
            <Infinity className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight tracking-tight text-shine">
            کاوشگر جهان‌های موازی
          </h1>
          
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 font-light mb-6 scroll-reveal">
            سفری به دنیایی که در آن هر انتخاب شما منجر به ایجاد جهانی جدید شده است.
            آماده‌اید نسخه‌ای متفاوت از خودتان را در کیهان بی‌نهایت کشف کنید؟
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <div className="glass-morphism px-4 py-2 rounded-full shadow-sm border border-gray-200/50">
              <div className="flex items-center text-gray-700 font-medium text-sm">
                {totalUniverses.toLocaleString()} جهان در دسترس
                <Telescope className="w-4 h-4 mr-2" />
              </div>
            </div>
            {favoriteCount > 0 && (
              <div className="glass-morphism px-4 py-2 rounded-full shadow-sm border border-gray-200/50">
                <div className="flex items-center text-gray-700 font-medium text-sm">
                  {favoriteCount} جهان محبوب
                  <Heart className="w-4 h-4 mr-2 fill-current text-red-500" />
                </div>
              </div>
            )}
          </div>

          {/* Feature Cards matching homepage style */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-morphism card-hover-glow p-6 rounded-2xl shadow-sm border border-gray-200/50 magnetic-hover"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-4 shadow-md bounce-subtle`} style={{ animationDelay: `${index * 0.5}s` }}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons matching homepage style */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={onDiscoverUniverse}
              disabled={isLoading}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg gradient-persian text-white interactive-element magnetic-hover"
            >
              {isLoading ? (
                <>
                  در حال کاوش کیهان...
                  <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                </>
              ) : (
                <>
                  شروع کاوش جهان‌های موازی
                  <Sparkles className="mr-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={onShowBrowser}
              disabled={isLoading}
              className="glass-morphism hover:shadow-md hover:bg-blue-50/50 transition-all hover:scale-[1.02] font-medium text-lg interactive-element magnetic-hover"
            >
              مرور تمام جهان‌ها
              <Search className="mr-2 h-5 w-5" />
            </Button>
            
            {favoriteCount > 0 && (
              <Button 
                variant="outline"
                size="lg"
                onClick={onShowBrowser}
                disabled={isLoading}
                className="glass-morphism hover:shadow-md hover:bg-red-50/50 transition-all hover:scale-[1.02] font-medium text-lg interactive-element magnetic-hover text-red-600 border-red-200"
              >
                جهان‌های محبوب
                <Heart className="mr-2 h-5 w-5 fill-current" />
              </Button>
            )}
          </div>

          {/* Status Indicator matching homepage style */}
          <div className="max-w-lg mx-auto h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-16 rounded-full wave-animation" />
          
          <div className="flex justify-center mt-8">
            <div className="glass-morphism px-6 py-3 rounded-full shadow-sm border border-gray-200/50">
              <div className="flex items-center gap-3 text-gray-700 text-sm font-light">
                <div className="flex items-center">
                  سیستم کوانتومی آنلاین
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
                <div className="text-gray-400 hidden md:block">•</div>
                <div className="hidden md:block">آخرین بروزرسانی: امروز</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};