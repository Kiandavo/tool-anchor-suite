import React from 'react';

/**
 * Typography Showcase Component
 * Demonstrates the new Persian font hierarchy and typography system
 */
export const TypographyShowcase = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 persian-optimized">
      {/* Display Typography */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-heading mb-6">نمایش فونت‌های جدید</h2>
        
        <div className="space-y-4">
          <h1 className="text-display-2xl font-display smooth-fonts">
            لنگر - نمونه متن بزرگ
          </h1>
          <h2 className="text-display-lg font-display smooth-fonts">
            عنوان اصلی با فونت استعداد
          </h2>
          <h3 className="text-heading-xl font-heading">
            زیرعنوان با فونت وزیرمتن
          </h3>
        </div>
      </section>

      {/* Body Text */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">متن اصلی</h3>
        <div className="space-y-4">
          <p className="text-body-xl font-body leading-relaxed-plus">
            این متن نمونه‌ای از فونت وزیرمتن است که برای متن‌های اصلی و محتوای اصلی وب‌سایت استفاده می‌شود. این فونت مدرن و خوانا است.
          </p>
          <p className="text-body-lg font-body">
            متن با اندازه متوسط که برای توضیحات و محتوای معمولی استفاده می‌شود.
          </p>
          <p className="text-support-lg font-support">
            این متن با فونت ساحل نوشته شده که برای متن‌های پشتیبان و توضیحات اضافی استفاده می‌شود.
          </p>
        </div>
      </section>

      {/* Font Features */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">ویژگی‌های تایپوگرافی</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">فونت استعداد</h4>
            <p className="text-support-sm font-support">
              برای عناوین و تأکیدات مهم
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">فونت وزیرمتن</h4>
            <p className="text-support-sm font-support">
              برای متن اصلی و محتوای اصلی
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">فونت ساحل</h4>
            <p className="text-support-sm font-support">
              برای متن‌های پشتیبان و توضیحات
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="text-heading-sm font-heading mb-2">بهینه‌سازی</h4>
            <p className="text-support-sm font-support">
              بارگذاری سریع و رندر بهینه
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="space-y-4">
        <h3 className="text-heading-md font-heading">نمایش اعداد</h3>
        <div className="flex gap-8">
          <div>
            <h4 className="text-heading-sm font-heading mb-2">اعداد فارسی</h4>
            <p className="text-body-lg font-body persian-numbers">
              ۱۲۳۴۵۶۷۸۹۰
            </p>
          </div>
          <div>
            <h4 className="text-heading-sm font-heading mb-2">اعداد لاتین</h4>
            <p className="text-body-lg font-body latin-numbers">
              1234567890
            </p>
          </div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl">
        <h3 className="text-heading-md font-heading mb-3">
          ویژگی‌های بهینه‌سازی عملکرد
        </h3>
        <ul className="space-y-2 text-support-md font-support">
          <li>• بارگذاری فوری فونت‌های حیاتی</li>
          <li>• پشتیبانی کامل از font-display: swap</li>
          <li>• فونت‌های fallback بهینه</li>
          <li>• کش طولانی‌مدت فونت‌ها</li>
          <li>• رندر anti-aliased برای وضوح بهتر</li>
        </ul>
      </section>
    </div>
  );
};