import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShareableWidget } from '@/components/widgets/ShareableWidget';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

const WidgetsPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Helmet>
        <title>ویجت‌های قابل اشتراک‌گذاری - ابزارینو</title>
        <meta name="description" content="کدهای ویجت برای اشتراک‌گذاری و لینک دادن به ابزارینو در وب‌سایت خود" />
      </Helmet>

      <OpenGraphTags
        title="ویجت‌های قابل اشتراک‌گذاری - ابزارینو"
        description="کدهای ویجت برای لینک دادن به ابزارینو"
        type="website"
      />

      <div className="min-h-screen bg-background">
        <Header isScrolled={isScrolled} />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <ShareableWidget />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WidgetsPage;
