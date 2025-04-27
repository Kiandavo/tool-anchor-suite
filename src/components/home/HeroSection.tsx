
import React from 'react';

export const HeroSection = () => {
  return (
    <section className="text-center py-20 sm:py-28 mb-16 relative overflow-hidden animate-fade-in">
      {/* Apple-style layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/5 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-apple-black leading-tight">
          لنگر - مجموعه ابزارهای آنلاین
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-apple-gray font-light px-4 mb-12">
          بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. 
          از ابزارهای متنی و تصویری گرفته تا محاسبه‌گرها و ابزارهای SEO، همه چیز در یک پلتفرم ساده.
        </p>
      </div>

      {/* Apple-style subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apple-gray/10 to-transparent" />
    </section>
  );
};
