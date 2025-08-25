
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { AppRoutes } from "@/components/AppRoutes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { LoadingPlaceholder } from "@/components/fal/sections/LoadingPlaceholder";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  console.log('App component initializing...');
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <GoogleAnalytics />
          <Suspense fallback={<LoadingPlaceholder />}>
            <AppRoutes />
          </Suspense>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
