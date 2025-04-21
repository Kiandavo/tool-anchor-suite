
import { Tool } from '@/types/tool-types';

export const resumeTools: Tool[] = [
  {
    id: 'resume-builder',
    slug: 'resume-builder',
    name: 'ساخت رزومه',
    category: 'resume',
    description: 'ساخت رزومه حرفه‌ای با قالب‌های متنوع و زیبا',
    isNew: true,
    icon: 'file-text'
  },
  {
    id: 'cv-template',
    slug: 'cv-template',
    name: 'قالب CV',
    category: 'resume',
    description: 'انتخاب از بین قالب‌های مختلف CV برای معرفی حرفه‌ای خود',
    isNew: true,
    icon: 'file-text'
  },
  {
    id: 'cover-letter',
    slug: 'cover-letter',
    name: 'نامه معرفی',
    category: 'resume',
    description: 'ایجاد نامه معرفی حرفه‌ای برای همراهی با رزومه',
    isNew: true,
    icon: 'file-pen'
  },
  {
    id: 'resume-analyzer',
    slug: 'resume-analyzer',
    name: 'تحلیل رزومه',
    category: 'resume',
    description: 'بررسی و تحلیل رزومه برای بهبود محتوا و فرمت',
    isNew: true,
    icon: 'file-pen'
  },
  {
    id: 'linkedin-optimizer',
    slug: 'linkedin-optimizer',
    name: 'بهینه‌سازی لینکدین',
    category: 'resume',
    description: 'بهینه‌سازی پروفایل لینکدین برای دیده شدن بیشتر',
    isNew: true,
    icon: 'briefcase'
  }
];
