import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutUs() {
  return (
    <Layout>
      <SeoHead 
        title="درباره لنگر - مجموعه ابزارهای آنلاین فارسی"
        description="لنگر بزرگترین مجموعه ابزارهای آنلاین فارسی است که برای تسهیل کارهای روزمره، آموزشی و تجاری طراحی شده است."
        keywords="درباره لنگر، ابزار آنلاین، ابزار فارسی، محاسبگر، ابزار متن، تیم لنگر"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">درباره لنگر</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مجموعه‌ای جامع از ابزارهای آنلاین فارسی برای تسهیل کارهای روزمره، آموزشی و تجاری
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">ماموریت ما</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                لنگر با هدف ارائه ابزارهای کاربردی و رایگان به زبان فارسی راه‌اندازی شده است. 
                ما معتقدیم که هر کاربر فارسی‌زبان باید به راحتی بتواند از ابزارهای دیجیتال مدرن 
                برای انجام کارهای روزمره خود استفاده کند، بدون نیاز به مراجعه به سایت‌های خارجی 
                یا نصب نرم‌افزارهای پیچیده.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">چرا لنگر؟</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full"></Badge>
                    کاملاً رایگان و بدون نیاز به ثبت‌نام
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full"></Badge>
                    طراحی مخصوص کاربران فارسی‌زبان
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full"></Badge>
                    واکنش‌گرا و سازگار با موبایل
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full"></Badge>
                    سرعت بالا و عملکرد بهینه
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">دسته‌بندی ابزارها</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">محاسبگرها</Badge>
                  <Badge variant="outline">ابزار متن</Badge>
                  <Badge variant="outline">ابزار تصویر</Badge>
                  <Badge variant="outline">فرهنگ فارسی</Badge>
                  <Badge variant="outline">ابزار SEO</Badge>
                  <Badge variant="outline">بهره‌وری</Badge>
                  <Badge variant="outline">طراحی</Badge>
                  <Badge variant="outline">فال و استخاره</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">تیم لنگر</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                تیم لنگر متشکل از توسعه‌دهندگان و طراحان با تجربه است که با شناخت عمیق از 
                نیازهای کاربران فارسی‌زبان، ابزارهایی کاربردی و موثر ارائه می‌دهند.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ما همیشه در تلاش برای بهبود و افزودن ابزارهای جدید هستیم و از بازخوردهای 
                شما استقبال می‌کنیم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">تماس با ما</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">پیشنهادات و انتقادات</h3>
                  <p className="text-muted-foreground">
                    برای ارسال پیشنهادات خود یا گزارش مشکلات، با ما در ارتباط باشید.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">درخواست ابزار جدید</h3>
                  <p className="text-muted-foreground">
                    اگر به ابزار خاصی نیاز دارید، آن را به ما معرفی کنید تا در اولویت قرار دهیم.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">
              🚀 با لنگر، کارهایتان را سریع‌تر و راحت‌تر انجام دهید
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}