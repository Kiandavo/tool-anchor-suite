
import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto py-16 sm:py-20 glass-nav border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">لنگر</h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                مجموعه جامع ابزارهای آنلاین فارسی برای تسهیل کارهای روزمره و افزایش بهره‌وری
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              آنلاین و فعال
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">ابزارها</h4>
            <div className="flex flex-col space-y-4">
              <Link to="/category/calculator" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  ماشین‌حساب
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/category/text" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  ابزار متن
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/category/image" className="text-muted-foreground hover:text-primary text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  ابزار تصویر
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
              <Link to="/all-tools" className="text-primary hover:text-primary/80 font-medium text-sm transition-all duration-200 hover:translate-x-1 group">
                <span className="relative">
                  همه ابزارها ←
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Information Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">اطلاعات</h4>
            <div className="flex flex-col space-y-4">
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

          {/* Contact & Legal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">ارتباط با ما</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.instagram.com/kiandavo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 p-3 rounded-xl hover:bg-primary/10 group"
                  aria-label="اینستاگرام لنگر"
                >
                  <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">اینستاگرام</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-medium text-foreground">قوانین</h5>
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
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right space-y-2">
            <p className="text-muted-foreground text-sm">
              © ۱۴۰۴ لنگر - مجموعه ابزار. تمامی حقوق محفوظ است.
            </p>
            <p className="text-muted-foreground text-xs">
              تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام
            </p>
          </div>
          <p className="text-primary text-sm font-medium flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            ساخته شده با <span className="text-red-500 animate-pulse text-base">❤️</span> توسط کیان
          </p>
        </div>
      </div>
    </footer>
  );
}
