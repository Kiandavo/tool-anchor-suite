
import React from 'react';
import { Star } from 'lucide-react';

interface EmptyStateDisplayProps {
  selectedSign: string;
  selectedZodiacSymbol: string;
}

export const EmptyStateDisplay: React.FC<EmptyStateDisplayProps> = ({ 
  selectedSign,
  selectedZodiacSymbol
}) => {
  if (selectedSign) {
    return (
      <div className="flex justify-center my-2">
        <div className="w-16 h-16 rounded-full bg-white/40 border border-[#e6c8b0] flex items-center justify-center shadow-inner">
          <span className="text-4xl text-[#5c3f14] animate-pulse-slow">
            {selectedZodiacSymbol}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-center text-[#5c3f14] text-xs p-4 bg-white/30 rounded-md border border-[#e6c8b0]/20 shadow-inner my-3">
      <p className="mb-3">برای مشاهده طالع خود، ابتدا ماه تولد را انتخاب کنید.</p>
      <div className="flex justify-center mt-2">
        <div className="animate-float">
          <Star size={18} className="text-[#e6c8b0] opacity-70" />
        </div>
      </div>
    </div>
  );
};
