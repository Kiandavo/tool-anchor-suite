import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Search, Heart, Globe, Infinity, Star, Telescope, Zap } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';

interface AppleUniverseWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export const AppleUniverseWelcomeScreen: React.FC<AppleUniverseWelcomeScreenProps> = ({ 
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
    <div className="relative min-h-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Apple-style background blur elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 py-16">
        {/* Apple-style Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white/80 backdrop-blur-xl rounded-3xl mb-8 shadow-xl border border-white/50">
            <Infinity className="w-16 h-16 text-blue-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            کاوشگر جهان‌های
            <span className="block font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              موازی
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            سفری به دنیایی که در آن هر انتخاب شما منجر به ایجاد جهانی جدید شده است.
            آماده‌اید نسخه‌ای متفاوت از خودتان را کشف کنید؟
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <Badge className="bg-white/80 backdrop-blur-md text-gray-700 border-gray-200/50 px-4 py-2 rounded-full font-medium">
              <Telescope className="w-4 h-4 mr-2" />
              {totalUniverses.toLocaleString()} جهان
            </Badge>
            {favoriteCount > 0 && (
              <Badge className="bg-red-50/80 backdrop-blur-md text-red-700 border-red-200/50 px-4 py-2 rounded-full font-medium">
                <Heart className="w-4 h-4 mr-2 fill-current" />
                {favoriteCount} محبوب
              </Badge>
            )}
          </div>
        </div>

        {/* Apple-style Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden bg-white/70 backdrop-blur-xl border-white/50 transition-all duration-500 hover:scale-105 hover:bg-white/80 cursor-pointer ${
                hoveredFeature === index ? 'shadow-2xl' : 'shadow-lg'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="p-8 text-center relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Apple-style Action Buttons */}
        <div className="text-center space-y-6">
          <Button 
            onClick={onDiscoverUniverse}
            disabled={isLoading}
            variant="apple"
            size="apple-lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[320px] relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin mr-3" size={24} />
                در حال کاوش جهان‌ها...
              </>
            ) : (
              <>
                <Sparkles className="mr-3" size={24} />
                شروع کاوش
              </>
            )}
          </Button>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="apple-outline"
              size="apple"
              onClick={onShowBrowser}
              disabled={isLoading}
              className="bg-white/70 backdrop-blur-md border-gray-200/50 text-gray-700 hover:bg-white/90 font-medium px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Search className="mr-2" size={18} />
              مرور همه جهان‌ها
            </Button>
            
            {favoriteCount > 0 && (
              <Button 
                variant="apple-outline"
                size="apple"
                onClick={onShowBrowser}
                disabled={isLoading}
                className="bg-white/70 backdrop-blur-md border-red-200/50 text-red-700 hover:bg-red-50/90 font-medium px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Heart className="mr-2 fill-current" size={18} />
                جهان‌های محبوب
              </Button>
            )}
          </div>
        </div>

        {/* Apple-style Status Indicator */}
        <div className="flex justify-center mt-12">
          <div className="bg-white/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/50 shadow-lg">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                سیستم کوانتومی آنلاین
              </div>
              <div className="text-gray-400">•</div>
              <div>آخرین بروزرسانی: امروز</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};