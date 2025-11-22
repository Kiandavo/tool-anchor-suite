import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Download, Image as ImageIcon, FileText, Package, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OpenGraphTags } from '@/components/seo/OpenGraphTags';

const PressKit: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const stats = [
    { label: 'کاربران فعال ماهانه', value: '50,000+', icon: Users },
    { label: 'ابزارهای موجود', value: '30+', icon: Package },
    { label: 'رشد ماهانه', value: '45%', icon: TrendingUp },
    { label: 'امتیاز رضایت', value: '4.8/5', icon: Award }
  ];

  const logos = [
    { name: 'لوگوی اصلی (PNG)', size: '1200x630', format: 'PNG' },
    { name: 'لوگوی شفاف', size: '512x512', format: 'PNG' },
    { name: 'لوگوی تک رنگ', size: '512x512', format: 'SVG' },
    { name: 'آیکون اپلیکیشن', size: '192x192', format: 'PNG' }
  ];

  const brandColors = [
    { name: 'آبی اصلی', hex: '#2563eb', rgb: 'rgb(37, 99, 235)' },
    { name: 'بنفش', hex: '#7c3aed', rgb: 'rgb(124, 58, 237)' },
    { name: 'سبز', hex: '#10b981', rgb: 'rgb(16, 185, 129)' },
    { name: 'خاکستری تیره', hex: '#1f2937', rgb: 'rgb(31, 41, 55)' }
  ];

  const pressReleases = [
    {
      date: '۱۴۰۳/۰۹/۱۵',
      title: 'ابزارینو: راه‌اندازی ۱۰ ابزار جدید برای توسعه‌دهندگان',
      excerpt: 'ابزارینو مجموعه جامعی از ابزارهای توسعه وب را برای توسعه‌دهندگان فارسی‌زبان معرفی کرد.'
    },
    {
      date: '۱۴۰۳/۰۸/۰۱',
      title: 'عبور از مرز ۵۰ هزار کاربر فعال ماهانه',
      excerpt: 'ابزارینو با رشد ۴۵ درصدی از مرز ۵۰ هزار کاربر فعال ماهانه عبور کرد.'
    },
    {
      date: '۱۴۰۳/۰۶/۲۰',
      title: 'معرفی ابزارهای هوش مصنوعی برای محتوا',
      excerpt: 'ابزارهای جدید مبتنی بر هوش مصنوعی برای تولید و بهینه‌سازی محتوای فارسی.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>کیت رسانه‌ای - ابزارینو</title>
        <meta name="description" content="منابع رسانه‌ای، لوگوها، آمار و اطلاعات مطبوعاتی ابزارینو برای خبرنگاران و بلاگرها" />
      </Helmet>

      <OpenGraphTags
        title="کیت رسانه‌ای - ابزارینو"
        description="منابع رسانه‌ای، لوگوها، آمار و اطلاعات مطبوعاتی ابزارینو"
        type="website"
      />

      <div className="min-h-screen bg-background">
        <Header isScrolled={isScrolled} />
        
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">کیت رسانه‌ای</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منابع و اطلاعات مورد نیاز برای نوشتن درباره ابزارینو
            </p>
          </div>

          {/* Company Overview */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">درباره ابزارینو</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                ابزارینو یک پلتفرم جامع ابزارهای آنلاین فارسی است که با هدف تسهیل کار توسعه‌دهندگان، 
                طراحان، بازاریابان و تولیدکنندگان محتوای فارسی‌زبان راه‌اندازی شده است. ما بیش از ۳۰ 
                ابزار تخصصی در حوزه‌های مختلف از جمله متن، تصویر، SEO، محاسبات و بهره‌وری ارائه می‌دهیم.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ماموریت ما ساده‌سازی فرآیندهای روزمره و افزایش بهره‌وری کاربران فارسی‌زبان است. 
                تمام ابزارها به صورت رایگان و بدون نیاز به ثبت‌نام در دسترس هستند.
              </p>
            </div>
          </Card>

          {/* Key Statistics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">آمار کلیدی</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Brand Assets */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="h-6 w-6" />
              دارایی‌های برند
            </h2>
            
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">لوگوها</h3>
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  دانلود همه
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {logos.map((logo, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="bg-muted/50 rounded-lg h-32 mb-3 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{logo.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {logo.size} • {logo.format}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">رنگ‌های برند</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandColors.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div 
                      className="h-24 rounded-lg border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <div className="font-medium text-sm">{color.name}</div>
                      <div className="text-xs text-muted-foreground">{color.hex}</div>
                      <div className="text-xs text-muted-foreground">{color.rgb}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Press Releases */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              اخبار و اطلاعیه‌ها
            </h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-2">{release.date}</div>
                      <h3 className="text-lg font-semibold mb-2">{release.title}</h3>
                      <p className="text-muted-foreground">{release.excerpt}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      مطالعه
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">ارتباط با رسانه‌ها</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              برای مصاحبه، درخواست اطلاعات بیشتر یا همکاری با تیم رسانه‌ای ما تماس بگیرید
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">
                press@abzarino.ir
              </Button>
              <Button size="lg" variant="outline">
                <Download className="h-4 w-4 ml-2" />
                دانلود کیت کامل
              </Button>
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PressKit;
