
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { NumberBaseConverter } from '@/components/number-tools/NumberBaseConverter';
import { EvenOddChecker } from '@/components/number-tools/EvenOddChecker';
import { SumCalculator } from '@/components/number-tools/SumCalculator';
import { NumberFormatter } from '@/components/number-tools/NumberFormatter';
import { NumberRounder } from '@/components/number-tools/NumberRounder';
import { RomanNumeralConverter } from '@/components/number-tools/RomanNumeralConverter';
import { PerfectNumberChecker } from '@/components/number-tools/PerfectNumberChecker';
import { GcdCalculator } from '@/components/number-tools/GcdCalculator';
import { FibonacciGenerator } from '@/components/number-tools/FibonacciGenerator';
import { FibonacciFinder } from '@/components/number-tools/FibonacciFinder';
import { FactorialCalculator } from '@/components/number-tools/FactorialCalculator';

interface NumberToolProps {
  slug: string;
}

export default function NumberTool({ slug }: NumberToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'number-base-converter':
      case 'number-converter':
      case 'decimal-binary-converter':
      case 'decimal-hex-converter':
      case 'decimal-octal-converter':
        return <NumberBaseConverter />;
      case 'even-odd-checker':
        return <EvenOddChecker />;
      case 'sum-calculator':
        return <SumCalculator />;
      case 'number-formatter':
        return <NumberFormatter />;
      case 'number-rounder':
        return <NumberRounder />;
      case 'roman-numeral-converter':
      case 'decimal-to-roman':
        return <RomanNumeralConverter />;
      case 'perfect-number-checker':
        return <PerfectNumberChecker />;
      case 'gcd-calculator':
        return <GcdCalculator />;
      case 'fibonacci-generator':
        return <FibonacciGenerator />;
      case 'fibonacci-finder':
        return <FibonacciFinder />;
      case 'factorial-calculator':
        return <FactorialCalculator />;
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
