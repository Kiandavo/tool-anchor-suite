import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Search, 
  Globe, 
  FileText, 
  Image, 
  Link2, 
  Smartphone,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AuditItem {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  recommendation?: string;
  impact: 'high' | 'medium' | 'low';
}

interface AuditCategory {
  name: string;
  icon: React.ReactNode;
  score: number;
  items: AuditItem[];
}

export const SeoAuditReport = () => {
  const [overallScore, setOverallScore] = useState(0);
  const [categories, setCategories] = useState<AuditCategory[]>([]);

  useEffect(() => {
    // Run SEO audit checks
    const auditResults = runSeoAudit();
    setCategories(auditResults.categories);
    setOverallScore(auditResults.overallScore);
  }, []);

  const runSeoAudit = () => {
    const metaAudit = auditMetaTags();
    const structuredDataAudit = auditStructuredData();
    const performanceAudit = auditPerformance();
    const accessibilityAudit = auditAccessibility();
    const contentAudit = auditContent();
    const technicalAudit = auditTechnical();

    const allCategories = [
      metaAudit,
      structuredDataAudit,
      performanceAudit,
      accessibilityAudit,
      contentAudit,
      technicalAudit
    ];

    const overallScore = Math.round(
      allCategories.reduce((sum, cat) => sum + cat.score, 0) / allCategories.length
    );

    return { categories: allCategories, overallScore };
  };

  const auditMetaTags = (): AuditCategory => {
    const items: AuditItem[] = [
      {
        id: 'title',
        title: 'عنوان صفحه (Title Tag)',
        status: document.title && document.title.length > 10 && document.title.length < 70 ? 'pass' : 'warning',
        description: `طول عنوان: ${document.title?.length || 0} کاراکتر`,
        recommendation: 'عنوان باید بین ۳۰ تا ۶۰ کاراکتر باشد',
        impact: 'high'
      },
      {
        id: 'description',
        title: 'توضیحات متا (Meta Description)',
        status: document.querySelector('meta[name="description"]') ? 'pass' : 'fail',
        description: document.querySelector('meta[name="description"]') 
          ? `طول توضیحات: ${(document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content?.length || 0} کاراکتر`
          : 'توضیحات متا یافت نشد',
        recommendation: 'توضیحات باید بین ۱۲۰ تا ۱۶۰ کاراکتر باشد',
        impact: 'high'
      },
      {
        id: 'keywords',
        title: 'کلمات کلیدی (Keywords)',
        status: document.querySelector('meta[name="keywords"]') ? 'pass' : 'warning',
        description: document.querySelector('meta[name="keywords"]') ? 'کلمات کلیدی تعریف شده' : 'کلمات کلیدی یافت نشد',
        recommendation: 'کلمات کلیدی مرتبط با محتوا را اضافه کنید',
        impact: 'medium'
      },
      {
        id: 'canonical',
        title: 'لینک کانونیکال (Canonical)',
        status: document.querySelector('link[rel="canonical"]') ? 'pass' : 'fail',
        description: document.querySelector('link[rel="canonical"]') ? 'لینک کانونیکال تنظیم شده' : 'لینک کانونیکال یافت نشد',
        recommendation: 'برای جلوگیری از محتوای تکراری، لینک کانونیکال اضافه کنید',
        impact: 'high'
      },
      {
        id: 'og-tags',
        title: 'تگ‌های Open Graph',
        status: document.querySelector('meta[property="og:title"]') ? 'pass' : 'warning',
        description: document.querySelector('meta[property="og:title"]') ? 'تگ‌های OG تنظیم شده' : 'تگ‌های OG یافت نشد',
        recommendation: 'برای اشتراک‌گذاری بهتر در شبکه‌های اجتماعی، تگ‌های OG اضافه کنید',
        impact: 'medium'
      },
      {
        id: 'twitter-cards',
        title: 'کارت‌های توییتر',
        status: document.querySelector('meta[name="twitter:card"]') ? 'pass' : 'warning',
        description: document.querySelector('meta[name="twitter:card"]') ? 'کارت توییتر تنظیم شده' : 'کارت توییتر یافت نشد',
        recommendation: 'برای نمایش بهتر در توییتر، کارت‌های توییتر اضافه کنید',
        impact: 'low'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'تگ‌های متا',
      icon: <FileText className="w-5 h-5" />,
      score,
      items
    };
  };

  const auditStructuredData = (): AuditCategory => {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    const hasJsonLd = jsonLdScripts.length > 0;
    
    let schemaTypes: string[] = [];
    jsonLdScripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@graph']) {
          data['@graph'].forEach((item: any) => {
            if (item['@type']) schemaTypes.push(item['@type']);
          });
        } else if (data['@type']) {
          schemaTypes.push(data['@type']);
        }
      } catch (e) {}
    });

    const items: AuditItem[] = [
      {
        id: 'json-ld',
        title: 'داده‌های ساختاریافته (JSON-LD)',
        status: hasJsonLd ? 'pass' : 'fail',
        description: hasJsonLd ? `${jsonLdScripts.length} اسکریپت JSON-LD یافت شد` : 'داده ساختاریافته یافت نشد',
        recommendation: 'داده‌های ساختاریافته برای درک بهتر محتوا توسط موتورهای جستجو ضروری است',
        impact: 'high'
      },
      {
        id: 'organization-schema',
        title: 'اسکیمای سازمان (Organization)',
        status: schemaTypes.includes('Organization') ? 'pass' : 'warning',
        description: schemaTypes.includes('Organization') ? 'اسکیمای سازمان موجود است' : 'اسکیمای سازمان یافت نشد',
        recommendation: 'اسکیمای سازمان برای شناسایی برند در نتایج جستجو مفید است',
        impact: 'medium'
      },
      {
        id: 'website-schema',
        title: 'اسکیمای وب‌سایت (WebSite)',
        status: schemaTypes.includes('WebSite') ? 'pass' : 'warning',
        description: schemaTypes.includes('WebSite') ? 'اسکیمای وب‌سایت موجود است' : 'اسکیمای وب‌سایت یافت نشد',
        recommendation: 'اسکیمای وب‌سایت برای فعال‌سازی جستجوی سایت در گوگل مفید است',
        impact: 'medium'
      },
      {
        id: 'breadcrumb-schema',
        title: 'اسکیمای نان‌ریزه (BreadcrumbList)',
        status: schemaTypes.includes('BreadcrumbList') ? 'pass' : 'warning',
        description: schemaTypes.includes('BreadcrumbList') ? 'اسکیمای نان‌ریزه موجود است' : 'اسکیمای نان‌ریزه یافت نشد',
        recommendation: 'اسکیمای نان‌ریزه برای نمایش مسیر در نتایج جستجو مفید است',
        impact: 'medium'
      },
      {
        id: 'faq-schema',
        title: 'اسکیمای سوالات متداول (FAQPage)',
        status: schemaTypes.includes('FAQPage') ? 'pass' : 'warning',
        description: schemaTypes.includes('FAQPage') ? 'اسکیمای FAQ موجود است' : 'اسکیمای FAQ یافت نشد',
        recommendation: 'اسکیمای FAQ برای نمایش سوالات در نتایج جستجو مفید است',
        impact: 'medium'
      },
      {
        id: 'localbusiness-schema',
        title: 'اسکیمای کسب‌وکار محلی (LocalBusiness)',
        status: schemaTypes.includes('LocalBusiness') ? 'pass' : 'warning',
        description: schemaTypes.includes('LocalBusiness') ? 'اسکیمای کسب‌وکار محلی موجود است' : 'اسکیمای کسب‌وکار محلی یافت نشد',
        recommendation: 'برای کسب‌وکارهای محلی، این اسکیما بسیار مفید است',
        impact: 'medium'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'داده‌های ساختاریافته',
      icon: <BarChart3 className="w-5 h-5" />,
      score,
      items
    };
  };

  const auditPerformance = (): AuditCategory => {
    const items: AuditItem[] = [
      {
        id: 'viewport',
        title: 'تگ Viewport',
        status: document.querySelector('meta[name="viewport"]') ? 'pass' : 'fail',
        description: document.querySelector('meta[name="viewport"]') ? 'تگ viewport تنظیم شده' : 'تگ viewport یافت نشد',
        recommendation: 'برای ریسپانسیو بودن سایت، تگ viewport ضروری است',
        impact: 'high'
      },
      {
        id: 'preconnect',
        title: 'پیش‌اتصال (Preconnect)',
        status: document.querySelector('link[rel="preconnect"]') ? 'pass' : 'warning',
        description: document.querySelector('link[rel="preconnect"]') ? 'پیش‌اتصال فعال است' : 'پیش‌اتصال تنظیم نشده',
        recommendation: 'پیش‌اتصال به دامنه‌های خارجی سرعت را بهبود می‌دهد',
        impact: 'medium'
      },
      {
        id: 'lazy-loading',
        title: 'بارگذاری تنبل تصاویر',
        status: document.querySelector('img[loading="lazy"]') ? 'pass' : 'warning',
        description: document.querySelector('img[loading="lazy"]') ? 'بارگذاری تنبل فعال است' : 'بارگذاری تنبل یافت نشد',
        recommendation: 'برای بهبود سرعت، تصاویر را با loading="lazy" بارگذاری کنید',
        impact: 'medium'
      },
      {
        id: 'service-worker',
        title: 'Service Worker (PWA)',
        status: 'serviceWorker' in navigator ? 'pass' : 'warning',
        description: 'serviceWorker' in navigator ? 'Service Worker پشتیبانی می‌شود' : 'Service Worker پشتیبانی نمی‌شود',
        recommendation: 'Service Worker برای کش کردن و عملکرد آفلاین مفید است',
        impact: 'low'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'عملکرد',
      icon: <Zap className="w-5 h-5" />,
      score,
      items
    };
  };

  const auditAccessibility = (): AuditCategory => {
    const images = document.querySelectorAll('img');
    const imagesWithAlt = document.querySelectorAll('img[alt]');
    const links = document.querySelectorAll('a');
    const linksWithHref = document.querySelectorAll('a[href]');

    const items: AuditItem[] = [
      {
        id: 'lang',
        title: 'زبان صفحه (lang)',
        status: document.documentElement.lang ? 'pass' : 'fail',
        description: document.documentElement.lang ? `زبان صفحه: ${document.documentElement.lang}` : 'زبان صفحه تنظیم نشده',
        recommendation: 'تنظیم زبان صفحه برای دسترسی‌پذیری و SEO ضروری است',
        impact: 'high'
      },
      {
        id: 'dir',
        title: 'جهت صفحه (dir)',
        status: document.documentElement.dir === 'rtl' ? 'pass' : 'warning',
        description: document.documentElement.dir ? `جهت صفحه: ${document.documentElement.dir}` : 'جهت صفحه تنظیم نشده',
        recommendation: 'برای سایت‌های فارسی، جهت صفحه باید rtl باشد',
        impact: 'high'
      },
      {
        id: 'image-alt',
        title: 'متن جایگزین تصاویر (Alt)',
        status: images.length === imagesWithAlt.length ? 'pass' : images.length > imagesWithAlt.length ? 'warning' : 'pass',
        description: `${imagesWithAlt.length} از ${images.length} تصویر دارای متن جایگزین هستند`,
        recommendation: 'تمام تصاویر باید متن جایگزین داشته باشند',
        impact: 'medium'
      },
      {
        id: 'h1',
        title: 'تگ H1',
        status: document.querySelector('h1') ? 'pass' : 'fail',
        description: document.querySelector('h1') ? 'تگ H1 موجود است' : 'تگ H1 یافت نشد',
        recommendation: 'هر صفحه باید دقیقاً یک تگ H1 داشته باشد',
        impact: 'high'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'دسترسی‌پذیری',
      icon: <Shield className="w-5 h-5" />,
      score,
      items
    };
  };

  const auditContent = (): AuditCategory => {
    const headings = {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length
    };

    const items: AuditItem[] = [
      {
        id: 'heading-hierarchy',
        title: 'سلسله‌مراتب عناوین',
        status: headings.h1 === 1 && headings.h2 > 0 ? 'pass' : 'warning',
        description: `H1: ${headings.h1} | H2: ${headings.h2} | H3: ${headings.h3}`,
        recommendation: 'صفحه باید یک H1 و چندین H2/H3 داشته باشد',
        impact: 'medium'
      },
      {
        id: 'internal-links',
        title: 'لینک‌های داخلی',
        status: document.querySelectorAll('a[href^="/"]').length > 5 ? 'pass' : 'warning',
        description: `${document.querySelectorAll('a[href^="/"]').length} لینک داخلی`,
        recommendation: 'لینک‌سازی داخلی برای توزیع اعتبار صفحات مهم است',
        impact: 'medium'
      },
      {
        id: 'external-links',
        title: 'لینک‌های خارجی',
        status: 'pass',
        description: `${document.querySelectorAll('a[href^="http"]').length} لینک خارجی`,
        recommendation: 'لینک‌های خارجی معتبر می‌توانند به اعتبار سایت کمک کنند',
        impact: 'low'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'محتوا',
      icon: <FileText className="w-5 h-5" />,
      score,
      items
    };
  };

  const auditTechnical = (): AuditCategory => {
    const items: AuditItem[] = [
      {
        id: 'https',
        title: 'پروتکل HTTPS',
        status: window.location.protocol === 'https:' ? 'pass' : 'fail',
        description: window.location.protocol === 'https:' ? 'سایت از HTTPS استفاده می‌کند' : 'سایت از HTTPS استفاده نمی‌کند',
        recommendation: 'HTTPS برای امنیت و SEO ضروری است',
        impact: 'high'
      },
      {
        id: 'mobile-friendly',
        title: 'سازگاری با موبایل',
        status: document.querySelector('meta[name="viewport"]') ? 'pass' : 'fail',
        description: 'سایت برای موبایل بهینه شده است',
        recommendation: 'طراحی ریسپانسیو برای موبایل ضروری است',
        impact: 'high'
      },
      {
        id: 'robots-meta',
        title: 'تگ Robots',
        status: document.querySelector('meta[name="robots"]') ? 'pass' : 'warning',
        description: document.querySelector('meta[name="robots"]') ? 'تگ robots تنظیم شده' : 'تگ robots یافت نشد',
        recommendation: 'تگ robots برای کنترل ایندکس شدن صفحات مفید است',
        impact: 'medium'
      },
      {
        id: 'sitemap',
        title: 'نقشه سایت (Sitemap)',
        status: 'pass',
        description: 'نقشه سایت در فایل robots.txt تعریف شده',
        recommendation: 'نقشه سایت برای کمک به ایندکس شدن صفحات مفید است',
        impact: 'medium'
      }
    ];

    const passCount = items.filter(i => i.status === 'pass').length;
    const score = Math.round((passCount / items.length) * 100);

    return {
      name: 'فنی',
      icon: <Globe className="w-5 h-5" />,
      score,
      items
    };
  };

  const getStatusIcon = (status: AuditItem['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            گزارش ممیزی سئو
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={`text-6xl font-bold ${getScoreColor(overallScore)}`}
              >
                {overallScore}
              </motion.div>
              <p className="text-muted-foreground mt-2">امتیاز کلی از ۱۰۰</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>پیشرفت</span>
                  <span>{overallScore}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${getProgressColor(overallScore)} rounded-full`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                  <span className={`text-xl font-bold ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full ${getProgressColor(category.score)} rounded-full transition-all`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <div className="space-y-2">
                  {category.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      {getStatusIcon(item.status)}
                      <span className="truncate">{item.title}</span>
                    </div>
                  ))}
                  {category.items.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{category.items.length - 3} مورد دیگر
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            جزئیات ممیزی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category.name} className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-lg border-b pb-2">
                  {category.icon}
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(item.status)}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                          {item.status !== 'pass' && item.recommendation && (
                            <p className="text-sm text-primary mt-2 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {item.recommendation}
                            </p>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'high' ? 'bg-red-500/10 text-red-500' :
                          item.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-green-500/10 text-green-500'
                        }`}>
                          {item.impact === 'high' ? 'اولویت بالا' :
                           item.impact === 'medium' ? 'اولویت متوسط' : 'اولویت پایین'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            خلاصه توصیه‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-green-500/10">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500">
                  {categories.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'pass').length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">موارد موفق</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-500">
                  {categories.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'warning').length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">هشدارها</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-500">
                  {categories.reduce((sum, cat) => sum + cat.items.filter(i => i.status === 'fail').length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">خطاها</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              برای بررسی داده‌های ساختاریافته، از ابزار 
              <a 
                href="https://search.google.com/test/rich-results" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mx-1"
              >
                Rich Results Test گوگل
              </a>
              استفاده کنید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoAuditReport;
