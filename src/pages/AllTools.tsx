import React, { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ToolCardWithTags } from "@/components/tools/ToolCardWithTags";
import { CategorySidebar } from "@/components/tools/CategorySidebar";
import { DirectoryFilters, SortType, FilterChipType } from "@/components/tools/DirectoryFilters";
import { tools, ToolCategory, categoryLabels } from "@/data/tools";
import { SeoHead } from "@/components/seo/SeoHead";
import { Menu, X } from "lucide-react";

// Popular tools for sorting
const POPULAR_SLUGS = [
  'bmi-calculator', 'percentage-calculator', 'text-counter', 'image-compressor',
  'qr-code-generator', 'password-generator', 'json-formatter', 'unit-converter',
  'color-palette-generator', 'meta-tag-generator', 'hafez-fortune', 'tarot-reading',
  'discount-calculator', 'age-calculator', 'horoscope'
];

const AllTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<SortType>('popular');
  const [activeChips, setActiveChips] = useState<FilterChipType[]>([]);
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

  // Handle chip toggle
  const handleChipToggle = (chip: FilterChipType) => {
    setActiveChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    );
  };

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = tools.filter(t => !t.isComingSoon);

    // Category filter from sidebar
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

    // Filter chips
    if (activeChips.includes('persian')) {
      result = result.filter(t => 
        t.category === 'persian-cultural' || t.category === 'readings'
      );
    }
    if (activeChips.includes('numbers')) {
      result = result.filter(t => 
        t.category === 'calculators' || t.category === 'number'
      );
    }
    if (activeChips.includes('image')) {
      result = result.filter(t => t.category === 'image');
    }

    // Sorting
    switch (sortType) {
      case 'popular':
        result = [...result].sort((a, b) => {
          const aPopular = POPULAR_SLUGS.indexOf(a.slug);
          const bPopular = POPULAR_SLUGS.indexOf(b.slug);
          if (aPopular === -1 && bPopular === -1) return 0;
          if (aPopular === -1) return 1;
          if (bPopular === -1) return -1;
          return aPopular - bPopular;
        });
        break;
      case 'newest':
        result = [...result].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'alphabetical':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
        break;
    }

    return result;
  }, [searchQuery, sortType, activeChips, selectedCategory]);

  const handleCategorySelect = (category: ToolCategory | null) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const handleTagClick = (category: ToolCategory) => {
    setSelectedCategory(category);
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

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50">
          <div className="container mx-auto px-4 max-w-6xl py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  همه ابزارها
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {tools.filter(t => !t.isComingSoon).length} ابزار آنلاین رایگان
                </p>
              </div>

              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span className="sr-only sm:not-sr-only">
                  {selectedCategory ? categoryLabels[selectedCategory] : 'دسته‌ها'}
                </span>
              </button>
            </div>

            {/* Filters */}
            <DirectoryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortType={sortType}
              onSortChange={setSortType}
              activeChips={activeChips}
              onChipToggle={handleChipToggle}
              resultCount={filteredTools.length}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <div className="flex gap-6">
            {/* Sidebar - Desktop always visible, Mobile toggleable */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* Tools Grid */}
            <div className="flex-1 min-w-0">
              {filteredTools.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">ابزاری یافت نشد</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery 
                      ? `برای "${searchQuery}" نتیجه‌ای یافت نشد.`
                      : 'ابزاری با این فیلتر موجود نیست.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveChips([]);
                      setSelectedCategory(null);
                    }}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    نمایش همه ابزارها
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected category header */}
                  {selectedCategory && (
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <h2 className="text-lg font-bold text-foreground">
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

                  {/* Tools grid - 3 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
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
