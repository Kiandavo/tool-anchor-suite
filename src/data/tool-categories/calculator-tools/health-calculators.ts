
import { Tool } from '@/types/tool-types';

export const healthCalculators: Tool[] = [
  {
    id: "10",
    slug: "bmi-calculator",
    name: "محاسبه گر BMI",
    category: "calculator",
    description: "شاخص توده بدنی خود را محاسبه کنید",
    isNew: false,
    icon: "activity"
  },
  {
    id: "45",
    slug: "age-calculator",
    name: "محاسبه سن",
    category: "calculator",
    description: "محاسبه سن بر اساس تاریخ تولد",
    isNew: false,
    icon: "activity"
  },
  {
    id: "105",
    slug: "calorie-calculator",
    name: "محاسبه کالری",
    category: "calculator",
    description: "کالری مورد نیاز روزانه خود را محاسبه کنید",
    isNew: true,
    icon: "calculator"
  }
];
