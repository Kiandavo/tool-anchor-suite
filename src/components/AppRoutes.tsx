import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import Index from "@/pages/index";

// Lazy load all non-critical routes
const Category = lazy(() => import("@/pages/Category"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
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
const CollectionPage = lazy(() => import("@/pages/CollectionPage"));
const CollectionsIndex = lazy(() => import("@/pages/CollectionsIndex"));

const RouteLoader = () => (
  <div className="min-h-[60vh] py-8">
    <div className="container-narrow space-y-8">
      {/* Page header skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-10 w-1/2 max-w-xs bg-muted rounded-md animate-pulse" />
        <div className="h-5 w-3/4 max-w-md bg-muted rounded-md animate-pulse" />
      </div>
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-1/3 bg-muted rounded-md animate-pulse" />
        <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
        <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse" />
      </div>
      {/* Grid skeleton */}
      <div className="pt-4">
        <div className="h-6 w-32 mb-4 bg-muted rounded-md animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-lg bg-muted animate-pulse flex-shrink-0" />
              <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Helper to wrap page components with transition
const withTransition = (Component: React.ComponentType<any>, props?: any) => (
  <PageTransition>
    <Component {...props} />
  </PageTransition>
);

export const AppRoutes = () => {
  const location = useLocation();
  useScrollToTop();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteLoader />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={withTransition(Index)} />
          
          {/* New clean category URLs */}
          <Route path="/calculators" element={withTransition(CategoryPage, { categorySlug: "calculators" })} />
          <Route path="/text-tools" element={withTransition(CategoryPage, { categorySlug: "text-tools" })} />
          <Route path="/image-tools" element={withTransition(CategoryPage, { categorySlug: "image-tools" })} />
          <Route path="/persian-tools" element={withTransition(CategoryPage, { categorySlug: "persian-tools" })} />
          <Route path="/readings" element={withTransition(CategoryPage, { categorySlug: "readings" })} />
          <Route path="/seo-tools" element={withTransition(CategoryPage, { categorySlug: "seo-tools" })} />
          <Route path="/random-tools" element={withTransition(CategoryPage, { categorySlug: "random-tools" })} />
          <Route path="/number-tools" element={withTransition(CategoryPage, { categorySlug: "number-tools" })} />
          <Route path="/educational-tools" element={withTransition(CategoryPage, { categorySlug: "educational-tools" })} />
          <Route path="/productivity-tools" element={withTransition(CategoryPage, { categorySlug: "productivity-tools" })} />
          <Route path="/design-tools" element={withTransition(CategoryPage, { categorySlug: "design-tools" })} />
          
          {/* Persian URL aliases for categories */}
          <Route path="/محاسبه‌گرها" element={withTransition(CategoryPage, { categorySlug: "calculators" })} />
          <Route path="/ابزار-متنی" element={withTransition(CategoryPage, { categorySlug: "text-tools" })} />
          <Route path="/ابزار-تصویر" element={withTransition(CategoryPage, { categorySlug: "image-tools" })} />
          <Route path="/فرهنگ-فارسی" element={withTransition(CategoryPage, { categorySlug: "persian-tools" })} />
          <Route path="/فال-طالع‌بینی" element={withTransition(CategoryPage, { categorySlug: "readings" })} />
          <Route path="/fortune-telling" element={withTransition(CategoryPage, { categorySlug: "readings" })} />
          
          {/* Legacy category routes (backwards compatibility) */}
          <Route path="/category/:categoryId" element={<PageTransition><Category /></PageTransition>} />
          
          <Route path="/tool/:slug" element={<PageTransition><Tool /></PageTransition>} />
          <Route path="/all-tools" element={withTransition(AllTools)} />
          <Route path="/settings" element={withTransition(Settings)} />
          <Route path="/about" element={withTransition(AboutUs)} />
          <Route path="/درباره-ما" element={withTransition(AboutUs)} />
          <Route path="/faq" element={withTransition(FAQEnhanced)} />
          <Route path="/سوالات-متداول" element={withTransition(FAQEnhanced)} />
          <Route path="/blog" element={withTransition(Blog)} />
          <Route path="/وبلاگ" element={withTransition(Blog)} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/وبلاگ/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/guides/calculators" element={withTransition(CalculatorsGuide)} />
          <Route path="/راهنما/محاسبه‌گرها" element={withTransition(CalculatorsGuide)} />
          <Route path="/press-kit" element={withTransition(PressKit)} />
          <Route path="/کیت-رسانه‌ای" element={withTransition(PressKit)} />
          <Route path="/resources" element={withTransition(Resources)} />
          <Route path="/منابع" element={withTransition(Resources)} />
          <Route path="/widgets" element={withTransition(WidgetsPage)} />
          <Route path="/ویجت" element={withTransition(WidgetsPage)} />
          <Route path="/bookmarks" element={withTransition(Bookmarks)} />
          <Route path="/نشان-شده-ها" element={withTransition(Bookmarks)} />
          <Route path="/compare" element={withTransition(ToolComparison)} />
          <Route path="/مقایسه" element={withTransition(ToolComparison)} />
          <Route path="/astrology-guide" element={withTransition(AstrologyGuide)} />
          <Route path="/راهنمای-طالع‌بینی" element={withTransition(AstrologyGuide)} />
          <Route path="/horoscope-forecasts" element={withTransition(HoroscopeForecasts)} />
          <Route path="/horoscope-forecasts/:sign/:period" element={<PageTransition><HoroscopeForecasts /></PageTransition>} />
          <Route path="/طالع-روزانه" element={withTransition(HoroscopeForecasts)} />
          <Route path="/astrology-quiz" element={withTransition(AstrologyQuiz)} />
          <Route path="/astrology-quiz/:category" element={<PageTransition><AstrologyQuiz /></PageTransition>} />
          <Route path="/آزمون-طالع‌بینی" element={withTransition(AstrologyQuiz)} />
          <Route path="/persian-date-events" element={withTransition(PersianDateEvents)} />
          <Route path="/رویدادهای-تاریخی" element={withTransition(PersianDateEvents)} />
          <Route path="/privacy-policy" element={withTransition(PrivacyPolicy)} />
          <Route path="/terms-of-service" element={withTransition(TermsOfService)} />
          <Route path="/seo-audit" element={withTransition(SeoAudit)} />
          <Route path="/ممیزی-سئو" element={withTransition(SeoAudit)} />
          <Route path="/performance" element={withTransition(PerformanceDashboard)} />
          <Route path="/عملکرد" element={withTransition(PerformanceDashboard)} />
          
          {/* Collection pages */}
          <Route path="/collections" element={withTransition(CollectionsIndex)} />
          <Route path="/مجموعه‌ها" element={withTransition(CollectionsIndex)} />
          <Route path="/collection/:slug" element={<PageTransition><CollectionPage /></PageTransition>} />
          <Route path="/مجموعه/:slug" element={<PageTransition><CollectionPage /></PageTransition>} />
          
          <Route path="*" element={withTransition(NotFound)} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
