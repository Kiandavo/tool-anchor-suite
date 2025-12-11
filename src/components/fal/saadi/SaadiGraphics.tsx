import React from 'react';
import { motion } from 'framer-motion';

// Rose petal pattern inspired by Gulistan (Rose Garden)
export const RosePattern: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <pattern id="rosePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Rose petals */}
            <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-rose-600">
              <path d="M40,20 Q50,30 40,40 Q30,30 40,20" />
              <path d="M40,20 Q45,25 40,30 Q35,25 40,20" />
              <path d="M30,30 Q40,40 50,30" />
              <circle cx="40" cy="35" r="3" fill="currentColor" opacity="0.3" />
            </g>
            {/* Leaves */}
            <g fill="none" stroke="currentColor" strokeWidth="0.3" className="text-emerald-600">
              <path d="M25,50 Q40,45 55,50 Q40,55 25,50" />
              <path d="M40,45 L40,55" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rosePattern)" />
      </svg>
    </div>
  );
};

// Animated floating rose petals
export const FloatingRosePetals: React.FC = () => {
  const petals = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 8 + Math.random() * 4,
    startX: Math.random() * 100,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-rose-400/30"
          initial={{
            x: `${petal.startX}%`,
            y: '-10%',
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: '110%',
            rotate: petal.rotation + 180,
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C10 2 8 6 8 10C8 14 12 22 12 22C12 22 16 14 16 10C16 6 14 2 12 2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Persian geometric border
export const PersianBorder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      {/* Corner ornaments */}
      <svg className="absolute top-2 left-2 w-12 h-12 text-amber-600/30" viewBox="0 0 48 48">
        <path
          d="M0 0 L24 0 A24 24 0 0 0 0 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M4 4 L20 4 A16 16 0 0 0 4 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
      
      <svg className="absolute top-2 right-2 w-12 h-12 text-amber-600/30 rotate-90" viewBox="0 0 48 48">
        <path
          d="M0 0 L24 0 A24 24 0 0 0 0 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M4 4 L20 4 A16 16 0 0 0 4 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
      
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      {/* Bottom corner ornaments */}
      <svg className="absolute bottom-2 left-2 w-12 h-12 text-amber-600/30 -rotate-90" viewBox="0 0 48 48">
        <path
          d="M0 0 L24 0 A24 24 0 0 0 0 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      
      <svg className="absolute bottom-2 right-2 w-12 h-12 text-amber-600/30 rotate-180" viewBox="0 0 48 48">
        <path
          d="M0 0 L24 0 A24 24 0 0 0 0 24 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

// Book opening animation
export const BookAnimation: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <motion.div
      className="relative w-32 h-24 mx-auto"
      initial={{ perspective: 1000 }}
    >
      {/* Book base */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-900 rounded-sm shadow-lg" />
      
      {/* Left page */}
      <motion.div
        className="absolute inset-y-1 left-1 right-1/2 bg-amber-50 rounded-l-sm origin-right"
        animate={{
          rotateY: isOpen ? -30 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 text-[6px] text-amber-900/50 font-serif leading-tight">
          بنی آدم اعضای یکدیگرند
        </div>
      </motion.div>
      
      {/* Right page */}
      <motion.div
        className="absolute inset-y-1 left-1/2 right-1 bg-amber-50 rounded-r-sm origin-left"
        animate={{
          rotateY: isOpen ? 30 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-2 text-[6px] text-amber-900/50 font-serif leading-tight text-right">
          که در آفرینش ز یک گوهرند
        </div>
      </motion.div>
      
      {/* Book spine */}
      <div className="absolute inset-y-0 left-1/2 w-1 -ml-0.5 bg-gradient-to-b from-amber-700 to-amber-900" />
    </motion.div>
  );
};

// Meditation breathing circle
export const MeditationCircle: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-900/95 to-amber-900/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          className="w-48 h-48 rounded-full border-4 border-amber-400/50 mx-auto mb-8"
          animate={{
            scale: [1, 1.2, 1],
            borderColor: ['rgba(251, 191, 36, 0.5)', 'rgba(52, 211, 153, 0.5)', 'rgba(251, 191, 36, 0.5)'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/20 to-emerald-400/20 flex items-center justify-center"
            animate={{
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-4xl">🌹</span>
          </motion.div>
        </motion.div>
        
        <motion.p
          className="text-amber-200 font-heading text-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          چشم‌ها را ببندید و نیت کنید...
        </motion.p>
        
        <motion.p
          className="text-amber-100/60 font-body text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          نفس عمیق بکشید
        </motion.p>
      </div>
    </motion.div>
  );
};

// Gulistan/Bustan book icon
export const SaadiBookIcon: React.FC<{ source: 'gulistan' | 'bustan' | 'ghazaliyat' | 'qasaid' }> = ({ source }) => {
  const colors = {
    gulistan: 'from-rose-400 to-pink-600',
    bustan: 'from-emerald-400 to-green-600',
    ghazaliyat: 'from-amber-400 to-orange-600',
    qasaid: 'from-blue-400 to-indigo-600',
  };
  
  const icons = {
    gulistan: '🌹',
    bustan: '🌳',
    ghazaliyat: '💝',
    qasaid: '📜',
  };
  
  return (
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${colors[source]} shadow-lg`}>
      <span className="text-xl">{icons[source]}</span>
    </div>
  );
};
