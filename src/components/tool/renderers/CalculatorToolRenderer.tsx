
import React from 'react';
import { BasicCalculatorRenderer } from './calculator/BasicCalculatorRenderer';
import { InvestmentCalculatorRenderer } from './calculator/InvestmentCalculatorRenderer';
import { TimeCalculatorRenderer } from './calculator/TimeCalculatorRenderer';
import { FinanceCalculatorRenderer } from './calculator/FinanceCalculatorRenderer';
import { ScientificCalculatorRenderer } from './calculator/ScientificCalculatorRenderer';
import PowerCalculator from '@/pages/ToolTypes/CalculatorTools/PowerCalculator';
import TipCalculator from '@/pages/ToolTypes/CalculatorTools/TipCalculator';
import VolumeCalculator from '@/pages/ToolTypes/CalculatorTools/VolumeCalculator';

interface CalculatorToolRendererProps {
  slug: string;
  type: 'calculator' | 'investment-calculator' | 'mortgage-calculator' | 'today-date' | 
        'date-difference' | 'world-time' | 'profit' | 'scientific-calculator' | 'rent-factors' |
        'loan-calculator' | 'power-calculator' | 'tip-calculator' | 'volume-calculator';
}

export const CalculatorToolRenderer: React.FC<CalculatorToolRendererProps> = ({ slug, type }) => {
  // Time-related calculators
  if (type === 'today-date' || type === 'date-difference' || type === 'world-time') {
    return <TimeCalculatorRenderer type={type} />;
  }

  // Financial calculators
  if (type === 'profit' || type === 'mortgage-calculator' || type === 'rent-factors' || type === 'loan-calculator') {
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
    case 'power-calculator':
      return <PowerCalculator />;
    case 'tip-calculator':
      return <TipCalculator />;
    case 'volume-calculator':
      return <VolumeCalculator />;
    default:
      return <BasicCalculatorRenderer slug={slug} />;
  }
};
