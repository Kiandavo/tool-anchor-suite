import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tool, categoryLabels } from '@/data/tools';
import { generateToolSchema, generateBreadcrumbSchema, generateHowToSchema, combineSchemas } from '@/utils/schemaUtils';

interface ToolSeoHeadProps {
  tool: Tool;
  howToSteps?: { step: number; instruction: string }[];
}

// Category-specific keywords
const categoryKeywords: Record<string, string[]> = {
  calculators: ['محاسبه‌گر آنلاین', 'محاسبه رایگان', 'ابزار محاسباتی'],
  text: ['ابزار متنی آنلاین', 'پردازش متن', 'تبدیل متن فارسی'],
  image: ['ویرایش تصویر آنلاین', 'فشرده‌سازی عکس', 'ابزار تصویر'],
  'persian-cultural': ['فرهنگ فارسی', 'تقویم شمسی', 'ابزار ایرانی'],
  readings: ['فال آنلاین', 'طالع‌بینی رایگان', 'استخاره'],
  seo: ['ابزار سئو', 'بهینه‌سازی سایت', 'وبمستر'],
  random: ['تولید تصادفی', 'رمز ساز', 'QR کد'],
  number: ['تبدیل عدد', 'محاسبات ریاضی', 'ابزار عددی'],
  educational: ['آموزش آنلاین', 'یادگیری', 'آزمون'],
  productivity: ['بهره‌وری', 'مدیریت زمان', 'یادداشت'],
  design: ['طراحی آنلاین', 'پالت رنگ', 'ابزار گرافیک'],
};

export const ToolSeoHead: React.FC<ToolSeoHeadProps> = ({ tool, howToSteps }) => {
  const categoryName = categoryLabels[tool.category];
  const baseUrl = 'https://laangar.com';
  const toolUrl = `${baseUrl}/tool/${tool.slug}`;
  
  // Generate optimized title (under 60 chars)
  const title = `${tool.name} آنلاین رایگان | ${categoryName} | لنگر`;
  
  // Generate optimized description (under 160 chars)
  const description = `${tool.name} رایگان و آنلاین. ${tool.description.slice(0, 80)}. استفاده فوری بدون ثبت‌نام ✅`;
  
  // Combine keywords
  const keywords = [
    tool.name,
    `${tool.name} آنلاین`,
    `${tool.name} رایگان`,
    categoryName,
    ...(categoryKeywords[tool.category] || []),
    'ابزار آنلاین',
    'لنگر',
  ].join(', ');

  // Generate schemas
  const toolSchema = generateToolSchema(
    tool.name,
    tool.description,
    tool.slug,
    categoryName,
    keywords.split(', ')
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'لنگر', url: baseUrl },
    { name: categoryName, url: `${baseUrl}/category/${tool.category}` },
    { name: tool.name, url: toolUrl },
  ]);

  const howToSchema = howToSteps?.length
    ? generateHowToSchema(
        `نحوه استفاده از ${tool.name}`,
        `راهنمای گام به گام استفاده از ${tool.name} در لنگر`,
        howToSteps,
        'PT2M'
      )
    : null;

  const combinedSchema = combineSchemas(toolSchema, breadcrumbSchema, howToSchema);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={toolUrl} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="fa-IR" />
      <html lang="fa" dir="rtl" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={toolUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="لنگر - ابزارهای آنلاین" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:image" content={`${baseUrl}/assets/social-logo.jpg`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={toolUrl} />
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
