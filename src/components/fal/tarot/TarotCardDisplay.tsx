
import React from 'react';
import { TarotCard } from './TarotCard';
import { TarotCardType } from './types';
import { TarotGuide } from './TarotGuide';
import { Sparkles } from "lucide-react";

interface TarotCardDisplayProps {
  selectedCards: TarotCardType[];
  isRevealed: boolean;
  isAnimating: boolean;
}

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({ 
  selectedCards, 
  isRevealed, 
  isAnimating 
}) => {
  const positions = ["گذشته", "حال", "آینده"] as const;

  if (selectedCards.length === 0) {
    return (
      <div className="text-center text-[#143a5c] text-sm py-6 px-2 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative">
          <p className="text-[#143a5c] mb-3 font-medium">برای دریافت فال، دکمه کشیدن کارت را فشار دهید.</p>
          <div className="mt-5 flex justify-center">
            <TarotGuide />
          </div>
          <div className="mt-4 flex justify-center">
            <div className="animate-float">
              <Sparkles size={18} className="text-[#7a97c2] opacity-70" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-3 gap-2 md:gap-4 relative ${isAnimating ? 'opacity-50' : ''}`}>
      {/* Mystical background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 -z-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {selectedCards.map((card, index) => (
        <TarotCard 
          key={index}
          card={card}
          position={positions[index]}
          isRevealed={isRevealed}
          animationDelay={index * 300} // Stagger the appearance of each card
        />
      ))}
    </div>
  );
};
