
import React from 'react';
import { FortuneTellingSection } from './sections/FortuneTellingSection';
import { MysticalExplorationSection } from './sections/MysticalExplorationSection';

export const FalSection = () => {
  return (
    <section className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-purple-300/30 neo-glass p-8 bg-gradient-to-br from-purple-50/50 to-indigo-50/30" style={{ animationDelay: '0.15s' }}>
      <FortuneTellingSection />
      
      <div className="mt-10">
        <MysticalExplorationSection />
      </div>
    </section>
  );
};

export default FalSection;
