import { useEffect } from 'react';

interface AdSenseScriptProps {
  adClient: string; // Your AdSense publisher ID (e.g., "ca-pub-1234567890123456")
}

export const AdSenseScript = ({ adClient }: AdSenseScriptProps) => {
  useEffect(() => {
    // Only add script if not already present
    if (!document.querySelector(`script[data-ad-client="${adClient}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', adClient);
      document.head.appendChild(script);
    }
  }, [adClient]);

  return null; // This component doesn't render anything
};