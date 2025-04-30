
import React from 'react';
import { TarotCardType } from './types';
import { LucideIcon } from 'lucide-react';

interface TarotCardProps {
  card: TarotCardType;
  position: "گذشته" | "حال" | "آینده";
  isRevealed: boolean;
  animationDelay?: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({ card, position, isRevealed, animationDelay = 0 }) => {
  const IconComponent = card.icon;
  
  // Define card appearance based on position
  const positionColor = position === "گذشته" ? "#b0c8e6" : 
                        position === "حال" ? "#95b1d6" : 
                        "#7a97c2";
                        
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
        <div className={`tarot-card absolute w-full h-full transition-all duration-700 transform ${isRevealed ? 'rotate-y-180' : ''}`}>
          <div className="tarot-card-front absolute w-full h-full glass-card rounded-lg border-2 border-[#b0c8e6] hover:shadow-glow">
            {!isRevealed ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#e9f0f7] to-[#d1e0f0]">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="text-[120px] text-[#143a5c]">؟</div>
                </div>
                <div className="border-2 border-[#b0c8e6] rounded-full p-3 bg-white/50 shadow-md">
                  <div className="text-[#143a5c] text-2xl font-bold">؟</div>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-3"
                style={{
                  background: `linear-gradient(135deg, ${positionColor}40, ${positionColor}20)`
                }}
              >
                <div className="icon-container mb-2 rounded-full p-3 flex items-center justify-center bg-white/70 shadow-md border border-[#b0c8e6]">
                  <IconComponent size={28} className="text-[#143a5c]" />
                </div>
                <div className="text-center">
                  <h3 className="text-[#143a5c] text-sm font-bold">{card.name}</h3>
                </div>
              </div>
            )}
          </div>
          <div className="tarot-card-back absolute w-full h-full glass-card rounded-lg p-3 flex items-center justify-center border-2 border-[#b0c8e6] hover:shadow-glow">
            <span className="text-[#143a5c] text-[14px] text-center overflow-auto max-h-full">
              {isRevealed ? card.description : "..."}
            </span>
          </div>
        </div>
      </div>
      <span className="text-[14px] text-[#143a5c] text-center font-medium mt-1">
        {position}
      </span>
    </div>
  );
};
