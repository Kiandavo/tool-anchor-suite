
import React, { useState, lazy, Suspense } from 'react';
import { Compass } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { FortuneCard } from './FortuneCard';
import { LoadingPlaceholder } from './LoadingPlaceholder';

// Lazy load components
const TarotReading = lazy(() => import('../TarotReading').then(module => ({ default: module.TarotReading })));
const ParallelUniverseExplorer = lazy(() => import('../parallelUniverse/ParallelUniverseExplorer').then(module => ({ default: module.ParallelUniverseExplorer })));

interface LoadedComponents {
  tarot: boolean;
  universe: boolean;
}

export const MysticalExplorationSection: React.FC = () => {
  const [loadedComponents, setLoadedComponents] = useState<LoadedComponents>({
    tarot: false,
    universe: false
  });

  const handleLoadComponent = (component: keyof LoadedComponents) => {
    setLoadedComponents(prev => ({
      ...prev,
      [component]: true
    }));
  };

  return (
    <>
      <SectionHeader 
        title="اکتشافات عرفانی"
        icon={Compass}
        iconColor="text-[#a99af0]"
        backgroundColor="bg-[#f8f6ff]"
      />
      
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Tarot Reading */}
        <div>
          {!loadedComponents.tarot ? (
            <FortuneCard
              title="فال تاروت"
              description="با انتخاب کارت‌های تاروت، به بینش‌های عمیق درباره گذشته، حال و آینده‌ دست یابید. نمادهای باستانی، رازهای زندگی شما را آشکار می‌کنند."
              buttonText="انجام فال تاروت"
              onLoadComponent={() => handleLoadComponent('tarot')}
              gradientFrom="#643ab0"
              gradientTo="#4e2b8a"
            />
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <TarotReading />
            </Suspense>
          )}
        </div>
        
        {/* Parallel Universe */}
        <div>
          {!loadedComponents.universe ? (
            <FortuneCard
              title="جهان موازی"
              description="به جهان‌های موازی سفر کنید و نسخه‌های متفاوت زندگی خود را کشف کنید. جهان‌هایی با قوانین فیزیکی، اجتماعی و طبیعی کاملاً متفاوت."
              buttonText="کاوش جهان‌های موازی"
              onLoadComponent={() => handleLoadComponent('universe')}
              gradientFrom="#643ab0"
              gradientTo="#4e2b8a"
            />
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <ParallelUniverseExplorer />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};
