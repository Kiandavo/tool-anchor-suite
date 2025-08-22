import React, { useState } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCategory, categoryLabels, getToolsByCategory } from '@/data/tools';
import { Grid3X3, ChevronLeft, Search, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InteractiveCategoriesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'count'>('count');
  
  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length,
    label: categoryLabels[category]
  }));

  // Filter and sort categories
  const filteredCategories = categoryCounts
    .filter(({ label }) => 
      searchTerm === '' || label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'count') {
        return b.count - a.count;
      }
      return a.label.localeCompare(b.label, 'fa');
    });

  const totalTools = categoryCounts.reduce((sum, cat) => sum + cat.count, 0);
  const topCategories = categoryCounts.sort((a, b) => b.count - a.count).slice(0, 3);

  return (
    <section className="mb-20 sm:mb-32 animate-slide-up">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 rounded-3xl"></div>
        
        <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-8 border-b border-border/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Grid3X3 size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">دسته‌بندی‌ها</h2>
                  <p className="text-muted-foreground">کاوش آسان در {totalTools} ابزار متنوع</p>
                </div>
              </div>
              
              <Link 
                to="/all-tools" 
                className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium w-fit"
              >
                مشاهده همه ابزارها
                <ChevronLeft size={16} />
              </Link>
            </div>

            {/* Statistics & Search */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Categories Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-blue-600" />
                  <h3 className="font-semibold text-foreground">محبوب‌ترین دسته‌ها</h3>
                </div>
                <div className="space-y-2">
                  {topCategories.map((cat, index) => (
                    <div key={cat.category} className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80">{cat.label}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        {cat.count} ابزار
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search & Filter */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={18} className="text-blue-600" />
                  <h3 className="font-semibold text-foreground">جستجو و فیلتر</h3>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="جستجو در دسته‌بندی‌ها..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                    />
                    <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy('count')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === 'count' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Filter size={14} />
                      بر اساس تعداد
                    </button>
                    <button
                      onClick={() => setSortBy('name')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === 'name' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      الفبایی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-border/20">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 rounded-xl p-6 border border-blue-100/50 text-center">
              <p className="text-foreground/80 leading-relaxed max-w-4xl mx-auto">
                دسته‌بندی‌های متنوع لنگر به شما کمک می‌کند ابزار مناسب را سریع پیدا کنید؛ 
                از محاسبه‌گر و متن تا تصویر، سئو، فرهنگ فارسی و طالع‌بینی. 
                هر دسته‌بندی شامل ابزارهای تخصصی و کاربردی است که برای نیازهای مختلف طراحی شده‌اند.
              </p>
            </div>
          </div>
          
          {/* Categories Grid */}
          <div className="p-8">
            {filteredCategories.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredCategories.map(({ category, count }, index) => (
                    <div 
                      key={category} 
                      className="animate-fade-in hover-lift" 
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CategoryCard category={category} count={count} />
                    </div>
                  ))}
                </div>
                
                {searchTerm && (
                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground">
                      {filteredCategories.length} دسته‌بندی یافت شد برای "{searchTerm}"
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">دسته‌بندی‌ای یافت نشد</h3>
                <p className="text-muted-foreground mb-4">
                  متاسفانه دسته‌بندی‌ای با عبارت "{searchTerm}" یافت نشد.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  نمایش همه دسته‌بندی‌ها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};