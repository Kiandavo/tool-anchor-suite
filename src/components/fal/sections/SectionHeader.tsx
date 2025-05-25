
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  backgroundColor: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  iconColor,
  backgroundColor
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#b0c8e6] to-transparent w-1/4"></div>
      <div className={`px-4 py-1.5 ${backgroundColor} rounded-full shadow-sm border border-[#b0c8e6]/20`}>
        <h2 className="text-center text-[#143a5c] font-bold text-xl flex items-center">
          <Icon size={20} className={`ml-2 ${iconColor}`} />
          {title}
        </h2>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-[#b0c8e6] via-[#b0c8e6] to-transparent w-1/4"></div>
    </div>
  );
};
