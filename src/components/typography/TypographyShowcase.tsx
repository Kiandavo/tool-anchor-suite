import React from 'react';

/**
 * Typography Showcase Component
 * Demonstrates the new Persian font hierarchy and typography system
 */
export const TypographyShowcase = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 persian-optimized">
      {/* Modern Typography Header */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-heading mb-6">نمایش سیستم تایپوگرافی مدرن</h2>
        
        <div className="space-y-4">
          <h1 className="text-display-2xl font-display smooth-fonts">
            لنگر - فونت مدرن Manrope
          </h1>
          <h2 className="text-display-lg font-display smooth-fonts">
            عنوان اصلی با فونت Manrope
          </h2>
          <h3 className="text-heading-xl font-heading">
            زیرعنوان با فونت Inter + Vazirmatn
          </h3>
        </div>
      </section>

      {/* Modern Body Text */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">متن اصلی مدرن</h3>
        <div className="space-y-4">
          <p className="text-body-xl font-body leading-relaxed-plus">
            این متن نمونه‌ای از فونت Inter + Vazirmatn است که برای متن‌های اصلی و محتوای وب‌سایت استفاده می‌شود. این فونت بسیار مدرن، خوانا و بهینه است.
          </p>
          <p className="text-body-lg font-body">
            متن با اندازه متوسط که برای توضیحات و محتوای معمولی با فونت Inter استفاده می‌شود.
          </p>
          <p className="text-support-lg font-support">
            این متن با فونت Shabnam نوشته شده که برای متن‌های پشتیبان و توضیحات اضافی استفاده می‌شود.
          </p>
          <code className="text-mono font-mono bg-muted/50 px-2 py-1 rounded">
            کد و اعداد با فونت JetBrains Mono: 123456789
          </code>
        </div>
      </section>

      {/* Modern Font Features */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">فونت‌های مدرن جدید</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">Manrope (عناوین)</h4>
            <p className="text-support-sm font-support">
              فونت مدرن برای عناوین و تأکیدات مهم
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">Inter (متن اصلی)</h4>
            <p className="text-support-sm font-support">
              بهترین فونت مدرن برای متن اصلی
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">Shabnam (متن پشتیبان)</h4>
            <p className="text-support-sm font-support">
              فونت زیبای فارسی برای متن‌های پشتیبان
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">JetBrains Mono (کد)</h4>
            <p className="text-mono text-support-sm font-mono">
              فونت monospace مدرن: 123456789
            </p>
          </div>
        </div>
      </section>

      {/* Numbers showcase */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">نمایش اعداد مدرن</h3>
        <div className="flex gap-8">
          <div>
            <h4 className="text-heading-sm font-heading mb-2">اعداد فارسی</h4>
            <p className="text-body-lg font-body persian-numbers">
              ۱۲۳۴۵۶۷۸۹۰
            </p>
          </div>
          <div>
            <h4 className="text-heading-sm font-heading mb-2">اعداد لاتین</h4>
            <p className="text-mono font-mono latin-numbers">
              1234567890
            </p>
          </div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl">
        <h3 className="text-heading-md font-heading mb-3">
          ویژگی‌های بهینه‌سازی عملکرد مدرن
        </h3>
        <ul className="space-y-2 text-support-md font-support">
          <li>• فونت‌های variable با کیفیت بالا و حجم کم</li>
          <li>• بهینه‌سازی با font-display: swap</li>
          <li>• OpenType features برای رندر بهتر</li>
          <li>• بارگذاری فوری از Google Fonts</li>
          <li>• پشتیبانی کامل از Persian + Latin</li>
          <li>• Anti-aliasing پیشرفته برای وضوح بهتر</li>
        </ul>
      </section>
    </div>
  );
};