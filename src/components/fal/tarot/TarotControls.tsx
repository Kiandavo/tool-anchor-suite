
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, CircleHelp, Sparkles, BookOpen } from "lucide-react";
import { type TarotCardType, type TarotReadingConfig, tarotReadingTypes } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TarotControlsProps {
  selectedCards: TarotCardType[];
  isAnimating: boolean;
  isRevealed: boolean;
  onDrawCards: () => void;
  onRevealMeaning: () => void;
  onCopyReading: () => void;
  readingType: TarotReadingConfig;
  onReadingTypeChange: (type: string) => void;
  allowReversedCards: boolean;
  onToggleReversedCards: () => void;
  userQuestion: string;
  onQuestionChange: (question: string) => void;
}

export const TarotControls: React.FC<TarotControlsProps> = ({ 
  selectedCards,
  isAnimating,
  isRevealed,
  onDrawCards,
  onRevealMeaning,
  onCopyReading,
  readingType,
  onReadingTypeChange,
  allowReversedCards,
  onToggleReversedCards,
  userQuestion,
  onQuestionChange
}) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-1/2">
          <label className="block text-xs text-[#143a5c] mb-1">نوع خوانش</label>
          <Select onValueChange={onReadingTypeChange} value={readingType.id}>
            <SelectTrigger className="w-full bg-background border-[#b0c8e6]">
              <SelectValue placeholder={readingType.name} />
            </SelectTrigger>
            <SelectContent>
              {tarotReadingTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-[#143a5c]/70 mt-1">{readingType.description}</p>
        </div>

        <div className="w-full sm:w-1/2">
          {readingType.id === 'yes-no' && (
            <div>
              <label className="block text-xs text-[#143a5c] mb-1">سؤال شما</label>
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => onQuestionChange(e.target.value)}
                placeholder="سؤال بله/خیر خود را بنویسید..."
                className="w-full p-2 rounded bg-background border border-[#b0c8e6] text-sm"
              />
            </div>
          )}
          
          {readingType.id !== 'yes-no' && (
            <div className="flex items-center justify-end space-x-2 flex-row-reverse">
              <Switch
                id="reversed-cards"
                checked={allowReversedCards}
                onCheckedChange={onToggleReversedCards}
              />
              <Label htmlFor="reversed-cards" className="text-xs text-[#143a5c]">
                استفاده از کارت‌های معکوس (وارونه - برای دقت بیشتر)
              </Label>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          onClick={onDrawCards} 
          disabled={isAnimating}
          size="sm" 
          className="fortune-button-primary bg-[#b0c8e6] hover:bg-[#95b1d6] text-[#143a5c] text-[14px] h-9 px-4 transition-all duration-300 hover:shadow-md relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          {isAnimating ? 
            <RefreshCw className="animate-spin ml-1" size={16} /> : 
            <Sparkles className="ml-1" size={16} />
          }
          کشیدن کارت
        </Button>
        
        {selectedCards.length > 0 && !isRevealed && (
          <Button 
            variant="outline"
            size="sm"
            onClick={onRevealMeaning} 
            className="border-[#b0c8e6] text-[#143a5c] text-[14px] h-9 px-4 transition-all duration-300 hover:border-[#95b1d6] hover:shadow-md relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            <CircleHelp size={16} className="ml-1" />
            آشکار کردن معنی
          </Button>
        )}
        
        {selectedCards.length > 0 && (
          <Button 
            variant="outline"
            size="sm"
            onClick={onCopyReading} 
            className="border-[#b0c8e6] text-[#143a5c] text-[14px] h-9 px-4 transition-all duration-300 hover:border-[#95b1d6] hover:shadow-md relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            <Copy size={16} className="ml-1" />
            کپی فال
          </Button>
        )}
        
        <Button 
          variant="outline"
          size="sm"
          className="border-[#b0c8e6] text-[#143a5c] text-[14px] h-9 px-4 transition-all duration-300 hover:border-[#95b1d6] hover:shadow-md relative overflow-hidden group"
          onClick={() => document.getElementById('tarot-guide-dialog')?.click()}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          <BookOpen size={16} className="ml-1" />
          راهنما
        </Button>
      </div>
    </div>
  );
};
