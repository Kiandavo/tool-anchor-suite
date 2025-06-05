
import React from 'react';
import { dreamSymbols } from '@/data/dream-symbols';

const DreamSymbolsReference: React.FC = () => {
  return (
    <div className="bg-white/40 p-3 rounded-lg border border-indigo-200">
      <h4 className="font-semibold text-indigo-800 mb-2 text-sm">
        نمادهای رایج در خواب:
      </h4>
      <div className="grid grid-cols-2 gap-1 text-xs">
        {dreamSymbols.slice(0, 6).map((symbol, index) => (
          <div key={index} className="text-gray-600">
            {symbol.symbol} - {symbol.meaning.split('،')[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamSymbolsReference;
