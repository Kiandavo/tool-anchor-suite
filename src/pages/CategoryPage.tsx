import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { categoryLabels, ToolCategory, tools } from '@/data/tools';
import { CategorySeoHead } from '@/components/seo/CategorySeoHead';
import { ToolFilters } from '@/components/tools/ToolFilters';
import { RecentlyUsedSection } from '@/components/tools/RecentlyUsedSection';
import { useToolFilters, FilterType } from '@/hooks/useToolFilters';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SocialShare } from '@/components/social/SocialShare';

// Map URL slugs to category IDs
const slugToCategoryMap: Record<string, ToolCategory> = {
  'calculators': 'calculators',
  'text-tools': 'text',
  'image-tools': 'image',
  'persian-tools': 'persian-cultural',
  'readings': 'readings',
  'seo-tools': 'seo',
  'random-tools': 'random',
  'number-tools': 'number',
  'educational-tools': 'educational',
  'productivity-tools': 'productivity',
  'design-tools': 'design',
};

// Category descriptions for SEO
const categoryDescriptions: Record<ToolCategory, string> = {
  calculators: 'محاسبه‌گرهای آنلاین رایگان برای BMI، درصد، وام، تبدیل واحد و موارد دیگر. دقیق و سریع.',
  text: 'ابزارهای متنی آنلاین: شمارنده کاراکتر، تبدیل متن، کدگذاری Base64، فرمت JSON و بیشتر.',
  image: 'ابزارهای ویرایش تصویر آنلاین: فشرده‌سازی، تغییر سایز، تبدیل فرمت و برش تصویر.',
  'persian-cultural': 'ابزارهای فرهنگ فارسی: تقویم شمسی، تبدیل تاریخ، معانی نام‌های ایرانی و موارد دیگر.',
  readings: 'فال و طالع‌بینی آنلاین: فال حافظ، تاروت، استخاره، طالع‌بینی روزانه و تعبیر خواب.',
  seo: 'ابزارهای سئو و وبمستری: تولید متا تگ، تراکم کلمات کلیدی، robots.txt و آنالیز وب.',
  random: 'ابزارهای تصادفی: تولید رمز عبور، انتخاب تصادفی، تولید QR کد و موارد دیگر.',
  number: 'ابزارهای عددی: تبدیل واحد، محاسبات ریاضی، تبدیل پایه و موارد دیگر.',
  educational: 'ابزارهای آموزشی: یادگیری زبان، آزمون و تست، محتوای آموزشی.',
  productivity: 'ابزارهای بهره‌وری: مدیریت زمان، یادداشت، برنامه‌ریزی و موارد دیگر.',
  design: 'ابزارهای طراحی: پالت رنگ، گرادیانت، فونت و موارد دیگر.',
};

interface CategoryPageProps {
  categorySlug?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const params = useParams<{ categorySlug: string }>();
  const slug = categorySlug || params.categorySlug || '';
  
  // Get category from slug
  const category = slugToCategoryMap[slug] as ToolCategory;
  
  if (!category) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">دسته‌بندی یافت نشد</h1>
          <Link to="/all-tools" className="text-primary hover:underline">
            بازگشت به همه ابزارها
          </Link>
        </div>
      </Layout>
    );
  }

  const categoryName = categoryLabels[category];
  const allCategoryTools = tools.filter(t => t.category === category);

  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTools,
    totalCount,
    clearFilters,
  } = useToolFilters(category);

  return (
    <Layout>
      <CategorySeoHead category={category} slug={slug} />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/all-tools" className="hover:text-foreground transition-colors">همه ابزارها</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{categoryName}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {categoryName}
              </h1>
              <p className="text-muted-foreground">
                {allCategoryTools.length} ابزار رایگان و حرفه‌ای
              </p>
            </div>
            <SocialShare 
              url={`https://laangar.com/${slug}`}
              title={`${categoryName} | لنگر`}
              description={categoryDescriptions[category]}
              size="sm"
            />
          </div>
          <p className="text-foreground/80 leading-relaxed">
            {categoryDescriptions[category]}
          </p>
        </motion.div>

        {/* Recently Used (category-specific would be better, but showing global for now) */}
        <RecentlyUsedSection maxItems={4} />

        {/* Filters */}
        <div className="mb-8">
          <ToolFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            totalCount={totalCount}
            showRecentFilter={false}
          />
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
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              نمایش همه ابزارها
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به همه ابزارها
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
