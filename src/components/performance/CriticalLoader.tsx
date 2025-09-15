import React, { useEffect, useState } from 'react';

interface CriticalLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const CriticalLoader: React.FC<CriticalLoaderProps> = ({ 
  children, 
  fallback 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after React takes control
    const timer = setTimeout(() => {
      setIsHydrated(true);
      
      // Fade out critical static content
      const criticalHero = document.getElementById('critical-hero');
      if (criticalHero) {
        criticalHero.style.transition = 'opacity 0.3s ease-out';
        criticalHero.style.opacity = '0';
        setTimeout(() => {
          criticalHero.style.display = 'none';
        }, 300);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show fallback during hydration if critical content exists
  if (!isHydrated && document.getElementById('critical-hero')) {
    return fallback || null;
  }

  return <>{children}</>;
};