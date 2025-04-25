
import React from 'react';
import CalculatorTool from '@/pages/ToolTypes/CalculatorTool';
import InvestmentCalculator from '@/pages/ToolTypes/CalculatorTools/InvestmentCalculator';
import MortgageCalculator from '@/pages/ToolTypes/CalculatorTools/MortgageCalculator';
import TodayDateConverter from '@/pages/ToolTypes/CalculatorTools/TodayDateConverter';
import DateDifferenceCalculator from '@/pages/ToolTypes/CalculatorTools/DateDifferenceCalculator';
import WorldTimeConverter from '@/pages/ToolTypes/CalculatorTools/WorldTimeConverter';
import ProfitCalculator from '@/pages/ToolTypes/CalculatorTools/ProfitCalculator';
import ScientificCalculator from '@/pages/ToolTypes/CalculatorTools/ScientificCalculator';
import RentFactorsCalculator from '@/pages/ToolTypes/CalculatorTools/RentFactorsCalculator';

interface CalculatorToolRendererProps {
  slug: string;
  type: 'calculator' | 'investment-calculator' | 'mortgage-calculator' | 'today-date' | 
        'date-difference' | 'world-time' | 'profit' | 'scientific-calculator' | 'rent-factors';
}

export const CalculatorToolRenderer: React.FC<CalculatorToolRendererProps> = ({ slug, type }) => {
  switch (type) {
    case 'calculator':
      return <CalculatorTool slug={slug} />;
    case 'investment-calculator':
      return <InvestmentCalculator />;
    case 'mortgage-calculator':
      return <MortgageCalculator />;
    case 'today-date':
      return <TodayDateConverter />;
    case 'date-difference':
      return <DateDifferenceCalculator />;
    case 'world-time':
      return <WorldTimeConverter />;
    case 'profit':
      return <ProfitCalculator />;
    case 'scientific-calculator':
      return <ScientificCalculator />;
    case 'rent-factors':
      return <RentFactorsCalculator />;
    default:
      return <CalculatorTool slug={slug} />;
  }
};
