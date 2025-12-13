import React from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle2, BookOpen, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getToolsByCategory } from '@/data/tools';

export default function CalculatorsGuide() {
  const calculatorTools = getToolsByCategory('calculators');

  return (
    <Layout>
      <EnhancedSeoHead
        pageType="blog"
        title="راهنمای جامع محاسبه‌گرهای آنلاین | +50 ابزار محاسباتی | لنگر"
        description="راهنمای کامل استفاده از محاسبه‌گرهای آنلاین: BMI، درصد، تبدیل واحد، وام، بیمه و 50+ ابزار دیگر. سریع و دقیق ✅"
        keywords="محاسبه‌گر آنلاین, راهنمای محاسبه‌گر, ماشین حساب, محاسبه BMI, محاسبه درصد, تبدیل واحد, لنگر"
        canonical="https://laangar.com/guides/calculators"
      />

      <article className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Calculator className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            راهنمای جامع محاسبه‌گرهای آنلاین
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            همه چیز درباره محاسبه‌گرهای آنلاین: انواع، کاربردها، راهنمای استفاده و بهترین ابزارها
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <Badge variant="secondary">راهنمای کامل</Badge>
            <Badge variant="outline">+50 ابزار</Badge>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              مقدمه
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              محاسبه‌گرهای آنلاین ابزارهای کاربردی هستند که زندگی روزمره را ساده‌تر می‌کنند. از محاسبه BMI برای سلامتی گرفته تا محاسبه وام برای تصمیمات مالی، این ابزارها در هر زمینه‌ای کمک‌کننده هستند. در این راهنما با بیش از 50 محاسبه‌گر مختلف و نحوه استفاده از آنها آشنا می‌شوید.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              لنگر مجموعه‌ای گسترده از محاسبه‌گرهای فارسی را ارائه می‌دهد. تمام ابزارها با دقت طراحی شده‌اند تا نتایج دقیق و قابل اعتماد ارائه دهند.
            </p>
          </CardContent>
        </Card>

        {/* Types of Calculators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              انواع محاسبه‌گرها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Health Calculators */}
              <div>
                <h3 className="text-lg font-bold mb-3">۱. محاسبه‌گرهای سلامتی</h3>
                <p className="text-muted-foreground mb-3">
                  محاسبه‌گرهای سلامتی به شما کمک می‌کنند تا سلامت خود را بهتر مدیریت کنید و از وضعیت بدنی‌تان آگاه شوید.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه BMI (شاخص توده بدنی):</strong> یکی از مهم‌ترین شاخص‌های سلامت که نسبت وزن به قد را نشان می‌دهد و به شما می‌گوید آیا در محدوده وزن ایده‌آل هستید یا نه.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه کالری:</strong> برای کسانی که می‌خواهند وزن کم یا زیاد کنند، این محاسبه‌گر تعداد کالری مورد نیاز روزانه را محاسبه می‌کند.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه تاریخ تولد:</strong> برای محاسبه دقیق سن و تاریخ‌های مرتبط.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Financial Calculators */}
              <div>
                <h3 className="text-lg font-bold mb-3">۲. محاسبه‌گرهای مالی</h3>
                <p className="text-muted-foreground mb-3">
                  محاسبه‌گرهای مالی برای مدیریت بهتر امور مالی و تصمیم‌گیری‌های هوشمندانه ضروری هستند.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه وام:</strong> اقساط ماهانه، کل بهره و مدت زمان بازپرداخت وام را محاسبه می‌کند. برای وام مسکن، خودرو یا هر نوع وام دیگری مفید است.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه تخفیف:</strong> درصد تخفیف و قیمت نهایی محصولات را به سرعت حساب می‌کند.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه سود بانکی:</strong> سود حاصل از سپرده‌گذاری را در بازه‌های زمانی مختلف محاسبه می‌کند.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه درصد:</strong> هر نوع محاسبه درصدی از افزایش، کاهش تا درصد عدد.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Unit Converters */}
              <div>
                <h3 className="text-lg font-bold mb-3">۳. تبدیل‌کننده‌های واحد</h3>
                <p className="text-muted-foreground mb-3">
                  تبدیل واحدهای مختلف به یکدیگر یکی از نیازهای رایج در زندگی روزمره است.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>تبدیل طول:</strong> متر به کیلومتر، اینچ به سانتی‌متر و...
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>تبدیل وزن:</strong> کیلوگرم به پوند، گرم به اونس و...
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>تبدیل دما:</strong> سلسیوس به فارنهایت و کلوین
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>تبدیل ارز:</strong> تبدیل ارزهای مختلف با نرخ روز
                    </div>
                  </li>
                </ul>
              </div>

              {/* Academic Calculators */}
              <div>
                <h3 className="text-lg font-bold mb-3">۴. محاسبه‌گرهای آموزشی</h3>
                <p className="text-muted-foreground mb-3">
                  برای دانشجویان و دانش‌آموزان بسیار مفید هستند.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبه معدل:</strong> محاسبه معدل دانشگاهی و مدرسه
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>محاسبات ریاضی:</strong> معادلات، توان، جذر و...
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              چگونه از محاسبه‌گرها استفاده کنیم؟
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                استفاده از محاسبه‌گرهای لنگر بسیار ساده است. مراحل زیر برای تمام محاسبه‌گرها مشترک است:
              </p>
              <ol className="space-y-3">
                {[
                  { step: 1, text: 'محاسبه‌گر مورد نظر خود را از لیست انتخاب کنید' },
                  { step: 2, text: 'اطلاعات مورد نیاز را در فیلدهای مشخص شده وارد کنید' },
                  { step: 3, text: 'روی دکمه «محاسبه» یا «اجرا» کلیک کنید' },
                  { step: 4, text: 'نتیجه بلافاصله نمایش داده می‌شود' },
                  { step: 5, text: 'در صورت نیاز، نتیجه را کپی یا ذخیره کنید' }
                ].map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <span className="text-foreground pt-1">{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              مزایای استفاده از محاسبه‌گرهای لنگر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '✅ در دسترس همه کاربران',
                '🚀 سرعت بالا و نتایج آنی',
                '🎯 دقت بالا در محاسبات',
                '📱 سازگار با موبایل، تبلت و دسکتاپ',
                '🇮🇷 پشتیبانی کامل از زبان فارسی',
                '🔒 پردازش امن در مرورگر شما',
                '⚡ آماده استفاده بدون پیش‌نیاز',
                '🔄 به‌روزرسانی مداوم ابزارها',
                '📊 نمایش جزئیات کامل محاسبات',
                '💾 امکان ذخیره و اشتراک‌گذاری نتایج'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Calculators List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>لیست کامل محاسبه‌گرهای لنگر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calculatorTools.map((tool) => (
                <Link
                  key={tool.slug}
                  to={`/tool/${tool.slug}`}
                  className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="font-medium text-sm group-hover:text-primary">
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tool.description.slice(0, 50)}...
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>نتیجه‌گیری</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              محاسبه‌گرهای آنلاین ابزارهای ضروری برای زندگی مدرن هستند. لنگر با ارائه بیش از 50 محاسبه‌گر رایگان و فارسی، سعی دارد نیازهای روزمره شما را برطرف کند. تمام این ابزارها با دقت طراحی شده‌اند تا نتایج دقیق و سریع ارائه دهند. از محاسبه BMI برای سلامتی گرفته تا محاسبه وام برای تصمیمات مالی، همه چیز در یک مکان در دسترس شماست. همین حالا شروع کنید و از قدرت محاسبه‌گرهای لنگر بهره‌مند شوید!
            </p>
          </CardContent>
        </Card>
      </article>
    </Layout>
  );
}
