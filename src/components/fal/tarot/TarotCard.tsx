
import React, { useState } from 'react';
import { TarotCardType } from './types';

interface TarotCardProps {
  card: TarotCardType;
  position: "گذشته" | "حال" | "آینده";
  isRevealed: boolean;
  animationDelay?: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({ card, position, isRevealed, animationDelay = 0 }) => {
  const [imageError, setImageError] = useState(false);
  
  // Card back image - a mystical pattern that looks good for tarot cards
  const cardBackImage = "https://images.unsplash.com/photo-1572175613341-3d88a618dc22?auto=format&fit=crop&w=300&h=500";
  
  // Fallback image in case the main image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=300&h=500";

  const handleImageError = () => {
    console.log(`Failed to load image for card: ${card.name}`);
    setImageError(true);
  };

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
              <>
                <img 
                  src={cardBackImage} 
                  alt="Tarot Card Back" 
                  className="tarot-card-image w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="tarot-card-overlay">
                  <span className="text-white text-[10px] font-bold text-center">?</span>
                </div>
              </>
            ) : (
              <>
                <img 
                  src={imageError ? fallbackImage : card.image} 
                  alt={card.name} 
                  className="tarot-card-image w-full h-full object-cover" 
                  onError={handleImageError}
                />
                <div className="tarot-card-overlay">
                  <span className="text-white text-[10px] font-bold text-center">{card.name}</span>
                </div>
              </>
            )}
          </div>
          <div className="tarot-card-back absolute w-full h-full glass-card rounded-lg p-2 flex items-center justify-center border-2 border-[#b0c8e6] hover:shadow-glow">
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
