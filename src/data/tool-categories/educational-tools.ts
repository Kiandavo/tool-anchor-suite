
import { Tool } from '@/types/tool-types';

export const educationalTools: Tool[] = [
  {
    id: "persian-poetry-analyzer",
    slug: "persian-poetry-analyzer",
    name: "تحلیل‌گر شعر فارسی",
    category: "educational",
    description: "تحلیل وزن، قافیه و آرایه‌های ادبی در اشعار فارسی",
    isNew: true,
    icon: "book-open"
  },
  {
    id: "language-learning",
    slug: "language-learning",
    name: "آموزش زبان",
    category: "educational",
    description: "ابزارهای یادگیری زبان همراه با تمرین و آزمون",
    isNew: true,
    icon: "globe"
  },
  {
    id: "equation-solver",
    slug: "equation-solver",
    name: "حل‌کننده معادلات ریاضی",
    category: "educational",
    description: "حل انواع معادلات ریاضی با نمایش مراحل حل",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "historical-timeline",
    slug: "historical-timeline",
    name: "خط زمانی تاریخی",
    category: "educational",
    description: "مشاهده رویدادهای تاریخی در قالب خط زمانی",
    isNew: true,
    icon: "calendar-days"
  },
  {
    id: "quiz-generator",
    slug: "quiz-generator",
    name: "سازنده آزمون",
    category: "educational",
    description: "ساخت آزمون‌های چندگزینه‌ای برای موضوعات مختلف",
    isNew: true,
    icon: "school"
  }
];
