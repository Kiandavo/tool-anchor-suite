import React from 'react';

export const MysticalBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
      {/* Flowing Persian patterns */}
      <defs>
        <linearGradient id="rumiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
        </linearGradient>
        
        <pattern id="persianKnot" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 10 Q45 15 45 30 Q45 45 30 50 Q15 45 15 30 Q15 15 30 10 Z" 
                stroke="url(#rumiGradient)" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.4"/>
        </pattern>
      </defs>
      
      {/* Background pattern */}
      <rect x="0" y="0" width="800" height="600" fill="url(#persianKnot)" />
      
      {/* Animated flowing lines */}
      <path
        d="M100 150 Q200 100 300 150 Q400 200 500 150 Q600 100 700 150"
        stroke="url(#rumiGradient)"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <path
        d="M100 300 Q150 250 200 300 Q250 350 300 300 Q350 250 400 300 Q450 350 500 300 Q550 250 600 300 Q650 350 700 300"
        stroke="url(#rumiGradient)"
        strokeWidth="1.5"
        fill="none"
        className="animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      />
      <path
        d="M100 450 Q200 400 300 450 Q400 500 500 450 Q600 400 700 450"
        stroke="url(#rumiGradient)"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />
    </svg>
  </div>
);

export const FloatingElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Mystical symbols floating around */}
    <div className="absolute top-1/4 right-1/6 text-primary/30 animate-float">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    
    <div className="absolute bottom-1/3 left-1/5 text-primary/20 animate-float" style={{ animationDelay: '2s' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    
    <div className="absolute top-2/3 right-1/4 text-primary/25 animate-float" style={{ animationDelay: '4s' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9a9 9 0 0 0 6.64-2.95c-5.78-.77-10.27-5.64-10.27-11.55 0-2.07.55-4 1.5-5.68C12.18 3.02 12.09 3 12 3z"/>
      </svg>
    </div>
    
    {/* Additional decorative elements */}
    <div className="absolute top-1/6 left-1/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/5 right-2/5 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
    <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '5s' }}></div>
  </div>
);

export const PoemRevealAnimation = ({ isRevealing }: { isRevealing: boolean }) => (
  <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
    isRevealing ? 'opacity-100' : 'opacity-0'
  }`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"></div>
  </div>
);

export const MysticalGlow = ({ intensity = 1 }: { intensity?: number }) => (
  <div 
    className="absolute inset-0 pointer-events-none rounded-2xl"
    style={{
      background: `radial-gradient(ellipse at center, hsl(var(--primary) / ${0.1 * intensity}) 0%, transparent 60%)`,
      filter: 'blur(20px)',
    }}
  ></div>
);