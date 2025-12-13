import { Tool } from '@/types/tool-types';

export const imageTools: Tool[] = [
  {
    id: "2",
    slug: "image-compressor",
    name: "فشرده ساز تصویر",
    category: "image",
    description: "کاهش حجم عکس با حفظ کیفیت",
    isNew: true, 
    icon: "image"
  },
  {
    id: "24",
    slug: "image-to-webp",
    name: "تبدیل به WebP",
    category: "image",
    description: "فرمت سبک‌تر برای وب‌سایت",
    isNew: false,
    icon: "image"
  },
  {
    id: "25",
    slug: "image-to-jpg",
    name: "تبدیل به JPG",
    category: "image",
    description: "فرمت استاندارد عکس",
    isNew: false,
    icon: "image"
  },
  {
    id: "26",
    slug: "image-to-png",
    name: "تبدیل به PNG",
    category: "image",
    description: "فرمت با پشتیبانی شفافیت",
    isNew: false,
    icon: "image"
  },
  {
    id: "27",
    slug: "image-cropper",
    name: "برش‌دهنده تصویر",
    category: "image",
    description: "انتخاب و برش بخشی از عکس",
    isNew: false,
    icon: "image",
    isComingSoon: false
  },
  {
    id: "29",
    slug: "image-rotate",
    name: "چرخش تصویر",
    category: "image",
    description: "چرخش ۹۰، ۱۸۰ یا ۲۷۰ درجه",
    isNew: false,
    icon: "image"
  },
  {
    id: "30",
    slug: "image-flip",
    name: "آینه‌ای کردن تصویر",
    category: "image",
    description: "وارونه کردن افقی یا عمودی",
    isNew: false,
    icon: "image"
  },
  {
    id: "32",
    slug: "image-blur",
    name: "محو کردن تصویر",
    category: "image",
    description: "اعمال افکت تاری (Blur)",
    isNew: false,
    icon: "image"
  },
  {
    id: "8",
    slug: "image-resizer",
    name: "تغییر اندازه تصویر",
    category: "image",
    description: "تنظیم عرض و ارتفاع دلخواه",
    isNew: false,
    icon: "maximize"
  },
  {
    id: "33",
    slug: "image-grayscale",
    name: "سیاه‌ و سفید کردن تصویر",
    category: "image",
    description: "حذف رنگ از عکس",
    isNew: false,
    icon: "image"
  },
  {
    id: "80",
    slug: "photo-dimensions-finder",
    name: "یافتن ابعاد عکس",
    category: "image",
    description: "نمایش عرض، ارتفاع و نسبت تصویر",
    isNew: false,
    icon: "image",
    isComingSoon: false
  },
  {
    id: "109",
    slug: "svg-to-png-converter",
    name: "تبدیل SVG به PNG",
    category: "image",
    description: "تبدیل وکتور به تصویر رستری",
    isNew: false,
    icon: "image"
  },
  {
    id: "110",
    slug: "image-invert",
    name: "معکوس کردن رنگ تصویر",
    category: "image",
    description: "نگاتیو کردن رنگ‌های عکس",
    isNew: true,
    icon: "image"
  }
];
