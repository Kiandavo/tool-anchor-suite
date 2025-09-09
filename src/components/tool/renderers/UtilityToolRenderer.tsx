
import React from 'react';
import RandomPasswordTool from '@/pages/ToolTypes/RandomPasswordTool';
import PrimeCheckerTool from '@/pages/ToolTypes/PrimeCheckerTool';
import SeoTool from '@/pages/ToolTypes/SeoTool';
import RandomTool from '@/pages/ToolTypes/RandomTool';
import NumberTool from '@/pages/ToolTypes/NumberTool';
import PrimeChecker from '@/pages/ToolTypes/NumberTools/PrimeChecker';
import TextCounter from '@/pages/ToolTypes/TextTools/TextCounter';
import RobotsTxtGenerator from '@/pages/ToolTypes/SeoTools/RobotsTxtGenerator';
import UtilityTool from '@/pages/ToolTypes/UtilityTool';

interface UtilityToolRendererProps {
  slug: string;
  type: 'random-password' | 'prime-checker' | 'seo' | 'random' | 'number' | 'text-counter' | 'robots-txt-generator' | 'qr-code-generator';
}

export const UtilityToolRenderer: React.FC<UtilityToolRendererProps> = ({ slug, type }) => {
  // Handle specific tool implementations
  if (slug === 'prime-checker') {
    return <PrimeChecker />;
  }
  if (slug === 'text-counter') {
    return <TextCounter />;
  }
  if (slug === 'robots-txt-generator') {
    return <RobotsTxtGenerator />;
  }
  if (slug === 'qr-code-generator') {
    return <UtilityTool slug={slug} />;
  }

  switch (type) {
    case 'random-password':
      return <RandomPasswordTool />;
    case 'prime-checker':
      return <PrimeCheckerTool />;
    case 'seo':
      return <SeoTool slug={slug} />;
    case 'random':
      return <RandomTool slug={slug} />;
    case 'number':
      return <NumberTool slug={slug} />;
    case 'text-counter':
      return <TextCounter />;
    case 'robots-txt-generator':
      return <RobotsTxtGenerator />;
    case 'qr-code-generator':
      return <UtilityTool slug={slug} />;
    default:
      return null;
  }
};
