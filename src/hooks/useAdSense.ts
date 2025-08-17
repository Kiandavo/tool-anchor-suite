import { useEffect, useState } from 'react';

interface AdSenseConfig {
  publisherId: string;
  enabled: boolean;
}

export const useAdSense = (config: AdSenseConfig) => {
  const [adSenseLoaded, setAdSenseLoaded] = useState(false);

  useEffect(() => {
    if (!config.enabled) return;

    // Check if AdSense script is already loaded
    const existingScript = document.querySelector(
      `script[data-ad-client="${config.publisherId}"]`
    );

    if (existingScript) {
      setAdSenseLoaded(true);
      return;
    }

    // Load AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-ad-client', config.publisherId);
    
    script.onload = () => setAdSenseLoaded(true);
    script.onerror = () => {
      console.warn('AdSense failed to load');
      setAdSenseLoaded(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [config.publisherId, config.enabled]);

  return { adSenseLoaded };
};