import React, { useEffect, useState } from 'react';

// Use optimized 1024x1024 logo for 128px display (better for retina displays)
const laangarLogo = '/assets/laangar-logo-128.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reduced splash duration to 500ms for faster TTI
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete
      setTimeout(onComplete, 200);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - onComplete should be stable

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-200 ${
        isVisible 
          ? 'opacity-100 bg-background' 
          : 'opacity-0 bg-transparent pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="animate-fade-in animate-scale">
          <img
            src={laangarLogo}
            alt="LAANGAR"
            width={128}
            height={128}
            className="h-32 w-32 object-contain"
            // @ts-ignore - fetchpriority is valid HTML but React types don't recognize it yet
            fetchpriority="high"
            style={{
              animation: 'fadeIn 800ms ease-out, scale 600ms ease-out',
              aspectRatio: '1 / 1'
            }}
          />
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
};
