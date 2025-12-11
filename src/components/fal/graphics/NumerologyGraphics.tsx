import React from 'react';
import { motion } from 'framer-motion';

// Floating numbers animation
export const FloatingNumbers = () => {
  const numbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {numbers.map((num, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl font-bold text-primary/5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          {num}
        </motion.span>
      ))}
    </div>
  );
};

// Sacred geometry pattern
export const SacredGeometryPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        {/* Flower of Life pattern */}
        {[...Array(7)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          const cx = 200 + Math.cos(angle) * 50;
          const cy = 200 + Math.sin(angle) * 50;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="50"
              className="stroke-primary"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          );
        })}
        <motion.circle
          cx="200"
          cy="200"
          r="50"
          className="stroke-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Outer circles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const cx = 200 + Math.cos(angle) * 100;
          const cy = 200 + Math.sin(angle) * 100;
          return (
            <motion.circle
              key={`outer-${i}`}
              cx={cx}
              cy={cy}
              r="50"
              className="stroke-primary/50"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: i * 0.2 + 1 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Number wheel animation
export const NumberWheel = ({ isAnimating = false }: { isAnimating?: boolean }) => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  
  return (
    <motion.div 
      className="relative w-32 h-32"
      animate={isAnimating ? { rotate: 360 } : {}}
      transition={{ duration: 3, ease: "linear", repeat: isAnimating ? Infinity : 0 }}
    >
      {numbers.map((num, i) => {
        const angle = (i * 40 - 90) * Math.PI / 180;
        const x = 50 + Math.cos(angle) * 45;
        const y = 50 + Math.sin(angle) * 45;
        
        return (
          <motion.div
            key={num}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={isAnimating ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              repeat: isAnimating ? Infinity : 0,
              repeatDelay: 1
            }}
          >
            {num}
          </motion.div>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-xl">
          <span className="text-white font-bold text-lg">∞</span>
        </div>
      </div>
    </motion.div>
  );
};

// Pulsing number display
export const PulsingNumber = ({ number, label }: { number: number; label: string }) => {
  return (
    <motion.div 
      className="relative flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl relative"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(99, 102, 241, 0.4)",
            "0 0 0 15px rgba(99, 102, 241, 0)",
            "0 0 0 0 rgba(99, 102, 241, 0)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-3xl font-bold text-white">{number}</span>
      </motion.div>
      <p className="mt-2 text-sm font-medium text-indigo-800">{label}</p>
    </motion.div>
  );
};

// Constellation lines connecting numbers
export const ConstellationLines = ({ points }: { points: { x: number; y: number }[] }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {points.map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        return (
          <motion.line
            key={i}
            x1={`${point.x}%`}
            y1={`${point.y}%`}
            x2={`${nextPoint.x}%`}
            y2={`${nextPoint.y}%`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-indigo-300/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        );
      })}
    </svg>
  );
};

// Animated grid background
export const NumerologyGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="w-full h-full opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// Master number badge
export const MasterNumberBadge = ({ number }: { number: number }) => {
  const isMasterNumber = [11, 22, 33].includes(number);
  
  if (!isMasterNumber) return null;
  
  return (
    <motion.div
      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity }
      }}
    >
      <span className="text-[10px] font-bold text-white">★</span>
    </motion.div>
  );
};

// Pythagorean triangle visualization
export const PythagoreanTriangle = ({ numbers }: { numbers: number[] }) => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="0 0 200 173" className="w-48 h-48">
        {/* Triangle outline */}
        <motion.polygon
          points="100,10 10,163 190,163"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-indigo-300/50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Inner triangles */}
        <motion.line x1="100" y1="10" x2="55" y2="86.5" className="text-indigo-200/30" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
        <motion.line x1="100" y1="10" x2="145" y2="86.5" className="text-indigo-200/30" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
        <motion.line x1="55" y1="86.5" x2="145" y2="86.5" className="text-indigo-200/30" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
        
        {/* Number nodes */}
        {[
          { x: 100, y: 30, num: numbers[0] || 1 },
          { x: 55, y: 86.5, num: numbers[1] || 2 },
          { x: 145, y: 86.5, num: numbers[2] || 3 },
          { x: 32, y: 143, num: numbers[3] || 4 },
          { x: 100, y: 143, num: numbers[4] || 5 },
          { x: 168, y: 143, num: numbers[5] || 6 },
        ].map((point, i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
            <circle cx={point.x} cy={point.y} r="15" className="fill-indigo-500" />
            <text x={point.x} y={point.y + 5} textAnchor="middle" className="fill-white text-sm font-bold">{point.num}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};
