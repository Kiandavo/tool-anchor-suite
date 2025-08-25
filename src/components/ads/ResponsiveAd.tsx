import React from 'react';
import { AdBanner } from './AdBanner';

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
}

export const ResponsiveAd: React.FC<ResponsiveAdProps> = ({ adSlot, className = '' }) => {
  return (
    <div className={`responsive-ad-wrapper py-4 ${className}`}>
      {/* Mobile Ad (320x50) */}
      <div className="block sm:hidden">
        <AdBanner
          adSlot={adSlot}
          adFormat="auto"
          style={{ display: 'block', width: '320px', height: '50px', margin: '0 auto' }}
          className="mobile-ad"
        />
      </div>
      
      {/* Tablet Ad (728x90) */}
      <div className="hidden sm:block lg:hidden">
        <AdBanner
          adSlot={adSlot}
          adFormat="auto"
          style={{ display: 'block', width: '728px', height: '90px', margin: '0 auto' }}
          className="tablet-ad"
        />
      </div>
      
      {/* Desktop Ad (970x250) */}
      <div className="hidden lg:block">
        <AdBanner
          adSlot={adSlot}
          adFormat="auto"
          style={{ display: 'block', width: '970px', height: '250px', margin: '0 auto' }}
          className="desktop-ad"
        />
      </div>
    </div>
  );
};