
import React from 'react';
import { Tool } from '@/data/tools';
import { toolTypeBySlug } from '@/utils/toolTypeUtils';
import { TextToolRenderer } from './renderers/TextToolRenderer';
import { ImageToolRenderer } from './renderers/ImageToolRenderer';
import { CalculatorToolRenderer } from './renderers/CalculatorToolRenderer';
import { UtilityToolRenderer } from './renderers/UtilityToolRenderer';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  const toolType = toolTypeBySlug[slug];

  switch (toolType) {
    case 'text':
      return <TextToolRenderer slug={slug} />;
    case 'image':
      return <ImageToolRenderer slug={slug} />;
    case 'calculator':
    case 'investment-calculator':
    case 'mortgage-calculator':
    case 'today-date':
    case 'date-difference':
    case 'world-time':
    case 'profit':
    case 'scientific-calculator':
    case 'rent-factors':
      return <CalculatorToolRenderer slug={slug} type={toolType} />;
    case 'random-password':
    case 'prime-checker':
    case 'seo':
    case 'random':
    case 'number':
      return <UtilityToolRenderer slug={slug} type={toolType} />;
    default:
      return <ToolNotImplemented />;
  }
};
