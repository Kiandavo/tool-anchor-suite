
import { Tool } from '@/types/tool-types';

export const financialCalculators: Tool[] = [
  {
    id: "44",
    slug: "loan-calculator",
    name: "ماشین حساب وام",
    category: "calculator",
    description: "محاسبه اقساط وام",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "46",
    slug: "salary-tax-calculator",
    name: "محاسبه مالیات حقوق",
    category: "calculator",
    description: "محاسبه مالیات سالانه یا ماهیانه",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "110",
    slug: "mortgage-calculator",
    name: "محاسبه گر رهن و اجاره",
    category: "calculator",
    description: "تبدیل رهن به اجاره و بالعکس",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "111",
    slug: "investment-calculator",
    name: "محاسبه گر سرمایه‌گذاری",
    category: "calculator",
    description: "محاسبه سود سرمایه‌گذاری",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "118",
    slug: "profit-calculator",
    name: "محاسبه سود و بهره",
    category: "calculator",
    description: "محاسبه سود سپرده و وام",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "120",
    slug: "rent-factors-calculator",
    name: "محاسبه عوامل اجاره",
    category: "calculator",
    description: "محاسبه عوامل مختلف اجاره مانند درآمد موردنیاز و هزینه‌های جانبی",
    isNew: true,
    icon: "calculator"
  }
];
