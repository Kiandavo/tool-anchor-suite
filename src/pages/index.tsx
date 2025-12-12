import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { FocusedHeroSection } from '@/components/home/FocusedHeroSection';
import { GlobalSearchBar } from '@/components/home/GlobalSearchBar';
import { TopToolsSection } from '@/components/home/TopToolsSection';
import { NewToolsSection } from '@/components/home/NewToolsSection';
import { RecentlyUsedSection } from '@/components/home/RecentlyUsedSection';
import { CategoryPreviewSection } from '@/components/home/CategoryPreviewSection';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { generateEnhancedWebsiteSchema, generateFAQSchema, generateEnhancedOrganizationSchema, generateLocalBusinessSchema, combineSchemas } from '@/utils/schemaUtils';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Lazy load non-critical UI components
const GeoTargeting = lazy(() => import('@/components/seo/GeoTargeting').then(m => ({ default: m.GeoTargeting })));
const OpenGraphTags = lazy(() => import('@/components/seo/OpenGraphTags').then(m => ({ default: m.OpenGraphTags })));
const BackToTop = lazy(() => import('@/components/ui/BackToTop').then(m => ({ default: m.BackToTop })));

const Index = () => {
  // SEO data
  const homeTitle = "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی | لنگر";
  const homeDescription = "بیش از ۱۰۰ ابزار آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصویر و سئو. همه ابزارها رایگان، بدون ثبت‌نام، سریع | لنگر";
  const homeKeywords = "ابزار آنلاین رایگان, محاسبه گر, تبدیل متن فارسی, ویرایش تصویر آنلاین, ابزار سئو, فال حافظ, فال تاروت, لنگر";

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

      {/* 1. Hero - H1 + trust badges */}
      <FocusedHeroSection />

      {/* 2. Visible Search Bar with label */}
      <GlobalSearchBar />

      {/* 3. Recently Used (only shows if user has history) */}
      <RecentlyUsedSection maxItems={5} />

      {/* 4. Popular tools this week */}
      <TopToolsSection />

      {/* 5. New tools */}
      <NewToolsSection />

      {/* 6. Category previews (3-4 tools per category) */}
      <CategoryPreviewSection />

      {/* 7. Curated collections */}
      <CollectionsSection />

      {/* 7. Footer CTA */}
      <section className="py-10 text-center border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground mb-4">
          می‌خواهید همه ابزارها را ببینید؟
        </p>
        <Link 
          to="/all-tools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          مشاهده همه +۱۰۰ ابزار
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </section>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </Layout>
  );
};

export default Index;
