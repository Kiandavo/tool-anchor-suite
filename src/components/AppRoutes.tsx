import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Suspense, lazy, memo } from "react";
import { EnhancedLoading } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "@/pages/index"; // Import synchronously instead of lazy loading

// Loading component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <EnhancedLoading text="در حال بارگذاری صفحه..." />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Dynamic imports with proper error handling - keep other pages lazy
const Category = lazy(() => import("@/pages/Category").catch(() => import("@/pages/NotFound")));
const Tool = lazy(() => import("@/pages/Tool").catch(() => import("@/pages/NotFound")));
const Search = lazy(() => import("@/pages/Search").catch(() => import("@/pages/NotFound")));
const AllTools = lazy(() => import("@/pages/AllTools").catch(() => import("@/pages/NotFound")));
const Settings = lazy(() => import("@/pages/Settings").catch(() => import("@/pages/NotFound")));
const Community = lazy(() => import("@/pages/Community").catch(() => import("@/pages/NotFound")));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AllTemplates = lazy(() => import("@/pages/AllTemplates").catch(() => import("@/pages/NotFound")));
const TemplateCategory = lazy(() => import("@/pages/TemplateCategory").catch(() => import("@/pages/NotFound")));
const Template = lazy(() => import("@/pages/Template").catch(() => import("@/pages/NotFound")));

// Scroll to top component
const ScrollToTop = memo(() => {
  useScrollToTop();
  return null;
});

ScrollToTop.displayName = 'ScrollToTop';

export const AppRoutes = memo(() => {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          {/* Homepage loads synchronously - no Suspense wrapper */}
          <Route path="/" element={<Index />} />
          
          {/* Other routes remain lazy-loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/tool/:slug" element={<Tool />} />
            <Route path="/search" element={<Search />} />
            <Route path="/all-tools" element={<AllTools />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/community" element={<Community />} />
            <Route path="/all-templates" element={<AllTemplates />} />
            <Route path="/template-category/:categoryId" element={<TemplateCategory />} />
            <Route path="/template/:slug" element={<Template />} />
            <Route path="*" element={<NotFound />} />
          </Suspense>
        </Routes>
      </ErrorBoundary>
    </>
  );
});

AppRoutes.displayName = 'AppRoutes';
