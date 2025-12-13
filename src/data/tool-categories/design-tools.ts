import { Tool } from '@/types/tool-types';

export const designTools: Tool[] = [
  {
    id: "color-palette-generator",
    slug: "color-palette-generator",
    name: "تولیدکننده پالت رنگ",
    category: "design",
    description: "پالت‌های هماهنگ از یک رنگ پایه",
    isNew: false,
    icon: "palette",
    isComingSoon: false
  },
  {
    id: "gradient-generator",
    slug: "gradient-generator",
    name: "سازنده گرادیانت",
    category: "design",
    description: "گرادیانت CSS با کپی کد آماده",
    isNew: true,
    icon: "paintbrush",
    isComingSoon: false
  },
  {
    id: "box-shadow-generator",
    slug: "box-shadow-generator",
    name: "سازنده سایه",
    category: "design",
    description: "سایه چندلایه با پیش‌نمایش زنده",
    isNew: true,
    icon: "square",
    isComingSoon: false
  },
  {
    id: "typography-scale",
    slug: "typography-scale",
    name: "مقیاس تایپوگرافی",
    category: "design",
    description: "سلسله‌مراتب فونت با نسبت طلایی",
    isNew: true,
    icon: "type",
    isComingSoon: false
  },
  {
    id: "contrast-checker",
    slug: "contrast-checker",
    name: "بررسی کنتراست رنگ",
    category: "design",
    description: "سازگاری رنگ با استاندارد WCAG",
    isNew: true,
    icon: "eye",
    isComingSoon: false
  }
];
