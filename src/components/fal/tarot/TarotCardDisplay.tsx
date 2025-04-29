
import React from 'react';
import { TarotCard } from './TarotCard';
import { TarotCardType } from './types';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

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
      <div className="text-center text-[#143a5c] text-xs py-4">
        <p>برای دریافت فال، دکمه کشیدن کارت را فشار دهید.</p>
        <div className="mt-4 flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-[#143a5c] cursor-help text-xs inline-flex items-center">
                  <CircleHelp size={14} className="mr-1" />
                  راهنمای تاروت
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-xs p-2 max-w-xs text-right">
                <p>کارت‌های تاروت فال باستانی هستند که برای پیش‌بینی آینده، درک گذشته و بصیرت در شرایط فعلی استفاده می‌شوند.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-3 gap-2 ${isAnimating ? 'opacity-50' : ''}`}>
      {selectedCards.map((card, index) => (
        <TarotCard 
          key={index}
          card={card}
          position={positions[index]}
          isRevealed={isRevealed}
        />
      ))}
    </div>
  );
};
