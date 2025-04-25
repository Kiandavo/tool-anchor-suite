
import React from 'react';
import TodayDateConverter from '@/pages/ToolTypes/CalculatorTools/TodayDateConverter';
import DateDifferenceCalculator from '@/pages/ToolTypes/CalculatorTools/DateDifferenceCalculator';
import WorldTimeConverter from '@/pages/ToolTypes/CalculatorTools/WorldTimeConverter';

interface TimeCalculatorRendererProps {
  type: 'today-date' | 'date-difference' | 'world-time';
}

export const TimeCalculatorRenderer: React.FC<TimeCalculatorRendererProps> = ({ type }) => {
  switch (type) {
    case 'today-date':
      return <TodayDateConverter />;
    case 'date-difference':
      return <DateDifferenceCalculator />;
    case 'world-time':
      return <WorldTimeConverter />;
    default:
      return null;
  }
};
