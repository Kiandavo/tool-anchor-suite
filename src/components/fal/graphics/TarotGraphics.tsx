import React from 'react';

export const CosmicStarField = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="stars-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

export const MysticalSymbols = ({ isVisible = false }: { isVisible?: boolean }) => (
  <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
    <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
      {/* Mystical circle */}
      <circle
        cx="200"
        cy="200"
        r="150"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="animate-spin-slow opacity-30"
      />
      {/* Inner symbols */}
      <path
        d="M200 100 L220 140 L260 140 L230 170 L240 210 L200 190 L160 210 L170 170 L140 140 L180 140 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="animate-pulse"
      />
      {/* Constellation lines */}
      <path
        d="M100 100 L120 80 M120 80 L140 90 M300 100 L320 80 M320 80 L340 90"
        stroke="currentColor"
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </svg>
  </div>
);

export const CardFlipAnimation = ({ isFlipped = false, children }: { isFlipped?: boolean; children: React.ReactNode }) => (
  <div className="card-flip-container">
    <div className={`card-flip ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-face card-front">
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg flex items-center justify-center">
          <div className="text-white text-lg">🌟</div>
        </div>
      </div>
      <div className="card-face card-back">
        {children}
      </div>
    </div>
  </div>
);