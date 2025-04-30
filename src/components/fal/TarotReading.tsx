
import React from 'react';
import { BookOpen, Sparkles } from "lucide-react";
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
    <Card className="bg-[#e9f0f7] border-[#b0c8e6] shadow-md overflow-hidden relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23143a5c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
      
      <CardHeader className="bg-gradient-to-r from-[#b0c8e6] to-[#9fbfdf] text-center pb-2 py-2 relative border-b border-[#b0c8e6]">
        <div className="flex items-center justify-center">
          <BookOpen className="text-[#143a5c] mr-2" size={16} />
          <h2 className="text-sm font-bold text-[#143a5c] flex items-center">
            فال تاروت
            <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-[#143a5c] opacity-70" /></span>
          </h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 px-3 relative">
        <div className="space-y-3">
          <p className="text-center text-[#143a5c] text-xs font-medium bg-white/40 p-2 rounded-md border border-[#b0c8e6]/30 shadow-sm">
            سه کارت تاروت که نشان‌دهنده گذشته، حال و آینده شماست انتخاب کنید.
          </p>
          
          <TarotCardDisplay 
            selectedCards={selectedCards}
            isRevealed={isRevealed}
            isAnimating={isAnimating}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/30 border-t border-[#b0c8e6]/20">
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
