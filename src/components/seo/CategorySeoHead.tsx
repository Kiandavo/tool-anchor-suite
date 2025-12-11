import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolCategory, categoryLabels, tools } from '@/data/tools';
import { generateCategorySchema, generateBreadcrumbSchema, combineSchemas } from '@/utils/schemaUtils';

interface CategorySeoHeadProps {
  category: ToolCategory;
  slug: string;
}

// Category-specific SEO content
const categorySeoData: Record<ToolCategory, { 
  titleTemplate: string;
  description: string;
  keywords: string[];
}> = {
  calculators: {
    titleTemplate: 'محاسبه‌گرهای آنلاین رایگان | BMI، درصد، وام و بیشتر',
    description: 'مجموعه کامل محاسبه‌گرهای آنلاین رایگان: BMI، درصد، وام، تبدیل واحد، سن و موارد دیگر. دقیق، سریع و بدون ثبت‌نام.',
    keywords: ['محاسبه‌گر آنلاین', 'محاسبه BMI', 'محاسبه درصد', 'محاسبه وام', 'تبدیل واحد'],
  },
  text: {
    titleTemplate: 'ابزارهای متنی آنلاین | شمارنده، تبدیل و فرمت متن',
    description: 'ابزارهای متنی آنلاین رایگان: شمارنده کاراکتر، تبدیل حروف، کدگذاری Base64، فرمت JSON و بیشتر.',
    keywords: ['ابزار متنی', 'شمارنده کاراکتر', 'تبدیل متن', 'Base64', 'فرمت JSON'],
  },
  image: {
    titleTemplate: 'ابزارهای تصویر آنلاین | فشرده‌سازی، تغییر سایز و تبدیل',
    description: 'ابزارهای ویرایش تصویر آنلاین رایگان: فشرده‌سازی، تغییر سایز، تبدیل فرمت، برش و بهینه‌سازی عکس.',
    keywords: ['فشرده‌سازی تصویر', 'تغییر سایز عکس', 'تبدیل فرمت', 'ویرایش تصویر آنلاین'],
  },
  'persian-cultural': {
    titleTemplate: 'ابزارهای فرهنگ فارسی | تقویم، تاریخ و نام ایرانی',
    description: 'ابزارهای فرهنگ فارسی: تقویم شمسی، تبدیل تاریخ، معانی نام‌های ایرانی، شعر و ادبیات فارسی.',
    keywords: ['تقویم شمسی', 'تبدیل تاریخ', 'نام ایرانی', 'فرهنگ فارسی'],
  },
  readings: {
    titleTemplate: 'فال و طالع‌بینی آنلاین | حافظ، تاروت، استخاره',
    description: 'فال و طالع‌بینی آنلاین رایگان: فال حافظ، فال تاروت، استخاره مولانا، طالع‌بینی روزانه و تعبیر خواب.',
    keywords: ['فال حافظ', 'فال تاروت', 'استخاره', 'طالع‌بینی', 'تعبیر خواب'],
  },
  seo: {
    titleTemplate: 'ابزارهای سئو آنلاین | متا تگ، کلمات کلیدی و آنالیز',
    description: 'ابزارهای سئو و وبمستری: تولید متا تگ، تراکم کلمات کلیدی، robots.txt، sitemap و آنالیز وب.',
    keywords: ['ابزار سئو', 'متا تگ', 'کلمات کلیدی', 'robots.txt', 'آنالیز سئو'],
  },
  random: {
    titleTemplate: 'ابزارهای تصادفی آنلاین | رمز عبور، QR کد و انتخاب',
    description: 'ابزارهای تصادفی آنلاین: تولید رمز عبور امن، ساخت QR کد، انتخاب تصادفی و موارد دیگر.',
    keywords: ['تولید رمز عبور', 'QR کد', 'انتخاب تصادفی', 'ابزار تصادفی'],
  },
  number: {
    titleTemplate: 'ابزارهای عددی آنلاین | تبدیل، محاسبه و فرمت',
    description: 'ابزارهای عددی آنلاین: تبدیل واحد، محاسبات ریاضی، تبدیل پایه عددی و موارد دیگر.',
    keywords: ['تبدیل واحد', 'محاسبات ریاضی', 'تبدیل عدد', 'ابزار عددی'],
  },
  educational: {
    titleTemplate: 'ابزارهای آموزشی آنلاین | یادگیری و آزمون',
    description: 'ابزارهای آموزشی آنلاین: یادگیری زبان، آزمون و تست، محتوای آموزشی تعاملی.',
    keywords: ['آموزش آنلاین', 'یادگیری', 'آزمون', 'ابزار آموزشی'],
  },
  productivity: {
    titleTemplate: 'ابزارهای بهره‌وری آنلاین | زمان، یادداشت و برنامه‌ریزی',
    description: 'ابزارهای بهره‌وری آنلاین: مدیریت زمان، یادداشت‌برداری، برنامه‌ریزی و موارد دیگر.',
    keywords: ['مدیریت زمان', 'یادداشت', 'برنامه‌ریزی', 'بهره‌وری'],
  },
  design: {
    titleTemplate: 'ابزارهای طراحی آنلاین | رنگ، گرادیانت و فونت',
    description: 'ابزارهای طراحی آنلاین: پالت رنگ، گرادیانت ساز، انتخاب فونت و موارد دیگر.',
    keywords: ['پالت رنگ', 'گرادیانت', 'فونت', 'ابزار طراحی'],
  },
};

export const CategorySeoHead: React.FC<CategorySeoHeadProps> = ({ category, slug }) => {
  const categoryName = categoryLabels[category];
  const seoData = categorySeoData[category];
  const baseUrl = 'https://laangar.com';
  const categoryUrl = `${baseUrl}/${slug}`;
  const categoryTools = tools.filter(t => t.category === category);
  
  const title = `${seoData.titleTemplate} | لنگر`;
  const description = seoData.description;
  const keywords = [...seoData.keywords, 'ابزار آنلاین رایگان', 'لنگر'].join(', ');

  // Generate schemas
  const categorySchema = generateCategorySchema(
    categoryName,
    description,
    slug,
    categoryTools.map(t => ({ name: t.name, slug: t.slug, description: t.description }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'لنگر', url: baseUrl },
    { name: categoryName, url: categoryUrl },
  ]);

  const combinedSchema = combineSchemas(categorySchema, breadcrumbSchema);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={categoryUrl} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="fa-IR" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={categoryUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="لنگر - ابزارهای آنلاین" />
      <meta property="og:locale" content="fa_IR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Structured Data */}
      {combinedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      )}
    </Helmet>
  );
};
