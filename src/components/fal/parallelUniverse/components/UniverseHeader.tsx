
import React from 'react';
import { Globe, Sparkles } from "lucide-react";
import { CardHeader } from "@/components/ui/card";

const UniverseHeader: React.FC = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-[#2a1c64] to-[#1e1256] text-center pb-2 py-2 relative border-b border-[#2a1c64]">
      <div className="flex items-center justify-center">
        <Globe className="text-white mr-2" size={16} />
        <h2 className="text-sm font-bold text-white flex items-center">
          کاوش جهان‌های موازی
          <span className="mr-1.5 inline-block"><Sparkles size={12} className="text-white opacity-70" /></span>
        </h2>
      </div>
    </CardHeader>
  );
};

export default UniverseHeader;
