
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useUniverseExplorer } from './useUniverseExplorer';
import { getUniverseTypeColor } from './universeStyleUtils';

// Import our new components
import UniverseHeader from './components/UniverseHeader';
import UniverseFooter from './components/UniverseFooter';
import DecorativeBackground from './components/DecorativeBackground';
import UniverseLoadingState from './components/UniverseLoadingState';
import UniverseContent from './components/UniverseContent';

export const ParallelUniverseExplorer = () => {
  const { 
    universe, 
    isLoading, 
    isAnimating, 
    hasNewUniverse, 
    getRandomUniverse, 
    copyUniverseDetails 
  } = useUniverseExplorer();

  return (
    <Card className={`shadow-md overflow-hidden relative ${universe ? getUniverseTypeColor(universe.type) : 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200'}`}>
      {/* Decorative background */}
      <DecorativeBackground />
      
      {/* Header */}
      <UniverseHeader />
      
      {/* Content */}
      <CardContent className="pt-3 px-3">
        <div className="space-y-3">
          {!universe ? (
            <UniverseLoadingState />
          ) : (
            <div className={isAnimating ? 'opacity-50' : ''}>
              <UniverseContent 
                universe={universe}
                hasNewUniverse={hasNewUniverse}
              />
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Footer */}
      <UniverseFooter 
        isLoading={isLoading}
        universe={universe}
        onRefresh={getRandomUniverse}
        onCopy={copyUniverseDetails}
      />
      
      {/* Animation styles */}
      <style>{`
        .universe-appear {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Card>
  );
};
