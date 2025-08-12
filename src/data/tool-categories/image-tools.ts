import { Tool } from '@/types/tool-types';

export const imageTools: Tool[] = [
  {
    id: "2",
    slug: "image-compressor",
    name: "فشرده ساز تصویر",
    category: "image",
    description: "حجم تصاویر را بدون کاهش کیفیت کاهش دهید",
    isNew: true, 
    icon: "image"
  },
  {
    id: "24",
    slug: "image-to-webp",
    name: "تبدیل به WebP",
    category: "image",
    description: "فرمت تصویر خود را به WebP تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "25",
    slug: "image-to-jpg",
    name: "تبدیل به JPG",
    category: "image",
    description: "تصویر را به فرمت JPG تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "26",
    slug: "image-to-png",
    name: "تبدیل به PNG",
    category: "image",
    description: "تصویر را به فرمت PNG تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "27",
    slug: "image-cropper",
    name: "برش‌دهنده تصویر",
    category: "image",
    description: "بخشی از عکس را انتخاب و برش دهید",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "28",
    slug: "image-editor",
    name: "ویرایش ساده تصویر",
    category: "image",
    description: "افزودن فیلتر یا تغییر روشنایی تصویر",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "29",
    slug: "image-rotate",
    name: "چرخش تصویر",
    category: "image",
    description: "تصویر را بچرخانید",
    isNew: false,
    icon: "image"
  },
  {
    id: "30",
    slug: "image-flip",
    name: "آینه‌ای کردن تصویر",
    category: "image",
    description: "تصویر را به صورت افقی یا عمودی وارونه کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "31",
    slug: "remove-bg",
    name: "حذف پس‌زمینه تصویر",
    category: "image",
    description: "پس‌زمینه تصویر را حذف کنید (ابزار ابتدایی)",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "32",
    slug: "image-blur",
    name: "محو کردن تصویر",
    category: "image",
    description: "افکت محو ساده روی عکس",
    isNew: false,
    icon: "image"
  },
  {
    id: "8",
    slug: "image-resizer",
    name: "تغییر اندازه تصویر",
    category: "image",
    description: "اندازه تصاویر را به سرعت تغییر دهید",
    isNew: false,
    icon: "maximize"
  },
  {
    id: "33",
    slug: "image-grayscale",
    name: "سیاه‌ و سفید کردن تصویر",
    category: "image",
    description: "تصویر رنگی را به حالت سیاه سفید درآورید",
    isNew: false,
    icon: "image"
  },
  {
    id: "76",
    slug: "image-sepia",
    name: "اعمال فیلتر سپیا",
    category: "image",
    description: "تصویر خود را قهوه‌ای کلاسیک کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "80",
    slug: "photo-dimensions-finder",
    name: "یافتن ابعاد عکس",
    category: "image",
    description: "ابعاد دقیق تصاویر خود را مشاهده کنید",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "88",
    slug: "batch-image-converter",
    name: "تبدیل گروهی عکس",
    category: "image",
    description: "تبدیل فرمت چندین عکس به صورت همزمان",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "106",
    slug: "image-pixelator",
    name: "پیکسلی کردن تصویر",
    category: "image",
    description: "بر روی عکس خود افکت پیکسلی اعمال کنید",
    isNew: false,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "109",
    slug: "svg-to-png-converter",
    name: "تبدیل SVG به PNG",
    category: "image",
    description: "فرمت SVG عکس را به PNG تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "110",
    slug: "image-invert",
    name: "معکوس کردن رنگ تصویر",
    category: "image",
    description: "رنگ‌های تصویر را معکوس کنید",
    isNew: true,
    icon: "image"
  },
  {
    id: "111",
    slug: "image-contrast",
    name: "تنظیم کنتراست تصویر",
    category: "image",
    description: "کنتراست تصویر را تغییر دهید",
    isNew: true,
    icon: "image"
  },
  {
    id: "112",
    slug: "image-brightness",
    name: "تنظیم روشنایی تصویر",
    category: "image",
    description: "روشنایی تصویر را تغییر دهید",
    isNew: true,
    icon: "image"
  },
  {
    id: "113",
    slug: "image-saturate",
    name: "تنظیم اشباع رنگ تصویر",
    category: "image",
    description: "میزان اشباع رنگ‌های تصویر را تغییر دهید",
    isNew: true,
    icon: "image"
  },
  {
    id: "114",
    slug: "image-hue-rotate",
    name: "چرخش رنگ تصویر",
    category: "image",
    description: "رنگ‌های تصویر را به صورت دورانی تغییر دهید",
    isNew: true,
    icon: "image"
  }
];
