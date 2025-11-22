import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ExternalLink, BookOpen, Code, Palette, TrendingUp, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
}

const Resources: React.FC = () => {
  const resources: Resource[] = [
    // Design & UI/UX
    {
      title: 'Material Design',
      description: 'راهنمای جامع طراحی متریال از گوگل',
      url: 'https://material.io/design',
      category: 'design'
    },
    {
      title: 'Nielsen Norman Group',
      description: 'تحقیقات و مقالات تجربه کاربری',
      url: 'https://www.nngroup.com',
      category: 'design'
    },
    {
      title: 'Smashing Magazine',
      description: 'مجله طراحی و توسعه وب',
      url: 'https://www.smashingmagazine.com',
      category: 'design'
    },
    {
      title: 'Dribbble',
      description: 'الهام‌بخشی از طراحی‌های خلاقانه',
      url: 'https://dribbble.com',
      category: 'design'
    },

    // Development
    {
      title: 'MDN Web Docs',
      description: 'مستندات جامع توسعه وب',
      url: 'https://developer.mozilla.org',
      category: 'development'
    },
    {
      title: 'Stack Overflow',
      description: 'پرسش و پاسخ برنامه‌نویسی',
      url: 'https://stackoverflow.com',
      category: 'development'
    },
    {
      title: 'GitHub',
      description: 'میزبانی کد و همکاری',
      url: 'https://github.com',
      category: 'development'
    },
    {
      title: 'freeCodeCamp',
      description: 'آموزش رایگان برنامه‌نویسی',
      url: 'https://www.freecodecamp.org',
      category: 'development'
    },

    // SEO & Marketing
    {
      title: 'Google Search Central',
      description: 'راهنمای سئو گوگل',
      url: 'https://developers.google.com/search',
      category: 'seo'
    },
    {
      title: 'Moz Blog',
      description: 'مقالات تخصصی سئو',
      url: 'https://moz.com/blog',
      category: 'seo'
    },
    {
      title: 'Ahrefs Blog',
      description: 'راهنماهای سئو و بازاریابی',
      url: 'https://ahrefs.com/blog',
      category: 'seo'
    },
    {
      title: 'HubSpot Marketing',
      description: 'منابع بازاریابی دیجیتال',
      url: 'https://blog.hubspot.com/marketing',
      category: 'seo'
    },

    // Performance & Security
    {
      title: 'Web.dev',
      description: 'راهنمای بهینه‌سازی عملکرد',
      url: 'https://web.dev',
      category: 'performance'
    },
    {
      title: 'PageSpeed Insights',
      description: 'تحلیل سرعت وب‌سایت',
      url: 'https://pagespeed.web.dev',
      category: 'performance'
    },
    {
      title: 'OWASP',
      description: 'امنیت اپلیکیشن‌های وب',
      url: 'https://owasp.org',
      category: 'performance'
    },

    // Tools & Utilities
    {
      title: 'Can I Use',
      description: 'پشتیبانی مرورگرها از ویژگی‌ها',
      url: 'https://caniuse.com',
      category: 'tools'
    },
    {
      title: 'RegExr',
      description: 'تست و یادگیری عبارات منظم',
      url: 'https://regexr.com',
      category: 'tools'
    },
    {
      title: 'JSON Formatter',
      description: 'فرمت و اعتبارسنجی JSON',
      url: 'https://jsonformatter.org',
      category: 'tools'
    },

    // Learning
    {
      title: 'Coursera',
      description: 'دوره‌های آنلاین دانشگاهی',
      url: 'https://www.coursera.org',
      category: 'learning'
    },
    {
      title: 'Udemy',
      description: 'آموزش‌های متنوع آنلاین',
      url: 'https://www.udemy.com',
      category: 'learning'
    },
    {
      title: 'Khan Academy',
      description: 'آموزش رایگان',
      url: 'https://www.khanacademy.org',
      category: 'learning'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه منابع', icon: BookOpen },
    { id: 'design', label: 'طراحی', icon: Palette },
    { id: 'development', label: 'توسعه', icon: Code },
    { id: 'seo', label: 'سئو و بازاریابی', icon: TrendingUp },
    { id: 'performance', label: 'عملکرد و امنیت', icon: Shield },
    { id: 'tools', label: 'ابزارها', icon: Zap },
    { id: 'learning', label: 'یادگیری', icon: BookOpen }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>منابع و لینک‌های مفید - ابزارینو</title>
        <meta name="description" content="مجموعه منابع معتبر و لینک‌های مفید در حوزه طراحی، توسعه وب، سئو، بازاریابی و یادگیری" />
      </Helmet>

      <OpenGraphTags
        title="منابع و لینک‌های مفید - ابزارینو"
        description="مجموعه منابع معتبر و لینک‌های مفید برای توسعه‌دهندگان و طراحان"
        type="website"
      />

      <div className="min-h-screen bg-background">
        <Header isScrolled={isScrolled} />
        
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">منابع و لینک‌های مفید</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مجموعه‌ای از بهترین منابع معتبر برای یادگیری و بهبود مهارت‌های شما
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-sm">
                  <cat.icon className="h-4 w-4 ml-2" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {resource.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    مشاهده منبع
                    <ExternalLink className="h-4 w-4 mr-2" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>

          {/* Info Box */}
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">درباره این منابع</h2>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                این لیست شامل منابع معتبر و با کیفیتی است که توسط تیم ابزارینو بررسی و تایید شده‌اند. 
                هدف ما فراهم کردن دسترسی آسان به بهترین منابع یادگیری و توسعه برای جامعه فارسی‌زبان است.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                اگر منبع معتبری سراغ دارید که در این لیست نیست، لطفاً با ما در میان بگذارید تا آن را 
                بررسی و در صورت تایید به لیست اضافه کنیم.
              </p>
            </div>
            <Button size="lg" className="mt-6">
              پیشنهاد منبع جدید
            </Button>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
