
import { Tool } from '@/types/tool-types';

export const unitConverters: Tool[] = [
  {
    id: "48",
    slug: "unit-converter",
    name: "تبدیل واحدها",
    category: "calculator",
    description: "تبدیل اندازه‌ها و واحدها",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "49",
    slug: "currency-converter",
    name: "تبدیل ارز",
    category: "calculator",
    description: "تبدیل قیمت بین ارزهای مختلف",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "104",
    slug: "unit-list-generator",
    name: "تولید لیست واحدها",
    category: "calculator",
    description: "لیست تبدیل واحدها را بسازید",
    isNew: false,
    icon: "calculator"
  },
  {
    id: "106",
    slug: "weight-converter",
    name: "تبدیل واحدهای وزن",
    category: "calculator",
    description: "تبدیل بین واحدهای مختلف وزن",
    isNew: true,
    icon: "calculator"
  },
  {
    id: "107",
    slug: "length-converter",
    name: "تبدیل واحدهای طول",
    category: "calculator",
    description: "تبدیل بین واحدهای مختلف طول",
    isNew: true,
    icon: "calculator"
  }
];
