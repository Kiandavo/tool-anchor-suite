
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FalSection } from '@/components/fal/FalSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema } from '@/utils/schemaUtils';

const Index = () => {
  // Generate homepage schema
  const homeSchema = generateWebsiteSchema();
  
  return (
    <Layout>
      <SeoHead 
        title="لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools"
        description="مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم."
        keywords="ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, ابزارهای رایگان, langar, لنگر"
        schema={homeSchema}
      />
      <GoogleAnalytics />
      <HeroSection />
      <FalSection />
      <CategoriesSection />
      <PersianCulturalSection />
      <ToolsSection />
    </Layout>
  );
};

export default Index;
