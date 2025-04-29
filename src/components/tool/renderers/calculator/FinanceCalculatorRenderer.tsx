
import React from 'react';
import ProfitCalculator from '@/pages/ToolTypes/CalculatorTools/ProfitCalculator';
import MortgageCalculator from '@/pages/ToolTypes/CalculatorTools/MortgageCalculator';
import RentFactorsCalculator from '@/pages/ToolTypes/CalculatorTools/RentFactorsCalculator';
import LoanCalculator from '@/pages/ToolTypes/CalculatorTools/LoanCalculator';

interface FinanceCalculatorRendererProps {
  type: 'profit' | 'mortgage-calculator' | 'rent-factors' | 'loan-calculator';
}

export const FinanceCalculatorRenderer: React.FC<FinanceCalculatorRendererProps> = ({ type }) => {
  switch (type) {
    case 'profit':
      return <ProfitCalculator />;
    case 'mortgage-calculator':
      return <MortgageCalculator />;
    case 'rent-factors':
      return <RentFactorsCalculator />;
    case 'loan-calculator':
      return <LoanCalculator />;
    default:
      return null;
  }
};
