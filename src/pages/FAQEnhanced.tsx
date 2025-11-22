import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle } from 'lucide-react';

export default function FAQEnhanced() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'عمومی',
      questions: [
        {
          question: 'آیا استفاده از ابزارهای لنگر رایگان است؟',
          answer: 'بله، تمام ابزارهای لنگر کاملاً رایگان هستند و نیازی به پرداخت یا ثبت‌نام ندارید. ما معتقدیم که دسترسی به ابزارهای کاربردی باید برای همه آسان باشد.'
        },
        {
          question: 'آیا نیاز به ثبت‌نام دارم؟',
          answer: 'خیر، هیچ نیازی به ثبت‌نام یا ایجاد حساب کاربری نیست. می‌توانید بلافاصله از تمام ابزارها استفاده کنید.'
        },
        {
          question: 'چند ابزار در لنگر موجود است؟',
          answer: 'لنگر بیش از ۱۰۰ ابزار آنلاین مختلف در زمینه‌های محاسبات، تبدیل متن، ویرایش تصویر، سئو، فرهنگ فارسی و فال و طالع‌بینی ارائه می‌دهد.'
        },
        {
          question: 'آیا ابزارها روی موبایل کار می‌کنند؟',
          answer: 'بله، تمام ابزارهای لنگر طراحی ریسپانسیو دارند و روی موبایل، تبلت و دسکتاپ به خوبی کار می‌کنند. شما می‌توانید در هر زمان و هر مکان از ابزارها استفاده کنید.'
        },
        {
          question: 'آیا می‌توانم ابزارها را آفلاین استفاده کنم؟',
          answer: 'بیشتر ابزارها پس از بارگذاری اولیه، بدون اتصال به اینترنت قابل استفاده هستند. با این حال، برخی ابزارهایی که نیاز به داده‌های لحظه‌ای دارند (مانند تبدیل ارز) به اینترنت نیاز دارند.'
        },
        {
          question: 'چگونه می‌توانم ابزار مورد نظرم را پیدا کنم؟',
          answer: 'می‌توانید از نوار جستجو در بالای سایت استفاده کنید، یا از طریق دسته‌بندی‌ها ابزار مورد نظر خود را پیدا کنید. همچنین در صفحه «همه ابزارها» می‌توانید لیست کامل را ببینید.'
        }
      ]
    },
    {
      category: 'امنیت و حریم خصوصی',
      questions: [
        {
          question: 'آیا اطلاعات من امن است؟',
          answer: 'بله، تمام محاسبات در مرورگر خود شما انجام می‌شود و هیچ اطلاعاتی به سرورهای ما ارسال یا ذخیره نمی‌شود. ما به حریم خصوصی کاربران احترام می‌گذاریم.'
        },
        {
          question: 'آیا داده‌های من ذخیره می‌شود؟',
          answer: 'خیر، ما هیچ داده‌ای از شما ذخیره نمی‌کنیم. تمام اطلاعات فقط در مرورگر شما باقی می‌ماند و پس از بستن صفحه یا پاک کردن کش مرورگر، به طور کامل حذف می‌شوند.'
        },
        {
          question: 'آیا لنگر از کوکی استفاده می‌کند؟',
          answer: 'ما فقط از کوکی‌های ضروری برای عملکرد صحیح سایت استفاده می‌کنیم (مانند ذخیره تنظیمات زبان). هیچ کوکی ردیابی یا تبلیغاتی استفاده نمی‌شود.'
        },
        {
          question: 'آیا می‌توانم با اطمینان اطلاعات شخصی وارد کنم؟',
          answer: 'بله، تمام ارتباطات از طریق پروتکل HTTPS رمزگذاری شده انجام می‌شود. با این حال، توصیه می‌کنیم اطلاعات بسیار حساس (مانند رمز عبور) را در هیچ ابزار آنلاینی وارد نکنید.'
        },
        {
          question: 'آیا لنگر اطلاعات من را به شخص ثالث می‌فروشد؟',
          answer: 'قطعاً خیر. ما هیچ اطلاعاتی از شما جمع‌آوری نمی‌کنیم، بنابراین چیزی برای فروش نداریم. حریم خصوصی شما برای ما بسیار مهم است.'
        }
      ]
    },
    {
      category: 'محاسبه‌گرها',
      questions: [
        {
          question: 'آیا محاسبه‌گرها دقیق هستند؟',
          answer: 'بله، تمام محاسبه‌گرهای لنگر با دقت طراحی شده‌اند و از فرمول‌های استاندارد و معتبر استفاده می‌کنند. با این حال، نتایج فقط جنبه مشاوره‌ای دارند و نباید جایگزین مشاوره حرفه‌ای شوند.'
        },
        {
          question: 'آیا محاسبه BMI دقیق است؟',
          answer: 'محاسبه BMI بر اساس فرمول استاندارد جهانی انجام می‌شود. با این حال، BMI تنها یک شاخص است و عوامل دیگری مانند توده عضلانی، سن و جنسیت را در نظر نمی‌گیرد. برای ارزیابی دقیق‌تر با پزشک مشورت کنید.'
        },
        {
          question: 'آیا می‌توانم نتایج محاسبه‌گرها را ذخیره کنم؟',
          answer: 'بله، در اکثر محاسبه‌گرها می‌توانید نتایج را کپی کنید، اسکرین‌شات بگیرید یا با دیگران به اشتراک بگذارید. برخی ابزارها امکان دانلود PDF نتایج را نیز دارند.'
        },
        {
          question: 'محاسبه‌گر وام چگونه کار می‌کند؟',
          answer: 'محاسبه‌گر وام بر اساس مبلغ وام، نرخ بهره و مدت زمان، اقساط ماهانه و کل بهره قابل پرداخت را محاسبه می‌کند. این ابزار برای برنامه‌ریزی مالی و مقایسه شرایط وام‌های مختلف بسیار مفید است.'
        },
        {
          question: 'آیا تبدیل واحدها دقیق است؟',
          answer: 'بله، تمام ضرایب تبدیل از منابع معتبر بین‌المللی گرفته شده‌اند و با دقت بالا محاسبه می‌شوند. شما می‌توانید با اطمینان از این ابزارها در کارهای علمی و حرفه‌ای استفاده کنید.'
        }
      ]
    },
    {
      category: 'ابزارهای متنی',
      questions: [
        {
          question: 'آیا متن من در ابزارهای متنی ذخیره می‌شود؟',
          answer: 'خیر، تمام پردازش‌های متنی در مرورگر شما انجام می‌شود و هیچ متنی به سرور ما ارسال نمی‌شود. متن شما کاملاً خصوصی باقی می‌ماند.'
        },
        {
          question: 'آیا محدودیت طول متن وجود دارد؟',
          answer: 'اکثر ابزارهای متنی محدودیت طول ندارند، اما برای متون بسیار طولانی (بیش از 100,000 کاراکتر) ممکن است مرورگر کمی کند شود. در این موارد پیشنهاد می‌کنیم متن را به بخش‌های کوچک‌تر تقسیم کنید.'
        },
        {
          question: 'آیا از زبان فارسی پشتیبانی می‌شود؟',
          answer: 'بله، تمام ابزارهای متنی از زبان فارسی به طور کامل پشتیبانی می‌کنند و با ویژگی‌های خاص زبان فارسی مانند حروف عربی، اعراب و علائم خاص سازگار هستند.'
        },
        {
          question: 'چگونه می‌توانم متن رمزنگاری شده را دکد کنم؟',
          answer: 'از ابزار Base64 Decoder استفاده کنید. کافی است متن رمزنگاری شده را در کادر وارد کنید و روی دکمه دکد کلیک کنید. متن اصلی به شما نمایش داده خواهد شد.'
        }
      ]
    },
    {
      category: 'ابزارهای تصویر',
      questions: [
        {
          question: 'آیا تصاویر من آپلود می‌شوند؟',
          answer: 'خیر، تمام پردازش‌های تصویر در مرورگر شما انجام می‌شود. تصاویر شما هرگز به سرور ما آپلود نمی‌شوند و کاملاً روی دستگاه خودتان باقی می‌مانند.'
        },
        {
          question: 'چه فرمت‌های تصویری پشتیبانی می‌شود؟',
          answer: 'ما از تمام فرمت‌های رایج تصویر شامل JPG، PNG، GIF، WebP، SVG و BMP پشتیبانی می‌کنیم.'
        },
        {
          question: 'محدودیت حجم تصویر چقدر است؟',
          answer: 'بیشتر ابزارها تا حجم 10 مگابایت را پشتیبانی می‌کنند. برای تصاویر بزرگ‌تر، پیشنهاد می‌کنیم ابتدا از ابزار فشرده‌سازی تصویر استفاده کنید.'
        },
        {
          question: 'آیا کیفیت تصویر در فشرده‌سازی کاهش می‌یابد؟',
          answer: 'شما می‌توانید سطح فشرده‌سازی را خودتان تنظیم کنید. با فشرده‌سازی متوسط، کاهش کیفیت قابل توجه نیست اما حجم به میزان قابل توجهی کاهش می‌یابد.'
        },
        {
          question: 'آیا می‌توانم چند تصویر را همزمان پردازش کنم؟',
          answer: 'بله، برخی از ابزارها مانند فشرده‌ساز تصویر از پردازش دسته‌ای پشتیبانی می‌کنند و می‌توانید چندین تصویر را یکجا آپلود و پردازش کنید.'
        }
      ]
    },
    {
      category: 'ابزارهای سئو',
      questions: [
        {
          question: 'آیا ابزارهای سئو حرفه‌ای هستند؟',
          answer: 'بله، ابزارهای سئو لنگر بر اساس استانداردهای Google و Bing طراحی شده‌اند و برای استفاده حرفه‌ای و بهینه‌سازی وب‌سایت‌ها مناسب هستند.'
        },
        {
          question: 'آیا تگ‌های متا تولید شده استاندارد هستند؟',
          answer: 'بله، تمام تگ‌های متا بر اساس بهترین شیوه‌های سئو و استانداردهای Open Graph و Twitter Card تولید می‌شوند.'
        },
        {
          question: 'چگونه تراکم کلیدواژه را بهینه کنم؟',
          answer: 'ابزار تراکم کلیدواژه به شما نشان می‌دهد که هر کلمه چند بار در متن تکرار شده است. تراکم ایده‌آل بین 1-3% است. اگر بیش از این باشد، ممکن است گوگل آن را spam تشخیص دهد.'
        }
      ]
    },
    {
      category: 'فال و طالع‌بینی',
      questions: [
        {
          question: 'آیا فال‌ها واقعی هستند؟',
          answer: 'فال‌ها جنبه سرگرمی و فرهنگی دارند و نباید به عنوان پیش‌بینی قطعی آینده در نظر گرفته شوند. ما آنها را برای آشنایی با فرهنگ ایرانی و لحظاتی از تفکر درباره زندگی ارائه می‌دهیم.'
        },
        {
          question: 'فال حافظ چگونه کار می‌کند؟',
          answer: 'در فال حافظ، با تمرکز بر سوال خود، یک غزل از دیوان حافظ به صورت تصادفی انتخاب می‌شود. تفسیر این غزل می‌تواند کمک‌کننده در تفکر درباره موضوع مورد نظر شما باشد.'
        },
        {
          question: 'آیا می‌توانم چند بار فال بگیرم؟',
          answer: 'بله، شما می‌توانید هر تعداد که بخواهید فال بگیرید. با این حال، در فرهنگ سنتی توصیه می‌شود که در یک روز یک بار و با تمرکز کامل فال بگیرید.'
        },
        {
          question: 'استخاره چیست؟',
          answer: 'استخاره روشی است که در آن با ذکر نیت و سوال خود، از متون مقدس یا اشعار حافظ یا مولانا کمک می‌گیرید. این یک سنت فرهنگی ایرانی است که برای دریافت راهنمایی معنوی استفاده می‌شود.'
        }
      ]
    },
    {
      category: 'مشکلات فنی',
      questions: [
        {
          question: 'ابزار کار نمی‌کند، چه کار کنم؟',
          answer: 'ابتدا صفحه را رفرش کنید. اگر مشکل حل نشد، کش مرورگر را پاک کنید یا از یک مرورگر دیگر استفاده کنید. اگر مشکل همچنان ادامه داشت، با ما تماس بگیرید.'
        },
        {
          question: 'چرا ابزار خیلی کند است؟',
          answer: 'کندی ممکن است به دلیل اتصال ضعیف اینترنت، حجم زیاد داده‌ها یا مرورگر قدیمی باشد. سعی کنید از آخرین نسخه مرورگر استفاده کنید و تب‌های غیرضروری را ببندید.'
        },
        {
          question: 'کدام مرورگرها پشتیبانی می‌شوند؟',
          answer: 'لنگر با تمام مرورگرهای مدرن شامل Chrome، Firefox، Safari، Edge و Opera سازگار است. توصیه می‌کنیم از آخرین نسخه مرورگر استفاده کنید.'
        },
        {
          question: 'آیا نیاز به نصب چیزی دارم؟',
          answer: 'خیر، هیچ چیزی نیاز به نصب ندارد. تمام ابزارها مستقیماً در مرورگر شما کار می‌کنند و نیازی به دانلود یا نصب نرم‌افزار نیست.'
        }
      ]
    },
    {
      category: 'پشتیبانی و تماس',
      questions: [
        {
          question: 'چگونه می‌توانم با شما تماس بگیرم؟',
          answer: 'می‌توانید از طریق اینستاگرام @kiandavo با ما در ارتباط باشید یا از فرم تماس در صفحه «درباره ما» استفاده کنید.'
        },
        {
          question: 'آیا می‌توانم ابزار جدیدی پیشنهاد دهم؟',
          answer: 'بله، حتماً! ما همیشه به دنبال افزودن ابزارهای جدید و مفید هستیم. پیشنهادات خود را از طریق اینستاگرام یا فرم تماس با ما در میان بگذارید.'
        },
        {
          question: 'چقدر طول می‌کشد تا پاسخ بگیرم؟',
          answer: 'ما سعی می‌کنیم در کمتر از 24 ساعت به پیام‌ها پاسخ دهیم. در روزهای کاری معمولاً پاسخ‌ها سریع‌تر است.'
        },
        {
          question: 'آیا می‌توانم در توسعه لنگر مشارکت کنم؟',
          answer: 'بله، ما همیشه از مشارکت استقبال می‌کنیم. اگر توانایی برنامه‌نویسی، طراحی یا تولید محتوا دارید، با ما تماس بگیرید.'
        }
      ]
    }
  ];

  // Flatten all questions for search
  const allQuestions = faqCategories.flatMap(cat =>
    cat.questions.map(q => ({ ...q, category: cat.category }))
  );

  // Filter questions based on search
  const filteredQuestions = searchQuery
    ? allQuestions.filter(
        q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <Layout>
      <EnhancedSeoHead
        pageType="blog"
        title="سوالات متداول (FAQ) - راهنمای کامل استفاده از لنگر ۲۰۲۵"
        description="پاسخ به بیش از 50 سوال متداول درباره استفاده از ابزارهای لنگر: امنیت، محاسبه‌گرها، ابزارهای متنی، تصویر، سئو و بیشتر ✅"
        keywords="سوالات متداول لنگر, راهنمای استفاده, FAQ, پشتیبانی, کمک"
        canonical="https://langar.co/faq"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-14 w-14 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">سوالات متداول (FAQ)</h1>
          <p className="text-lg text-muted-foreground">
            پاسخ به بیش از 50 سوال متداول درباره استفاده از ابزارهای لنگر
          </p>
        </div>

        {/* Search Box */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="جستجو در سوالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Display filtered or categorized questions */}
        {filteredQuestions ? (
          <Card>
            <CardHeader>
              <CardTitle>نتایج جستجو ({filteredQuestions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredQuestions.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`}>
                    <AccordionTrigger className="text-right text-base font-medium hover:no-underline">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pr-7">
                      <Badge variant="outline" className="mb-2">
                        {faq.category}
                      </Badge>
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {faqCategories.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary">{category.questions.length}</Badge>
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${catIndex}-${index}`}
                      >
                        <AccordionTrigger className="text-right text-base font-medium hover:no-underline">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pr-7">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-2">سوال دیگری دارید؟</h3>
            <p className="text-muted-foreground mb-4">
              اگر پاسخ سوال خود را پیدا نکردید، از طریق اینستاگرام با ما در تماس باشید
            </p>
            <a
              href="https://www.instagram.com/kiandavo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              تماس با پشتیبانی
            </a>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
