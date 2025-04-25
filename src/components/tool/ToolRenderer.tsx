
import React from 'react';
import { Tool as ToolType } from '@/data/tools';
import TextTool from '@/pages/ToolTypes/TextTool';
import ImageTool from '@/pages/ToolTypes/ImageTool';
import RandomPasswordTool from '@/pages/ToolTypes/RandomPasswordTool';
import PrimeCheckerTool from '@/pages/ToolTypes/PrimeCheckerTool';
import CalculatorTool from '@/pages/ToolTypes/CalculatorTool';
import SeoTool from '@/pages/ToolTypes/SeoTool';
import RandomTool from '@/pages/ToolTypes/RandomTool';
import NumberTool from '@/pages/ToolTypes/NumberTool';
import InvestmentCalculator from '@/pages/ToolTypes/CalculatorTools/InvestmentCalculator';
import MortgageCalculator from '@/pages/ToolTypes/CalculatorTools/MortgageCalculator';
import TodayDateConverter from '@/pages/ToolTypes/CalculatorTools/TodayDateConverter';
import DateDifferenceCalculator from '@/pages/ToolTypes/CalculatorTools/DateDifferenceCalculator';
import WorldTimeConverter from '@/pages/ToolTypes/CalculatorTools/WorldTimeConverter';
import ProfitCalculator from '@/pages/ToolTypes/CalculatorTools/ProfitCalculator';
import ScientificCalculator from '@/pages/ToolTypes/CalculatorTools/ScientificCalculator';
import RentFactorsCalculator from '@/pages/ToolTypes/CalculatorTools/RentFactorsCalculator';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';
import { ToolType, toolTypeBySlug } from '@/utils/toolTypeUtils';

interface ToolRendererProps {
  tool: ToolType;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  const toolType = toolTypeBySlug[slug];

  switch (toolType) {
    case 'text':
      return <TextTool slug={slug} />;
    case 'image':
      return <ImageTool slug={slug} />;
    case 'random-password':
      return <RandomPasswordTool />;
    case 'prime-checker':
      return <PrimeCheckerTool />;
    case 'calculator':
      return <CalculatorTool slug={slug} />;
    case 'seo':
      return <SeoTool slug={slug} />;
    case 'random':
      return <RandomTool slug={slug} />;
    case 'number':
      return <NumberTool slug={slug} />;
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
      return <ToolNotImplemented />;
  }
};

