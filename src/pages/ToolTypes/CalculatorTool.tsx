
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { EquationSolver } from '@/components/calculator-tools/EquationSolver';

// Import calculator tools
import AgeCalculator from './CalculatorTools/AgeCalculator';
import AreaCalculator from './CalculatorTools/AreaCalculator';
import BmiCalculator from './CalculatorTools/BmiCalculator';
import CalorieCalculator from './CalculatorTools/CalorieCalculator';
import CurrencyConverter from './CalculatorTools/CurrencyConverter';
import DateDifferenceCalculator from './CalculatorTools/DateDifferenceCalculator';
import DiscountCalculator from './CalculatorTools/DiscountCalculator';
import InvestmentCalculator from './CalculatorTools/InvestmentCalculator';
import LoanCalculator from './CalculatorTools/LoanCalculator';
import MortgageCalculator from './CalculatorTools/MortgageCalculator';
import PercentageCalculator from './CalculatorTools/PercentageCalculator';
import PowerCalculator from './CalculatorTools/PowerCalculator';
import ProfitCalculator from './CalculatorTools/ProfitCalculator';
import RangeCalculator from './CalculatorTools/RangeCalculator';
import RentFactorsCalculator from './CalculatorTools/RentFactorsCalculator';
import SalaryTaxCalculator from './CalculatorTools/SalaryTaxCalculator';
import ScientificCalculator from './CalculatorTools/ScientificCalculator';
import TimeCalculator from './CalculatorTools/TimeCalculator';
import TipCalculator from './CalculatorTools/TipCalculator';
import TodayDateConverter from './CalculatorTools/TodayDateConverter';
import UnitListGenerator from './CalculatorTools/UnitListGenerator';
import VolumeCalculator from './CalculatorTools/VolumeCalculator';
import WeightConverter from './CalculatorTools/WeightConverter';
import WorldTimeConverter from './CalculatorTools/WorldTimeConverter';
import SpeedCalculator from './CalculatorTools/SpeedCalculator';

interface CalculatorToolProps {
  slug: string;
  type?: string;
}

export default function CalculatorTool({ slug, type }: CalculatorToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'age-calculator':
        return <AgeCalculator />;
      case 'area-calculator':
        return <AreaCalculator />;
      case 'bmi-calculator':
        return <BmiCalculator />;
      case 'calorie-calculator':
        return <CalorieCalculator />;
      case 'currency-converter':
        return <CurrencyConverter />;
      case 'date-difference':
        return <DateDifferenceCalculator />;
      case 'discount-calculator':
        return <DiscountCalculator />;
      case 'investment-calculator':
        return <InvestmentCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'mortgage-calculator':
        return <MortgageCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'power-calculator':
        return <PowerCalculator />;
      case 'profit':
      case 'profit-calculator':
        return <ProfitCalculator />;
      case 'range-calculator':
        return <RangeCalculator />;
      case 'rent-factors':
        return <RentFactorsCalculator />;
      case 'salary-tax-calculator':
        return <SalaryTaxCalculator />;
      case 'scientific-calculator':
        return <ScientificCalculator />;
      case 'time-calculator':
        return <TimeCalculator />;
      case 'tip-calculator':
        return <TipCalculator />;
      case 'today-date':
        return <TodayDateConverter />;
      case 'unit-list-generator':
        return <UnitListGenerator />;
      case 'volume-calculator':
        return <VolumeCalculator />;
      case 'weight-converter':
        return <WeightConverter />;
      case 'world-time':
        return <WorldTimeConverter />;
      case 'equation-solver':
        return <EquationSolver />;
      case 'speed-calculator':
        return <SpeedCalculator />;
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
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      {renderToolContent()}
    </div>
  );
}
