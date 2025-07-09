import React from 'react';
import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Sparkles, Infinity } from "lucide-react";

export const EnhancedUniverseHeader: React.FC = () => {
  return (
    <CardHeader className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <Infinity className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8" />
          کاوشگر جهان‌های موازی
          <Globe className="w-8 h-8" />
        </h1>
        
        <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
          سفری به ابعاد نامتناهی امکانات و کشف نسخه‌های مختلف زندگی شما
        </p>

        <div className="flex justify-center mt-4">
          <Badge 
            variant="secondary" 
            className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            سیستم کوانتومی آنلاین
          </Badge>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </CardHeader>
  );
};