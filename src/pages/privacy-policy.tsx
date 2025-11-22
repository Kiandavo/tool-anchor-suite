import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SeoHead 
        title="سیاست حریم خصوصی - لنگر"
        description="سیاست حریم خصوصی وب‌سایت لنگر - نحوه جمع‌آوری، استفاده و محافظت از اطلاعات شخصی کاربران"
        canonical="https://laangar.com/privacy-policy"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">سیاست حریم خصوصی</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">مقدمه</h2>
            <p className="text-muted-foreground leading-relaxed">
              وب‌سایت لنگر (laangar.com) متعهد به حفاظت از حریم خصوصی کاربران خود است. 
              این سیاست نحوه جمع‌آوری، استفاده، و محافظت از اطلاعات شما را توضیح می‌دهد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">اطلاعات جمع‌آوری شده</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium">اطلاعات خودکار:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>آدرس IP</li>
                <li>نوع مرورگر و سیستم عامل</li>
                <li>صفحات بازدید شده و زمان بازدید</li>
                <li>کوکی‌ها برای بهبود تجربه کاربری</li>
              </ul>
              
              <h3 className="text-xl font-medium">اطلاعات ارائه شده توسط کاربر:</h3>
              <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
                <li>داده‌های وارد شده در ابزارهای آنلاین (محاسبات، متن‌ها، تصاویر)</li>
                <li>هیچ اطلاع شخصی‌ای دائمی ذخیره نمی‌شود</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">نحوه استفاده از اطلاعات</h2>
            <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
              <li>بهبود کیفیت خدمات و ابزارهای ارائه شده</li>
              <li>آنالیز ترافیک وب‌سایت</li>
              <li>نمایش تبلیغات مرتبط از طریق Google AdSense</li>
              <li>پاسخ به درخواست‌های پشتیبانی</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">کوکی‌ها</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ما از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کنیم:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>کوکی‌های ضروری:</strong> برای عملکرد صحیح وب‌سایت</li>
                <li><strong>کوکی‌های آنالیتیک:</strong> برای بررسی آمار بازدید</li>
                <li><strong>کوکی‌های تبلیغاتی:</strong> برای نمایش تبلیغات مرتبط</li>
              </ul>
              <p>
                شما می‌توانید کوکی‌ها را از طریق تنظیمات مرورگر خود مدیریت کنید.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Google AdSense</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                این وب‌سایت از Google AdSense برای نمایش تبلیغات استفاده می‌کند. Google ممکن است:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li>از کوکی‌ها برای نمایش تبلیغات مرتبط استفاده کند</li>
                <li>اطلاعات غیرشخصی در مورد بازدیدهای شما جمع‌آوری کند</li>
                <li>تبلیغات را بر اساس علایق شما شخصی‌سازی کند</li>
              </ul>
              <p>
                برای اطلاعات بیشتر، 
                <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">
                  سیاست حریم خصوصی Google
                </a> 
                را مطالعه کنید.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">امنیت اطلاعات</h2>
            <p className="text-muted-foreground leading-relaxed">
              ما تمام تلاش خود را برای محافظت از اطلاعات شما انجام می‌دهیم. 
              تمام محاسبات در مرورگر شما انجام می‌شود و اطلاعات شخصی در سرورهای ما ذخیره نمی‌شود.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">حقوق کاربران</h2>
            <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
              <li>دسترسی به اطلاعات جمع‌آوری شده</li>
              <li>درخواست تصحیح یا حذف اطلاعات</li>
              <li>انصراف از دریافت اطلاعات تبلیغاتی</li>
              <li>غیرفعال کردن کوکی‌ها</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">تغییرات در سیاست</h2>
            <p className="text-muted-foreground leading-relaxed">
              این سیاست ممکن است به‌روزرسانی شود. تغییرات مهم از طریق وب‌سایت اطلاع‌رسانی خواهد شد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">تماس با ما</h2>
            <p className="text-muted-foreground leading-relaxed">
              برای سوالات مربوط به حریم خصوصی، از طریق صفحه تماس با ما در ارتباط باشید.
            </p>
          </section>

          <div className="text-sm text-muted-foreground mt-8 pt-4 border-t border-border">
            آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;