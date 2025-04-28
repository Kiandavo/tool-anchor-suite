
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
};
