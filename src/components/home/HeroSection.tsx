
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="text-center py-20 sm:py-28 mb-12 relative overflow-hidden animate-fade-in">
      {/* Sophisticated layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/10 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-apple-purple/5 to-transparent opacity-40" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-apple-green/5 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <div className="neo-glass max-w-4xl mx-auto px-6 py-10 rounded-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
            لنگر - مجموعه ابزارهای آنلاین
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 font-light px-4 mb-10">
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. 
            از ابزارهای متنی و تصویری گرفته تا محاسبه‌گرها و ابزارهای SEO، همه چیز در یک پلتفرم ساده.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              size="apple"
              variant="apple"
              className="shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium"
            >
              مشاهده همه ابزارها
              <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
            </Button>
            <Button 
              variant="apple-outline"
              size="apple"
              className="shadow-sm hover:shadow-md hover:bg-primary/5 transition-all hover:scale-[1.02] font-medium"
            >
              ابزارهای محبوب
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
};
