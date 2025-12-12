
import { Tool } from '@/types/tool-types';

export const designTools: Tool[] = [
  {
    id: "color-palette-generator",
    slug: "color-palette-generator",
    name: "تولیدکننده پالت رنگ",
    category: "design",
    description: "ایجاد پالت‌های رنگی هماهنگ برای طراحی‌های گرافیکی",
    isNew: false,
    icon: "palette",
    isComingSoon: false
  },
  {
    id: "gradient-generator",
    slug: "gradient-generator",
    name: "سازنده گرادیانت",
    category: "design",
    description: "ایجاد گرادیانت‌های CSS زیبا با پیش‌نمایش زنده",
    isNew: true,
    icon: "paintbrush",
    isComingSoon: false
  },
  {
    id: "box-shadow-generator",
    slug: "box-shadow-generator",
    name: "سازنده سایه",
    category: "design",
    description: "طراحی سایه‌های CSS با چندین لایه و تنظیمات پیشرفته",
    isNew: true,
    icon: "square",
    isComingSoon: false
  },
  {
    id: "typography-scale",
    slug: "typography-scale",
    name: "مقیاس تایپوگرافی",
    category: "design",
    description: "محاسبه اندازه‌های فونت با نسبت‌های هارمونیک",
    isNew: true,
    icon: "type",
    isComingSoon: false
  },
  {
    id: "contrast-checker",
    slug: "contrast-checker",
    name: "بررسی کنتراست رنگ",
    category: "design",
    description: "بررسی دسترس‌پذیری رنگ‌ها طبق استاندارد WCAG",
    isNew: true,
    icon: "eye",
    isComingSoon: false
  }
];
