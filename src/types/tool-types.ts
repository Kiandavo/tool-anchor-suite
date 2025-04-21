
export type ToolCategory = 
  | "text" 
  | "image" 
  | "seo" 
  | "calculators" 
  | "number" 
  | "random"
  | "resume"; // Added new category

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  isNew: boolean;
  icon: string;
}

export const categoryLabels: Record<ToolCategory, string> = {
  text: "متن",
  image: "تصویر",
  seo: "سئو",
  calculators: "ماشین حساب",
  number: "اعداد",
  random: "تصادفی",
  resume: "رزومه و CV" // Added new category label
};
