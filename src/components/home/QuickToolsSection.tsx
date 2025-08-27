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
      description: 'محاسبه شاخص توده بدنی'
    },
    {
      name: 'تولید QR کد',
      slug: 'qr-code-generator', 
      icon: QrCode,
      color: 'bg-green-500',
      description: 'ایجاد QR کد از متن یا لینک'
    },
    {
      name: 'تولید رمز عبور',
      slug: 'password-generator',
      icon: Lock,
      color: 'bg-red-500',
      description: 'ایجاد رمز عبور قوی و امن'
    },
    {
      name: 'پالت رنگ',
      slug: 'color-palette-generator',
      icon: Palette,
      color: 'bg-purple-500',
      description: 'تولید ترکیب رنگ‌های هماهنگ'
    },
    {
      name: 'تحلیل متن',
      slug: 'text-analyzer',
      icon: FileText,
      color: 'bg-amber-500',
      description: 'شمارش کلمات و تحلیل متن'
    },
    {
      name: 'تبدیل SVG به PNG',
      slug: 'svg-to-png-converter',
      icon: Image,
      color: 'bg-indigo-500',
      description: 'تبدیل فایل‌های وکتور به تصویر'
    },
    {
      name: 'فال حافظ',
      slug: 'hafez-fortune',
      icon: Star,
      color: 'bg-rose-500',
      description: 'فال و غزل حافظ شیرازی'
    },
    {
      name: 'فرمت JSON',
      slug: 'json-formatter',
      icon: Code,
      color: 'bg-teal-500',
      description: 'تنظیم و بررسی فرمت JSON'
    }
  ];

  return (
    <section className="mb-20 sm:mb-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          دسترسی سریع به ابزارهای پرکاربرد
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ابزارهای محبوب که بیشتر کاربران از آن‌ها استفاده می‌کنند
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