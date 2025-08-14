
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
      <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-1/4"></div>
      <div className={`px-4 py-1.5 ${backgroundColor} rounded-full shadow-sm border border-purple-300/30`}>
        <h2 className="text-center text-purple-800 font-bold text-xl icon-text">
          <Icon size={20} className="text-purple-600" />
          {title}
        </h2>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-purple-400 via-purple-400 to-transparent w-1/4"></div>
    </div>
  );
};
