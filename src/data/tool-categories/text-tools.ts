import { Tool } from '@/types/tool-types';

export const textTools: Tool[] = [
  {
    id: "1",
    slug: "text-counter",
    name: "شمارنده متن",
    category: "text",
    description: "شمارش تعداد کلمات و حروف متن",
    isNew: false,
    icon: "pilcrow"
  },
  {
    id: "2",
    slug: "case-converter",
    name: "تبدیل کننده حروف",
    category: "text",
    description: "تغییر حالت حروف متن (بزرگ، کوچک و ...)",
    isNew: false,
    icon: "arrow-up-down"
  },
  {
    id: "3",
    slug: "remove-empty-lines",
    name: "حذف خطوط خالی",
    category: "text",
    description: "حذف خطوط خالی و اضافی از متن",
    isNew: false,
    icon: "minus"
  },
  {
    id: "4",
    slug: "text-reverse",
    name: "معکوس کننده متن",
    category: "text",
    description: "معکوس کردن ترتیب حروف یا کلمات متن",
    isNew: false,
    icon: "rotate-ccw"
  },
  {
    id: "5",
    slug: "text-repeater",
    name: "تکرار کننده متن",
    category: "text",
    description: "تکرار یک متن به تعداد دلخواه",
    isNew: false,
    icon: "redo"
  },
  {
    id: "7",
    slug: "random-text-generator",
    name: "تولید کننده متن تصادفی",
    category: "text",
    description: "ایجاد متن تصادفی برای نمونه سازی و تست",
    isNew: false,
    icon: "dice"
  },
  {
    id: "8",
    slug: "quotes-generator",
    name: "تولید کننده نقل قول",
    category: "text",
    description: "نمایش نقل قول های تصادفی از افراد مشهور",
    isNew: false,
    icon: "open-quote"
  },
  {
    id: "9",
    slug: "persian-text-analyzer",
    name: "تحلیلگر متن فارسی",
    category: "text",
    description: "تحلیل و بررسی ویژگی های متن فارسی",
    isNew: false,
    icon: "activity"
  },
  {
    id: "10",
    slug: "persian-word-counter",
    name: "شمارشگر کلمات فارسی",
    category: "text",
    description: "شمارش تعداد کلمات در متن فارسی",
    isNew: false,
    icon: "list"
  },
  {
    id: "74",
    slug: "url-encoder",
    name: "انکودر URL",
    category: "text",
    description: "تبدیل متن به فرمت URL-encoded",
    isNew: false,
    icon: "code"
  },
  {
    id: "75",
    slug: "url-decoder",
    name: "دی‌کودر URL",
    category: "text",
    description: "تبدیل URL-encoded به متن اصلی",
    isNew: false,
    icon: "code"
  },
  {
    id: "76",
    slug: "html-encoder",
    name: "انکودر HTML",
    category: "text",
    description: "تبدیل متن به فرمت HTML-encoded",
    isNew: false,
    icon: "code"
  },
  {
    id: "78",
    slug: "html-decoder",
    name: "دی‌کودر HTML",
    category: "text",
    description: "تبدیل HTML-encoded به متن اصلی",
    isNew: false,
    icon: "code"
  },
  {
    id: "79",
    slug: "base64-encoder",
    name: "انکودر Base64",
    category: "text",
    description: "تبدیل متن به فرمت Base64",
    isNew: false,
    icon: "code"
  },
  {
    id: "80",
    slug: "base64-decoder",
    name: "دی‌کودر Base64",
    category: "text",
    description: "تبدیل Base64 به متن اصلی",
    isNew: false,
    icon: "code"
  },
  {
    id: "81",
    slug: "json-formatter",
    name: "فرمت‌دهی JSON",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد JSON",
    isNew: false,
    icon: "code"
  },
  {
    id: "82",
    slug: "css-formatter",
    name: "فرمت‌دهی CSS",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد CSS",
    isNew: false,
    icon: "code"
  },
  {
    id: "83",
    slug: "javascript-formatter",
    name: "فرمت‌دهی JavaScript",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد JavaScript",
    isNew: false,
    icon: "code"
  },
  {
    id: "84",
    slug: "sql-formatter",
    name: "فرمت‌دهی SQL",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد SQL",
    isNew: false,
    icon: "code"
  },
  {
    id: "85",
    slug: "xml-formatter",
    name: "فرمت‌دهی XML",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد XML",
    isNew: false,
    icon: "code"
  },
  {
    id: "86",
    slug: "markdown-formatter",
    name: "فرمت‌دهی Markdown",
    category: "text",
    description: "فرمت‌دهی و خوانا کردن کد Markdown",
    isNew: false,
    icon: "code"
  },
  {
    id: "87",
    slug: "text-diff-checker",
    name: "مقایسه متن",
    category: "text",
    description: "مقایسه دو متن و نمایش تفاوت‌ها",
    isNew: false,
    icon: "code"
  },
  {
    id: "88",
    slug: "lorem-ipsum-generator",
    name: "تولید کننده Lorem Ipsum",
    category: "text",
    description: "تولید متن تصادفی Lorem Ipsum",
    isNew: false,
    icon: "code"
  },
  {
    id: "89",
    slug: "string-to-array",
    name: "تبدیل رشته به آرایه",
    category: "text",
    description: "تبدیل یک رشته متنی به آرایه‌ای از کلمات یا کاراکترها",
    isNew: false,
    icon: "code"
  },
  {
    id: "90",
    slug: "array-to-string",
    name: "تبدیل آرایه به رشته",
    category: "text",
    description: "تبدیل یک آرایه از کلمات یا کاراکترها به یک رشته متنی",
    isNew: false,
    icon: "code"
  },
  {
    id: "91",
    slug: "text-to-binary",
    name: "تبدیل متن به باینری",
    category: "text",
    description: "تبدیل متن به کد باینری",
    isNew: false,
    icon: "code"
  },
  {
   id: "93",
    slug: "binary-to-text",
    name: "تبدیل باینری به متن",
    category: "text",
    description: "تبدیل کد باینری به متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "94",
    slug: "celsius-to-fahrenheit",
    name: "تبدیل سانتیگراد به فارنهایت",
    category: "text",
    description: "تبدیل درجه حرارت از سانتیگراد به فارنهایت",
    isNew: false,
    icon: "code"
  },
  {
    id: "95",
    slug: "fahrenheit-to-celsius",
    name: "تبدیل فارنهایت به سانتیگراد",
    category: "text",
    description: "تبدیل درجه حرارت از فارنهایت به سانتیگراد",
    isNew: false,
    icon: "code"
  },
  {
    id: "96",
    slug: "text-reverser",
    name: "معکوس کننده متن",
    category: "text",
    description: "معکوس کردن متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "97",
    slug: "word-counter",
    name: "شمارشگر کلمات",
    category: "text",
    description: "شمارش تعداد کلمات در یک متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "98",
    slug: "character-counter",
    name: "شمارشگر کاراکترها",
    category: "text",
    description: "شمارش تعداد کاراکترها در یک متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "99",
    slug: "line-counter",
    name: "شمارشگر خطوط",
    category: "text",
    description: "شمارش تعداد خطوط در یک متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "100",
    slug: "paragraph-counter",
    name: "شمارشگر پاراگراف‌ها",
    category: "text",
    description: "شمارش تعداد پاراگراف‌ها در یک متن",
    isNew: false,
    icon: "code"
  },
  {
    id: "102",
    slug: "text-summarizer",
    name: "خلاصه‌ساز متن",
    category: "text",
    description: "خلاصه‌سازی متون طولانی",
    isNew: true,
    icon: "code"
  },
  {
    id: "103",
    slug: "grammar-checker",
    name: "بررسی کننده گرامر",
    category: "text",
    description: "بررسی و تصحیح گرامر متون",
    isNew: true,
    icon: "code"
  },
  {
    id: "104",
    slug: "plagiarism-checker",
    name: "تشخیص سرقت ادبی",
    category: "text",
    description: "تشخیص سرقت ادبی در متون",
    isNew: true,
    icon: "code"
  },
  {
    id: "105",
    slug: "text-translator",
    name: "مترجم متن",
    category: "text",
    description: "ترجمه متون بین زبان‌های مختلف",
    isNew: true,
    icon: "code"
  },
  {
    id: "106",
    slug: "text-to-speech",
    name: "تبدیل متن به گفتار",
    category: "text",
    description: "تبدیل متن به فایل صوتی",
    isNew: true,
    icon: "code"
  },
  {
    id: "123",
    slug: "enhanced-finglish-converter",
    name: "مبدل پیشرفته فینگلیش به فارسی",
    category: "text",
    description: "تبدیل دقیق و پیشرفته متن فینگلیش به فارسی با دیکشنری گسترده",
    isNew: true,
    icon: "book"
  },
  {
    id: "107",
    slug: "deepseek-ai",
    name: "هوش مصنوعی Deepseek",
    category: "text",
    description: "دستیار هوش مصنوعی چندمنظوره برای پاسخگویی به سوالات، نوشتن متن و کمک در کارها",
    isNew: true,
    icon: "sparkles"
  },
];
