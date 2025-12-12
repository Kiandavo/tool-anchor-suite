import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { categoryLabels, ToolCategory, tools } from '@/data/tools';
import { CategorySeoHead } from '@/components/seo/CategorySeoHead';
import { ChevronLeft } from 'lucide-react';

// The 6 main categories with their display names and descriptions
const MAIN_CATEGORIES: Record<string, {
  category: ToolCategory;
  h1: string;
  description: string;
}> = {
  'calculators': {
    category: 'calculators',
    h1: 'محاسبه‌گرهای آنلاین',
    description: 'محاسبه‌گرهای رایگان برای BMI، درصد، وام، تبدیل واحد، معدل و موارد دیگر. دقیق، سریع و بدون ثبت‌نام.',
  },
  'text-tools': {
    category: 'text',
    h1: 'ابزارهای متنی',
    description: 'شمارش کاراکتر و کلمات، تبدیل حروف، کدگذاری Base64، ترجمه متن و ابزارهای پردازش متن فارسی.',
  },
  'image-tools': {
    category: 'image',
    h1: 'ابزارهای تصویر',
    description: 'فشرده‌سازی، تغییر اندازه، تبدیل فرمت، برش و چرخش تصویر. همه کارها در مرورگر شما انجام می‌شود.',
  },
  'persian-tools': {
    category: 'persian-cultural',
    h1: 'فرهنگ فارسی',
    description: 'تقویم شمسی، تبدیل تاریخ میلادی به شمسی، معانی نام‌های ایرانی و ابزارهای فرهنگی.',
  },
  'readings': {
    category: 'readings',
    h1: 'فال و طالع‌بینی',
    description: 'فال حافظ، فال تاروت، استخاره با قرآن، طالع‌بینی روزانه و تعبیر خواب آنلاین.',
  },
  'seo-tools': {
    category: 'seo',
    h1: 'ابزارهای سئو و وب',
    description: 'تولید متا تگ، بررسی تراکم کلمات کلیدی، ساخت robots.txt و ابزارهای بهینه‌سازی سایت.',
  },
};

// Related categories mapping for "ابزارهای مرتبط در دسته‌های دیگر"
const RELATED_CATEGORIES: Record<string, string[]> = {
  'calculators': ['text-tools', 'seo-tools'],
  'text-tools': ['seo-tools', 'calculators'],
  'image-tools': ['seo-tools', 'text-tools'],
  'persian-tools': ['readings', 'calculators'],
  'readings': ['persian-tools', 'text-tools'],
  'seo-tools': ['text-tools', 'image-tools'],
};

interface CategoryPageProps {
  categorySlug?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const params = useParams<{ categorySlug: string }>();
  const slug = categorySlug || params.categorySlug || '';
  
  const categoryData = MAIN_CATEGORIES[slug];
  
  if (!categoryData) {
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

  const { category, h1, description } = categoryData;
  const categoryTools = tools.filter(t => t.category === category && !t.isComingSoon);
  const relatedSlugs = RELATED_CATEGORIES[slug] || [];

  return (
    <Layout>
      <CategorySeoHead category={category} slug={slug} />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-foreground font-medium">{h1}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {h1}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </header>

        {/* Tools Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          
          {categoryTools.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              ابزاری در این دسته موجود نیست.
            </div>
          )}
        </section>

        {/* Related Categories */}
        {relatedSlugs.length > 0 && (
          <section className="pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              ابزارهای مرتبط در دسته‌های دیگر
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedSlugs.map((relatedSlug) => {
                const related = MAIN_CATEGORIES[relatedSlug];
                if (!related) return null;
                return (
                  <Link
                    key={relatedSlug}
                    to={`/${relatedSlug}`}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 text-sm text-foreground rounded-lg transition-colors"
                  >
                    {related.h1}
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
