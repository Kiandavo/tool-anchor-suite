
import React from 'react';

interface SectionDescriptionProps {
  title: string;
  description: string;
}

export const SectionDescription: React.FC<SectionDescriptionProps> = ({ title, description }) => (
  <div className="text-center">
    <h3 className="text-lg font-bold mb-3">{title}</h3>
    <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
  </div>
);
