
import { Tool } from '@/types/tool-types';

export const designTools: Tool[] = [
  {
    id: "color-palette",
    slug: "color-palette",
    name: "تولیدکننده پالت رنگ",
    category: "design",
    description: "ایجاد پالت‌های رنگی هماهنگ برای طراحی‌های گرافیکی",
    isNew: true,
    icon: "palette",
    isComingSoon: false
  },
  {
    id: "simple-logo-maker",
    slug: "simple-logo-maker",
    name: "ساخت لوگو",
    category: "design",
    description: "ساخت لوگوهای ساده با شکل‌های پایه و تایپوگرافی",
    isNew: true,
    icon: "paint-bucket",
    isComingSoon: true
  },
  {
    id: "social-media-template",
    slug: "social-media-template",
    name: "قالب شبکه‌های اجتماعی",
    category: "design",
    description: "ساخت تصاویر با اندازه مناسب برای شبکه‌های اجتماعی مختلف",
    isNew: true,
    icon: "image",
    isComingSoon: true
  },
  {
    id: "font-preview",
    slug: "font-preview",
    name: "پیش‌نمایش فونت",
    category: "design",
    description: "مشاهده پیش‌نمایش متن با فونت‌های مختلف",
    isNew: true,
    icon: "type",
    isComingSoon: false
  }
];
