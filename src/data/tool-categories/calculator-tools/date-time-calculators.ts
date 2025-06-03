
import { Tool } from '@/types/tool-types';

export const dateTimeCalculators: Tool[] = [
  {
    id: "50",
    slug: "date-difference",
    name: "محاسبه اختلاف تاریخ",
    category: "calculator",
    description: "تفاوت بین دو تاریخ",
    isNew: false,
    icon: "calendar"
  },
  {
    id: "109",
    slug: "time-calculator",
    name: "محاسبه زمان",
    category: "calculator",
    description: "جمع و تفریق زمان‌ها",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "115",
    slug: "today-date-converter",
    name: "تبدیل تاریخ امروز",
    category: "calculator",
    description: "تبدیل تاریخ امروز به شمسی، قمری و میلادی",
    isNew: true,
    icon: "calendar"
  },
  {
    id: "116",
    slug: "date-difference-calculator",
    name: "محاسبه اختلاف تاریخ",
    category: "calculator",
    description: "محاسبه اختلاف بین دو تاریخ",
    isNew: true,
    icon: "calendar"
  },
  {
    id: "117",
    slug: "world-time-converter",
    name: "ساعت جهانی",
    category: "calculator",
    description: "نمایش ساعت در نقاط مختلف جهان",
    isNew: true,
    icon: "clock"
  }
];
