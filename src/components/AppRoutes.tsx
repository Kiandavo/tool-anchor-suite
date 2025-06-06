
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <div className="text-center">در حال بارگذاری...</div>
  </div>
);

const Index = lazy(() => import("@/pages/index"));
const Category = lazy(() => import("@/pages/Category"));
const Tool = lazy(() => import("@/pages/Tool"));
const Search = lazy(() => import("@/pages/Search"));
const AllTools = lazy(() => import("@/pages/AllTools"));
const Settings = lazy(() => import("@/pages/Settings"));
const Community = lazy(() => import("@/pages/Community"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const AppRoutes = () => {
  return (
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
  );
};
