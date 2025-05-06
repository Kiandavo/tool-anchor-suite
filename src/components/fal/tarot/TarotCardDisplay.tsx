
import React from 'react';
import { TarotCard } from './TarotCard';
import { type TarotCardType, type TarotReadingConfig } from './types';
import { motion } from 'framer-motion';

interface TarotCardDisplayProps {
  selectedCards: TarotCardType[] | null;
  isRevealed: boolean;
  isAnimating: boolean;
  readingType: TarotReadingConfig;
  reversedCards: boolean[];
}

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  selectedCards,
  isRevealed,
  isAnimating,
  readingType,
  reversedCards
}) => {
  // If no cards are selected yet, show placeholder slots based on reading type
  if (!selectedCards || selectedCards.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {readingType.positions.map((position, index) => (
          <div key={index} className="tarot-card-container">
            <div className="text-center text-[#143a5c]/70 text-xs mb-2">{position}</div>
            <div className="h-[200px] w-[120px] sm:h-[220px] sm:w-[140px] bg-white/50 border-2 border-dashed border-[#b0c8e6] rounded-lg flex items-center justify-center">
              <div className="text-[#143a5c]/30 text-sm">کارت تاروت</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show the selected cards
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`tarot-card-grid grid-cols-${Math.min(selectedCards.length, 3)}`}>
        {selectedCards.map((card, index) => {
          const isReversed = reversedCards[index];
          const position = readingType.positions[index] || `کارت ${index + 1}`;
          
          return (
            <div key={index} className="tarot-card-container">
              <div className="text-center text-[#143a5c] text-xs mb-2 font-medium">{position}</div>
              <TarotCard 
                card={card} 
                isRevealed={isRevealed} 
                isAnimating={isAnimating}
                index={index}
                isReversed={isReversed}
              />
            </div>
          );
        })}
      </div>

      {isRevealed && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6]/20 via-[#b0c8e6] to-[#b0c8e6]/20 w-full"></div>
          
          <div className="bg-white/40 p-4 rounded-lg border border-[#b0c8e6]/30 shadow-md">
            <h3 className="text-[#143a5c] text-sm font-medium mb-3 flex items-center">
              <span className="bg-[#b0c8e6] text-white text-xs px-2 py-0.5 rounded-full ml-2">تفسیر کلی</span> 
              خوانش کارت‌های شما
            </h3>
            
            <div className="space-y-3 text-xs text-[#143a5c]/90 leading-6">
              {selectedCards.map((card, index) => {
                const position = readingType.positions[index] || `کارت ${index + 1}`;
                const isReversed = reversedCards[index];
                const interpretation = isReversed ? card.reversedMeaning || card.meaning : card.meaning;
                
                return (
                  <p key={index} className="pb-2 border-b border-[#b0c8e6]/20 last:border-0">
                    <span className="font-bold">{position} ({card.name}{isReversed ? ' - معکوس' : ''}):</span> {interpretation}
                  </p>
                );
              })}
              
              {readingType.id === 'three-card' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این سه کارت در کنار هم نشان‌دهنده مسیری هستند که از گذشته آغاز شده،
                  در زمان حال ادامه دارد و به سمت آینده‌ای که می‌تواند با آگاهی شما تغییر کند، در حرکت است.
                </p>
              )}
              
              {readingType.id === 'relationship' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این سه کارت نشان‌دهنده انرژی‌های بین شما و فرد مورد نظرتان هستند و راهنمایی برای درک بهتر این رابطه ارائه می‌دهند.
                </p>
              )}
              
              {readingType.id === 'career' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  این کارت‌ها به شما کمک می‌کنند تا مسیر شغلی خود را بهتر درک کنید و فرصت‌های پیش رو را ببینید.
                </p>
              )}
              
              {readingType.id === 'yes-no' && (
                <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                  {selectedCards[0].name === "خورشید" || selectedCards[0].name === "جهان" ? 
                    "پاسخ به سؤال شما مثبت است." : 
                    selectedCards[0].name === "برج" || selectedCards[0].name === "مرگ" ? 
                    "پاسخ به سؤال شما منفی است." : 
                    "پاسخ به سؤال شما مشخص نیست و به عوامل مختلفی بستگی دارد."}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Styling for the grid layout */}
      <style>
        {`
        .tarot-card-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .tarot-card-grid {
            gap: 2rem;
          }
        }
        
        .tarot-card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        `}
      </style>
    </motion.div>
  );
};
