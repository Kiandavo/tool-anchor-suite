
import React from 'react';
import { HafezFortune } from '../HafezFortune';
import { Horoscope } from './Horoscope';
import { TarotReading } from './TarotReading';
import { RumiIstikhara } from './RumiIstikhara';
import { Star } from 'lucide-react';

export const FalSection = () => {
  return (
    <section className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      {/* Section Header */}
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
      
      {/* Tarot Reading Row */}
      <div className="mt-6 relative">
        <div className="absolute top-0 left-0 w-full -mt-6">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6]/30 to-transparent w-full"></div>
        </div>
        <TarotReading />
      </div>
    </section>
  );
};
