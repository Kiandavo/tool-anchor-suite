
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

interface EducationalToolRendererProps {
  slug: string;
}

export const EducationalToolRenderer: React.FC<EducationalToolRendererProps> = ({ slug }) => {
  // All educational tools are coming soon
  return <ToolNotImplemented toolName="این ابزار آموزشی" category="educational" />;
};
