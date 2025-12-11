import React from "react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { tools, ToolCategory, categoryLabels } from "@/data/tools";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSearchParams, Link } from "react-router-dom";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { RecentlyUsedSection } from "@/components/tools/RecentlyUsedSection";
import { useToolFilters, FilterType } from "@/hooks/useToolFilters";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

// Category routes mapping
const categoryRoutes: Record<ToolCategory, string> = {
  calculators: '/calculators',
  text: '/text-tools',
  image: '/image-tools',
  'persian-cultural': '/persian-tools',
  readings: '/readings',
  seo: '/seo-tools',
  random: '/random-tools',
  number: '/number-tools',
  educational: '/educational-tools',
  productivity: '/productivity-tools',
  design: '/design-tools',
};

const AllTools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = (searchParams.get('filter') as FilterType) || 'all';

  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTools,
    totalCount,
  } = useToolFilters();

  // Sync filter with URL
  React.useEffect(() => {
    const urlFilter = searchParams.get('filter') as FilterType;
    if (urlFilter && urlFilter !== activeFilter) {
      setActiveFilter(urlFilter);
    }
  }, [searchParams]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  };

  // Group tools by category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const groupedTools = categories.reduce((acc, category) => {
    acc[category] = filteredTools.filter(tool => tool.category === category);
    return acc;
  }, {} as Record<ToolCategory, typeof tools>);

  return (
    <Layout>
      <SeoHead 
        title="همه ابزارها - لنگر | بیش از ۱۰۰ ابزار آنلاین رایگان"
        description="فهرست کامل ابزارهای آنلاین رایگان لنگر: محاسبه‌گر، متن، تصویر، سئو، فرهنگ فارسی و طالع‌بینی. فیلتر و جستجوی آسان."
        keywords="همه ابزارها, ابزار آنلاین رایگان, لنگر, فهرست ابزار, محاسبه‌گر, ابزار متنی"
        canonical="https://laangar.com/all-tools"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            همه ابزارها
          </h1>
          <p className="text-muted-foreground">
            بیش از {tools.length} ابزار رایگان برای هر نیازی
          </p>
        </motion.div>

        {/* Recently Used Section */}
        <RecentlyUsedSection />

        {/* Filters */}
        <div className="mb-8">
          <ToolFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            totalCount={totalCount}
          />
        </div>

        {/* Category Quick Links */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => {
              const count = tools.filter(t => t.category === category).length;
              return (
                <Link
                  key={category}
                  to={categoryRoutes[category]}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-card/80 transition-all text-sm whitespace-nowrap"
                >
                  <span className="font-medium">{categoryLabels[category]}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
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
                setSearchParams({});
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              نمایش همه ابزارها
            </button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryTools = groupedTools[category];
              if (categoryTools.length === 0) return null;
              
              return (
                <motion.section
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                        {categoryLabels[category]}
                      </h2>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {categoryTools.length} ابزار
                      </span>
                    </div>
                    <Link
                      to={categoryRoutes[category]}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      مشاهده همه
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryTools.slice(0, 8).map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllTools;
