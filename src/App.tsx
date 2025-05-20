
import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/components/AppRoutes";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load non-critical components
const Toaster = lazy(() => import("@/components/ui/toaster").then(mod => ({ default: mod.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(mod => ({ default: mod.Toaster })));
const GoogleAnalytics = lazy(() => import("@/components/analytics/GoogleAnalytics").then(mod => ({ default: mod.GoogleAnalytics })));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Apply saved theme on app load - optimized for performance
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem('theme') || 'system';
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Suspense fallback={null}>
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

export default App;
