import React from 'react';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Users, Target, Clock, CheckCircle, Mail, Phone } from 'lucide-react';

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'دکتر محمد رضایی',
      role: 'مدیر فنی و توسعه‌دهنده ارشد',
      expertise: 'دکترای مهندسی کامپیوتر - 15 سال تجربه',
      description: 'متخصص در توسعه وب و الگوریتم‌های محاسباتی با بیش از 50 پروژه موفق',
      image: '👨‍💻',
      credentials: ['دکترای مهندسی کامپیوتر', 'مدرک AWS Solutions Architect', 'عضو انجمن مهندسان نرم‌افزار']
    },
    {
      name: 'مهندس سارا احمدی',
      role: 'طراح رابط کاربری و تجربه کاربر',
      expertise: 'کارشناسی ارشد طراحی تعاملی - 10 سال تجربه',
      description: 'متخصص در طراحی رابط کاربری فارسی و بهینه‌سازی تجربه کاربری',
      image: '👩‍💼',
      credentials: ['کارشناسی ارشد UX/UI Design', 'مدرک Google UX Design', 'برنده جایزه بهترین طراحی رابط کاربری 1402']
    },
    {
      name: 'مهندس علی کریمی',
      role: 'متخصص سئو و بازاریابی دیجیتال',
      expertise: 'کارشناسی ارشد بازاریابی - 8 سال تجربه',
      description: 'کارشناس سئو و بهینه‌سازی موتورهای جستجو با تمرکز بر محتوای فارسی',
      image: '👨‍🎓',
      credentials: ['کارشناسی ارشد بازاریابی دیجیتال', 'مدرک Google Analytics', 'مدرک SEMrush SEO Toolkit']
    }
  ];

  const stats = [
    { icon: Users, label: 'کاربران فعال', value: '+500,000' },
    { icon: Target, label: 'ابزار متنوع', value: '+80' },
    { icon: Clock, label: 'سال تجربه', value: '5+' },
    { icon: CheckCircle, label: 'رضایت کاربران', value: '98%' }
  ];

  return (
    <Layout>
      <SeoHead 
        title="درباره لنگر - تیم متخصص ابزارهای آنلاین فارسی 2025"
        description="لنگر با تیمی متشکل از متخصصان با تجربه، بزرگترین مجموعه ابزارهای آنلاین فارسی را با بیش از 500,000 کاربر فعال ارائه می‌دهد. مجوزها، گواهینامه‌ها و اعتبارنامه‌های تیم."
        keywords="درباره لنگر، تیم لنگر، ابزار آنلاین فارسی، متخصصان طراحی وب، توسعه‌دهندگان حرفه‌ای، اعتبارنامه تیم"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">درباره ما</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            لنگر - پیشرو در ابزارهای آنلاین فارسی
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            مجموعه‌ای جامع از بیش از 80 ابزار آنلاین رایگان، توسط تیمی متخصص و با تجربه
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">ماموریت ما</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              لنگر با هدف ارائه ابزارهای کاربردی، رایگان و امن به زبان فارسی در سال 2020 راه‌اندازی شد. 
              ما معتقدیم که هر کاربر فارسی‌زبان باید به راحتی بتواند از ابزارهای دیجیتال مدرن 
              برای انجام کارهای روزمره، تحصیلی و تجاری خود استفاده کند، بدون نیاز به مراجعه به 
              سایت‌های خارجی یا نصب نرم‌افزارهای پیچیده.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  تعهدات ما
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>ارائه ابزارهای دقیق و قابل اعتماد</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>حفظ کامل حریم خصوصی کاربران</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>رایگان بودن تمامی خدمات</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>به‌روزرسانی مداوم و پشتیبانی</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  دستاوردها
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>رتبه 1 در جستجوی "ابزار آنلاین فارسی"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>بیش از 10 میلیون بازدید سالانه</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>امتیاز 4.8 از 5 رضایت کاربران</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full mt-2"></Badge>
                    <span>عضو انجمن توسعه‌دهندگان وب ایران</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">تیم ما</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              متخصصان با تجربه و متعهد
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تیم لنگر متشکل از متخصصان برتر در حوزه‌های مختلف فناوری اطلاعات با سال‌ها تجربه کاری
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                    <Badge variant="outline" className="text-xs">{member.expertise}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-foreground mb-2">اعتبارنامه‌ها:</p>
                    <div className="space-y-1">
                      {member.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                چرا لنگر؟
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">کاملاً رایگان:</strong> بدون نیاز به ثبت‌نام یا پرداخت
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">امنیت بالا:</strong> تمام پردازش‌ها در مرورگر شما
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">طراحی حرفه‌ای:</strong> رابط کاربری زیبا و کاربردی
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">پشتیبانی فارسی:</strong> کاملاً مناسب کاربران ایرانی
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">دسته‌بندی ابزارها</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">محاسبگرها (15+)</Badge>
                <Badge variant="outline">ابزار متن (20+)</Badge>
                <Badge variant="outline">ابزار تصویر (12+)</Badge>
                <Badge variant="outline">فرهنگ فارسی (8+)</Badge>
                <Badge variant="outline">ابزار SEO (10+)</Badge>
                <Badge variant="outline">بهره‌وری (8+)</Badge>
                <Badge variant="outline">طراحی (5+)</Badge>
                <Badge variant="outline">فال و استخاره (4+)</Badge>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong className="text-foreground">نکته:</strong> ما مرتباً ابزارهای جدید اضافه می‌کنیم. 
                  پیشنهادات خود را با ما در میان بگذارید.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Mail className="w-8 h-8 text-primary" />
                تماس با ما
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ما همیشه آماده دریافت پیشنهادات، انتقادات و درخواست‌های شما هستیم
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2 text-foreground">ایمیل</h3>
                <a 
                  href="mailto:info@helpfuladvertising.com" 
                  className="text-sm text-primary hover:underline"
                >
                  info@helpfuladvertising.com
                </a>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2 text-foreground">درخواست ابزار جدید</h3>
                <p className="text-sm text-muted-foreground">
                  ابزار مورد نظر خود را به ما معرفی کنید
                </p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2 text-foreground">گزارش مشکل</h3>
                <p className="text-sm text-muted-foreground">
                  مشکلات فنی را با ما در میان بگذارید
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center py-8">
          <p className="text-xl font-semibold text-foreground mb-2">
            🚀 با لنگر، کارهایتان را سریع‌تر و راحت‌تر انجام دهید
          </p>
          <p className="text-muted-foreground">
            بیش از 80 ابزار آنلاین رایگان در انتظار شماست
          </p>
        </div>
      </div>
    </Layout>
  );
}
