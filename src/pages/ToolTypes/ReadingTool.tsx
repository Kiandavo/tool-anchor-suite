
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { HafezFortune } from '@/components/HafezFortune';
import { TarotReading } from '@/components/fal/TarotReading';
import { Horoscope } from '@/components/fal/Horoscope';
import { RumiIstikhara } from '@/components/fal/RumiIstikhara';
import { DreamInterpretation } from '@/components/readings/DreamInterpretation';
import { NameNumerology } from '@/components/readings/NameNumerology';
import { CoffeeReading } from '@/components/readings/CoffeeReading';
import { Numerology } from '@/components/readings/Numerology';

interface ReadingToolProps {
  slug: string;
}

export default function ReadingTool({ slug }: ReadingToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'hafez-fortune':
        return <HafezFortune />;
      case 'tarot-reading':
        return <TarotReading />;
      case 'horoscope':
        return <Horoscope />;
      case 'rumi-istikhara':
        return <RumiIstikhara />;
      case 'dream-interpretation':
        return <DreamInterpretation />;
      case 'name-numerology':
        return <NameNumerology />;
      case 'coffee-reading':
        return <CoffeeReading />;
      case 'numerology':
        return <Numerology />;
      case 'palm-reading':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">🤚</div>
              <h3 className="text-xl font-bold text-purple-800">فال دست</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                کف دست خود را نگاه کنید و خطوط زیر را بررسی کنید:
              </p>
              <div className="text-right space-y-3 max-w-lg mx-auto bg-white p-4 rounded-lg">
                <div><strong>خط زندگی:</strong> نشان‌دهنده طول عمر و سلامتی</div>
                <div><strong>خط عقل:</strong> نشان‌دهنده هوش و تصمیم‌گیری</div>
                <div><strong>خط قلب:</strong> نشان‌دهنده عشق و احساسات</div>
                <div><strong>خط سرنوشت:</strong> نشان‌دهنده مسیر زندگی</div>
              </div>
              <p className="text-sm text-gray-600">
                برای تفسیر دقیق‌تر، با متخصص کیرومانسی مشورت کنید
              </p>
            </div>
          </div>
        );
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
