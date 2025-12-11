import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};
