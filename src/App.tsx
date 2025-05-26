
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EnhancedLoading } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load components with error fallbacks
const Toaster = lazy(() => 
  import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster }))
  .catch(() => ({ default: () => null }))
);

const Sonner = lazy(() => 
  import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster }))
  .catch(() => ({ default: () => null }))
);

const GoogleAnalytics = lazy(() => 
  import("@/components/analytics/GoogleAnalytics").then(mod => ({ default: mod.GoogleAnalytics }))
  .catch(() => ({ default: () => null }))
);

// Optimized QueryClient with better defaults
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

// Theme handler component
const ThemeHandler = memo(() => {
  useEffect(() => {
    const applyTheme = () => {
      try {
        const theme = localStorage.getItem('theme') || 'system';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        document.documentElement.classList.toggle('dark', 
          theme === 'dark' || (theme === 'system' && systemPrefersDark)
        );
      } catch (error) {
        console.warn('Theme application failed:', error);
      }
    };

    applyTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  return null;
});

ThemeHandler.displayName = 'ThemeHandler';

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <EnhancedLoading variant="fullscreen" text="در حال بارگذاری..." />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

// Main App component
const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeHandler />
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <Toaster />
                <Sonner />
                <GoogleAnalytics />
              </ErrorBoundary>
            </Suspense>
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default memo(App);
