
import React from 'react';
import { Tool } from '@/data/tools';
import { toolTypeBySlug } from '@/utils/toolTypeUtils';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';
import TextTool from '@/pages/ToolTypes/TextTool';
import ImageTool from '@/pages/ToolTypes/ImageTool';
import CalculatorTool from '@/pages/ToolTypes/CalculatorTool';
import SeoTool from '@/pages/ToolTypes/SeoTool';
import RandomPasswordTool from '@/pages/ToolTypes/RandomPasswordTool';
import NumberTool from '@/pages/ToolTypes/NumberTool';
import RandomColorGenerator from '@/pages/ToolTypes/RandomTools/RandomColorGenerator';

// Import developer tools
import JsonFormatter from '@/pages/ToolTypes/DeveloperTools/JsonFormatter';
import QRGenerator from '@/pages/ToolTypes/UtilityTools/QRGenerator';
import HashGenerator from '@/pages/ToolTypes/UtilityTools/HashGenerator';

// Import readings components
import { TarotReading } from '@/components/fal/TarotReading';
import { Horoscope } from '@/components/fal/Horoscope';
import { RumiIstikhara } from '@/components/fal/RumiIstikhara';
import { ParallelUniverseExplorer } from '@/components/fal/parallelUniverse/ParallelUniverseExplorer';
import AuraReading from '@/components/readings/AuraReading';
import Cartomancy from '@/components/readings/Cartomancy';
import Cleromancy from '@/components/readings/Cleromancy';
import DistantReading from '@/components/readings/DistantReading';
import Lithomancy from '@/components/readings/Lithomancy';
import Numerology from '@/components/readings/Numerology';
import CoffeeReading from '@/components/readings/CoffeeReading';
import WoodDivination from '@/components/readings/WoodDivination';
import MirrorScrying from '@/components/readings/MirrorScrying';
import FlowerReading from '@/components/readings/FlowerReading';
import CoinOracle from '@/components/readings/CoinOracle';
import DreamInterpretation from '@/components/readings/DreamInterpretation';
import NameNumerology from '@/components/readings/NameNumerology';
import FragranceDivination from '@/components/readings/FragranceDivination';

// Import Persian cultural tools
import PersianCalendar from '@/pages/ToolTypes/PersianCultural/PersianCalendar';
import PersianNames from '@/pages/ToolTypes/PersianCultural/PersianNames';
import PersianProverbs from '@/pages/ToolTypes/PersianCultural/PersianProverbs';
import PersianCalligraphy from '@/pages/ToolTypes/PersianCultural/PersianCalligraphy';
import WordEtymology from '@/pages/ToolTypes/PersianCultural/WordEtymology';
import FarsiLearning from '@/pages/ToolTypes/PersianCultural/FarsiLearning';
import PersianLiterature from '@/pages/ToolTypes/PersianCultural/PersianLiterature';
import PersianMusic from '@/pages/ToolTypes/PersianCultural/PersianMusic';
import PersianCuisine from '@/pages/ToolTypes/PersianCultural/PersianCuisine';
import PersianHolidays from '@/pages/ToolTypes/PersianCultural/PersianHolidays';
import PersianArchitecture from '@/pages/ToolTypes/PersianCultural/PersianArchitecture';

// Import productivity tools
import PomodoroTimer from '@/pages/ToolTypes/ProductivityTools/PomodoroTimer';
import ProjectBoard from '@/pages/ToolTypes/ProductivityTools/ProjectBoard';
import TodoList from '@/pages/ToolTypes/ProductivityTools/TodoList';
import NoteTaking from '@/pages/ToolTypes/ProductivityTools/NoteTaking';
import CalendarScheduler from '@/pages/ToolTypes/ProductivityTools/CalendarScheduler';

