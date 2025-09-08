import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  FileText, 
  Image, 
  Code, 
  QrCode, 
  Lock, 
  Percent,
  Palette,
  Archive,
  Crop,
  Search,
  Hash
} from 'lucide-react';

export const EssentialToolsSection = () => {
  const essentialTools = [
    {
      name: 'محاسبه‌گر BMI',
      slug: 'bmi-calculator',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      category: 'محاسبات',
      description: 'شاخص توده بدنی و وزن ایده‌آل',
      popularity: '۹۸%'
    },
    {
      name: 'تولید QR کد',
      slug: 'qr-code-generator',
      icon: QrCode,
      color: 'from-green-500 to-green-600',
      category: 'ابزار کاربردی',
      description: 'ایجاد QR کد از متن، لینک و شماره',
      popularity: '۹۵%'
    },
    {
      name: 'شمارنده متن',
      slug: 'text-counter',
      icon: FileText,
      color: 'from-amber-500 to-orange-500',
      category: 'متن',
      description: 'شمارش کلمات، حروف و خطوط',
      popularity: '۹۲%'
    },
    {
      name: 'فشرده‌ساز تصویر',
      slug: 'image-compressor',
      icon: Archive,
      color: 'from-purple-500 to-purple-600',
      category: 'تصویر',
      description: 'کاهش حجم عکس بدون کم شدن کیفیت',
      popularity: '۹۰%'
    },
    {
      name: 'محاسبه‌گر درصد',
      slug: 'percentage-calculator',
      icon: Percent,
      color: 'from-teal-500 to-teal-600',
      category: 'محاسبات',
      description: 'انواع محاسبات درصدی',
      popularity: '۸۸%'
    },
    {
      name: 'تولید رمز عبور',
      slug: 'password-generator',
      icon: Lock,
      color: 'from-red-500 to-red-600',
      category: 'امنیت',
      description: 'ایجاد رمز عبور قوی و امن',
      popularity: '۸۶%'
    },
    {
      name: 'تبدیل واحدها',
      slug: 'unit-converter',
      icon: Calculator,
      color: 'from-indigo-500 to-indigo-600',
      category: 'محاسبات',
      description: 'تبدیل طول، وزن، حجم و دما',
      popularity: '۸۵%'
    },
    {
      name: 'پالت رنگ',
      slug: 'color-palette-generator',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      category: 'طراحی',
      description: 'ترکیب‌های رنگی هماهنگ',
      popularity: '۸۳%'
    },
    {
      name: 'برش‌دهنده تصویر',
      slug: 'image-cropper',
      icon: Crop,
      color: 'from-cyan-500 to-blue-500',
      category: 'تصویر',
      description: 'برش دقیق تصاویر',
      popularity: '۸۱%'
    },
    {
      name: 'کوتاه کننده لینک',
      slug: 'auto-shorten-link',
      icon: Hash,
      color: 'from-violet-500 to-purple-500',
      category: 'سئو',
      description: 'کوتاه کردن لینک‌های طولانی',
      popularity: '۷۹%'
    },
    {
      name: 'انکودر Base64',
      slug: 'base64-encoder-decoder',
      icon: Code,
      color: 'from-emerald-500 to-green-500',
      category: 'متن',
      description: 'تبدیل متن به Base64',
      popularity: '۷۷%'
    },
    {
      name: 'چگالی کلمات کلیدی',
      slug: 'keyword-density',
      icon: Search,
      color: 'from-orange-500 to-red-500',
      category: 'سئو',
      description: 'تحلیل کلمات کلیدی متن',
      popularity: '۷۵%'
    }
  ];

  return (
    <section className="mb-20 sm:mb-32">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Calculator size={16} />
          ابزارهای ضروری
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          پرکاربردترین ابزارهای آنلاین
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ابزارهایی که هر روز میلیون‌ها نفر از آن‌ها استفاده می‌کنند
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {essentialTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={`/tool/${tool.slug}`}
              className="group block relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {tool.description}
                </p>

                {/* Popularity indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`}></div>
                    <span className="text-xs text-muted-foreground">محبوبیت</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{tool.popularity}</span>
                </div>

                {/* Hover effect bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <Link 
          to="/category/calculators"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Calculator size={18} />
          مشاهده تمام ابزارهای محاسباتی
        </Link>
      </div>
    </section>
  );
};