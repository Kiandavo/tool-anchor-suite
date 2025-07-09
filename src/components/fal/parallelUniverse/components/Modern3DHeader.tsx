import React from 'react';
import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Infinity, Sparkles, Atom } from "lucide-react";
import { CosmicBackground3D } from './CosmicBackground3D';

export const Modern3DHeader: React.FC = () => {
  return (
    <CardHeader className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden border-b border-white/10" dir="rtl">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <CosmicBackground3D count={1500} />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/2 to-transparent"></div>
      </div>

      {/* Floating quantum particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              right: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantumFloat ${4 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20 shadow-2xl">
          <Infinity className="w-12 h-12 text-white" />
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight flex items-center justify-center gap-6 flex-wrap">
          <Sparkles className="w-12 h-12 opacity-80 text-blue-300" />
          <span>کاوشگر جهان‌های موازی</span>
          <Atom className="w-12 h-12 opacity-80 text-purple-300" />
        </h1>
        
        <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed font-light mb-8">
          سفری به ابعاد نامتناهی امکانات • کشف نسخه‌های مختلف زندگی شما در کیهان موازی
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-6 py-3 rounded-full font-light text-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full ml-3 animate-pulse shadow-lg shadow-green-400/50"></div>
            سیستم کوانتومی فعال
          </Badge>
          
          <Badge className="bg-blue-500/10 backdrop-blur-md text-blue-200 border-blue-400/20 px-6 py-3 rounded-full font-light text-lg">
            <Atom className="w-4 h-4 ml-3" />
            تکنولوژی ۲۰۲۵
          </Badge>
        </div>
      </div>

      <style>{`
        @keyframes quantumFloat {
          0%, 100% { 
            opacity: 0.2; 
            transform: translateY(0px) translateX(0px) scale(1); 
          }
          25% { 
            opacity: 0.8; 
            transform: translateY(-15px) translateX(10px) scale(1.2); 
          }
          50% { 
            opacity: 0.5; 
            transform: translateY(-25px) translateX(-5px) scale(0.8); 
          }
          75% { 
            opacity: 0.9; 
            transform: translateY(-10px) translateX(-15px) scale(1.1); 
          }
        }
      `}</style>
    </CardHeader>
  );
};