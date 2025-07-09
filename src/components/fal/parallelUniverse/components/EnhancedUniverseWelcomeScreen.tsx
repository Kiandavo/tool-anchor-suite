import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Heart, Copy, Search, Zap, Globe, Infinity, Star, Telescope } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';

interface EnhancedUniverseWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export const EnhancedUniverseWelcomeScreen: React.FC<EnhancedUniverseWelcomeScreenProps> = ({ 
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
      title: "جهان‌های بی‌نهایت",
      description: "کشف نسخه‌های مختلف از خودتان در ابعاد موازی",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "سناریوهای منحصربه‌فرد",
      description: "هر جهان داستانی متفاوت و شخصیتی جدید برای شما",
      color: "text-purple-500"
    },
    {
      icon: Star,
      title: "احتمالات واقعی",
      description: "محاسبه احتمال وجود هر جهان بر اساس فیزیک کوانتومی",
      color: "text-amber-500"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center py-12 px-6">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl">
            <Infinity className="w-12 h-12 text-white animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            کاوشگر جهان‌های موازی
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            به دنیایی سفر کنید که در آن هر انتخاب شما منجر به ایجاد جهانی جدید شده است.
            <br />
            آماده‌اید نسخه‌ای متفاوت از خودتان را کشف کنید؟
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Telescope className="w-4 h-4 mr-1" />
              {totalUniverses.toLocaleString()} جهان در دسترس
            </Badge>
            {favoriteCount > 0 && (
              <Badge variant="secondary" className="text-sm px-3 py-1 bg-red-50 text-red-700 border-red-200">
                <Heart className="w-4 h-4 mr-1 fill-current" />
                {favoriteCount} محبوب
              </Badge>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 ${
                hoveredFeature === index ? 'border-purple-300 shadow-purple-100' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                <h3 className="font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <Button 
              onClick={onDiscoverUniverse}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[300px] relative overflow-hidden group"
              style={{
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin mr-3" size={24} />
                  در حال کاوش جهان‌ها...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3" size={24} />
                  شروع کاوش جهان‌های موازی
                </>
              )}
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline"
              onClick={onShowBrowser}
              disabled={isLoading}
              size="lg"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Search className="mr-2" size={18} />
              کاوش تمام جهان‌ها ({totalUniverses})
            </Button>
            
            {favoriteCount > 0 && (
              <Button 
                variant="outline"
                onClick={onShowBrowser}
                disabled={isLoading}
                size="lg"
                className="border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Heart className="mr-2 fill-current" size={18} />
                جهان‌های محبوب ({favoriteCount})
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-4 rtl:space-x-reverse bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-200">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              سیستم کوانتومی فعال
            </div>
            <div className="text-sm text-gray-500">|</div>
            <div className="text-sm text-gray-600">
              آخرین بروزرسانی: امروز
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .group-hover\\:animate-shimmer {
          animation: shimmer 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};