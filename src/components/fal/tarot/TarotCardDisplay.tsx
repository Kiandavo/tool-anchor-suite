
import React from 'react';
import { TarotCard } from './TarotCard';
import { type TarotCardType } from './types';

interface TarotCardDisplayProps {
  selectedCards: TarotCardType[] | null;
  isRevealed: boolean;
  isAnimating: boolean;
}

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  selectedCards,
  isRevealed,
  isAnimating
}) => {
  // If no cards are selected yet, show placeholder slots
  if (!selectedCards || selectedCards.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 py-3">
        {["گذشته", "حال", "آینده"].map((position, index) => (
          <div key={index} className="tarot-card-container">
            <div className="text-center text-[#143a5c]/70 text-xs mb-2">{position}</div>
            <div className="h-[180px] w-[110px] bg-white/50 border-2 border-dashed border-[#b0c8e6] rounded-lg flex items-center justify-center">
              <div className="text-[#143a5c]/30 text-sm">کارت تاروت</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show the selected cards
  return (
    <div className="space-y-6">
      <div className="tarot-card-grid">
        {selectedCards.map((card, index) => {
          const position = index === 0 ? "گذشته" : index === 1 ? "حال" : "آینده";
          
          return (
            <div key={index} className="tarot-card-container">
              <div className="text-center text-[#143a5c] text-xs mb-2 font-medium">{position}</div>
              <TarotCard 
                card={card} 
                isRevealed={isRevealed} 
                isAnimating={isAnimating}
                index={index}
              />
            </div>
          );
        })}
      </div>

      {isRevealed && (
        <div className="space-y-4">
          <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6]/20 via-[#b0c8e6] to-[#b0c8e6]/20 w-full"></div>
          
          <div className="bg-white/40 p-4 rounded-lg border border-[#b0c8e6]/30">
            <h3 className="text-[#143a5c] text-sm font-medium mb-3 flex items-center">
              <span className="bg-[#b0c8e6] text-white text-xs px-2 py-0.5 rounded-full ml-2">تفسیر کلی</span> 
              خوانش کارت‌های شما
            </h3>
            
            <div className="space-y-3 text-xs text-[#143a5c]/90 leading-6">
              <p><span className="font-bold">گذشته ({selectedCards[0]?.name}):</span> {selectedCards[0]?.meaning}</p>
              <p><span className="font-bold">حال ({selectedCards[1]?.name}):</span> {selectedCards[1]?.meaning}</p>
              <p><span className="font-bold">آینده ({selectedCards[2]?.name}):</span> {selectedCards[2]?.meaning}</p>
              
              <p className="mt-4 text-[#143a5c]/80 bg-[#e9f0f7]/50 p-2 rounded border border-[#b0c8e6]/20">
                این سه کارت در کنار هم نشان‌دهنده مسیری هستند که از گذشته آغاز شده،
                در زمان حال ادامه دارد و به سمت آینده‌ای که می‌تواند با آگاهی شما تغییر کند، در حرکت است.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Styling for the grid layout */}
      <style jsx>{`
        .tarot-card-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        
        @media (min-width: 640px) {
          .tarot-card-grid {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
          }
        }
        
        .tarot-card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
