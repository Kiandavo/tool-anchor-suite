
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory, categoryLabels, ToolCategory } from '@/data/tools';
import { Search } from 'lucide-react';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { CategorySeoContent } from '@/components/seo/CategorySeoContent';
import { SocialShare } from '@/components/social/SocialShare';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  // Type assertion since we know the param should match our ToolCategory type
  const category = categoryId as ToolCategory;
  const allTools = getToolsByCategory(category);
  const filteredTools = searchQuery
    ? allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTools;

  const categoryName = categoryLabels[category];
  
  // Generate enhanced SEO metadata
  const seoTitle = `${categoryName} - ابزارهای آنلاین لنگر | ${allTools.length} ابزار رایگان`;
  const seoDescription = (() => {
    if (category === 'persian-cultural') {
      return 'ابزارهای فرهنگ و زبان فارسی: تبدیل تاریخ، معانی نام‌های ایرانی، ضرب‌المثل‌های فارسی، آموزش خوشنویسی و بیشتر. مجموعه کاملی از ابزارهای فرهنگی ایرانی.';
    } else if (category === 'readings') {
      return 'فال و طالع‌بینی رایگان: فال حافظ، تاروت، استخاره با مولانا، تعبیر خواب، طالع روزانه و ابزارهای معنوی برای خودشناسی و سرگرمی.';
    }
    return `${allTools.length} ابزار ${categoryName} رایگان و آنلاین. بهترین ابزارهای ${categoryName} برای استفاده روزمره با کیفیت بالا و رابط کاربری آسان.`;
  })();
  
  const seoKeywords = (() => {
    const baseKeywords = [`ابزارهای ${categoryName}`, 'لنگر', 'ابزار آنلاین', 'رایگان'];
    if (category === 'persian-cultural') {
      return [...baseKeywords, 'فرهنگ ایرانی', 'تقویم فارسی', 'نام‌های ایرانی', 'ضرب المثل'];
    } else if (category === 'readings') {
      return [...baseKeywords, 'فال حافظ', 'تاروت', 'طالع‌بینی', 'استخاره', 'تعبیر خواب'];
    }
    return baseKeywords;
  })();

  return (
    <Layout>
      <EnhancedSeoHead 
        pageType="category"
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords.join(', ')}
        canonical={`https://langar.co/category/${category}`}
        breadcrumbs={[
          { name: 'لنگر', url: 'https://langar.co/' },
          { name: categoryName, url: `https://langar.co/category/${category}` }
        ]}
      />

      <div className="mb-6 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{categoryName}</h1>
            <SocialShare 
              url={`https://langar.co/category/${category}`}
              title={seoTitle}
              description={seoDescription}
              size="sm"
            />
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">{allTools.length} ابزار در این دسته‌بندی</p>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
            {category === 'readings'
              ? 'ابزارهای رایگان فال و طالع‌بینی: فال حافظ، فال تاروت، طالع‌بینی روزانه، استخاره با مولانا، تعبیر خواب و موارد دیگر برای سرگرمی و خودشناسی.'
              : `مجموعه‌ای از ابزارهای ${categoryName} برای انجام سریع و آسان کارهای روزمره شما در لنگر.`}
          </p>
        </div>
      </div>

      <div className="mb-6 relative max-w-md mx-auto w-full">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در این دسته..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-10 pl-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
          dir="rtl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 animate-fade-in">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 mb-2">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
            <p className="text-gray-500">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
          </div>
        )}
      </div>

      {/* Enhanced SEO Content */}
      <CategorySeoContent 
        categoryName={categoryName}
        categorySlug={category}
        toolCount={allTools.length}
        relatedTools={allTools.slice(0, 8).map(tool => ({ name: tool.name, slug: tool.slug }))}
      />
    </Layout>
  );
};

export default Category;
