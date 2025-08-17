
import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto py-8 sm:py-12 glass-nav">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">لنگر</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              مجموعه جامع ابزارهای آنلاین فارسی برای تسهیل کارهای روزمره
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">دسترسی سریع</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/all-tools" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                همه ابزارها
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                وبلاگ
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                درباره ما
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                سوالات متداول
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">قوانین</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                حریم خصوصی
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                شرایط استفاده
              </Link>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">ارتباط با ما</h4>
            <div className="flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/kiandavo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="اینستاگرام لنگر"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام
            </p>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © ۱۴۰۴ لنگر - مجموعه ابزار. تمامی حقوق محفوظ است.
          </p>
          <p className="text-accent text-xs sm:text-sm font-medium">
            ساخته شده با ❤️ توسط کیان
          </p>
        </div>
      </div>
    </footer>
  );
}
