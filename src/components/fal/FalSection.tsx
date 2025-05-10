
import React, { useState, lazy, Suspense } from 'react';
import { Star, Globe, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Lazy load components with proper handling for named exports
const HafezFortune = lazy(() => import('../../components/HafezFortune').then(module => ({ default: module.HafezFortune })));
const Horoscope = lazy(() => import('./Horoscope').then(module => ({ default: module.Horoscope })));
const RumiIstikhara = lazy(() => import('./RumiIstikhara').then(module => ({ default: module.RumiIstikhara })));
const TarotReading = lazy(() => import('./TarotReading').then(module => ({ default: module.TarotReading })));
const ParallelUniverseExplorer = lazy(() => import('./parallelUniverse/ParallelUniverseExplorer').then(module => ({ default: module.ParallelUniverseExplorer })));

// Loading component
const LoadingPlaceholder = () => (
  <div className="h-64 border rounded-lg flex items-center justify-center neo-glass shadow-sm">
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
    <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
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
    <section className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-[#b0c8e6]/30 neo-glass p-8" style={{ animationDelay: '0.15s' }}>
      {/* Section Header - Fortune Telling */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-transparent w-1/4"></div>
        <div className="px-4 py-1.5 bg-[#f8faff] rounded-full shadow-sm border border-[#b0c8e6]/20">
          <h2 className="text-center text-[#143a5c] font-bold text-xl flex items-center">
            <Star size={20} className="ml-2 text-[#b0c8e6]" />
            فال و طالع بینی
          </h2>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6] via-[#b0c8e6] to-transparent w-1/4"></div>
      </div>
      
      {/* Hafez, Horoscope, and Rumi Row */}
      <div className="grid md:grid-cols-3 gap-4 relative">
        {/* Hafez Fortune */}
        <div>
          {!loadedComponents.hafez ? (
            <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
              <SectionDescription 
                title="فال حافظ" 
                description="با نیت قلبی و تمرکز، از دیوان حافظ شیرازی، شعری به عنوان راهنمایی و تفأل دریافت کنید. شعر حافظ پاسخی به نیت شما خواهد بود."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('hafez')}
                  variant="apple"
                  size="apple-sm"
                  className="bg-gradient-to-b from-[#3a88f5] to-[#2b6dd1]"
                >
                  نیت کرده و باز کنید
                  <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
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
            <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
              <SectionDescription 
                title="طالع بینی" 
                description="با انتخاب برج تولد خود، پیش‌بینی‌های مربوط به زندگی، عشق، کار و سلامت خود را دریافت کنید. راهنمایی‌هایی برای آگاهی از مسیر پیش رو."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('horoscope')}
                  variant="apple"
                  size="apple-sm"
                  className="bg-gradient-to-b from-[#3a88f5] to-[#2b6dd1]"
                >
                  دیدن طالع بینی
                  <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
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
            <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
              <SectionDescription 
                title="استخاره با مولانا" 
                description="با نیت و سؤال خود، به شعری از مولانا برای راهنمایی و مشورت دست یابید. کلمات عارف بزرگ، چراغی برای مسیر انتخاب شما خواهد بود."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('rumi')}
                  variant="apple"
                  size="apple-sm"
                  className="bg-gradient-to-b from-[#3a88f5] to-[#2b6dd1]"
                >
                  انجام استخاره
                  <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
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
      <div className="flex items-center justify-center mb-6 mt-10">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#a99af0] to-transparent w-1/4"></div>
        <div className="px-4 py-1.5 bg-[#f8f6ff] rounded-full shadow-sm border border-[#a99af0]/20">
          <h2 className="text-center text-[#2a1c64] font-bold text-xl flex items-center">
            <Globe size={20} className="ml-2 text-[#a99af0]" />
            اکتشافات عرفانی
          </h2>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-[#a99af0] via-[#a99af0] to-transparent w-1/4"></div>
      </div>
      
      {/* Tarot Reading and Parallel Universe Row */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Tarot Reading */}
        <div>
          {!loadedComponents.tarot ? (
            <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
              <SectionDescription 
                title="فال تاروت" 
                description="با انتخاب کارت‌های تاروت، به بینش‌های عمیق درباره گذشته، حال و آینده‌ دست یابید. نمادهای باستانی، رازهای زندگی شما را آشکار می‌کنند."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('tarot')}
                  variant="apple"
                  size="apple-sm"
                  className="bg-gradient-to-b from-[#643ab0] to-[#4e2b8a]"
                >
                  انجام فال تاروت
                  <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
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
            <div className="rounded-2xl border shadow-sm neo-glass p-5 h-64">
              <SectionDescription 
                title="جهان موازی" 
                description="به جهان‌های موازی سفر کنید و نسخه‌های متفاوت زندگی خود را کشف کنید. جهان‌هایی با قوانین فیزیکی، اجتماعی و طبیعی کاملاً متفاوت."
              />
              <div className="flex justify-center">
                <Button 
                  onClick={() => handleLoadComponent('universe')}
                  variant="apple"
                  size="apple-sm"
                  className="bg-gradient-to-b from-[#643ab0] to-[#4e2b8a]"
                >
                  کاوش جهان‌های موازی
                  <ChevronRight size={16} className="mr-1 rtl:rotate-180" />
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
    </section>
  );
};
