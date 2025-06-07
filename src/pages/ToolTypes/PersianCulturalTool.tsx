
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { PersianCalendar } from './PersianCultural/PersianCalendar';
import { PersianNames } from './PersianCultural/PersianNames';
import { PersianProverbs } from './PersianCultural/PersianProverbs';
import { FarsiLearning } from './PersianCultural/FarsiLearning';
import { PersianLiterature } from './PersianCultural/PersianLiterature';
import { PersianCuisine } from './PersianCultural/PersianCuisine';

interface PersianCulturalToolProps {
  slug: string;
}

export default function PersianCulturalTool({ slug }: PersianCulturalToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'persian-calendar':
        return <PersianCalendar />;
      case 'persian-names':
        return <PersianNames />;
      case 'persian-proverbs':
        return <PersianProverbs />;
      case 'farsi-learning':
        return <FarsiLearning />;
      case 'persian-literature':
        return <PersianLiterature />;
      case 'persian-cuisine':
        return <PersianCuisine />;
      case 'traditional-persian-games':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-green-50 to-blue-50">
            <div className="text-center space-y-6">
              <div className="text-6xl">🎲</div>
              <h3 className="text-2xl font-bold text-green-800">بازی‌های سنتی ایرانی</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-blue-700">گل یا پوچ</h4>
                  <p className="text-gray-700 text-sm">
                    بازی حدس زدن با دست‌ها. یک نفر چیزی در دست می‌گیرد و دیگری باید حدس بزند کدام دست.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-blue-700">علک دولک</h4>
                  <p className="text-gray-700 text-sm">
                    بازی گروهی که در آن کودکان دور هم می‌نشینند و با آواز خاص بازی می‌کنند.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-blue-700">یوبی</h4>
                  <p className="text-gray-700 text-sm">
                    بازی مخفی‌کاری که در آن یک نفر چیزی پنهان می‌کند و بقیه باید پیدا کنند.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-blue-700">قایم موشک</h4>
                  <p className="text-gray-700 text-sm">
                    بازی مخفی شدن که در آن یک نفر چشم‌هایش را می‌بندد و بقیه مخفی می‌شوند.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">
                  این بازی‌ها بخشی از فرهنگ غنی ایران هستند و نسل‌ها با آنها بزرگ شده‌اند.
                </p>
              </div>
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
