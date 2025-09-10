import React from 'react';
import { CrystalVision } from './useCrystalBall';

interface VisionDisplayProps {
  vision: CrystalVision | null;
  isAnimating: boolean;
}

export const VisionDisplay: React.FC<VisionDisplayProps> = ({ vision, isAnimating }) => {
  if (!vision) return null;
  
  return (
    <div className={`space-y-6 transition-all duration-700 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Crystal ball visualization */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-radial from-purple-100/60 via-violet-200/40 to-purple-300/20 rounded-full border-4 border-purple-200/50 shadow-2xl">
            <div className="absolute inset-4 bg-gradient-radial from-white/30 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-white/20 rounded-full animate-pulse delay-500"></div>
          </div>
          <div className="absolute -inset-4 border border-purple-300/30 rounded-full animate-spin-slow"></div>
        </div>
      </div>

      {/* Vision content */}
      <div className="bg-gradient-to-br from-white/80 to-purple-50/80 p-6 rounded-lg border border-purple-200/50 shadow-inner">
        <div className="space-y-4">
          {/* Header info */}
          <div className="flex justify-between items-center text-sm">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
              {vision.category}
            </span>
            <span className="text-purple-600">
              ⏰ {vision.timeframe}
            </span>
          </div>
          
          {/* Symbols */}
          <div className="flex justify-center space-x-2 text-2xl">
            {vision.symbols.map((symbol, index) => (
              <span 
                key={index} 
                className="animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {symbol}
              </span>
            ))}
          </div>
          
          {/* Main prediction */}
          <div className="bg-white/60 p-4 rounded-lg border border-purple-200/30">
            <h3 className="text-purple-900 font-semibold mb-2">🔮 پیش‌بینی:</h3>
            <p className="text-purple-800 text-sm leading-relaxed">
              {vision.prediction}
            </p>
          </div>
          
          {/* Guidance */}
          <div className="bg-indigo-50/80 p-4 rounded-lg border border-indigo-200/50">
            <h3 className="text-indigo-900 font-semibold mb-2">🧭 راهنمایی:</h3>
            <p className="text-indigo-800 text-sm leading-relaxed">
              {vision.guidance}
            </p>
          </div>
          
          {/* Probability */}
          <div className="text-center">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              احتمال تحقق: {vision.probability}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};