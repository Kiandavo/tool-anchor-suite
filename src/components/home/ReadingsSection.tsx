
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getReadingsTools } from '@/data/tools';
import { getToolsByReadingCategory, getPopularReadings, getTrendingReadings } from '@/data/reading-categories';
import { ReadingCategoryFilter } from '@/components/readings/ReadingCategoryFilter';
import { EnhancedToolCard } from '@/components/readings/EnhancedToolCard';
import { ReadingStats } from '@/components/readings/ReadingStats';
import { ReadingCategory } from '@/types/tool-types';
import { Star, ChevronLeft, TrendingUp, Sparkles } from 'lucide-react';

export const ReadingsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<ReadingCategory | null>(null);
  const allReadingsTools = getReadingsTools();
  const filteredTools = getToolsByReadingCategory(allReadingsTools, selectedCategory);
  const popularReadings = getPopularReadings(allReadingsTools).slice(0, 4);
  const trendingReadings = getTrendingReadings(allReadingsTools).slice(0, 4);

  return (
    <section className="mb-16 sm:mb-24 animate-slide-up rounded-3xl border border-purple-200/30 neo-glass shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
            <Star size={20} className="text-white" />
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800">فال و طالع‌بینی</h2>
        </div>
        <Link to="/category/readings" className="text-purple-600 flex items-center text-sm font-medium bg-purple-50 py-1.5 px-3 rounded-full hover:bg-purple-100/70 transition-colors group mt-2 sm:mt-0">
          مشاهده همه
          <ChevronLeft size={18} className="mr-1 group-hover:translate-x-[-2px] transition-transform" />
        </Link>
      </div>
      
      <div className="px-6 sm:px-10 pb-6">
        <p className="text-gray-700 leading-relaxed max-w-3xl mb-6 bg-white/60 p-4 rounded-xl border border-gray-200/50 shadow-sm">
          دنیای اسرارآمیز فال و طالع‌بینی را با مجموعه کاملی از ابزارهای سنتی و مدرن کشف کنید. 
          از فال حافظ و استخاره با مولانا تا تاروت، طالع‌بینی و تعبیر خواب. هر ابزار پیام‌ها و 
          راهنمایی‌های منحصر به فردی برای مسیر زندگی شما دارد.
        </p>

        {/* Category Filter */}
        <ReadingCategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Reading Statistics */}
        <ReadingStats tools={filteredTools} selectedCategory={selectedCategory} />

        {/* Popular & Trending Section */}
        {!selectedCategory && (
          <div className="mb-8 space-y-6">
            {/* Popular Readings */}
            {popularReadings.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">محبوب‌ترین فال‌ها</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularReadings.map((tool) => (
                    <div key={tool.id} className="animate-fade-in">
                      <EnhancedToolCard tool={tool} showPopularity={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Readings */}
            {trendingReadings.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">ترندهای جدید</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingReadings.map((tool) => (
                    <div key={tool.id} className="animate-fade-in">
                      <EnhancedToolCard tool={tool} showPopularity={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* All Readings Grid */}
      <div className="px-6 sm:px-10 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedCategory ? `دسته ${getCategoryLabel(selectedCategory)}` : 'همه ابزارهای فال و طالع‌بینی'}
          </h3>
          <span className="text-sm text-gray-500">
            {filteredTools.length} ابزار
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <EnhancedToolCard tool={tool} showPopularity={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getCategoryLabel = (category: ReadingCategory): string => {
  const labels: Record<ReadingCategory, string> = {
    poetry: 'شعر و ادب',
    astrology: 'نجوم',
    divination: 'فال‌گیری',
    dreams: 'خواب و رویا',
    traditional: 'سنتی',
    modern: 'مدرن',
    numerology: 'اعداد شناسی',
    cultural: 'فرهنگی'
  };
  return labels[category] || category;
};
