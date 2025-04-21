
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import PercentageCalculator from './CalculatorTools/PercentageCalculator';
import LoanCalculator from './CalculatorTools/LoanCalculator';
import AgeCalculator from './CalculatorTools/AgeCalculator';
import BmiCalculator from './CalculatorTools/BmiCalculator';
import DiscountCalculator from './CalculatorTools/DiscountCalculator';

interface CalculatorToolProps {
  slug: string;
}

export default function CalculatorTool({ slug }: CalculatorToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);
  
  // Check which calculator tool to render based on slug
  const renderCalculatorTool = () => {
    switch (slug) {
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'bmi-calculator':
        return <BmiCalculator />;
      case 'discount-calculator':
        return <DiscountCalculator />;
      default:
        return (
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
              <p className="text-muted-foreground">
                این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {toolMeta && (
        <ToolInfoCard
          name={toolMeta.name}
          description={toolMeta.description}
          learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
        />
      )}
      {renderCalculatorTool()}
    </div>
  );
}
