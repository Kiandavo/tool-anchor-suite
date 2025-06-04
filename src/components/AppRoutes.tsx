
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Suspense, lazy, memo } from "react";
import { AppleLoading } from "@/components/ui/apple-loading";

// Optimized loading component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <AppleLoading text="در حال بارگذاری صفحه..." />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Optimized dynamic imports with better chunk names
const Index = lazy(() => import("@/pages/index"));
const Category = lazy(() => import("@/pages/Category"));
const Tool = lazy(() => import("@/pages/Tool"));
const Search = lazy(() => import("@/pages/Search"));
const AllTools = lazy(() => import("@/pages/AllTools"));
const Settings = lazy(() => import("@/pages/Settings"));
const Community = lazy(() => import("@/pages/Community"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Memoized scroll to top component
const ScrollToTop = memo(() => {
  useScrollToTop();
  return null;
});

ScrollToTop.displayName = 'ScrollToTop';

export const AppRoutes = memo(() => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/tool/:slug" element={<Tool />} />
          <Route path="/search" element={<Search />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
});

AppRoutes.displayName = 'AppRoutes';
