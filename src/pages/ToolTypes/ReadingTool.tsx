import React, { lazy, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolNotImplemented from './ToolNotImplemented';

// Import enhanced reading tools
import EnhancedDreamInterpretation from '@/components/readings/EnhancedDreamInterpretation';
import EnhancedAuraReading from '@/components/readings/EnhancedAuraReading';

// Import existing tools
import Numerology from '@/components/readings/Numerology';
import NameNumerology from '@/components/readings/NameNumerology';
const ParallelUniverseExplorer = lazy(() => import('@/components/fal/parallelUniverse/ParallelUniverseExplorer').then(m => ({ default: m.ParallelUniverseExplorer })));
import PersianSuperstitions from '@/components/readings/PersianSuperstitions';
import DreamInterpretation from '@/components/readings/DreamInterpretation';
import AuraReading from '@/components/readings/AuraReading';
import CoffeeReading from '@/components/readings/CoffeeReading';
import Cartomancy from '@/components/readings/Cartomancy';
import Cleromancy from '@/components/readings/Cleromancy';
import Lithomancy from '@/components/readings/Lithomancy';
import WoodDivination from '@/components/readings/WoodDivination';
import DistantReading from '@/components/readings/DistantReading';
import DailyHoroscope from '@/components/readings/DailyHoroscope';

// Import new tools we created
import PalmReading from '@/components/readings/PalmReading';
import CoinOracle from '@/components/readings/CoinOracle';
import ColorReading from '@/components/readings/ColorReading';

// Import Fal components - using named imports
import { HafezFortune } from '@/components/HafezFortune';
import { TarotReading } from '@/components/fal/TarotReading';
import { Horoscope } from '@/components/fal/Horoscope';
import { RumiIstikhara } from '@/components/fal/RumiIstikhara';
import { ShahnameReading } from '@/components/fal/ShahnameReading';
import { MusicFortune } from '@/components/fal/MusicFortune';

interface ReadingToolProps {
  slug: string;
}

export default function ReadingTool({ slug }: ReadingToolProps) {
  console.log("ReadingTool rendering with slug:", slug);

  const renderTool = () => {
    switch (slug) {
      case 'dream-interpretation':
        return <EnhancedDreamInterpretation />;
      
      case 'aura-reading':
        return <EnhancedAuraReading />;
      
      case 'numerology':
        return <Numerology />;
      
      case 'name-numerology':
        return <NameNumerology />;
      
      case 'parallel-universe':
        console.log("Rendering ParallelUniverseExplorer");
        return (
          <Suspense fallback={<div className="p-8 text-center">در حال بارگذاری...</div>}>
            <ParallelUniverseExplorer />
          </Suspense>
        );

      case 'persian-superstitions':
        return <PersianSuperstitions />;

      case 'coffee-reading':
        return <CoffeeReading />;

      case 'cartomancy':
        return <Cartomancy />;

      case 'cleromancy':
        return <Cleromancy />;

      case 'lithomancy':
        return <Lithomancy />;

      case 'wood-divination':
        return <WoodDivination />;

      case 'distant-reading':
        return <DistantReading />;

      case 'palm-reading':
        return <PalmReading />;

      case 'coin-oracle':
        return <CoinOracle />;

      case 'color-reading':
        return <ColorReading />;

      case 'daily-horoscope':
        return <DailyHoroscope />;

      case 'hafez-fortune':
        return <HafezFortune />;

      case 'tarot-reading':
        return <TarotReading />;

      case 'horoscope':
        return <Horoscope />;

      case 'rumi-istikhara':
        return <RumiIstikhara />;

      case 'shahname-reading':
        return <ShahnameReading />;

      case 'music-fortune':
        return <MusicFortune />;

      default:
        return <ToolNotImplemented toolName="این ابزار طالع‌بینی" category="readings" />;
    }
  };

  if (slug === 'parallel-universe') {
    return (
      <div className="space-theme gradient-cosmic rounded-xl p-0 min-h-[70vh]">
        <Suspense fallback={<div className="p-8 text-center">در حال بارگذاری...</div>}>
          <ParallelUniverseExplorer />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            {getToolTitle(slug)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderTool()}
        </CardContent>
      </Card>
    </div>
  );
}

function getToolTitle(slug: string): string {
  const titles: Record<string, string> = {
    'dream-interpretation': 'تعبیر خواب هوشمند',
    'aura-reading': 'خواندن هاله',
    'numerology': 'علم اعداد',
    'name-numerology': 'علم اعداد نام',
    'parallel-universe': 'کاوشگر جهان‌های موازی',
    'cartomancy': 'کارتومانسی',
    'cleromancy': 'فال سنگ و جواهر', 
    'coffee-reading': 'فال قهوه',
    'lithomancy': 'سنگ‌شناسی روحانی',
    'wood-divination': 'فال چوب',
    'distant-reading': 'قرائت از راه دور',
    'persian-superstitions': 'باورهای عامیانه ایرانی',
    'palm-reading': 'فال دست',
    'coin-oracle': 'پیشگویی با سکه',
    'color-reading': 'روان‌شناسی رنگ',
    'daily-horoscope': 'طالع روزانه',
    'hafez-fortune': 'فال حافظ',
    'tarot-reading': 'فال تاروت',
    'horoscope': 'طالع بینی',
    'rumi-istikhara': 'استخاره با مولانا',
    'shahname-reading': 'راهنمایی از شاهنامه',
    'music-fortune': 'فال موسیقی'
  };
  
  return titles[slug] || 'ابزار طالع‌بینی';
}
