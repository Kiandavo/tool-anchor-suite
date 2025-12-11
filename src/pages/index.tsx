import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { FocusedHeroSection } from '@/components/home/FocusedHeroSection';
import { TopToolsSection } from '@/components/home/TopToolsSection';
import { CategoryLinksSection } from '@/components/home/CategoryLinksSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { generateEnhancedWebsiteSchema, generateFAQSchema, generateEnhancedOrganizationSchema, generateLocalBusinessSchema, combineSchemas } from '@/utils/schemaUtils';

// Lazy load non-critical UI components
const GeoTargeting = lazy(() => import('@/components/seo/GeoTargeting').then(m => ({ default: m.GeoTargeting })));
const OpenGraphTags = lazy(() => import('@/components/seo/OpenGraphTags').then(m => ({ default: m.OpenGraphTags })));
const ScrollToTopButton = lazy(() => import('@/components/ui/ScrollToTopButton').then(m => ({ default: m.ScrollToTopButton })));
const BackToTop = lazy(() => import('@/components/ui/BackToTop').then(m => ({ default: m.BackToTop })));

const Index = () => {
  // SEO data
  const homeTitle = "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی | لنگر";
  const homeDescription = "بیش از ۱۰۰ ابزار آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. همه ابزارها رایگان، بدون ثبت‌نام، سریع | لنگر";
  const homeKeywords = "ابزار آنلاین رایگان, محاسبه گر, تبدیل متن فارسی, ویرایش تصویر آنلاین, ابزار سئو, فال حافظ, فال تاروت, لنگر";

  // FAQ for schema
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

  const websiteSchema = generateEnhancedWebsiteSchema();
  const organizationSchema = generateEnhancedOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(homeFAQ);
  const combinedSchema = combineSchemas(websiteSchema, organizationSchema, localBusinessSchema, faqSchema);

  return (
    <Layout>
      <EnhancedSeoHead 
        pageType="home"
        title={homeTitle}
        description={homeDescription}
        keywords={homeKeywords}
        canonical="https://laangar.com/"
        faq={homeFAQ}
      />
      
      {/* JSON-LD Structured Data */}
      {combinedSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(combinedSchema)}
          </script>
        </Helmet>
      )}
      
      <Suspense fallback={null}>
        <GeoTargeting 
          title={homeTitle}
          description={homeDescription}
          canonical="https://laangar.com/"
        />
        
        <OpenGraphTags
          title={homeTitle}
          description={homeDescription}
          url="https://laangar.com/"
          type="website"
          siteName="لنگر - ابزارهای آنلاین فارسی"
        />
      </Suspense>

      {/* 1. Hero Section */}
      <FocusedHeroSection />

      {/* 2. Top Tools This Week */}
      <TopToolsSection />

      {/* 3. Categories */}
      <CategoryLinksSection />

      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTop />
        <ScrollToTopButton />
      </Suspense>
    </Layout>
  );
};

export default Index;
