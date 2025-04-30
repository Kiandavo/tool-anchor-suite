
import React from 'react';
import { TarotCardType } from './types';
import { Sparkles } from 'lucide-react';

interface TarotCardProps {
  card: TarotCardType;
  position: "گذشته" | "حال" | "آینده";
  isRevealed: boolean;
  animationDelay?: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({ card, position, isRevealed, animationDelay = 0 }) => {
  // The card.icon is already a valid Lucide icon component
  const IconComponent = card.icon;
  
  // Define card appearance based on position
  const positionColor = position === "گذشته" ? "#b0c8e6" : 
                        position === "حال" ? "#95b1d6" : 
                        "#7a97c2";
  
  // Define zodiac patterns for card backgrounds
  const zodiacPatterns = [
    "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"
  ];
  
  // Get a consistent pattern for this card
  const patternIndex = card.name.charCodeAt(0) % zodiacPatterns.length;
  const zodiacSymbol = zodiacPatterns[patternIndex];
  
  return (
    <div 
      className="flex flex-col items-center"
      style={{ 
        animation: `fade-in 0.8s ease-out forwards`,
        animationDelay: `${animationDelay}ms`,
        opacity: 0
      }}
    >
      <div className="relative w-full aspect-[2/3] mb-1 perspective-card">
        {/* Card outline shadow - always visible */}
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-[#b0c8e6]/30 to-[#7a97c2]/30 blur-sm"></div>
        
        {/* The card with front and back sides */}
        <div className={`tarot-card absolute w-full h-full transition-all duration-700 transform ${isRevealed ? 'rotate-y-180' : ''}`}>
          {/* Front side of card (visible when not revealed) */}
          <div className="tarot-card-front absolute w-full h-full glass-card rounded-lg border-2 border-[#b0c8e6] hover:shadow-glow">
            {!isRevealed ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#e9f0f7] to-[#d1e0f0] overflow-hidden">
                {/* Mystical background with zodiac symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[80px] text-[#143a5c]/5 animate-pulse-slow">{zodiacSymbol}</div>
                </div>
                
                {/* Card back design */}
                <div className="absolute inset-0 m-3 border border-[#b0c8e6]/30 rounded-lg"></div>
                <div className="absolute inset-0 m-6 border border-[#b0c8e6]/20 rounded-lg"></div>
                
                {/* Center pattern */}
                <div className="border-2 border-[#b0c8e6] rounded-full p-3 bg-white/50 shadow-md relative z-10 mystical-glow">
                  <div className="text-[#143a5c] text-2xl font-bold">؟</div>
                </div>
                
                {/* Corner patterns */}
                <div className="absolute top-3 right-3 text-[#143a5c]/40 text-xs">{zodiacSymbol}</div>
                <div className="absolute bottom-3 left-3 text-[#143a5c]/40 text-xs">{zodiacSymbol}</div>
              </div>
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-3 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${positionColor}40, ${positionColor}20)`
                }}
              >
                <div className="icon-container mb-2 rounded-full p-3 flex items-center justify-center bg-white/70 shadow-md border border-[#b0c8e6] relative">
                  {IconComponent && <IconComponent size={28} className="text-[#143a5c] relative z-10" />}
                </div>
                <div className="text-center">
                  <h3 className="text-[#143a5c] text-sm font-bold">{card.name}</h3>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute top-2 right-2 text-[#143a5c]/30 text-xs">{zodiacSymbol}</div>
                <div className="absolute bottom-2 left-2 text-[#143a5c]/30 text-xs">{zodiacSymbol}</div>
              </div>
            )}
          </div>
          
          {/* Back side of card (visible when revealed) */}
          <div className="tarot-card-back absolute w-full h-full glass-card rounded-lg p-3 flex items-center justify-center border-2 border-[#b0c8e6] hover:shadow-glow">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 opacity-30">
              <Sparkles size={12} className="text-[#143a5c]" />
            </div>
            <span className="text-[#143a5c] text-[14px] text-center overflow-auto max-h-full px-1">
              {isRevealed ? card.description : "..."}
            </span>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-30">
              <Sparkles size={12} className="text-[#143a5c]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Position label */}
      <div className="flex items-center justify-center mt-1">
        <span className="text-[14px] text-[#143a5c] text-center font-medium px-2 py-0.5 rounded-full bg-white/50 border border-[#b0c8e6]/30">
          {position}
        </span>
      </div>
    </div>
  );
};
