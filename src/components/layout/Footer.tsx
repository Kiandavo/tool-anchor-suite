
import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSvg from '@/assets/logo.svg';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoSvg} alt="لنگر" className="h-8 w-8" />
              <h3 className="text-lg font-bold text-foreground">لنگر</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              بزرگترین مجموعه ابزارهای آنلاین فارسی با بیش از 80 ابزار رایگان و 500,000 کاربر فعال
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a 
                href="mailto:info@helpfuladvertising.com" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                📧 info@helpfuladvertising.com
              </a>
              <a 
                href="https://www.instagram.com/kiandavo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Instagram size={16} />
                @kiandavo
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link to="/all-tools" className="text-muted-foreground hover:text-primary transition-colors">
                  همه ابزارها
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          {/* Tool Categories */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">دسته‌بندی ابزارها</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  محاسبگرها
                </Link>
              </li>
              <li>
                <Link to="/category/text" className="text-muted-foreground hover:text-primary transition-colors">
                  ابزار متن
                </Link>
              </li>
              <li>
                <Link to="/category/image" className="text-muted-foreground hover:text-primary transition-colors">
                  ابزار تصویر
                </Link>
              </li>
              <li>
                <Link to="/category/seo" className="text-muted-foreground hover:text-primary transition-colors">
                  ابزار سئو
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">قوانین و مقررات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  سیاست حریم خصوصی
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                  شرایط استفاده
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">🔒 امنیت SSL</p>
              <p className="text-xs text-muted-foreground mb-2">🛡️ حفظ حریم خصوصی</p>
              <p className="text-xs text-muted-foreground">✅ 98% رضایت کاربران</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-right">
            © ۱۴۰۴ لنگر - تمامی حقوق محفوظ است
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>ساخته شده با</span>
            <span className="text-red-500">❤️</span>
            <span>برای کاربران فارسی‌زبان</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
