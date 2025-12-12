import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { ModernHeroSection } from '@/components/home/ModernHeroSection';
import { GlobalSearchBar } from '@/components/home/GlobalSearchBar';
import { TopToolsSection } from '@/components/home/TopToolsSection';
import { NewToolsSection } from '@/components/home/NewToolsSection';
import { RecentlyUsedSection } from '@/components/home/RecentlyUsedSection';
import { CategoryPreviewSection } from '@/components/home/CategoryPreviewSection';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { generateEnhancedWebsiteSchema, generateFAQSchema, generateEnhancedOrganizationSchema, generateLocalBusinessSchema, combineSchemas } from '@/utils/schemaUtils';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { SectionDecorator } from '@/components/home/SectionDecorator';
import { ScrollReveal } from '@/components/home/ScrollReveal';

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

      {/* 1. Hero - Modern design with patterns */}
      <ModernHeroSection />

      {/* 2. Visible Search Bar with label */}
      <ScrollReveal delay={0.1}>
        <GlobalSearchBar />
      </ScrollReveal>

      {/* 3. Recently Used (only shows if user has history) */}
      <ScrollReveal delay={0.15}>
        <RecentlyUsedSection maxItems={5} />
      </ScrollReveal>

      {/* 4. Popular tools this week */}
      <ScrollReveal delay={0.1}>
        <TopToolsSection />
      </ScrollReveal>

      {/* 5. New tools */}
      <ScrollReveal delay={0.1}>
        <NewToolsSection />
      </ScrollReveal>

      {/* 6. Category previews (3-4 tools per category) */}
      <ScrollReveal delay={0.1}>
        <CategoryPreviewSection />
      </ScrollReveal>

      {/* 7. Curated collections */}
      <ScrollReveal delay={0.1}>
        <CollectionsSection />
      </ScrollReveal>

      {/* 8. Footer CTA */}
      <ScrollReveal delay={0.1}>
        <section className="relative py-12 text-center border-t border-border/50 bg-gradient-to-br from-primary/5 via-muted/30 to-persian-gold/5 overflow-hidden">
          {/* Decorative elements */}
          <SectionDecorator variant="stars" position="both" opacity={0.12} />
          
          {/* Floating orbs */}
          <div className="absolute top-6 left-[10%] w-28 h-28 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl animate-float pointer-events-none" />
          <div className="absolute bottom-4 right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-persian-gold/10 to-transparent blur-2xl animate-float pointer-events-none" style={{ animationDelay: '-2s' }} />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              کاوش بیشتر
            </div>
            <p className="text-muted-foreground mb-5">
              می‌خواهید همه ابزارها را ببینید؟
            </p>
            <Link 
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              مشاهده همه +۱۰۰ ابزار
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </Layout>
  );
};

export default Index;
