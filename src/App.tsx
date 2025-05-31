
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load toast components
const Toaster = lazy(() => 
  import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster }))
);

const Sonner = lazy(() => 
  import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster }))
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

// Simple loading component
const SimpleLoading = memo(() => (
  <div className="flex items-center justify-center p-8 min-h-screen bg-white">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
));

SimpleLoading.displayName = 'SimpleLoading';

const App = () => {
  useEffect(() => {
    console.log('App component mounted - initializing...');
    
    // Force light theme immediately
    document.documentElement.classList.remove('dark');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
    
    console.log('App initialized successfully');
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
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
