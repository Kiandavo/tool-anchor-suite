import { Tool } from '@/types/tool-types';

export const productivityTools: Tool[] = [
  {
    id: "todo-list",
    slug: "todo-list",
    name: "فهرست کارها",
    category: "productivity",
    description: "لیست وظایف با زیرکارها و تگ‌بندی",
    isNew: true,
    icon: "list-check",
    isComingSoon: false
  },
  {
    id: "pomodoro-timer",
    slug: "pomodoro-timer",
    name: "تایمر پومودورو",
    category: "productivity",
    description: "۲۵ دقیقه تمرکز، ۵ دقیقه استراحت",
    isNew: true,
    icon: "clock",
    isComingSoon: false
  },
  {
    id: "note-taking",
    slug: "note-taking",
    name: "یادداشت‌برداری",
    category: "productivity",
    description: "نوشتن، سنجاق و جستجوی یادداشت",
    isNew: true,
    icon: "pencil",
    isComingSoon: false
  },
  {
    id: "calendar-scheduler",
    slug: "calendar-scheduler",
    name: "تقویم و برنامه‌ریز",
    category: "productivity",
    description: "برنامه‌ریزی روز، هفته و ماه",
    isNew: true,
    icon: "calendar",
    isComingSoon: false
  },
  {
    id: "project-board",
    slug: "project-board",
    name: "برد پروژه",
    category: "productivity",
    description: "مدیریت کارها به سبک کانبان",
    isNew: false,
    icon: "layout-grid",
    isComingSoon: false
  },
  {
    id: "habit-tracker",
    slug: "habit-tracker",
    name: "پیگیری عادت",
    category: "productivity",
    description: "ثبت عادت روزانه و مشاهده استریک",
    isNew: true,
    icon: "target",
    isComingSoon: false
  },
  {
    id: "invoice-generator",
    slug: "invoice-generator",
    name: "ساخت فاکتور",
    category: "productivity",
    description: "فاکتور قابل چاپ با محاسبه مالیات",
    isNew: true,
    icon: "file-text",
    isComingSoon: false
  }
];
