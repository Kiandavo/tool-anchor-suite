
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppleLoading } from "@/components/ui/apple-loading";

// Lazy load non-critical components with better chunking
const Toaster = lazy(() => import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster })));
const GoogleAnalytics = lazy(() => import("@/components/analytics/GoogleAnalytics").then(mod => ({ default: mod.GoogleAnalytics })));

// Optimized QueryClient with better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes  
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

// Memoized theme handler for performance
const ThemeHandler = memo(() => {
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem('theme') || 'system';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      document.documentElement.classList.toggle('dark', 
        theme === 'dark' || (theme === 'system' && systemPrefersDark)
      );
    };

    applyTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  return null;
});

ThemeHandler.displayName = 'ThemeHandler';

// Optimized loading fallback
const LoadingFallback = memo(() => (
  <AppleLoading variant="fullscreen" text="در حال بارگذاری..." />
));

LoadingFallback.displayName = 'LoadingFallback';

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeHandler />
          <Suspense fallback={<LoadingFallback />}>
            <Toaster />
            <Sonner />
            <GoogleAnalytics />
          </Suspense>
          <AppRoutes />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default memo(App);
