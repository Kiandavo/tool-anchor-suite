import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PerformanceDashboard as Dashboard } from '@/components/performance/PerformanceDashboard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PerformanceDashboardPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>داشبورد عملکرد | لنگر</title>
        <meta name="description" content="نظارت بر Core Web Vitals و معیارهای کلیدی عملکرد وب‌سایت" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowRight className="w-4 h-4 ml-2" />
                بازگشت به صفحه اصلی
              </Button>
            </Link>
            <span className="font-semibold text-foreground">داشبورد عملکرد</span>
          </div>
        </div>
        <main className="pb-12">
          <Dashboard />
        </main>
      </div>
    </>
  );
};

export default PerformanceDashboardPage;
