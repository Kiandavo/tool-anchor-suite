
import React from 'react';
import { motion } from 'framer-motion';
import { Moon } from "lucide-react";
import { DreamSymbol } from '@/data/dream-symbols';

interface DreamInterpretationResultProps {
  interpretation: string;
  foundSymbols: DreamSymbol[];
}

const DreamInterpretationResult: React.FC<DreamInterpretationResultProps> = ({
  interpretation,
  foundSymbols
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Interpretation Result */}
      <div className="bg-white/80 p-4 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-indigo-800 mb-3 flex items-center">
          <Moon className="ml-2" size={16} />
          تعبیر خواب شما
        </h3>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {interpretation}
        </div>
      </div>

      {/* Found Symbols */}
      {foundSymbols.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-lg border border-indigo-300">
          <h4 className="font-semibold text-indigo-800 mb-2">
            نمادهای یافت شده در خواب:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {foundSymbols.map((symbol, index) => (
              <div key={index} className="bg-white/70 p-2 rounded text-center">
                <span className="text-sm font-medium text-indigo-700">
                  {symbol.symbol}
                </span>
                <div className="text-xs text-gray-600 mt-1">
                  {symbol.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DreamInterpretationResult;
