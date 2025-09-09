
import React from 'react';
import { RumiPoem } from '@/data/rumi-poems';
import { Book, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface RumiDisplayProps {
  poem: RumiPoem;
  isAnimating: boolean;
  hasNewFortune: boolean;
}

export const RumiDisplay: React.FC<RumiDisplayProps> = ({ poem, isAnimating, hasNewFortune }) => {
  // Define theme-based styling
  const getThemeColor = (theme: RumiPoem['theme']) => {
    switch (theme) {
      case 'love': return 'bg-red-50 border-red-200';
      case 'wisdom': return 'bg-blue-50 border-blue-200';
      case 'guidance': return 'bg-purple-50 border-purple-200';
      case 'spirituality': return 'bg-amber-50 border-amber-200';
      case 'patience': return 'bg-cyan-50 border-cyan-200';
      case 'hope': return 'bg-green-50 border-green-200';
      default: return 'bg-amber-50 border-amber-200';
    }
  };

  const getThemeTextColor = (theme: RumiPoem['theme']) => {
    switch (theme) {
      case 'love': return 'text-red-800';
      case 'wisdom': return 'text-blue-800';
      case 'guidance': return 'text-purple-800';
      case 'spirituality': return 'text-amber-800';
      case 'patience': return 'text-cyan-800';
      case 'hope': return 'text-green-800';
      default: return 'text-amber-800';
    }
  };

  const themeColor = getThemeColor(poem.theme);
  const themeTextColor = getThemeTextColor(poem.theme);
  
  return (
    <div className={`space-y-4 ${isAnimating ? 'opacity-50' : 'prediction-appear'}`}>
      {/* New fortune indicator */}
      {hasNewFortune && (
        <div className="text-center">
          <span className="inline-block bg-[#c19e67]/10 text-[#8e6d43] text-xs px-3 py-1 rounded-full border border-[#c19e67]/30 animate-pulse">
            ✨ استخاره جدید ✨
          </span>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="w-16 h-0.5 bg-[#c19e67]"></div>
      </div>
      
      <div className="text-center">
        <h3 className="font-bold text-[#8e6d43] text-sm">{poem.title}</h3>
        <div className="mt-1 flex justify-center items-center space-x-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${themeColor} ${themeTextColor}`}>
            {poem.theme === 'love' && 'عشق'}
            {poem.theme === 'wisdom' && 'حکمت'}
            {poem.theme === 'guidance' && 'راهنمایی'}
            {poem.theme === 'spirituality' && 'معنویت'}
            {poem.theme === 'patience' && 'صبر'}
            {poem.theme === 'hope' && 'امید'}
          </span>
          <span className="text-xs text-[#8e6d43]/70">({poem.source})</span>
        </div>
      </div>
      
      <div className="bg-[#fff9f0]/70 p-4 rounded-lg border border-[#c19e67] shadow-inner relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 opacity-5 text-5xl text-[#8e6d43] rotate-12 transform -translate-y-2 translate-x-2">
          "
        </div>
        <div className="absolute bottom-0 left-0 opacity-5 text-5xl text-[#8e6d43] -rotate-12 transform translate-y-2 -translate-x-2">
          "
        </div>
        
        <pre className="text-[#5c3f14] text-sm font-medium leading-7 whitespace-pre-wrap text-right font-vazirmatn">{poem.text}</pre>
      </div>
      
      <div className={`p-3 rounded-lg border ${themeColor} relative`}>
        <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1 bg-white p-1 rounded-full">
          <Book size={16} className={themeTextColor} />
        </div>
        <h4 className={`font-medium ${themeTextColor} text-xs mb-2`}>تفسیر اولیه:</h4>
        <p className="text-[#5c3f14]/90 text-xs leading-6">{poem.interpretation}</p>
      </div>

      <div className={`p-4 rounded-lg border ${themeColor.replace('border-', 'border-2 border-')} relative bg-white/50`}>
        <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1 bg-white p-1 rounded-full">
          <Heart size={16} className={themeTextColor} />
        </div>
        <h4 className={`font-semibold ${themeTextColor} text-sm mb-3`}>راهنمایی تفصیلی:</h4>
        <p className="text-[#5c3f14] text-sm leading-7 mb-4">{poem.detailedGuidance}</p>
        
        <div className="border-t border-[#c19e67]/30 pt-3">
          <div className="flex items-center mb-2">
            <ArrowRight size={14} className={themeTextColor} />
            <h5 className={`font-medium ${themeTextColor} text-sm mr-2`}>توصیه عملی:</h5>
          </div>
          <p className="text-[#5c3f14]/95 text-sm leading-6 bg-[#fff9f0]/80 p-3 rounded-md border border-[#c19e67]/20">
            {poem.actionableAdvice}
          </p>
        </div>
        
        {/* Visual indicator of positive/negative reading */}
        <div className="flex justify-end mt-4">
          {poem.isPositive ? (
            <span className="inline-flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <Sparkles size={12} className="mr-1" />
              فال نیک
            </span>
          ) : (
            <span className="inline-flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Sparkles size={12} className="mr-1" />
              نیاز به تأمل
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
