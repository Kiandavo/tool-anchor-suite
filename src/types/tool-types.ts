
export type ToolCategory = 
  | "text" 
  | "image" 
  | "seo" 
  | "calculators" 
  | "number" 
  | "random";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  isNew: boolean;
  icon: string;
  isComingSoon?: boolean;
}

export const categoryLabels: Record<ToolCategory, string> = {
  text: "متن",
  image: "تصویر",
  seo: "سئو",
  calculators: "ماشین حساب",
  number: "اعداد",
  random: "تصادفی"
};
