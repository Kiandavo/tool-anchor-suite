
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "@/providers/HelmetProvider";
import { AppRoutes } from "@/components/AppRoutes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { initializeFontOptimization } from "@/utils/fontOptimization";
import { SearchModal } from "@/components/search/SearchModal";
import { registerServiceWorker } from "@/utils/serviceWorkerRegistration";
import { DefaultResourceHints } from "@/components/performance/ResourceHints";
import { CoreWebVitals } from "@/components/performance/CoreWebVitals";
import { SplashScreen } from "@/components/SplashScreen";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

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
  const [showSplash, setShowSplash] = React.useState(true);
  
  console.log('App component initializing...');
  
  // Initialize font optimization and service worker on app startup
  React.useEffect(() => {
    initializeFontOptimization();
    registerServiceWorker();
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <DefaultResourceHints />
          <CoreWebVitals />
          <GoogleAnalytics />
          <SearchModal />
          <InstallPrompt />
          <AppRoutes />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
