
import React from 'react';
import { HafezFortune } from '../HafezFortune';
import { Horoscope } from './Horoscope';
import { TarotReading } from './TarotReading';

export const FalSection = () => {
  return (
    <section className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      <div className="grid md:grid-cols-2 gap-3">
        <HafezFortune />
        <Horoscope />
      </div>
      <div className="grid md:grid-cols-1 gap-3">
        <TarotReading />
      </div>
    </section>
  );
};
