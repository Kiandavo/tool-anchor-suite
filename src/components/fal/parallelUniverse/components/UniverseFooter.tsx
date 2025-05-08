
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { RefreshCw, Copy, Sparkles } from "lucide-react";

interface UniverseFooterProps {
  isLoading: boolean;
  universe: any; // Using any here to avoid circular dependency with types
  onRefresh: () => void;
  onCopy: () => void;
}

const UniverseFooter: React.FC<UniverseFooterProps> = ({ isLoading, universe, onRefresh, onCopy }) => {
  return (
    <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 pt-3 pb-3 bg-white/30 border-t border-[#2a1c64]/10">
      <Button 
        onClick={onRefresh} 
        disabled={isLoading}
        size="sm" 
        className="bg-[#2a1c64] hover:bg-[#1e1256] text-white text-xs h-8 px-4 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
        {isLoading ? 
          <RefreshCw className="animate-spin mr-1" size={14} /> : 
          <Sparkles size={14} className="mr-1" />
        }
        کشف جهان دیگر
      </Button>
      
      {universe && (
        <Button 
          variant="outline"
          size="sm"
          onClick={onCopy} 
          className="border-[#2a1c64] text-[#2a1c64] text-xs h-8 px-3"
        >
          <Copy size={14} className="mr-1" />
          کپی اطلاعات
        </Button>
      )}
    </CardFooter>
  );
};

export default UniverseFooter;
