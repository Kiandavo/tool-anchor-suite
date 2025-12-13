import React from 'react';
import { Link } from 'react-router-dom';
import { getFooterLinks } from '@/utils/internal-linking';
import { Instagram, Mail, MapPin, Phone, ExternalLink, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const logoSvg = '/assets/laangar-logo.png';

const menuItems = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'همه ابزارها', href: '/all-tools' },
  { label: 'محاسبه‌گرها', href: '/calculators' },
  { label: 'ابزارهای متنی', href: '/text-tools' },
  { label: 'ابزارهای تصویر', href: '/image-tools' },
  { label: 'فال و طالع‌بینی', href: '/readings' },
];

const legalItems = [
  { label: 'درباره ما', href: '/about' },
  { label: 'حریم خصوصی', href: '/privacy-policy' },
  { label: 'شرایط استفاده', href: '/terms-of-service' },
  { label: 'کیت رسانه‌ای', href: '/press-kit' },
];

const contactInfo = {
  email: 'info@helpfuladvertising.com',
  instagram: '@kiandavo',
  instagramUrl: 'https://www.instagram.com/kiandavo',
};

export function FooterSitemap() {
  const footerCategories = getFooterLinks();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-muted/40 pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="inline-block">
                <img 
                  src={logoSvg} 
                  alt="لنگر" 
                  width={140} 
                  height={48} 
                  loading="lazy" 
                  className="h-14 w-auto transition-transform hover:scale-105" 
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                مجموعه‌ای از ابزارهای آنلاین رایگان برای محاسبات، تبدیل‌ها، و کارهای روزمره شما.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Menu Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-sm tracking-wide">منو</h3>
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-sm tracking-wide">اطلاعات</h3>
              <ul className="space-y-3">
                {legalItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-sm tracking-wide">تماس با ما</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/60 group-hover:bg-primary/10 transition-colors">
                      <Mail size={14} className="group-hover:text-primary transition-colors" />
                    </span>
                    <span className="text-xs">{contactInfo.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/60 group-hover:bg-primary/10 transition-colors">
                      <Instagram size={14} className="group-hover:text-primary transition-colors" />
                    </span>
                    <span className="flex items-center gap-1">
                      {contactInfo.instagram}
                      <ExternalLink size={10} className="opacity-50" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Tools Sitemap - Collapsible on Mobile */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <h3 className="font-bold text-foreground text-sm tracking-wide mb-6">ابزارهای محبوب</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-3">
              {footerCategories.slice(0, 3).flatMap((category) =>
                category.links.slice(0, 4).map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                    title={link.title}
                  >
                    {link.text}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© ۱۴۰۴ لنگر</span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1">
                  ساخته شده با
                  <Heart size={12} className="text-red-500 fill-red-500" />
                  در ایران
                </span>
              </div>

              {/* Quick Category Links */}
              <div className="flex items-center gap-4 text-xs">
                <Link to="/calculators" className="text-muted-foreground hover:text-primary transition-colors">
                  محاسبه‌گرها
                </Link>
                <span className="text-border/50">•</span>
                <Link to="/text-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  ابزار متن
                </Link>
                <span className="text-border/50">•</span>
                <Link to="/readings" className="text-muted-foreground hover:text-primary transition-colors">
                  فال
                </Link>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
              >
                <span>بازگشت به بالا</span>
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
