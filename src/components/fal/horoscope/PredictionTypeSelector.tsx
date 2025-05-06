
import React from 'react';
import { Button } from "@/components/ui/button";
import { PredictionType } from './useHoroscope';
import { Calendar, Clock, CalendarDays } from 'lucide-react';

interface PredictionTypeSelectorProps {
  predictionType: PredictionType;
  onSelectType: (type: PredictionType) => void;
}

export const PredictionTypeSelector: React.FC<PredictionTypeSelectorProps> = ({ 
  predictionType, 
  onSelectType 
}) => {
  // Create handler functions that explicitly handle specific prediction types
  const handleTodayClick = () => onSelectType("today");
  const handleWeekClick = () => onSelectType("week");
  const handleMonthClick = () => onSelectType("month");
  
  return (
    <div className="mb-3">
      <label className="block text-[#5c3f14] text-xs mb-1.5 font-medium">نوع پیش‌بینی:</label>
      <div className="flex space-x-1 rtl-space-x">
        <Button 
          size="sm"
          variant={predictionType === "today" ? "default" : "outline"}
          className={`text-[10px] h-7 px-2 flex-1 ${predictionType === "today" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14] hover:bg-[#fdf0e9]/50"}`}
          onClick={handleTodayClick}
          type="button"
        >
          <Clock size={12} className="ml-1 opacity-70" />
          امروز
        </Button>
        <Button 
          size="sm"
          variant={predictionType === "week" ? "default" : "outline"}
          className={`text-[10px] h-7 px-2 flex-1 ${predictionType === "week" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14] hover:bg-[#fdf0e9]/50"}`}
          onClick={handleWeekClick}
          type="button"
        >
          <Calendar size={12} className="ml-1 opacity-70" />
          هفته
        </Button>
        <Button 
          size="sm"
          variant={predictionType === "month" ? "default" : "outline"}
          className={`text-[10px] h-7 px-2 flex-1 ${predictionType === "month" ? "bg-[#e6c8b0] hover:bg-[#d2b095] text-[#5c3f14]" : "border-[#e6c8b0] text-[#5c3f14] hover:bg-[#fdf0e9]/50"}`}
          onClick={handleMonthClick}
          type="button"
        >
          <CalendarDays size={12} className="ml-1 opacity-70" />
          ماه
        </Button>
      </div>
    </div>
  );
};
