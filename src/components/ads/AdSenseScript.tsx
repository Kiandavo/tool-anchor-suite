import { useEffect } from 'react';

interface AdSenseScriptProps {
  adClient: string; // Your AdSense publisher ID (e.g., "ca-pub-1234567890123456")
}

export const AdSenseScript = ({ adClient }: AdSenseScriptProps) => {
  useEffect(() => {
    // Defer AdSense loading until after critical content renders
    const loadAdSense = () => {
      if (!document.querySelector(`script[data-ad-client="${adClient}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', adClient);
        document.head.appendChild(script);
      }
    };

    // Use requestIdleCallback for optimal deferral, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAdSense, { timeout: 3000 });
    } else {
      setTimeout(loadAdSense, 2000);
    }
  }, [adClient]);

  return null; // This component doesn't render anything
};