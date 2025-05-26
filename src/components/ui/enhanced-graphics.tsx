
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGraphicsProps {
  variant?: 'floating-orbs' | 'particles' | 'waves' | 'minimal';
  className?: string;
}

export const EnhancedGraphics: React.FC<EnhancedGraphicsProps> = ({ 
  variant = 'minimal',
  className 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-20 h-20 rounded-full opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(45deg, hsl(${i * 60}, 70%, 60%), hsl(${(i * 60) + 30}, 70%, 70%))`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`
          }}
        />
      ))}
    </div>
  );

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );

  const WavePattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
          fill="rgba(59, 130, 246, 0.1)"
          className="animate-pulse"
        />
      </svg>
    </div>
  );

  const InteractiveIcons = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute text-blue-400 opacity-30 animate-spin"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
            animationDuration: `${5 + i}s`,
            animationDelay: `${i * 0.8}s`
          }}
        >
          <div className={`w-${4 + i} h-${4 + i} bg-current rounded-full`} />
        </div>
      ))}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'floating-orbs':
        return <FloatingOrbs />;
      case 'particles':
        return <ParticleField />;
      case 'waves':
        return <WavePattern />;
      default:
        return <InteractiveIcons />;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderVariant()}
      
      {/* Cursor follower effect */}
      <div
        className="fixed w-4 h-4 bg-blue-400 rounded-full opacity-20 pointer-events-none z-50 transition-all duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />
    </div>
  );
};
