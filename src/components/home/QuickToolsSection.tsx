import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Palette, Lock, QrCode, FileText, Image, Star, Code } from 'lucide-react';

export const QuickToolsSection = () => {
  const quickTools = [
    {
      name: 'محاسبه‌گر BMI',
      slug: 'bmi-calculator',
      icon: Calculator,
      color: 'bg-blue-500',
      description: 'محاسبه شاخص توده بدنی',
      category: 'محاسبات'
    },
    {
      name: 'شمارنده متن',
      slug: 'text-counter',
      icon: FileText,
      color: 'bg-amber-500',
      description: 'شمارش کلمات، حروف و خطوط',
      category: 'متن'
    },
    {
      name: 'تولید QR کد',
      slug: 'qr-code-generator', 
      icon: QrCode,
      color: 'bg-green-500',
      description: 'ایجاد QR کد از متن یا لینک',
      category: 'ابزار کاربردی'
    },
    {
      name: 'فشرده‌ساز تصویر',
      slug: 'image-compressor',
      icon: Image,
      color: 'bg-indigo-500',
      description: 'کاهش حجم عکس بدون کم شدن کیفیت',
      category: 'تصویر'
    },
    {
      name: 'محاسبه‌گر درصد',
      slug: 'percentage-calculator',
      icon: Calculator,
      color: 'bg-teal-500',
      description: 'انواع محاسبات درصدی',
      category: 'محاسبات'
    },
    {
      name: 'تولید رمز عبور',
      slug: 'password-generator',
      icon: Lock,
      color: 'bg-red-500',
      description: 'ایجاد رمز عبور قوی و امن',
      category: 'امنیت'
    },
    {
      name: 'انکودر Base64',
      slug: 'base64-encoder-decoder',
      icon: Code,
      color: 'bg-purple-500',
      description: 'تبدیل متن به Base64 و بالعکس',
      category: 'متن'
    },
    {
      name: 'تبدیل واحدها',
      slug: 'unit-converter',
      icon: Calculator,
      color: 'bg-violet-500',
      description: 'تبدیل طول، وزن، حجم و دما',
      category: 'محاسبات'
    }
  ];

  return (
    <section className="mb-20 sm:mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Star size={16} />
          دسترسی سریع
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          ابزارهای کاربردی روزانه
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ابزارهای پایه‌ای که در زندگی روزمره به آن‌ها نیاز دارید
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={`/tool/${tool.slug}`}
              className="group block p-6 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.5s ease-out forwards'
              }}
            >
              <div className="text-center">
                <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md mb-3 inline-block">
                  {tool.category}
                </span>
                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};