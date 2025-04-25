
import React from 'react';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-4 sm:py-6 bg-white border-t">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right gap-3">
          <p className="text-gray-500 text-sm mb-1 md:mb-0">
            تمامی ابزارها رایگان و بدون نیاز به ثبت‌نام ارائه می‌شوند.
          </p>
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.instagram.com/kiandavo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <p className="text-gray-500 text-xs sm:text-sm">© ۱۴۰۴ لنگر - مجموعه ابزار</p>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">ساخته شده با ❤️ توسط کیان</p>
        </div>
      </div>
    </footer>
  );
}
