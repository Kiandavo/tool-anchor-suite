import React from 'react';

interface ModernBackgroundProps {
  variant?: 'dots' | 'mesh' | 'glow' | 'gradient' | 'minimal';
  className?: string;
  children?: React.ReactNode;
}

export const ModernBackground: React.FC<ModernBackgroundProps> = ({ 
  variant = 'mesh',
  className = '',
  children 
}) => {
  const getBackgroundElements = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        );
      
      case 'mesh':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02]" />
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-primary/[0.05] to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-accent/[0.04] to-transparent rounded-full blur-3xl" />
          </>
        );
      
      case 'glow':
        return (
          <>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/[0.04] rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/[0.03] rounded-full blur-[80px]" />
          </>
        );
      
      case 'gradient':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20" />
        );
      
      case 'minimal':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card/80" />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {getBackgroundElements()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Decorative floating orbs for sections
export const FloatingOrbs: React.FC<{ intensity?: 'light' | 'medium' | 'strong' }> = ({ 
  intensity = 'light' 
}) => {
  const opacityMap = {
    light: { primary: '0.03', secondary: '0.02' },
    medium: { primary: '0.05', secondary: '0.04' },
    strong: { primary: '0.08', secondary: '0.06' },
  };
  
  const opacity = opacityMap[intensity];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: `hsl(var(--primary) / ${opacity.primary})` }}
      />
      <div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[80px]"
        style={{ background: `hsl(var(--accent) / ${opacity.secondary})` }}
      />
    </div>
  );
};
