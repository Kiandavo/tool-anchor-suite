
import React from 'react';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-6 sm:py-8 glass-nav">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center text-center md:text-right gap-3">
          <p className="text-gray-600 text-sm mb-1 md:mb-0 max-w-md">
            تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام ارائه می‌شوند.
          </p>
          <div className="icon-text gap-3">
            <a 
              href="https://www.instagram.com/kiandavo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-accent transition-colors"
              aria-label="اینستاگرام لنگر"
            >
              <Instagram size={20} />
            </a>
            <p className="text-gray-600 text-xs sm:text-sm">© ۱۴۰۴ لنگر - مجموعه ابزار</p>
          </div>
          <p className="text-accent text-xs sm:text-sm font-medium">ساخته شده با ❤️ توسط کیان</p>
        </div>
      </div>
    </footer>
  );
}
