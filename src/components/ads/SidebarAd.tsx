import React from 'react';
import { AdBanner } from './AdBanner';

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

export const SidebarAd: React.FC<SidebarAdProps> = ({ adSlot, className = '' }) => {
  return (
    <div className={`sidebar-ad-wrapper ${className}`}>
      {/* Desktop Sidebar Ad (300x600) */}
      <div className="hidden lg:block sticky top-4">
        <div className="bg-muted/10 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-2 text-center">آگهی</p>
          <AdBanner
            adSlot={adSlot}
            adFormat="auto"
            style={{ display: 'block', width: '300px', height: '600px' }}
            className="sidebar-ad"
          />
        </div>
      </div>
      
      {/* Mobile/Tablet Horizontal Ad */}
      <div className="block lg:hidden py-4">
        <div className="bg-muted/10 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-2 text-center">آگهی</p>
          <AdBanner
            adSlot={adSlot}
            adFormat="auto"
            style={{ display: 'block', width: '100%', height: '200px' }}
            className="mobile-sidebar-ad"
          />
        </div>
      </div>
    </div>
  );
};