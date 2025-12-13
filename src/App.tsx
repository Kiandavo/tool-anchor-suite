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
import { KeyboardShortcutsHelp } from "@/components/ui/KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Component to initialize keyboard shortcuts
const KeyboardShortcutsProvider = ({ children }: { children: React.ReactNode }) => {
  useKeyboardShortcuts();
  return <>{children}</>;
};

const App = () => {
  // Skip splash for returning users in the same session
  const splashAlreadyShown = typeof window !== 'undefined' && sessionStorage.getItem('splashShown');
  const [showSplash, setShowSplash] = React.useState(!splashAlreadyShown);
  
  // Memoize callback to prevent SplashScreen timer reset on re-renders
  const handleSplashComplete = React.useCallback(() => {
    setShowSplash(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashShown', 'true');
    }
  }, []);
  
  // Initialize font optimization and service worker on app startup
  // Also immediately hide static content when React mounts
  React.useEffect(() => {
    initializeFontOptimization();
    registerServiceWorker();
    
    // Hide static content immediately when React mounts
    const staticContent = document.getElementById('static-content');
    if (staticContent) {
      staticContent.style.display = 'none';
    }
    // Add react-mounted class to body for CSS-based hiding
    document.body.classList.add('react-mounted');
  }, []);

  // Render app content immediately with splash overlay on top
  // This allows LCP to paint while splash shows, improving TTI
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardShortcutsProvider>
            <DefaultResourceHints />
            <CoreWebVitals />
            <GoogleAnalytics />
            <SearchModal />
            <KeyboardShortcutsHelp />
            <InstallPrompt />
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <AppRoutes />
          </KeyboardShortcutsProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
