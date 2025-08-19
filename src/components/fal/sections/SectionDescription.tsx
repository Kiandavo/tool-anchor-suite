
import React from 'react';

interface SectionDescriptionProps {
  title: string;
  description: string;
}

export const SectionDescription: React.FC<SectionDescriptionProps> = ({ title, description }) => (
  <div className="text-center spacing-container-xs">
    <h3 className="text-lg sm:text-xl font-bold mb-4 text-balance leading-tight">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed text-balance">{description}</p>
  </div>
);
