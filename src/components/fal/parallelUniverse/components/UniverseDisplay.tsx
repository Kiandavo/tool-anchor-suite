
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from "lucide-react";
import { ParallelUniverseData } from '../universeTypes';

interface UniverseDisplayProps {
  isGenerated: boolean;
  isLoading: boolean;
  universeData: ParallelUniverseData;
}

export const UniverseDisplay: React.FC<UniverseDisplayProps> = ({ 
  isGenerated, 
  isLoading, 
  universeData 
}) => {
  return (
    <div className="relative min-h-[200px] flex items-center justify-center">
      {!isGenerated ? (
        <div className="text-center p-6 bg-white/30 rounded-lg border border-[#a99af0]/30 w-full">
          <p className="text-[#2a1c64] text-sm">برای دیدن نسخه موازی خود دکمه «کشف جهان موازی» را بزنید.</p>
        </div>
      ) : (
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 bg-white/40 rounded-lg shadow-md border border-[#a99af0]/30 relative overflow-hidden">
            {/* Decorative portal frame */}
            <div className="absolute inset-0 border-8 border-[#6e42ca]/20 rounded-lg z-0 pointer-events-none"></div>
            <div className="absolute inset-2 border-2 border-[#a99af0]/30 rounded-md z-0 pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-[#2a1c64] text-sm font-medium mb-2 border-b border-[#a99af0]/20 pb-2">
                {universeData.title}
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4 py-2">
                <div className="w-full md:w-1/3">
                  <div className="bg-gradient-to-br from-[#a99af0]/30 to-[#6e42ca]/30 p-3 rounded-lg text-center h-full flex flex-col justify-center">
                    <div className="text-[#2a1c64] font-bold mb-1 text-sm">{universeData.identity}</div>
                    <div className="text-[#2a1c64]/80 text-xs">نقش شما در این جهان</div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-2">
                  <p className="text-xs text-[#2a1c64] leading-6">{universeData.description}</p>
                  
                  <div className="bg-white/40 p-2 rounded border border-[#a99af0]/20">
                    <h4 className="text-[#2a1c64] text-xs font-medium mb-1">ویژگی‌های شما در این جهان:</h4>
                    <ul className="space-y-1">
                      {universeData.traits.map((trait, index) => (
                        <li key={index} className="text-[#2a1c64]/90 text-xs flex items-center">
                          <span className="inline-block w-1 h-1 bg-[#6e42ca] rounded-full ml-2"></span>
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Special note */}
              <div className="mt-3 pt-2 border-t border-[#a99af0]/20">
                <h4 className="text-[#2a1c64] text-xs font-medium mb-2">در این جهان:</h4>
                <p className="text-xs text-[#2a1c64]/90 italic">
                  {universeData.specialNote}
                </p>
              </div>
              
              {/* Chance */}
              <div className="mt-3 bg-[#6e42ca]/10 p-2 rounded text-center">
                <p className="text-xs text-[#2a1c64]">
                  <span className="font-medium">احتمال وجود این نسخه از شما: </span>
                  {universeData.probability}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
          <div className="text-center">
            <RefreshCw size={24} className="animate-spin mx-auto text-[#6e42ca] mb-2" />
            <p className="text-sm text-[#2a1c64]">در حال جستجوی جهان‌های موازی...</p>
          </div>
        </div>
      )}
    </div>
  );
};
