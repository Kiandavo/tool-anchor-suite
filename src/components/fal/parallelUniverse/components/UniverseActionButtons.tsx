
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles, Copy } from "lucide-react";

interface UniverseActionButtonsProps {
  isGenerated: boolean;
  isLoading: boolean;
  onGenerateUniverse: () => void;
  onCopyUniverse: () => void;
}

export const UniverseActionButtons: React.FC<UniverseActionButtonsProps> = ({ 
  isGenerated,
  isLoading,
  onGenerateUniverse,
  onCopyUniverse
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2">
      <Button 
        onClick={onGenerateUniverse} 
        disabled={isLoading}
        size="sm" 
        className="bg-[#a99af0] hover:bg-[#9179e0] text-white text-[14px] h-9 px-4 transition-all duration-300 hover:shadow-md relative overflow-hidden group w-full sm:w-auto"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
        {isLoading ? 
          <RefreshCw className="ml-1" size={16} /> : 
          <Sparkles className="ml-1" size={16} />
        }
        کشف جهان موازی
      </Button>
      
      {isGenerated && (
        <Button 
          variant="outline"
          size="sm"
          onClick={onCopyUniverse} 
          className="border-[#a99af0] text-[#2a1c64] text-[14px] h-9 px-4 transition-all duration-300 hover:border-[#9179e0] hover:shadow-md relative overflow-hidden group w-full sm:w-auto"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          <Copy size={16} className="ml-1" />
          کپی اطلاعات
        </Button>
      )}
    </div>
  );
};
