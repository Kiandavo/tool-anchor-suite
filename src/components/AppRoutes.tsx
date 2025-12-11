import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "@/pages/index";

// Lazy load all non-critical routes
const Category = lazy(() => import("@/pages/Category"));
const Tool = lazy(() => import("@/pages/Tool"));
const AllTools = lazy(() => import("@/pages/AllTools"));
const Settings = lazy(() => import("@/pages/Settings"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const FAQEnhanced = lazy(() => import("@/pages/FAQEnhanced"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CalculatorsGuide = lazy(() => import("@/pages/guides/CalculatorsGuide"));
const PressKit = lazy(() => import("@/pages/PressKit"));
const Resources = lazy(() => import("@/pages/Resources"));
const WidgetsPage = lazy(() => import("@/pages/WidgetsPage"));
const Bookmarks = lazy(() => import("@/pages/Bookmarks"));
const ToolComparison = lazy(() => import("@/pages/ToolComparison"));
const AstrologyGuide = lazy(() => import("@/pages/AstrologyGuide"));
const HoroscopeForecasts = lazy(() => import("@/pages/HoroscopeForecasts"));
const AstrologyQuiz = lazy(() => import("@/pages/AstrologyQuiz"));
const PersianDateEvents = lazy(() => import("@/pages/ToolTypes/PersianCultural/PersianDateEvents"));
const SeoAudit = lazy(() => import("@/pages/SeoAudit"));
const PerformanceDashboard = lazy(() => import("@/pages/PerformanceDashboard"));

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">در حال بارگذاری...</p>
    </div>
  </div>
);

export const AppRoutes = () => {
  console.log('AppRoutes component loading...');
  useScrollToTop();
  
  console.log('AppRoutes rendering routes...');
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/tool/:slug" element={<Tool />} />
        <Route path="/all-tools" element={<AllTools />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/درباره-ما" element={<AboutUs />} />
        <Route path="/faq" element={<FAQEnhanced />} />
        <Route path="/سوالات-متداول" element={<FAQEnhanced />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/وبلاگ" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/وبلاگ/:slug" element={<BlogPost />} />
        <Route path="/guides/calculators" element={<CalculatorsGuide />} />
        <Route path="/راهنما/محاسبه‌گرها" element={<CalculatorsGuide />} />
        <Route path="/press-kit" element={<PressKit />} />
        <Route path="/کیت-رسانه‌ای" element={<PressKit />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/منابع" element={<Resources />} />
        <Route path="/widgets" element={<WidgetsPage />} />
        <Route path="/ویجت" element={<WidgetsPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/نشان-شده-ها" element={<Bookmarks />} />
        <Route path="/compare" element={<ToolComparison />} />
        <Route path="/مقایسه" element={<ToolComparison />} />
        <Route path="/astrology-guide" element={<AstrologyGuide />} />
        <Route path="/راهنمای-طالع‌بینی" element={<AstrologyGuide />} />
        <Route path="/horoscope-forecasts" element={<HoroscopeForecasts />} />
        <Route path="/horoscope-forecasts/:sign/:period" element={<HoroscopeForecasts />} />
        <Route path="/طالع-روزانه" element={<HoroscopeForecasts />} />
        <Route path="/astrology-quiz" element={<AstrologyQuiz />} />
        <Route path="/astrology-quiz/:category" element={<AstrologyQuiz />} />
        <Route path="/آزمون-طالع‌بینی" element={<AstrologyQuiz />} />
        <Route path="/persian-date-events" element={<PersianDateEvents />} />
        <Route path="/رویدادهای-تاریخی" element={<PersianDateEvents />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/seo-audit" element={<SeoAudit />} />
        <Route path="/ممیزی-سئو" element={<SeoAudit />} />
        <Route path="/performance" element={<PerformanceDashboard />} />
        <Route path="/عملکرد" element={<PerformanceDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
