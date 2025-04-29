
import React from 'react';
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { TarotCardDisplay } from './tarot/TarotCardDisplay';
import { TarotControls } from './tarot/TarotControls';
import { TarotAnimation } from './tarot/TarotAnimation';
import { useTarotReading } from './tarot/useTarotReading';

export const TarotReading = () => {
  const {
    selectedCards,
    isAnimating,
    isRevealed,
    drawCards,
    revealMeaning,
    copyReading
  } = useTarotReading();

  return (
    <Card className="bg-[#e9f0f7] border-[#b0c8e6] shadow-sm overflow-hidden">
      <CardHeader className="bg-[#b0c8e6] text-center pb-2 py-2">
        <div className="flex items-center justify-center">
          <BookOpen className="text-[#143a5c] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#143a5c]">فال تاروت</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          <p className="text-center text-[#143a5c] text-xs">سه کارت تاروت که نشان‌دهنده گذشته، حال و آینده شماست انتخاب کنید.</p>
          
          <TarotCardDisplay 
            selectedCards={selectedCards}
            isRevealed={isRevealed}
            isAnimating={isAnimating}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-1 pb-2">
        <TarotControls 
          selectedCards={selectedCards}
          isAnimating={isAnimating}
          isRevealed={isRevealed}
          onDrawCards={drawCards}
          onRevealMeaning={revealMeaning}
          onCopyReading={copyReading}
        />
      </CardFooter>
      
      {/* Animation styles */}
      <TarotAnimation />
    </Card>
  );
};
