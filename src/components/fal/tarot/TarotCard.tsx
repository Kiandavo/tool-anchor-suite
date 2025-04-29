
import React from 'react';
import { TarotCardType } from './types';

interface TarotCardProps {
  card: TarotCardType;
  position: "گذشته" | "حال" | "آینده";
  isRevealed: boolean;
}

export const TarotCard: React.FC<TarotCardProps> = ({ card, position, isRevealed }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[2/3] mb-1 perspective-card">
        <div className={`tarot-card absolute w-full h-full transition-all duration-700 transform ${isRevealed ? 'rotate-y-180' : ''}`}>
          <div className="tarot-card-front absolute w-full h-full glass-card rounded-lg border-2 border-[#b0c8e6]">
            <img src={card.image} alt={card.name} className="tarot-card-image" />
            <div className="tarot-card-overlay">
              <span className="text-white text-[10px] font-bold text-center">{card.name}</span>
            </div>
          </div>
          <div className="tarot-card-back absolute w-full h-full glass-card rounded-lg p-2 flex items-center justify-center border-2 border-[#b0c8e6]">
            <span className="text-[#143a5c] text-[8px] text-center overflow-auto max-h-full">
              {isRevealed ? card.description : "..."}
            </span>
          </div>
        </div>
      </div>
      <span className="text-[8px] text-[#143a5c] text-center font-medium">
        {position}
      </span>
    </div>
  );
};
