
import React from 'react';
import RandomPasswordTool from '@/pages/ToolTypes/RandomPasswordTool';
import PrimeCheckerTool from '@/pages/ToolTypes/PrimeCheckerTool';
import SeoTool from '@/pages/ToolTypes/SeoTool';
import RandomTool from '@/pages/ToolTypes/RandomTool';
import NumberTool from '@/pages/ToolTypes/NumberTool';

interface UtilityToolRendererProps {
  slug: string;
  type: 'random-password' | 'prime-checker' | 'seo' | 'random' | 'number';
}

export const UtilityToolRenderer: React.FC<UtilityToolRendererProps> = ({ slug, type }) => {
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
    default:
      return null;
  }
};
