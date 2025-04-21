
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
    id: "2",
    slug: "image-compressor",
    name: "فشرده ساز تصویر",
    category: "image",
    description: "حجم تصاویر را بدون کاهش کیفیت کاهش دهید",
    isNew: true, 
    icon: "image"
  },
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
    id: "4", 
    slug: "percentage-calculator",
    name: "محاسبه گر درصد",
    category: "calculators",
    description: "محاسبات درصدی را به سرعت انجام دهید",
    isNew: false,
    icon: "percent"
  },
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
    id: "6",
    slug: "random-password",
    name: "رمز عبور تصادفی",
    category: "random",
    description: "ایجاد رمزهای عبور قوی و تصادفی",
    isNew: true,
    icon: "key"
  },
  {
    id: "7",
    slug: "text-case-converter",
    name: "تبدیل حالت متن",
    category: "text",
    description: "متن را به حروف بزرگ، کوچک و... تبدیل کنید",
    isNew: false,
    icon: "type"
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
    id: "9",
    slug: "keyword-density",
    name: "چگالی کلمات کلیدی",
    category: "seo",
    description: "چگالی کلمات کلیدی در متن خود را بررسی کنید",
    isNew: false,
    icon: "filter"
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
    id: "11",
    slug: "random-number",
    name: "عدد تصادفی",
    category: "random",
    description: "تولید اعداد تصادفی در محدوده دلخواه",
    isNew: false,
    icon: "dice"
  },
  {
    id: "12",
    slug: "prime-checker",
    name: "بررسی عدد اول",
    category: "number",
    description: "بررسی کنید که آیا یک عدد، عدد اول است یا خیر",
    isNew: true,
    icon: "hash"
  }
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
