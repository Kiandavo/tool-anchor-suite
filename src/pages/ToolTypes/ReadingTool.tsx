
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { HafezFortune } from '@/components/HafezFortune';
import { TarotReading } from '@/components/fal/TarotReading';
import { Horoscope } from '@/components/fal/Horoscope';
import { RumiIstikhara } from '@/components/fal/RumiIstikhara';
import { ParallelUniverseExplorer } from '@/components/fal/parallelUniverse/ParallelUniverseExplorer';
import PersianSuperstitions from '@/components/readings/PersianSuperstitions';
import DailyHoroscope from '@/components/readings/DailyHoroscope';

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
      case 'parallel-universe':
        return <ParallelUniverseExplorer />;
      case 'persian-superstitions':
        return <PersianSuperstitions />;
      case 'daily-horoscope':
        return <DailyHoroscope />;
      case 'dream-interpretation':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">💤</div>
              <h3 className="text-xl font-bold text-purple-800">تعبیر خواب</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                خواب خود را وارد کنید تا تعبیر آن را دریافت کنید
              </p>
              <div className="bg-white p-4 rounded-lg">
                <textarea 
                  className="w-full p-2 border rounded" 
                  placeholder="خواب خود را اینجا بنویسید..."
                  rows={4}
                />
                <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  تعبیر خواب
                </button>
              </div>
            </div>
          </div>
        );
      case 'name-numerology':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-green-50 to-yellow-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">🔢</div>
              <h3 className="text-xl font-bold text-green-800">اعداد شناسی نام</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                نام خود را وارد کنید تا تحلیل عددی آن را ببینید
              </p>
              <div className="bg-white p-4 rounded-lg">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="نام خود را وارد کنید"
                />
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  تحلیل نام
                </button>
              </div>
            </div>
          </div>
        );
      case 'coffee-reading':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">☕</div>
              <h3 className="text-xl font-bold text-amber-800">فال قهوه</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                شکل‌های دیده شده در ته فنجان قهوه را توصیف کنید
              </p>
              <div className="bg-white p-4 rounded-lg">
                <textarea 
                  className="w-full p-2 border rounded" 
                  placeholder="شکل‌هایی که در ته فنجان می‌بینید را توصیف کنید..."
                  rows={3}
                />
                <button className="mt-2 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">
                  تفسیر فال
                </button>
              </div>
            </div>
          </div>
        );
      case 'numerology':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">🔮</div>
              <h3 className="text-xl font-bold text-indigo-800">اعداد شناسی</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                تاریخ تولد خود را وارد کنید تا اعداد سرنوشت شما محاسبه شود
              </p>
              <div className="bg-white p-4 rounded-lg">
                <input 
                  type="date" 
                  className="w-full p-2 border rounded"
                />
                <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  محاسبه اعداد سرنوشت
                </button>
              </div>
            </div>
          </div>
        );
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
