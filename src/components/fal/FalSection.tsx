
import React, { useState, lazy, Suspense } from 'react';
import { Star, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Lazy load components with proper handling for named exports
const HafezFortune = lazy(() => import('../../components/HafezFortune').then(module => ({ default: module.HafezFortune })));
const Horoscope = lazy(() => import('./Horoscope').then(module => ({ default: module.Horoscope })));
const RumiIstikhara = lazy(() => import('./RumiIstikhara').then(module => ({ default: module.RumiIstikhara })));
const TarotReading = lazy(() => import('./TarotReading').then(module => ({ default: module.TarotReading })));
const ParallelUniverseExplorer = lazy(() => import('./parallelUniverse/ParallelUniverseExplorer').then(module => ({ default: module.ParallelUniverseExplorer })));

// Loading component
const LoadingPlaceholder = () => (
  <div className="h-64 border rounded-lg flex items-center justify-center bg-gray-50/50">
    <div className="text-center">
      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
      <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
    </div>
  </div>
);

// Component for section description
const SectionDescription = ({ title, description }: { title: string, description: string }) => (
  <div className="text-center">
    <h3 className="text-lg font-bold mb-3">{title}</h3>
    <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">{description}</p>
  </div>
);

export const FalSection = () => {
  // Track which fortune-telling sections have been loaded by user interaction
  const [loadedComponents, setLoadedComponents] = useState({
    hafez: false,
    horoscope: false,
    rumi: false,
    tarot: false,
    universe: false
  });

  // Handler to trigger loading a component when user interacts
  const handleLoadComponent = (component: keyof typeof loadedComponents) => {
    setLoadedComponents(prev => ({
      ...prev,
      [component]: true
    }));
  };

  return (
    <section className="mb-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      {/* Section Header - Fortune Telling */}
      <div className="flex items-center justify-center mb-3">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-transparent w-1/4"></div>
        <h2 className="text-center text-[#143a5c] font-bold text-lg px-4 flex items-center">
          <Star size={16} className="ml-2 text-[#b0c8e6]" />
          فال و طالع بینی
        </h2>
        <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6] via-[#b0c8e6] to-transparent w-1/4"></div>
      </div>
      
      {/* Hafez, Horoscope, and Rumi Row */}
      <div className="grid md:grid-cols-3 gap-4 relative">
        {/* Hafez Fortune */}
        <div>
          {!loadedComponents.hafez ? (
            <div className="rounded-lg border shadow-sm bg-white p-4 h-64">
              <SectionDescription 
                title="فال حافظ" 
                description="با نیت قلبی و تمرکز، از دیوان حافظ شیرازی، شعری به عنوان راهنمایی و تفأل دریافت کنید. شعر حافظ پاسخی به نیت شما خواهد بود."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('hafez')}
                  className="bg-gradient-to-r from-primary/80 to-primary"
                >
                  نیت کرده و باز کنید
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <HafezFortune />
            </Suspense>
          )}
        </div>
        
        {/* Horoscope */}
        <div>
          {!loadedComponents.horoscope ? (
            <div className="rounded-lg border shadow-sm bg-white p-4 h-64">
              <SectionDescription 
                title="طالع بینی" 
                description="با انتخاب برج تولد خود، پیش‌بینی‌های مربوط به زندگی، عشق، کار و سلامت خود را دریافت کنید. راهنمایی‌هایی برای آگاهی از مسیر پیش رو."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('horoscope')}
                  className="bg-gradient-to-r from-primary/80 to-primary"
                >
                  دیدن طالع بینی
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <Horoscope />
            </Suspense>
          )}
        </div>
        
        {/* Rumi Istikhara */}
        <div>
          {!loadedComponents.rumi ? (
            <div className="rounded-lg border shadow-sm bg-white p-4 h-64">
              <SectionDescription 
                title="استخاره با مولانا" 
                description="با نیت و سؤال خود، به شعری از مولانا برای راهنمایی و مشورت دست یابید. کلمات عارف بزرگ، چراغی برای مسیر انتخاب شما خواهد بود."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('rumi')}
                  className="bg-gradient-to-r from-primary/80 to-primary"
                >
                  انجام استخاره
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <RumiIstikhara />
            </Suspense>
          )}
        </div>
      </div>
      
      {/* Section Header - Mystical Exploration */}
      <div className="flex items-center justify-center mb-3 mt-10">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#a99af0] to-transparent w-1/4"></div>
        <h2 className="text-center text-[#2a1c64] font-bold text-lg px-4 flex items-center">
          <Globe size={16} className="ml-2 text-[#a99af0]" />
          اکتشافات عرفانی
        </h2>
        <div className="h-0.5 bg-gradient-to-r from-[#a99af0] via-[#a99af0] to-transparent w-1/4"></div>
      </div>
      
      {/* Tarot Reading and Parallel Universe Row */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Tarot Reading */}
        <div>
          {!loadedComponents.tarot ? (
            <div className="rounded-lg border shadow-sm bg-white p-4 h-64">
              <SectionDescription 
                title="فال تاروت" 
                description="با انتخاب کارت‌های تاروت، به بینش‌های عمیق درباره گذشته، حال و آینده‌ دست یابید. نمادهای باستانی، رازهای زندگی شما را آشکار می‌کنند."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('tarot')}
                  className="bg-gradient-to-r from-[#143a5c]/80 to-[#143a5c]"
                >
                  انجام فال تاروت
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <TarotReading />
            </Suspense>
          )}
        </div>
        
        {/* Parallel Universe */}
        <div>
          {!loadedComponents.universe ? (
            <div className="rounded-lg border shadow-sm bg-white p-4 h-64">
              <SectionDescription 
                title="جهان موازی" 
                description="به جهان‌های موازی سفر کنید و نسخه‌های متفاوت زندگی خود را کشف کنید. جهان‌هایی با قوانین فیزیکی، اجتماعی و طبیعی کاملاً متفاوت."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('universe')}
                  className="bg-gradient-to-r from-[#143a5c]/80 to-[#143a5c]"
                >
                  کاوش جهان‌های موازی
                </Button>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingPlaceholder />}>
              <ParallelUniverseExplorer />
            </Suspense>
          )}
        </div>
      </div>
      
      {/* Visual connector between the two components */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#6e42ca" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="#143a5c" strokeWidth="1" fill="none" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#6e42ca" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#143a5c" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};

