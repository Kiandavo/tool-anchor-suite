
import React from 'react';
import { TransparentSelect, SelectItem } from "@/components/ui/transparent-select";
import { zodiacSigns } from './useHoroscope';

interface ZodiacSelectorProps {
  selectedSign: string;
  onSelectSign: (value: string) => void;
}

export const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedSign, onSelectSign }) => {
  console.log("ZodiacSelector rendering with selectedSign:", selectedSign);
  
  return (
    <div className="mb-3 w-full">
      <label className="block text-[#5c3f14] text-xs mb-1.5 font-medium">ماه تولد خود را انتخاب کنید:</label>
      <TransparentSelect 
        value={selectedSign} 
        onValueChange={(value) => {
          console.log("Select value changed to:", value);
          onSelectSign(value);
        }}
        placeholder="انتخاب ماه تولد"
        className="text-xs shadow-sm hover:bg-white/70 transition-all w-full"
      >
        {zodiacSigns.map((sign) => (
          <SelectItem 
            key={sign.value} 
            value={sign.value} 
            className="text-xs flex items-center hover:bg-primary/5 transition-all"
          >
            <span className="ml-2 text-lg">{sign.symbol}</span>
            <span className="whitespace-nowrap text-xs">{sign.label}</span>
          </SelectItem>
        ))}
      </TransparentSelect>
    </div>
  );
};
