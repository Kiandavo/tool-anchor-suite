
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { ProfessionalToolsSection } from '@/components/home/ProfessionalToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { ReadingsSection } from '@/components/home/ReadingsSection';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema, combineSchemas } from '@/utils/schemaUtils';

const Index = () => {
  // Generate comprehensive SEO data for homepage
  const websiteSchema = generateWebsiteSchema();
  
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "لنگر - ابزارهای آنلاین رایگان",
    "description": "بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما",
    "url": "https://langar.co/",
    "mainEntity": {
      "@type": "ItemList",
      "name": "ابزارهای آنلاین لنگر",
      "description": "مجموعه کامل ابزارهای آنلاین شامل محاسبه‌گر، ابزارهای متنی، تصویری، فرهنگ فارسی و طالع‌بینی",
      "numberOfItems": "120+"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "صفحه اصلی",
        "item": "https://langar.co/"
      }]
    }
  };

  const combinedSchema = combineSchemas(websiteSchema, homepageSchema);

  return (
    <Layout>
      <SeoHead 
        title="لنگر - ابزارهای آنلاین رایگان | بیش از ۱۲۰ ابزار کاربردی"
        description="بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. شامل محاسبه‌گر، ابزارهای متنی، تصویری، فرهنگ فارسی و طالع‌بینی."
        keywords="ابزار آنلاین, لنگر, محاسبه‌گر, ابزار متنی, ابزار تصویری, فرهنگ فارسی, طالع‌بینی, ابزار رایگان, Langar Tools"
        schema={combinedSchema}
      />
      
      <HeroSection />
      <div className="container mx-auto px-4 space-y-8">
        <div id="popular-tools">
          <ToolsSection />
        </div>
        <ProfessionalToolsSection />
        <PersianCulturalSection />
        <ReadingsSection />
      </div>
    </Layout>
  );
};

export default Index;
