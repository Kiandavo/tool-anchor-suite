
import React from 'react';

interface PredictionDisplayProps {
  prediction: string;
  isAnimating: boolean;
  selectedZodiacSymbol: string;
  selectedSign: string;
}

export const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  prediction,
  isAnimating,
  selectedZodiacSymbol,
  selectedSign
}) => {
  if (!prediction) return null;
  
  return (
    <div className={`mt-3 space-y-2 ${isAnimating ? 'opacity-50' : 'reveal'}`} 
         style={{ transformOrigin: 'top center' }}>
      <div className="flex justify-center">
        <div className="w-16 h-0.5 bg-[#e6c8b0]/50"></div>
      </div>
      
      {/* Sign symbol at top */}
      {selectedSign && (
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-white/40 border border-[#e6c8b0] flex items-center justify-center">
            <span className="text-xl text-[#5c3f14]">
              {selectedZodiacSymbol}
            </span>
          </div>
        </div>
      )}
      
      <div className="bg-white/30 p-4 rounded-lg border border-[#e6c8b0]/30 shadow-inner relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%235c3f14' fill-opacity='0.4' d='M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12A6 6 0 018 2z'/%3E%3C/svg%3E")`,
          }} />
        </div>
        <p className="text-[#5c3f14] text-xs font-medium leading-6 relative z-10">{prediction}</p>
      </div>
    </div>
  );
};
