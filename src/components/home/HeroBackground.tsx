import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - different speeds for depth effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base with parallax */}
      <motion.div 
        style={{ y: y1, scale, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-persian-turquoise/5" 
      />
      
      {/* Animated floating orbs with parallax */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-persian-gold/10 blur-3xl animate-float" 
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-10 left-[5%] w-80 h-80 rounded-full bg-gradient-to-br from-persian-turquoise/10 to-primary/5 blur-3xl animate-float" 
        transition={{ delay: 0.1 }}
      />
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-persian-purple/5 to-persian-rose/5 blur-3xl animate-pulse-subtle" 
      />
      
      {/* Geometric pattern overlay with parallax */}
      <motion.svg 
        style={{ y: y1, opacity }}
        className="absolute inset-0 w-full h-full opacity-[0.03]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </motion.svg>

      {/* Decorative Persian-inspired shapes with parallax */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-16 left-[15%] opacity-20"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary animate-float" style={{ animationDelay: '-0.5s' }}>
          <polygon points="20,0 40,20 20,40 0,20" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-20 right-[20%] opacity-15"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-persian-gold animate-float" style={{ animationDelay: '-2s' }}>
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="6" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/3 right-[8%] opacity-10"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" className="text-persian-turquoise animate-float" style={{ animationDelay: '-1s' }}>
          <path d="M24 4 L44 24 L24 44 L4 24 Z M24 12 L36 24 L24 36 L12 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/3 left-[12%] opacity-15"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" className="text-persian-purple animate-float" style={{ animationDelay: '-2.5s' }}>
          <path d="M18 0 L21 15 L36 18 L21 21 L18 36 L15 21 L0 18 L15 15 Z" fill="currentColor" />
        </svg>
      </motion.div>
      
      {/* Top edge gradient fade */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background to-transparent" />
      
      {/* Bottom edge gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};