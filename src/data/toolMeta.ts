/**
 * Tool metadata registry
 * Stores job titles, use cases, and FAQs for each tool
 * This drives the ToolPageBlueprint layout
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolMeta {
  jobTitle: string;
  useCases: string;
  faq: FAQItem[];
}

// Common FAQ items reused across tools
const commonFAQ = {
  free: {
    question: 'آیا این ابزار رایگان است؟',
    answer: 'بله، کاملاً رایگان و بدون نیاز به ثبت‌نام.'
  },
  privacy: {
    question: 'آیا اطلاعات من ذخیره می‌شود؟',
    answer: 'خیر، تمام پردازش‌ها در مرورگر شما انجام می‌شود و داده‌ای ذخیره نمی‌شود.'
  },
  mobile: {
    question: 'آیا روی موبایل کار می‌کند؟',
    answer: 'بله، برای تمام دستگاه‌ها (موبایل، تبلت، دسکتاپ) بهینه شده است.'
  }
};

export const toolMetaRegistry: Record<string, ToolMeta> = {
  // === CALCULATORS ===
  'bmi-calculator': {
    jobTitle: 'محاسبه‌گر BMI شاخص توده بدنی آنلاین',
    useCases: 'با وارد کردن قد و وزن، شاخص توده بدنی خود را محاسبه کنید و وضعیت سلامت وزن خود را بدانید.',
    faq: [
      { question: 'BMI چیست؟', answer: 'شاخص توده بدنی (BMI) معیاری برای سنجش تناسب وزن با قد است. از تقسیم وزن (کیلوگرم) بر مجذور قد (متر) به دست می‌آید.' },
      { question: 'BMI نرمال چند است؟', answer: 'BMI بین ۱۸.۵ تا ۲۴.۹ نرمال محسوب می‌شود. زیر ۱۸.۵ کم‌وزن و بالای ۲۵ اضافه‌وزن است.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'percentage-calculator': {
    jobTitle: 'محاسبه‌گر درصد آنلاین',
    useCases: 'محاسبه درصد از عدد، درصد تغییرات، و تبدیل کسر به درصد. مناسب برای محاسبات مالی و تحصیلی.',
    faq: [
      { question: 'چگونه درصد محاسبه می‌شود؟', answer: 'درصد از تقسیم عدد مورد نظر بر عدد کل و ضرب در ۱۰۰ به دست می‌آید.' },
      { question: 'آیا می‌توان درصد تغییرات را هم محاسبه کرد؟', answer: 'بله، با وارد کردن مقدار اولیه و نهایی، درصد افزایش یا کاهش محاسبه می‌شود.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'discount-calculator': {
    jobTitle: 'محاسبه‌گر تخفیف و قیمت نهایی',
    useCases: 'محاسبه سریع قیمت پس از تخفیف. مناسب برای خرید آنلاین، فروشگاه‌ها و مقایسه قیمت‌ها.',
    faq: [
      { question: 'چگونه تخفیف محاسبه می‌شود؟', answer: 'قیمت اصلی ضرب در درصد تخفیف تقسیم بر ۱۰۰ = مبلغ تخفیف. قیمت نهایی = قیمت اصلی منهای مبلغ تخفیف.' },
      { question: 'آیا می‌توان چند تخفیف را با هم محاسبه کرد؟', answer: 'بله، برای تخفیف‌های پشت‌سرهم، هر بار نتیجه را وارد کنید.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'age-calculator': {
    jobTitle: 'محاسبه‌گر سن دقیق آنلاین',
    useCases: 'محاسبه سن دقیق به سال، ماه و روز با تاریخ شمسی یا میلادی. مناسب برای محاسبه سن کودک، سن بازنشستگی و...',
    faq: [
      { question: 'آیا تاریخ شمسی پشتیبانی می‌شود؟', answer: 'بله، می‌توانید تاریخ تولد را به شمسی یا میلادی وارد کنید.' },
      { question: 'دقت محاسبه سن چقدر است؟', answer: 'سن تا روز دقیق محاسبه می‌شود و تعداد روزهای باقیمانده تا تولد بعدی هم نمایش داده می‌شود.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'loan-calculator': {
    jobTitle: 'محاسبه‌گر اقساط وام بانکی',
    useCases: 'محاسبه مبلغ اقساط ماهانه، کل سود و جمع بازپرداخت وام. مناسب برای وام مسکن، خودرو و شخصی.',
    faq: [
      { question: 'نرخ سود سالانه چگونه محاسبه می‌شود؟', answer: 'نرخ سود وارد شده به صورت سالانه است و سیستم آن را به ماهانه تبدیل می‌کند.' },
      { question: 'آیا وام‌های بدون سود هم قابل محاسبه است؟', answer: 'بله، برای وام قرض‌الحسنه نرخ سود را صفر وارد کنید.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'tip-calculator': {
    jobTitle: 'محاسبه‌گر انعام رستوران',
    useCases: 'محاسبه سریع انعام بر اساس درصد دلخواه. مناسب برای رستوران، کافه و سفر به خارج.',
    faq: [
      { question: 'انعام معمول چند درصد است؟', answer: 'در ایران ۵ تا ۱۰ درصد، در آمریکا ۱۵ تا ۲۰ درصد و در اروپا ۱۰ تا ۱۵ درصد رایج است.' },
      { question: 'آیا تقسیم بین افراد هم محاسبه می‌شود؟', answer: 'بله، تعداد نفرات را وارد کنید تا سهم هر نفر محاسبه شود.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },

  // === TEXT TOOLS ===
  'word-counter': {
    jobTitle: 'شمارنده کلمات و کاراکترهای متن',
    useCases: 'شمارش تعداد کلمات، کاراکترها، جملات و پاراگراف‌ها. مناسب برای نویسندگان، دانشجویان و تولید محتوا.',
    faq: [
      { question: 'چه مواردی شمارش می‌شود؟', answer: 'تعداد کلمات، کاراکترها (با و بدون فاصله)، جملات، پاراگراف‌ها و تخمین زمان مطالعه.' },
      { question: 'آیا متن فارسی پشتیبانی می‌شود؟', answer: 'بله، برای متن فارسی و عربی بهینه شده است.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'json-formatter': {
    jobTitle: 'فرمت‌دهی و زیباسازی JSON آنلاین',
    useCases: 'فرمت‌دهی، اعتبارسنجی و زیباسازی کد JSON. مناسب برای برنامه‌نویسان و توسعه‌دهندگان API.',
    faq: [
      { question: 'آیا خطاهای JSON نمایش داده می‌شود؟', answer: 'بله، اگر JSON نامعتبر باشد، خطا و محل آن نمایش داده می‌شود.' },
      { question: 'آیا می‌توان JSON را فشرده کرد؟', answer: 'بله، هم فرمت‌دهی با فاصله و هم فشرده‌سازی در یک خط موجود است.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'password-generator': {
    jobTitle: 'ساخت رمز عبور قوی و امن',
    useCases: 'تولید رمز عبور تصادفی با حروف، اعداد و نمادها. مناسب برای حساب‌های کاربری، ایمیل و بانک.',
    faq: [
      { question: 'رمز عبور قوی چند کاراکتر باید باشد؟', answer: 'حداقل ۱۲ کاراکتر توصیه می‌شود. ترکیب حروف بزرگ، کوچک، اعداد و نمادها امنیت را افزایش می‌دهد.' },
      { question: 'آیا رمز عبور ذخیره می‌شود؟', answer: 'خیر، رمز فقط در مرورگر شما تولید می‌شود و هیچ‌جا ذخیره نمی‌شود.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },

  // === IMAGE TOOLS ===
  'image-compressor': {
    jobTitle: 'فشرده‌سازی تصویر آنلاین',
    useCases: 'کاهش حجم تصاویر با حفظ کیفیت. مناسب برای وب‌سایت، ایمیل و شبکه‌های اجتماعی.',
    faq: [
      { question: 'چقدر حجم کاهش می‌یابد؟', answer: 'بسته به تصویر، ۳۰ تا ۸۰ درصد کاهش حجم با حفظ کیفیت قابل قبول.' },
      { question: 'چه فرمت‌هایی پشتیبانی می‌شود؟', answer: 'JPEG، PNG، WebP و GIF پشتیبانی می‌شوند.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },
  'qr-code-generator': {
    jobTitle: 'ساخت QR Code آنلاین',
    useCases: 'تولید کد QR برای لینک، متن، شماره تلفن یا ایمیل. مناسب برای کارت ویزیت، تبلیغات و منوی رستوران.',
    faq: [
      { question: 'آیا می‌توان رنگ QR Code را تغییر داد؟', answer: 'بله، رنگ پس‌زمینه و پیش‌زمینه قابل تنظیم است.' },
      { question: 'خروجی با چه فرمتی است؟', answer: 'تصویر PNG با کیفیت بالا قابل دانلود است.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  },

  // === READINGS / ASTROLOGY ===
  'hafez-faal': {
    jobTitle: 'فال حافظ آنلاین با تفسیر کامل',
    useCases: 'گرفتن فال از دیوان حافظ شیرازی با معنی و تفسیر. مناسب برای لحظات تأمل و طلب راهنمایی.',
    faq: [
      { question: 'فال حافظ چگونه کار می‌کند؟', answer: 'یک غزل تصادفی از دیوان حافظ انتخاب می‌شود و تفسیر آن نمایش داده می‌شود.' },
      { question: 'آیا می‌توان نیت کرد؟', answer: 'بله، قبل از گرفتن فال نیت خود را در دل بگویید.' },
      commonFAQ.free,
      commonFAQ.mobile
    ]
  },
  'tarot': {
    jobTitle: 'فال تاروت آنلاین رایگان',
    useCases: 'کشیدن کارت تاروت با تفسیر فارسی. مناسب برای خودشناسی و یافتن بینش جدید.',
    faq: [
      { question: 'فال تاروت چیست؟', answer: 'تاروت مجموعه ۷۸ کارت نمادین است که برای تفکر، خودشناسی و یافتن دیدگاه جدید استفاده می‌شود.' },
      { question: 'آیا تفسیر فارسی دارد؟', answer: 'بله، تمام کارت‌ها تفسیر کامل فارسی دارند.' },
      commonFAQ.free,
      commonFAQ.mobile
    ]
  },

  // === SEO & WEB ===
  'meta-tag-generator': {
    jobTitle: 'ساخت متاتگ‌های سئو',
    useCases: 'تولید تگ‌های title، description و Open Graph. مناسب برای بهینه‌سازی صفحات وب برای گوگل.',
    faq: [
      { question: 'متاتگ چیست؟', answer: 'متاتگ‌ها اطلاعاتی هستند که به موتورهای جستجو کمک می‌کنند صفحه شما را بهتر درک کنند.' },
      { question: 'چه تگ‌هایی تولید می‌شود؟', answer: 'تگ‌های title، meta description، canonical، Open Graph و Twitter Card.' },
      commonFAQ.free,
      commonFAQ.privacy
    ]
  }
};

// Helper to get metadata with fallback
export const getToolMeta = (slug: string, toolName: string, toolDescription: string): ToolMeta => {
  if (toolMetaRegistry[slug]) {
    return toolMetaRegistry[slug];
  }
  
  // Default fallback
  return {
    jobTitle: toolName,
    useCases: toolDescription,
    faq: [commonFAQ.free, commonFAQ.privacy, commonFAQ.mobile]
  };
};
