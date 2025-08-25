import React from 'react';
import { ShahnameVerse } from '@/data/shahname-verses';
import { Crown, Scroll, Globe, Heart } from "lucide-react";

interface ShahnameDisplayProps {
  verse: ShahnameVerse;
  isAnimating: boolean;
  hasNewReading: boolean;
}

export const ShahnameDisplay: React.FC<ShahnameDisplayProps> = ({ 
  verse, 
  isAnimating, 
  hasNewReading 
}) => {
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'heroism': return '⚔️';
      case 'wisdom': return '📚';
      case 'justice': return '⚖️';
      case 'love': return '💝';
      case 'betrayal': return '🗡️';
      case 'victory': return '👑';
      case 'destiny': return '🌟';
      case 'honor': return '🛡️';
      default: return '📜';
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'heroism': return 'text-red-600';
      case 'wisdom': return 'text-blue-600';
      case 'justice': return 'text-purple-600';
      case 'love': return 'text-pink-600';
      case 'betrayal': return 'text-gray-600';
      case 'victory': return 'text-yellow-600';
      case 'destiny': return 'text-indigo-600';
      case 'honor': return 'text-green-600';
      default: return 'text-amber-600';
    }
  };

  return (
    <div className={`space-y-6 ${isAnimating ? 'animate-pulse' : ''} ${hasNewReading ? 'animate-fade-in' : ''}`}>
      {/* Header with character and era */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-4 border border-amber-200/50 dark:border-amber-800/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Crown className="text-amber-600 ml-2" size={20} />
            <h3 className="font-bold text-primary">{verse.title}</h3>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="ml-1">{getThemeIcon(verse.theme)}</span>
            <span className={`font-medium ${getThemeColor(verse.theme)}`}>
              {verse.theme === 'heroism' && 'پهلوانی'}
              {verse.theme === 'wisdom' && 'حکمت'}
              {verse.theme === 'justice' && 'عدالت'}
              {verse.theme === 'love' && 'عشق'}
              {verse.theme === 'betrayal' && 'خیانت'}
              {verse.theme === 'victory' && 'پیروزی'}
              {verse.theme === 'destiny' && 'تقدیر'}
              {verse.theme === 'honor' && 'شرافت'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Crown size={16} className="ml-1 text-amber-500" />
            <span className="font-medium">شخصیت:</span>
            <span className="mr-1 text-primary font-medium">{verse.character}</span>
          </div>
          <div className="flex items-center">
            <Scroll size={16} className="ml-1 text-amber-500" />
            <span className="font-medium">دوره:</span>
            <span className="mr-1 text-primary font-medium">{verse.era}</span>
          </div>
        </div>
      </div>

      {/* Main verse text */}
      <div className="bg-gradient-to-br from-background via-background/90 to-muted/20 rounded-xl p-6 border border-primary/10 shadow-sm">
        <div className="flex items-center justify-center mb-4">
          <Scroll className="text-primary ml-2" size={20} />
          <h4 className="font-bold text-primary">متن شاهنامه</h4>
        </div>
        <div 
          className="text-center leading-loose text-lg font-medium text-foreground p-4 bg-muted/20 rounded-lg border-l-4 border-amber-500"
          style={{ fontFamily: 'inherit', lineHeight: '2.2' }}
        >
          {verse.text.split('\n').map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* English translation */}
      <div className="bg-blue-50/50 dark:bg-blue-950/10 rounded-xl p-4 border border-blue-200/30 dark:border-blue-800/20">
        <div className="flex items-center justify-center mb-3">
          <Globe className="text-blue-600 ml-2" size={18} />
          <h4 className="font-semibold text-blue-800 dark:text-blue-400">English Translation</h4>
        </div>
        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed italic text-center">
          {verse.translation}
        </p>
      </div>

      {/* Persian interpretation */}
      <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10 rounded-xl p-5 border border-green-200/30 dark:border-green-800/20">
        <div className="flex items-center justify-center mb-4">
          <Heart className="text-green-600 ml-2" size={20} />
          <h4 className="font-bold text-green-800 dark:text-green-400">تفسیر و راهنمایی</h4>
        </div>
        <p className="text-green-700 dark:text-green-300 leading-relaxed text-right">
          {verse.interpretation}
        </p>
      </div>

      {/* English interpretation */}
      <div className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/10 dark:to-violet-950/10 rounded-xl p-5 border border-purple-200/30 dark:border-purple-800/20">
        <div className="flex items-center justify-center mb-4">
          <Globe className="text-purple-600 ml-2" size={18} />
          <h4 className="font-semibold text-purple-800 dark:text-purple-400">English Guidance</h4>
        </div>
        <p className="text-purple-700 dark:text-purple-300 leading-relaxed text-left text-sm">
          {verse.interpretationEn}
        </p>
      </div>

      {/* Source information */}
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg py-2 px-4 inline-block">
          📚 منبع: {verse.source}
        </p>
      </div>
    </div>
  );
};