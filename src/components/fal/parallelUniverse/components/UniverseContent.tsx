
import React from 'react';
import { motion } from "framer-motion";
import { ParallelUniverse } from '../types';
import { getUniverseTypeTextColor, getUniverseTypeBadge, getUniverseTypeInPersian } from '../universeStyleUtils';

interface UniverseContentProps {
  universe: ParallelUniverse;
  hasNewUniverse: boolean;
}

const UniverseContent: React.FC<UniverseContentProps> = ({ universe, hasNewUniverse }) => {
  return (
    <div className="space-y-4 universe-appear">
      {/* New universe indicator */}
      {hasNewUniverse && (
        <div className="text-center">
          <span className="inline-block bg-[#2a1c64]/10 text-[#2a1c64] text-xs px-3 py-1 rounded-full border border-[#2a1c64]/30 animate-pulse">
            ✨ جهان موازی جدید کشف شد ✨
          </span>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="w-16 h-0.5 bg-[#2a1c64]/30"></div>
      </div>
      
      <div className="text-center">
        <h3 className={`font-bold text-lg ${getUniverseTypeTextColor(universe.type)}`}>{universe.name}</h3>
        <div className="mt-1 flex justify-center">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${getUniverseTypeBadge(universe.type)}`}>
            {getUniverseTypeInPersian(universe.type)}
          </span>
        </div>
      </div>
      
      <motion.div 
        className="bg-white/60 p-4 rounded-lg border shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className={`text-sm leading-6 ${getUniverseTypeTextColor(universe.type)}`}>{universe.description}</p>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h4 className="font-medium text-[#2a1c64] text-sm">ویژگی‌های این جهان:</h4>
        <ul className="space-y-2">
          {universe.characteristics.map((characteristic, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            >
              <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${getUniverseTypeBadge(universe.type)}`}></span>
              <span className="text-sm text-gray-700">{characteristic}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        className={`p-4 rounded-lg border ${getUniverseTypeBadge(universe.type)} mt-2`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h4 className={`font-medium ${getUniverseTypeTextColor(universe.type)} text-sm mb-2`}>شما در این جهان:</h4>
        <p className="text-gray-700 text-sm">{universe.youInThisUniverse}</p>
      </motion.div>
      
      <motion.div 
        className="text-center text-xs text-gray-500 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        احتمال وجود این جهان: {(universe.probability * 100).toFixed(4)}%
      </motion.div>
    </div>
  );
};

export default UniverseContent;
