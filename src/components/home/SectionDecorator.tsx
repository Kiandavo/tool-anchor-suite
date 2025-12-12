import React from 'react';

interface SectionDecoratorProps {
  variant?: 'dots' | 'diamonds' | 'circles' | 'stars' | 'grid';
  position?: 'left' | 'right' | 'both';
  opacity?: number;
}

export const SectionDecorator: React.FC<SectionDecoratorProps> = ({ 
  variant = 'dots', 
  position = 'right',
  opacity = 0.15 
}) => {
  const renderShape = () => {
    switch (variant) {
      case 'diamonds':
        return (
          <>
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary animate-float">
              <polygon points="16,0 32,16 16,32 0,16" fill="currentColor" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-persian-gold animate-float mt-8 mr-4" style={{ animationDelay: '-1s' }}>
              <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" />
            </svg>
          </>
        );
      case 'circles':
        return (
          <>
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-persian-turquoise animate-float">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="20" r="8" fill="currentColor" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary animate-float mt-6 mr-6" style={{ animationDelay: '-1.5s' }}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </>
        );
      case 'stars':
        return (
          <>
            <svg width="36" height="36" viewBox="0 0 36 36" className="text-persian-gold animate-float">
              <path d="M18 0 L21 15 L36 18 L21 21 L18 36 L15 21 L0 18 L15 15 Z" fill="currentColor" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-primary animate-float mt-10 mr-2" style={{ animationDelay: '-2s' }}>
              <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="currentColor" />
            </svg>
          </>
        );
      case 'grid':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-foreground animate-pulse-subtle">
            <defs>
              <pattern id="section-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#section-grid)" />
          </svg>
        );
      case 'dots':
      default:
        return (
          <>
            <div className="flex gap-2 animate-float">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-persian-gold" />
              <div className="w-2 h-2 rounded-full bg-persian-turquoise" />
            </div>
            <div className="flex gap-2 mt-4 mr-3 animate-float" style={{ animationDelay: '-1s' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-persian-purple" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </>
        );
    }
  };

  return (
    <>
      {(position === 'right' || position === 'both') && (
        <div 
          className="absolute top-4 right-4 pointer-events-none hidden sm:block"
          style={{ opacity }}
        >
          {renderShape()}
        </div>
      )}
      {(position === 'left' || position === 'both') && (
        <div 
          className="absolute bottom-4 left-4 pointer-events-none hidden sm:block"
          style={{ opacity }}
        >
          {renderShape()}
        </div>
      )}
    </>
  );
};