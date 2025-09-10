import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export const AstrologyGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50/50 text-xs"
      >
        راهنمای نجوم
        {isOpen ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
      </Button>
      
      {isOpen && (
        <div className="mt-3 text-right bg-white/60 p-4 rounded-lg border border-purple-200/50 text-xs text-purple-700">
          <div className="space-y-2">
            <p><strong>☀️ خورشید:</strong> شخصیت اصلی و هویت شما</p>
            <p><strong>🌙 ماه:</strong> احساسات و ناخودآگاه شما</p>
            <p><strong>⬆️ طالع:</strong> نحوه نمایش شما به دنیا</p>
            <p><strong>🪐 سیارات:</strong> جنبه‌های مختلف شخصیت</p>
            <p><strong>🏠 خانه‌ها:</strong> حوزه‌های مختلف زندگی</p>
          </div>
        </div>
      )}
    </div>
  );
};