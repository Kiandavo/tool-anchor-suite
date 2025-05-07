
import React from 'react';
import { type TarotCardType } from './types';
import { motion } from 'framer-motion';
import { Star, Sun, Moon, Skull, BookOpen, Heart, Sword, Crown, Scale } from 'lucide-react';

interface TarotCardProps {
  card: TarotCardType;
  isRevealed: boolean;
  isAnimating: boolean;
  index: number;
  isReversed?: boolean;
}

// Map of fallback icons for tarot cards when images aren't available
const cardIconMap: Record<string, React.ReactNode> = {
  "خورشید": <Sun className="text-amber-500" size={40} />,
  "ماه": <Moon className="text-blue-400" size={40} />,
  "ستاره": <Star className="text-yellow-300" size={40} />,
  "مرگ": <Skull className="text-gray-600" size={40} />,
  "برج": <BookOpen className="text-indigo-600" size={40} />,
  "عاشقان": <Heart className="text-red-500" size={40} />,
  "عدالت": <Scale className="text-blue-600" size={40} />,
  "شاه": <Crown className="text-yellow-600" size={40} />,
  "شمشیر": <Sword className="text-gray-500" size={40} />,
  // Fallback for all other cards
  "default": <Star className="text-purple-500" size={40} />
};

export const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isRevealed, 
  isAnimating, 
  index,
  isReversed = false 
}) => {
  const cardBackImageUrl = "/tarot-back.jpg";
  const cardImageUrl = card.image || "/tarot-fallback.jpg";
  
  // Check if image exists or use fallback
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    console.log("Image error for card:", card.name);
    setImageError(true);
  };
  
  // Choose the icon for this card
  const cardIcon = cardIconMap[card.name] || cardIconMap["default"];
  
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
            backgroundImage: imageError ? 'none' : `url(${cardImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 15px rgba(176, 200, 230, 0.7)',
            backgroundColor: imageError ? '#e9f0f7' : undefined
          }}
        >
          {/* If image failed to load, show fallback icon */}
          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#e9f0f7] to-[#b0c8e6]/30">
              <div className={`transform ${isReversed ? 'rotate-180' : ''}`}>
                {cardIcon}
              </div>
              <h3 className={`text-[#143a5c] font-bold mt-3 text-center px-2 transform ${isReversed ? 'rotate-180' : ''}`}>
                {card.name}
              </h3>
            </div>
          )}

          {/* Image loader to detect errors */}
          <img 
            src={cardImageUrl} 
            alt="" 
            className="hidden" 
            onError={handleImageError}
          />

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
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};
