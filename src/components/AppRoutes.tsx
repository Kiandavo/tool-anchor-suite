
import { Routes, Route, useLocation } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Suspense, lazy } from "react";

// Better loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <div className="relative h-16 w-16">
      <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-primary/20 rounded-full"></div>
      <svg className="animate-spin h-12 w-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
);

// Lazy load components with correct file names with exact casing
const Index = lazy(() => import("@/pages/index"));
const Category = lazy(() => import("@/pages/Category"));
const Tool = lazy(() => import("@/pages/Tool"));
const Search = lazy(() => import("@/pages/Search"));
const AllTools = lazy(() => import("@/pages/AllTools"));
const Settings = lazy(() => import("@/pages/Settings"));
const Community = lazy(() => import("@/pages/Community"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const AppRoutes = () => {
  const ScrollToTop = () => {
    useScrollToTop();
    return null;
  };

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
};
