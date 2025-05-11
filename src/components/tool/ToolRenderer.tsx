
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
import RandomColorGenerator from '@/pages/ToolTypes/RandomTools/RandomColorGenerator';
import PersianCalendar from '@/pages/ToolTypes/PersianCultural/PersianCalendar';
import PersianNames from '@/pages/ToolTypes/PersianCultural/PersianNames';
import PersianProverbs from '@/pages/ToolTypes/PersianCultural/PersianProverbs';
import PersianCalligraphy from '@/pages/ToolTypes/PersianCultural/PersianCalligraphy';
import FarsiLearning from '@/pages/ToolTypes/PersianCultural/FarsiLearning';
import PomodoroTimer from '@/pages/ToolTypes/ProductivityTools/PomodoroTimer';
import ProjectBoard from '@/pages/ToolTypes/ProductivityTools/ProjectBoard';
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';
import FontPreview from '@/pages/ToolTypes/DesignTools/FontPreview';

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

  if (toolType === 'random-color') {
    return <RandomColorGenerator />;
  }
  
  // Persian Cultural tools
  if (toolType === 'persian-calendar') {
    return <PersianCalendar />;
  }
  
  if (toolType === 'persian-names') {
    return <PersianNames />;
  }
  
  if (toolType === 'persian-proverbs') {
    return <PersianProverbs />;
  }
  
  if (toolType === 'persian-calligraphy') {
    return <PersianCalligraphy />;
  }
  
  if (toolType === 'farsi-learning') {
    return <FarsiLearning />;
  }
  
  // Productivity tools
  if (toolType === 'pomodoro-timer') {
    return <PomodoroTimer />;
  }
  
  if (toolType === 'project-board') {
    return <ProjectBoard />;
  }
  
  // Design tools
  if (toolType === 'color-palette') {
    return <ColorPalette />;
  }
  
  if (toolType === 'font-preview') {
    return <FontPreview />;
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
    case 'power-calculator':
    case 'salary-tax-calculator':
    case 'range-calculator':
      return <CalculatorTool slug={slug} type={toolType} />;
    case 'random':
      return <UtilityToolRenderer slug={slug} type={toolType} />;
    case 'prime-checker':
      return <UtilityToolRenderer slug={slug} type={toolType} />;
    default:
      return <ToolNotImplemented />;
  }
};
