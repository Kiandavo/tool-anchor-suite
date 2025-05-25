
import React, { useState, lazy, Suspense } from 'react';
import { Star } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { FortuneCard } from './FortuneCard';
import { LoadingPlaceholder } from './LoadingPlaceholder';

// Lazy load components
const HafezFortune = lazy(() => import('../../HafezFortune').then(module => ({ default: module.HafezFortune })));
const Horoscope = lazy(() => import('../Horoscope').then(module => ({ default: module.Horoscope })));
const RumiIstikhara = lazy(() => import('../RumiIstikhara').then(module => ({ default: module.RumiIstikhara })));

interface LoadedComponents {
  hafez: boolean;
  horoscope: boolean;
  rumi: boolean;
}

export const FortuneTellingSection: React.FC = () => {
  const [loadedComponents, setLoadedComponents] = useState<LoadedComponents>({
    hafez: false,
    horoscope: false,
    rumi: false
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
        title="فال و طالع بینی"
        icon={Star}
        iconColor="text-[#b0c8e6]"
        backgroundColor="bg-[#f8faff]"
      />
      
      <div className="grid md:grid-cols-3 gap-4 relative">
        {/* Hafez Fortune */}
        <div>
          {!loadedComponents.hafez ? (
            <FortuneCard
              title="فال حافظ"
              description="با نیت قلبی و تمرکز، از دیوان حافظ شیرازی، شعری به عنوان راهنمایی و تفأل دریافت کنید. شعر حافظ پاسخی به نیت شما خواهد بود."
              buttonText="نیت کرده و باز کنید"
              onLoadComponent={() => handleLoadComponent('hafez')}
              gradientFrom="#3a88f5"
              gradientTo="#2b6dd1"
            />
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <HafezFortune />
            </Suspense>
          )}
        </div>
        
        {/* Horoscope */}
        <div>
          {!loadedComponents.horoscope ? (
            <FortuneCard
              title="طالع بینی"
              description="با انتخاب برج تولد خود، پیش‌بینی‌های مربوط به زندگی، عشق، کار و سلامت خود را دریافت کنید. راهنمایی‌هایی برای آگاهی از مسیر پیش رو."
              buttonText="دیدن طالع بینی"
              onLoadComponent={() => handleLoadComponent('horoscope')}
              gradientFrom="#3a88f5"
              gradientTo="#2b6dd1"
            />
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <Horoscope />
            </Suspense>
          )}
        </div>
        
        {/* Rumi Istikhara */}
        <div>
          {!loadedComponents.rumi ? (
            <FortuneCard
              title="استخاره با مولانا"
              description="با نیت و سؤال خود، به شعری از مولانا برای راهنمایی و مشورت دست یابید. کلمات عارف بزرگ، چراغی برای مسیر انتخاب شما خواهد بود."
              buttonText="انجام استخاره"
              onLoadComponent={() => handleLoadComponent('rumi')}
              gradientFrom="#3a88f5"
              gradientTo="#2b6dd1"
            />
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <RumiIstikhara />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};
