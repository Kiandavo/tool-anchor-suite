
import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSvg from '@/assets/logo.svg';

export function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-right">
          {/* Left side - Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="/category/calculator" className="text-muted-foreground hover:text-primary transition-colors font-support">
              ماشین‌حساب
            </Link>
            <span className="text-border">•</span>
            <Link to="/category/text" className="text-muted-foreground hover:text-primary transition-colors font-support">
              ابزار متن
            </Link>
            <span className="text-border">•</span>
            <Link to="/category/image" className="text-muted-foreground hover:text-primary transition-colors font-support">
              ابزار تصویر
            </Link>
            <span className="text-border">•</span>
            <Link to="/all-tools" className="text-primary hover:text-primary/80 transition-colors font-support">
              همه ابزارها
            </Link>
          </div>

          {/* Center - Copyright */}
          <div className="text-muted-foreground text-sm font-support">
            © ۱۴۰۴ لنگر - تمامی حقوق محفوظ است
          </div>

          {/* Right side - Social & Contact */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/kiandavo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-200 text-sm font-support"
              aria-label="اینستاگرام لنگر"
            >
              <Instagram size={16} />
              <span>اینستاگرام</span>
            </a>
            <span className="text-border">•</span>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm font-support">
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
