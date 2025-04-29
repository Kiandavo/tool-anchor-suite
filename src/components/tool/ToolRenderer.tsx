
import React from 'react';
import { Tool } from '@/data/tools';
import { toolTypeBySlug } from '@/utils/toolTypeUtils';
import { TextToolRenderer } from './renderers/TextToolRenderer';
import { ImageToolRenderer } from './renderers/ImageToolRenderer';
import { CalculatorToolRenderer } from './renderers/CalculatorToolRenderer';
import { UtilityToolRenderer } from './renderers/UtilityToolRenderer';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';
import TextTool from '@/pages/ToolTypes/TextTool';
import ImageTool from '@/pages/ToolTypes/ImageTool';
import CalculatorTool from '@/pages/ToolTypes/CalculatorTool';
import SeoTool from '@/pages/ToolTypes/SeoTool';
import RandomPasswordTool from '@/pages/ToolTypes/RandomPasswordTool';
import NumberTool from '@/pages/ToolTypes/NumberTool';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  const toolType = toolTypeBySlug[slug];
  
  // First, check if the tool has a dedicated page
  if (toolType === 'text') {
    return <TextTool slug={slug} />;
  }
  
  if (toolType === 'image') {
    return <ImageTool slug={slug} />;
  }
  
  if (toolType === 'seo') {
    return <SeoTool slug={slug} />;
  }
  
  if (toolType === 'number') {
    return <NumberTool slug={slug} />;
  }
  
  if (toolType === 'random-password') {
    return <RandomPasswordTool />;
  }
  
  // For calculator tools and others, use the specific renderers
  switch (toolType) {
    case 'calculator':
    case 'investment-calculator':
    case 'mortgage-calculator':
    case 'today-date':
    case 'date-difference':
    case 'world-time':
    case 'profit':
    case 'scientific-calculator':
    case 'rent-factors':
    case 'loan-calculator':
      return <CalculatorTool slug={slug} type={toolType} />;
    case 'random':
      return <UtilityToolRenderer slug={slug} type={toolType} />;
    case 'prime-checker':
      return <UtilityToolRenderer slug={slug} type={toolType} />;
    default:
      return <ToolNotImplemented />;
  }
};
