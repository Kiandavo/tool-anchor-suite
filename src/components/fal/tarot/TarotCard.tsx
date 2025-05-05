
import React from 'react';
import { type TarotCardType } from './types';
import { motion } from 'framer-motion';

interface TarotCardProps {
  card: TarotCardType;
  isRevealed: boolean;
  isAnimating: boolean;
  index: number;
}

export const TarotCard: React.FC<TarotCardProps> = ({ card, isRevealed, isAnimating, index }) => {
  const cardBackImageUrl = "/tarot-back.jpg";
  const cardImageUrl = card.image || "/tarot-fallback.jpg";
  
  return (
    <div className="relative h-[180px] w-[110px] perspective-500">
      <motion.div 
        className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-1000"
        initial={{ rotateY: 0 }}
        animate={{ 
          rotateY: isRevealed ? 180 : 0,
          transition: { 
            delay: index * 0.2,
            duration: 0.8
          } 
        }}
      >
        {/* Card Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-md border-2 border-[#b0c8e6]"
          style={{
            backgroundImage: `url(${cardBackImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        {/* Card Front */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-md border-2 border-[#b0c8e6] rotate-y-180"
          style={{
            backgroundImage: `url(${cardImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
            <p className="text-white text-[10px] text-center font-medium">{card.name}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Add CSS for 3D transforms */}
      <style jsx>{`
        .perspective-500 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
