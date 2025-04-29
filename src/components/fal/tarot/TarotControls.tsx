
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, CircleHelp } from "lucide-react";
import { TarotCardType } from './types';

interface TarotControlsProps {
  selectedCards: TarotCardType[];
  isAnimating: boolean;
  isRevealed: boolean;
  onDrawCards: () => void;
  onRevealMeaning: () => void;
  onCopyReading: () => void;
}

export const TarotControls: React.FC<TarotControlsProps> = ({ 
  selectedCards,
  isAnimating,
  isRevealed,
  onDrawCards,
  onRevealMeaning,
  onCopyReading
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 pt-1 pb-2">
      <Button 
        onClick={onDrawCards} 
        disabled={isAnimating}
        size="sm" 
        className="bg-[#b0c8e6] hover:bg-[#95b1d6] text-[#143a5c] text-[10px] h-7 px-2"
      >
        {isAnimating ? <RefreshCw className="animate-spin mr-1" size={12} /> : null}
        کشیدن کارت
      </Button>
      
      {selectedCards.length > 0 && !isRevealed && (
        <Button 
          variant="outline"
          size="sm"
          onClick={onRevealMeaning} 
          className="border-[#b0c8e6] text-[#143a5c] text-[10px] h-7 px-2"
        >
          <CircleHelp size={12} className="mr-1" />
          آشکار کردن معنی
        </Button>
      )}
      
      {selectedCards.length > 0 && (
        <Button 
          variant="outline"
          size="sm"
          onClick={onCopyReading} 
          className="border-[#b0c8e6] text-[#143a5c] text-[10px] h-7 px-2"
        >
          <Copy size={12} className="mr-1" />
          کپی فال
        </Button>
      )}
    </div>
  );
};
