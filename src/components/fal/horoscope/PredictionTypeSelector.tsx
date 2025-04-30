
import React from 'react';
import { Button } from "@/components/ui/button";
import { PredictionType } from './useHoroscope';

interface PredictionTypeSelectorProps {
  predictionType: PredictionType;
  onSelectType: (type: PredictionType) => void;
}

export const PredictionTypeSelector: React.FC<PredictionTypeSelectorProps> = ({ 
  predictionType, 
  onSelectType 
}) => {
  return (
    <div>
      <label className="block text-[#5c3f14] text-xs mb-1 font-medium">نوع پیش‌بینی:</label>
      <div className="flex space-x-2 rtl-space-x">
        <Button 
          size="sm"
          variant={predictionType === "today" ? "default" : "outline"}
          className={`text-[10px] h-7 px-3 ${predictionType === "today" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
          onClick={() => onSelectType("today")}
        >
          امروز
        </Button>
        <Button 
          size="sm"
          variant={predictionType === "week" ? "default" : "outline"}
          className={`text-[10px] h-7 px-3 ${predictionType === "week" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
          onClick={() => onSelectType("week")}
        >
          هفته
        </Button>
        <Button 
          size="sm"
          variant={predictionType === "month" ? "default" : "outline"}
          className={`text-[10px] h-7 px-3 ${predictionType === "month" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14]"}`}
          onClick={() => onSelectType("month")}
        >
          ماه
        </Button>
      </div>
    </div>
  );
};
