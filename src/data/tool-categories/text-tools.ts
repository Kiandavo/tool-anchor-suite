import { Tool } from '@/types/tool-types';

export const textTools: Tool[] = [
  {
    id: "1",
    slug: "text-counter",
    name: "شمارشگر متن",
    category: "text",
    description: "تعداد کلمات، حروف و پاراگراف ها را بشمارید",
    isNew: true,
    icon: "text-size"
  },
  {
    id: "13",
    slug: "text-reverse",
    name: "معکوس کننده متن",
    category: "text",
    description: "متن را وارونه کنید",
    isNew: false,
    icon: "type"
  },
  {
    id: "14",
    slug: "latin-to-persian-convertor",
    name: "تبدیل لاتین به فارسی",
    category: "text",
    description: "متون فینگلیش را به فارسی تبدیل کنید",
    isNew: false,
    icon: "type"
  },
  {
    id: "15",
    slug: "remove-duplicate-lines",
    name: "حذف خطوط تکراری",
    category: "text",
    description: "خطوط تکراری را از متن حذف کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "16",
    slug: "text-sorter",
    name: "مرتب‌ساز خطوط متن",
    category: "text",
    description: "خطوط متنی را مرتب کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "17",
    slug: "text-trimmer",
    name: "حذف فاصله‌ها",
    category: "text",
    description: "حذف فاصله‌های ابتدا و انتهای هر خط متن",
    isNew: false,
    icon: "type"
  },
  {
    id: "18",
    slug: "slug-generator",
    name: "ایجاد اسلاگ",
    category: "text",
    description: "تولید اسلاگ URL-friendly از متن",
    isNew: false,
    icon: "hash"
  },
  {
    id: "19",
    slug: "text-uppercasing",
    name: "تبدیل به حروف بزرگ",
    category: "text",
    description: "تبدیل متن به حالت حروف بزرگ",
    isNew: false,
    icon: "type"
  },
  {
    id: "20",
    slug: "text-lowercasing",
    name: "تبدیل به حروف کوچک",
    category: "text",
    description: "تبدیل متن به حالت حروف کوچک",
    isNew: false,
    icon: "type"
  },
  {
    id: "21",
    slug: "text-titlecase",
    name: "حالت عنوان",
    category: "text",
    description: "هر کلمه با حرف بزرگ شروع شود",
    isNew: false,
    icon: "type"
  },
  {
    id: "22",
    slug: "remove-empty-lines",
    name: "حذف خطوط خالی",
    category: "text",
    description: "خطوط خالی را از متن حذف کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "23",
    slug: "emoji-remover",
    name: "حذف ایموجی از متن",
    category: "text",
    description: "ایموجی‌های متن را حذف کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "75",
    slug: "uppercase-finder",
    name: "تبدیل به حروف بزرگ ویژه",
    category: "text",
    description: "متن خود را به فرمت حروف بزرگ ویژه تبدیل کنید",
    isNew: false,
    icon: "type"
  },
  {
    id: "86",
    slug: "character-remover",
    name: "حذف کاراکتر خاص",
    category: "text",
    description: "هر کاراکتری که بخواهید را از متن حذف کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "87",
    slug: "word-replacer",
    name: "جایگزین‌گر واژه",
    category: "text",
    description: "یک واژه را با واژه‌ای دیگر جایگزین کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "89",
    slug: "random-paragraph-generator",
    name: "تولید پاراگراف تصادفی",
    category: "text",
    description: "تولید خودکار پاراگراف برای تست و محتوا",
    isNew: false,
    icon: "dice"
  },
  {
    id: "93",
    slug: "capitalize-tool",
    name: "ابزار بزرگ‌کردن حروف اول",
    category: "text",
    description: "حرف اول هر واژه را بزرگ کنید",
    isNew: false,
    icon: "type"
  },
  {
    id: "94",
    slug: "advanced-text-analyzer",
    name: "آنالیز متن پیشرفته",
    category: "text",
    description: "آمار و داده های کامل متن را مشاهده کنید",
    isNew: false,
    icon: "type"
  },
  {
    id: "95",
    slug: "bulk-slug-generator",
    name: "تولید اسلاگ گروهی",
    category: "text",
    description: "برای لیستی از متون اسلاگ تولید کنید",
    isNew: false,
    icon: "hash"
  },
  {
    id: "98",
    slug: "filter-lines-tool",
    name: "فیلترکننده خطوط",
    category: "text",
    description: "خطوط شامل یک عبارت خاص را فیلتر کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "102",
    slug: "emoji-text-inserter",
    name: "درج ایموجی به متن",
    category: "text",
    description: "به متن خود ایموجی اضافه کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "103",
    slug: "remove-html-tags",
    name: "حذف تگ HTML",
    category: "text",
    description: "تگ های HTML را از متن حذف کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "107",
    slug: "mirror-text",
    name: "متن آینه‌ای",
    category: "text",
    description: "متن را به صورت آینه‌ای نمایش دهید",
    isNew: false,
    icon: "type"
  },
  {
    id: "108",
    slug: "special-character-finder",
    name: "یافتن کاراکتر ویژه",
    category: "text",
    description: "کاراکترهای غیر معمول را در متن پیدا کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "110",
    slug: "remove-accent-tool",
    name: "حذف اِعراب متون فارسی",
    category: "text",
    description: "اِعراب (فتحه و کسره و ...) را از متن حذف کنید",
    isNew: false,
    icon: "filter"
  }
];
