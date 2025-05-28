
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
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

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

// Enhanced theme handler component - force light mode
const ThemeHandler = memo(() => {
  useEffect(() => {
    const applyLightTheme = () => {
      try {
        console.log('Applying light theme...');
        
        // Force light theme
        document.documentElement.classList.remove('dark');
        document.body.classList.add('bg-white');
        
        // Set theme in localStorage
        localStorage.setItem('theme', 'light');
        
        console.log('Light theme applied successfully');
      } catch (error) {
        console.warn('Theme application failed:', error);
      }
    };

    // Apply immediately
    applyLightTheme();
    
    // Listen for system theme changes but always override to light
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyLightTheme();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return null;
});

ThemeHandler.displayName = 'ThemeHandler';

// Minimal loading fallback with light theme
const MinimalLoading = memo(() => (
  <div className="flex items-center justify-center p-4 min-h-screen bg-white">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
));

MinimalLoading.displayName = 'MinimalLoading';

// Main App component with enhanced error handling and light theme
const App = () => {
  useEffect(() => {
    console.log('App component mounted successfully');
    
    // Force light theme on app start
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    
    // Add global error handler
    const handleError = (error: ErrorEvent) => {
      console.error('Global error caught:', error);
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <ThemeHandler />
              
              {/* Load non-critical components asynchronously */}
              <Suspense fallback={<MinimalLoading />}>
                <ErrorBoundary>
                  <Toaster />
                  <Sonner />
                </ErrorBoundary>
              </Suspense>
              
              {/* Main app routes */}
              <AppRoutes />
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </div>
  );
};

export default memo(App);
