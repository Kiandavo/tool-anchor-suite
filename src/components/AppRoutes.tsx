
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Suspense, lazy, memo } from "react";
import { EnhancedLoading } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "@/pages/index";

// Loading component
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <EnhancedLoading text="در حال بارگذاری صفحه..." />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Dynamic imports with proper error handling
const Category = lazy(() => import("@/pages/Category"));
const Tool = lazy(() => import("@/pages/Tool"));
const Search = lazy(() => import("@/pages/Search"));
const AllTools = lazy(() => import("@/pages/AllTools"));
const Settings = lazy(() => import("@/pages/Settings"));
const Community = lazy(() => import("@/pages/Community"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AllTemplates = lazy(() => import("@/pages/AllTemplates"));
const TemplateCategory = lazy(() => import("@/pages/TemplateCategory"));
const Template = lazy(() => import("@/pages/Template"));

// Scroll to top component
const ScrollToTop = memo(() => {
  useScrollToTop();
  return null;
});

ScrollToTop.displayName = 'ScrollToTop';

export const AppRoutes = memo(() => {
  console.log('AppRoutes rendering...');
  
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={
            <Suspense fallback={<LoadingFallback />}>
              <Category />
            </Suspense>
          } />
          <Route path="/tool/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <Tool />
            </Suspense>
          } />
          <Route path="/search" element={
            <Suspense fallback={<LoadingFallback />}>
              <Search />
            </Suspense>
          } />
          <Route path="/all-tools" element={
            <Suspense fallback={<LoadingFallback />}>
              <AllTools />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<LoadingFallback />}>
              <Settings />
            </Suspense>
          } />
          <Route path="/community" element={
            <Suspense fallback={<LoadingFallback />}>
              <Community />
            </Suspense>
          } />
          <Route path="/all-templates" element={
            <Suspense fallback={<LoadingFallback />}>
              <AllTemplates />
            </Suspense>
          } />
          <Route path="/template-category/:categoryId" element={
            <Suspense fallback={<LoadingFallback />}>
              <TemplateCategory />
            </Suspense>
          } />
          <Route path="/template/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <Template />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </ErrorBoundary>
    </>
  );
});

AppRoutes.displayName = 'AppRoutes';
