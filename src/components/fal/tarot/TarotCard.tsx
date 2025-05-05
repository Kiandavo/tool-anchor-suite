
import React from 'react';
import { type TarotCardType } from './types';
import { motion } from 'framer-motion';

interface TarotCardProps {
  card: TarotCardType;
  isRevealed: boolean;
  isAnimating: boolean;
  index: number;
  isReversed?: boolean;
}

export const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isRevealed, 
  isAnimating, 
  index,
  isReversed = false 
}) => {
  const cardBackImageUrl = "/tarot-back.jpg";
  const cardImageUrl = card.image || "/tarot-fallback.jpg";
  
  return (
    <div className="relative h-[200px] w-[120px] sm:h-[220px] sm:w-[140px] perspective-1000">
      <motion.div 
        className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-1000"
        initial={{ rotateY: 0 }}
        animate={{ 
          rotateY: isRevealed ? 180 : 0,
          rotateZ: isRevealed && isReversed ? 180 : 0,
          transition: { 
            delay: index * 0.3,
            duration: 0.8,
            ease: "easeInOut"
          } 
        }}
      >
        {/* Card Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-lg border-2 border-[#b0c8e6] mystical-border"
          style={{
            backgroundImage: `url(${cardBackImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 10px rgba(176, 200, 230, 0.5)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#143a5c]/5 to-[#143a5c]/20 rounded-lg"></div>
        </div>
        
        {/* Card Front */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-lg border-2 border-[#b0c8e6] rotate-y-180 overflow-hidden ${isReversed ? 'rotate-180' : ''}`}
          style={{
            backgroundImage: `url(${cardImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 15px rgba(176, 200, 230, 0.7)'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
            <p className="text-white text-xs text-center font-medium drop-shadow-md">{card.name}</p>
            {isReversed && <p className="text-white/80 text-[10px] text-center">(معکوس)</p>}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1 left-1 right-1 flex justify-between">
            <span className="text-[10px] text-white/80 drop-shadow-md bg-black/30 px-1 rounded">
              {isReversed ? '↓' : '↑'}
            </span>
            <motion.span 
              className="text-[10px] text-white/80 drop-shadow-md bg-black/30 px-1 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✧
            </motion.span>
          </div>
        </div>
      </motion.div>
      
      {/* Add CSS for 3D transforms */}
      <style jsx>{`
        .perspective-1000 {
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
        
        .mystical-border {
          border: 2px solid rgba(176, 200, 230, 0.7);
          box-shadow: 0 0 15px rgba(176, 200, 230, 0.3);
        }
        
        .rotate-180 {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};
