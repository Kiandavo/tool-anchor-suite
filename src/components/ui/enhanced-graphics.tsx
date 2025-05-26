
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';
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
        <motion.div
          key={i}
          className="absolute w-20 h-20 rounded-full opacity-20"
          style={{
            background: `linear-gradient(45deg, hsl(${i * 60}, 70%, 60%), hsl(${(i * 60) + 30}, 70%, 70%))`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );

  const WavePattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            d: [
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
              "M0,80 C200,40 400,80 600,40 C800,80 1000,40 1200,80 L1200,120 L0,120 Z",
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );

  const InteractiveIcons = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[Sparkles, Star, Heart, Zap].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-400 opacity-30"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          <Icon size={16 + i * 4} />
        </motion.div>
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
      <motion.div
        className="fixed w-4 h-4 bg-blue-400 rounded-full opacity-20 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </div>
  );
};
