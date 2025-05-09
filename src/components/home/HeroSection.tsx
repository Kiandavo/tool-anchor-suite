
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="text-center py-20 sm:py-28 mb-12 relative overflow-hidden animate-fade-in">
      {/* Apple-style layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/5 to-transparent opacity-50" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent opacity-30" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-accent/5 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
          لنگر - مجموعه ابزارهای آنلاین
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 font-light px-4 mb-10">
          بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. 
          از ابزارهای متنی و تصویری گرفته تا محاسبه‌گرها و ابزارهای SEO، همه چیز در یک پلتفرم ساده.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            size="lg"
            className="bg-gradient-to-b from-primary to-primary/90 text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] font-medium"
          >
            مشاهده همه ابزارها
            <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-primary/20 text-primary bg-white/80 backdrop-blur-sm rounded-full px-8 shadow-sm hover:shadow-md hover:bg-primary/5 transition-all hover:scale-[1.02] font-medium"
          >
            ابزارهای محبوب
          </Button>
        </div>
      </div>

      {/* Apple-style subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
};
