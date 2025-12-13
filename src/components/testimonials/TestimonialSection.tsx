import React, { useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialStats } from './TestimonialStats';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  tool?: string;
  avatar?: string;
  verified?: boolean;
  date?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'محمد رضایی',
    role: 'دانشجوی مهندسی کامپیوتر',
    content: 'از محاسبه‌گرهای لنگر برای انجام تکالیف دانشگاهی استفاده می‌کنم. خیلی سریع و دقیق هستند و رابط کاربری فارسی‌شان واقعاً عالی است. به همه دانشجویان توصیه می‌کنم!',
    rating: 5,
    tool: 'محاسبه‌گر علمی',
    verified: true,
    date: 'دی ۱۴۰۴'
  },
  {
    name: 'زهرا احمدی',
    role: 'طراح گرافیک و هنرمند دیجیتال',
    content: 'ابزارهای ویرایش تصویر لنگر برای کارهای روزمره‌ام کافی هستند. به خصوص فشرده‌ساز تصویر که حجم فایل‌ها را بدون افت کیفیت کاهش می‌دهد. واقعاً حرفه‌ای است!',
    rating: 5,
    tool: 'فشرده‌ساز تصویر',
    verified: true,
    date: 'آذر ۱۴۰۴'
  },
  {
    name: 'علی کریمی',
    role: 'صاحب کسب‌وکار آنلاین',
    content: 'برای محاسبه وام و سود بانکی از لنگر استفاده می‌کنم. خیلی به من کمک کرده تا تصمیمات مالی بهتری بگیرم. رایگان بودن و دقت بالا دو امتیاز مثبت این ابزار است.',
    rating: 5,
    tool: 'محاسبه‌گر وام',
    verified: true,
    date: 'آبان ۱۴۰۴'
  },
  {
    name: 'فاطمه موسوی',
    role: 'مدیر سئو و بازاریابی دیجیتال',
    content: 'ابزارهای سئو لنگر برای بهینه‌سازی سایت‌های مشتریانم بسیار مفید هستند. به خصوص تولیدکننده متا تگ که زمان زیادی را برایم صرفه‌جویی می‌کند. بهترین ابزار رایگان فارسی!',
    rating: 5,
    tool: 'ابزارهای سئو',
    verified: true,
    date: 'مهر ۱۴۰۴'
  },
  {
    name: 'حسین نوری',
    role: 'برنامه‌نویس و توسعه‌دهنده',
    content: 'ابزارهای متنی مثل Base64 و JSON Formatter خیلی در کار روزمره‌ام به من کمک می‌کنند. سرعت بالا، رابط کاربری ساده و قابلیت‌های حرفه‌ای. همیشه لنگر را باز دارم!',
    rating: 5,
    tool: 'ابزارهای متنی',
    verified: true,
    date: 'شهریور ۱۴۰۴'
  },
  {
    name: 'مریم صادقی',
    role: 'معلم و مربی آموزشگاه',
    content: 'از محاسبه‌گر معدل برای محاسبه نمرات دانش‌آموزان استفاده می‌کنم. خیلی راحت و سریع است و وقت من را صرفه‌جویی می‌کند. ابزاری عالی برای معلمان و دانش‌آموزان!',
    rating: 5,
    tool: 'محاسبه‌گر معدل',
    verified: true,
    date: 'مرداد ۱۴۰۴'
  },
  {
    name: 'رضا احمدپور',
    role: 'عکاس و فتوگرافر حرفه‌ای',
    content: 'تبدیل فرمت تصویر و کاهش حجم عکس‌ها با لنگر خیلی راحت شده. کیفیت تصاویر حفظ می‌شود و سرعت پردازش فوق‌العاده است. برای همه عکاسان توصیه می‌کنم!',
    rating: 5,
    tool: 'تبدیل فرمت تصویر',
    verified: true,
    date: 'تیر ۱۴۰۴'
  },
  {
    name: 'سارا محمدی',
    role: 'مدیر محتوا و نویسنده',
    content: 'شمارنده کلمات و تحلیل متن لنگر برای بررسی مقالاتم عالی است. می‌تونم سریع تعداد کلمات و کاراکترها را بشمارم. ابزاری ضروری برای هر نویسنده‌ای!',
    rating: 5,
    tool: 'شمارنده متن',
    verified: true,
    date: 'خرداد ۱۴۰۴'
  },
  {
    name: 'امیر حسینی',
    role: 'مدیر رستوران و کافه',
    content: 'محاسبه‌گر انعام و حساب‌های مالی خیلی به من کمک می‌کنه. محاسبات دقیق و سریع بدون نیاز به ماشین حساب. واقعاً عالیه!',
    rating: 5,
    tool: 'محاسبه‌گر انعام',
    verified: true,
    date: 'اردیبهشت ۱۴۰۴'
  }
];

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">نظرات کاربران</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            کاربران درباره لنگر چه می‌گویند؟
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto persian-leading-relaxed">
            تجربه هزاران کاربر راضی از استفاده ابزارهای حرفه‌ای و رایگان لنگر
          </p>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={currentIndex + index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Testimonials Carousel - Mobile */}
        <div className="md:hidden mb-12">
          <div className="px-4">
            <TestimonialCard {...testimonials[currentIndex % testimonials.length]} />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`نظر ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TestimonialStats />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-muted-foreground mb-4">
            شما هم می‌توانید جزو هزاران کاربر راضی لنگر باشید
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            شروع رایگان
          </Button>
        </div>
      </div>
    </section>
  );
};
