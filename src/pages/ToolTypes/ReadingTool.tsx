
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolNotImplemented from './ToolNotImplemented';

// Import enhanced reading tools
import EnhancedDreamInterpretation from '@/components/readings/EnhancedDreamInterpretation';
import EnhancedAuraReading from '@/components/readings/EnhancedAuraReading';

// Import existing tools
import Numerology from '@/components/readings/Numerology';
import NameNumerology from '@/components/readings/NameNumerology';
import { ParallelUniverseExplorer } from '@/components/fal/parallelUniverse/ParallelUniverseExplorer';

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
        return <ParallelUniverseExplorer />;

      // Tools that need implementation
      case 'cartomancy':
        return <ToolNotImplemented toolName="کارتومانسی (فال با کارت)" category="readings" estimatedCompletion="دو هفته آینده" />;
      
      case 'cleromancy':
        return <ToolNotImplemented toolName="فال سنگ و جواهر" category="readings" estimatedCompletion="یک هفته آینده" />;
      
      case 'coffee-reading':
        return <ToolNotImplemented toolName="فال قهوه" category="readings" estimatedCompletion="یک هفته آینده" />;
      
      case 'lithomancy':
        return <ToolNotImplemented toolName="سنگ‌شناسی روحانی" category="readings" estimatedCompletion="دو هفته آینده" />;
      
      case 'wood-divination':
        return <ToolNotImplemented toolName="فال چوب" category="readings" estimatedCompletion="یک هفته آینده" />;
      
      case 'distant-reading':
        return <ToolNotImplemented toolName="قرائت از راه دور" category="readings" estimatedCompletion="یک ماه آینده" />;
      
      case 'persian-superstitions':
        return <ToolNotImplemented toolName="باورهای عامیانه ایرانی" category="readings" estimatedCompletion="یک هفته آینده" />;

      default:
        return <ToolNotImplemented toolName="این ابزار طالع‌بینی" category="readings" />;
    }
  };

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
    'persian-superstitions': 'باورهای عامیانه ایرانی'
  };
  
  return titles[slug] || 'ابزار طالع‌بینی';
}
