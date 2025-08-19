
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
    <div className="flex items-center justify-center mb-8 spacing-section-sm">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-1/4 sm:w-1/3"></div>
      <div className={`px-5 py-2 sm:px-6 sm:py-2.5 ${backgroundColor} rounded-full shadow-sm border border-purple-300/30 mx-4`}>
        <h2 className="text-center text-purple-800 font-bold text-lg sm:text-xl icon-text whitespace-nowrap">
          <Icon size={18} className="text-purple-600 flex-shrink-0" />
          <span className="text-balance">{title}</span>
        </h2>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-purple-400 via-purple-400 to-transparent w-1/4 sm:w-1/3"></div>
    </div>
  );
};
