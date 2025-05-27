
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EnhancedLoading } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load non-critical components only
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

// Minimal loading fallback for non-critical components
const MinimalLoading = memo(() => (
  <div className="flex items-center justify-center p-2">
    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
));

MinimalLoading.displayName = 'MinimalLoading';

// Main App component with improved error handling
const App = () => {
  useEffect(() => {
    console.log('App component mounted successfully');
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeHandler />
            
            {/* Load non-critical components asynchronously with minimal loading */}
            <Suspense fallback={<MinimalLoading />}>
              <ErrorBoundary>
                <Toaster />
                <Sonner />
                <GoogleAnalytics />
              </ErrorBoundary>
            </Suspense>
            
            {/* Main app routes - homepage loads synchronously now */}
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default memo(App);
