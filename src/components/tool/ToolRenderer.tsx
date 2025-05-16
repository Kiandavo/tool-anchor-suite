
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
import WordEtymology from '@/pages/ToolTypes/PersianCultural/WordEtymology';
import FarsiLearning from '@/pages/ToolTypes/PersianCultural/FarsiLearning';
import PomodoroTimer from '@/pages/ToolTypes/ProductivityTools/PomodoroTimer';
import ProjectBoard from '@/pages/ToolTypes/ProductivityTools/ProjectBoard';
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';
import FontPreview from '@/pages/ToolTypes/DesignTools/FontPreview';
import TodoList from '@/pages/ToolTypes/ProductivityTools/TodoList';
import NoteTaking from '@/pages/ToolTypes/ProductivityTools/NoteTaking';
import CalendarScheduler from '@/pages/ToolTypes/ProductivityTools/CalendarScheduler';
import SimpleLogoMaker from '@/pages/ToolTypes/DesignTools/SimpleLogoMaker';
import SocialMediaTemplate from '@/pages/ToolTypes/DesignTools/SocialMediaTemplate';

// Import new reading components
import AuraReading from '@/components/readings/AuraReading';
import Cartomancy from '@/components/readings/Cartomancy';
import Cleromancy from '@/components/readings/Cleromancy';
import DistantReading from '@/components/readings/DistantReading';
import Lithomancy from '@/components/readings/Lithomancy';
import Numerology from '@/components/readings/Numerology';
import { TarotReading } from '@/components/fal/TarotReading';
import { Horoscope } from '@/components/fal/Horoscope';
import { RumiIstikhara } from '@/components/fal/RumiIstikhara';
import { ParallelUniverseExplorer } from '@/components/fal/parallelUniverse/ParallelUniverseExplorer';

// Import placeholders for new Persian cultural tools
import PersianLiterature from '@/pages/ToolTypes/PersianCultural/PersianLiterature';
import PersianMusic from '@/pages/ToolTypes/PersianCultural/PersianMusic';
import PersianCuisine from '@/pages/ToolTypes/PersianCultural/PersianCuisine';
import PersianHolidays from '@/pages/ToolTypes/PersianCultural/PersianHolidays';
import PersianArchitecture from '@/pages/ToolTypes/PersianCultural/PersianArchitecture';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  const toolType = toolTypeBySlug[slug];
  
  // First, check for readings tools
  if (toolType === 'tarot-reading') {
    return <TarotReading />;
  }
  
  if (toolType === 'horoscope') {
    return <Horoscope />;
  }
  
  if (toolType === 'rumi-istikhara') {
    return <RumiIstikhara />;
  }
  
  if (toolType === 'parallel-universe') {
    return <ParallelUniverseExplorer />;
  }
  
  if (toolType === 'aura-reading') {
    return <AuraReading />;
  }
  
  if (toolType === 'cartomancy') {
    return <Cartomancy />;
  }
  
  if (toolType === 'cleromancy') {
    return <Cleromancy />;
  }
  
  if (toolType === 'distant-reading') {
    return <DistantReading />;
  }
  
  if (toolType === 'lithomancy') {
    return <Lithomancy />;
  }
  
  if (toolType === 'numerology') {
    return <Numerology />;
  }
  
  // Standard tool types
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
  
  if (toolType === 'word-etymology') {
    return <WordEtymology />;
  }
  
  if (toolType === 'farsi-learning') {
    return <FarsiLearning />;
  }
  
  // New Persian cultural tools
  if (toolType === 'persian-literature') {
    return <PersianLiterature />;
  }
  
  if (toolType === 'persian-music') {
    return <PersianMusic />;
  }
  
  if (toolType === 'persian-cuisine') {
    return <PersianCuisine />;
  }
  
  if (toolType === 'persian-holidays') {
    return <PersianHolidays />;
  }
  
  if (toolType === 'persian-architecture') {
    return <PersianArchitecture />;
  }
  
  // Productivity tools
  if (toolType === 'pomodoro-timer') {
    return <PomodoroTimer />;
  }
  
  if (toolType === 'project-board') {
    return <ProjectBoard />;
  }
  
  if (toolType === 'todo-list') {
    return <TodoList />;
  }
  
  if (toolType === 'note-taking') {
    return <NoteTaking />;
  }
  
  if (toolType === 'calendar-scheduler') {
    return <CalendarScheduler />;
  }
  
  // Design tools
  if (toolType === 'color-palette') {
    return <ColorPalette />;
  }
  
  if (toolType === 'font-preview') {
    return <FontPreview />;
  }
  
  if (toolType === 'simple-logo-maker') {
    return <SimpleLogoMaker />;
  }
  
  if (toolType === 'social-media-template') {
    return <SocialMediaTemplate />;
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
