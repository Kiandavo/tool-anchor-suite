
import { Suspense, lazy, useEffect, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Simple loading component to avoid complex dependencies
const SimpleLoading = memo(() => (
  <div className="flex items-center justify-center p-8 min-h-screen bg-white">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <span className="mr-3 text-gray-600">در حال بارگذاری...</span>
  </div>
));

SimpleLoading.displayName = 'SimpleLoading';

// Optimized QueryClient with minimal config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    console.log('App component mounted');
    
    // Force light theme immediately and ensure proper styling
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('bg-white');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.direction = 'rtl';
    
    console.log('Light theme and RTL direction applied');
  }, []);

  return (
    <div className="bg-white min-h-screen" dir="rtl">
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Suspense fallback={<SimpleLoading />}>
                <AppRoutes />
              </Suspense>
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </div>
  );
};

export default memo(App);
