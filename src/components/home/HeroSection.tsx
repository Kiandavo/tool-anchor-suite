
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  console.log('HeroSection rendering optimized...');
  
  return (
    <section className="py-20 sm:py-28 mb-12 relative overflow-hidden bg-white">
      {/* Light theme background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
      
      {/* Simple animated circles */}
      <div className="absolute top-16 right-[10%] w-48 h-48 rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/30 blur-3xl animate-pulse" />
      <div className="absolute bottom-16 left-[10%] w-56 h-56 rounded-full bg-gradient-to-tr from-green-100/40 to-blue-100/30 blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            لنگر - مجموعه ابزارهای آنلاین
          </h1>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-gray-600 font-medium mb-6">
            پلتفرم جامع ابزارهای رایگان آنلاین با تمرکز بر فرهنگ و زبان فارسی
          </p>
          
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-700 font-light mb-8">
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/category/calculators" className="block group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">ابزارهای تخصصی و کاربردی</h3>
                <p className="text-gray-600 text-sm">مجموعه کامل از ابزارهای محاسباتی، طراحی، متنی و تصویری برای کارهای روزانه</p>
              </div>
            </Link>
            
            <Link to="/category/persian-cultural" className="block group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Globe size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">فرهنگ و زبان فارسی</h3>
                <p className="text-gray-600 text-sm">ابزارهایی برای آشنایی با فرهنگ ایرانی، آشپزی، ادبیات، موسیقی و جشن‌های سنتی</p>
              </div>
            </Link>
            
            <Link to="/category/readings" className="block group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">طالع‌بینی و فال</h3>
                <p className="text-gray-600 text-sm">انواع ابزارهای فال حافظ، طالع‌بینی، استخاره، فال تاروت و سایر خوانش‌های سنتی</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-medium text-lg px-8 py-4" asChild>
              <Link to="/all-tools">
                مشاهده همه ابزارها
                <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/90 backdrop-blur-sm hover:shadow-md hover:bg-blue-50/50 transition-all hover:scale-[1.02] font-medium text-lg px-8 py-4" asChild>
              <Link to="/#popular-tools">
                ابزارهای محبوب
              </Link>
            </Button>
          </div>
          
          <div className="max-w-lg mx-auto h-1.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-12 rounded-full" />
        </div>
      </div>
    </section>
  );
};