// Import design tools
import ColorPalette from '@/pages/ToolTypes/DesignTools/ColorPalette';
import FontPreview from '@/pages/ToolTypes/DesignTools/FontPreview';
import SimpleLogoMaker from '@/pages/ToolTypes/DesignTools/SimpleLogoMaker';
import SocialMediaTemplate from '@/pages/ToolTypes/DesignTools/SocialMediaTemplate';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  console.log('ToolRenderer rendering for slug:', slug);
  
  const toolType = toolTypeBySlug[slug];
  console.log('Tool type determined:', toolType);
  
  // Check if tool is coming soon
  if (tool?.isComingSoon) {
    return <ToolNotImplemented isComingSoon={true} toolName={tool.name} />;
  }
  
  // Developer tools
  if (toolType === 'json-formatter') return <JsonFormatter />;
  if (toolType === 'qr-generator') return <QRGenerator />;
  if (toolType === 'hash-generator') return <HashGenerator />;
  
  // Readings tools
  if (toolType === 'tarot-reading') return <TarotReading />;
  if (toolType === 'horoscope') return <Horoscope />;
  if (toolType === 'rumi-istikhara') return <RumiIstikhara />;
  if (toolType === 'parallel-universe') return <ParallelUniverseExplorer />;
  if (toolType === 'aura-reading') return <AuraReading />;
  if (toolType === 'cartomancy') return <Cartomancy />;
  if (toolType === 'cleromancy') return <Cleromancy />;
  if (toolType === 'distant-reading') return <DistantReading />;
  if (toolType === 'lithomancy') return <Lithomancy />;
  if (toolType === 'numerology') return <Numerology />;
  if (toolType === 'coffee-reading') return <CoffeeReading />;
  if (toolType === 'wood-divination') return <WoodDivination />;
  if (toolType === 'mirror-scrying') return <MirrorScrying />;
  if (toolType === 'flower-reading') return <FlowerReading />;
  if (toolType === 'coin-oracle') return <CoinOracle />;
  if (toolType === 'dream-interpretation') return <DreamInterpretation />;
  if (toolType === 'name-numerology') return <NameNumerology />;
  if (toolType === 'fragrance-divination') return <FragranceDivination />;
  
  // Persian cultural tools
  if (toolType === 'persian-calendar') return <PersianCalendar />;
  if (toolType === 'persian-names') return <PersianNames />;
  if (toolType === 'persian-proverbs') return <PersianProverbs />;
  if (toolType === 'persian-calligraphy') return <PersianCalligraphy />;
  if (toolType === 'word-etymology') return <WordEtymology />;
  if (toolType === 'farsi-learning') return <FarsiLearning />;
  if (toolType === 'persian-literature') return <PersianLiterature />;
  if (toolType === 'persian-music') return <PersianMusic />;
  if (toolType === 'persian-cuisine') return <PersianCuisine />;
  if (toolType === 'persian-holidays') return <PersianHolidays />;
  if (toolType === 'persian-architecture') return <PersianArchitecture />;
  
  // Productivity tools
  if (toolType === 'pomodoro-timer') return <PomodoroTimer />;
  if (toolType === 'project-board') return <ProjectBoard />;
  if (toolType === 'todo-list') return <TodoList />;
  if (toolType === 'note-taking') return <NoteTaking />;
  if (toolType === 'calendar-scheduler') return <CalendarScheduler />;
  
  // Design tools
  if (toolType === 'color-palette') return <ColorPalette />;
  if (toolType === 'font-preview') return <FontPreview />;
  if (toolType === 'simple-logo-maker') return <SimpleLogoMaker />;
  if (toolType === 'social-media-template') return <SocialMediaTemplate />;
  
  // General tool types
  if (toolType === 'text') return <TextTool slug={slug} />;
  if (toolType === 'image') return <ImageTool slug={slug} />;
  if (toolType === 'seo') return <SeoTool slug={slug} />;
  if (toolType === 'number') return <NumberTool slug={slug} />;
  if (toolType === 'random-password') return <RandomPasswordTool />;
  if (toolType === 'random-color') return <RandomColorGenerator />;
  
  // Calculator and utility tools
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
    case 'prime-checker':
      return <NumberTool slug={slug} />;
    
    default:
      console.log('No specific renderer found for toolType:', toolType, 'using ToolNotImplemented');
      return <ToolNotImplemented toolName={tool?.name} />;
  }
};
