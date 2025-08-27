
import React, { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { tools, ToolCategory, categoryLabels, searchTools } from "@/data/tools";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";

// Get all unique categories in the same order as the labels object
const categories: ToolCategory[] = Object.keys(categoryLabels) as ToolCategory[];

const AllTools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Handle search from URL params
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchTools(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group filtered tools by category
  const groupedTools: Record<ToolCategory, typeof tools> = categories.reduce((acc, category) => {
    acc[category] = filteredTools.filter((tool) => tool.category === category);
    return acc;
  }, {} as Record<ToolCategory, typeof tools>);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSearchParams({});
  };
  return (
    <Layout>
      <SeoHead 
        title="همه ابزارها - لنگر | فهرست کامل ابزارهای آنلاین"
        description="فهرست کامل ابزارهای آنلاین رایگان لنگر بر اساس دسته‌بندی: محاسبه‌گر، متن، تصویر، سئو، فرهنگ فارسی، طالع‌بینی و بیشتر."
        keywords="همه ابزارها, ابزار آنلاین, لنگر, فهرست ابزار, محاسبه‌گر, ابزار متنی, ابزار تصویری, سئو, طالع‌بینی"
        canonical="https://langar.co/all-tools"
      />
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">همه ابزارها بر اساس دسته‌بندی</h1>
      <p className="text-gray-600 text-sm sm:text-base text-center mb-6">همه ابزارهای رایگان لنگر در یک صفحه؛ به سرعت ابزار مناسب خود را بر اساس دسته‌بندی پیدا کنید.</p>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در ابزارها..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 bg-white min-w-[200px]"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">فیلترهای فعال:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                جستجو: "{searchQuery}"
                <button onClick={() => handleSearch('')} className="hover:text-primary/70">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                {categoryLabels[selectedCategory as ToolCategory]}
                <button onClick={() => setSelectedCategory('')} className="hover:text-amber-600">
                  <X size={14} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              پاک کردن همه فیلترها
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center text-sm text-gray-600">
          {filteredTools.length === 0 ? (
            <span>هیچ ابزاری یافت نشد</span>
          ) : (
            <span>{filteredTools.length} ابزار یافت شد</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8 sm:gap-12">
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">ابزاری یافت نشد</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 
                `برای جستجوی "${searchQuery}" نتیجه‌ای یافت نشد.` :
                'ابزاری در این دسته‌بندی موجود نیست.'
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                مشاهده همه ابزارها
              </button>
            )}
          </div>
        ) : (
          categories.map((category) =>
            groupedTools[category].length > 0 ? (
              <section key={category}>
                <div className="flex items-center mb-2 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{categoryLabels[category]}</h2>
                  <span className="ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{groupedTools[category].length} ابزار</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {groupedTools[category].map((tool) => (
                    <ToolCard tool={tool} key={tool.id} />
                  ))}
                </div>
              </section>
            ) : null
          )
        )}
      </div>
    </Layout>
  );
};

export default AllTools;
