
import { ToolCategory } from '@/types/tool-types';

type CategoryTheme = {
  gradient: string;
  iconColor: string;
  badgeClass: string;
};

export const categoryThemes: Record<ToolCategory, CategoryTheme> = {
  text: {
    gradient: "bg-gradient-to-br from-[#E5DEFF]/80 to-[#D6BCFA]/80",
    iconColor: "text-purple-600",
    badgeClass: "bg-purple-100 text-purple-600",
  },
  image: {
    gradient: "bg-gradient-to-br from-[#D3E4FD]/80 to-[#0EA5E9]/80",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-100 text-blue-600",
  },
  calculators: {
    gradient: "bg-gradient-to-br from-[#F2FCE2]/80 to-[#8cc55b]/80",
    iconColor: "text-green-600",
    badgeClass: "bg-green-100 text-green-600",
  },
  seo: {
    gradient: "bg-gradient-to-br from-[#FEC6A1]/80 to-[#F97316]/80",
    iconColor: "text-orange-600",
    badgeClass: "bg-orange-100 text-orange-600",
  },
  number: {
    gradient: "bg-gradient-to-br from-[#FEF7CD]/80 to-[#F7C948]/80",
    iconColor: "text-yellow-600",
    badgeClass: "bg-yellow-100 text-yellow-600",
  },
  random: {
    gradient: "bg-gradient-to-br from-[#FFDEE2]/80 to-[#D946EF]/80",
    iconColor: "text-pink-600",
    badgeClass: "bg-pink-100 text-pink-600",
  },
  educational: {
    gradient: "bg-gradient-to-br from-[#E0F2FE]/80 to-[#38BDF8]/80",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-100 text-blue-600",
  },
  productivity: {
    gradient: "bg-gradient-to-br from-[#DCFCE7]/80 to-[#4ADE80]/80",
    iconColor: "text-green-600",
    badgeClass: "bg-green-100 text-green-600",
  },
  design: {
    gradient: "bg-gradient-to-br from-[#FFE4E6]/80 to-[#FB7185]/80",
    iconColor: "text-rose-600",
    badgeClass: "bg-rose-100 text-rose-600",
  },
  "persian-cultural": {
    gradient: "bg-gradient-to-br from-[#F1F5F9]/80 to-[#94A3B8]/80",
    iconColor: "text-slate-600",
    badgeClass: "bg-slate-100 text-slate-600",
  },
  "readings": {
    gradient: "bg-gradient-to-br from-[#E5DEFF]/80 to-[#9b87f5]/80",
    iconColor: "text-violet-600",
    badgeClass: "bg-violet-100 text-violet-600",
  }
};
