
export type ToolCategory = 
  | "text" 
  | "image" 
  | "seo" 
  | "calculators" 
  | "number" 
  | "random"
  | "educational"
  | "productivity"
  | "design"
  | "persian-cultural"
  | "readings"; // Added new category

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  isNew: boolean;
  icon: string;
  isComingSoon?: boolean;
  isPremium?: boolean;
}

export const categoryLabels: Record<ToolCategory, string> = {
  text: "متن",
  image: "تصویر",
  seo: "سئو",
  calculators: "ماشین حساب",
  number: "اعداد",
  random: "تصادفی",
  educational: "آموزشی",
  productivity: "بهره‌وری",
  design: "طراحی",
  "persian-cultural": "فرهنگ فارسی",
  "readings": "فال و طالع‌بینی" // Added Persian translation for readings
};
