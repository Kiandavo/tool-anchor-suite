
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_title?: string;
        page_location?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with the updated location
    if (window.gtag) {
      window.gtag('config', 'G-P5JG2WQN86', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
      
      console.info(`📊 Analytics: Page view tracked for ${location.pathname}`);
    }
  }, [location]);

  // This component doesn't render anything
  return null;
};
