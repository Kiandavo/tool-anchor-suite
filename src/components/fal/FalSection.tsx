
import React from 'react';
import { HafezFortune } from '../HafezFortune';
import { Horoscope } from './Horoscope';
import { TarotReading } from './TarotReading';
import { RumiIstikhara } from './RumiIstikhara';
import { ParallelUniverseExplorer } from './parallelUniverse/ParallelUniverseExplorer';
import { Star, Globe } from 'lucide-react';

export const FalSection = () => {
  return (
    <section className="mb-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      {/* Section Header - Fortune Telling */}
      <div className="flex items-center justify-center mb-3">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-transparent w-1/4"></div>
        <h2 className="text-center text-[#143a5c] font-bold text-lg px-4 flex items-center">
          <Star size={16} className="ml-2 text-[#b0c8e6]" />
          فال و طالع بینی
        </h2>
        <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6] via-[#b0c8e6] to-transparent w-1/4"></div>
      </div>
      
      {/* Hafez, Horoscope, and Rumi Row */}
      <div className="grid md:grid-cols-3 gap-4 relative">
        <HafezFortune />
        <Horoscope />
        <RumiIstikhara />
      </div>
      
      {/* Section Header - Mystical Exploration */}
      <div className="flex items-center justify-center mb-3 mt-10">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#a99af0] to-transparent w-1/4"></div>
        <h2 className="text-center text-[#2a1c64] font-bold text-lg px-4 flex items-center">
          <Globe size={16} className="ml-2 text-[#a99af0]" />
          اکتشافات عرفانی
        </h2>
        <div className="h-0.5 bg-gradient-to-r from-[#a99af0] via-[#a99af0] to-transparent w-1/4"></div>
      </div>
      
      {/* Tarot Reading and Parallel Universe Row */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        <div>
          <TarotReading />
        </div>
        <div>
          <ParallelUniverseExplorer />
        </div>
      </div>
      
      {/* Visual connector between the two components */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#6e42ca" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="#143a5c" strokeWidth="1" fill="none" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#6e42ca" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#143a5c" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};
