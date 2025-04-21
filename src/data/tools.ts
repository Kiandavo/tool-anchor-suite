export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  isNew: boolean;
  icon: string;
}

export type ToolCategory = 
  | "text" 
  | "image" 
  | "seo" 
  | "calculators" 
  | "number" 
  | "random";

export const categoryLabels: Record<ToolCategory, string> = {
  text: "متن",
  image: "تصویر",
  seo: "سئو",
  calculators: "ماشین حساب",
  number: "اعداد",
  random: "تصادفی"
};

// Sample data with Farsi content
export const tools: Tool[] = [
  // --- متن (text) ---
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
  // --- تصویر (image) ---
  {
    id: "2",
    slug: "image-compressor",
    name: "فشرده ساز تصویر",
    category: "image",
    description: "حجم تصاویر را بدون کاهش کیفیت کاهش دهید",
    isNew: true, 
    icon: "image"
  },
  {
    id: "24",
    slug: "image-to-webp",
    name: "تبدیل به WebP",
    category: "image",
    description: "فرمت تصویر خود را به WebP تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "25",
    slug: "image-to-jpg",
    name: "تبدیل به JPG",
    category: "image",
    description: "تصویر را به فرمت JPG تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "26",
    slug: "image-to-png",
    name: "تبدیل به PNG",
    category: "image",
    description: "تصویر را به فرمت PNG تبدیل کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "27",
    slug: "image-cropper",
    name: "برش‌دهنده تصویر",
    category: "image",
    description: "بخشی از عکس را انتخاب و برش دهید",
    isNew: false,
    icon: "image"
  },
  {
    id: "28",
    slug: "image-editor",
    name: "ویرایش ساده تصویر",
    category: "image",
    description: "افزودن فیلتر یا تغییر روشنایی تصویر",
    isNew: false,
    icon: "image"
  },
  {
    id: "29",
    slug: "image-rotate",
    name: "چرخش تصویر",
    category: "image",
    description: "تصویر را بچرخانید",
    isNew: false,
    icon: "image"
  },
  {
    id: "30",
    slug: "image-flip",
    name: "آینه‌ای کردن تصویر",
    category: "image",
    description: "تصویر را به صورت افقی یا عمودی وارونه کنید",
    isNew: false,
    icon: "image"
  },
  {
    id: "31",
    slug: "remove-bg",
    name: "حذف پس‌زمینه تصویر",
    category: "image",
    description: "پس‌زمینه تصویر را حذف کنید (ابزار ابتدایی)",
    isNew: false,
    icon: "image"
  },
  {
    id: "32",
    slug: "image-blur",
    name: "محو کردن تصویر",
    category: "image",
    description: "افکت محو ساده روی عکس",
    isNew: false,
    icon: "image"
  },
  {
    id: "8",
    slug: "image-resizer",
    name: "تغییر اندازه تصویر",
    category: "image",
    description: "اندازه تصاویر را به سرعت تغییر دهید",
    isNew: false,
    icon: "maximize"
  },
  {
    id: "33",
    slug: "image-grayscale",
    name: "سیاه‌ و سفید کردن تصویر",
    category: "image",
    description: "تصویر رنگی را به حالت سیاه سفید درآورید",
    isNew: false,
    icon: "image"
  },
  // --- سئو (seo) ---
  {
    id: "3",
    slug: "meta-tag-generator",
    name: "ایجاد کننده متا تگ",
    category: "seo",
    description: "تگ‌های متا برای سایت خود را بسازید",
    isNew: false,
    icon: "code"
  },
  {
    id: "34",
    slug: "robots-txt-generator",
    name: "ساخت robots.txt",
    category: "seo",
    description: "ایجاد robots.txt سفارشی",
    isNew: false,
    icon: "code"
  },
  {
    id: "35",
    slug: "utm-builder",
    name: "ساخت UTM",
    category: "seo",
    description: "افزودن UTM به لینک‌ها",
    isNew: false,
    icon: "filter"
  },
  {
    id: "9",
    slug: "keyword-density",
    name: "چگالی کلمات کلیدی",
    category: "seo",
    description: "چگالی کلمات کلیدی در متن خود را بررسی کنید",
    isNew: false,
    icon: "filter"
  },
  {
    id: "36",
    slug: "open-graph-generator",
    name: "ساخت OG Tag",
    category: "seo",
    description: "تولید OG Tag برای شبکه‌های اجتماعی",
    isNew: false,
    icon: "code"
  },
  {
    id: "37",
    slug: "sitemap-generator",
    name: "ساخت sitemap.xml",
    category: "seo",
    description: "ایجاد نقشه سایت XML",
    isNew: false,
    icon: "code"
  },
  {
    id: "38",
    slug: "favicon-generator",
    name: "ساخت favicon",
    category: "seo",
    description: "تولید favicon از لوگو",
    isNew: false,
    icon: "image"
  },
  {
    id: "39",
    slug: "page-title-check",
    name: "بررسی طول عنوان صفحه",
    category: "seo",
    description: "طول عنوان مناسب برای سئو",
    isNew: false,
    icon: "type"
  },
  {
    id: "40",
    slug: "canonical-check",
    name: "بررسی canonical",
    category: "seo",
    description: "بررسی وجود تگ canonical",
    isNew: false,
    icon: "code"
  },
  {
    id: "41",
    slug: "alt-text-analyzer",
    name: "بررسی alt تصاویر",
    category: "seo",
    description: "آمار و وضعیت alt تصاویر داخل HTML",
    isNew: false,
    icon: "filter"
  },
  {
    id: "42",
    slug: "friendly-url-checker",
    name: "بررسی سئو URL",
    category: "seo",
    description: "بررسی خوانایی و سئو URL",
    isNew: false,
    icon: "hash"
  },
  {
    id: "43",
    slug: "heading-structure-checker",
    name: "بررسی ساختار هدینگ",
    category: "seo",
    description: "ساختار صحیح هدینگ‌های H1-H6",
    isNew: false,
    icon: "type"
  },
  // --- ماشین حساب (calculators) ---
  {
    id: "4", 
    slug: "percentage-calculator",
    name: "محاسبه گر درصد",
    category: "calculators",
    description: "محاسبات درصدی را به سرعت انجام دهید",
    isNew: false,
    icon: "percent"
  },
  {
    id: "44",
    slug: "loan-calculator",
    name: "ماشین حساب وام",
    category: "calculators",
    description: "محاسبه اقساط وام",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "45",
    slug: "age-calculator",
    name: "محاسبه سن",
    category: "calculators",
    description: "محاسبه سن بر اساس تاریخ تولد",
    isNew: false,
    icon: "activity"
  },
  {
    id: "10",
    slug: "bmi-calculator",
    name: "محاسبه گر BMI",
    category: "calculators",
    description: "شاخص توده بدنی خود را محاسبه کنید",
    isNew: false,
    icon: "activity"
  },
  {
    id: "46",
    slug: "salary-tax-calculator",
    name: "محاسبه مالیات حقوق",
    category: "calculators",
    description: "محاسبه مالیات سالانه یا ماهیانه",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "47",
    slug: "discount-calculator",
    name: "محاسبه‌گر تخفیف",
    category: "calculators",
    description: "محاسبه قیمت پس از اعمال تخفیف",
    isNew: false,
    icon: "percent"
  },
  {
    id: "48",
    slug: "unit-converter",
    name: "تبدیل واحدها",
    category: "calculators",
    description: "تبدیل اندازه‌ها و واحدها",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "49",
    slug: "currency-converter",
    name: "تبدیل ارز",
    category: "calculators",
    description: "تبدیل قیمت بین ارزهای مختلف",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "50",
    slug: "date-difference",
    name: "محاسبه اختلاف تاریخ",
    category: "calculators",
    description: "تفاوت بین دو تاریخ",
    isNew: false,
    icon: "calendar"
  },
  {
    id: "51",
    slug: "tip-calculator",
    name: "محاسبه انعام",
    category: "calculators",
    description: "انعام را برای صورت حساب محاسبه کنید",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "52",
    slug: "area-calculator",
    name: "محاسبه مساحت",
    category: "calculators",
    description: "مساحت اشکال را محاسبه کنید",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "53",
    slug: "volume-calculator",
    name: "محاسبه حجم",
    category: "calculators",
    description: "حجم اشکال را محاسبه کنید",
    isNew: false,
    icon: "calculator"
  },
  // --- اعداد (number) ---
  {
    id: "5",
    slug: "number-converter",
    name: "مبدل اعداد",
    category: "number",
    description: "تبدیل اعداد بین سیستم‌های مختلف (دودویی، هگزادسیمال و...)",
    isNew: false,
    icon: "binary"
  },
  {
    id: "54",
    slug: "roman-numeral-converter",
    name: "تبدیل عدد به رومی",
    category: "number",
    description: "تبدیل عدد به عدد رومی و برعکس",
    isNew: false,
    icon: "binary"
  },
  {
    id: "55",
    slug: "number-formatter",
    name: "فرمت کننده عدد",
    category: "number",
    description: "افزودن جداکننده هزارگان",
    isNew: false,
    icon: "binary"
  },
  {
    id: "56",
    slug: "number-rounder",
    name: "گرد کردن عدد",
    category: "number",
    description: "گرد کردن عدد به رقم دلخواه",
    isNew: false,
    icon: "binary"
  },
  {
    id: "57",
    slug: "decimal-binary-converter",
    name: "تبدیل مبنای ده به دودویی",
    category: "number",
    description: "تبدیل اعداد بین مبناها",
    isNew: false,
    icon: "binary"
  },
  {
    id: "58",
    slug: "decimal-hex-converter",
    name: "تبدیل مبنای ده به هگزادسیمال",
    category: "number",
    description: "تبدیل اعداد به هگزادسیمال",
    isNew: false,
    icon: "binary"
  },
  {
    id: "59",
    slug: "decimal-octal-converter",
    name: "تبدیل مبنای ده به اکتال",
    category: "number",
    description: "تبدیل اعداد از ده به اکتال",
    isNew: false,
    icon: "binary"
  },
  {
    id: "60",
    slug: "even-odd-checker",
    name: "تشخیص زوج یا فرد",
    category: "number",
    description: "عدد دهید و زوج یا فرد بودن را ببینید",
    isNew: false,
    icon: "hash"
  },
  {
    id: "61",
    slug: "sum-calculator",
    name: "محاسبه مجموع اعداد",
    category: "number",
    description: "مجموع چند عدد دلخواه را بدست آورید",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "12",
    slug: "prime-checker",
    name: "بررسی عدد اول",
    category: "number",
    description: "بررسی کنید که آیا یک عدد، عدد اول است یا خیر",
    isNew: true,
    icon: "hash"
  },
  {
    id: "62",
    slug: "random-number-picker",
    name: "انتخاب عدد تصادفی",
    category: "number",
    description: "انتخاب تصادفی عدد از بین چند عدد",
    isNew: false,
    icon: "dice"
  },
  {
    id: "63",
    slug: "fibonacci-finder",
    name: "عضویت در دنباله فیبوناچی",
    category: "number",
    description: "بررسی عدد در دنباله فیبوناچی",
    isNew: false,
    icon: "hash"
  },
  // --- تصادفی (random) ---
  {
    id: "6",
    slug: "random-password",
    name: "رمز عبور تصادفی",
    category: "random",
    description: "ایجاد رمزهای عبور قوی و تصادفی",
    isNew: true,
    icon: "key"
  },
  {
    id: "64",
    slug: "random-color-generator",
    name: "تولید رنگ تصادفی",
    category: "random",
    description: "هر بار یک رنگ جدید بسازید",
    isNew: false,
    icon: "dice"
  },
  {
    id: "65",
    slug: "random-string",
    name: "رشته تصادفی",
    category: "random",
    description: "رشته متنی تصادفی تولید کنید",
    isNew: false,
    icon: "key"
  },
  {
    id: "66",
    slug: "random-date",
    name: "تاریخ تصادفی",
    category: "random",
    description: "تولید یک تاریخ تصادفی",
    isNew: false,
    icon: "dice"
  },
  {
    id: "11",
    slug: "random-number",
    name: "عدد تصادفی",
    category: "random",
    description: "تولید اعداد تصادفی در محدوده دلخواه",
    isNew: false,
    icon: "dice"
  },
  {
    id: "67",
    slug: "coin-flip",
    name: "شیر یا خط",
    category: "random",
    description: "سکه بیاندازید: شیر یا خط؟",
    isNew: false,
    icon: "dice"
  },
  {
    id: "68",
    slug: "random-picker",
    name: "انتخابگر تصادفی",
    category: "random",
    description: "به طور تصادفی از بین لیست انتخاب کن",
    isNew: false,
    icon: "dice"
  },
  {
    id: "69",
    slug: "random-emoji-generator",
    name: "تولید ایموجی تصادفی",
    category: "random",
    description: "هر بار یک ایموجی جدید",
    isNew: false,
    icon: "dice"
  },
  {
    id: "70",
    slug: "random-word-generator",
    name: "تولید واژه تصادفی",
    category: "random",
    description: "تولید یک کلمه یا اسم تصادفی",
    isNew: false,
    icon: "dice"
  },
  {
    id: "71",
    slug: "dice-roller",
    name: "تاس بریز",
    category: "random",
    description: "تاس شش‌وجهی دیجیتال",
    isNew: false,
    icon: "dice"
  },
  {
    id: "72",
    slug: "random-user-generator",
    name: "کاربر تصادفی",
    category: "random",
    description: "یک نام کاربری و پروفایل ساختگی بساز",
    isNew: false,
    icon: "key"
  },
  {
    id: "73",
    slug: "random-quote-generator",
    name: "جمله قصار تصادفی",
    category: "random",
    description: "عبارت یا نقل‌قول انگیزشی هر بار!",
    isNew: false,
    icon: "dice"
  },
];

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew);
};

export const getPopularTools = (): Tool[] => {
  // In a real app, this would be based on usage analytics
  // For this demo, we'll just return a subset of tools
  return [tools[0], tools[3], tools[5], tools[9]];
};

export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(
    tool => 
      tool.name.toLowerCase().includes(lowercaseQuery) || 
      tool.description.toLowerCase().includes(lowercaseQuery)
  );
};
