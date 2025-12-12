import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory, categoryLabels, ToolCategory } from '@/data/tools';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { CategorySeoContent } from '@/components/seo/CategorySeoContent';
import { SocialShare } from '@/components/social/SocialShare';
import { motion } from 'framer-motion';

// Enhanced category data with unique H1 and detailed intro
const categoryContent: Record<ToolCategory, { h1: string; intro: string }> = {
  calculators: {
    h1: 'محاسبه‌گرهای آنلاین رایگان',
    intro: 'مجموعه کامل محاسبه‌گرهای آنلاین برای حل مسائل روزمره: از محاسبه شاخص توده بدنی (BMI) و درصد تا محاسبه وام، اقساط، تخفیف و مالیات. همه ابزارها دقیق، سریع و بدون نیاز به نصب هستند.',
  },
  text: {
    h1: 'ابزارهای متنی آنلاین',
    intro: 'ابزارهای کاربردی برای کار با متن: شمارش کاراکتر و کلمات، فرمت‌کردن JSON، کدگذاری و رمزگشایی Base64، تبدیل حروف فارسی و عربی، و ویرایش متن. ایده‌آل برای برنامه‌نویسان، نویسندگان و ادمین‌های سایت.',
  },
  image: {
    h1: 'ابزارهای ویرایش تصویر آنلاین',
    intro: 'ابزارهای حرفه‌ای برای ویرایش تصویر بدون نیاز به نصب نرم‌افزار: فشرده‌سازی عکس برای کاهش حجم، تغییر اندازه، برش، تبدیل فرمت (JPG، PNG، WebP) و حذف پس‌زمینه. مناسب برای طراحان، بلاگرها و صاحبان کسب‌وکار.',
  },
  'persian-cultural': {
    h1: 'ابزارهای فرهنگ فارسی و تقویم',
    intro: 'ابزارهای تخصصی فرهنگ ایرانی: تقویم شمسی با مناسبت‌ها، تبدیل تاریخ میلادی به شمسی و بالعکس، محاسبه سن دقیق، معانی نام‌های فارسی و ابزارهای مرتبط با زبان و ادبیات فارسی.',
  },
  readings: {
    h1: 'فال و طالع‌بینی آنلاین',
    intro: 'مجموعه کامل فال و طالع‌بینی برای سرگرمی و خودشناسی: فال حافظ با تفسیر کامل، فال تاروت، استخاره با مولانا، طالع‌بینی روزانه بر اساس ماه تولد، تعبیر خواب و فال قهوه. همه رایگان و آنلاین.',
  },
  seo: {
    h1: 'ابزارهای سئو و وبمستری',
    intro: 'ابزارهای ضروری برای بهینه‌سازی سایت و سئو: تولید متا تگ، بررسی تراکم کلمات کلیدی، ساخت فایل robots.txt و sitemap، تحلیل سرعت صفحه و بررسی وضعیت سئوی سایت. مناسب برای صاحبان سایت و متخصصان دیجیتال مارکتینگ.',
  },
  random: {
    h1: 'ابزارهای تصادفی و تولیدکننده',
    intro: 'ابزارهای تولید محتوای تصادفی: ساخت رمز عبور قوی و امن، تولید QR کد، انتخاب تصادفی از لیست، تولید عدد تصادفی و موارد مشابه. ایده‌آل برای امنیت، قرعه‌کشی و کارهای روزمره.',
  },
  number: {
    h1: 'ابزارهای عددی و تبدیل',
    intro: 'ابزارهای محاسباتی و تبدیل اعداد: تبدیل واحدها (طول، وزن، دما، ارز)، تبدیل پایه اعداد (دودویی، هگز)، محاسبات ریاضی پیشرفته و ابزارهای مرتبط با اعداد و ارقام.',
  },
  educational: {
    h1: 'ابزارهای آموزشی',
    intro: 'ابزارهای کمک‌آموزشی برای یادگیری بهتر: کوییز و آزمون، ابزارهای یادگیری زبان، محتوای آموزشی تعاملی و موارد مشابه.',
  },
  productivity: {
    h1: 'ابزارهای بهره‌وری',
    intro: 'ابزارهای افزایش بهره‌وری: مدیریت زمان، یادداشت‌برداری، برنامه‌ریزی و سازماندهی کارها. برای کار کردن هوشمندانه‌تر.',
  },
  design: {
    h1: 'ابزارهای طراحی',
    intro: 'ابزارهای طراحی گرافیکی آنلاین: تولید پالت رنگ، ساخت گرادیانت، انتخاب فونت و ابزارهای خلاقانه برای طراحان.',
  },
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const category = categoryId as ToolCategory;
  const allTools = getToolsByCategory(category);
  const filteredTools = searchQuery
    ? allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTools;

  const categoryName = categoryLabels[category];
  const content = categoryContent[category] || { h1: categoryName, intro: '' };
  
  const seoTitle = `${content.h1} | ${allTools.length} ابزار رایگان | لنگر`;
  const seoDescription = content.intro.slice(0, 155) + '...';
  
  const seoKeywords = [
    `${categoryName} رایگان`,
    `${categoryName} آنلاین`,
    'لنگر',
    'ابزار حرفه‌ای',
    'بدون ثبت‌نام'
  ];

  if (!category || !categoryLabels[category]) {
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

  return (
    <Layout>
      <EnhancedSeoHead 
        pageType="category"
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords.join(', ')}
        canonical={`https://laangar.com/category/${category}`}
        breadcrumbs={[
          { name: 'لنگر', url: 'https://laangar.com/' },
          { name: categoryName, url: `https://laangar.com/category/${category}` }
        ]}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/all-tools" className="hover:text-foreground transition-colors">همه ابزارها</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{categoryName}</span>
        </nav>

        {/* Header with unique H1 and intro */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {content.h1}
              </h1>
              <p className="text-muted-foreground text-sm">
                {allTools.length} ابزار رایگان و حرفه‌ای
              </p>
            </div>
            <SocialShare 
              url={`https://laangar.com/category/${category}`}
              title={seoTitle}
              description={seoDescription}
              size="sm"
            />
          </div>
          
          {/* Detailed intro paragraph */}
          <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
            {content.intro}
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-6 relative max-w-md w-full">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در این دسته..."
            className="w-full rounded-xl border border-border bg-card py-3 pr-10 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            dir="rtl"
          />
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-card rounded-xl border border-border"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-muted-foreground mb-4">
              برای "{searchQuery}" ابزاری پیدا نشد.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              نمایش همه
            </button>
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

        {/* Enhanced SEO Content */}
        <CategorySeoContent 
          categoryName={categoryName}
          categorySlug={category}
          toolCount={allTools.length}
          relatedTools={allTools.slice(0, 8).map(tool => ({ name: tool.name, slug: tool.slug }))}
        />
      </div>
    </Layout>
  );
};

export default Category;
