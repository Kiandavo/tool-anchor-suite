import React from 'react';
import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Infinity, Sparkles } from "lucide-react";

export const AppleUniverseHeader: React.FC = () => {
  return (
    <CardHeader className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Apple-style background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-6 border border-white/20">
          <Infinity className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight flex items-center justify-center gap-4">
          <Sparkles className="w-10 h-10 opacity-80" />
          کاوشگر جهان‌های موازی
        </h1>
        
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          سفری به ابعاد نامتناهی امکانات • کشف نسخه‌های مختلف زندگی شما
        </p>

        <div className="flex justify-center mt-6">
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-2 rounded-full font-light">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            سیستم کوانتومی فعال
          </Badge>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            opacity: 0.2; 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: translateY(-10px) scale(1.1); 
          }
        }
      `}</style>
    </CardHeader>
  );
};