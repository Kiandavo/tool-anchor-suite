
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load only non-critical components
const Toaster = lazy(() => 
  import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster }))
  .catch(() => ({ default: () => null }))
);

const Sonner = lazy(() => 
  import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster }))
  .catch(() => ({ default: () => null }))
);

// Optimized QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Light theme enforcer
const ThemeHandler = memo(() => {
  useEffect(() => {
    console.log('Enforcing light theme...');
    
    // Force light theme immediately
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
    
    // Set theme in localStorage
    localStorage.setItem('theme', 'light');
    
    console.log('Light theme enforced successfully');
  }, []);

  return null;
});

ThemeHandler.displayName = 'ThemeHandler';

// Simple loading component
const SimpleLoading = memo(() => (
  <div className="flex items-center justify-center p-8 min-h-screen bg-white">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
));

SimpleLoading.displayName = 'SimpleLoading';

const App = () => {
  useEffect(() => {
    console.log('App component mounted - enforcing light theme');
    
    // Immediate theme enforcement
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <ThemeHandler />
              
              <Suspense fallback={<SimpleLoading />}>
                <ErrorBoundary>
                  <Toaster />
                  <Sonner />
                </ErrorBoundary>
              </Suspense>
              
              <AppRoutes />
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </div>
  );
};

export default memo(App);
