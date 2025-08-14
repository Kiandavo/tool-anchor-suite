import React from 'react';

export const HafezCalligraphyPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="w-full h-full opacity-10" viewBox="0 0 400 400" fill="none">
      <path
        d="M50 200 Q100 150 150 200 T250 200 Q300 250 350 200"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M80 180 Q130 130 180 180 T280 180"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
      <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.05" />
      <circle cx="300" cy="300" r="15" fill="currentColor" opacity="0.05" />
      <path
        d="M200 50 Q250 100 200 150 Q150 100 200 50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </svg>
  </div>
);

export const HafezBookAnimation = ({ isVisible = false }: { isVisible?: boolean }) => (
  <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
    <div className="relative w-16 h-12 mx-auto mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-r-lg transform rotate-y-12 shadow-lg">
        <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-r from-amber-100 to-amber-50 rounded-r-lg">
          <div className="p-1">
            <div className="w-full h-0.5 bg-amber-600 mb-1 opacity-70"></div>
            <div className="w-3/4 h-0.5 bg-amber-600 mb-1 opacity-50"></div>
            <div className="w-1/2 h-0.5 bg-amber-600 opacity-30"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 rounded-r-lg transform -rotate-y-6 shadow-xl z-10">
        <div className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-r from-amber-50 to-white rounded-r-lg">
          <div className="p-1 text-xs text-amber-800 font-bold">حافظ</div>
        </div>
      </div>
    </div>
  </div>
);

export const FloatingPersianLetters = () => (
  <div className="absolute inset-0 pointer-events-none">
    {['ح', 'ا', 'ف', 'ظ'].map((letter, i) => (
      <div
        key={i}
        className="absolute text-amber-400 text-2xl font-bold opacity-20 animate-float"
        style={{
          left: `${20 + i * 20}%`,
          top: `${10 + i * 15}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + i * 0.5}s`
        }}
      >
        {letter}
      </div>
    ))}
  </div>
);