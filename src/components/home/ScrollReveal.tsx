import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Start visible with subtle position offset for reveal effect
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0.3, y: 20 };
      case 'down':
        return { opacity: 0.3, y: -20 };
      case 'left':
        return { opacity: 0.3, x: 20 };
      case 'right':
        return { opacity: 0.3, x: -20 };
      case 'none':
        return { opacity: 0.3 };
      default:
        return { opacity: 0.3, y: 20 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
