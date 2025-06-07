
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';

interface PersianCulturalToolProps {
  slug: string;
}

export default function PersianCulturalTool({ slug }: PersianCulturalToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  const renderToolContent = () => {
    switch (slug) {
      case 'persian-calendar':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">📅</div>
              <h3 className="text-2xl font-bold text-blue-800">تبدیل تقویم</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                تاریخ را بین تقویم‌های شمسی، قمری و میلادی تبدیل کنید
              </p>
              <div className="bg-white p-4 rounded-lg">
                <input 
                  type="date" 
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="text-sm text-gray-600 mt-2">
                  <div>شمسی: ۱۴۰۳/۰۳/۱۷</div>
                  <div>قمری: ۱۴۴۵/۱۲/۰۲</div>
                  <div>میلادی: 2024/06/07</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'persian-names':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">👤</div>
              <h3 className="text-2xl font-bold text-pink-800">معانی نام‌های ایرانی</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                معنی و ریشه نام‌های فارسی را جستجو کنید
              </p>
              <div className="bg-white p-4 rounded-lg">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="نام مورد نظر را وارد کنید"
                />
                <button className="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                  جستجو
                </button>
              </div>
            </div>
          </div>
        );
      case 'persian-proverbs':
        return (
          <div className="rounded-lg border p-6 shadow-sm bg-gradient-to-br from-yellow-50 to-amber-50">
            <div className="text-center space-y-4">
              <div className="text-6xl">📚</div>
              <h3 className="text-2xl font-bold text-yellow-800">ضرب‌المثل‌های فارسی</h3>
              <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
                <div className="text-right space-y-3">
                  <div className="border-b pb-2">
                    <strong>آب رفته به جوی باز نمی‌گردد</strong>
                    <p className="text-sm text-gray-600 mt-1">معنی: کارهای انجام شده قابل برگشت نیستند</p>
                  </div>
                  <div className="border-b pb-2">
                    <strong>دوست آن باشد که گیرد دست دوست</strong>
                    <p className="text-sm text-gray-600 mt-1">معنی: دوست واقعی در زمان سختی کمک می‌کند</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
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
