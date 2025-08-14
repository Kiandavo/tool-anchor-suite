
import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ToolsSection } from '@/components/home/ToolsSection';
import { ProfessionalToolsSection } from '@/components/home/ProfessionalToolsSection';
import { PersianCulturalSection } from '@/components/home/PersianCulturalSection';
import { ReadingsSection } from '@/components/home/ReadingsSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { SeoHead } from '@/components/seo/SeoHead';
import { generateWebsiteSchema, generateFAQSchema, combineSchemas } from '@/utils/schemaUtils';

const Index = () => {
  // Enhanced SEO data for homepage
  const homeTitle = "ابزارهای آنلاین رایگان | محاسبه‌گر، تبدیل متن، ویرایش تصویر - لنگر";
  const homeDescription = "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو، فال و طالع‌بینی. بهترین ابزارهای آنلاین ایرانی با طراحی مدرن و کاربری آسان.";
  const homeKeywords = "ابزار آنلاین, محاسبه گر آنلاین, تبدیل متن, ویرایش تصویر, سئو, فال آنلاین, ابزار فارسی, لنگر, محاسبه بیمه, تبدیل واحد, طالع بینی, ایرانی, رایگان";

  // Common FAQ for homepage
  const homeFAQ = [
    {
      question: "آیا ابزارهای لنگر رایگان هستند؟",
      answer: "بله، تمام ابزارهای لنگر کاملاً رایگان هستند و نیازی به ثبت نام یا پرداخت ندارند."
    },
    {
      question: "آیا ابزارها روی موبایل کار می‌کنند؟",
      answer: "بله، تمام ابزارهای لنگر طراحی ریسپانسیو دارند و روی موبایل، تبلت و دسکتاپ عالی کار می‌کنند."
    },
    {
      question: "چند ابزار در لنگر موجود است؟",
      answer: "لنگر بیش از ۱۰۰ ابزار آنلاین مختلف در زمینه‌های محاسبات، متن، تصویر، سئو و فرهنگ ایرانی ارائه می‌دهد."
    },
    {
      question: "آیا اطلاعات من در لنگر ذخیره می‌شود؟",
      answer: "خیر، تمام محاسبات در مرورگر شما انجام می‌شود و هیچ اطلاعاتی در سرورهای ما ذخیره نمی‌شود."
    }
  ];

  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQSchema(homeFAQ);
  const combinedSchema = combineSchemas(websiteSchema, faqSchema);

  return (
    <Layout>
      <SeoHead 
        title={homeTitle}
        description={homeDescription}
        keywords={homeKeywords}
        schema={combinedSchema}
        canonical="https://langar.co/"
      />
      
      <HeroSection />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px] space-y-16 sm:space-y-24">
        <div id="popular-tools">
          <ToolsSection />
        </div>
        <ProfessionalToolsSection />
        <PersianCulturalSection />
        <ReadingsSection />
        <CategoriesSection />
      </div>
    </Layout>
  );
};

export default Index;
