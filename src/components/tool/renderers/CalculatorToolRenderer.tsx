
import React from 'react';
import { BasicCalculatorRenderer } from './calculator/BasicCalculatorRenderer';
import { InvestmentCalculatorRenderer } from './calculator/InvestmentCalculatorRenderer';
import { TimeCalculatorRenderer } from './calculator/TimeCalculatorRenderer';
import { FinanceCalculatorRenderer } from './calculator/FinanceCalculatorRenderer';
import { ScientificCalculatorRenderer } from './calculator/ScientificCalculatorRenderer';

interface CalculatorToolRendererProps {
  slug: string;
  type: 'calculator' | 'investment-calculator' | 'mortgage-calculator' | 'today-date' | 
        'date-difference' | 'world-time' | 'profit' | 'scientific-calculator' | 'rent-factors';
}

export const CalculatorToolRenderer: React.FC<CalculatorToolRendererProps> = ({ slug, type }) => {
  // Time-related calculators
  if (type === 'today-date' || type === 'date-difference' || type === 'world-time') {
    return <TimeCalculatorRenderer type={type} />;
  }

  // Financial calculators
  if (type === 'profit' || type === 'mortgage-calculator' || type === 'rent-factors') {
    return <FinanceCalculatorRenderer type={type} />;
  }

  // Specific calculator types
  switch (type) {
    case 'calculator':
      return <BasicCalculatorRenderer slug={slug} />;
    case 'investment-calculator':
      return <InvestmentCalculatorRenderer />;
    case 'scientific-calculator':
      return <ScientificCalculatorRenderer />;
    default:
      return <BasicCalculatorRenderer slug={slug} />;
  }
};
