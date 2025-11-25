import React from 'react';
import { motion } from 'framer-motion';

interface PersianCarpetPatternProps {
  type: 'jalali' | 'hijri' | 'gregorian';
  className?: string;
}

export default function PersianCarpetPattern({ type, className = '' }: PersianCarpetPatternProps) {
  const patterns = {
    jalali: {
      primary: 'hsl(var(--persian-turquoise))',
      secondary: 'hsl(var(--persian-gold))',
      accent: 'hsl(var(--persian-amber))',
      gradient: 'from-persian-turquoise/20 via-persian-gold/15 to-persian-amber/20'
    },
    hijri: {
      primary: 'hsl(var(--persian-purple))',
      secondary: 'hsl(var(--persian-blue))',
      accent: 'hsl(var(--persian-rose))',
      gradient: 'from-persian-purple/20 via-persian-blue/15 to-persian-rose/20'
    },
    gregorian: {
      primary: 'hsl(var(--persian-green))',
      secondary: 'hsl(180 85% 45%)',
      accent: 'hsl(145 70% 40%)',
      gradient: 'from-persian-green/20 via-emerald-500/15 to-teal-500/20'
    }
  };

  const currentPattern = patterns[type];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        key={type}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${currentPattern.gradient}`}
      />

      {/* Central medallion pattern */}
      <motion.svg
        key={`medallion-${type}`}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 0.15 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        viewBox="0 0 200 200"
      >
        {/* Outer border */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke={currentPattern.primary}
          strokeWidth="0.5"
        />
        
        {/* Main medallion */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={currentPattern.secondary}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Petal patterns */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.g
            key={`petal-${angle}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
          >
            <ellipse
              cx="100"
              cy="40"
              rx="15"
              ry="30"
              fill={currentPattern.accent}
              opacity="0.3"
              transform={`rotate(${angle} 100 100)`}
            />
          </motion.g>
        ))}
        
        {/* Inner star */}
        <motion.path
          d="M100,50 L105,80 L120,85 L105,90 L100,120 L95,90 L80,85 L95,80 Z"
          fill={currentPattern.primary}
          opacity="0.4"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ transformOrigin: '100px 85px' }}
        />
        
        {/* Geometric patterns */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={`line-${angle}`}
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke={currentPattern.secondary}
            strokeWidth="0.5"
            opacity="0.2"
            transform={`rotate(${angle} 100 100)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
          />
        ))}
      </motion.svg>

      {/* Corner ornaments */}
      {['top-0 left-0', 'top-0 right-0 scale-x-[-1]', 'bottom-0 left-0 scale-y-[-1]', 'bottom-0 right-0 scale-[-1]'].map((position, index) => (
        <motion.svg
          key={`corner-${index}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
          className={`absolute ${position} w-48 h-48`}
          viewBox="0 0 100 100"
        >
          <path
            d="M0,0 Q25,25 0,50 Q25,25 50,0 Z"
            fill={currentPattern.primary}
          />
          <path
            d="M5,5 Q20,20 5,35 Q20,20 35,5 Z"
            fill={currentPattern.secondary}
          />
          <circle cx="15" cy="15" r="3" fill={currentPattern.accent} />
          <circle cx="30" cy="8" r="2" fill={currentPattern.accent} />
          <circle cx="8" cy="30" r="2" fill={currentPattern.accent} />
        </motion.svg>
      ))}

      {/* Border patterns */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-2 opacity-10"
        style={{
          background: `repeating-linear-gradient(90deg, ${currentPattern.primary} 0px, ${currentPattern.secondary} 10px, ${currentPattern.accent} 20px, ${currentPattern.primary} 30px)`
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-2 opacity-10"
        style={{
          background: `repeating-linear-gradient(90deg, ${currentPattern.primary} 0px, ${currentPattern.secondary} 10px, ${currentPattern.accent} 20px, ${currentPattern.primary} 30px)`
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 bottom-0 w-2 opacity-10"
        style={{
          background: `repeating-linear-gradient(180deg, ${currentPattern.primary} 0px, ${currentPattern.secondary} 10px, ${currentPattern.accent} 20px, ${currentPattern.primary} 30px)`
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-0 right-0 bottom-0 w-2 opacity-10"
        style={{
          background: `repeating-linear-gradient(180deg, ${currentPattern.primary} 0px, ${currentPattern.secondary} 10px, ${currentPattern.accent} 20px, ${currentPattern.primary} 30px)`
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-4 h-4 opacity-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 20 20" fill={currentPattern.secondary}>
            <path d="M10,2 L12,8 L18,10 L12,12 L10,18 L8,12 L2,10 L8,8 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
