import React from 'react';

export const PersianManuscriptBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
      {/* Manuscript border */}
      <rect x="20" y="20" width="360" height="360" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="30" y="30" width="340" height="340" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Persian geometric patterns */}
      <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 0 L30 10 L20 20 L10 10 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </pattern>
      <rect x="40" y="40" width="320" height="320" fill="url(#islamicPattern)" opacity="0.3" />
      
      {/* Calligraphy flowing lines */}
      <path
        d="M60 100 Q120 80 180 100 Q240 120 300 100 Q340 80 360 100"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M60 200 Q100 170 140 200 Q180 230 220 200 Q260 170 300 200"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <path
        d="M60 300 Q120 280 180 300 Q240 320 300 300"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
        style={{ animationDelay: '2s' }}
      />
    </svg>
  </div>
);

export const DervishSpinAnimation = ({ isSpinning = false }: { isSpinning?: boolean }) => (
  <div className={`transition-all duration-1000 ${isSpinning ? 'animate-spin-slow' : ''}`}>
    <div className="w-12 h-12 mx-auto mb-4 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 opacity-80">
        <div className="absolute top-1/2 left-1/2 w-2 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  </div>
);

export const SufiSymbols = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Heart symbol */}
    <div className="absolute top-4 right-4 text-amber-600 opacity-30 animate-pulse">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    
    {/* Crescent moon */}
    <div className="absolute bottom-4 left-4 text-amber-600 opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9a9 9 0 0 0 6.64-2.95c-5.78-.77-10.27-5.64-10.27-11.55 0-2.07.55-4 1.5-5.68C12.18 3.02 12.09 3 12 3z"/>
      </svg>
    </div>
    
    {/* Star */}
    <div className="absolute top-1/3 right-1/4 text-amber-600 opacity-30 animate-pulse" style={{ animationDelay: '2s' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
  </div>
);

export const FlowingArabicPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-5">
    <div className="absolute inset-0 text-6xl text-amber-800 font-bold">
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}>
        ﷲ
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
        ♥
      </div>
      <div className="absolute top-3/4 left-1/2 animate-float" style={{ animationDelay: '4s' }}>
        ۞
      </div>
    </div>
  </div>
);