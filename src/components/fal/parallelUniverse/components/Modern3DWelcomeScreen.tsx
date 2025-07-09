import React, { useState, Suspense } from 'react';
import { SimpleCosmicBackground } from './SimpleCosmicBackground';
import { FallbackWelcomeScreen } from './FallbackWelcomeScreen';
import { ThreeJSErrorBoundary } from './ThreeJSErrorBoundary';

interface Modern3DWelcomeScreenProps {
  onDiscoverUniverse: () => void;
  onShowBrowser: () => void;
  isLoading: boolean;
  favoriteCount: number;
  totalUniverses: number;
}

export const Modern3DWelcomeScreen: React.FC<Modern3DWelcomeScreenProps> = (props) => {
  return (
    <div className="relative min-h-[600px] bg-background overflow-hidden">
      <ThreeJSErrorBoundary fallback={<FallbackWelcomeScreen {...props} />}>
        <Suspense fallback={<FallbackWelcomeScreen {...props} />}>
          <SimpleCosmicBackground count={2000} />
          <FallbackWelcomeScreen {...props} />
        </Suspense>
      </ThreeJSErrorBoundary>
    </div>
  );
};