
import React from 'react';

export const SimpleHero: React.FC = () => {
  return (
    <section className="py-16 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          لنگر - مجموعه ابزارهای آنلاین
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          پلتفرم جامع ابزارهای رایگان آنلاین با تمرکز بر فرهنگ و زبان فارسی
        </p>
        
        <p className="text-lg text-gray-700 mb-8">
          بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg inline-block">
          <p className="text-blue-800 font-medium">
            وب‌سایت در حال بهینه‌سازی است
          </p>
        </div>
      </div>
    </section>
  );
};
