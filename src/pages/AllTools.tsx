import React, { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ToolCardWithTags } from "@/components/tools/ToolCardWithTags";
import { CategorySidebar } from "@/components/tools/CategorySidebar";
import { DirectoryFilters, DirectoryFilterType } from "@/components/tools/DirectoryFilters";
import { tools, ToolCategory, categoryLabels } from "@/data/tools";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Popular tools for "محبوب‌ترین" filter
const POPULAR_SLUGS = [
  'bmi-calculator', 'percentage-calculator', 'text-counter', 'image-compressor',
  'qr-code-generator', 'password-generator', 'json-formatter', 'unit-converter',
  'color-palette-generator', 'meta-tag-generator', 'hafez-fortune', 'tarot-reading',
  'discount-calculator', 'age-calculator', 'horoscope'
];

// Recommended tools for "پیشنهادی" filter
const RECOMMENDED_SLUGS = [
  'bmi-calculator', 'text-counter', 'image-compressor', 'hafez-fortune',
  'qr-code-generator', 'percentage-calculator', 'json-formatter', 'password-generator'
];

const AllTools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<DirectoryFilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ToolCategory, number> = {} as Record<ToolCategory, number>;
    (Object.keys(categoryLabels) as ToolCategory[]).forEach(cat => {
      counts[cat] = tools.filter(t => t.category === cat && !t.isComingSoon).length;
    });
    return counts;
  }, []);

  // Filter tools based on all criteria
  const filteredTools = useMemo(() => {
    let result = tools.filter(t => !t.isComingSoon);

    // Category filter
    if (selectedCategory) {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        categoryLabels[t.category as ToolCategory]?.toLowerCase().includes(query)
      );
    }

    // Type filter
    switch (activeFilter) {
      case 'new':
        result = result.filter(t => t.isNew);
        break;
      case 'popular':
        result = result.filter(t => POPULAR_SLUGS.includes(t.slug));
        break;
      case 'recommended':
        result = result.filter(t => RECOMMENDED_SLUGS.includes(t.slug));
        break;
    }

    return result;
  }, [searchQuery, activeFilter, selectedCategory]);

  const handleCategorySelect = (category: ToolCategory | null) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
    // Reset other filters when category changes
    setActiveFilter('all');
  };

  const handleTagClick = (category: ToolCategory) => {
    setSelectedCategory(category);
    setActiveFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <SeoHead 
        title="همه ابزارها - لنگر | بیش از ۱۰۰ ابزار آنلاین رایگان"
        description="فهرست کامل ابزارهای آنلاین رایگان لنگر: محاسبه‌گر، متن، تصویر، سئو، فرهنگ فارسی و طالع‌بینی. فیلتر و جستجوی آسان."
        keywords="همه ابزارها, ابزار آنلاین رایگان, لنگر, فهرست ابزار, محاسبه‌گر, ابزار متنی, ابزار تصویر"
        canonical="https://laangar.com/all-tools"
      />

      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-b from-amber-50/50 to-background py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                همه ابزارها
              </h1>
              <p className="text-muted-foreground">
                بیش از {tools.filter(t => !t.isComingSoon).length} ابزار رایگان • ابزار مورد نظرت رو پیدا کن
              </p>
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 mb-4 bg-card border border-border rounded-lg text-sm font-medium"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              {selectedCategory ? categoryLabels[selectedCategory] : 'دسته‌بندی‌ها'}
            </button>

            {/* Filters */}
            <DirectoryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              resultCount={filteredTools.length}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop always visible, Mobile toggleable */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* Tools Grid */}
            <div className="flex-1">
              {filteredTools.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">ابزاری یافت نشد</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery 
                      ? `برای "${searchQuery}" نتیجه‌ای یافت نشد.`
                      : 'ابزاری با این فیلتر موجود نیست.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                      setSelectedCategory(null);
                    }}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    نمایش همه ابزارها
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected category header */}
                  {selectedCategory && (
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">
                        {categoryLabels[selectedCategory]}
                      </h2>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-sm text-primary hover:underline"
                      >
                        نمایش همه
                      </button>
                    </div>
                  )}

                  {/* Tools grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredTools.map((tool) => (
                      <ToolCardWithTags 
                        key={tool.id} 
                        tool={tool} 
                        onTagClick={handleTagClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SEO: Hidden crawlable list of all tools */}
        <noscript>
          <div className="container mx-auto px-4 py-8">
            <h2>فهرست کامل ابزارها</h2>
            <ul>
              {tools.filter(t => !t.isComingSoon).map(tool => (
                <li key={tool.id}>
                  <a href={`/tool/${tool.slug}`}>
                    {tool.name} - {tool.description}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </noscript>
      </div>
    </Layout>
  );
};

export default AllTools;
