import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Search, Heart, Globe, Star, Telescope, Zap } from "lucide-react";
import { ParallelUniverse } from '../types';
import { parallelUniverses } from '../universeData';
import { CosmicBackground3D } from './CosmicBackground3D';
import { Quantum3DIcon } from './Quantum3DIcon';

interface Modern3DWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export const Modern3DWelcomeScreen: React.FC<Modern3DWelcomeScreenProps> = ({ 
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
    <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden" dir="rtl">
      {/* 3D Cosmic Background */}
      <CosmicBackground3D count={3000} />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10"></div>

      <div className="relative z-20 px-8 py-16">
        {/* Hero Section with 3D Icon */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <Quantum3DIcon />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
            کاوشگر جهان‌های
            <span className="block font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              موازی
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            سفری به دنیایی که در آن هر انتخاب شما منجر به ایجاد جهانی جدید شده است.
            <br />
            آماده‌اید نسخه‌ای متفاوت از خودتان را در کیهان بی‌نهایت کشف کنید؟
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-6 py-3 rounded-full font-medium text-base">
              <Telescope className="w-5 h-5 ml-3" />
              {totalUniverses.toLocaleString()} جهان در دسترس
            </Badge>
            {favoriteCount > 0 && (
              <Badge className="bg-red-500/20 backdrop-blur-md text-red-200 border-red-300/30 px-6 py-3 rounded-full font-medium text-base">
                <Heart className="w-5 h-5 ml-3 fill-current" />
                {favoriteCount} جهان محبوب
              </Badge>
            )}
          </div>
        </div>

        {/* Feature Cards with Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 transition-all duration-700 hover:scale-105 hover:bg-white/10 cursor-pointer ${
                hoveredFeature === index ? 'shadow-2xl shadow-purple-500/20 border-white/20' : 'shadow-xl'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="p-8 text-center relative">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed font-light text-lg">{feature.description}</p>
                
                {/* Floating background element */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-8">
          <Button 
            onClick={onDiscoverUniverse}
            disabled={isLoading}
            variant="apple"
            size="apple-lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-16 py-6 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[380px] relative overflow-hidden group text-xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin ml-4" size={28} />
                  در حال کاوش کیهان...
                </>
              ) : (
                <>
                  <Sparkles className="ml-4" size={28} />
                  شروع کاوش جهان‌های موازی
                </>
              )}
            </span>
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              variant="apple-outline"
              size="apple"
              onClick={onShowBrowser}
              disabled={isLoading}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-medium px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-lg"
            >
              <Search className="ml-3" size={20} />
              مرور تمام جهان‌ها
            </Button>
            
            {favoriteCount > 0 && (
              <Button 
                variant="apple-outline"
                size="apple"
                onClick={onShowBrowser}
                disabled={isLoading}
                className="bg-red-500/10 backdrop-blur-md border-red-400/30 text-red-200 hover:bg-red-500/20 font-medium px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-lg"
              >
                <Heart className="ml-3 fill-current" size={20} />
                جهان‌های محبوب
              </Button>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-16">
          <div className="bg-black/20 backdrop-blur-xl rounded-full px-8 py-4 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-6 text-white/80 text-lg font-light">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse shadow-lg shadow-green-400/50"></div>
                سیستم کوانتومی آنلاین
              </div>
              <div className="text-white/40">•</div>
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
        
        .group:hover .group-hover\\:animate-shimmer {
          animation: shimmer 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};