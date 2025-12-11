import React, { ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  duration?: number;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: string, duration: number): Variants => {
  const baseTransition = {
    duration,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
  };

  const variants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    left: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    right: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: baseTransition },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: baseTransition },
    },
  };

  return variants[direction] || variants.up;
};

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  amount = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const variants = getVariants(direction, duration);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation wrapper
interface StaggeredAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggeredAnimationWrapper: React.FC<StaggeredAnimationWrapperProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual staggered item
export const StaggeredItem: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
