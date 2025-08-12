
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import PersianArchitecture from '@/pages/ToolTypes/PersianCultural/PersianArchitecture';
import PersianHolidays from '@/pages/ToolTypes/PersianCultural/PersianHolidays';
import PersianMusic from '@/pages/ToolTypes/PersianCultural/PersianMusic';
import PersianPoetryAnalysis from '@/pages/ToolTypes/PersianCultural/PersianPoetryAnalysis';
import WordEtymology from '@/pages/ToolTypes/PersianCultural/WordEtymology';
import PersianNames from '@/pages/ToolTypes/PersianCultural/PersianNames';
import PersianProverbs from '@/pages/ToolTypes/PersianCultural/PersianProverbs';
import PersianCalendar from '@/pages/ToolTypes/PersianCultural/PersianCalendar';

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
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">📖</div>
              <h3 className="text-2xl font-bold text-indigo-800">آموزش زبان فارسی</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                Learn Farsi - Common phrases and alphabet
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Common Phrases</h4>
                  <div className="text-sm space-y-1">
                    <div>سلام - Hello (Salaam)</div>
                    <div>خداحافظ - Goodbye (Khodahafez)</div>
                    <div>متشکرم - Thank you (Moteshakeram)</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Alphabet</h4>
                  <div className="text-sm space-y-1">
                    <div>الف - A (Alef)</div>
                    <div>ب - B (Be)</div>
                    <div>پ - P (Pe)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'persian-literature':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-purple-50 to-violet-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">📜</div>
              <h3 className="text-2xl font-bold text-purple-800">ادبیات فارسی</h3>
              <div className="bg-white p-4 rounded-lg max-w-lg mx-auto text-right">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">حافظ شیرازی</h4>
                    <p className="text-sm italic">به کوی میکده رفتن از ما به است</p>
                  </div>
                  <div>
                    <h4 className="font-bold">مولانا</h4>
                    <p className="text-sm italic">بشنو از نی چون حکایت می‌کند</p>
                  </div>
                  <div>
                    <h4 className="font-bold">فردوسی</h4>
                    <p className="text-sm italic">به نام خداوند جان و خرد</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'persian-cuisine':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-red-50 to-orange-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">🍽️</div>
              <h3 className="text-2xl font-bold text-red-800">آشپزی ایرانی</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">چلو کباب</h4>
                  <p className="text-sm text-gray-600">
                    برنج با کباب کوبیده - غذای ملی ایران
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">قورمه سبزی</h4>
                  <p className="text-sm text-gray-600">
                    خورش سبزیجات با گوشت و لوبیا قرمز
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">فسنجان</h4>
                  <p className="text-sm text-gray-600">
                    خورش انار و گردو با مرغ
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">تاچین</h4>
                  <p className="text-sm text-gray-600">
                    برنج لایه‌ای با مرغ و زعفران
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
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
      case 'persian-architecture':
        return <PersianArchitecture />;
      case 'persian-holidays':
        return <PersianHolidays />;
      case 'persian-music':
        return <PersianMusic />;
      case 'persian-poetry-analysis':
        return <PersianPoetryAnalysis />;
      case 'word-etymology':
        return <WordEtymology />;
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
