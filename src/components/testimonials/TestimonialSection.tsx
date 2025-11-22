import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  tool?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'محمد رضایی',
    role: 'دانشجوی مهندسی',
    content: 'از محاسبه‌گرهای لنگر برای انجام تکالیف دانشگاهی استفاده می‌کنم. خیلی سریع و دقیق هستند و رابط کاربری فارسی‌شان عالی است.',
    rating: 5,
    tool: 'محاسبه‌گر علمی'
  },
  {
    name: 'زهرا احمدی',
    role: 'طراح گرافیک',
    content: 'ابزارهای ویرایش تصویر لنگر برای کارهای روزمره‌ام کافی هستند. به خصوص فشرده‌ساز تصویر که حجم فایل‌ها را بدون افت کیفیت کاهش می‌دهد.',
    rating: 5,
    tool: 'فشرده‌ساز تصویر'
  },
  {
    name: 'علی کریمی',
    role: 'صاحب کسب‌وکار',
    content: 'برای محاسبه وام و سود بانکی از لنگر استفاده می‌کنم. خیلی به من کمک کرده تا تصمیمات مالی بهتری بگیرم.',
    rating: 5,
    tool: 'محاسبه‌گر وام'
  },
  {
    name: 'فاطمه موسوی',
    role: 'مدیر سئو',
    content: 'ابزارهای سئو لنگر برای بهینه‌سازی سایت‌های مشتریانم بسیار مفید هستند. به خصوص تولیدکننده متا تگ که زمان زیادی را برایم صرفه‌جویی می‌کند.',
    rating: 5,
    tool: 'ابزارهای سئو'
  },
  {
    name: 'حسین نوری',
    role: 'برنامه‌نویس',
    content: 'ابزارهای متنی مثل Base64 و JSON Formatter خیلی در کار روزمره‌ام به من کمک می‌کنند. همیشه لنگر را باز دارم!',
    rating: 5,
    tool: 'ابزارهای متنی'
  },
  {
    name: 'مریم صادقی',
    role: 'معلم',
    content: 'از محاسبه‌گر معدل برای محاسبه نمرات دانش‌آموزان استفاده می‌کنم. خیلی راحت و سریع است و وقت من را صرفه‌جویی می‌کند.',
    rating: 5,
    tool: 'محاسبه‌گر معدل'
  }
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">نظرات کاربران</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ببینید کاربران درباره ابزارهای لنگر چه می‌گویند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-2" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {testimonial.content}
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  {testimonial.tool && (
                    <div className="text-xs text-primary mt-1">
                      استفاده از: {testimonial.tool}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">+100</div>
            <div className="text-sm text-muted-foreground">ابزار رایگان</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">+50,000</div>
            <div className="text-sm text-muted-foreground">کاربر فعال</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
            <div className="text-sm text-muted-foreground">امتیاز کاربران</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">در دسترس</div>
          </div>
        </div>
      </div>
    </section>
  );
};
