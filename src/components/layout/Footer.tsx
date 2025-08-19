
import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto py-12 sm:py-16 glass-nav border-t border-border/50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1200px]">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">لنگر</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              مجموعه جامع ابزارهای آنلاین فارسی برای تسهیل کارهای روزمره و افزایش بهره‌وری
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">دسترسی سریع</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/all-tools" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  همه ابزارها
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  وبلاگ
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  درباره ما
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  سوالات متداول
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">قوانین</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  حریم خصوصی
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  شرایط استفاده
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg">ارتباط با ما</h4>
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.instagram.com/kiandavo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                aria-label="اینستاگرام لنگر"
              >
                <Instagram size={22} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              آنلاین و فعال
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © ۱۴۰۴ لنگر - مجموعه ابزار. تمامی حقوق محفوظ است.
          </p>
          <p className="text-primary text-xs sm:text-sm font-medium flex items-center gap-1">
            ساخته شده با <span className="text-red-500 animate-pulse">❤️</span> توسط کیان
          </p>
        </div>
      </div>
    </footer>
  );
}
