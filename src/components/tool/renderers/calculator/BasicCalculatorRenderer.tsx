
import React from 'react';
import CalculatorTool from '@/pages/ToolTypes/CalculatorTool';

interface BasicCalculatorRendererProps {
  slug: string;
}

export const BasicCalculatorRenderer: React.FC<BasicCalculatorRendererProps> = ({ slug }) => {
  return <CalculatorTool slug={slug} />;
};
