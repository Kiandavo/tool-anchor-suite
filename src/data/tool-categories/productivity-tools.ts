
import { Tool } from '@/types/tool-types';

export const productivityTools: Tool[] = [
  {
    id: "todo-list",
    slug: "todo-list",
    name: "فهرست کارها",
    category: "productivity",
    description: "مدیریت فهرست کارهای روزانه با قابلیت اولویت‌بندی",
    isNew: true,
    icon: "list-check",
    isComingSoon: false
  },
  {
    id: "pomodoro-timer",
    slug: "pomodoro-timer",
    name: "تایمر پومودورو",
    category: "productivity",
    description: "تایمر مبتنی بر روش پومودورو برای افزایش تمرکز و بهره‌وری",
    isNew: true,
    icon: "clock",
    isComingSoon: false
  },
  {
    id: "note-taking",
    slug: "note-taking",
    name: "یادداشت‌برداری",
    category: "productivity",
    description: "ابزار ساده برای یادداشت‌برداری سریع و سازمان‌دهی اطلاعات",
    isNew: true,
    icon: "pencil",
    isComingSoon: false
  },
  {
    id: "calendar-scheduler",
    slug: "calendar-scheduler",
    name: "تقویم و برنامه‌ریز",
    category: "productivity",
    description: "مدیریت زمان‌بندی روزانه، هفتگی و ماهانه",
    isNew: true,
    icon: "calendar",
    isComingSoon: false
  },
  {
    id: "project-board",
    slug: "project-board",
    name: "برد پروژه",
    category: "productivity",
    description: "مدیریت ساده پروژه به روش کانبان",
    isNew: false,
    icon: "layout-grid",
    isComingSoon: false
  },
  {
    id: "habit-tracker",
    slug: "habit-tracker",
    name: "پیگیری عادت",
    category: "productivity",
    description: "عادت‌های روزانه را پیگیری کنید و استریک بسازید",
    isNew: true,
    icon: "target",
    isComingSoon: false
  },
  {
    id: "invoice-generator",
    slug: "invoice-generator",
    name: "ساخت فاکتور",
    category: "productivity",
    description: "فاکتور حرفه‌ای برای کسب‌وکار خود بسازید",
    isNew: true,
    icon: "file-text",
    isComingSoon: false
  }
];
