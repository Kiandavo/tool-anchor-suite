import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Star, Sun } from 'lucide-react';

interface MysticalLoadingProps {
  type?: 'stars' | 'moon' | 'crystals' | 'cards' | 'cosmic';
  text?: string;
}

export const MysticalLoading: React.FC<MysticalLoadingProps> = ({ 
  type = 'cosmic',
  text = 'در حال بارگذاری...' 
}) => {
  const renderLoading = () => {
    switch (type) {
      case 'stars':
        return <StarsLoading />;
      case 'moon':
        return <MoonLoading />;
      case 'crystals':
        return <CrystalsLoading />;
      case 'cards':
        return <CardsLoading />;
      default:
        return <CosmicLoading />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {renderLoading()}
      <motion.p
        className="text-sm text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

const StarsLoading = () => (
  <div className="relative w-24 h-24">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          delay: i * 0.2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Star
          className="absolute top-0 left-1/2 -translate-x-1/2 text-primary"
          size={16 + i * 2}
          style={{ opacity: 1 - i * 0.15 }}
        />
      </motion.div>
    ))}
  </div>
);

const MoonLoading = () => (
  <div className="relative w-24 h-24">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      <Moon className="w-24 h-24 text-primary" />
    </motion.div>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          delay: i * 0.7,
          repeat: Infinity,
        }}
      >
        <div className="w-24 h-24 rounded-full border-2 border-primary" />
      </motion.div>
    ))}
  </div>
);

const CrystalsLoading = () => (
  <div className="flex items-center justify-center gap-2">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-3 h-12 bg-gradient-to-t from-primary to-primary/30 rounded-sm"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          delay: i * 0.15,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

const CardsLoading = () => (
  <div className="relative w-32 h-24">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg border-2 border-primary"
        initial={{ x: 0, rotate: 0 }}
        animate={{
          x: [0, 20 * i, 0],
          rotate: [0, 5 * (i - 1), 0],
        }}
        transition={{
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

const CosmicLoading = () => (
  <div className="relative w-32 h-32">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      <Sun className="w-full h-full text-primary" />
    </motion.div>
    
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2"
        style={{
          rotate: `${i * 45}deg`,
          transformOrigin: '0 0',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          delay: i * 0.2,
          repeat: Infinity,
        }}
      >
        <Sparkles className="text-primary -translate-x-16" size={16} />
      </motion.div>
    ))}
  </div>
);
